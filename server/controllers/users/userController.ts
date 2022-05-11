import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import { RequestType } from '../../utils';
import validateQuery from '../../utils/validation/queryValidation';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page = '1' } = req.query;

  await validateQuery(req.query);
  // Convert the incoming saved string into a boolean
  const savedBoolean : any = req.query.saved ? JSON.parse(req.query.saved.toString())
    : req.query.saved;

  // const id = req.userInfo?.id;

  // filter reviews based on the saved parameter and paginate the results
  // TODO: Replace the static userId with the logged in user's id when create review is implemented
  let filteredReviews : any | undefined;
  if (savedBoolean === true || savedBoolean === false) {
    filteredReviews = await Interviewee.aggregate([{
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
      $match: {
        userId: '4',
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
  }

  if (savedBoolean === undefined) {
    filteredReviews = await Interviewee.aggregate([{
      $project: {
        _id: 0,
        userId: 1,
        'interviews.review': 1,
      },
    },
    {
      $match: {
        userId: '4',
      },
    },
    {
      $unwind: '$interviews',
    },

    ]).skip((Number(page) - 1) * 3).limit(3);
  }
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
