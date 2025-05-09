import { carregarProdutos } from "./produto.loader";
import { carregarPrecos } from "./preco.loader";
import { carregarImagens } from "./imagem.loader";

export async function executarCargaGeral(serie: string, empresa: number): Promise<void> {
  await carregarProdutos(serie, empresa);
  await carregarPrecos(serie, empresa);
  await carregarImagens(serie, empresa);
}
