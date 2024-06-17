import { IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateProfileDto {
  @IsOptional()
  imageUrl: string;

  @IsNotEmpty()
  fullname: string;
}
