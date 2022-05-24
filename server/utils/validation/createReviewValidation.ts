import Joi, { ValidationResult } from 'joi';

const createReviewValidation = async (data: object) => {
  const reviewSchema = Joi.object({
    message: Joi.string().required(),
    saved: Joi.boolean().default(false),
  });

  const result: ValidationResult = await reviewSchema.validateAsync(data, { abortEarly: false });
  return result;
};

export default createReviewValidation;
