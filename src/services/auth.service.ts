import { ForgotPassword, LoginDto, RegisterDto, ResetPasswordDto } from '@/dto/auth.dto';
import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import { sequelize } from '@/configs/database.config';
import { v4 } from 'uuid';
import { HttpException } from '@/global/http-exception';
import User from '@/models/user.model';
import { UserPassword } from '@/models/user-password.model';
import UserStore from '@/models/user-store.model';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { SECRET_KEY } from '@/configs/env.config';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import { WhereOptions } from 'sequelize';
import { IRegisterTokenPayload } from '@/interfaces/otp.interface';
import OtpService from './otp.service';
import Store from '@/models/store.model';
import StoreType from '@/models/store-type.model';
import { sendEmail } from '@/utils/generals/general.function';

@Service()
export default class AuthService {
  sendEmailOTPRegistService = new OtpService().sendEmailOTPRegistService;
  public authBase = async (where: WhereOptions<User>) => {
    try {
      const foundUser = await User.findOne({
        where: { ...where },
      });
      if (!foundUser) {
        throw new HttpException(400, 'User not found');
      }
      return foundUser;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  };

  public register = async (res: Response, dto: RegisterDto) => {
    const foundUser = await User.findOne({ where: { email: dto.email } });

    if (foundUser) {
      throw new HttpException(400, 'User already exists');
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    await this.sendEmailOTPRegistService({
      to: dto.email,
      subject: 'OTP for register user',
      text: 'OTP for register user',
    });

    const payload: IRegisterTokenPayload = {
      email: dto.email,
      fullname: dto.fullname,
      password: hashPassword,
      storeType: dto.storeType,
      storeName: dto.storeName,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(new Date().getTime() + 5 * 60000),
    });

    return {
      token,
    };
  };

  public login = async (res: Response, dto: LoginDto) => {
    const user = await User.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new HttpException(400, 'Email is incorrect');
    }

    const userPassword = await UserPassword.findOne({
      where: { userId: user.userId },
    });

    const isPasswordMatch = await bcrypt.compare(dto.password, userPassword.hashPassword);

    if (!isPasswordMatch) {
      throw new HttpException(400, 'Password is incorrect');
    }

    const userStore = await UserStore.findOne({
      where: { userId: user.userId },
    });

    const payload: IAuthTokenPayload = {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email,
      imageUrl: user.imageUrl,
      storeId: userStore.storeId,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Number(new Date()) + 86400000),
    });

    return {
      token,
    };
  };

  public getUserProfile = async (session: IAuthTokenPayload) => {
    const user = await this.authBase({ userId: session.userId });
    const userStore = await UserStore.findOne({
      where: {
        userId: session.userId,
        deletedDt: null,
      },
    });
    const store = await Store.findOne({
      where: {
        id: userStore.storeId,
        deletedDt: null,
      },
    });
    const storeType = await StoreType.findOne({
      where: {
        type: store.storeType,
        deletedDt: null,
      },
    });
    return {
      ...user.dataValues,
      ...userStore.dataValues,
      ...store.dataValues,
      storeTypeName: storeType.name,
    };
  };

  public forgotPassword = async ({ email }: ForgotPassword) => {
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      throw new HttpException(400, 'User not found');
    }

    const userStore = await UserStore.findOne({
      where: { userId: foundUser.userId },
    });

    if (!userStore) {
      throw new HttpException(400, 'User store not found');
    }

    const payload: IAuthTokenPayload = {
      userId: foundUser.userId,
      fullname: foundUser.fullname,
      email: foundUser.email,
      imageUrl: foundUser.imageUrl,
      storeId: userStore.storeId,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '1d',
    });

    await sendEmail({
      to: foundUser.email,
      subject: 'no-reply',
      text: 'Request Reset Password',
      token,
    });

    return token;
  };

  public resetPassword = async (dto: ResetPasswordDto) => {
    if (dto.password !== dto.confirmPassword) {
      throw new HttpException(400, 'Password not match');
    }

    const decoded = jwt.verify(dto.token, SECRET_KEY) as IAuthTokenPayload;
    if (!decoded) {
      throw new HttpException(400, 'Token invalid');
    }

    const hashPassword = bcrypt.hashSync(dto.password, 10);
    const userPassword = await UserPassword.findOne({
      where: { userId: decoded.userId },
    });

    try {
      userPassword.hashPassword = hashPassword;
      userPassword.updatedDt = new Date();
      await userPassword.save();
    } catch (error) {
      throw new HttpException(400, error.message);
    }

    return true;
  };
}
