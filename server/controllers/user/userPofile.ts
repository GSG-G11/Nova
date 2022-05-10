/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';
import { paramSchema } from '../../utils';

const getUserById = async (req: Request, res: Response) => {
  const { id } = await paramSchema.validateAsync(req.params);
  const user : object | null = await User.findOne({ _id: new ObjectId(id) });
  res.json({ data: user });
};

export default getUserById;
