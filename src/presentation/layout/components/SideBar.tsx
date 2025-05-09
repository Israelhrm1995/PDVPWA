import Logo from "../../assets/logo.png";
import { useDataStore } from "@/presentation/lib/zustand";
import { useEffect, useState } from "react";
import { ImagemProdutoService } from "@/infrastructure/services/imagem-produto.service";
import { FaArrowLeft } from "react-icons/fa";

type SideBar = {
  isSidebarOpen: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
};

export default function SideBar({ isSidebarOpen, setSidebarOpen }: SideBar) {
  const { itemSelecionado } = useDataStore();

  const [actualImage, setActualImage] = useState<Blob>();

  useEffect(() => {
    setActualImage(null);
    buscaImagemProduto();
  }, [itemSelecionado]);

  const buscaImagemProduto = async () => {
    if (itemSelecionado?.id_produto) {
      const searchedImage = await ImagemProdutoService.buscarPorIdProduto(
        itemSelecionado?.id_produto
      );
      if (searchedImage[0]?.imagem) setActualImage(searchedImage[0]?.imagem);
    }
  };

  return (
    <aside
      className={`w-1/4 bg-white rounded-xl shadow p-4 flex flex-col gap-4  ${
        isSidebarOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex justify-center w-full border border-gray-200 rounded py-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-[3rem] text-center w-[12rem]"
          />
        </div>
        <button
          onClick={() => {
            setSidebarOpen(!isSidebarOpen);
          }}
          className={`transition-colors duration-150 flex justify-center items-center hover:text-[#008561] border border-gray-200 cursor-pointer p-3 rounded-full`}
          aria-label="Aparecer menu"
        >
          <FaArrowLeft size="1.2rem" className="" />
        </button>
      </div>
      <div className="flex text-start flex-col gap-4">
        <h1 className="text-lg font-semibold">
          {itemSelecionado?.descricao || "Produto sem nome"}
        </h1>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex justify-center items-center border border-[#dce0e8] rounded-md">
            {actualImage ? (
              <img
                src={`data:image/png;base64,${actualImage ?? ""}`}
                alt="Produto"
                className="w-[13rem] h-[20vh] p-1"
              />
            ) : (
              <div className="w-[13rem] h-[20vh] p-1 flex justify-center items-center">
                <h1 className="text-[2vh] text-gray-500">Sem Imagem</h1>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-lg text-gray-800 mb-2 flex flex-col">
              <span>Marca:</span>{" "}
              <strong>{itemSelecionado?.marca || "Sem marca"}</strong>
            </div>
            <div className="text-lg text-gray-800 mb-4 flex flex-col">
              <span>Cód de Barras:</span>{" "}
              <strong>{itemSelecionado?.ean || "Sem EAN"}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex flex-col">
          <label className="text-lg">Quantidade</label>
          <input
            type="text"
            className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg"
            value={
              itemSelecionado?.quantidade?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Vlr. Unitário</label>
          <input
            type="text"
            className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg bg-[#f0f3f7]"
            value={
              itemSelecionado?.valor_unitario?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"
            }
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">% Desconto</label>
          <input
            type="text"
            className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg"
            value={
              itemSelecionado?.desconto_perc?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Vlr. Desconto</label>
          <input
            type="text"
            className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg"
            value={
              itemSelecionado?.desconto_vlr?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Vlr. Total</label>
          <input
            type="text"
            className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg bg-[#f0f3f7] "
            value={
              itemSelecionado?.valor_total?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0,00"
            }
            readOnly
          />
        </div>
      </div>
    </aside>
  );
}
