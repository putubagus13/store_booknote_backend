import { IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateProfileDto {
  @IsOptional()
  imageUrl: string;

  @IsOptional()
  fullname: string;

  @IsOptional()
  oldPassword: string;

  @IsOptional()
  newPassword: string;
}
