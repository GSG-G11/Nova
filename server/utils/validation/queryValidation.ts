import Joi, { ValidationResult } from 'joi';

const getInterviewsQueryValidation = async (data: object) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    page: Joi.string().required(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};
const getUsersQueryValidation = async (data: object) => {
  const schema = Joi.object({
    role: Joi.string().valid('interviewer', 'interviewee').required(),
    limit: Joi.string().invalid('0').required(),
    page: Joi.string(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

const validateQuery = async (query: any) => {
  const querySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    saved: Joi.boolean().allow(null),
  });

  const result: ValidationResult = await querySchema.validateAsync(query);

  return result;
};

export { validateQuery, getInterviewsQueryValidation, getUsersQueryValidation };
