import { Response } from 'express';
import { CustomError, RequestType, getUsersQueryValidation } from '../../utils';
import User from '../../database/Models/User';

const getUsers = async (req: RequestType, res: Response) => {
  const { role, page, limit }: {role?: string, page?: string, limit?: string} = req.query;

  if (!role || !limit) {
    throw new CustomError('Invalid query!', 400);
  }

  await getUsersQueryValidation({ role, page, limit });

  let pageLimit = (Number(limit));

  pageLimit = (pageLimit === 0) ? pageLimit = 3 : pageLimit;

  const pageSkip = (Number(page));
  const pageLimitMin = (pageSkip) ? (Number(page) - 1) * pageLimit : 0;

  let dataBaseInterview;

  switch (role) {
    case 'interviewer':
      dataBaseInterview = 'interviewers';
      break;
    case 'interviewee':
      dataBaseInterview = 'interviewees';
      break;
    default:
      throw new CustomError('Invalid role!', 401);
  }

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
        as: role,
      },
    },
  ]).skip(pageLimitMin).limit(pageLimit);

  if (!user.length) {
    throw new CustomError('No users found', 404);
  }

  res.json({
    data: user,
    message: 'Users fetched successfully!',
  });
};

export default getUsers;
