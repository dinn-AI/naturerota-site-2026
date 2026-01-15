# 🧪 Checklist de Testes Pós-Deploy

## ✅ Status do Deploy

**Data:** 15/01/2026  
**Commit:** `aff5fe2` - Integra Sanity Studio e corrige problemas de segurança  
**Branch:** `main`

---

## 📋 Testes a Realizar

### 1. ✅ Verificar Deploy na Vercel

1. Acesse: https://vercel.com/
2. Vá em **"naturerota-site-2026"**
3. Verifique se o último deploy está **"Ready"** (verde)
4. Veja a URL de produção

**URL esperada:** `https://naturerota-site-2026.vercel.app` ou similar

---

### 2. ✅ Testar Homepage

1. Acesse a URL do seu site na Vercel
2. Verifique se:
   - ✅ Homepage carrega sem erros
   - ✅ Blog highlights aparecem (3 artigos)
   - ✅ Imagens carregam corretamente
   - ✅ Navbar funciona

**Status:** [ ] OK  |  [ ] Erro

---

### 3. ✅ Testar Página de Blog

1. Acesse: `https://sua-url.vercel.app/blog`
2. Verifique se:
   - ✅ Lista de posts aparece
   - ✅ Imagens dos autores carregam
   - ✅ Não há erros no console

**Status:** [ ] OK  |  [ ] Erro

---

### 4. 🎯 **TESTE PRINCIPAL: Acesso ao Admin**

#### Teste 1: Rota /admin
1. Acesse: `https://sua-url.vercel.app/admin`
2. **Esperado:** 
   - Página com loading spinner aparece
   - Após 1-2 segundos, redireciona para `https://www.sanity.io/manage/project/[SEU_ID]/desk`
3. **Resultado:**
   - [ ] Redirecionou corretamente
   - [ ] Sanity Studio abriu
   - [ ] Você consegue fazer login

#### Teste 2: Rota /admin/studio
1. Acesse: `https://sua-url.vercel.app/admin/studio`
2. **Esperado:**
   - Página com botão "Acessar Sanity Studio"
   - Links para voltar à homepage e ver blog
3. **Resultado:**
   - [ ] Página carrega
   - [ ] Botão funciona
   - [ ] Links funcionam

**Status Geral:** [ ] OK  |  [ ] Erro

---

### 5. ✅ Testar Edição de Posts

1. No Sanity Studio, clique em **"Post"**
2. Abra um post existente
3. Faça uma pequena mudança (ex: adicione um ponto no título)
4. Clique em **"Publish"**
5. Volte ao site: `https://sua-url.vercel.app/blog`
6. Faça **hard refresh** (Cmd+Shift+R)
7. **Esperado:** A mudança aparece no site

**Status:** [ ] OK  |  [ ] Erro  
**Tempo de atualização:** ___ segundos/minutos

---

### 6. ✅ Verificar Console de Erros

1. Abra DevTools (F12)
2. Vá em **"Console"**
3. Navegue pelo site (homepage, blog, post individual)
4. **Esperado:** Nenhum erro vermelho relacionado a:
   - Sanity
   - Environment variables
   - Imagens quebradas
   - CORS

**Erros encontrados:**
```
[Anotar aqui se houver]
```

---

### 7. ✅ Testar Post Individual

1. Acesse um post: `https://sua-url.vercel.app/blog/[slug-do-post]`
2. Verifique se:
   - ✅ Imagem de capa carrega
   - ✅ Conteúdo aparece
   - ✅ Imagem do autor aparece
   - ✅ Data de publicação está correta
   - ✅ Seção "Continue Lendo" mostra posts relacionados

**Status:** [ ] OK  |  [ ] Erro

---

## 🔐 Verificar Segurança

### ✅ Dados Sensíveis NÃO Devem Aparecer

Verifique o código-fonte da página (Ctrl+U ou Cmd+Option+U):

1. **Busque por:** `12wgha1o`
   - [ ] NÃO encontrado (correto!)
   - [ ] Encontrado (PROBLEMA!)

2. **Busque por:** `skvEsE1m` (parte do token antigo)
   - [ ] NÃO encontrado (correto!)
   - [ ] Encontrado (PROBLEMA!)

3. **Busque por:** `/Users/renancavalheiro`
   - [ ] NÃO encontrado (correto!)
   - [ ] Encontrado (PROBLEMA!)

**Status de Segurança:** [ ] ✅ Seguro  |  [ ] ⚠️ Dados expostos

---

## 🚨 Se Algo Der Errado

### Erro: "PUBLIC_SANITY_PROJECT_ID não está configurado"

**Solução:**
1. Acesse Vercel → Seu Projeto → Settings → Environment Variables
2. Adicione/verifique:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
3. Clique em **"Redeploy"**

### Erro: CORS ao carregar imagens/dados

**Solução:**
1. Acesse: Sanity → Seu Projeto → Settings → API
2. Adicione nas CORS Origins:
   - `https://sua-url.vercel.app`
   - Marque "Allow credentials"
3. Aguarde 1 minuto

### Erro: Redirecionamento do /admin não funciona

**Solução:**
1. Verifique se as variáveis de ambiente estão na Vercel
2. Tente acessar diretamente: `https://www.sanity.io/manage`
3. Encontre seu projeto e acesse o Desk

---

## 📊 Resultado Final

### Todos os Testes Passaram? ✅

- [ ] Homepage OK
- [ ] Blog OK
- [ ] Posts individuais OK
- [ ] Admin (/admin) OK
- [ ] Edição de posts funciona
- [ ] Sem erros de segurança
- [ ] Sem erros no console

**Status Geral:** [ ] ✅ TUDO OK  |  [ ] ⚠️ PRECISA AJUSTES

---

## 🎯 URLs Importantes

Anote aqui suas URLs reais:

- **Site Produção:** _______________________________
- **Vercel Dashboard:** _______________________________
- **Sanity Studio:** _______________________________
- **GitHub Repo:** https://github.com/dinn-AI/naturerota-site-2026

---

## 📝 Notas Adicionais

```
[Anotar aqui observações, problemas encontrados, etc.]
```

---

**Data do Teste:** ___/___/______  
**Realizado por:** _________________  
**Resultado:** [ ] APROVADO  |  [ ] REPROVADO
