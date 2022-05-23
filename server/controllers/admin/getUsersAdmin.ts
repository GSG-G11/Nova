import { Response } from 'express';
import { RequestType, getUsersAdminQueryValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getUsersAdmin = async (req: RequestType, res: Response) => {
  const {
    role, page = '1', limit, status,
  }: { role?: string, page?: string, limit?: string, status?: string} = req.query;

  await getUsersAdminQueryValidation({
    role, page, limit, status,
  });

  const pageLimit = (Number(limit));

  const skip = (Number(page) - 1) * pageLimit;

  const dataBaseInterview = (role === 'interviewer') ? Interviewer : Interviewee;
  const user = await dataBaseInterview.aggregate([{
    $group: {
      _id: '$_id',
      userId: { $first: '$userId' },
      languages: { $first: '$languages' },
      specialization: { $first: '$specialization' },
      status: { $first: '$status' },
    },
  },
  {
    $match: {
      status,
    },
  },
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      pipeline: [
        {
          $project: {
            name: 1,
            email: 1,
            profile_picture: 1,
            cv: 1,
            level: 1,
          },
        },
      ],
      as: 'userInfo',
    },
  }]).skip(skip).limit(pageLimit);

  if (page === '1') {
    const count = await dataBaseInterview.countDocuments({
      status,
    });
    return res.json({
      count,
      data: user,
      message: 'Users fetched successfully!',
    });
  }

  return res.json({
    data: user,
    message: 'Users fetched successfully!',
  });
};

export default getUsersAdmin;
