import Dexie, { Table } from 'dexie';
import { Produto } from '../models/produto.model';
import { ImagemProduto } from '../models/imagem-produto.model';
import { Item } from '../models/item.model';
import { IdentificadorPDV } from "../models/identificador-pdv.model";
import { Preco } from '../models/preco.model';
import { Movimento } from '../models/movimento.model';
import { Financeiro } from '../models/financeiro.model';
import { Formas_Pagamento } from '../models/formas_pagamento.model';
import { itemListener } from '../listeners/item.listener';

export class PDVDatabase extends Dexie {
  produtos!: Table<Produto, number>;
  imagensProduto!: Table<ImagemProduto, number>;
  itens!: Table<Item, number>;
  identificadorPDV!: Table<IdentificadorPDV>;
  preco!: Table<Preco>;
  movimento!: Table<Movimento>;
  financeiro!: Table<Financeiro>;
  formas_Pagamento!: Table<Formas_Pagamento>;

  constructor() {
    super('PDVDatabase');
    this.version(1).stores({
      produtos: 'id_produto, ean',
      preco: 'id_produto',
      imagensProduto: 'id_produto',
      itens: '++id_item, id_movimento, id_produto, id_preco',
      identificadorPDV: '++id, assinatura',
      movimento: '++id_movimento, status',
      financeiro: '++id_financeiro',
      formas_Pagamento: 'id_forma_pgto',
    });

    itemListener(this);
  }
}

export const db = new PDVDatabase();
