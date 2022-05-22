import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  await res.clearCookie('token');
  res.json({
    message: 'Logout successful',
  });
};

export default logout;
