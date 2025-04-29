export interface Produto {
  id_produto: number; // chave primária
  nome: string;
  descricao: string;
  id_volume: number;
  ativo: boolean;
  ean: string;
}