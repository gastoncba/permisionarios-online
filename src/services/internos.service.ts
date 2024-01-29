import { poolConductores } from "../db/database";
import { Chapa } from "../entity";
import { AsignacionService } from "./asignacion.service";
import { PersonaService } from "./persona.service";

const personaService = new PersonaService();
const asignacionService = new AsignacionService();

export class InternoService {
  constructor() {}

  getInternos = async (nroInterno: string, idTipoServicio: number) => {
    const procedureResult = await poolConductores.request()
    .input("nroInterno", nroInterno)
    .input("idTipoServicio", idTipoServicio)
    .execute("P_ChapasXPermisionario_S_Internos_API");

    const chapasPromises: Promise<Chapa>[] = procedureResult.recordset.map(async (row) => {
      const persona = await personaService.findById(row.idPersona);
      const asignaciones = await asignacionService.find(row.idChapa, row.idTipoServicio);
      
      const chapa: Chapa = {
        idChapa: row.idChapa,
        nroInterno: row.nroInterno,
        tipoServicio: { id: row.idTipoServicio, servicio: row.servicio },
        permisionario: {
          idPermisionario: row.idPermisionario,
          mail: row.mail,
          telefonoCelular: row.telefonoCelular,
          telefonoFijo: row.telefonoFijo,
          nombre: persona.nombre,
          apellido: persona.apellido,
          cuil: persona.cuil,
          dni: persona.dni,
          domicilio: persona.domicilio,
          foto: persona.foto,
        },
        vehiculo: {
          idVehiculo: row.idVehiculo,
          dominio: row.dominio,
          marca: row.marca,
          modelo: row.modelo,
        },
        asignaciones,
      }
      
      return chapa
    });

    const chapas = await Promise.all(chapasPromises);

    return chapas;
    // const rows = procedureResult.recordset;
    // return rows
  };
}
