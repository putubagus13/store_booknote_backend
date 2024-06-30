import { sequelize } from '@/configs/database.config';
import { GetTransactionHistoryDto, OrderDto } from '@/dto/transaction.dto';
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
import generatedOtp from 'otp-generator';
import { pagination } from '@/utils/generals/general.function';
import { QueryTypes } from 'sequelize';
import { ResponsePagination } from '@/utils/generals/generel.model';

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
        const codeInvoice =
          'INV' +
          generatedOtp.generate(10, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: true,
            specialChars: false,
          });

        await ProductTransaction.create(
          {
            id: v4(),
            productId,
            amount,
            storeId,
            paymentMethod,
            productQuantity,
            code: codeInvoice,
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
            code: codeInvoice,
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

  public getTransactionHistory = async (storeId: string, dto: GetTransactionHistoryDto) => {
    const { page, limit, sort, order, startDate, endDate } = dto;

    const { offset, sorting } = pagination({
      page,
      limit,
      sort,
      order,
    });

    const search = dto.search ? `%${dto.search}%` : '%';

    const queryData = `
      select
        pt.id,
        p.name,
        pt.amount,
        pt.product_quantity as productQuantity,
        pt.payment_method as paymentMethod,
        pt.code,
        pt.created_dt as createdDt 
      from product_transaction pt 
      join product p on p.id = pt.product_id
      where
        pt.deleted_dt is null
        and p.name like '${search}'
        and pt.store_id = "${storeId}"
        ${startDate ? `and pt.created_dt between '${startDate}' and '${endDate}' + interval 1 day` : ''}
      group by pt.id
      order by ${sorting}
      limit ${limit || 10} offset ${offset}
    `;
    const dataTransaction = await sequelize.query(queryData, { type: QueryTypes.SELECT });

    const queryTotalData = `
      select
        count(pt.id) as totalData
      from product_transaction pt 
      join product p on p.id = pt.product_id
      where
        pt.deleted_dt is null
        and p.name like '${search}'
        and pt.store_id = "${storeId}"
        ${startDate ? `and pt.created_dt between '${startDate}' and '${endDate}' + interval 1 day` : ''}
      group by pt.id
    `;

    const totalDataTransaction = await sequelize.query(queryTotalData, { type: QueryTypes.SELECT });
    const totalPage = Math.ceil(totalDataTransaction.length / (limit || 10));
    const totalData = totalDataTransaction.length;

    const payload = new ResponsePagination();
    payload.totalPage = totalPage;
    payload.totalData = totalData;
    payload.currentPage = Number(page) || 1;
    payload.items = dataTransaction;

    return payload;
  };
}
