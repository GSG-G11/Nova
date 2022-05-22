import { Response } from 'express';
import { RequestType, getUsersAdminQueryValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';

const getInterviewersAdmin = async (req: RequestType, res: Response) => {
  const {
    page = '1', limit, status,
  }: { page?: string, limit?: string, status?: string} = req.query;

  await getUsersAdminQueryValidation({
    page, limit, status,
  });

  const pageLimit = (Number(limit));

  const skip = (Number(page) - 1) * pageLimit;

  const user = await Interviewer.aggregate([
    {
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
              role: 1,
              profile_picture: 1,
              cv: 1,
              level: 1,
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

export default getInterviewersAdmin;
