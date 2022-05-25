import Joi, { ValidationResult } from 'joi';

const interviewValidation = async (data: object) => {
  const interviewSchema = Joi.object({
    interviewerId: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.number().required(),
    language: Joi.string().valid('JAVASCRIPT', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO').required(),
    specialization: Joi.string().valid('FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK').required(),
    questionCategory: Joi.string().valid('Technical', 'Analytical', 'Algorithms', 'System Design').required(),
  });

  const result: ValidationResult = await interviewSchema.validateAsync(data, { abortEarly: false });
  return result;
};

export default interviewValidation;
