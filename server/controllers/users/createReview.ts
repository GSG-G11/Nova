import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import Interviewee from '../../database/Models/Interviewee';
import { createReviewValidation, RequestType } from '../../utils';

const createReview = async (req: RequestType, res: Response) => {
  const { id } = req.params;
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    return res.status(400).send({
      message: 'Invalid ID',
    });
  }
  const { message, saved }: any = await createReviewValidation(req.body);

  const findInterview = await Interviewee.aggregate([{
    $unwind: '$interviews',
  }, {
    $match: {
      'interviews._id': new ObjectId(id),
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
      'interviews.review.saved': saved,
    },
  },
  ]);

  return res.status(201).json({
    message: 'Review created successfully',
    data: findInterview,
  });
};

export default createReview;
