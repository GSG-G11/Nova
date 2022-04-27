import Joi from "joi";

const loginValidation = async (data: any) => {
    const schema = Joi.object({
        id: Joi.required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/).message("Password must contain at least 4 characters, one upper case letter, one lower case letter, one number, and one special character"),
        role: Joi.string().required()
    });

    const result: Joi.ValidationResult<any> = await schema.validateAsync(data);
    return result
}

export default loginValidation;