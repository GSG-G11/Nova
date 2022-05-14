import { Response } from 'express';
import User from '../../database/Models/User';
import {
  CustomError, RequestType, updateInfoInterface, updateInfoValidation,
} from '../../utils';

const updateInfo = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  const {
    image, cv, bio, level,
  }: updateInfoInterface = req.body;

  await updateInfoValidation({
    image, cv, bio, level,
  });

  const user = await User.updateOne({ _id: userInfo?.id }, {
    $set: {
      profile_picture: image, cv, bio, level,
    },
  });

  if (user.modifiedCount > 0) {
    return res.json({ message: 'User info updated successfully' });
  }
  throw new CustomError('Update failed', 400);
};

export default updateInfo;
