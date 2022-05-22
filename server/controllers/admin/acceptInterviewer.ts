import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { CustomError, acceptInterviewerValidation } from '../../utils';
// import Interviewer from '../../database/Models/Interviewer';

const acceptInterviewer = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { status } = req.body;
  await acceptInterviewerValidation(req.body);
  const validId = Types.ObjectId.isValid(id);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }
  res.json({
    message: 'Interviewer accepted successfully!',
  });
};

export default acceptInterviewer;
