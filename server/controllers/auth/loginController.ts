import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../database/Models/User';
import { CustomError, signToken, loginValidation } from '../../utils';

// I used declare to use JWT_SECRET from process.env

const login = async (req: Request, res: Response) => {
  const { email, password }: {email: string, password: string} = req.body;

  await loginValidation(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const validPassword: boolean = await compare(password, user.password);

  if (!validPassword) {
    throw new CustomError('Invalid password', 400);
  }

  const { id, role, is_verified: isVerified } = user;

  if (!isVerified) {
    throw new CustomError('Please Verify your email', 401);
  }

  const payload: JwtPayload = {
    id,
    email,
    role,
  };

  const token: any = await signToken(payload, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });

  return res.json({
    message: 'Login successful',
    data: {
      user: {
        id,
        email,
        role,
      },
    },
  });
};

export default login;
