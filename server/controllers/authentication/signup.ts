import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import {
  signToken, mailSender, signupValidation, CustomError, signupInterface,
  signupInterviewerValidation,
} from '../../utils';
import User from '../../database/Models/User';
import Interviewer from '../../database/Models/Interviewer';

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
      'Welcome in nova',
      `<h1>Welcome ${name} in nova</h1>
      <p>You have successfully signed up as an interviewer</p>
      <p>We received your request and we will contact you soon</p>
      <p>Thank you for choosing nova</p>`,
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
    <a href=http://localhost:8000/api/auth/verify?accessToken=${accessToken}>Verify Your Email</a>`);

  return res.status(201).json({
    message: 'Account created successfully please check your email to verify your account',
  });
};

export default signup;
