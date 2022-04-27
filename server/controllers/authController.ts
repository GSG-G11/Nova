/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import loginValidation from '../utils/validation/loginValidation';

const login = async (req: Request, res: Response) => {
  // TODO: change static user to the incoming request
  const user = {
    id: 1,
    email: 'test@test.com',
    password: 'Test@1',
    role: 'admin',
  };
  const { email, password }: {email: string, password: string} = user;

  try {
    const result = await loginValidation(user);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // TODO: search for user in collections, check the role and compare password

  // const validPassword: boolean = await bcrypt.compare(password, user.password);

  const validPassword: boolean = password === user.password;

  if (!validPassword) {
    return res.status(400).json({
      error: 'Invalid password',
    });
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
