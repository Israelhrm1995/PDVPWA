export interface IdentificadorPDV {
  id?: number; 
  codempresa?: number;
  descricao?: string;
  tipoeqpfiscal?: string;
  satdefault?: string;
  integraparceiro?: string;
  configurado?: string;
  contingenciasat?: string;
  csch?: string;
  apresentaimagemproduto?: "S" | "N";
  impressoradefault?: string;
  assinatura: string;
  ip?: string;
  nuversao?: number;
  usatef?: number;
  homologacao?: "S" | "N";
  serie?: string;
  tipotef?: number;
  idtokenh?: string;
  versao?: string;
  proxversao?: string;
  apresentaimgproduto?: string;
}

export const valoresPadraoIdentificador: IdentificadorPDV = {
  homologacao: 'S', 
  descricao: 'Piloto',
  tipoeqpfiscal: '65',
  impressoradefault: '?',
  satdefault: '?',
  integraparceiro: 'N',
  configurado: 'S',
  contingenciasat: 'N',
  tipotef: 3,
  csch: '999999999',
  idtokenh: '000001',
  versao: '1',
  proxversao: '',
  assinatura: '',
  apresentaimgproduto: 'S'
};
