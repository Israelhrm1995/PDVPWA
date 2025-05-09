export interface Movimento {
  id_movimento?: number; 
  status: string;
  id_empresa: number; 
  id_cliente: number; 
  valor_mov: number;
  observacao?: string;
  tipo: string;
  data_mov: Date;
}

export const valoresPadraoMovimento: Movimento = {
  status: "A",
  id_empresa: 1,
  id_cliente: 1,
  valor_mov: 0,
  tipo: "v",
  data_mov: new Date()
};
