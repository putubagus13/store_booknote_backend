import { LoginDto, RegisterDto } from "@/dto/auth.dto";
import { Service } from "typedi";
import bcrypt from "bcrypt";
import { sequelize } from "@/configs/database.config";
import { v4 } from "uuid";
import { HttpException } from "@/global/http-exception";
import User from "@/models/user.model";
import { UserPassword } from "@/models/user-password.model";
import UserStore from "@/models/user-store.model";
import Store from "@/models/store.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import { SECRET_KEY } from "@/configs/env.config";
import { IAuthTokenPayload } from "@/interfaces/auth.interface";
import { WhereOptions } from "sequelize";

@Service()
export default class AuthService {
  public authBase = async (where: WhereOptions<User>) => {
    try {
      const foundUser = await User.findOne({
        where: { ...where },
      });
      if (!foundUser) {
        throw new HttpException(400, "User not found");
      }
      return foundUser;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  };

  public register = async (dto: RegisterDto) => {
    const foundUser = await User.findOne({ where: { email: dto.email } });

    if (foundUser) {
      throw new HttpException(400, "User already exists");
    }

    const userId = v4();
    const hashPassword = await bcrypt.hash(dto.password, 10);

    const user = new User();
    user.userId = userId;
    user.email = dto.email;
    user.fullname = dto.fullname;

    const userPassword = new UserPassword();
    userPassword.id = v4();
    userPassword.userId = userId;
    userPassword.hashPassword = hashPassword;

    const store = new Store();
    store.id = v4();
    store.name = dto.storeName;
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
      console.error("Error in transaction:", error);
      throw new HttpException(400, error.message);
    }

    return "User registered";
  };

  public login = async (res: Response, dto: LoginDto) => {
    const user = await User.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new HttpException(400, "Email is incorrect");
    }

    const userPassword = await UserPassword.findOne({
      where: { userId: user.userId },
    });

    const isPasswordMatch = await bcrypt.compare(
      dto.password,
      userPassword.hashPassword
    );

    if (!isPasswordMatch) {
      throw new HttpException(400, "Password is incorrect");
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
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Number(new Date()) + 86400000),
    });

    return {
      token,
    };
  };

  public getUserProfile = async (session: IAuthTokenPayload) => {
    const user = await this.authBase({ userId: session.userId });
    return user;
  };
}
