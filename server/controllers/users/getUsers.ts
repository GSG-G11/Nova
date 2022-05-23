import { Response } from 'express';
import { RequestType, getUsersQueryValidation } from '../../utils';
import User from '../../database/Models/User';

const getUsers = async (req: RequestType, res: Response) => {
  const { page = '1', limit }: { page?: string, limit?: string} = req.query;

  await getUsersQueryValidation({ page, limit });

  const pageLimit = (Number(limit));

  const skip = (Number(page) - 1) * pageLimit;

  const user = await User.aggregate([
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        role: { $first: '$role' },
        image: { $first: '$profile_picture' },
      },
    },
    {
      $match: {
        role: 'interviewer',
      },
    },
    {
      $lookup: {
        from: 'interviewers',
        localField: '_id',
        foreignField: 'userId',
        pipeline: [
          {
            $project: {
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
