import { getIdentificadorPDV } from "@/infrastructure/utils/identificador";
import { callJsonService } from "../api.service";
import { ImagemProduto } from "@/infrastructure/models/imagem-produto.model";
import { ImagemProdutoService } from "../../imagem-produto.service";


export async function carregarImagens(serie: string, empresa: number): Promise<void> {
  const identificador = await getIdentificadorPDV(serie, empresa);

  const requestBody = {
    PDV: identificador.assinatura,
    VERSAO: identificador.versao,
    NUVERSAO: identificador.nuversao ?? 0,
    ULTPK: -1
  };

  const response: any = await callJsonService("ProdutoPfxSP.getImagens", requestBody);
  const imagensRaw = response?.resposta?.IMAGEM_PRODUTO ?? [];

  for (const i of imagensRaw) {
    const imagem: ImagemProduto = {
      id_produto: i.CODPRODUTO,
      imagem: i.IMAGEM
    };

    await ImagemProdutoService.atualizar(imagem);
  }

  console.log(`✅ ${imagensRaw.length} imagens salvas no IndexedDB.`);
}
