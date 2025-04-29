import { ProdutoService } from "../services/produto.service";
import { validarProduto } from "../business/produto.helper";
import { Produto } from "../models/produto.model";

export async function salvarProdutoComValidacao(produto: Produto) {
  const erros = validarProduto(produto);

  if (erros.length > 0) {
    throw new Error(erros.join("\n"));
  }

  return await ProdutoService.criar(produto);
}

export async function listarProdutosNoConsole() {
  const produtos = await ProdutoService.listar();
  console.log("📦 Produtos do banco:", produtos);
}
