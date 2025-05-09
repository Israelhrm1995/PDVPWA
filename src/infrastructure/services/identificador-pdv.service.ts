import { db } from "../db/pdv-db";
import type { Transaction } from 'dexie';
import { IdentificadorPDV } from "../models/identificador-pdv.model";

export class IdentificadorPDVService {
  static async criar(dados: IdentificadorPDV) {
    return await db.identificadorPDV.add(dados);
  }

  static async obter(): Promise<IdentificadorPDV | undefined> {
    return await db.identificadorPDV.toCollection().first();
  }

  static async salvarOuAtualizar(dados: IdentificadorPDV, tx?: Transaction): Promise<number> {
    const existente = await this.obter();
    if (existente) {
      return await db.identificadorPDV.update(existente.id!, dados);
    } else {
      return await this.criar(dados);
    }
  }
}