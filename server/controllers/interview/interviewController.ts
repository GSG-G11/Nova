import { Request, Response } from 'express';

const createInterview = (req: Request, res: Response) => {
  res.send('createInterview');
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createInterview,
};
