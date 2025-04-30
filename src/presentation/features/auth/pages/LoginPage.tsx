import { useState } from "react";
import { doLogin } from "@/infrastructure/services/externo/login.service";
import { executarCargaGeral } from "@/infrastructure/services/externo/carga/carga.service"

export default function LoginPage() {
  const [url, setUrl] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const handleLogin = async () => {
    try {
      await doLogin(usuario, senha);
      console.log("✅ Login realizado com sucesso!");

      await executarCargaGeral();
      console.log("📦 Carga de dados finalizada!");
    } catch (e: any) {
      console.error("❌ Erro no login ou carga:", e.message || e);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login ERP</h2>
      <input
        placeholder="URL da API"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      /><br />
      <input
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      /><br />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Entrar e Sincronizar</button>
    </div>
  );
}
