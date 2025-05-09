import { IdentificadorPDVService } from "../services/identificador-pdv.service";
import { validarIdentificador } from "../business/identificador-pdv.helper";
import { IdentificadorPDV } from "../models/identificador-pdv.model";
import { db } from '../db/pdv-db';

export async function salvarIdentificadorComValidacao(dados: IdentificadorPDV) {

  try {
      const erros = await validarIdentificador(dados);
  
      if (erros.length > 0) {
        throw new Error(erros.join("\n")); 
      }

      await IdentificadorPDVService.salvarOuAtualizar(dados);
  
    console.log("✅ Transação concluída com sucesso");
  } catch (erro: any) {
    console.error("❌ Falha na transação:", erro);
    throw new Error(erro.message ?? "Erro ao salvar identificador");
  }
  
}
