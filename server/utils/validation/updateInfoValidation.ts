import Joi from 'joi';

const updateInfoValidation = async (data: object) => {
  const schema = Joi.object({
    image: Joi.string(),
    cv: Joi.string(),
    bio: Joi.string(),
    level: Joi.string(),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default updateInfoValidation;
