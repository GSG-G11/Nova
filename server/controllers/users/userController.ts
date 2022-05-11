import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import validateQuery from '../../utils/validation/queryValidation';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page = '1', saved = 'false' } = req.query;

  // Convert the incoming saved string into a boolean
  const savedBoolean : Boolean = JSON.parse(saved.toString());

  await validateQuery(req.query);
  const id = req.userInfo?.id;
  const user : object | null = await User.findById(id);

  if (!user) {
    throw new CustomError('User not found', 404);
  }
  if (!Number(page)) {
    throw new CustomError('Invalid Page', 400);
  }

  if (typeof savedBoolean !== 'boolean') {
    throw new CustomError('Invalid saved', 400);
  }

  // filter reviews based on the saved parameter and paginate the results
  const filteredReviews = await Interviewee.aggregate([{
    $project: {
      _id: 0,
      'interviews.review': 1,
    },
  },
  {
    $unwind: '$interviews',
  },
  {
    $match: {
      'interviews.review.saved': savedBoolean,
    },
  },
  {
    $group: {
      _id: '$interviews.review._id',
      review: {
        $first: '$interviews.review',
      },
    },
  },
  ]).skip((Number(page) - 1) * 3).limit(3);

  return res.json({
    message: 'Reviews found',
    length: filteredReviews.length,
    page: Number(page),
    data: filteredReviews,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getAllReviews,
};
