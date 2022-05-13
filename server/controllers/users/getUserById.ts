import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../../database/Models/User';
import { CustomError } from '../../utils';

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validId: boolean = Types.ObjectId.isValid(id);

  if (!validId) {
    throw new CustomError('Invalid user', 400);
  }

  const {
    name,
    bio,
    profile_picture: profilePicture,
  } = await User.findOne({ _id: id });
  res.json({ data: { name, bio, profilePicture } });
};

export default getUserById;
