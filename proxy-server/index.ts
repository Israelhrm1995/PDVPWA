import express from 'express';
import cors from 'cors';
import http from 'http';

const app = express();

app.use(cors()); // Libera CORS para o frontend

// 🔐 LOGIN XML → /api
app.post('/api', (req, res) => {
  let body = '';

  req.on('data', (chunk: Buffer) => {
    body += chunk;
  });

  req.on('end', () => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/mge/service.sbr?serviceName=MobileLoginSP.login',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body),
      }
    };

    const proxyReq = http.request(options, proxyRes => {
      const chunks: Buffer[] = [];

      proxyRes.on('data', (chunk: Buffer) => chunks.push(chunk));
      proxyRes.on('end', () => {
        const fullBuffer = Buffer.concat(chunks);
        res.status(proxyRes.statusCode || 200).send(fullBuffer);
      });
    });

    proxyReq.on('error', err => {
      console.error('❌ Erro no proxy de login:', err);
      res.status(500).send('Erro ao encaminhar para o ERP.');
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

// 🔁 JSON SERVICES → /checkout
app.post('/checkout', (req, res) => {
  let body = '';

  req.on('data', (chunk: Buffer) => {
    body += chunk;
  });

  req.on('end', () => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const search = url.search; // Mantém os parâmetros ?serviceName=...&mgeSession=...

    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/checkout/service.sbr${search}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    };

    const proxyReq = http.request(options, proxyRes => {
      const chunks: Buffer[] = [];

      proxyRes.on('data', (chunk: Buffer) => chunks.push(chunk));
      proxyRes.on('end', () => {
        const fullBuffer = Buffer.concat(chunks);
        res.status(proxyRes.statusCode || 200).send(fullBuffer);
      });
    });

    proxyReq.on('error', err => {
      console.error('❌ Erro no proxy do checkout:', err);
      res.status(500).send('Erro ao encaminhar para o ERP.');
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy rodando em http://localhost:${PORT}
🔐 Login via        POST /api
🔁 JSON Services via POST /checkout`);
});