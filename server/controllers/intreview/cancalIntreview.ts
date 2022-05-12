/* eslint-disable space-before-blocks */
import { Response } from 'express';
import { RequestType, mailSender } from '../../utils';
import Interviewee from '../../database/Models/Interviewee';
import Interviewer from '../../database/Models/Interviewer';
import User from '../../database/Models/User';

const cancalInterview = async (req: RequestType, res: Response) => {
  // use vaildation for params after marge
  const { interviewId } : any = req.params;
  const { userInfo } = req;

  const user = await User.findOne({ _id: userInfo?.id }, { email: 1, _id: 1, name: 1 });
  const { email } = user;

  // eslint-disable-next-line max-len
  let collectionName: any; // the name of the collection (intrviewee or interviewer)

  // // query about role by _id
  if (userInfo){
    if (userInfo.role === 'interviewee') {
      collectionName = Interviewee;
    } else if (userInfo.role === 'interviewer') {
      collectionName = Interviewer;
    }
  }
  const result = await collectionName.updateOne({ 'interviews._id': interviewId }, { $set: { 'interviews.$.is_cancalled': true } });

  // mail sender to Interviewee or Interviewer
  const interview = await collectionName.findOne({ 'interviews._id': interviewId }, { interviews: 1, _id: 0 });

  if (!interview) {
    return res.json({
      message: 'Interview not found',
    });
  }

  // deruct the interview object to got the interviews array
  const { interviews } = interview;
  const { date, specilaization } = interviews[0];

  await mailSender(email, 'Cancel Interview', `<h1> Cancel Interview </h1>
    <h2>We inform you that your interview, scheduled for ${date}, which was an ${specilaization} specilaization, has been cancelled </h2>
    <br> <h4>Thank you for your cooperation</h4>`);

  return res.json({ data: result, message: 'Interviews updated successfully' });
};
export default cancalInterview;
