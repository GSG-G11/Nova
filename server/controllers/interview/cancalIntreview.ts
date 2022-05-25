import { Response } from 'express';
import { Types } from 'mongoose';
import { RequestType, mailSender, CustomError } from '../../utils';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';

const cancalInterview = async (req: RequestType, res: Response) => {
  const { interviewId }: any = req.params;
  const { userInfo } = req;

  // use vaildation for params
  const validId = Types.ObjectId.isValid(interviewId);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }

  let collectionName: any; // the name of the collection (intrviewee or interviewer)
  let secondUserId; // the id of the second user (interviewee or interviewer)

  // // query about role by _id
  if (userInfo?.role === 'interviewee') {
    collectionName = Interviewee;

    // get intervieweeId to find his email
    const interview = await Interviewer.findOne({ 'interviews._id': interviewId });
    secondUserId = interview.interviews[0].interviewerId;
  } else if (userInfo?.role === 'interviewer') {
    collectionName = Interviewer;

    // get intervieweeId to find his email
    const interview = await Interviewer.findOne({ 'interviews._id': interviewId });
    secondUserId = interview.interviews[0].intervieweeId;
  }

  const result = await collectionName.updateOne(
    { 'interviews._id': interviewId },
    { $set: { 'interviews.$.is_cancalled': true } },
  );

  // query about interview info to use it when send email
  const interview = await collectionName.findOne(
    { 'interviews._id': interviewId },
    { interviews: 1, _id: 0 },
  );

  // query about intreview email  to use it when send email
  const { email } = await User.findOne(
    { _id: userInfo?.id },
  );

  const { email: secondUserEmail } = await User.findOne(
    { _id: secondUserId },
  );

  // destructur the interviewerId or intervieweeId object to got the interviews array
  const { interviews } = interview;
  const { date, specialization } = interviews[0];

  await mailSender(
    email,
    'Cancel Interview',
    `<h1> Cancel Interview </h1>
    <h2>We inform you that your interview, scheduled for ${date}, which was an ${specialization} specilaization, has been cancelled </h2>
    <br> <h4>Thank you for your cooperation</h4>`,
  );

  await mailSender(
    secondUserEmail,
    'Cancel Interview',
    `<h1> Cancel Interview </h1>
  <h2>We inform you that your interview, scheduled for ${date}, which was an ${specialization} specilaization, has been cancelled </h2>
  <br> <h4>Thank you for your cooperation</h4>`,
  );

  if (result.modifiedCount > 0) {
    return res.json({
      data: result,
      message: 'Interviews canceled successfully',
    });
  }
  throw new CustomError('Interview not found', 404);
};
export default cancalInterview;
