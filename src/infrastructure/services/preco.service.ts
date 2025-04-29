import { db } from "../db/pdv-db";
import { Preco } from "../models/preco.model";

export class PrecoService {
  static async criar(preco: Preco) {
    return await db.preco.add(preco);
  }

  static async listar() {
    return await db.preco.toArray();
  }

  static async atualizar(preco: Preco) {
    return await db.preco.put(preco);
  }

  static async remover(id_preco: number) {
    return await db.preco.delete(id_preco);
  }
}