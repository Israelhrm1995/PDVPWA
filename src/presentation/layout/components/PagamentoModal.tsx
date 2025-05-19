import {
  EzButton,
  EzModalContainer,
  EzNumberInput,
  EzPopup,
} from "@sankhyalabs/ezui/react/components";
import { DialogType } from "@sankhyalabs/ezui/dist/types/utils";
import { RefObject, useState, useEffect } from "react";

type PagamentoModalProps = {
  popUpRef: RefObject<HTMLEzPopupElement>;
  dialog: RefObject<Partial<any>>;
  valorTotal: number;
}

type Pagamento = {
  metodo: string;
  valor: number;
  troco?: number;
  status: 'aguardando' | 'concluido';
}

export default function PagamentoModal({ popUpRef, dialog, valorTotal}: PagamentoModalProps) {
  const [valorRestante, setValorRestante] = useState<number>(0);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("");
  const [pagamentosRealizados, setPagamentosRealizados] = useState<Pagamento[]>([]);
  const [valorRecebido, setValorRecebido] = useState<number>(0);
  const [valorAPagar, setValorAPagar] = useState<number>(0);
  const [troco, setTroco] = useState<number>(0);
  const [etapaPagamento, setEtapaPagamento] = useState<number>(1);
  let finalizar:boolean = false;

  // Estado quando o modal é aberto
  useEffect(() => {
    const checkIfOpen = () => {
      if (popUpRef.current && popUpRef.current.opened) {
        resetarEstado();
      }
    };
    
    checkIfOpen();

    if (popUpRef.current) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'opened' && popUpRef.current && popUpRef.current.opened) {
            console.log('Modal aberto via MutationObserver, atualizando valores');
            resetarEstado();
          }
        });
      });
      
      observer.observe(popUpRef.current, { attributes: true });
      
      return () => {
        observer.disconnect();
      };
    }
  }, [popUpRef, valorTotal]);

  const resetarEstado = () => {
    setValorRestante(valorAPagar);
    setValorAPagar(valorAPagar);
    setMetodoPagamento("");
    setPagamentosRealizados([]);
    setValorRecebido(0);
    setTroco(0);
    setEtapaPagamento(1);
  };

  const selecionarFormaPagamento = (forma: string) => {
    setMetodoPagamento(forma);
    
    if (forma === 'dinheiro') {
      setValorRecebido(0);
      setTroco(0);
    }
  };

  const handleValorRecebidoChange = (valor: number) => {
    setValorRecebido(valor);
  
    if (valor > valorAPagar) {
      setTroco(valor - valorAPagar);
    } else {
      setTroco(0);
    }
  };

  const confirmarPagamento = () => {
    if (valorRecebido < valorAPagar) {
      dialog.current.show('Erro', 'Valor recebido é insuficiente', "critical" as DialogType);
      return;
    }

    const novoPagamento: Pagamento = {
      metodo: metodoPagamento,
      valor: valorAPagar,
      troco: troco,
      status: 'concluido'
    };
    
    const novosPagamentos = [...pagamentosRealizados, novoPagamento];
    setPagamentosRealizados(novosPagamentos);

    const novoValorRestante = Math.max(0, valorRestante - valorAPagar);
    setValorRestante(novoValorRestante);

    setMetodoPagamento("");
    setValorRecebido(0);
    setTroco(0);
    
    if (novoValorRestante > 0) {
      setEtapaPagamento(etapaPagamento + 1);
      setValorAPagar(novoValorRestante);
    } else {
      setValorAPagar(0);
    }
  };

  const closePopup = () => {
    if (popUpRef && popUpRef.current) {
      popUpRef.current.opened = false;
    }
  };

  const renderPagamentosAnteriores = () => {
    return pagamentosRealizados.map((pagamento, index) => (
      <div key={index} className="mb-4 border-b pb-2">
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-green-600">{index + 1}</span>
          </div>
          <span className="font-medium">Método de pagamento</span>
          <span className="ml-4 font-medium">
            {pagamento.metodo.charAt(0).toUpperCase() + pagamento.metodo.slice(1)}
          </span>
          <div className="ml-auto flex items-center">
            {pagamento.status === 'concluido' && (
              <>
                <span className="text-green-600 mr-2">Pago!</span>
                <span className="text-green-600 font-medium">{pagamento.valor.toFixed(2).replace('.', ',')}</span>
                <svg className="w-5 h-5 text-green-600 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </div>
        </div>
        
        {pagamento.status === 'aguardando' && (
          <div className="ml-8 text-gray-500">
            Aguardando pagamento...
          </div>
        )}
      </div>
    ));
  };

  const renderFormaPagamentoAtual = () => {
    if (pagamentosRealizados.length > 0) {
      return (
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-green-600">{etapaPagamento}</span>
          </div>
          <span className="font-medium">Método de pagamento</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center mb-2">
          <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
            <span className="text-green-600">1</span>
          </div>
          <span className="font-medium">Método de pagamento</span>
        </div>
      );
    }
  };

  const renderConteudoPagamento = () => {
    if (valorRestante === 0 && pagamentosRealizados.length > 0) {
      finalizar = true;
      return (
        <div className="sticky bottom-0 bg-[#E6F3EF] py-4 px-6 flex justify-between items-center rounded-xl m-2 text-[#008561]">
          <div className="text-[#008561]">
            Pagamento concluído com sucesso!
          </div>
          <div className="text-[#008561]">
            Valor total: R$ {valorTotal.toFixed(2).replace('.', ',')}
          </div>
        </div>
      );
    }

    if (!metodoPagamento) {
      return (
        <>
          {renderFormaPagamentoAtual()}
          <div className="ml-8 text-gray-500 mb-4">
            A definir...
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Valor a receber</label>
            <EzNumberInput
              value={valorAPagar}
              onEzChange={(e) => {
                const novoValor = Number(e.target.value);
                setValorAPagar(novoValor);
              }}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <button 
              className="border rounded-lg py-2 px-3 border-gray-300 hover:bg-gray-50"
              onClick={() => selecionarFormaPagamento('dinheiro')}
            >
              <div className="flex items-center justify-between">
                <span>Dinheiro</span>
                <span className="text-gray-400">A</span>
              </div>
            </button>
            <button 
              className="border rounded-lg py-2 px-3 border-gray-300 hover:bg-gray-50"
              onClick={() => selecionarFormaPagamento('cartão de crédito')}
            >
              <div className="flex items-center justify-between">
                <span>Cartão de Crédito</span>
                <span className="text-gray-400">B</span>
              </div>
            </button>
            <button 
              className="border rounded-lg py-2 px-3 border-gray-300 hover:bg-gray-50"
              onClick={() => selecionarFormaPagamento('cartão de débito')}
            >
              <div className="flex items-center justify-between">
                <span>Cartão de Débito</span>
                <span className="text-gray-400">C</span>
              </div>
            </button>
            <button 
              className="border rounded-lg py-2 px-3 border-gray-300 hover:bg-gray-50"
              onClick={() => selecionarFormaPagamento('pix')}
            >
              <div className="flex items-center justify-between">
                <span>Pix</span>
                <span className="text-gray-400">D</span>
              </div>
            </button>
          </div>

          <div className="mb-6">
            <button 
              className="w-full border rounded-lg py-2 px-3 border-gray-300 hover:bg-gray-50"
              onClick={() => selecionarFormaPagamento('outras')}
            >
              <div className="flex items-center justify-between">
                <span>Outras formas</span>
                <span className="text-gray-400">F</span>
              </div>
            </button>
          </div>
        </>
      );
    }

    if (metodoPagamento === 'dinheiro') {
      return (
        <>
          <div className="flex items-center mb-2">
            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-green-600">{etapaPagamento}</span>
            </div>
            <span className="font-medium">Método de pagamento</span>
            <span className="ml-4">Dinheiro</span>
            <span className="ml-auto">Valor</span>
            <span className="ml-2 font-medium">{valorAPagar.toFixed(2).replace('.', ',')}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
            <div>
              <label className="block text-gray-700 mb-1">Valor recebido</label>
              <EzNumberInput
                value={valorRecebido}
                onEzChange={(e) => handleValorRecebidoChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Valor a pagar</label>
              <EzNumberInput
                value={valorAPagar}
                className="w-full"
                enabled={false}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Troco</label>
              <EzNumberInput
                value={troco}
                className="w-full"
                enabled={false}
              />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="text-gray-500">
              Aguardando pagamento...
            </div>
          </div>

          <div className="flex justify-end">
            <EzButton 
              onClick={confirmarPagamento} 
              label="Confirmar Pagamento" 
              className="ez-button--primary"
            />
          </div>
        </>
      );
    }

    // Outros métodos de pagamento podem ser implementados aqui
    return null;
  };

  return (
    <EzPopup
      ref={popUpRef}
      size="small"
      heightMode="auto"
      useHeader={false}
    >
      <EzModalContainer
        modalTitle="Pagamento"
        showCloseButton={true}
      >
        <div>

          {renderPagamentosAnteriores()}

          {renderConteudoPagamento()}

          <div className="mt-4 p-3 rounded-lg flex items-center justify-between ">

            <div className="sticky bottom-0 bg-[#E6F3EF] py-4 px-6 flex justify-between items-center rounded-xl m-2 text-[#008561]">
              <span className="font-medium mr-2">RESTANTE:</span>
              <span className="font-bold"> {valorRestante.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex items-right">
              <div className="flex items-center">
                <EzButton 
                  onClick={() => {}} 
                  label="Identificar cliente" 
                  className="ez-button--secondary mr-2"
                />
              </div>
              
              <div className="flex items-center">
                <EzButton 
                  onClick={closePopup} 
                  label="Finalizar" 
                  className="ez-button--primary"
                  enabled={finalizar}
                />
              </div>
            </div>
          </div>
        </div>
      </EzModalContainer>
    </EzPopup>
  );
}