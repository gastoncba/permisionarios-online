import { poolCarnet } from "../db/database";
import { Persona } from "../entity/persona.entity";

export class PersonaService {
  constructor() {}

  findById = async (idPersona: number) => {
    const procedureResult = await poolCarnet.request()
      .input("idPersona", idPersona)
      .execute("mel_buscarPersona_xID");
    const persona: Persona = {
      nombre: procedureResult.recordset[0].nombre,
      apellido: procedureResult.recordset[0].apellido,
      cuil: procedureResult.recordset[0].CUIL,
      domicilio: procedureResult.recordset[0].localidad + " - " + procedureResult.recordset[0].barrio + " - " + procedureResult.recordset[0].numero,
      dni: procedureResult.recordset[0].nroDocumento,
      foto: procedureResult.recordset[0].foto,
    };

    //console.log("id personas => ", idPersona, procedureResult.recordset[0].idPersona)

    return persona;
  };
}
