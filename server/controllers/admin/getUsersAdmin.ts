import { Response } from 'express';
import { RequestType, getUsersAdminQueryValidation, getUsersArrayStatusAdminQueryValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';
import Interviewee from '../../database/Models/Interviewee';

const getUsersAdmin = async (req: RequestType, res: Response) => {
  const {
    role, page = '1', status,
  }: { role?: string, page?: string, status?: string} = req.query;

  let query: any;
  if (Array.isArray(status)) {
    await getUsersArrayStatusAdminQueryValidation({ role, page, status });
    query = {
      $match: {
        status: {
          $in: status,
        },
      },
    };
  } else {
    await getUsersAdminQueryValidation({
      role, page, status,
    });
    query = {
      $match: {
        status,
      },
    };
  }

  const skip = (Number(page) - 1) * 7;

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
  query,
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
  }]).skip(skip).limit(7);

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
