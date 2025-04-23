import { ImagemProdutoService } from "../services/imagem-produto.service";
import { ImagemProduto } from "../models/imagem-produto.model";
import { validarimagem } from "../business/imagem-produto.helper";

export async function salvarImagemProduto(imagem: ImagemProduto) {

  const erros = validarimagem(imagem);
  
  if (erros.length > 0) {
      throw new Error(erros.join("\n"));
  }

  return await ImagemProdutoService.criar(imagem);
}

export async function buscarImagensDoProduto(produtoId: number) {
  return await ImagemProdutoService.listarPorProduto(produtoId);
}
