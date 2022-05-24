import Joi, { ValidationResult } from 'joi';

const getInterviewTimeValidation = async (data: object) => {
  const interviewSchema = Joi.object({
    language: Joi.string().valid('JAVASCRIPT', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO').required(),
    specialization: Joi.string().valid('FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK').required(),
  });

  const result: ValidationResult = await interviewSchema.validateAsync(data, { abortEarly: false });
  return result;
};

export default getInterviewTimeValidation;
