import { ProdutoService } from "../services/produto.service";
import { Movimento } from "../models/movimento.model";
import { MovimentoService } from "../services/financeiro.service";
import { ItemService } from "../services/item.service";
import { Item } from "../models/item.model";
import { Preco } from "../models/preco.model";
import { PrecoService } from "../services/preco.service";
import { arredondarParaDuasCasas } from "../utils/arredonda";

export const salvarItemMovimento = async (id_prod: number, qtd: number) => {
  let movimento: Movimento = await MovimentoService.buscarPorStatus("A");

  if (!movimento) movimento = { ...movimento, id_movimento: await MovimentoService.criarPadrao() };
  
  const preco: Preco = await PrecoService.buscarPorIdProduto(id_prod);

  const item: Item = {
    id_movimento: movimento.id_movimento,
    id_produto: id_prod,
    quantidade: qtd,
    valor_unitario: preco.preco,
    valor_total: qtd * preco.preco,
    id_preco: preco.id_preco,
    desconto_perc: 0,
    desconto_vlr: 0,
  };

  return await ItemService.criar(item);
};

export const alterarItemMovimento = async (
  id_Item: number,
  qtd?: number,
  descVlr?: number,
  descPerc?: number
) => {
  const item: Item = await ItemService.buscarPorId(id_Item);

  if (!descPerc) {
    if (descPerc > 100)
      throw new Error("O desconto nao pode ser maior que 100%!");
    item.desconto_perc = descPerc;
    item.desconto_vlr = arredondarParaDuasCasas(
      (item.valor_unitario * descPerc) / 100
    );
  }
  if (!descVlr) {
    if (item.valor_unitario < descVlr)
      throw new Error("O desconto nao pode ser maior que o valor do produto");
    item.desconto_vlr = descVlr;
    item.desconto_perc = arredondarParaDuasCasas(descVlr / item.valor_unitario);
  }

  item.quantidade = qtd || item?.quantidade;

  item.valor_total = arredondarParaDuasCasas(
    !descPerc
      ? (item.valor_unitario - descVlr) * item.quantidade
      : item.valor_unitario * item.desconto_perc * item.quantidade
  );

  return await ItemService.atualizar(item);
};

export async function listarProdutosNoConsole() {
  const produtos = await ProdutoService.listar();
  console.log("📦 Produtos do banco:", produtos);
}
