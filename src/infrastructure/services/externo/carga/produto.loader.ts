import { getIdentificadorPDV } from "@/infrastructure/utils/identificador";
import { callJsonService } from "../api.service";
import { Produto } from "@/infrastructure/models/produto.model";
import { ProdutoService } from "../../produto.service";

export async function carregarProdutos(): Promise<void> {
  const identificador = await getIdentificadorPDV();

  const requestBody = {
    PDV: identificador.assinatura,
    VERSAO: identificador.versao,
    NUVERSAO: identificador.nuversao ?? 0,
    ULTPK: -1
  };

  const response: any = await callJsonService("ProdutoPfxSP.getProdutos", requestBody);
  const produtosRaw = response?.resposta?.TPRODUTO ?? [];

  for (const p of produtosRaw) {
    const produto: Produto = {
      id_produto: p.CODPRODUTO,
      nome: p.DESCRICAO,
      descricao: p.COMPLEMENTO ?? p.DESCRICAO,
      id_volume: 0,
      ativo: p.ATIVO === "S",
      ean: p.EAN ?? ""
    };

    await ProdutoService.atualizar(produto);
  }

  console.log(`✅ ${produtosRaw.length} produtos salvos no IndexedDB.`);
}
