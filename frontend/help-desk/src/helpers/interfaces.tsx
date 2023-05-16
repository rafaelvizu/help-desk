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

export interface ICall 
{
     id: number;
     subject: string;
     status: string;
     complement: string;
}