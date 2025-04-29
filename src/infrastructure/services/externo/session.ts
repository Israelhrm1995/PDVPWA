let sessionId: string | null = null;
let sessionStart: number | null = null;
let backendUrl: string | null = null;

export function setSession(id: string, url: string) {
  sessionId = id;
  backendUrl = url;
  sessionStart = Date.now();
}

export function getSessionId() {
  const agora = Date.now();
  if (sessionStart && agora - sessionStart < 5 * 60 * 1000) {
    return sessionId;
  }
  return null;
}

export function getBackendUrl() {
  return backendUrl;
}
