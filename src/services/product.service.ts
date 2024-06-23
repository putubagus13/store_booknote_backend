import { sequelize } from '@/configs/database.config';
import { CreateProductDto, GetProductDto, UpdateProductDto } from '@/dto/product.dto';
import UpdateProfileDto from '@/dto/user.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import Product from '@/models/product';
import ProductCategory from '@/models/product-category.model';
import ProductHistory from '@/models/product-history.model';
import ProductTransaction from '@/models/product-transaction';
import Store from '@/models/store.model';
import { ProductStatusHistory } from '@/utils/enums';
import { pagination } from '@/utils/generals/general.function';
import { ResponsePagination } from '@/utils/generals/generel.model';
import { logger } from '@/utils/loggers';
import { QueryTypes } from 'sequelize';
import { Service } from 'typedi';
import { v4 } from 'uuid';

@Service()
export default class ProductService {
  public createProduct = async (session: IAuthTokenPayload, dto: CreateProductDto) => {
    const { stock, price, productName, imageUrl, storeId, categoryIds, unit } = dto;
    const categoryIdSplit = categoryIds ? categoryIds.split(',') : [];

    const foundStore = await Store.findByPk(storeId);
    if (!foundStore) {
      throw new HttpException(400, 'Store not found');
    }

    try {
      await sequelize.transaction(async (t) => {
        const productId = v4();
        await Product.create(
          {
            id: productId,
            name: productName,
            price,
            stock,
            storeId,
            unit: unit,
            createdBy: session.userId,
            imageUrl,
            createdDt: new Date(),
          },
          { transaction: t },
        );

        await ProductHistory.create(
          {
            id: v4(),
            productId: productId,
            status: ProductStatusHistory.CREATE,
            price,
            stock,
            createdBy: session.userId,
            createdDt: new Date(),
          },
          { transaction: t },
        );

        if (categoryIdSplit.length > 0) {
          for (const categoryId of categoryIdSplit) {
            await ProductCategory.create(
              {
                id: v4(),
                productId: productId,
                categoryId,
                createdBy: session.userId,
                createdDt: new Date(),
              },
              { transaction: t },
            );
          }
        }
      });
    } catch (error) {
      logger.error(error.message);
      throw new HttpException(400, error.message);
    }
  };

  public updateProduct = async (session: IAuthTokenPayload, dto: UpdateProductDto, productId: string) => {
    const { productName, price, stock, categoryIds, imageUrl, unit } = dto;
    const categoryIdSplit = categoryIds ? categoryIds.split(',') : [];

    const foundProduct = await Product.findOne({
      where: { id: productId, deletedDt: null },
    });

    if (!foundProduct) {
      throw new HttpException(400, 'Product not found');
    }

    try {
      await sequelize.transaction(async (t) => {
        if (categoryIdSplit.length > 0) {
          await ProductCategory.destroy({
            where: { productId: productId },
            transaction: t,
          });

          for (const categoryId of categoryIdSplit) {
            await ProductCategory.create(
              {
                id: v4(),
                productId: productId,
                categoryId,
                createdBy: session.userId,
                createdDt: new Date(),
              },
              { transaction: t },
            );
          }
        }

        if (foundProduct.price !== price) {
          await ProductHistory.create({
            id: v4(),
            productId: productId,
            status: ProductStatusHistory.UPDATE_PRICE,
            price: price - foundProduct.price,
            stock: null,
            createdBy: session.userId,
            createdDt: new Date(),
          });
        }
        if (foundProduct.stock !== stock) {
          await ProductHistory.create({
            id: v4(),
            productId: productId,
            status: ProductStatusHistory.UPDATE_STOCK,
            price: null,
            stock: stock - foundProduct.stock,
            createdBy: session.userId,
            createdDt: new Date(),
          });
        }
        if (foundProduct.stock !== stock && foundProduct.price !== price) {
          await ProductHistory.create({
            id: v4(),
            productId: productId,
            status: ProductStatusHistory.UPDATE_STOCK_PRICE,
            price: price - foundProduct.price,
            stock: stock - foundProduct.stock,
            createdBy: session.userId,
            createdDt: new Date(),
          });
        }

        foundProduct.name = productName || foundProduct.name;
        foundProduct.price = price || foundProduct.price;
        foundProduct.stock = stock || foundProduct.stock;
        foundProduct.updatedBy = session.userId;
        foundProduct.updatedDt = new Date();
        foundProduct.imageUrl = imageUrl || foundProduct.imageUrl;
        foundProduct.unit = unit || foundProduct.unit;
        await foundProduct.save({ transaction: t });
      });
    } catch (error) {
      logger.error(error.message);
      throw new HttpException(400, error.message);
    }
  };

  public getAllProduct = async (storeId: string, dto: GetProductDto) => {
    const { page, limit, search, categoryIds, sort, order } = dto;
    const { sorting, offset } = pagination({ page, limit, sort, order });
    const categoryIdArray = categoryIds ? categoryIds.split(',').map((item) => `'${item}'`) : [];
    const products = await sequelize.query(
      `
        select
          p.id,
          p.name,
          p.price,
          p.stock,
          p.image_url as imageUrl,
          p.created_dt as createdDt,
          sum(pt.amount) as totalSold
        from product p
        left join product_transaction pt on p.id = pt.product_id
        left join product_category pc on pc.product_id = p.id
        where 
          p.deleted_dt is null
          and p.store_id = '${storeId}'
          and p.name like '%${search}%'
          and p.data_status is null
          ${categoryIdArray.length ? `and pc.category_id in (${categoryIdArray})` : ''}
          group by p.id
        order by ${sorting}
        limit ${limit || 10} offset ${offset}
      `,
      { type: QueryTypes.SELECT },
    );

    const totalDataProduct: any = await sequelize.query(
      `
        select
          count(distinct p.id) as totalData
        from product p
        where 
          p.deleted_dt is null
          and p.store_id = '${storeId}'
          and p.name like '%${search}%'
      `,
      { type: QueryTypes.SELECT },
    );

    const totalPage = Math.ceil(totalDataProduct[0].totalData / (limit || 10));
    const totalData = totalDataProduct.length;

    const payload = new ResponsePagination();
    payload.items = products;
    payload.totalPage = totalPage;
    payload.totalData = totalData;
    payload.currentPage = Number(page) || 1;

    return payload;
  };

  public deActiveProduct = async (productId: string) => {
    const foundProduct = await Product.findByPk(productId || '00000000-0000-0000-0000-000000000000');
    if (!foundProduct) {
      throw new HttpException(404, 'product not found');
    }

    foundProduct.dataStatus = new Date();
    await foundProduct.save();
  };

  public getDetailProduct = async (productId: string) => {
    const foundProduct = await Product.findOne({
      where: { id: productId, dataStatus: null },
      attributes: ['id', 'imageUrl', 'price', 'stock', 'unit', 'name'],
    });

    if (!foundProduct) throw new HttpException(404, 'Product not found');

    const foundProductCategories = await sequelize.query(
      `
        select
          c.id as value,
          c.name as label
        from categories c
        join product_category pc on c.id = pc.category_id
        where pc.deleted_dt is null
        and pc.product_id = '${productId}'
      `,
      { type: QueryTypes.SELECT },
    );

    return {
      ...foundProduct.dataValues,
      productCategories: foundProductCategories,
    };
  };
}
