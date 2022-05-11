import Joi from 'joi';

const signupValidation = async (data: object) => {
  const schema = Joi.object({
    status: Joi.string().required(),
    page: Joi.string().required(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default signupValidation;
