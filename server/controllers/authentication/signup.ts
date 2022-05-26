import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import {
  signToken, mailSender, signupValidation, CustomError, signupInterface,
  signupInterviewerValidation,
} from '../../utils';
import User from '../../database/Models/User';
import Interviewer from '../../database/Models/Interviewer';
import verifyEmail from '../../utils/email/verifyEmail';

const signup = async (req: Request, res: Response) => {
  const {
    name, email, password, role, languages, specialization, cv, level,
  }: signupInterface = req.body;

  await signupValidation({
    name, email, password, role,
  });

  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    throw new CustomError('Email already exists', 409);
  }

  const payload: JwtPayload = {
    email,
  };

  const accessToken: any = await signToken(payload);

  const hashedPassword: string = await hash(password, 10);

  if (role === 'interviewer') {
    await signupInterviewerValidation({
      languages, specialization, cv, level,
    });

    const user = await User.create({
      email, password: hashedPassword, name, role, cv, level,
    });

    const { _id } = user;

    await Interviewer.create({
      userId: _id,
      languages,
      specialization,
    });

    await mailSender(
      email,
      'Welcome in Nova',
      verifyEmail(name, accessToken),
    );

    return res.status(201).json({
      message: 'Account created successfully please wait for the email',
    });
  }

  await User.create({
    email, password: hashedPassword, name, role,
  });
  await mailSender(email, 'Verify your email', `<h1>${name} Thanks for registering</h1>
    <h2>Click the link below to verify your account</h2>
    <a href=http://localhost:3000/auth/verify?accessToken=${accessToken}>Verify Your Email</a>`);

  return res.status(201).json({
    message: 'Account created successfully please check your email to verify your account',
  });
};

export default signup;
