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

  let interviewer = await Interviewer.find({
    userId: _id,
    'schedule.date': date,
    'schedule.time': time,
  });

  if (interviewer.length > 0) {
    throw new CustomError('Interviewer already scheduled for this time', 400);
  }

  // db.interviewers.find({ userId: "627c92140d0c3622573195cb", "schedule.date":ISODa
  // te("2022-04-28T00:00:00Z") });
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
    res.json({
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

  res.json({
    message: 'Successfully added time',
  });
};

export default postAvailableTime;
