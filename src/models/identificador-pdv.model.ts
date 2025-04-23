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
  }

  export const valoresPadraoIdentificador: IdentificadorPDV = {
    homologacao: 'S', 
    descricao: 'Piloto',
    codempresa: 1,
    tipoeqpfiscal: '65',
    impressoradefault: '?',
    satdefault: '?',
    integraparceiro: 'N',
    configurado: 'S',
    serie: '1',
    contingenciasat: 'N',
    tipotef: 3,
    csch: '999999999',
    idtokenh: '000001',
    versao: '1b1',
    proxversao: '',
    assinatura: ''
};