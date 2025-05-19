import { PDVDatabase } from '../db/pdv-db';
import { Item } from '../models/item.model';

export const itemListener = (db: PDVDatabase) => {
  
  // Hook para antes de criar um item
  db.itens.hook('creating', function(this: any, primKey: undefined, obj: any) {
    console.log('Before creating Item:', JSON.stringify(obj));
    
    // Detecta e corrige referência circular
    if (obj.id_item && typeof obj.id_item === 'object') {
      console.warn('Detectada referência circular em id_item. Removendo campo...');
      obj.id_item = undefined;
    }
    
    // Garante que id_item seja undefined para autoincremento funcionar
    delete obj.id_item;
    
    // Verifica se todos os campos obrigatórios estão presentes
    if (obj.id_movimento === undefined || obj.id_produto === undefined || obj.id_preco === undefined) {
      console.error('Campos obrigatórios ausentes no item:', obj);
      throw new Error('Campos obrigatórios ausentes no item');
    }
    
    console.log('Item após correções:', JSON.stringify(obj));
    return obj;
  });

  // Hook para antes de atualizar um item
  db.itens.hook('updating', function(this: any, modifications: Partial<Item>, primaryKey: number, obj: Item) {
    console.log('Before updating Item:', modifications, 'Key:', primaryKey);
    
    // Impede a modificação da chave primária
    if ('id_item' in modifications) {
      delete modifications.id_item;
    }
    
    return modifications;
  });

  // Hook para antes de deletar um item
  db.itens.hook('deleting', function(this: any, primaryKey: number) {
    console.log('Before deleting Item:', primaryKey);
  });
};