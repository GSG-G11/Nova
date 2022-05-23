import { Response } from 'express';
import { RequestType } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';

const getInterviewers = async (req: RequestType, res: Response) => {
  const user = await Interviewer.aggregate([
    {
      $group: {
        _id: '$_id',
        userId: { $first: '$userId' },
        specialization: { $first: '$specialization' },
        status: { $first: '$status' },
      },
    },
    {
      $match: {
        status: 'APPROVED',
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
              profile_picture: 1,
            },
          },
        ],
        as: 'userInfo',
      },
    },
  ]).limit(4);

  res.json({
    data: user,
    message: 'Users fetched successfully!',
  });
};

export default getInterviewers;
