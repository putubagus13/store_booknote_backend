import OtpController from '@/controllers/otp.controller';
import { ResendOtpDto, VerifyOtpRegisterDto } from '@/dto/otp.dto';
import { v1 } from '@/global/api-version';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { PayloadSendEmail } from '@/utils/generals/generel.model';
import { Router } from 'express';

export default class OtpRouter {
  router = Router();
  path = v1 + '/otp';
  otpController = new OtpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //POST
    this.router.post(this.path + '/register/verify', ValidationMiddleware('body', VerifyOtpRegisterDto), this.otpController.otpRegisterVerify);
    this.router.post(this.path + '/register/resend', ValidationMiddleware('body', ResendOtpDto), this.otpController.resendOtpRegister);
  }
}
