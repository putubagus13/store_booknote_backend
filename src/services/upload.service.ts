import { HttpException } from '@/global/http-exception';
import { Service } from 'typedi';
import { Request } from 'express';
import { STATIC_FILE_PATH_PRODUCT, STATIC_FILE_PATH_USER, STATIC_FILE_URL } from '@/configs/env.config';

@Service()
export default class UploadService {
  public uploadFileUser = async (req: Request) => {
    const fileUpload = req.files as Express.Multer.File[];

    if (!fileUpload.length) throw new HttpException(404, 'File not found');

    const fileUrlArr = fileUpload.map((element: Express.Multer.File, _: number) => {
      const typeFileArr = element.mimetype.split('/');

      if (typeFileArr[0].startsWith('image') || typeFileArr[0].startsWith('video')) {
        const uploadResponse = `${STATIC_FILE_URL}/${STATIC_FILE_PATH_USER.substring(STATIC_FILE_PATH_USER.indexOf('images'))}/${element.filename}`;

        return uploadResponse;
      }

      throw new HttpException(400, 'The file must be an image or video');
    });

    return fileUrlArr;
  };

  public uploadFileProduct = async (req: Request) => {
    const fileUpload = req.files as Express.Multer.File[];

    if (!fileUpload.length) throw new HttpException(404, 'File not found');

    const fileUrlArr = fileUpload.map((element: Express.Multer.File, _: number) => {
      const typeFileArr = element.mimetype.split('/');

      if (typeFileArr[0].startsWith('image') || typeFileArr[0].startsWith('video')) {
        const uploadResponse = `${STATIC_FILE_URL}/${STATIC_FILE_PATH_PRODUCT.substring(STATIC_FILE_PATH_PRODUCT.indexOf('images'))}/${element.filename}`;

        return uploadResponse;
      }

      throw new HttpException(400, 'The file must be an image or video');
    });

    return fileUrlArr;
  };
}
