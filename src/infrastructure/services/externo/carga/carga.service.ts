import { carregarProdutos } from "./produto.loader";
import { carregarPrecos } from "./preco.loader";
import { carregarImagens } from "./imagem.loader";

export async function executarCargaGeral(): Promise<void> {
  await carregarProdutos();
  await carregarPrecos();
  await carregarImagens();
}
