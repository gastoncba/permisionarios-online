import { poolConductores } from "../db/database";
import { Asignacion } from "../entity";
import { PersonaService } from "./persona.service";

const personaService = new PersonaService();

export class AsignacionService {
  constructor() {}

  find = async (idChapa: number, idTipoServicio: number) => {
    const procedureResult = await poolConductores.request().input("idChapa", idChapa).input("idTipoServicio", idTipoServicio).execute("P_Asignaciones_S_idChapa_idTipoServicio_API");

    const asignacionesPromises: Promise<Asignacion>[] = procedureResult.recordset.map(async (row) => {
      const persona = await personaService.findById(row.idPersonaChofer);
      
      const asignacion: Asignacion = {
        idAsignacion: row.idAsignacion,
        estado: { id: row.idEstado, estado: row.estado },
        chofer: {
          fechaAlta: row.fechaAlta,
          nombre: persona.nombre,
          apellido: persona.apellido,
          dni: persona.dni,
          tipoChofer: row.tipoConductor,
        },
      };

      return asignacion;
    });

    const asignaciones = await Promise.all(asignacionesPromises);

    return asignaciones;
  };
}
