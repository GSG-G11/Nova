import { Request } from 'express';

interface signupInterface extends Request {
    userInfo?: {
      name: string;
      email: string;
      password: string;
      role: string;
    };
}
export default signupInterface;
