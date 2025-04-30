import { db } from "../db/pdv-db";
import { Formas_Pagamento } from "../models/formas_pagamento.model";

export class MovimentoService {
  static async criar(formas_Pagamento: Formas_Pagamento) {
    return await db.formas_Pagamento.add(formas_Pagamento);
  }

  static async listar() {
    return await db.formas_Pagamento.toArray();
  }

  static async atualizar(formas_Pagamento: Formas_Pagamento) {
    return await db.formas_Pagamento.put(formas_Pagamento);
  }

  static async remover(id_forma_pgto: number) {
    return await db.financeiro.delete(id_forma_pgto);
  }
}