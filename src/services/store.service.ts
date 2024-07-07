import { HttpException } from '@/global/http-exception';
import StoreType from '@/models/store-type.model';
import Store from '@/models/store.model';
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

export class UpdateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  imageUrl: string;
}

@Service()
export default class StoreService {
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

  public updateStore = async (storeId: string, dto: UpdateStoreDto) => {
    const founfStore = await Store.findOne({
      where: { id: storeId, deletedDt: null },
    });

    if (!founfStore) throw new HttpException(404, 'Store not found');

    founfStore.name = dto.name;
    founfStore.storeImageUrl = dto.imageUrl;
    founfStore.updatedDt = new Date();

    await founfStore.save();
  };
}
