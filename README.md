# PWA React + Dexie + Integração com ERP

Este projeto é um PDV offline-first construído em React, usando Service Worker, Dexie.js para persistência local em IndexedDB, e integração com sistemas externos (ex: ERP Java) via XML. Suporta scripts de inicialização via arquivos `.sql`, controle de versionamento e persistência no IndexedDB.

## 📁 Estrutura do Projeto

```
/src
├── App.tsx                  # Interface principal (formulário de login ERP)
├── main.tsx                 # Ponto de entrada da aplicação
├── controllers/             # Camada de orquestração de lógica de negócio
│   └── produto.controller.ts
│   └── imagem-produto.controller.ts
│   └── item.controller.ts
├── services/                # Acesso ao banco (Dexie) e serviços externos
│   ├── externo/             # Integração com ERP
│   │   └── login.service.ts
│   │   └── session.ts
│   │   └── api.service.ts
│   │   └── carga.service.ts
│   └── produto.service.ts
│   └── imagem-produto.service.ts
│   └── item.service.ts
├── models/                  # Estrutura das tabelas
│   └── produto.model.ts
│   └── imagem-produto.model.ts
│   └── item.model.ts
├── business/                # Regras de negócio
│   └── produto.helper.ts
│   └── imagem-produto.helper.ts
│   └── item.helper.ts
├── db/                      # Dexie + fallback para .sql
│   └── pdv-db.ts            # Definição do schema Dexie
├── utils/                   # Auxiliares (ex: xml parser)
│   └── xml.ts
```

## 🚀 Funcionalidades

- Suporte completo a IndexedDB via Dexie.js
- Controle de versão de scripts SQL executados
- Interface para login e integração com ERP
- Carga de dados por XML com `jsessionid`
- Persistência segura e controle transacional
- Offline-ready com Service Worker
- Estrutura separada em camadas (model, service, controller, business)

Chama `doLogin(url, usuario, senha)` e, se bem-sucedido, `carregarDadosIniciais(url, sessionId)`.

## 🧰 Deploy e Build

```bash
npm install
npm install --save-dev @types/react @types/react-dom # se erro com o useState 
npm run dev          # desenvolvimento
npm run build        # build de produção
npm install vite-plugin-pwa --save-dev
```

Para funcionar offline como PWA:
- Acesse pelo navegador em `http://localhost:5173`
- Instale como aplicativo (PWA)

---

Caso queira adicionar novas tabelas, siga o modelo de `produto.model.ts` + `produto.service.ts` + `produto.helper.ts` + `produto.controller.ts`

---
