import { AnalitycDto } from '@/dto/analityc.dto';
import { ResponseSuccess } from '@/global/response';
import AnalitycService from '@/services/analityc.service';
import { logger } from '@/utils/loggers';
import { NextFunction, Request, Response } from 'express';

export default class AnalitycController {
  private readonly analiticService = new AnalitycService();
  private response = new ResponseSuccess();

  public getCardAnalityc = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const query = req.query as unknown as AnalitycDto;

      const data = await this.analiticService.getCardAnalityic(storeId, query);
      return this.response.Response200(res, { data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  public getChartAnalityc = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const query = req.query as unknown as AnalitycDto;

      const data = await this.analiticService.chartAnalityc(storeId, query);
      return this.response.Response200(res, { data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
