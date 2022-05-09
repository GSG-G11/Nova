import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page, saved } = req.query;
  const id = req.userInfo?.id;
  const user : object | null = await User.findById(id);

  console.log(page, saved);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // TODO: replace the userId string with the userId from the user object
  const userInterviews = await Interviewee.find({ userId: '4' });

  if (userInterviews.length === 0) {
    return res.json({
      message: 'No interviews found',
    });
  }

  const { interviews } : any = userInterviews[0];

  const reviews = interviews.map((interview: any) => ({
    review: interview.review,
  }));

  // const filterReviews = saved === 'true' ? reviews.filter(/
  // (review: any) => review.saved === 'true') : reviews;

  // const paginatedReviews: number = filterReviews.slice((Number(page) - 1) * 3, Number(page) * 3);

  return res.json({
    message: 'Reviews found',
    data: reviews,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getAllReviews,
};
