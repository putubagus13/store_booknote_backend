import { IsEmail, IsNotEmpty } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class LoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  storyType: number;

  constructor(email: string, password: string, fullname: string, storeName: string, storyType: number) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.storeName = storeName;
    this.storyType = storyType;
  }
}

export class GetUserProfile {
  @IsNotEmpty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

export class ForgotPassword {
  @IsNotEmpty()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class ResetPasswordDto {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  token: string;

  constructor(password: string, confirmPassword: string, token: string) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.token = token;
  }
}
