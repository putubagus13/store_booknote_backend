import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  categoryIds: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsUUID()
  storeId: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  categoryIds: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}

export class GetProductDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  categoryIds: string;

  @IsOptional()
  sort: string;

  @IsOptional()
  order: string;

  @IsOptional()
  status: string;
}

export class GetProductHistoryDto {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  search: string;

  @IsOptional()
  categoryIds: string;

  @IsOptional()
  sort: string;

  @IsOptional()
  order: string;

  @IsOptional()
  status: string;

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;
}
