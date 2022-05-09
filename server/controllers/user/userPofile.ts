import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';

const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userInfo = await User.find({ _id: new ObjectId(id) });
  res.status(200).json({ data: userInfo });
};

export default getUserByID;
