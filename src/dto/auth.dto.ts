import { IsEmail, IsNotEmpty } from "class-validator";

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

  constructor(email: string, password: string, fullname: string) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
  }
}

export class GetUserProfile {
  @IsNotEmpty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
