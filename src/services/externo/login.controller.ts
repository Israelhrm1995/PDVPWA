import { doLogin } from "../externo/login.service";

export async function handleLogin(url: string, login: string, senha: string) {
  try {
    const sessionId = await doLogin(url, login, senha);
    console.log("✅ Login realizado com sucesso:", sessionId);
    return { success: true, sessionId };
  } catch (error: any) {
    console.error("❌ Erro no login:", error.message);
    return { success: false, error: error.message };
  }
}