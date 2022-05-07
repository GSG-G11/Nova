import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { signToken, mailSender, signUpCheckInput } from '../../utils';
import User from '../../database/Models/User';

const signUp = async (req: Request, res: Response) => {
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

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      throw new Error('Email already exists');
    }

    const payload: JwtPayload = {
      email,
    };
    const accessToken: any = await signToken(payload);

    const hashedPassword: string = await bcrypt.hash(password, 10);

    await User.create({
      email, password: hashedPassword, name, role,
    });

    mailSender(email, accessToken, name);
    return res.status(201).json({
      data: {
        name, email, password, role,
      },
      message: 'Account created successfully',
    });
};

export default signUp;
