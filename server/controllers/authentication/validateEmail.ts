import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { findAccount, updateValidate } from '../../database/queries/signUpUser';

dotenv.config();

const validateEmail = async (req: Request, res: Response) => {
  try {
    const { accessToken }: { accessToken?: string } = req.query;

    if (!accessToken) {
      return res.status(401).json({
        data: '',
        message: 'accessToken is not defined',
      });
    }

    const user = await findAccount({ accessToken });
    await updateValidate({ accessToken }, true);

    return res.status(200).json({
      data: user,
      message: '',
    });
  } catch (error) {
    return res.json(error);
  }
};

export default validateEmail;
