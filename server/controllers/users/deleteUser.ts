import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';

const deleteUser = async (req: RequestType, res: Response) => {
  const { id }: any = req.params;

  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new CustomError('Invalid ID', 400);
  }

  const user: any = await User.findByIdAndDelete(id);

  if (!user) {
    throw new CustomError('Can not delete this user', 400);
  }

  if (user.role === 'interviewer') {
    await Interviewer.findOneAndDelete({ userId: new ObjectId(id) });
  } else {
    await Interviewee.findOneAndDelete({ userId: new ObjectId(id) });
  }

  res.json({
    message: 'User deleted successfully',

  });
};

export default deleteUser;
