import { IdentificadorPDV } from "../models/identificador-pdv.model";
import { callJsonService } from "../services/externo/api.service";
import { utilsObjToJson } from "../utils/objToJson";

export async function validarIdentificador(identificador: IdentificadorPDV): Promise<string[]> {
  const erros: string[] = [];

  identificador.id = 1;
  const { TPDV } = utilsObjToJson("TPDV", identificador, {
    CODPDV: "id" 
  });

  const requestBody = {
    TPDV,
    VERSAO: identificador.versao
  };

  try {
    const result = await callJsonService("PdvPfxSP.persiste", requestBody);
    if(result.TPDV_STATUS == 500){
      console.log("❌ Identificador não validado no backend:", result.TPDV_MSG);
      throw new Error(result.TPDV_MSG)
    } else{
      console.log("✅ Identificador validado no backend:", result);
    }
    
  } catch (error: any) {
    console.error("❌ Falha ao validar identificador no backend:", error.message);
    erros.push(error.message || "Erro desconhecido.");
  }

  return erros;
}
