import 'reflect-metadata';
import { validateEnv } from './src/configs/env.config';
import AuthRoute from './src/routers/auth.route';
import StoreTypeRoute from './src/routers/store-type.router';
import { App } from './app';
import OtpRouter from '@/routers/otp.router';
import UploadRouter from '@/routers/upload.router';
import UserRouter from '@/routers/user.router';

validateEnv();

const app = new App([new AuthRoute(), new StoreTypeRoute(), new OtpRouter(), new UploadRouter(), new UserRouter()]);
app.listen();
