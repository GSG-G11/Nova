import { ObjectId } from 'mongodb';
import { CustomError } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Schedule from '../../database/Models/Schedule';

const postAvailableGlobal = async (userId: string, time: string, isoDate: string) => {
  const interviewer: any = await Interviewer.find({ userId: new ObjectId(userId), 'schedule.date': new Date(isoDate) });

  if (!interviewer.length) {
    const newInterview = await Interviewer.findOneAndUpdate({
      userId: new ObjectId(userId),
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
                interviewerId: userId,
                date: isoDate,
                time,
              },
            ],
          },
        ]);
      });

      return 'Successfully added time';
    }
    const schedule = await Schedule.update({
      language: {
        $in: newInterview.languages,
      },
      specialization: newInterview.specialization,
    }, {
      $push: {
        available: {
          interviewerId: userId,
          date: isoDate,
          time,
        },
      },
    });

    if (schedule.modifiedCount === 0) {
      throw new CustomError('No time added to schedules', 400);
    }

    return 'Successfully added time';
  }

  const postedTime = await Interviewer.update(
    { userId: new ObjectId(userId), 'schedule.date': new Date(isoDate) },
    { $push: { 'schedule.$.time': time } },
  );

  if (postedTime.modifiedCount === 0) {
    throw new CustomError('No time added', 400);
  }

  const findSchedule = await Schedule.find({
    language: {
      $in: interviewer[0].languages,
    },
    specialization: interviewer[0].specialization,
  });

  if (!findSchedule.length) {
    interviewer[0].languages.forEach(async (language:string) => {
      await Schedule.insertMany([
        {
          language,
          specialization: interviewer[0].specialization,
          available: [
            {
              interviewerId: userId,
              date: isoDate,
              time,
            },
          ],
        },
      ]);
    });

    return 'Successfully added time';
  }

  const schedule = await Schedule.update({
    language: {
      $in: interviewer[0].languages,
    },
    specialization: interviewer[0].specialization,
    'available.interviewerId': userId,
    'available.$.date': new Date(isoDate),
  }, {
    $push: {
      'available.$.time': time,
    },
  });

  if (schedule.modifiedCount === 0) {
    throw new CustomError('No time added to schedule', 400);
  }
  return 'Successfully added time';
};

export default postAvailableGlobal;
