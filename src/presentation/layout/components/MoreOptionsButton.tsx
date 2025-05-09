import { cancelarMovimento } from "@/infrastructure/controllers/movimento.controller";
import { useDataStore } from "@/presentation/lib/zustand";
import { EzButton, EzDialog } from "@sankhyalabs/ezui/react/components";
import { useEffect, useRef, useState } from "react";
import LoginModal from "./LoginModal";

export default function MoreOptionsButton() {
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState(false);
  const popUpRef = useRef(null)
  const dialog = useRef(null)
  const dropdownRef = useRef(null);
    const {
      setItemsCarrinho,
      setItemSelecionado,
      setProducts
  } = useDataStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenMoreOptions(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpenMoreOptions(!isOpenMoreOptions);
  };

  const onClickCancel = async () => {
    const confirm = await dialog.current.show('Atenção', 'Deseja realmente cancelar o pedido?', "warn", true, null, "Não", "Sim", false);

    if(confirm){
        await handleCancel();
    }

    setIsOpenMoreOptions(false);
  };

  const onClickLogin = async () => {
    popUpRef.current.opened = true

    setIsOpenMoreOptions(false);
  };

  const handleCancel = async () => {
    await cancelarMovimento();

    setItemsCarrinho(null);
    setItemSelecionado(null);
    setProducts([])
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
    <EzButton mode="icon" iconName="dots-horizontal" onClick={toggleDropdown} ></EzButton>
      {isOpenMoreOptions && (
          <div className="absolute mt-2 w-50 bg-white rounded-md shadow-lg p-1 z-10">
            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md" onClick={()=> onClickCancel()}>Cancelar pedido</div>
            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-md" onClick={()=> onClickLogin()}>Carga dados ERP</div>
          </div>
        )}
        <EzDialog ref={dialog} />
      <LoginModal popUpRef={popUpRef} dialog={dialog} />
    </div>
  );
}
