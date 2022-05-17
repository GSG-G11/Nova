import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import Interviewee from '../../database/Models/Interviewee';
import { createReviewValidation, CustomError, RequestType } from '../../utils';

const createReview = async (req: RequestType, res: Response) => {
  const { id } = req.params;
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new CustomError('Invalid ID', 400);
  }
  const { message }: any = await createReviewValidation(req.body);

  const findInterview = await Interviewee.aggregate([{
    $unwind: '$interviews',
  }, {
    $match: {
      'interviews._id': new ObjectId(id),
      'interviews.interviewerId': req.userInfo?.id,
    },

  }, {
    $unwind: '$interviews.review',
  }, {
    $project: {
      'interviews.review': 1,
    },
  },
  {
    $addFields: {
      'interviews.review.message': message,
    },
  },
  ]);

  return res.status(201).json({
    message: 'Review created successfully',
    data: findInterview,
  });
};

export default createReview;
