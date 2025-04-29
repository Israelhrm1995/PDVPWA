import { setSession } from "../externo/session";

export async function doLogin(username: string, password: string): Promise<any> {
  const xmlBody = `
    <serviceRequest serviceName="MobileLoginSP.login">
      <requestBody>
        <NOMUSU>${username}</NOMUSU>
        <INTERNO>${password}</INTERNO>
      </requestBody>
    </serviceRequest>
  `;

  const response = await fetch('http://localhost:3000/api?', {
    method: 'POST',
    headers: { 'Content-Type': 'application/xml' },
    body: xmlBody.trim()
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}: ${text}`);
  }

  const jsessionMatch = text.match(/<jsessionid>(.*?)<\/jsessionid>/);
  if (!jsessionMatch) {
    throw new Error("Sessão não retornada pelo login.");
  }

  const sessionId = jsessionMatch[1];

  // ✅ Salva a sessão para uso posterior
  setSession(sessionId, "/api");

  return {
    sessionId,
    backendUrl: "/api"
  };
}