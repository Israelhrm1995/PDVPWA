import { create } from "zustand";

type Produto = {
  id_movimento: number,
  id_produto: number,
  quantidade: number,
  valor_unitario: number,
  valor_total: number,
  id_preco: number,
  desconto_perc: number,
  desconto_vlr: number,
  id_item: number,
  ativo:boolean,
  descricao: string,
  ean: string,
  id_volume: number,
  nome: string,
}

interface State {
    products: Produto[];
    itemsCarrinho: any;
    itemSelecionado: any;
    setProducts: (produtos: any) => void;
    setItemsCarrinho: (itemsCarrinho: any) => void;
    setItemSelecionado: (itemSelecionado: any) => void;
}

export const useDataStore = create<State>((set, get) => ({
    itemsCarrinho: null,
    itemSelecionado: null,
    products: [],
    setProducts: (products: any) => set({ products }),
    setItemsCarrinho: (itemsCarrinho: any) => set({ itemsCarrinho }),
    setItemSelecionado: (itemSelecionado: any) => set({ itemSelecionado }),
}));
