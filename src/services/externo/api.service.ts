export async function callJsonService(serviceName: string, requestBody: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!navigator.serviceWorker.controller) {
      reject(new Error("Service Worker não está ativo."));
      return;
    }

    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      if (event.data.success) {
        resolve(event.data.data);
      } else {
        reject(new Error(event.data.error));
      }
    };

    navigator.serviceWorker.controller.postMessage({
      type: 'CALL_JSON_SERVICE',
      payload: { serviceName, requestBody }
    }, [messageChannel.port2]);
  });
}
