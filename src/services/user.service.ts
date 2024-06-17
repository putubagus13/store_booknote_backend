import UpdateProfileDto from '@/dto/user.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import User from '@/models/user.model';
import { Service } from 'typedi';

@Service()
export default class UserService {
  public updateUserProfile = async (session: IAuthTokenPayload, dto: UpdateProfileDto) => {
    const { imageUrl, fullname } = dto;

    const foundUser = await User.findByPk(session.userId);
    if (!foundUser) {
      throw new HttpException(400, 'User not found');
    }

    foundUser.imageUrl = imageUrl || foundUser.imageUrl;
    foundUser.fullname = fullname;
    foundUser.updatedDt = new Date();

    await foundUser.save();
  };
}
