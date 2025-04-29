import { IdentificadorPDVService } from "../services/identificador-pdv.service";
import { validarIdentificador } from "../business/identificador-pdv.helper";
import { IdentificadorPDV } from "../models/identificador-pdv.model";

export async function salvarIdentificadorComValidacao(dados: IdentificadorPDV) {
  const erros = await validarIdentificador(dados); // <- precisa do await

  if (erros.length > 0) throw new Error(erros.join("\n"));

  return await IdentificadorPDVService.salvarOuAtualizar(dados);
}
