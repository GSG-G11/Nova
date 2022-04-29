import { Request, Response } from 'express';
import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
import signUpSchema from '../../utils/validation/signUpSchema';
import { createAccount, findAccount } from '../../database/queries/signUpUser';
import { hashPassword } from '../../utils/bcrypt';
import signToken from '../../utils/jwt';

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

    await signUpSchema({
      name, email, password,
    });

    const checkEmail = await findAccount(email);

    if (checkEmail) {
      return res.status(401).json({
        data: '',
        message: 'Email already exists',
      });
    }

    const hashedPassword: string = await hashPassword(password);
    await createAccount({
      email, hashedPassword, name, role,
    });

    const transporter: any = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY) {
      return res.status(401).json({
        data: '',
        message: 'SECRET_KEY is not defined',
      });
    }
    const token: any = await signToken.signToken(email, SECRET_KEY);

    const mailOptions: any = {
      from: `<${process.env.EMAIL}>`,
      to: email,
      subject: 'Verify your email',
      html: `<h1>${name} Thanks for registering</h1>
      <h2>Click the link below to verify your account</h2>
      <a href="http://localhost:8000/api/auth/verify/${token}">Verify Your Email</a>`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return res.status(500).json({
          data: info,
          message: 'Error sending email',
        });
      }
      return res.status(200).json({
        data: '',
        message: 'Email sent',
      });
    });

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
