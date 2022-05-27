import { Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';
import { CustomError, RequestType, getInterviewsQueryValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getData = async (role: string, userId: string, status: string, page: string) => {
  const pageLimitMin = (Number(page) - 1) * 3;
  let dataBaseInterview;
  let roleFromDb:string;

  switch (role) {
    case 'interviewer':
      dataBaseInterview = Interviewer;
      roleFromDb = 'intervieweeId';
      break;
    case 'interviewee':
      dataBaseInterview = Interviewee;
      roleFromDb = 'interviewerId';
      break;
    default:
      throw new CustomError('Invalid role!', 401);
  }

  const timeCondition = (status === 'upcoming') ? { $gt: new Date() } : { $lte: new Date() };

  const condition = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    { $unwind: '$interviews' },
    {
      $match: {
        'interviews.date': timeCondition,
      },
    },
  ];

  let interviews = await dataBaseInterview.aggregate(condition).sort({ 'interviews.createdAt': -1 })
    .skip(pageLimitMin).limit(3);

  const name = interviews.map(({ interviews: interview }) => User.aggregate([
    {
      $match: {
        _id: new ObjectId(interview[roleFromDb]),
      },
    },
    {
      $project: {
        name: 1,
      },
    },
  ]));

  const names = await Promise.all(name);
  interviews = interviews.map((interview, index) => ({
    ...interview,
    name: names[index][0].name,
  }));

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
