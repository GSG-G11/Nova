import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const deleteData = async (role: string, userId: string, interviewId: string) => {
  let dataBaseInterview;

  switch (role) {
    case 'interviewer':
      dataBaseInterview = Interviewer;
      break;
    case 'interviewee':
      dataBaseInterview = Interviewee;
      break;
    default:
      throw new CustomError('Invalid role!', 401);
  }
  const firstCondition = {
    $match: {
      userId: new ObjectId(userId),
    },
  };
  const secondCondition = {
    $pull: { interviews: { _id: new ObjectId(interviewId) } },

  };

  const interviews = await dataBaseInterview.updateOne(firstCondition, secondCondition);
  return interviews;
};

const deleteInterview = async (req: RequestType, res: Response) => {
  const { userInfo } = req;
  const { id } = req.params;

  const validId = Types.ObjectId.isValid(id);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }
  const user = await User.find({ _id: new ObjectId(userInfo?.id) });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  const interviews = await deleteData(role, _id.valueOf(), id);

  if (interviews.modifiedCount > 0) {
    return res.json({ message: 'Interview deleted successfully' });
  }
  throw new CustomError('Interview not found', 404);
};

export default deleteInterview;
