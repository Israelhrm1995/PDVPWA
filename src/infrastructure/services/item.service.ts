import { db } from "../db/pdv-db";
import { Item } from "../models/item.model";

export class ItemService {
  static async criar(item: Item) {
    return await db.itens.add(item);
  }

  static async listarTodos() {
    return await db.itens.toArray();
  }

  static async atualizar(item: Item) {
    return await db.itens.put(item);
  }

  static async remover(id_item: number) {
    return await db.itens.delete(id_item);
  }

  static async deletarPorIdMovimento(idMovimento: number) {
      await db.itens
      .where('id_movimento')
      .equals(idMovimento)
      .delete()
  }

  static async buscarPorId(idItem: number): Promise<Item> {
      return await db.itens
        .where('id_item')
        .equals(idItem)
        .first();
    }
}