export interface IUser {
     id: number;    
     name: string;
     email: string; 
     password: string;
     profileImage: string;    
     createdAt: Date;
     updatedAt: Date;
};

export interface IUserLogin {
     email: string;
     password: string;
};

export interface IUserRegister {
     name: string;
     email: string;
     password: string; 
     confirmPassword: string;
};

export interface IUserUpdate {
     name: string;
     password: string;
     confirmPassword: string;
     profileImage: string;
};

export interface ITokenDecoded {
     id: number;
     email: string;
     iat: number;
     exp: number;
};

export interface IClientBody
{
     name: string;
     gender: string;
     dateBirth: string;    
     address: string;
     number: number;
     complement: string; 
     district: string;
     city: string;
     state: string;
     cep: string;
     phone_1: string;    
     phone_2: string;
     email: string;
     cpf: string;
     cnpj: string;
};

export interface ICallBody
{
     subject: string;
     status: string;
     complement: string;
     clientId: number;
};