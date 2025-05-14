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

  /**
   * Calcula a soma dos valores totais dos itens filtrados por id_movimento
   * @param idMovimento ID do movimento para filtrar os itens
   * @returns Valor total somado dos itens do movimento
   */
  static async calcularTotalPorIdMovimento(idMovimento: number): Promise<number> {
    try {
      
      const itens = await db.itens
        .where('id_movimento')
        .equals(idMovimento)
        .toArray();

      if (!itens || itens.length === 0) {
        return 0;
      }

      const valorTotal = itens.reduce((soma, item) => {
        return soma + (item.valor_total || 0);
      }, 0);

      return Number(valorTotal.toFixed(2));
    } catch (error) {
      console.error('Erro ao calcular total por movimento:', error);
      throw error;
    }
  }
}