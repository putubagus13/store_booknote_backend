import { GetTransactionHistoryDto, OrderDto } from '@/dto/transaction.dto';
import { ResponseSuccess } from '@/global/response';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import TransactionService from '@/services/transaction.service';
import { logger } from '@/utils/loggers';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export default class TransactionController {
  private transactionService = Container.get(TransactionService);
  private response = new ResponseSuccess();

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as OrderDto;
      await this.transactionService.createOrder(session, body);
      return this.response.Response200(res);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public getTransactionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const query = req.query as unknown as GetTransactionHistoryDto;
      const data = await this.transactionService.getTransactionHistory(storeId, query);
      return this.response.Response200(res, { data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
