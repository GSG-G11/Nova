import { Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { RequestType, mailSender, CustomError } from '../../utils';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';

const cancelInterview = async (req: RequestType, res: Response) => {
  const { interviewId }: any = req.params;
  const { userInfo } = req;
  let globalIntreview;
  // let intervieweeResult;
  // let interviewerResult;

  // const currentdate = new Date();
  // const day = `${currentdate.getFullYear()}-${
  //   currentdate.getMonth() + 1}-${
  //   currentdate.getDate()}`;
  // const currentTime = currentdate.getHours();

  const validId = Types.ObjectId.isValid(interviewId);
  if (!validId) {
    throw new CustomError('Invalid interview id!', 400);
  }

  let secondUserId; // the id of the second user (interviewee or interviewer)

  if (userInfo?.role === 'interviewee') {
    const interview : any | undefined = await Interviewee.aggregate([
      {
        $match: {
          userId: userInfo.id,
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

    secondUserId = interview[0].interviews.interviewerId;
    globalIntreview = interview[0].interviews;
  } else if (userInfo?.role === 'interviewer') {
    const interview : any | undefined = await Interviewee.aggregate([
      {
        $match: {
          userId: userInfo.id,
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

    secondUserId = interview[0].interviews.interviewerId;
    globalIntreview = interview[0].interviews;
  }
  const { date, specialization } = globalIntreview;

  // const intreviewDate = date.toISOString().split('T')[0];
  // const intreviewTime = globalIntreview.time;

  //  if (intreviewDate >= day) {
  // console.log(intreviewDate, day, 'ture');

  const interviewerResult = await Interviewer.updateOne(
    { 'interviews._id': interviewId },
    { $set: { 'interviews.$.is_cancelled': true } },
  );
  const intervieweeResult = await Interviewee.updateOne(
    { 'interviews._id': interviewId },
    { $set: { 'interviews.$.is_cancelled': true } },
  );
  // }
  // query about intreview email  to use it when send email
  const { email } = await User.findOne(
    { _id: userInfo?.id },
  );

  const { email: secondUserEmail } = await User.findOne(
    { _id: secondUserId },
  );
  console.log(email, 'email', secondUserEmail, 'secondUserEmail');

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
  eslint-disable-next-line max-len
  <h2>We inform you that your interview, scheduled for ${date}, which was an ${specialization} specilaization, has been cancelled </h2>
  <br> <h4>Thank you for your cooperation</h4>`,
  );

  // if (!interviewerResult || !intervieweeResult) {
  //   throw new CustomError('Interview not found', 404);
  // }

  if (!interviewerResult || intervieweeResult.modifiedCount > 0) {
    return res.json({ message: 'Interview cancelled successfully!' });
  }
  throw new CustomError('Update failed', 400);
};

export default cancelInterview;
