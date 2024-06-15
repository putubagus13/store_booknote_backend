import OtpController from '@/controllers/otp.controller';
import { VerifyOtpRegisterDto } from '@/dto/otp.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class OtpRouter {
  router = Router();
  path = '/otp';
  otpController = new OtpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/register/verify', ValidationMiddleware('body', VerifyOtpRegisterDto), this.otpController.otpRegisterVerify);
  }
}
