import { db } from "../db/pdv-db";
import { ImagemProduto } from "../models/imagem-produto.model";

export class ImagemProdutoService {
  static async criar(imagem: ImagemProduto) {
      return await db.imagensProduto.add(imagem);
    }
  
    static async listar() {
      return await db.imagensProduto.toArray();
    }
  
    static async atualizar(imagem: ImagemProduto) {
      return await db.imagensProduto.put(imagem);
    }
  
    static async remover(id_produto: number) {
      return await db.imagensProduto.delete(id_produto);
    }

    static async buscarPorIdProduto(idProduto: number): Promise<ImagemProduto[]> {
        return await db.imagensProduto
          .where('id_produto')
          .equals(idProduto)
          .toArray();
    }

}

