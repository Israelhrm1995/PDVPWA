import { Produto } from "../models/produto.model";

export function validarProduto(produto: Produto): string[] {
  const erros: string[] = [];

  if (!produto.nome?.trim()) erros.push("Nome é obrigatório.");

  return erros;
}

