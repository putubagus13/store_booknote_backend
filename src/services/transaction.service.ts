import { sequelize } from '@/configs/database.config';
import { OrderDto } from '@/dto/transaction.dto';
import { HttpException } from '@/global/http-exception';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import Journal from '@/models/journal.model';
import Product from '@/models/product';
import ProductTransaction from '@/models/product-transaction';
import Store from '@/models/store.model';
import { JournalStatus } from '@/utils/enums';
import { logger } from '@/utils/loggers';
import { Service } from 'typedi';
import { v4 } from 'uuid';

@Service()
export default class TransactionService {
  public createOrder = async (session: IAuthTokenPayload, dto: OrderDto) => {
    const { userId } = session;
    const { productId, storeId, paymentMethod, amount, productQuantity } = dto;

    const foundStore = await Store.findOne({
      where: {
        id: storeId,
        deletedDt: null,
      },
    });

    if (!foundStore) throw new HttpException(404, 'Store not found');

    const foundProduct = await Product.findOne({
      where: {
        id: productId,
        deletedDt: null,
        dataStatus: null,
      },
    });

    if (!foundProduct) throw new HttpException(404, 'Product not found');

    try {
      await sequelize.transaction(async (t) => {
        await ProductTransaction.create(
          {
            id: v4(),
            productId,
            amount,
            storeId,
            paymentMethod,
            productQuantity,
            createdDt: new Date(),
            createdBy: userId,
          },
          { transaction: t },
        );

        await Journal.create(
          {
            id: v4(),
            storeId,
            productId,
            amount,
            status: JournalStatus.DEBIT,
            createdDt: new Date(),
            createdBy: userId,
          },
          { transaction: t },
        );

        foundProduct.stock = foundProduct.stock - productQuantity;
        await foundProduct.save({ transaction: t });
      });
    } catch (error) {
      logger.error(error);
      throw new HttpException(500, error);
    }
  };
}
