import { Response } from 'express';
import Interviewee from '../../database/Models/Interviewee';
import User from '../../database/Models/User';
import { CustomError, mailSender, RequestType } from '../../utils';
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
  const { email: intervieweeEmail } = await User.findById(id);
  const { email: interviewerEmail } = await User.findById(interviewerId);

  // Get the interviewee interviews
  const { interviews } = await Interviewee.findOne({
    where: {
      userId: id,
    },
  });

  const interview = {
    interviewerId,
    date,
    time,
    language,
    specialization,
    questionCategory,
  };

  // Add the interview to the interviewee interviews
  if (interviews) {
    interviews.push(interview);
  }

  // Update the interviewee interviews
  const updatedInterviews = await Interviewee.updateOne({
    where: {
      userId: id,
    },
    interviews,
  });

  if (!updatedInterviews) {
    throw new CustomError('Interview not created', 400);
  }

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
