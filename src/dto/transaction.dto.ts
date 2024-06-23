import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  productQuantity: number;

  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
