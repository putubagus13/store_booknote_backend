import UpdateProfileDto from '@/dto/user.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import { UserPassword } from '@/models/user-password.model';
import User from '@/models/user.model';
import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import { sequelize } from '@/configs/database.config';

@Service()
export default class UserService {
  public updateUserProfile = async (session: IAuthTokenPayload, dto: UpdateProfileDto) => {
    const { imageUrl, fullname, oldPassword, newPassword } = dto;

    try {
      await sequelize.transaction(async (t) => {
        const foundUser = await User.findByPk(session.userId, { transaction: t });
        if (!foundUser) {
          throw new HttpException(400, 'User not found');
        }

        if (oldPassword && newPassword) {
          if (oldPassword === newPassword) {
            throw new HttpException(400, 'Old password and new password must be different');
          }
          const foundUserPassword = await UserPassword.findOne({
            where: { userId: session.userId, deletedDt: null },
            transaction: t,
          });

          if (!foundUserPassword) {
            throw new HttpException(400, 'User password not found');
          }

          const isPasswordMatch = await bcrypt.compare(oldPassword, foundUserPassword.hashPassword);

          if (!isPasswordMatch) {
            throw new HttpException(400, 'Old password not match');
          }

          const hashPassword = await bcrypt.hash(newPassword, 10);

          foundUserPassword.hashPassword = hashPassword;
          foundUserPassword.updatedDt = new Date();
          await foundUserPassword.save({ transaction: t });
        }

        if (imageUrl && fullname) {
          foundUser.imageUrl = imageUrl || foundUser.imageUrl;
          foundUser.fullname = fullname || foundUser.fullname;
          foundUser.updatedDt = new Date();

          await foundUser.save({ transaction: t });
        }
      });
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  };
}
