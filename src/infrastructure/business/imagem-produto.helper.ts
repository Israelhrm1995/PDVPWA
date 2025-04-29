import { ImagemProduto } from "../models/imagem-produto.model";

export function validarimagem(imagem: ImagemProduto): string[] {
  const erros: string[] = [];

  if (!imagem.id_produto) erros.push("produto_Id obrigatório.");
  
  return erros;
}
