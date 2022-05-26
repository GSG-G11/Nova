import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import {
  RequestType, mailSender, CustomError, cancelEmail,
} from '../../utils';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';
import postAvailableGlobal from '../interviewer/postAvailableGlobal';

const cancelInterview = async (req: RequestType, res: Response) => {
  const { interviewId }: any = req.params;
  const { userInfo } = req;

  const validId = Types.ObjectId.isValid(interviewId);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }

  const cond = [
    {
      $match: {
        userId: new ObjectId(userInfo?.id),
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        interviews: 1,
      },
    },
    {
      $unwind: '$interviews',
    },
    {
      $match: {
        'interviews._id': new ObjectId(interviewId),
      },
    },
  ];
  let interviews;
  let intervieweeId;
  let interviewerId;

  if (userInfo?.role === 'interviewer') {
    const interview = await Interviewer.aggregate(cond);

    interviews = interview[0].interviews;
    interviewerId = interview[0].userId;
    intervieweeId = interviews.intervieweeId;
  } else {
    const interview = await Interviewee.aggregate(cond);

    interviews = interview[0].interviews;
    interviewerId = interviews.interviewerId;
    intervieweeId = interview[0].userId;
  }

  const { date, specialization, time }: any = interviews;

  const [{ modifiedCount }, { modifiedCount: modifiedCount2 }, res1, res2] = await Promise.all([
    Interviewer.updateOne(
      { userId: new ObjectId(String(interviewerId)), 'interviews._id': interviewId },
      { $set: { 'interviews.$.is_cancelled': true } },
    ),
    Interviewee.updateOne(
      { userId: new ObjectId(String(intervieweeId)), 'interviews._id': interviewId },
      { $set: { 'interviews.$.is_cancelled': true } },
    ),
    User.find(
      { _id: new ObjectId(String(intervieweeId)) },
    ),
    User.find(
      { _id: new ObjectId(String(interviewerId)) },
    ),
  ]);

  const intervieweeEmail = res1[0].email;
  const interviewerEmail = res2[0].email;

  if (modifiedCount > 0 && modifiedCount2 > 0) {
    await Promise.all([
      mailSender(
        intervieweeEmail,
        'Cancel Interview',
        cancelEmail(
          date,
          specialization,
        ),
      ),
      mailSender(
        interviewerEmail,
        'Cancel Interview',
        cancelEmail(
          date,
          specialization,
        ),
      ),
    ]);

    const resultGlobal = await postAvailableGlobal(
      String(interviewerId),
      String(time),
      String(date),
    );
    return res.json({
      postInterviewee: resultGlobal,
      message: 'Interviews canceled successfully',
    });
  }
  throw new CustomError('Interview not found', 404);
};
export default cancelInterview;
