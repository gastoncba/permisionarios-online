import express, { NextFunction, Request, Response } from "express";

import { InternoService } from "../services/internos.service";

export const router = express.Router();
const internoService = new InternoService();

router.get("/:nroInterno/:idTipoServicio", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nroInterno, idTipoServicio } = req.params;

    const internos = await internoService.getInternos(nroInterno, Number.parseInt(idTipoServicio));
    res.json(internos);
  } catch (error) {
    console.log("error => ", error);
  }
});
