import { db } from "../db/pdv-db";
import { ImagemProduto } from "../models/imagem-produto.model";

export class ImagemProdutoService {
  static async criar(imagem: ImagemProduto) {
      return await db.imagensProduto.add(imagem);
    }
  
    static async listar() {
      return await db.imagensProduto.toArray();
    }
  
    static async atualizar(preco: ImagemProduto) {
      return await db.imagensProduto.put(preco);
    }
  
    static async remover(id_preco: number) {
      return await db.imagensProduto.delete(id_preco);
    }

}

