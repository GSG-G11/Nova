import { Request, Response } from 'express';
import dotenv from 'dotenv';
import signUpCheckInput from '../../utils/validation/signUpSchema';
import { createAccount, findAccount } from '../../database/queries/signUpUser';
import { hashPassword, signToken, mailSender } from '../../utils';

dotenv.config();

const signUp = async (req: Request, res: Response) => {
  try {
    interface Body {
      name: string;
      email: string;
      password: string;
      role: string;
      }

    const {
      name, email, password, role,
    }:Body = req.body;

    await signUpCheckInput({
      name, email, password,
    });

    const checkEmail = await findAccount(email);

    if (checkEmail) {
      throw new Error('Email already exists');
    }

    const { SECRET_KEY } = process.env;

    if (!SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined');
    }
    const accessToken: any = await signToken(email, SECRET_KEY);

    const hashedPassword: string = await hashPassword(password);

    await createAccount({
      email, hashedPassword, name, role, accessToken,
    });

    mailSender(email, accessToken, name);
    return res.status(201).json({
      data: {
        name, email, password, role,
      },
      message: 'Account created successfully',
    });
  } catch (error) {
    return res.json(error);
  }
};

export default signUp;
