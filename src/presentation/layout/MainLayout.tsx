import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { EzButton, EzSearch } from "@sankhyalabs/ezui/react/components";
import Logo from '../assets/logo.png';

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4">
          <EzSearch className="w-1/4"/>
          <div className="flex gap-2">
          <EzButton label="Consultar Produto F8"></EzButton>
          <EzButton label="Importar Pedido F10"></EzButton>
          <EzButton mode="icon" iconName="dots-horizontal" label="Importar Pedido F10"></EzButton>
          {!isSidebarOpen && <EzButton mode="icon" iconName="show_menu" label="Importar Pedido F10" onClick={()=>{setSidebarOpen(!isSidebarOpen)}} ></EzButton>}
          </div>
        </header>

        {/* Route Outlet */}
        <main className="flex-1 px-6 max-h-[90vh]">
          <Outlet />
        </main>
      </div>
      {/* Sidebar */}
      <aside className={`w-1/4 bg-white rounded-xl shadow p-4  flex flex-col ${isSidebarOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex justify-center justify-between w-full border rounded py-2">
          <img src={Logo} alt="Logo" className="h-[3rem] text-center w-[12rem]" />
        </div>
          <EzButton mode="icon" iconName="show_menu" label="Importar Pedido F10" onClick={()=>{setSidebarOpen(!isSidebarOpen)}}></EzButton>
        </div>
      <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Manta Líquida Branco 15Kg Bautech</h2>
          <img
            src="https://via.placeholder.com/100"
            alt="Produto"
            className="mx-auto mb-4"
          />
          <div className="text-sm text-gray-500 mb-2">Marca: <strong>Bautech</strong></div>
          <div className="text-sm text-gray-500 mb-4">Cód de Barras: 89110742</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <label>Quantidade</label>
            <input type="text" className="border rounded p-1" value="5,00"  />
          </div>
          <div className="flex flex-col">
            <label>Vlr. Unitário</label>
            <input type="text" className="border rounded p-1" value="5,99" readOnly />
          </div>
          <div className="flex flex-col">
            <label>% Desconto</label>
            <input type="text" className="border rounded p-1" value="5,00"  />
          </div>
          <div className="flex flex-col">
            <label>Vlr. Desconto</label>
            <input type="text" className="border rounded p-1" value="0,00"  />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Vlr. Total</label>
            <input type="text" className="border rounded p-1" value="1.282,05" readOnly />
          </div>
        </div>
      </aside>


    </div>
  );
}