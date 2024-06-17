import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { STATIC_FILE_PATH_PRODUCT, STATIC_FILE_PATH_USER } from '@/configs/env.config';

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.size > 10 * 1024 * 1024) {
    cb('Maximum file size is 10MB.', false);
  } else if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb('Please upload only images or video.', false);
  }
};

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_FILE_PATH_USER);
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const typeFileArr = file.mimetype.split('/');
    const extension = typeFileArr[typeFileArr.length - 1];
    const originalnameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');

    cb(null, `${id}-${originalnameWithoutExtension}-${Date.now()}.${extension}`);
  },
});

const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_FILE_PATH_PRODUCT);
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const typeFileArr = file.mimetype.split('/');
    const extension = typeFileArr[typeFileArr.length - 1];
    const originalnameWithoutExtension = file.originalname.replace(/\.[^/.]+$/, '');

    cb(null, `${id}-${originalnameWithoutExtension}-${Date.now()}.${extension}`);
  },
});

export const uploadFileUser = multer({ storage: storageUser, fileFilter });
export const uploadFileProduct = multer({ storage: storageProduct, fileFilter });
