import { HttpException } from '@/global/http-exception';
import { ResponseSuccess } from '@/global/response';
import UploadService from '@/services/upload.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export default class UploadFileController {
  public uploadService = Container.get(UploadService);
  public response = new ResponseSuccess();

  public postUploadFileUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.uploadService.uploadFileUser(req);

      if (!payload.length) throw new HttpException(400, 'Upload file failed');

      return this.response.Response200(res, { data: payload });
    } catch (error) {
      next(error);
    }
  };

  public postUploadFileProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.uploadService.uploadFileProduct(req);

      if (!payload.length) throw new HttpException(400, 'Upload file failed');

      return this.response.Response200(res, { data: payload });
    } catch (error) {
      next(error);
    }
  };
}
