import {Request, Response, NextFunction} from 'express';

interface Error {
  status?: number;
  message: string;
}
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    res.status(error.status).json({message: error.message});
  } else {
    res.status(500).json({message: 'Internal Server Error'});
  }
};

export default errorHandler;
