import Container from 'typedi';
import CategoryService, { GetCategoryDto } from '@/services/categories.service';
import { ResponseSuccess } from '@/global/response';
import { NextFunction, Response, Request } from 'express';
import { logger } from '@/utils/loggers';

export default class CategorieController {
  private catogorysService = Container.get(CategoryService);
  private response = new ResponseSuccess();

  public getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as GetCategoryDto;
      const payload = await this.catogorysService.getCategory(query);

      return this.response.Response200(res, { data: payload });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}
