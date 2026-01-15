# 🎨 Guia do Admin `/admin`

## 📍 Como Funciona

O admin do seu site está disponível na rota `/admin`:
- **Local:** `http://localhost:4321/admin`
- **Produção:** `https://naturerota.vercel.app/admin`

---

## 🏠 Ambiente Local (Desenvolvimento)

### Como Usar Agora

1. **Certifique-se que ambos os servidores estão rodando:**
   ```bash
   # Terminal 1: Site Astro
   pnpm run dev
   # Roda em: http://localhost:4321
   
   # Terminal 2: Sanity Studio
   pnpm sanity dev
   # Roda em: http://localhost:3333
   ```

2. **Acesse o admin integrado:**
   ```
   http://localhost:4321/admin
   ```

3. **O que acontece:**
   - A página `/admin` carrega o Sanity Studio (localhost:3333) dentro de um iframe
   - Você vê e edita posts normalmente
   - É o mesmo ambiente do localhost:3333, mas acessado através do seu site

### ✅ Vantagens

- ✅ Interface única: tudo em `localhost:4321`
- ✅ Navegação fácil entre site e admin
- ✅ Sem precisar lembrar de múltiplas URLs

---

## 🌐 Ambiente de Produção (Vercel)

### Status Atual

❌ **Ainda não configurado**

O Sanity Studio precisa ser deployado para funcionar em produção.

### Como Configurar (Primeira Vez)

#### **Opção 1: Script Automático (Recomendado)**

Execute no terminal:

```bash
bash deploy-studio-prod.sh
```

O script vai:
1. Verificar se você está logado no Sanity
2. Fazer deploy do Studio
3. Disponibilizar em: `https://naturerota.sanity.studio`

#### **Opção 2: Comandos Manuais**

```bash
# 1. Login no Sanity (primeira vez)
npx sanity login
# Escolha Google ou GitHub e faça login no navegador

# 2. Deploy do Studio
npx sanity deploy
# Escolha o hostname: naturerota
# Confirme: yes
```

### Depois do Deploy

Após o deploy bem-sucedido:

1. **Acesse:** `https://naturerota.vercel.app/admin`
2. **Funciona assim:**
   - Carrega o Studio deployado via iframe
   - Você faz login (se necessário)
   - Edita posts normalmente
   - Mudanças aparecem no site imediatamente*

*_Pode levar alguns segundos para o cache do Vercel atualizar_

---

## 🔄 Workflow Completo

### Para Editar Posts

#### **Em Desenvolvimento (Local):**
1. `pnpm run dev` (se não estiver rodando)
2. `pnpm sanity dev` (se não estiver rodando)
3. Acesse: `http://localhost:4321/admin`
4. Edite posts
5. Veja mudanças em: `http://localhost:4321/blog`

#### **Em Produção (Vercel):**
1. Acesse: `https://naturerota.vercel.app/admin`
2. Edite posts
3. Clique em "Publish"
4. Aguarde 10-30 segundos
5. Recarregue: `https://naturerota.vercel.app/blog`
6. ✅ Mudanças aparecem!

---

## 🎯 URLs Importantes

| Ambiente | Site | Blog | Admin | Studio Direto |
|----------|------|------|-------|---------------|
| **Local** | localhost:4321 | localhost:4321/blog | localhost:4321/admin | localhost:3333 |
| **Produção** | naturerota.vercel.app | naturerota.vercel.app/blog | naturerota.vercel.app/admin | naturerota.sanity.studio |

---

## 🚨 Troubleshooting

### Erro: "Studio não carrega" (Local)

**Causa:** Sanity Studio não está rodando

**Solução:**
```bash
pnpm sanity dev
```

---

### Erro: "Deploy Necessário" (Produção)

**Causa:** Sanity Studio não foi deployado ainda

**Solução:**
```bash
bash deploy-studio-prod.sh
```

---

### Erro: "Tela branca no /admin"

**Causa:** Conflito de iframe ou CORS

**Solução:**
1. Limpe cache do navegador (Ctrl+Shift+Del)
2. Tente em uma aba anônima
3. Se persistir, acesse diretamente:
   - Local: `http://localhost:3333`
   - Produção: `https://naturerota.sanity.studio`

---

### Erro: "Insufficient permissions"

**Causa:** Conta não tem permissão no projeto Sanity

**Solução:**
1. Verifique se está logado com a conta correta
2. Acesse: https://www.sanity.io/manage
3. Vá em: Projeto → Settings → Members
4. Adicione sua conta como "Administrator"

---

## 📝 Comandos Úteis

```bash
# Iniciar site local
pnpm run dev

# Iniciar Studio local
pnpm sanity dev

# Login no Sanity
npx sanity login

# Deploy do Studio
bash deploy-studio-prod.sh
# OU
npx sanity deploy

# Ver projetos Sanity
npx sanity projects list

# Verificar status de deploy
npx sanity deploy --list
```

---

## 🔐 Segurança

### Proteção do Admin

A rota `/admin` já tem:
- ✅ Meta tag `noindex` (não aparece no Google)
- ✅ Requer login no Sanity
- ✅ Permissões por usuário configuráveis

### Para Adicionar Senha Extra (Opcional)

Se quiser proteção adicional, pode usar:
1. **Vercel Password Protection** (Settings → Password Protection)
2. **HTTP Basic Auth** (configurar no `vercel.json`)
3. **Middleware Astro** (criar verificação customizada)

---

## 🎉 Próximos Passos

- [ ] Testar `/admin` localmente
- [ ] Fazer deploy do Studio: `bash deploy-studio-prod.sh`
- [ ] Testar `/admin` em produção
- [ ] Adicionar mais autores no Sanity (se necessário)
- [ ] Configurar proteção por senha (opcional)

---

**Data:** 15/01/2026  
**Versão:** 1.0
