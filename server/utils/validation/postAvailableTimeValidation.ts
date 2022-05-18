import Joi, { ValidationResult } from 'joi';

const loginValidation = async (data: object) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    time: Joi.number().required(),
  });

  const result: ValidationResult = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default loginValidation;
