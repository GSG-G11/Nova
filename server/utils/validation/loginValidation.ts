import Joi, { ValidationResult } from 'joi';

const loginValidation = async (data: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/).message('Password must contain at least 4 characters, one upper case letter, one lower case letter, one number, and one special character'),
  });

  const result: ValidationResult = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default loginValidation;
