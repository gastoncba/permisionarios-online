import express, { Express } from "express";

import { router as internosRouter } from './internos.router'

export const routerApi = (app: Express) => {
    const router = express.Router();
    app.use("/api", router);
    router.use("/internos", internosRouter);
  };
  