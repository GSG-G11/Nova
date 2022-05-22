import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CustomError, acceptInterviewerValidation } from '../../utils';
import Interviewer from '../../database/Models/Interviewer';

const acceptInterviewer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  await acceptInterviewerValidation(req.body);

  const validId = Types.ObjectId.isValid(id);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }

  await Interviewer.updateOne({ userId: new ObjectId(id) }, {
    $set: {
      approved: status,
    },
  });

  res.json({
    message: 'Application updated successfully!',
  });
};

export default acceptInterviewer;
