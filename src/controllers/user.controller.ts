import UpdateProfileDto from '@/dto/user.dto';
import { ResponseSuccess } from '@/global/response';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import UserService from '@/services/user.service';
import { NextFunction, Response, Request } from 'express';
import Container from 'typedi';

export default class UserController {
  public userService = Container.get(UserService);
  public response = new ResponseSuccess();

  public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as UpdateProfileDto;
      await this.userService.updateUserProfile(session, body);
      return this.response.Response200(res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
