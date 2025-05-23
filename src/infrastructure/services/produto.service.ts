import { db } from "../db/pdv-db";
import { Produto } from "../models/produto.model";

export class ProdutoService {
  static async criar(produto: Produto) {
    return await db.produtos.add(produto);
  }

  static async listar() {
    return await db.produtos.toArray();
  }

  static async atualizar(produto: Produto) {
    return await db.produtos.put(produto);
  }

  static async remover(id_produto: number) {
    return await db.produtos.delete(id_produto);
  }

  static async buscarPorEan(ean: string): Promise<Produto | undefined> {
    return await db.produtos
      .where('ean')
      .equals(ean)
      .first();
  }

  static async buscarPorEanQueComecaCom(prefixoEan: string): Promise<Produto[]> {
    return await db.produtos
      .where('ean')
      .startsWith(prefixoEan)
      .toArray();
  }
}