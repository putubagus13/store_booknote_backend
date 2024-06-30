import { IsOptional } from 'class-validator';

export class AnalitycDto {
  @IsOptional()
  monthTimeFrame: string;

  @IsOptional()
  weekTimeFrame: string;
}
