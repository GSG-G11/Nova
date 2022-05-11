import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { mailSender, RequestType } from '../../utils';
import interviewValidation from '../../utils/validation/interviewValidation';
import emailTemplate from '../../utils/email/interviewEmailTemplate';

const createInterview = async (req: RequestType, res: Response) => {
  const id = req.userInfo?.id;
  const {
    interviewerId, date, time, language, specialization, questionCategory,
  } = req.body;

  // Validate the incoming request
  await interviewValidation(req.body);

  // Get the interviewee and interviewer
  const [{ email: intervieweeEmail }, { email: interviewerEmail }] : any = await Promise
    .all([await User.findById(id), await User.findById(interviewerId)]);

  const interview = {
    interviewerId,
    date,
    time,
    language,
    specialization,
    questionCategory,
  };

  const interviewerInterview = {
    intervieweeId: id,
    date,
    time,
    language,
    specialization,
    questionCategory,
  };

  // Update interviewee interviews
  await Interviewee.findOneAndUpdate({
    where: {
      userId: id,
    },
  }, {
    $push: {
      interviews: interview,
    },
  }, {
    new: true,
  });

  // Update interviewer interviews
  await Interviewee.findOneAndUpdate({
    where: {
      userId: interviewerId,
    },
  }, {
    $push: {
      interviews: interviewerInterview,
    },
  }, {
    new: true,
  });

  // Send Emails to both interviewee and interviewer

  mailSender(interviewerEmail, 'Interview Request', emailTemplate(date, time, language, specialization, questionCategory, intervieweeEmail));

  mailSender(intervieweeEmail, 'Interview Request', emailTemplate(date, time, language, specialization, questionCategory));

  // Return the interviewee interview
  res.status(201).json({
    message: 'Interview created successfully',
    data: {
      interview,
    },
  });
};

export default createInterview;
