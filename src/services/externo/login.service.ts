export async function doLogin(username: string, password: string, url: string): Promise<any> {
  if (!navigator.serviceWorker.controller) {
    await new Promise((resolve) => {
      navigator.serviceWorker.ready.then(() => {
        resolve(true);
      });
    });
  }

  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      if (event.data.success) {
        resolve(event.data.data);
      } else {
        reject(new Error(event.data.error));
      }
    };

    navigator.serviceWorker.controller?.postMessage({
      type: 'LOGIN',
      payload: { username, password, url }
    }, [messageChannel.port2]);
  });
}
