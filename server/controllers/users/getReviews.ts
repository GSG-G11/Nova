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

  const condition = [{
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
      'interviews.review.message': { $ne: '' },
    },
  },
  {
    $group: {
      _id: '$interviews.review._id',
      review: {
        $first: '$interviews.review',
      },
      interviewId: {
        $first: '$interviews._id',
      },
      interviewerId: {
        $first: '$interviews.interviewerId',
      },
    },
  },
  ];

  const [filteredReviewsWithIds, count] = await Promise.all([
    Interviewee.aggregate(condition).skip((Number(page) - 1) * 3).limit(3),
    Interviewee.aggregate(condition)]);

  // Get the names of the interviewers based on Interviewers Ids
  const reviews = await Promise.all(filteredReviewsWithIds.map(async (review: any) => {
    const {
      name,
      profile_picture: interviewerImage,
    } : any = await User.findById(review.interviewerId);

    const finalReview = {
      ...review,
      interviewerName: name,
      interviewerImage,
    };

    return finalReview;
  }));

  return res.json({
    message: 'Reviews found',
    data: {
      length: count.length,
      reviews,
    },
  });
};

export default getAllReviews;
