import { Response } from 'express';
import { ObjectId } from 'mongodb';
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
      userId,
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

  const user = await User.find({ _id: new ObjectId(userInfo?.id) });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  const interviews = await deleteData(role, _id.valueOf(), id);
  return (interviews.modifiedCount > 0) ? res.json({ message: 'Interview deleted successfully' })
    : res.status(404).json({ message: 'Interview not found' });
};

export default deleteInterview;
