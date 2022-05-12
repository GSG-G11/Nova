import Joi, { ValidationResult } from 'joi';

const validateQuery = async (query: any) => {
  const querySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    saved: Joi.boolean(),
  });

  const result: ValidationResult = await querySchema.validateAsync(query);

  return result;
};

export default validateQuery;
