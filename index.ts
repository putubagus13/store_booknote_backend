import "reflect-metadata";
import { validateEnv } from "@/configs/env.config";
import { App } from "./app";
import AuthRoute from "@/routers/auth.route";

validateEnv();

const app = new App([new AuthRoute()]);
app.listen();
