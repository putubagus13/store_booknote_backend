import { PASS, SECRET_KEY, USER } from '@/configs/env.config';
import { RegisterDto } from '@/dto/auth.dto';
import { VerifyOtpRegisterDto } from '@/dto/otp.dto';
import { HttpException } from '@/global/http-exception';
import Otp from '@/models/otp.model';
import { TypeOTP } from '@/utils/enums';
import { useOtpGenerated } from '@/utils/generals/general.function';
import { PayloadSendEmail } from '@/utils/generals/generel.model';
import { sendOtpEmailTampalte } from '@/utils/html-tamplate';
import { logger } from '@/utils/loggers';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from '@/models/user.model';
import { UserPassword } from '@/models/user-password.model';
import Store from '@/models/store.model';
import UserStore from '@/models/user-store.model';
import { sequelize } from '@/configs/database.config';
import { Service } from 'typedi';

@Service()
export default class OtpService {
  public sendEmailOTPRegistService = async (payload: PayloadSendEmail) => {
    const codeOtp = useOtpGenerated();
    console.log(USER, PASS);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'putu031216@gmail.com',
        pass: PASS,
      },
    });

    await Otp.create({
      id: v4(),
      codeOtp: codeOtp,
      type: TypeOTP.REGISTER,
      email: payload.to,
      description: 'OTP for register user',
      expiredDt: new Date(new Date().getTime() + 5 * 60000),
      createdBy: 'system',
      createdDt: new Date(),
    });

    await transporter
      .sendMail({
        from: 'noreply',
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: sendOtpEmailTampalte({
          message: payload.text,
          codeOtp: codeOtp,
          recipient: payload.to,
        }),
      })
      .then(async (info) => {
        logger.info('Email sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
      .catch((error) => {
        logger.error('Error occurred: %s', error.message), console.log(error);
      });
  };

  public otpExpiredVerify = async (dto: { codeOtp: number; type: string; email: string }) => {
    const findOtp = await Otp.findOne({
      where: {
        codeOtp: dto.codeOtp,
        type: dto.type,
        email: dto.email,
      },
      order: [['created_dt', 'DESC']],
    });

    if (!findOtp) throw new HttpException(400, 'Code OTP is incorrect');

    if (findOtp.expiredDt < new Date()) {
      throw new HttpException(400, 'Code OTP is expired');
    }

    return findOtp;
  };

  public verifayOtp = async (dto: VerifyOtpRegisterDto) => {
    const { token, codeOtp } = dto;
    const dataUser = jwt.verify(token, SECRET_KEY) as RegisterDto;

    const { fullname, email, password, storeName, storeType } = dataUser;

    await this.otpExpiredVerify({
      codeOtp: codeOtp,
      type: TypeOTP.REGISTER,
      email: email,
    });

    const userId = v4();

    const user = new User();
    user.userId = userId;
    user.email = email;
    user.fullname = fullname;

    const userPassword = new UserPassword();
    userPassword.id = v4();
    userPassword.userId = userId;
    userPassword.hashPassword = password;

    const store = new Store();
    store.id = v4();
    store.name = storeName;
    store.storeType = storeType;
    store.createdBy = userId;
    store.createdDt = new Date();

    const userStore = new UserStore();
    userStore.id = v4();
    userStore.userId = userId;
    userStore.storeId = store.id;
    userStore.createdDt = new Date();

    try {
      await sequelize.transaction(async (t) => {
        await user.save({ transaction: t });
        await userPassword.save({ transaction: t });
        await store.save({ transaction: t });
        await userStore.save({ transaction: t });
      });
    } catch (error) {
      console.error('Error in transaction:', error);
      throw new HttpException(400, error.message);
    }

    return 'User registered';
  };
}
