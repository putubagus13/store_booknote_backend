import { ResendOtpDto, VerifyOtpRegisterDto } from '@/dto/otp.dto';
import { ResponseSuccess } from '@/global/response';
import OtpService from '@/services/otp.service';
import { PayloadSendEmail } from '@/utils/generals/generel.model';
import { logger } from '@/utils/loggers';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export default class OtpController {
  otpService = Container.get(OtpService);
  public response = new ResponseSuccess();

  public otpRegisterVerify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: VerifyOtpRegisterDto = req.body;
      const payload = await this.otpService.verifayOtp(body);
      return this.response.Response201(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public resendOtpRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as ResendOtpDto;
      await this.otpService.resendEmailOTPRegistService(body);
      return this.response.Response201(res);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
