import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import { RequestType } from '../../utils';
import validateQuery from '../../utils/validation/queryValidation';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page = '1', saved } = req.query;

  await validateQuery(req.query);
  // Convert the incoming saved string into a boolean
  const savedBoolean : any = saved ? JSON.parse(saved.toString())
    : saved;

  const id = req.userInfo?.id;

  // filter reviews based on the saved parameter and paginate the results
  // TODO: Replace the static userId with the logged in user's id when create review is implemented
  let filter : any;
  if (savedBoolean === true || savedBoolean === false) {
    const savedReviewsFilter = {
      $match: {
        userId: id,
        'interviews.review.saved': savedBoolean,
      },
    };
    filter = savedReviewsFilter;
  } else {
    const allReviews = {
      $match: {
        userId: id,
      },
    };
    filter = allReviews;
  }

  const filteredReviews : any | undefined = await Interviewee.aggregate([{
    $project: {
      _id: 0,
      userId: 1,
      'interviews.review': 1,
    },
  },

  {
    $unwind: '$interviews',
  },
  {
    ...filter,
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
    data: {
      length: filteredReviews.length,
      reviews: filteredReviews,
    },
  });
};

export default getAllReviews;
