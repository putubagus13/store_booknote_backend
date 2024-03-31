import { LoginDto, RegisterDto } from "@/dto/auth.dto";
import User from "@/models/user.model";
import { Response } from "express";
import { IAuthTokenPayload } from "@/interfaces/auth.interface";
import { WhereOptions } from "sequelize";
export default class AuthService {
    authBase: (where: WhereOptions<User>) => Promise<User>;
    register: (dto: RegisterDto) => Promise<string>;
    login: (res: Response, dto: LoginDto) => Promise<{
        token: string;
    }>;
    getUserProfile: (session: IAuthTokenPayload) => Promise<User>;
}
