import { salvarItemMovimento } from "@/infrastructure/controllers/item.controller";
import { ItemService } from "@/infrastructure/services/item.service";
import { useDataStore } from "@/presentation/lib/zustand";
import { EzIcon } from "@sankhyalabs/ezui/react/components";
import { useEffect, useState, useRef, useMemo} from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import PagamentoModal from "@/presentation/layout/components/PagamentoModal";

const SalesPage = () => {  
  const {
    setItemsCarrinho, 
    itemsCarrinho,
    setItemSelecionado,
    products, 
    setProducts
  } = useDataStore();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const calculateTotalValue = () => {
    const total = products.reduce((sum, product) => {
      return sum + (product.valor_total || 0);
    }, 0);
    return total;
  };

  const totalValue = useMemo(() => {
    return calculateTotalValue();
  }, [products]);

  const handleDelete = (id_item: number) => {
    try {
      ItemService.remover(id_item);

      setProducts(products.filter((_ , index) => index !== selectedIndex));
    } catch (error) {
      console.error(error)
    }
  };

  const handleInsertCart = async () =>{
    try {
      if(itemsCarrinho?.id_produto){
        
          const idItem = await salvarItemMovimento(itemsCarrinho?.id_produto, itemsCarrinho.quantidade)
  
          const buscarItem = await ItemService.buscarPorId(idItem)
        
          const newProduct = {
            ...buscarItem,
            ...itemsCarrinho,
            id_item: idItem
          }
          setItemSelecionado({...newProduct})
          setProducts([...products, newProduct])

        setSelectedIndex(products?.length)
        setItemsCarrinho(null);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(0, prev - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(products.length - 1, prev + 1));
    }
  };

  const pagamentoPopUpRef = useRef<HTMLEzPopupElement>(null);
  const dialogRef = useRef<any>(null);

  const handleOpenPagamentoModal = () => {
    if (pagamentoPopUpRef.current) {
      pagamentoPopUpRef.current.opened = true;
    }
  };

  useEffect(()=>{
    if(!itemsCarrinho?.id_produto) return
      handleInsertCart()
  }, [itemsCarrinho])

  useEffect(()=>{
    if(selectedIndex >= 0){
      const findItem = products[selectedIndex]
  
      setItemSelecionado({...findItem})
    }
  }, [selectedIndex])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [products.length]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex flex-col h-full w-full bg-gray-50 rounded-xl">
        <div className="flex-grow overflow-auto rounded-xl">
          <table className="w-full bg-gray-50">
            <thead className="sticky top-0 shadow-sm bg-gray-50">
              <tr className="border-b  border-gray-200">
                <th className="py-3 px-4 text-left">Nº</th>
                <th className="py-3 px-4 text-left">Descrição Produto</th>
                <th className="py-3 px-4 text-right">Quantidade</th>
                <th className="py-3 px-4 text-right">Desconto</th>
                <th className="py-3 px-4 text-right">Vlr. Total</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      index === selectedIndex
                        ? "bg-[#E6F3EF] border-solid"
                        : "hover:bg-[#E6F3EF] border-dashed hover:border-solid"
                    } 
                      group`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <td className="py-3 px-4 text-left">#{index + 1}</td>
                    <td className="py-3 px-4 text-left">{product.descricao}</td>
                    <td className="py-3 px-4 text-right">
                      {product.quantidade.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {typeof product.desconto_perc === "string"
                        ? product.desconto_perc
                        : product.desconto_perc.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {product.valor_total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-3 px-4 w-12">
                      <button
                        onClick={() => handleDelete(product.id_item)}
                        className={`${
                          index === selectedIndex
                            ? "visible"
                            : "invisible group-hover:visible"
                        } transition-colors duration-150 flex justify-center items-center hover:text-[#008561] bg-gray-50 border-solid border-[#dce0e8] cursor-pointer p-3 rounded-full`}
                        aria-label="Delete item"
                      >
                        <FaRegTrashAlt size='1.2rem' className="" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="sticky bottom-0 bg-[#E6F3EF] py-4 px-6 flex justify-between items-center rounded-xl m-2 text-[#008561]">
          <div className="font-bold">VALOR TOTAL:</div>
          <div className="font-bold text-2xl">
            {totalValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 bg-white py-3 px-4 rounded-lg shadow hover:bg-gray-50 transition-colors w-full max-w-xs"
          onClick={() => console.log("Identificar cliente clicked")}
        >
          <EzIcon size="large" iconName="account-outline" />
          <span className="flex-1 text-left font-semibold">
            Identificar cliente
          </span>
          <span className="text-gray-400 text-sm">F3</span>
          <FiChevronRight color="gray" />
        </button>

        <button className="border border-[#dce0e8] bg-[#008561] rounded-full h-full px-8 text-sm font-semibold text-white"
        onClick={handleOpenPagamentoModal} >
          Ir para pagamento <span className="text-[#b5ccc6] pl-1 font-normal">F7</span>
        </button>
      </div>
      <PagamentoModal popUpRef={pagamentoPopUpRef} dialog={dialogRef} valorTotal={totalValue || 0} />
    </div>
  );
};

export default SalesPage;
