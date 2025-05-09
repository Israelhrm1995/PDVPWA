import { ProdutoService } from "@/infrastructure/services/produto.service";
import { useDataStore } from "@/presentation/lib/zustand";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

// Dados de exemplo - em um caso real, isso viria de uma API
const sampleProducts = [
  {
    codigo: "89110742",
    nome: "Manta Liquida Branco 15Kg Bautech",
    codBarras: "89110742",
    marca: "Bautech",
    controle: "15KG",
    valorUnitario: 269.9,
  },
  {
    codigo: "89110743",
    nome: "Manta Liquida Cinza 15Kg Bautech",
    codBarras: "89110743",
    marca: "Bautech",
    controle: "15KG",
    valorUnitario: 279.9,
  },
  {
    codigo: "75648231",
    nome: "Argamassa AC3 20Kg Quartzolit",
    codBarras: "75648231",
    marca: "Quartzolit",
    controle: "20KG",
    valorUnitario: 49.9,
  },
  {
    codigo: "65432198",
    nome: "Tinta Acrílica Branco 18L Suvinil",
    codBarras: "65432198",
    marca: "Suvinil",
    controle: "18L",
    valorUnitario: 339.9,
  },
  {
    codigo: "12345678",
    nome: "Rejunte Flexível Cinza 1Kg Portokoll",
    codBarras: "12345678",
    marca: "Portokoll",
    controle: "1KG",
    valorUnitario: 19.9,
  },
  {
    codigo: "98765432",
    nome: "Impermeabilizante 5L Vedacit",
    codBarras: "98765432",
    marca: "Vedacit",
    controle: "5L",
    valorUnitario: 129.9,
  },
  {
    codigo: "45678912",
    nome: "Massa Corrida 18L Coral",
    codBarras: "45678912",
    marca: "Coral",
    controle: "18L",
    valorUnitario: 89.9,
  },
  {
    codigo: "78965412",
    nome: "Piso Cerâmico Beige 60x60 Portinari",
    codBarras: "78965412",
    marca: "Portinari",
    controle: "60x60",
    valorUnitario: 54.9,
  },
  {
    codigo: "32145698",
    nome: "Torneira para Cozinha Cromada Docol",
    codBarras: "32145698",
    marca: "Docol",
    controle: "Unidade",
    valorUnitario: 189.9,
  },
  {
    codigo: "89110999",
    nome: "Manta Liquida Verde 15Kg Bautech",
    codBarras: "89110999",
    marca: "Bautech",
    controle: "15KG",
    valorUnitario: 289.9,
  },
];

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const suggestionItemsRef = useRef([]);
  const { setItemsCarrinho } = useDataStore();


  const handleKeyPress = (event: KeyboardEvent) => {
    // Verifica se a tecla pressionada é uma letra ou número
    // e se o alvo do evento não é o input em si (para evitar duplicação)
    const activeElement = document.activeElement;
    
    if (
        event.key.length === 1 && 
        !/^[^\w]$/.test(event.key) && 
        event.target !== inputRef.current &&
        !['INPUT', 'TEXTAREA', 'SELECT', 'EZ-TEXT-INPUT', 'EZ-NUMBER-INPUT'].includes(activeElement.tagName) &&
        activeElement.getAttribute('contentEditable') !== 'true'
      ) {
      // Foca no input
      inputRef.current.focus();
      
    }
  };
  
  const handleBuscarProdutos = async () => {
    if (searchTerm.length >= 2) {
      const filteredProducts = sampleProducts.filter(
        (product) =>
          product.codigo.includes(searchTerm) ||
          product.codBarras.includes(searchTerm) ||
          product.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredProducts);
      setIsOpen(true);
      setSelectedIndex(-1); // Resetar seleção
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    // Navegação com setas
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();

      //   if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
    //   handleSuggestionClick(suggestions[selectedIndex]);
      handleSuggestionClick();
      //   }
    } else if (event.key === "Escape") {
      event.preventDefault();

      setIsOpen(false);
    }

    // setItemsCarrinho(null)
  };

  const handleSuggestionClick = async () => {
    // setSearchTerm(product.codigo);
    if (!searchTerm) return;

    setIsOpen(false);
    inputRef.current.focus();

    const arrayQuatidadeProduto = searchTerm?.split("*");

    const quantidade =
      arrayQuatidadeProduto.length > 1 ? arrayQuatidadeProduto[0] : 1;

    const codigoEan =
      arrayQuatidadeProduto.length > 1
        ? arrayQuatidadeProduto[1]
        : arrayQuatidadeProduto[0];

    const produto = await ProdutoService.buscarPorEan(codigoEan);

    // if(!produto?.id_produto) return

    // const imagens = await ImagemProdutoService.buscarPorIdProduto(produto?.id_produto);

    setItemsCarrinho({ ...produto, quantidade: +quantidade });

    setSearchTerm("");
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  // Resetar refs do array de itens quando as sugestões mudam
  useEffect(() => {
    suggestionItemsRef.current = suggestionItemsRef.current.slice(
      0,
      suggestions.length
    );
  }, [suggestions]);

  // Filtrar produtos com base no termo de busca

  useEffect(() => {
    handleBuscarProdutos();
  }, [searchTerm]);

  // Scroll item selecionado para dentro da visualização
  useEffect(() => {
    if (
      selectedIndex >= 0 &&
      suggestionsRef.current &&
      suggestionItemsRef.current[selectedIndex]
    ) {
      const container = suggestionsRef.current;
      const selectedItem = suggestionItemsRef.current[selectedIndex];

      const containerRect = container.getBoundingClientRect();
      const selectedItemRect = selectedItem.getBoundingClientRect();

      // Verificar se o item está fora da visualização do container
      if (selectedItemRect.bottom > containerRect.bottom) {
        // Se o item estiver abaixo da área visível
        container.scrollTop += selectedItemRect.bottom - containerRect.bottom;
      } else if (selectedItemRect.top < containerRect.top) {
        // Se o item estiver acima da área visível
        container.scrollTop -= containerRect.top - selectedItemRect.top;
      }
    }
  }, [selectedIndex]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Foco no input
  useEffect(()=>{
    // Adiciona o event listener ao documento
    document.addEventListener('keydown', handleKeyPress);
    
    // Remove o event listener quando o componente for desmontado
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  },[])

  return (
    <div ref={wrapperRef}>
      <div className="relative">
        {/* Campo de busca */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full p-2 pl-3 pr-10 rounded-full bg-[#F4F6F9] border border-[#008561] focus:outline-none focus:ring-2 focus:ring-[#008561]"
            placeholder="Adicionar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event)=>handleKeyDown(event)}
          />
          <div className="absolute right-3 top-3 text-[#008561]">
            <FaSearch  />
          </div>
        </div>

        {/* Lista de sugestões com scroll */}
        {/* {isOpen && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-lg z-10 max-h-64 overflow-y-auto"
          >
            {suggestions.map((product, index) => (
              <div 
                key={product.codigo}
                ref={el => suggestionItemsRef.current[index] = el}
                className={`p-3 border-b border-gray-100 cursor-pointer ${
                  selectedIndex === index ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSuggestionClick(product)}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <div className="font-medium text-gray-700">{product.nome}</div>
                <div className="text-sm text-gray-500">
                  Cód de Barras: {product.codBarras}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Marca: {product.marca}</span>
                  <span>Controle: {product.controle}</span>
                </div>
                <div className="mt-1 text-right font-medium text-green-600">
                  Vlr. Unitário: R$ {product.valorUnitario.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
