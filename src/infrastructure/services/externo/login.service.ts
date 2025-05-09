import { setSession } from "../externo/session";

export async function doLogin(
  username: string,
  password: string,
  host: string
): Promise<any> {
  let response;
  try {
    const xmlBody = `
        <serviceRequest serviceName="MobileLoginSP.login">
          <requestBody>
            <NOMUSU>${username}</NOMUSU>
            <INTERNO>${password}</INTERNO>
          </requestBody>
        </serviceRequest>
      `;

    response = await fetch(
      `https://primary-pwa-api.onrender.com/api?host=${encodeURIComponent(host)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlBody.trim(),
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}: ${text}`);
    }

    const jsessionMatch = text.match(/<jsessionid>(.*?)<\/jsessionid>/);
    if (!jsessionMatch) {
      throw new Error("Sessão não retornada pelo login.");
    }

    const sessionId = jsessionMatch[1];

    setSession(sessionId, host);

    return {
      sessionId,
      backendUrl: host,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
}
