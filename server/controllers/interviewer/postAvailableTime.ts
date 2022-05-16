import { Response } from 'express';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';

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

  // db.interviewers.update({ userId: "627c92140d0c3622573195cb", "schedule.date":
  // ISODate("2022-04-28T00:00:00Z") },{"$push":{"schedule.$.time":200}});

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
