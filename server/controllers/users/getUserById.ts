import { Request, Response } from 'express';
import User from '../../database/Models/User';
import { paramSchema } from '../../utils';

const getUserById = async (req: Request, res: Response) => {
  const { id } = await paramSchema.validateAsync(req.params);
  const {
    name,
    bio,
    profile_picture: profilePicture,
  } = await User.findOne({ _id: id });
  res.json({ data: { name, bio, profilePicture } });
};

export default getUserById;
