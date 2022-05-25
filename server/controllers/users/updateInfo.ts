import { Response } from 'express';
import cloudinary from 'cloudinary';
import User from '../../database/Models/User';
import {
  CustomError, RequestType, updateInfoInterface, updateInfoValidation,
} from '../../utils';

cloudinary.v2.config({
  cloud_name: 'novainterviewe',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const updateInfo = async (req: RequestType, res: Response) => {
  const { userInfo } = req;

  const {
    image, cv, bio, level,
  }: updateInfoInterface = req.body;

  await updateInfoValidation({
    image, cv, bio, level,
  });

  // Get the image from the request and upload it to cloudinary
  if (image) {
    const imageUrl = await cloudinary.v2.uploader.upload(image);
    console.log(imageUrl);
  }

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
