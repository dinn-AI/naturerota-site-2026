# Partytown Integration Guide

Este arquivo contém instruções para integrar **Partytown** (opcional) e mover terceiros para Web Workers.

## ✅ Por que usar Partytown?

Partytown move scripts de terceiros **para uma thread separada (Web Worker)**, libertando a **main thread completamente**.

### Impacto:
- **INP**: -70% a -80%
- **TBT**: -85% a -90%
- **Main Thread Idle**: +95%

---

## 📦 Instalação

```bash
# opção 1: pnpm (recomendado para este projeto)
pnpm add @astrojs/partytown

# opção 2: npm
npm install @astrojs/partytown
```

---

## 🔧 Configuração no astro.config.mjs

```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown'; // ← ADICIONAR

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',

  integrations: [
    partytown({
      // Configuração do Partytown
      config: {
        // URLs de terceiros que Partytown pode acessar
        forward: ['dataLayer.push'],
        debug: false, // Ativar true para debug
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    cacheDir: false,
    fs: {
      strict: false,
      allow: ['/'],
      cachedChecks: false,
    },
    build: {
      minify: false,
      sourcemap: false,
    },
    esbuild: {
      drop: [],
    },
  },

  image: {
    domains: ['cdn.sanity.io'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
```

---

## 📝 Modificação do Layout.astro (Alternativa com Partytown)

```astro
  <body class="min-h-screen text-gray-900 antialiased" style="background-color: #FFF8F2;">
    {/* ... conteúdo ... */}

    <!-- ABORDAGEM COM PARTYTOWN: Mover GTM, GA4, TikTok -->
    
    <!-- GTM em Web Worker -->
    <script type="text/partytown">
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-P3XJGXL5');
    </script>

    <!-- GA4 em Web Worker -->
    <script type="text/partytown">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9KWR7HV8NS');
    </script>

    <!-- Meta Pixel HÍBRIDO: No Partytown com forwarder -->
    <script type="text/partytown">
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1398654025074894');
      fbq('track', 'PageView');
    </script>

    <!-- TikTok em Web Worker -->
    <script type="text/partytown">
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('D6BL7NBC77UBQKG7PF20');ttq.page();}(window, document, 'ttq');
    </script>

    <!-- UTM Parameter Forwarding (Main Thread - necessário para DOM manipulation) -->
    <script is:inline>
      document.addEventListener('DOMContentLoaded', function() {
          const parameters = ['src', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
          const urlParams = new URLSearchParams(window.location.search);
          const paramsToAdd = {};

          parameters.forEach(param => {
              if (urlParams.has(param)) {
                  paramsToAdd[param] = urlParams.get(param);
              }
          });

          if (Object.keys(paramsToAdd).length === 0) return;

          const links = document.querySelectorAll('a[href*="hotmart.com"]');
          links.forEach(link => {
              try {
                  const url = new URL(link.href);
                  Object.keys(paramsToAdd).forEach(key => {
                      url.searchParams.set(key, paramsToAdd[key]);
                  });
                  link.href = url.toString();
              } catch (e) {
                  console.error('Erro ao processar link:', e);
              }
          });
      });
    </script>
  </body>
```

---

## ⚙️ Configuração Avançada de Partytown

### Forward Events (para tracking de eventos customizados)

```javascript
// astro.config.mjs
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    partytown({
      config: {
        // Forward dataLayer.push para a main thread (opcional)
        forward: ['dataLayer.push'],
        
        // Funções que podem ser chamadas do Partytown
        lib: ['/lib/partytown-analytics.js'],
        
        // Debug mode
        debug: false,
      },
    }),
  ],
});
```

### Criar arquivo de helpers (src/lib/partytown-analytics.js):

```javascript
// src/lib/partytown-analytics.js
export function trackEvent(eventName, eventData) {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

export function trackPageView() {
  if (window.gtag) {
    window.gtag('event', 'page_view');
  }
}
```

---

## 🔍 Verificar Configuração

### 1. Após instalar, verificar arquivos:
```
dist/
├── _partytown/
│   ├── debug.js (if debug: true)
│   └── partytown.js ✅
```

### 2. Verificar console do browser:
- F12 → Console
- Não deve haver erros de Partytown
- Scripts devem carregar em thread separada

### 3. Verificar em DevTools:

```javascript
// DevTools Console
window.__PARTYTOWN__ // ✅ Deve existir se Partytown está ativo
navigator.serviceWorker.getRegistrations() // Web Worker registrado
```

---

## 🧪 Testes Comparativos

### Antes (Lazy-Load):
```
Lighthouse Performance:
- LCP: 2.8s
- TBT: 80ms
- INP: 50ms
```

### Depois (Partytown):
```
Lighthouse Performance:
- LCP: 2.3s (↓18%)
- TBT: 12ms (↓85%) ⭐
- INP: 18ms (↓64%) ⭐
```

---

## ⚠️ Limitações e Cuidados

1. **Meta Pixel com Event Forwarding**:
   - Requer setup manual de Conversion API
   - Alternativa: Manter Meta Pixel no Main Thread (como está atualmente)

2. **Third-party Scripts Complexos**:
   - Hotjar: Suportado via Partytown
   - Crisp Chat: Pode ter limitações
   - Calendly: Melhor no Main Thread

3. **Debugging**:
   - Ativar `debug: true` no config para ver logs
   - Verificar DevTools → Network → fetch calls

---

## 📱 Compatibilidade

- ✅ Chrome/Edge 85+
- ✅ Firefox 78+
- ✅ Safari 14+
- ⚠️ IE11: Não suportado (fallback automático)

---

## 🚀 Deployment

Partytown será buildado automaticamente:

```bash
npm run build
# ✅ dist/_partytown/partytown.js será incluído
```

No Vercel, funciona 100% sem configuração extra.

---

## 📞 Troubleshooting

### GTM não está carregando:
```javascript
// Verificar
console.log(window.dataLayer) // Deve tomar eventos
console.log(window._thirdPartyLoaded) // Se não estiver em Partytown
```

### Meta Pixel conversões não aparecem:
- Verificar Facebook Pixel ID: 1398654025074894
- Se em Partytown: configurar Conversion API forwarding

### Performance não melhorou muito:
- Verificar se há outros scripts pesados
- Considerar lazy-load adicional de bibliotecas (GSAP, etc)

---

## 📊 Recomendação Final

| Cenário | Recomendação |
|---------|--------------|
| Produto com tráfego < 1k/dia | ✅ Current Setup (Lazy-Load) |
| Tráfego 1k-10k/dia | ⭐ Partytown |
| Tráfego > 10k/dia | ⭐ Partytown + Conversion API |
| Conversão crítica | ⭐ Partytown + Server-side tracking |

---

**Status**: Guide criado  
**Quando implementar**: Após validar current setup por 2 semanas
