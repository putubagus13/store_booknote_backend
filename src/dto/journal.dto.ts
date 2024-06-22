import { IsNotEmpty } from 'class-validator';

export class JournalSaldoDto {
  @IsNotEmpty()
  saldo: number;

  @IsNotEmpty()
  storeId: string;
}

export class CreditTransactionDto {
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  storeId: string;

  @IsNotEmpty()
  description: string;
}
