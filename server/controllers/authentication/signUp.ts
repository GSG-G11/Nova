import { Request, Response } from 'express';
import signUpSchema from '../../utils/validation/signUpSchema';
import { createAccount, findAccount } from '../../database/queries/signUpUser';
import { hashPassword } from '../../utils/bcrypt';

async function signUp(req: Request, res: Response) {
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

    return res.status(201).json({
      data: {
        name, email, password, role,
      },
      message: 'Account created successfully',
    });
  } catch (error) {
    return res.json(error);
  }
}

export default signUp;
