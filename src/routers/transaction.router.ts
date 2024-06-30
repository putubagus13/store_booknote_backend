import TransactionController from '@/controllers/transaction.controller';
import { GetTransactionHistoryDto, OrderDto } from '@/dto/transaction.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class TransactionRouter {
  private transactionController = new TransactionController();
  private authMiddleware = new AuthMiddleware();
  path = v1 + '/transaction';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //post
    this.router.post(this.path + '/order', this.authMiddleware.Authenticated, ValidationMiddleware('body', OrderDto), this.transactionController.createOrder);

    //get
    this.router.get(
      this.path + '/history/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', GetTransactionHistoryDto),
      this.transactionController.getTransactionHistory,
    );
  }
}
