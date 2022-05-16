import { Response } from 'express';
import User from '../../database/Models/User';
import { CustomError, RequestType, getInterviewsQueryValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getData = async (role: string, userId: string, status: string, page: string) => {
  const pageLimitMin = (Number(page) - 1) * 3;
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

  const timeCondition = (status === 'upcoming') ? { $gt: new Date() } : { $lte: new Date() };

  const condition = [
    {
      $match: {
        userId,
      },
    },
    { $unwind: '$interviews' },
    {
      $match: {
        'interviews.date': timeCondition,
      },
    },
  ];

  const interviews = await dataBaseInterview.aggregate(condition).skip(pageLimitMin).limit(3);

  if (page === '1') {
    const interviewsCount = await dataBaseInterview.aggregate(condition);
    const count = interviewsCount.length;
    return { interviews, count };
  }

  return { interviews };
};

const getInterviews = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  const user = await User.find({ _id: userInfo?.id });

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  const { _id, role } = user[0];

  const { status = 'upcoming', page = '1' }: {status?: string, page?: string} = req.query;

  await getInterviewsQueryValidation({ status, page });

  const { interviews, count } = await getData(role, _id.valueOf(), status, page);

  if (!interviews.length) {
    throw new CustomError('No interviews found', 404);
  }
  res.json({
    data: interviews,
    count,
    message: 'Interviews fetched successfully!',
  });
};

export default getInterviews;
