import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import { CustomError, RequestType } from '../../utils';

const updateReview = async (req: RequestType, res: Response) => {
  const { interviewId } : any = req.params;

  // Get the interview through the interviews in the interviewee collection
  const interview = await Interviewee.findOne({ 'interviews._id': interviewId }, { interviews: 1, _id: 0 });

  if (!interview) {
    return res.json({
      message: 'Interview not found',
    });
  }

  // Get the interview from the interviews array
  const { interviews } = interview;
  const { review } = interviews[0];
  const { saved } = review;

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
    throw new CustomError('Failed to update', 500);
  }

  return res.json({
    message: 'Interview found',
    data: review,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  updateReview,
};
