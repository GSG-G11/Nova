import { Response } from 'express';
import { RequestType, getUsersQueryValidation } from '../../utils';
import User from '../../database/Models/User';

const getUsers = async (req: RequestType, res: Response) => {
  const { role, page = '1', limit }: {role?: string, page?: string, limit?: string} = req.query;

  await getUsersQueryValidation({ role, page, limit });

  const pageLimit = (Number(limit));

  const skip = (Number(page) - 1) * pageLimit;

  const dataBaseInterview = (role === 'interviewer') ? 'interviewers' : 'interviewees';

  const user = await User.aggregate([
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        role: { $first: '$role' },
        email: { $first: '$email' },
      },
    },
    {
      $match: {
        role,
      },
    },
    {
      $lookup: {
        from: dataBaseInterview,
        localField: '_id',
        foreignField: 'userId',
        pipeline: [
          {
            $project: {
              languages: 1,
              specialization: 1,
            },
          },
        ],
        as: 'userInfo',
      },
    },
  ]).skip(skip).limit(pageLimit);

  res.json({
    data: user,
    message: 'Users fetched successfully!',
  });
};

export default getUsers;
