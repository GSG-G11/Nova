/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';
import { paramSchema } from '../../utils';

const getUserById = async (req: Request, res: Response) => {
  const { id } = await paramSchema.validateAsync(req.params);
  const user = await User.findOne({ _id: new ObjectId(id) });

  const { name, bio, profile_picture } = user;
  res.json({ data: { name, bio, profile_picture } });
};

export default getUserById;
