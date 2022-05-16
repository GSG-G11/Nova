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

  let interviewer = await Interviewer.find({ userId: _id });

  const { languages, specialization } = interviewer[0];
  interviewer = await Interviewer.find({
    userId: _id,
    'schedule.date': date,
    'schedule.time': time,
  });

  if (interviewer.length > 0) {
    throw new CustomError('Interviewer already scheduled for this time', 400);
  }

  interviewer = await Interviewer.find({ userId: _id, 'schedule.date': date });

  if (!interviewer.length) {
    const newInterview = await Interviewer.update({
      userId: _id,
    }, {
      $push: {
        schedule: {
          date,
          time,
        },
      },
    });

    if (newInterview.modifiedCount === 0) {
      throw new CustomError('No time added', 404);
    }

    const findSchedule = await Schedule.find({
      language: {
        $in: languages,
      },
      specialization: {
        $in: specialization,
      },
    });

    if (!findSchedule.length) {
      languages.forEach(async (language:string) => {
        await Schedule.insertMany([
          {
            language,
            specialization: specialization[0],
            available: [
              {
                interviewerId: _id,
                date,
                time,
              },
            ],
          },
        ]);
      });

      return res.json({
        message: 'Interview added successfully',
      });
    }
    const schedule = await Schedule.update({
      language: {
        $in: languages,
      },
      specialization: {
        $in: specialization,
      },
    }, {
      $push: {
        available: {
          interviewerId: _id,
          date,
          time,
        },
      },
    });

    if (schedule.modifiedCount === 0) {
      throw new CustomError('No time added to schedules', 404);
    }

    return res.json({
      message: 'Successfully added time',
    });
  }

  const postedTime = await Interviewer.update(
    { userId: _id, 'schedule.date': new Date(date) },
    { $push: { 'schedule.$.time': time } },
  );

  if (postedTime.modifiedCount === 0) {
    throw new CustomError('No time added', 404);
  }
  const findSchedule = await Schedule.find({
    language: {
      $in: languages,
    },
    specialization: {
      $in: specialization,
    },
  });

  if (!findSchedule.length) {
    const newSchedule = await Schedule.insertMany({
      language: languages,
      specialization,
      available: [{
        interviewerId: _id,
        date,
        time,
      }],
    });

    if (!newSchedule) {
      throw new CustomError('No time added', 404);
    }
  }
  const schedule = await Schedule.update({
    language: {
      $in: languages,
    },
    specialization: {
      $in: specialization,
    },
    'available.interviewerId': _id,
    'available.date': new Date(date),
  }, {
    $push: {
      'available.$.time': time,
    },
  });

  if (schedule.modifiedCount === 0) {
    throw new CustomError('No time added to schedule', 404);
  }

  return res.json({
    message: 'Successfully added time',
  });
};

export default postAvailableTime;
