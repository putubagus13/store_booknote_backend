import { CreditTransactionDto, JournalSaldoDto } from '@/dto/journal.dto';
import { ResponseSuccess } from '@/global/response';
import { IAuthTokenPayload } from '@/interfaces/auth.interface';
import JournalService from '@/services/journal.service';
import { logger } from '@/utils/loggers';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export default class JournalController {
  private journalService = Container.get(JournalService);
  private response = new ResponseSuccess();

  public setSaldo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as JournalSaldoDto;
      const payload = await this.journalService.setSaldo(session, body);

      return this.response.Response200(res, { data: payload });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public creditTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session: IAuthTokenPayload = (req as any).session;
      const body = req.body as CreditTransactionDto;
      const payload = await this.journalService.creditTransaction(session, body);

      return this.response.Response200(res, { data: payload });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
