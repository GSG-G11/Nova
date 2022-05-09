import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../../database/Models/User';

const getUserByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user : any = await User.findOne({ _id: new ObjectId(id) });
  res.status(200).json({
    data: {
      name: user.name,
      bio: user.bio,
      profile_picture: user.profile_picture,
    },
  });
};

export default getUserByID;
