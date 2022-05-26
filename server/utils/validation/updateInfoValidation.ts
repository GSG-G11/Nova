import Joi from 'joi';

const updateInfoValidation = async (data: object) => {
  const schema = Joi.object({
    image: Joi.string().allow(''),
    cv: Joi.string().allow(''),
    bio: Joi.string().allow(''),
    level: Joi.string().allow(''),
  });

  const result: object = await schema.validateAsync(data, { abortEarly: false });
  return result;
};

export default updateInfoValidation;
