import 'reflect-metadata';
import { validateEnv } from './src/configs/env.config';
import AuthRoute from './src/routers/auth.route';
import StoreRoute from './src/routers/store.router';
import { App } from './app';
import OtpRouter from '@/routers/otp.router';
import UploadRouter from '@/routers/upload.router';
import UserRouter from '@/routers/user.router';
import ProductRouter from '@/routers/product.router';
import JournalRouter from '@/routers/journal.router';
import CategoriesRouter from '@/routers/categories.router';
import TransactionRouter from '@/routers/transaction.router';
import AnalitycRouter from '@/routers/analityc.router';

validateEnv();

const app = new App([
  new AuthRoute(),
  new StoreRoute(),
  new OtpRouter(),
  new UploadRouter(),
  new UserRouter(),
  new ProductRouter(),
  new JournalRouter(),
  new CategoriesRouter(),
  new TransactionRouter(),
  new AnalitycRouter(),
]);
app.listen();
