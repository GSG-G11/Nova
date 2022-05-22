import { Response } from 'express';
import { ObjectId } from 'mongodb';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { RequestType, validateQuery } from '../../utils';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page = '1', saved } = req.query;

  await validateQuery(req.query);
  // Convert the incoming saved string into a boolean
  const savedBoolean : any = saved ? JSON.parse(saved.toString())
    : saved;

  const id = req.userInfo?.id;

  // filter reviews based on the saved parameter and paginate the results
  const filteredReviewsWithIds : any | undefined = await Interviewee.aggregate([{
    $project: {
      _id: 0,
      userId: 1,
      'interviews.review': 1,
      'interviews.interviewerId': 1,
      'interviews._id': 1,
    },
  },

  {
    $unwind: '$interviews',
  },

  {
    $match: {
      userId: new ObjectId(id),
      'interviews.review.saved': savedBoolean,
    },
  },
  {
    $group: {
      _id: '$interviews.review._id',
      interviewId: {
        $first: '$interviews._id',
      },
      review: {
        $first: '$interviews.review',
      },
      interviewerId: {
        $first: '$interviews.interviewerId',
      },
    },
  },
  ]).skip((Number(page) - 1) * 3).limit(3);

  // Get the names of the interviewers based on Interviewers Ids
  const reviews = await Promise.all(filteredReviewsWithIds.map(async (review: any) => {
    const { name } : any = await User.findById(review.interviewerId);

    const finalReview = {
      ...review,
      interviewerName: name,
    };

    return finalReview;
  }));

  return res.json({
    message: 'Reviews found',
    data: {
      length: reviews.length,
      reviews,
    },
  });
};

export default getAllReviews;
