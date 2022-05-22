import { Response } from 'express';
import { Types } from 'mongoose';
import User from '../../database/Models/User';
import { CustomError, RequestType } from '../../utils';

const deleteUser = async (req: RequestType, res: Response) => {
  const { id }: any = req.params;

  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new CustomError('Invalid ID', 400);
  }

  const user: any = await User.findByIdAndDelete(id);

  console.log(user);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  res.json({
    message: 'User deleted successfully',

  });
};

export default deleteUser;
