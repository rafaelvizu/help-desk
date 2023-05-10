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
     profileImage: string;
};