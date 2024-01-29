import express, { Request, Response } from "express";
import cors from "cors";

import { poolCarnet, poolConductores } from "./db/database";
import { routerApi } from "./routes";

(async () => {
  try {
    await poolConductores.connect();
    await poolCarnet.connect();
    console.log("Conexión exitosa!");

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.get("/", (req: Request, res: Response) => {
      res.send("Permisionarios Online !!!");
    });

    routerApi(app);

    app.listen(8080, () => {});
  } catch (error) {
    console.log("Error en la conexión:", error);
  }
})();
