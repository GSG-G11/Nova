/* eslint-disable camelcase */
import { Response } from 'express';
import User from '../../database/Models/User';
import {
  CustomError, RequestType, updateInfoInterface, updateInfoValidation,
} from '../../utils';

const updateInfo = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  const {
    profile_picture, cv, bio, level,
  }: updateInfoInterface = req.body;

  await updateInfoValidation({
    profile_picture, cv, bio, level,
  });

  const user = await User.updateOne({ _id: userInfo?.id }, {
    $set: {
      profile_picture, cv, bio, level,
    },
  });

  if (user.modifiedCount > 0) {
    return res.json({ message: 'User updated successfully' });
  }
  throw new CustomError('Update failed', 500);
};

export default updateInfo;
