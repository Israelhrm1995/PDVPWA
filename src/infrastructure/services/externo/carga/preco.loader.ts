import { getIdentificadorPDV } from "@/infrastructure/utils/identificador";
import { callJsonService } from "../api.service";
import { Preco } from "@/infrastructure/models/preco.model";
import { PrecoService } from "../../preco.service";
import { parseDateBr } from "@/infrastructure/utils/dateUtils";

export async function carregarPrecos(serie: string, empresa: number): Promise<void> {
  const identificador = await getIdentificadorPDV(serie, empresa);

  const requestBody = {
    PDV: identificador.assinatura,
    VERSAO: identificador.versao,
    NUVERSAO: identificador.nuversao ?? 0,
    ULTPK: -1
  };

  const response: any = await callJsonService("ProdutoPfxSP.getPreco", requestBody);
  const precosRaw = response?.resposta?.TPRECO ?? [];

  for (const p of precosRaw) {
    const preco: Preco = {
      id_preco: p.NUTAB,
      id_produto: p.CODPRODUTO,
      preco: p.VLRPRECO,
      datavigor: parseDateBr(p.DATAVIGOR)
    };

    await PrecoService.atualizar(preco);
  }

  console.log(`✅ ${precosRaw.length} preços salvos no IndexedDB.`);
}
