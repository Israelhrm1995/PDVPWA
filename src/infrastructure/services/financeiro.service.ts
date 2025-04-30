import { db } from "../db/pdv-db";
import { Movimento } from "../models/movimento.model";

export class MovimentoService {
  static async criar(movimento: Movimento) {
    return await db.movimento.add(movimento);
  }

  static async listar() {
    return await db.movimento.toArray();
  }

  static async atualizar(movimento: Movimento) {
    return await db.movimento.put(movimento);
  }

  static async remover(id_movimento: number) {
    return await db.movimento.delete(id_movimento);
  }
}