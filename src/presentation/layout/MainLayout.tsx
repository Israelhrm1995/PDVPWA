import { Outlet } from "react-router-dom";
import { useState } from "react";
import ProductSearch from "../features/sales/components/ProductSearch";
import SideBar from "./components/SideBar";
import { FaArrowRight } from "react-icons/fa";
import MoreOptionsButton from "./components/MoreOptionsButton";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen text-gray-800">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#EAEBEE]">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4">
          <ProductSearch />
          <div className="flex gap-2 h-full">
            <button className="border border-[#dce0e8] bg-gray-50 rounded-full h-full px-6 text-sm font-semibold">
              Consultar Produto{" "}
              <span className="text-gray-400 pl-1 font-normal">F8</span>
            </button>
            <button className="border border-[#dce0e8] bg-gray-50 rounded-full h-full px-6 text-sm font-semibold">
              Importar Pedido{" "}
              <span className="text-gray-400 pl-1 font-normal">F10</span>
            </button>
            <MoreOptionsButton />
            {!isSidebarOpen && (
              <>
                <button
                  onClick={() => {
                    setSidebarOpen(!isSidebarOpen);
                  }}
                  className={`transition-colors duration-150 flex justify-center items-center hover:text-[#008561] bg-gray-50 border border-[#dce0e8] cursor-pointer p-3 rounded-full`}
                  aria-label="Aparecer menu"
                >
                  <FaArrowRight size="1.2rem" className="" />
                </button>
              </>
            )}
          </div>
        </header>

        {/* Route Outlet */}
        <main className="flex-1 px-6 max-h-[90vh]">
          <Outlet />
        </main>
      </div>
      {/* Sidebar */}
      <SideBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
}
