import Categories from '@/models/categories.model';
import Store from '@/models/store.model';
import { IsNotEmpty } from 'class-validator';
import { Service } from 'typedi';

export class GetCategoryDto {
  @IsNotEmpty()
  storeId: number;
}

@Service()
export default class CategoryService {
  public getCategory = async (dto: GetCategoryDto) => {
    console.log(dto);
    const foundStore = await Store.findByPk(dto.storeId);
    const foundCatogory = await Categories.findAll({
      where: { storeType: foundStore.storeType },
      attributes: ['id', 'name'],
    });

    return foundCatogory;
  };
}
