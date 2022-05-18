import { Response } from 'express';
import User from '../../database/Models/User';
import { CustomError, RequestType, postAvailableTimeValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Schedule from '../../database/Models/Schedule';

const postAvailableTime = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  const user = await User.find({ _id: userInfo?.id });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  if (role !== 'interviewer') {
    throw new CustomError('Invalid role!', 401);
  }

  const { date, time } = req.body;

  await postAvailableTimeValidation(req.body);
  const isoDate = `${date}T00:00:00.000Z`;

  let interviewer: any = await Interviewer.find({
    userId: _id,
    'schedule.date': isoDate,
    'schedule.time': time,
  });

  if (interviewer.length > 0) {
    throw new CustomError('Interviewer already scheduled for this time', 400);
  }

  interviewer = await Interviewer.find({ userId: _id, 'schedule.date': new Date(isoDate) });

  if (!interviewer.length) {
    const newInterview = await Interviewer.findOneAndUpdate({
      userId: _id,
    }, {
      $push: {
        schedule: {
          date: isoDate,
          time,
        },
      },
    });

    if (!newInterview) {
      throw new CustomError('No time added', 400);
    }

    const findSchedule = await Schedule.find({
      language: {
        $in: newInterview.languages,
      },
      specialization: newInterview.specialization,
    });

    if (!findSchedule.length) {
      newInterview.languages.forEach(async (language:string) => {
        await Schedule.insertMany([
          {
            language,
            specialization: newInterview.specialization,
            available: [
              {
                interviewerId: _id,
                date: isoDate,
                time,
              },
            ],
          },
        ]);
      });

      return res.json({
        message: 'Successfully added time',
      });
    }
    const schedule = await Schedule.update({
      language: {
        $in: newInterview.languages,
      },
      specialization: newInterview.specialization,
    }, {
      $push: {
        available: {
          interviewerId: _id,
          date: isoDate,
          time,
        },
      },
    });

    if (schedule.modifiedCount === 0) {
      throw new CustomError('No time added to schedules', 400);
    }

    return res.json({
      message: 'Successfully added time',
    });
  }

  const postedTime = await Interviewer.update(
    { userId: _id, 'schedule.date': new Date(isoDate) },
    { $push: { 'schedule.$.time': time } },
  );

  if (postedTime.modifiedCount === 0) {
    throw new CustomError('No time added', 400);
  }

  const schedule = await Schedule.update({
    language: {
      $in: interviewer[0].languages,
    },
    specialization: interviewer[0].specialization,
    'available.interviewerId': _id,
    'available.$.date': new Date(isoDate),
  }, {
    $push: {
      'available.$.time': time,
    },
  });

  if (schedule.modifiedCount === 0) {
    throw new CustomError('No time added to schedule', 400);
  }

  return res.json({
    message: 'Successfully added time',
  });
};

export default postAvailableTime;
