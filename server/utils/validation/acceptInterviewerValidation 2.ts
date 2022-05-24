import Joi, { ValidationResult } from 'joi';

const acceptInterviewerValidation = async (data: object) => {
  const schema = Joi.object({
    status: Joi.string().valid('APPROVED', 'REJECTED').required(),
  });

  const result: ValidationResult = await schema.validateAsync(data);
  return result;
};

export default acceptInterviewerValidation;
