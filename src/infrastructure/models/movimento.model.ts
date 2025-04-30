export interface Movimento {
  id_movimento?: number; 
  id_item: number; 
  id_empresa: number; 
  id_cliente: number; 
  valor_mov: number;
  observacao: string;
  tipo: string;
  data_mov: Date;
}
