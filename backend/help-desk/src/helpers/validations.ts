import Joi from "joi";
import { ICallBody, IClientBody } from "./interfaces";


const nameSchema = Joi.object({
     name: Joi.string().min(3).required(),
});

const passwordSchema = Joi.object({
     password: Joi.string().min(6).required(),
     confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});

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

const clientSchema = Joi.object({
     name: Joi.string().min(3).max(255).trim().required(),
     gender: Joi.string().valid('M', 'F', 'N/A').allow(null),
     dateBirth: Joi.date().allow(null),
     address: Joi.string().min(1).max(100).trim().allow(null),
     number: Joi.number().integer().allow(null),
     complement: Joi.string().min(1).max(100).trim().allow(null),
     district: Joi.string().min(1).max(100).trim().allow(null),
     city: Joi.string().min(1).max(100).trim().allow(null),
     state: Joi.string().length(2).pattern(/^[A-Z]+$/i).allow(null),
     cep: Joi.string().length(7).pattern(/^[0-9]+$/i).allow(null),
     phone_1: Joi.string().length(11).pattern(/^[0-9]+$/i).allow(null),
     phone_2: Joi.string().length(11).pattern(/^[0-9]+$/i).allow(null),
     email: Joi.string().email().max(255).trim().allow(null),    
     cpf: Joi.string().length(11).pattern(/^[0-9]+$/i).allow(null),
     cnpj: Joi.string().length(14).pattern(/^[0-9]+$/i).allow(null),
});

const callSchema = Joi.object({
     subject: Joi.string().valid('SUPORTE', 'VISITA TÉCNICA', 'FINANCEIRO', 'OUTROS').required(),
     status: Joi.string().valid('ABERTO', 'EM PROGRESSO', 'ATENDIDO').required(),
     complement: Joi.string().min(1).max(255).trim().required(),
     clientId: Joi.number().integer().required(),
});


export function validateName(name: string) : string | null
{
     const { error } = nameSchema.validate({ name });
     
     if (error) return String(error.details[0].message);
     
     return null;
}

export function validatePassword(password: string, confirmPassword: string) : string | null
{
     const { error } = passwordSchema.validate({ password, confirmPassword });
     
     if (error) return String(error.details[0].message);
     
     return null;

}


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


export function validateClient(client: IClientBody) : string | IClientBody
{
     const { error, value } = clientSchema.validate(client);
     
     if (error) return String(error.details[0].message);
     
     return value as IClientBody;
}

export function validateCall(call: ICallBody) : string | ICallBody
{
     const { error, value } = callSchema.validate(call);
     
     if (error) return String(error.details[0].message);
     
     return value as ICallBody;
}