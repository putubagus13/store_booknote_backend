import UploadFileController from '@/controllers/upload.controller';
import { v1 } from '@/global/api-version';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { uploadFileProduct, uploadFileUser } from '@/middlewares/upload.middleware';
import { Router } from 'express';

export default class UploadRouter {
  public uploadController = new UploadFileController();
  public authMiddleware = new AuthMiddleware();
  path = v1 + '/upload';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + '/user', this.authMiddleware.Authenticated, uploadFileUser.array('files'), this.uploadController.postUploadFileUser);
    this.router.post(this.path + '/product', this.authMiddleware.Authenticated, uploadFileProduct.array('files'), this.uploadController.postUploadFileProduct);
  }
}
