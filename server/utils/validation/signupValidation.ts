import Joi from 'joi';

const signupValidation = async (data: object) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/).required(),
    role: Joi.string().valid('interviewer', 'interviewee').required(),
    languages: Joi.array().items(Joi.string().valid('JS', 'PHP', 'C++', 'C#', 'RUBY', 'PYTHON', 'JAVA', 'C', 'GO')),
    specialization: Joi.string().valid('FRONTEND', 'BACKEND', 'DEVOPS', 'SECURITY', 'DATA STRUCTURE', 'FULL STACK'),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default signupValidation;
