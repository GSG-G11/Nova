import { Response } from 'express';
import { RequestType } from '../../utils';
import Interviewee from '../../database/Models/Interviewee';

const cancalInterview = async (req: RequestType, res: Response) => {
  // use vaildation for params after marge
  const { interviewId } : any = req.params;

  // find the intreview object by interviewId
  const interview = await Interviewee.findOne({ 'interviews._id': interviewId }, { interviews: 1, _id: 0 });

  if (!interview) {
    return res.json({
      message: 'Interview not found',
    });
  }

  // deruct the interview object to got the interviews array
  const { interviews } = interview;
  const interviewObj = interviews[0];

  const result = await Interviewee.updateOne({ 'interviews._id': interviewId }, { $set: { 'interviews.$.is_cancalled': !interviewObj.is_cancalled } });

  return res.json({ data: result, message: 'Interviews updated successfully' });
};
export default cancalInterview;
