import { db } from "../db/pdv-db";
import { Financeiro } from "../models/financeiro.model";

export class FinanceiroService {
  static async criar(financeiro: Financeiro) {
    return await db.financeiro.add(financeiro);
  }

  static async listar() {
    return await db.financeiro.toArray();
  }

  static async atualizar(financeiro: Financeiro) {
    return await db.financeiro.put(financeiro);
  }

  static async remover(id_financeiro: number) {
    return await db.financeiro.delete(id_financeiro);
  }
}