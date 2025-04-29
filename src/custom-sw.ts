/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

// 🔐 Controle de sessão
let sessionId: string | null = null;
let sessionStart: number | null = null;
let backendUrl: string | null = null;

function setSession(id: string, url: string) {
  sessionId = id;
  backendUrl = url;
  sessionStart = Date.now();
}

function getSessionId() {
  const agora = Date.now();
  if (sessionStart && agora - sessionStart < 5 * 60 * 1000) {
    return sessionId;
  }
  return null;
}

function getBackendUrl() {
  return backendUrl;
}

function getSessionInfo() {
  return { sessionId, sessionStart, backendUrl };
}

// 🔁 Chamada de serviço JSON Sankhya
async function callJsonService(serviceName: string, requestBody: Record<string, any>) {
  const sessionId = getSessionId();
  const backendUrl = getBackendUrl();

  if (!sessionId || !backendUrl) throw new Error("Sessão inválida ou expirada.");

  const url = `${backendUrl}/mge/service.sbr?serviceName=${serviceName}&application=PdvWeb&outputType=json&preventTransform=false&mgeSession=${sessionId}`;

  const body = JSON.stringify({
    serviceName,
    requestBody
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": `JSESSIONID=${sessionId}`
    },
    body
  });

  const text = await response.text();

  if (text.trim().startsWith("<")) {
    console.error("⚠️ Resposta em XML (erro Sankhya):", text);
    throw new Error("Erro retornado em formato XML. Serviço não reconhecido ou falha no backend.");
  }

  try {
    const json = JSON.parse(text);
    const responseBody = json.responseBody;
    if (!responseBody) {
      console.error("❌ JSON não possui responseBody:", json);
      throw new Error("Formato inválido na resposta JSON da API Sankhya.");
    }
    return responseBody;
  } catch (err) {
    console.error("❌ Erro ao processar resposta JSON:", err, text);
    throw new Error("Erro ao interpretar resposta JSON da API Sankhya.");
  }
}

// 🔓 Lógica de login
interface LoginPayload {
  username: string;
  password: string;
  url: string;
}

interface LoginMessage {
  type: 'LOGIN';
  payload: LoginPayload;
}

self.addEventListener('message', async (event: ExtendableMessageEvent) => {
  const data = event.data as LoginMessage;

  if (data.type === 'LOGIN') {
    const { username, password, url } = data.payload;
    const port = event.ports[0];

    try {
      const response = await loginLogic(username, password, url);
      port.postMessage({ success: true, data: response });
    } catch (error: any) {
      port.postMessage({ success: false, error: error.message || 'Erro desconhecido' });
    }
  }
});

async function loginLogic(username: string, password: string, url: string): Promise<any> {
  const xmlBody = `
    <serviceRequest serviceName="MobileLoginSP.login">
      <requestBody>
        <NOMUSU>${username}</NOMUSU>
        <INTERNO>${password}</INTERNO>
      </requestBody>
    </serviceRequest>
  `;

  const res = await fetch(`${url}/mge/service.sbr?serviceName=MobileLoginSP.login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml'
    },
    body: xmlBody.trim()
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${text}`);
  }

  const jsessionMatch = text.match(/<jsessionid>(.*?)<\/jsessionid>/);
  if (!jsessionMatch) throw new Error("Sessão não retornada pelo login");

  const sessionId = jsessionMatch[1];
  setSession(sessionId, url);

  return {
    sessionId,
    backendUrl: url
  };
}


interface CallJsonPayload {
  serviceName: string;
  requestBody: Record<string, any>;
}

type MessageTypes = 'LOGIN' | 'CALL_JSON_SERVICE';

interface ServiceWorkerMessage {
  type: MessageTypes;
  payload: any;
}

self.addEventListener('message', async (event: ExtendableMessageEvent) => {
  const data = event.data as ServiceWorkerMessage;
  const port = event.ports[0];

  try {
    if (data.type === 'LOGIN') {
      const { username, password, url } = data.payload;
      const response = await loginLogic(username, password, url);
      port.postMessage({ success: true, data: response });

    } else if (data.type === 'CALL_JSON_SERVICE') {
      const { serviceName, requestBody } = data.payload as CallJsonPayload;
      const response = await callJsonService(serviceName, requestBody);
      port.postMessage({ success: true, data: response });

    } else {
      throw new Error(`Tipo de mensagem desconhecido: ${data.type}`);
    }
  } catch (error: any) {
    port.postMessage({ success: false, error: error.message || 'Erro desconhecido' });
  }
});