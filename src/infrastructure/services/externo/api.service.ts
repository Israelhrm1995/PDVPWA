import { getSessionId, getBackendUrl } from "../externo/session";

export async function callJsonService(serviceName: string, requestBody: Record<string, any>) {
  const sessionId = getSessionId();
  const backendUrl = getBackendUrl();

  if (!sessionId || !backendUrl) {
    throw new Error("Sessão inválida ou backend não configurado.");
  }

  const url = `https://primary-pwa-api.onrender.com/checkout?serviceName=${serviceName}&mgeSession=${sessionId}&host=${encodeURIComponent(backendUrl)}`;

  const response = await fetch(url, {
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
