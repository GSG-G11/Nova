import { Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const deleteData = async (role: string, userId: string, interviewId: string) => {
  const dataBaseInterviewe = (role === 'interviewer') ? Interviewer : Interviewee;

  const firstCondition = {
    $match: {
      userId,
    },
  };
  const seconedCondition = {
    $pull: { interviews: { _id: new ObjectId(interviewId) } },

  };

  const interviews = await dataBaseInterviewe.updateOne(firstCondition, seconedCondition);
  return interviews;
};

const deleteInterview = async (req: RequestType, res: Response) => {
  const { userInfo } = req;
  const { id } = req.params;

  if (!userInfo) {
    throw new CustomError('User not found', 404);
  }

  const user = await User.find({ _id: userInfo.id });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  const interviews = await deleteData(role, _id.valueOf(), id);
  return (interviews.modifiedCount > 0) ? res.json({ message: 'Interview deleted successfully' })
    : res.status(404).json({ message: 'Interview not found' });
};

export default deleteInterview;
