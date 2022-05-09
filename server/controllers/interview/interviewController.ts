import { Response } from 'express';
import Joi from 'joi';
import Interviewee from '../../database/Models/Interviewee';
import { CustomError, RequestType } from '../../utils';

const createInterview = async (req: RequestType, res: Response) => {
  const id = req.userInfo?.id;
  const {
    interviewerId, date, time, language, specialization, questionCategory,
  } = req.body;

  const interviewSchema = Joi.object({
    interviewerId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.number().required(),
    language: Joi.string().valid('JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO').required(),
    specialization: Joi.string().valid('FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK').required(),
    questionCategory: Joi.string().valid('Technical', 'Analytical', 'Algorithms', 'System Design').required(),
  });

  const validateInterview = await interviewSchema.validateAsync(req.body);

  if (validateInterview.error) {
    throw new CustomError(validateInterview.error.details[0].message, 400);
  }

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

  if (interviews) {
    interviews.push(interview);
  }

  const updatedInterviews = await Interviewee.updateOne({
    where: {
      userId: id,
    },
    interviews,
  });

  if (!updatedInterviews) {
    throw new CustomError('Interview not created', 400);
  }

  res.status(201).json({
    message: 'Interview created successfully',
    data: interviews,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  createInterview,
};
