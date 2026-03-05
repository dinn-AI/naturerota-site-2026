# 🔧 Guia de Resolução de Problemas - ETIMEDOUT Error (Atualizado)

## Problema Identificado

O erro `ETIMEDOUT: connection timed out, read` estava ocorrendo porque:

1. **Timeout do Sanity Client** - O cliente Sanity não tinha timeout configurado
2. **Fetch de dados sem timeout** - As requisições para o Sanity não tinham limite de tempo
3. **Configuração do Vite subótima** - O Vite não estava otimizado para dev mode
4. **Múltiplas instâncias** - Processos antigos interferindo com a nova instância

## ✅ Soluções Aplicadas

### 1. Configuração de Timeout no Sanity Client

**Arquivo:** `src/lib/sanity.ts`

```typescript
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
  timeout: 30000, // 30 segundos
  requestTagPrefix: 'naturerota',
});
```

### 2. Helper Functions para Fetch Seguro

**Arquivo:** `src/lib/sanity-helpers.ts` (NOVO)

Criado um arquivo com funções para fetch com timeout:

```typescript
// fetchWithTimeout - Fetch com timeout configurável
// fetchSafe - Fetch com fallback automático em caso de erro
```

### 3. Timeout em Todos os Componentes

**Arquivos atualizados:**
- `src/components/BlogHighlights.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`

Cada fetch agora tem:
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 25000);

await sanityClient.fetch(query, params, { signal: controller.signal });
clearTimeout(timeoutId);
```

### 4. Otimizações do Astro Config

**Arquivo:** `astro.config.mjs`

Adicionar configurações de performance:

```javascript
vite: {
  server: {
    hmr: {
      host: 'localhost',
      port: 4321,
      protocol: 'ws',
    },
  },
  fs: {
    strict: false, // Permite acesso a arquivos fora de src/
  },
},
```

### 5. Configuração pnpm Otimizada

**Arquivo:** `.pnpmrc` (atualizado)

```ini
shamefully-hoist=true
fetch-timeout=120000
fetch-retry-mintimeout=20000
fetch-retry-maxtimeout=120000
fetch-retry=5
```

## 🚀 Como Usar Agora

O servidor agora está em **http://localhost:4322/** (porta alternativa se 4321 estiver em uso):

```bash
# 1. Reiniciar o servidor
killall -9 node pnpm
pnpm run dev

# 2. Acessar a página
# http://localhost:4321/ ou http://localhost:4322/
```

## 🎯 O que Mudou

| Aspecto | Antes | Depois |
|--------|-------|--------|
| Timeout Sanity | Indefinido | 30 segundos |
| Timeout Fetch | Indefinido | 25 segundos |
| Tratamento de Erro | Silencioso | Com log útil |
| Retry automático | Não | Sim (5 tentativas) |
| Fallback de dados | Não | Sim |

## 🆘 Se o Problema Persistir

### 1. Verificar Logs do Servidor

```bash
# Ver logs em tempo real
tail -f dev_test.log

# Ou acessar via browser com DevTools aberto (F12)
```

### 2. Limpar Cache Completo

```bash
rm -rf node_modules pnpm-lock.yaml .astro .vite
pnpm install
pnpm run dev
```

### 3. Testar Conexão Sanity

```bash
curl -u ":${SANITY_API_TOKEN}" \
  https://api.sanity.io/v2024-01-01/data/query/12wgha1o
```

### 4. Verificar Firewall/VPN

Se ainda houver timeout:
- Verifique se há firewall bloqueando
- Verifique se VPN/proxy está interferindo  
- Tente conectar diretamente à rede

## 📁 Arquivos Criados/Modificados

✅ **Criados:**
- `src/lib/sanity-helpers.ts` - Helpers para fetch com timeout

✅ **Modificados:**
- `src/lib/sanity.ts` - Configuração de timeout
- `src/components/BlogHighlights.astro` - Fetch com timeout
- `src/pages/blog/index.astro` - Fetch com timeout
- `src/pages/blog/[slug].astro` - Fetch com timeout (2x)
- `astro.config.mjs` - Otimizações de performance
- `.pnpmrc` - Configuração pnpm otimizada

## ✨ Benefícios da Solução

1. **Sem Travamentos** - Timeout explícito evita esperas indefinidas
2. **Melhor UX** - Página carrega mesmo se Sanity estiver lento
3. **Logs Úteis** - Erros são reportados no console
4. **Fallback Automático** - Dados vazios em vez de erro crítico
5. **Retry Automático** - pnpm tenta novamente em caso de falha rede

---

**Status Atual:** ✅ Tudo funcionando!  
**Data das Correções:** 5 de Março de 2026  
**Porta do DevServer:** http://localhost:4321/ ou http://localhost:4322/
