import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <div>
        <h1>404 - Página não encontrada</h1>
      </div>
      <p>A página que você está tentando acessar não existe ou foi movida.</p>
      <Link to="/">Voltar para o início</Link>
    </div>
  );
};

export default NotFoundPage;
