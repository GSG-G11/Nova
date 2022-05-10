import { Response } from 'express';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getData = async (role: string, userId: string, status: string, page: string) => {
  let data: Array<object> = [];
  const pageLimitMax = Number(page) * 3;
  const pageLimitMin = (Number(page) - 1) * 3;
  if (role === 'interviewer') {
    const interviewe = await Interviewer.find({ userId });
    const { interviews } = interviewe[0];
    data = interviews;
  } else if (role === 'interviewee') {
    const interviewe = await Interviewee.find({ userId });
    const { interviews } = interviewe[0];
    data = interviews;
  } else {
    throw new CustomError('Role not found', 404);
  }

  if (status === 'history') {
    const historyInterviews: object = data.filter((interview:any, index: number) => (
      interview.date > new Date() && index < pageLimitMax && index >= pageLimitMin));
    return historyInterviews;
  } if (status === 'upcoming') {
    const upcomingInterviews: object = data.filter((interview:any, index: number) => (
      interview.date > new Date() && index < pageLimitMax && index >= pageLimitMin));
    return upcomingInterviews;
  }
  throw new CustomError('No interviews found', 404);
};

const getInterviews = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  if (!userInfo) {
    throw new CustomError('User not found', 404);
  }

  const user = await User.find({ _id: userInfo.id });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  const { status, page }: {status?: string, page?: string} = req.query;

  if (!status || !page) {
    throw new CustomError('Status and page are required', 400);
  }
  const interviews: any = await getData(role, _id.valueOf(), status, page);
  if (interviews.length === 0) {
    throw new CustomError('No interviews found', 404);
  }
  res.status(200).json({
    data: interviews,
    message: 'Interviews fetched successfully!',
  });
};

export default getInterviews;
