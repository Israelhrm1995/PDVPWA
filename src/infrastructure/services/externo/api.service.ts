import { getSessionId } from "../externo/session";

export async function callJsonService(serviceName: string, requestBody: Record<string, any>) {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Sessão inválida ou expirada.");

  const response = await fetch(`http://localhost:3000/checkout?serviceName=${serviceName}&mgeSession=${sessionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": `JSESSIONID=${sessionId}`
    },
    body: JSON.stringify({
      serviceName,
      requestBody
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro HTTP ${response.status}: ${text}`);
  }

  const data = await response.json();
  
  return data.responseBody;
}