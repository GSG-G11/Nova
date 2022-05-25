import { Response } from 'express';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RequestType, mailSender, CustomError } from '../../utils';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';
import postAvailableGlobal from '../interviewer/postAvailableGlobal';

const cancalInterview = async (req: RequestType, res: Response) => {
  const { interviewId }: any = req.params;
  const { userInfo } = req;

  const validId = Types.ObjectId.isValid(interviewId);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }

  let interviews;
  let intervieweeId;
  let interviewerId;

  if (userInfo?.role === 'interviewer') {
    const interview = await Interviewer.aggregate([
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
    ]);

    interviews = interview[0].interviews;
    interviewerId = interview[0].userId;
    intervieweeId = interviews.intervieweeId;
  } else {
    const interview = await Interviewee.aggregate([
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
    ]);

    interviews = interview[0].interviews;
    interviewerId = interviews.interviewerId;
    intervieweeId = interview[0].userId;
  }
  const interviewee = await User.find({ _id: new ObjectId(String(intervieweeId)) });
  const intervieweeEmail = interviewee[0].email;

  const interviewer = await User.find({ _id: new ObjectId(String(interviewerId)) });
  const interviewerEmail = interviewer[0].email;

  const { date, specialization, time }: any = interviews;

  const [{ modifiedCount }, { modifiedCount: modifiedCount2 }] = await Promise.all([
    Interviewer.updateOne(
      { userId: new ObjectId(String(interviewerId)), 'interviews._id': interviewId },
      { $set: { 'interviews.$.is_cancalled': true } },
    ),
    Interviewee.updateOne(
      { userId: new ObjectId(String(intervieweeId)), 'interviews._id': interviewId },
      { $set: { 'interviews.$.is_cancalled': true } },
    ),
  ]);

  if (modifiedCount > 0 && modifiedCount2 > 0) {
    await Promise.all([
      mailSender(
        intervieweeEmail,
        'Cancel Interview',
        `<h1> Cancel Interview </h1>
        <h2>We inform you that your interview, scheduled for ${date}, which was an ${specialization} specialization, has been cancelled </h2>
        <br> <h4>Thank you for your cooperation</h4>`,
      ),
      mailSender(
        interviewerEmail,
        'Cancel Interview',
        `<h1> Cancel Interview </h1>
      <h2>We inform you that your interview, scheduled for ${date}, which was an ${specialization} specialization, has been cancelled </h2>
      <br> <h4>Thank you for your cooperation</h4>`,
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
export default cancalInterview;
