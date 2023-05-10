import Joi from "joi";


const loginSchema = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(6).required(),    
});

const registerSchema = Joi.object({
     name: Joi.string().min(3).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(6).required(),
     confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});


export function validateRegister(name: string, email: string, password: string, confirmPassword: string) : string | null
{
     const { error } = registerSchema.validate({ name, email, password, confirmPassword });
     
     if (error) return String(error.details[0].message);
     
     return null;
}


export function validateLogin(email: string, password: string)
{
     const { error } = loginSchema.validate({ email, password });
     
     if (error) return String(error.details[0].message);
     
     return null;
}
