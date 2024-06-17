import UploadFileController from '@/controllers/upload.controller';
import { v1 } from '@/global/api-version';
import { uploadFileProduct, uploadFileUser } from '@/middlewares/upload.middleware';
import { Router } from 'express';

export default class UploadRouter {
  public uploadController = new UploadFileController();
  path = v1 + '/upload';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/user', uploadFileUser.array('files'), this.uploadController.postUploadFileUser);
    this.router.post(this.path + '/product', uploadFileProduct.array('files'), this.uploadController.postUploadFileProduct);
  }
}
