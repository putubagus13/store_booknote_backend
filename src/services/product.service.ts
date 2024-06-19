import { sequelize } from '@/configs/database.config';
import { CreateProductDto, UpdateProductDto } from '@/dto/product.dto';
import UpdateProfileDto from '@/dto/user.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import Product from '@/models/product';
import ProductCategory from '@/models/product-category.model';
import ProductHistory from '@/models/product-history.model';
import Store from '@/models/store.model';
import { ProductStatusHistory } from '@/utils/enums';
import { logger } from '@/utils/loggers';
import { Service } from 'typedi';
import { v4 } from 'uuid';

@Service()
export default class ProductService {
  public createProduct = async (session: IAuthTokenPayload, dto: CreateProductDto) => {
    const { stock, price, productName, imageUrl, storeId, categoryIds } = dto;

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

        if (categoryIds.length > 0) {
          for (const categoryId of categoryIds) {
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
    const { productName, price, stock, categoryIds, imageUrl } = dto;

    const foundProduct = await Product.findOne({
      where: { id: productId, deletedDt: null },
    });

    if (!foundProduct) {
      throw new HttpException(400, 'Product not found');
    }

    try {
      await sequelize.transaction(async (t) => {
        if (categoryIds.length > 0) {
          await ProductCategory.destroy({
            where: { productId: productId },
            transaction: t,
          });

          for (const categoryId of categoryIds) {
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
        await foundProduct.save({ transaction: t });
      });
    } catch (error) {
      logger.error(error.message);
      throw new HttpException(400, error.message);
    }
  };
}
