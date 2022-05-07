import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: 'Not found',
  });
};

export default notFound;
