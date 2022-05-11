/* eslint-disable camelcase */
import { Response } from 'express';
import User from '../../database/Models/User';
import {
  CustomError, RequestType, updateInfoInterface, updateInfoValidation,
} from '../../utils';

const updateInfo = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  if (!userInfo) {
    throw new CustomError('User not found', 404);
  }

  const {
    profile_picture, cv, bio, level,
  }: updateInfoInterface = req.body;

  await updateInfoValidation({
    profile_picture, cv, bio, level,
  });

  const user = await User.updateOne({ _id: userInfo.id }, {
    $set: {
      profile_picture, cv, bio, level,
    },
  });

  return (user.modifiedCount > 0) ? res.json({ message: 'User updated successfully' })
    : res.status(200).json({ message: 'No data updated' });
};

export default updateInfo;
