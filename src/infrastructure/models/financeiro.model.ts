export interface Financeiro {
  id_financeiro?: number;
  id_movimento?: number;
  id_forma_pgto?: number;
  valor_financeiro?: number;
  valor_baixa: number;
  data_vencto: Date;
  dataCriacao?: Date;
  dataModificacao?: Date;
}

export const FinanceiroDinheiro: Financeiro =  {
  id_forma_pgto: 0, // Por hora adotamos 0 para dinheiro
  valor_baixa: 0,
  data_vencto: new Date(),
  dataCriacao: new Date(),
  dataModificacao: new Date(),
}