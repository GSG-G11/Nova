import joi from 'joi';

const paramSchema = joi.object({ id: joi.string().required() });

export default paramSchema;
