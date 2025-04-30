export interface Financeiro {
  id_financeiro?: number;
  id_movimento?: number; 
  id_forma_pgto: number; 
  valor_financeiro: number;
  valor_baixa: number;
  data_vencto: Date;
}
