import { Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';
import { CustomError, RequestType, postAvailableTimeValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import postAvailableGlobal from './postAvailableGlobal';

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

  const interviewer: any = await Interviewer.find({
    userId: new ObjectId(_id),
    'schedule.date': isoDate,
    'schedule.time': time,
  });

  if (interviewer.length > 0) {
    throw new CustomError('Interviewer already scheduled for this time', 400);
  }

  const result = await postAvailableGlobal(_id, time, isoDate);

  return res.json({
    message: result,
  });
};

export default postAvailableTime;
