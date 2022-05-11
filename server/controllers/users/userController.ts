import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';
import validateQuery from '../../utils/validation/queryValidation';

const getAllReviews = async (req: RequestType, res: Response) => {
  const { page = '1', saved = 'false' } = req.query;

  await validateQuery(req.query);
  const id = req.userInfo?.id;
  const user : object | null = await User.findById(id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  if (!Number(page)) {
    throw new CustomError('Invalid Page', 400);
  }

  if (saved !== 'true' && saved !== 'false') {
    throw new CustomError('Invalid Input', 400);
  }

  // TODO: replace the userId string with the userId from the user object
  const userInterviews = await Interviewee.find({ userId: '4' });

  if (userInterviews.length === 0) {
    return res.json({
      message: 'No interviews found',
    });
  }

  // filter reviews based on the saved parameter and paginate the results
  const filteredReviews = await Interviewee.aggregate([{
    $unwind: '$interviews',
  },
  {
    $match: {
      'interviews.review.saved': saved === 'true',
    },
  }]).skip((Number(page) - 1) * 3).limit(3);

  // Get the reviews of the user
  const reviews = filteredReviews.map((interviewee) => ({
    review: interviewee.interviews.review,
  }));
  return res.json({
    message: 'Reviews found',
    length: reviews.length,
    page: Number(page),
    data: reviews,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getAllReviews,
};
