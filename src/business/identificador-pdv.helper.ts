import { IdentificadorPDV } from "../models/identificador-pdv.model";
import { callJsonService } from "../services/externo/api.service";

export async function validarIdentificador(identificador: IdentificadorPDV): Promise<string[]> {
  const erros: string[] = [];

  const requestBody = {
    TPDV: {
      CODPDV: identificador.id ?? "1",
      CODEMPRESA: identificador.codempresa,
      APRESENTAIMGPRODUTO: identificador.apresentaimagemproduto,
      IMPRESSORADEFAULT: identificador.impressoradefault,
      ASSINATURA: identificador.assinatura,
      IP: identificador.ip,
      NUVERSAO: identificador.nuversao,
      USATEF: identificador.usatef,
      HOMOLOGACAO: identificador.homologacao,
      SERIE: identificador.serie,
      TIPOTEF: identificador.tipotef,
      IDTOKENH: identificador.idtokenh,
      PROXVERSAO: identificador.proxversao
    },
    VERSAO: identificador.versao
  };

  try {
    const result = await callJsonService("PdvPfxSP.persiste", requestBody);
    console.log("✅ Identificador validado no backend:", result);
  } catch (error: any) {
    console.error("❌ Falha ao validar identificador no backend:", error.message);
    erros.push(error.message || "Erro desconhecido.");
  }

  return erros;
}
