import { EzButton, EzIcon } from "@sankhyalabs/ezui/react/components";
import { useState } from "react";

const SalesPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      description: "Manta Líquida Branco Bautech",
      quantity: 5,
      discount: "5%",
      total: 1282.05,
    },
    {
      id: 2,
      description: "Bloco Tijolo Cerâmico Vedação",
      quantity: 100,
      discount: 2.0,
      total: 220.0,
    },
    {
      id: 3,
      description: "Luva Flextáctil Preta Danny",
      quantity: 1,
      discount: 0,
      total: 5.99,
    },
    //   { id: 4, description: "Manta Líquida Branco Bautech", quantity: 5, discount: "5%", total: 1282.05 },
    //   { id: 5, description: "Bloco Tijolo Cerâmico Vedação", quantity: 100, discount: 2.00, total: 220.00 },
    //   { id: 6, description: "Luva Flextáctil Preta Danny", quantity: 1, discount: 0, total: 5.99 },
    //   { id: 7, description: "Manta Líquida Branco Bautech", quantity: 5, discount: "5%", total: 1282.05 },
    //   { id: 8, description: "Bloco Tijolo Cerâmico Vedação", quantity: 100, discount: 2.00, total: 220.00 },
    //   { id: 9, description: "Luva Flextáctil Preta Danny", quantity: 1, discount: 0, total: 5.99 },
    //   { id: 10, description: "Manta Líquida Branco Bautech", quantity: 5, discount: "5%", total: 1282.05 },
    //   { id: 11, description: "Bloco Tijolo Cerâmico Vedação", quantity: 100, discount: 2.00, total: 220.00 },
    //   { id: 12, description: "Luva Flextáctil Preta Danny", quantity: 1, discount: 0, total: 5.99 },
    //   { id: 13, description: "Manta Líquida Branco Bautech", quantity: 5, discount: "5%", total: 1282.05 },
    //   { id: 14, description: "Bloco Tijolo Cerâmico Vedação", quantity: 100, discount: 2.00, total: 220.00 },
    //   { id: 15, description: "Luva Flextáctil Preta Danny", quantity: 1, discount: 0, total: 5.99 },
    //   { id: 16, description: "Manta Líquida Branco Bautech", quantity: 5, discount: "5%", total: 1282.05 },
    //   { id: 17, description: "Bloco Tijolo Cerâmico Vedação", quantity: 100, discount: 2.00, total: 220.00 },
    //   { id: 18, description: "Luva Flextáctil Preta Danny", quantity: 1, discount: 0, total: 5.99 },
  ]);

  const totalValue = products.reduce((sum, product) => sum + product.total, 0);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <div className="flex flex-col h-full w-full bg-gray-50 rounded-xl">
        <div className="flex-grow overflow-auto ">
          <table className="w-full bg-gray-50">
            <thead className="sticky top-0 shadow-sm  bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left">Nº</th>
                <th className="py-3 px-4 text-left">Descrição Produto</th>
                <th className="py-3 px-4 text-right">Quantidade</th>
                <th className="py-3 px-4 text-right">Desconto</th>
                <th className="py-3 px-4 text-right">Vlr. Total</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-green-50 group transition-colors duration-150 border-dashed hover:border-solid"
                >
                  <td className="py-3 px-4 text-left">#{product.id}</td>
                  <td className="py-3 px-4 text-left">{product.description}</td>
                  <td className="py-3 px-4 text-right">
                    {product.quantity.toLocaleString("pt-BR",{
                        minimumFractionDigits: 2,
                      })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {typeof product.discount === "string"
                      ? product.discount
                      : product.discount.toLocaleString("pt-BR",{
                        minimumFractionDigits: 2,
                      })}
                  </td>
                  <td className="py-3 px-4 text-right text-green-700 font-medium">
                    {product.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-3 px-4 w-12">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="invisible group-hover:visible hover:text-red-500 transition-colors duration-150"
                      aria-label="Delete item"
                    >
                      <EzButton mode="icon" iconName="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sticky bottom-0 bg-green-100 py-4 px-6 flex justify-between items-center rounded-xl m-2">
          <div className="font-medium text-green-800">VALOR TOTAL:</div>
          <div className="font-bold text-green-700 text-2xl">
            {totalValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 bg-white text-green-800 py-3 px-4 rounded-lg shadow hover:bg-gray-50 transition-colors w-full max-w-xs"
          onClick={() => console.log("Identificar cliente clicked")}
        >
          <EzIcon size="large" iconName="account-outline"/>
          <span className="flex-1 text-left font-medium">
            Identificar cliente
          </span>
          <span className="text-gray-400 text-sm">F3</span>
          <EzIcon size="large" iconName="chevron-right" />
        </button>
        <EzButton label="Ir para pagamento F7"/>
      </div>
    </div>
  );
};

export default SalesPage;
