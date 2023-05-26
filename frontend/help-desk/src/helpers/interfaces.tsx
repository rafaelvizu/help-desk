export interface ILogin
{
     email: string;
     password: string;
}

export interface IRegister
{
     name: string;
     email: string;
     password: string;
     confirmPassword: string;
}

export interface IUser
{
     name: string;
     email: string;
     profileImage: string;
}

export interface IAuthContextData
{
     token: string | undefined;
     setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
     user: IUser | undefined;
     setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

export interface IClientContextData
{
     clients: IClient[];
}

export interface ICall 
{
     id?: number;
     subject: string;
     status: string;
     complement: string;
     clientId: number;
     createdAt?: string;
     updatedAt?: string;
}


export interface IClient
{
     id?: number;
     name: string;
     gender: string | null;
     dateBirth: string | null;
     cpf: string | null;
     cnpj: string | null;
     phone_1: string | null;
     phone_2: string | null;
     email: string | null;
     address: string | null;
     number: number | null;
     complement: string | null;
     district: string | null;
     city: string | null;     
     state: string | null;
     cep: string | null;
     createdAt?: string;
     updatedAt?: string;
}