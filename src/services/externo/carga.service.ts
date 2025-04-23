import { callJsonService } from "./api.service";
import { getIdentificadorPDV } from "@/utils/identificador";
import { Produto } from "@/models/produto.model";
import { xmlToJsonArray } from "@/utils/xml";

export async function carregarProdutos() {
  const identificador = await getIdentificadorPDV();
  console.log("📌 Identificador:", identificador.assinatura);

  const requestBody = {
    param: {
      PDV: identificador.assinatura,
      VERSAO: identificador.versao,
      NUVERSAO: identificador.nuversao ?? 0,
      ULTPK: -1
    }
  };

  const response = await callJsonService("ProdutoPfxSP.getProdutos", requestBody);

  const produtos = response?.produtos ?? []; // Ajuste esse nome conforme o que vem do back (pode ser "produto", "produtos", ou dentro de um array)
  console.log("🛒 Produtos recebidos:", produtos);

  // const produtos = xmlToJsonArray(responseText, "produto");
}
