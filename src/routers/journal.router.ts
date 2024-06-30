import JournalController from '@/controllers/journal.controller';
import { CreditTransactionDto, GetListJournalDto, JournalSaldoDto, TimeframeDto } from '@/dto/journal.dto';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class JournalRouter {
  private journalController = new JournalController();
  private authMiddleware = new AuthMiddleware();
  router = Router();
  path = v1 + '/journal';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //post
    this.router.post(this.path + '/debit', this.authMiddleware.Authenticated, ValidationMiddleware('body', JournalSaldoDto), this.journalController.setSaldo);
    this.router.post(
      this.path + '/credit',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('body', CreditTransactionDto),
      this.journalController.creditTransaction,
    );

    //get
    this.router.get(
      this.path + '/income-expenses/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', TimeframeDto),
      this.journalController.calculateIncomeAndExpenses,
    );

    this.router.get(
      this.path + '/history/:storeId',
      this.authMiddleware.Authenticated,
      ValidationMiddleware('query', GetListJournalDto),
      this.journalController.getJournalHistory,
    );
  }
}
