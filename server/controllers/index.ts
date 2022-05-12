import login from './authentication/login';
import checkAuth from './authentication/checkAuth';
import { updateReview } from './users/userController';
import getAllReviews from './users/getReviews';
import signup from './authentication/signup';
import validateEmail from './authentication/validateEmail';

export {
  signup,
  validateEmail,
  checkAuth,
  login,
  updateReview,
  getAllReviews,
};
