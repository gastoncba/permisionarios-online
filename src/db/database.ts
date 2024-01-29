import * as sql from "mssql";
import * as dotenv from "dotenv";

dotenv.config();

const configConductores: sql.config = {
  server: process.env.SERVER|| "",
  database: process.env.DB_CONDUCTORES_NAME,
  user: process.env.DB_CONDUCTORES_USER,
  password: process.env.DB_CONDUCTORES_PASSWORD,
  options: {
    encrypt: false,
  },
};

const configCarnet: sql.config = {
  server: process.env.SERVER|| "",
  database: process.env.DB_CARNET_NAME,
  user: process.env.DB_CARNET_USER, 
  password: process.env.DB_CARNET_PASSWORD
  ,
  options: {
    encrypt: false,
  },
};

export const poolConductores = new sql.ConnectionPool(configConductores);
export const poolCarnet = new sql.ConnectionPool(configCarnet);
