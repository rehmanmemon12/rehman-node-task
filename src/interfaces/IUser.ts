export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
   name: string;
   email: string;
   role: string;
   password: string;
}

export interface IUserUpdateInputDTO {
    id: number;
    name: string;
    email: string;
}

export interface resetPasswordDTO {
    previousPassword: string;
    newPassword: string;
    confirmPassword: string;
}
