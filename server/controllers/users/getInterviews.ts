import { Response } from 'express';
// import { date } from 'joi';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getData = async (role: string, userId: string, status: string, page: string) => {
  // const pageLimitMax = Number(page) * 3;
  const pageLimitMin = (Number(page) - 1) * 3;
  const dataBaseInterviewe = (role === 'interviewer') ? Interviewer : Interviewee;

  console.log(status);

  const condTime = (status === 'upcoming') ? { $gt: new Date() } : { $lt: new Date() };

  console.log(condTime);

  const cond = [
    {
      $match: {
        userId: '627a27c142c2195ced5a537a',
      },
    },
    { $unwind: '$interviews' },
    {
      $match: {
        'interviews.date': condTime,
      },
    },
  ];

  const interviews = await dataBaseInterviewe.aggregate(cond).skip(pageLimitMin).limit(3);

  return interviews;
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

  const interviews = await getData(role, _id.valueOf(), status, page);
  if (interviews.length === 0) {
    throw new CustomError('No interviews found', 404);
  }
  res.status(200).json({
    data: interviews,
    message: 'Interviews fetched successfully!',
  });
};

export default getInterviews;
