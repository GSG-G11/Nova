import Joi from 'joi';

const signupValidation = async (data: object) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/).required(),
    role: Joi.string().valid('interviewer', 'interviewee').required(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

const signupInterviewerValidation = async (data: object) => {
  const schema = Joi.object({
    languages: Joi.array().items(Joi.string().valid('JAVASCRIPT', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO')).required(),
    specialization: Joi.string().valid('FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK').required(),
    cv: Joi.string().uri().required(),
    level: Joi.string().valid('JUNIOR', 'MIDDLE', 'SENIOR', 'EXPERT', 'INTERNSHIP').required(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export { signupValidation, signupInterviewerValidation };
