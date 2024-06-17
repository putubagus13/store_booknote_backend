import { HttpException } from '@/global/http-exception';
import StoreType from '@/models/store-type.model';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Service } from 'typedi';
import { v4 } from 'uuid';

export class AddStoreTypeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  code: number;
}

@Service()
export default class StoreTypeService {
  public addType = async (dto: AddStoreTypeDto) => {
    const findTypeCode = await StoreType.findOne({
      where: { type: dto.code },
    });

    if (findTypeCode) throw new HttpException(400, 'Type code already exists');

    const data = await StoreType.create({
      id: v4(),
      name: dto.name,
      description: dto.description,
      type: dto.code,
      createdBy: 'system',
      created_dt: new Date(),
    });

    return data.dataValues;
  };

  public getAllStoreType = async () => {
    const data = await StoreType.findAll({
      where: { deleted_dt: null },
      attributes: ['name', 'type'],
    });

    return data;
  };
}
