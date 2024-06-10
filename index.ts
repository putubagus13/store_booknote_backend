import 'reflect-metadata';
import { validateEnv } from './src/configs/env.config';
import AuthRoute from './src/routers/auth.route';
import StoreTypeRoute from './src/routers/store-type.router';
import { App } from './app';

validateEnv();

const app = new App([new AuthRoute(), new StoreTypeRoute()]);
app.listen();
