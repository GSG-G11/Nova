import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  signToken, mailSender, signupValidation, CustomError,
} from '../../utils';
import User from '../../database/Models/User';

const signup = async (req: Request, res: Response) => {
    interface Body {
      name: string;
      email: string;
      password: string;
      role: string;
      }

    const {
      name, email, password, role,
    }:Body = req.body;

    await signupValidation({
      name, email, password,
    });

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      // await User.deleteOne({ email });
      throw new CustomError('Email already exists', 409);
    }

    const payload: JwtPayload = {
      email,
    };

    const accessToken: any = await signToken(payload);

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await User.create({
      email, password: hashedPassword, name, role,
    });

    await mailSender(email, 'Verify your email', `<h1>${name} Thanks for registering</h1>
    <h2>Click the link below to verify your account</h2>
    <a href=http://localhost:8000/api/auth/verify?accessToken=${accessToken}>Verify Your Email</a>`);
    return res.status(201).json({
      data: {
        name, email, password, role,
      },
      message: 'Account created successfully please check your email to verify your account',
    });
};

export default signup;
