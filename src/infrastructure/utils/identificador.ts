
import { salvarIdentificadorComValidacao } from "../controllers/identificador-pdv.controller";
import { valoresPadraoIdentificador, IdentificadorPDV } from "../models/identificador-pdv.model";
import { IdentificadorPDVService } from "../services/identificador-pdv.service";

export async function getIdentificadorPDV(): Promise<IdentificadorPDV> {
  const existente = await IdentificadorPDVService.obter();
  if (existente?.assinatura) return existente;

  const assinatura = crypto.randomUUID();
  const ip = await obterIPCliente(); 

  let identificador: IdentificadorPDV = valoresPadraoIdentificador;
  identificador.assinatura = assinatura;
  identificador.ip = ip;

  await salvarIdentificadorComValidacao(identificador); 

  return identificador;
}

async function obterIPCliente(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const json = await response.json();
    return json.ip;
  } catch {
    return "127.0.0.1";
  }
}
