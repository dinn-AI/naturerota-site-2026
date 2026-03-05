# 🚀 Otimização de Third-Party Scripts para Core Web Vitals

**Data**: Março 2026  
**Arquivo Modificado**: [`src/layouts/Layout.astro`](src/layouts/Layout.astro)  
**Objetivo**: Reduzir impacto de GTM, GA4, Meta Pixel e TikTok nos Core Web Vitals

---

## 📊 Problema Identificado

Os scripts de terceiros estavam sendo carregados **sincronamente no `<head>`**, causando:

- ❌ **LCP (Largest Contentful Paint)**: Bloqueio de rendering
- ❌ **FCP (First Contentful Paint)**: Scripts aguardando interpretação
- ❌ **INP (Interaction to Next Paint)**: Poluição da main thread
- ❌ **TBT (Total Blocking Time)**: Execução de scripts durante interações do usuário

### Scripts Identificados e Removidos do `<head>`:

```
- Google Tag Manager (GTM-P3XJGXL5) ← Carregava bloqueante
- Meta Pixel (fbq) ← Carregava bloqueante  
- TikTok Pixel ← Carregava bloqueante
- GA4 (G-9KWR7HV8NS) ← Script async + inicialização bloqueante
```

---

## ✅ Solução Implementada

### 1️⃣ Remoção do `<head>`
Todos os scripts foram **removidos do `<head>`** para não bloquear rendering.

### 2️⃣ Estratégia de Lazy-Loading

```javascript
┌─────────────────────────────────────────────────────┐
│       OTIMIZAÇÃO DE SCRIPTS NO </body>              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ GTM, GA4, TikTok:                                   │
│ ├─ Após window.load (não crítico)                  │
│ ├─ requestIdleCallback com timeout 3s             │
│ ├─ Fallback: setTimeout 1s se DOM carregado       │
│ └─ ✅ Não bloqueia rendering                       │
│                                                     │
│ Meta Pixel:                                         │
│ ├─ Após primeira interação (pointerdown)           │
│ ├─ OU após scroll (engajamento)                    │
│ ├─ Fallback: setTimeout 5s                         │
│ └─ ✅ Menor prioridade (e-commerce tracking)      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3️⃣ Remoção de `<noscript>` Tags
Meta Pixel `<noscript>` removido para evitar:
- Request extra no HTML inicial (impacta LCP)
- Piksels de rastreamento duplicados
- Overhead desnecessário em browsers modernos

### 4️⃣ Implementações de Performance

✅ **Todos os scripts agora usam**:
- `async=true` para não bloquear parsing
- Inserção no final do `<body>` para máxima prioridade baixa
- Flags (`_thirdPartyLoaded`, `_metaPixelLoaded`) para evitar double-load
- `{ once: true }` em event listeners para limpeza automática

---

## 📈 Impacto Esperado nos Core Web Vitals

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **LCP** | ~3.5s | ~2.8s | -20% ⬇️ |
| **FCP** | ~3.0s | ~1.8s | -40% ⬇️ |
| **INP** | ~120ms | ~50ms | -58% ⬇️ |
| **TBT** | ~340ms | ~80ms | -76% ⬇️ |
| **CLS** | ~0.05 | ~0.05 | Sem mudança |

*Estimativas baseadas em padrões de otimização de third-party scripts*

---

## 🔍 Detalhes da Implementação

### Antes (❌ Problema)
```html
<head>
  <!-- 🚫 BLOQUEIA RENDERING -->
  <script is:inline>
    (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-P3XJGXL5');
  </script>
  
  <!-- 🚫 BLOQUEIA RENDERING -->
  <script is:inline>
    !function(f,b,e,v,n,t,s){...fbq('init',...)}
  </script>
  
  <!-- 🚫 BLOQUEIA RENDERING -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9KWR7HV8NS"></script>
</head>

<noscript>
  <!-- 🚫 Pixel de rastreamento no HTML inicial -->
  <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1398654025074894&ev=PageView&noscript=1"
  />
</noscript>
```

### Depois (✅ Otimizado)
```html
<head>
  <!-- ✅ SEM scripts bloqueantes -->
</head>

<body>
  <!-- ... conteúdo ... -->

  <!-- ✅ SCRIPTS OTIMIZADOS NO FINAL DO BODY -->
  <script is:inline>
    window._thirdPartyLoaded = false;
    window._metaPixelLoaded = false;

    // 1️⃣ Função para carregar Analytics (GTM, GA4, TikTok)
    function loadAnalytics() {
      if (window._thirdPartyLoaded) return;
      window._thirdPartyLoaded = true;
      
      // GTM aqui...
      // GA4 aqui...
      // TikTok aqui...
    }

    // 2️⃣ Função para carregar Meta Pixel
    function loadMetaPixel() {
      if (window._metaPixelLoaded) return;
      window._metaPixelLoaded = true;
      
      // Meta Pixel aqui...
    }

    // 3️⃣ Estratégia de Execução:
    // - Analytics: após window.load
    if (document.readyState === 'loading') {
      window.addEventListener('load', loadAnalytics);
    } else {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAnalytics, { timeout: 3000 });
      } else {
        setTimeout(loadAnalytics, 1000);
      }
    }

    // - Meta Pixel: após primeira interação
    document.addEventListener('pointerdown', loadMetaPixel, { once: true, capture: true });
    document.addEventListener('scroll', loadMetaPixel, { once: true, capture: true });
    
    // - Fallback: 5 segundos
    setTimeout(() => {
      if (!window._metaPixelLoaded) loadMetaPixel();
    }, 5000);
  </script>
</body>
```

---

## 🔐 Compatibilidade

✅ **Astro SSR/SSG**: Totalmente compatível  
✅ **Vercel**: Deploy automático sem alterações  
✅ **Browsers modernos**: Suporte a `requestIdleCallback`, `event.once`, `capture`  
⚠️ **IE11**: Meta Pixel pode não carregar se nenhuma interação em 5s (degradação aceitável)

---

## 📋 Checklist de Rastreamento

- [x] GTM funciona após page load
- [x] GA4 funciona após page load
- [x] TikTok Pixel funciona após page load
- [x] Meta Pixel funciona após primeira interação
- [x] UTM parameters são capturados e repassados a links Hotmart
- [x] Sem double-load de scripts
- [x] Noscript tags removidos para Meta Pixel
- [x] Build Astro não quebrado
- [x] Compatível com Vercel

---

## 🎯 Próximos Passos Recomendados

### Fase 2: Integração com Partytown (Opcional)

Se quiser melhorias **ainda maiores**, consider instalar `@astrojs/partytown`:

```bash
npm install @astrojs/partytown
# ou
pnpm add @astrojs/partytown
```

**O que é Partytown?**
- Move scripts de terceiros para **Web Worker** (thread separada)
- Main thread fica 100% livre
- Ideal para: GTM, GA4, TikTok, Hotjar, etc.

**Ganho de Performance**:
- INP: -70% a -80%
- TBT: -85% a -90%
- Main thread bloqueante: ~0ms

**Migração do GTM com Partytown**:
```astro
// astro.config.mjs
import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [partytown()],
});
```

```html
<!-- No Layout.astro -->
<script is:inline type="text/partytown">
  (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-P3XJGXL5');
</script>
```

**Scripts que podem mover para Partytown**:
- ✅ GTM (Google Tag Manager)
- ✅ GA4 (Google Analytics 4)
- ✅ TikTok Pixel
- ⚠️ Meta Pixel (requer forwarder de eventos)
- ⚠️ Hotjar (com config)

---

## 🧪 Como Testar

### 1. Verificar Lazy-Loading:
Abra DevTools (F12) → Console e observe:
```javascript
// Antes de window.load
console.log(window.gtag); // undefined
console.log(window.fbq); // undefined

// Depois de window.load
console.log(window.gtag); // ✅ function
console.log(window.fbq); // undefined (ainda não interagiu)

// Após primeira interação (scroll/click)
console.log(window.fbq); // ✅ function
```

### 2. Verificar em Lighthouse:
```bash
npm run build
npm run preview
# Abrir http://localhost:3000
# F12 → Lighthouse → Analyze
```

### 3. Verificar Rastreamento:
- GTM: https://tagassistant.google.com/
- Meta Pixel: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-api
- GA4: Google Analytics admin panel

---

## 📚 Referências

- [Astro Performance Guide](https://docs.astro.build/en/guides/performance/)
- [Core Web Vitals Best Practices](https://web.dev/vitals/)
- [Partytown Documentation](https://partytown.js.org/)
- [Google Tag Manager Best Practices](https://support.google.com/tagmanager/answer/12326985)

---

## 🎓 Aprendizados

1. **Never block rendering** com analytics
2. **Lazy-load** tudo que não é essencial
3. **Web Workers** (Partytown) são o futuro para third-party JS
4. **Test with Lighthouse** regularmente para acompanhar progresso
5. **requestIdleCallback** + timeouts são essenciais para fallback

---

**Status**: ✅ Concluído e testado  
**Próxima Review**: Após 2 semanas de produção
