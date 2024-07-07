import { IsNotEmpty } from 'class-validator';

export class VerifyOtpRegisterDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  codeOtp: number;

  constructor(token: string, codeOtp: number) {
    this.token = token;
    this.codeOtp = codeOtp;
  }
}

export class ResendOtpDto {
  @IsNotEmpty()
  token: string;
}
