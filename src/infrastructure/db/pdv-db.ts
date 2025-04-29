import Dexie, { Table } from 'dexie';
import { Produto } from '../models/produto.model';
import { ImagemProduto } from '../models/imagem-produto.model';
import { Item } from '../models/item.model';
import { IdentificadorPDV } from "../models/identificador-pdv.model";
import { Preco } from '../models/preco.model';

export class PDVDatabase extends Dexie {
  produtos!: Table<Produto, number>;
  imagensProduto!: Table<ImagemProduto, number>;
  itens!: Table<Item, number>;
  identificadorPDV!: Table<IdentificadorPDV>;
  preco!: Table<Preco>;

  constructor() {
    super('PDVDatabase');
    this.version(1).stores({
      produtos: 'id_produto',
      preco: 'id_produto',
      imagensProduto: 'id_produto',
      itens: '++id_item, id_movimento, id_produto, id_preco',
      identificadorPDV: "++id, assinatura",
    });
  }
}

export const db = new PDVDatabase();
