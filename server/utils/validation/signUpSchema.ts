import Joi from 'joi';

const signUpCheckInput = async (data: object) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/).required(),
  });

  const result: any = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default signUpCheckInput;
