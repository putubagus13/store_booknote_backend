import { IsNotEmpty, IsOptional } from 'class-validator';

export class JournalSaldoDto {
  @IsNotEmpty()
  saldo: number;

  @IsNotEmpty()
  storeId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: string;
}

export class CreditTransactionDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  storeId: string;

  @IsNotEmpty()
  description: string;
}

export class TimeframeDto {
  @IsOptional()
  monthTimeFrame: string;
}

export class GetListJournalDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  sort: string;

  @IsOptional()
  order: string;

  @IsOptional()
  search: string;

  @IsOptional()
  status: string;

  @IsOptional()
  monthTimeFrame: string;
}

export class exportJournalDto {
  @IsOptional()
  monthTimeFrame: string;
}
