/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import loginValidation from '../utils/validation/loginValidation';
import User from '../database/Models/User';
import { CustomError } from '../utils';

const login = async (req: Request, res: Response) => {
  const { email, password }: {email: string, password: string} = req.body;

  try {
    const result = await loginValidation(req.body);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      throw new CustomError(error.message, 400);
    }
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const validPassword: boolean = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new CustomError('Invalid password', 400);
  }

  if (!user.is_confirmed) {
    throw new CustomError('Please Verify your email', 401);
  }

  const token: string = sign({ id: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });

  return res.status(200).json({
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
};

export {
  login,
};
