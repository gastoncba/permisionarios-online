import { Asignacion } from "./asignacion.entity";
import { Permisionario } from "./permisionario.entity";
import { TipoServicio } from "./tipoServicio.enity";
import { Vehiculo } from "./vehiculo.entity";

export class Chapa {
    idChapa: number;
    nroInterno: string;
    tipoServicio: TipoServicio;
    permisionario: Permisionario;
    vehiculo: Vehiculo;
    asignaciones: Asignacion[];
    //Resto de los datos abajo
  }