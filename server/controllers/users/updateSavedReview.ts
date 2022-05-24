import { Response } from 'express';
import { Types } from 'mongoose';
import Interviewee from '../../database/Models/Interviewee';
import { CustomError, RequestType } from '../../utils';

const updateReview = async (req: RequestType, res: Response) => {
  const { interviewId } : any = req.params;

  const validId = Types.ObjectId.isValid(interviewId);
  if (!validId) {
    throw new CustomError('Invalid ID', 400);
  }

  // Get the interview through the interviews in the interviewee collection
  const interview = await Interviewee.findOne({ 'interviews._id': interviewId }, { interviews: 1, _id: 0 });

  if (!interview) {
    return res.json({
      message: 'Interview not found',
    });
  }

  // Get the interview from the interviews array
  const { interviews } = interview;
  const findInterview = interviews.find((i: any) => i._id.toString() === interviewId);
  const { review: { saved } } = findInterview;
  // Update the saved in review
  const updatedReview = await Interviewee.updateOne(
    { 'interviews._id': interviewId },
    {
      $set: {
        'interviews.$.review.saved': !saved,
      },
    },
  );

  if (!updatedReview) {
    throw new CustomError('Failed to update', 400);
  }

  return res.json({
    message: 'Successfully updated!',
  });
};

export default updateReview;
