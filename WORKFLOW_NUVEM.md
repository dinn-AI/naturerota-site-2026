# ☁️ Workflow Completo na Nuvem - Sem Localhost

## 🎯 Seu Fluxo de Trabalho

### 1️⃣ Editar Conteúdo no Sanity (Web)
### 2️⃣ Deploy Automático na Vercel
### 3️⃣ Ver o Site no Ar!

---

## 📝 Passo 1: Criar/Editar Posts no Sanity

### Acesse o Sanity Studio Web:

**URL:** https://www.sanity.io/manage

### Como Usar:

1. **Faça Login** (Google/GitHub/Email)
2. **Selecione o Projeto:** Seu projeto
3. **Clique em "Desk" ou "Content"**
4. **Para Criar Post:**
   - Clique em "Post" → "+ Create"
   - Preencha os campos
   - **IMPORTANTE:** Clique em **"Publish"** (não apenas salvar)
5. **Para Editar Post:**
   - Clique no post existente
   - Faça as mudanças
   - Clique em **"Publish"**

---

## 🚀 Passo 2: Deploy na Vercel

O seu site está hospedado na Vercel. Você tem 2 opções:

### Opção A: Deploy Automático (Recomendado)

**Toda vez que você fizer commit no GitHub, a Vercel faz deploy automaticamente!**

Para fazer commit das suas mudanças:

```bash
cd $PROJECT_DIR
git add .
git commit -m "Atualização de conteúdo"
git push origin main
```

Aguarde 2-3 minutos e o site estará atualizado!

### Opção B: Trigger Manual na Vercel

1. Acesse: https://vercel.com/
2. Entre no projeto "naturerota-site-2026"
3. Clique em "Deployments"
4. Clique em "Redeploy" no último deploy

---

## 🌐 Passo 3: Acessar o Site no Ar

### URL de Produção:

**Seu site está em:** (uma dessas opções)
- https://naturerota-site-2026.vercel.app
- https://naturerota.vercel.app
- https://naturerota.com.br (se configurou domínio)

**Para descobrir qual é:**
1. Acesse https://vercel.com/
2. Entre no projeto
3. Veja a URL na página principal

---

## ⚡ Como as Mudanças Aparecem no Site

### Para Mudanças no Sanity (Posts/Conteúdo):

1. Você edita/cria post no Sanity
2. Clica em **"Publish"**
3. **As mudanças aparecem INSTANTANEAMENTE no site!** ✨
   - Não precisa fazer deploy
   - Não precisa commit
   - É automático!

### Para Mudanças no Código (Design/Estrutura):

1. Edite os arquivos no seu computador
2. Faça commit:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push
   ```
3. Vercel faz deploy automático (2-3 min)

---

## 🔧 Configuração Necessária

### 1. Variáveis de Ambiente na Vercel

**Importante:** As variáveis de ambiente precisam estar na Vercel!

Acesse: https://vercel.com/ → Seu Projeto → Settings → Environment Variables

**Adicione estas variáveis:**

```
PUBLIC_SANITY_PROJECT_ID = [SEU_PROJECT_ID]
PUBLIC_SANITY_DATASET = production
PUBLIC_SANITY_API_VERSION = 2024-01-01
SANITY_API_TOKEN = [SEU_TOKEN_AQUI]
```

> **Nota:** Encontre seus valores no arquivo `.env` local.

### 2. CORS do Sanity

**Configure o CORS para permitir seu domínio:**

1. Acesse: `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]/api`
2. Em "CORS Origins", adicione:
   - `https://sua-url-vercel.vercel.app`
   - `https://naturerota.com.br` (se tiver)
   - `http://localhost:4322` (para testes locais)

---

## ✅ Workflow Completo (Exemplo Prático)

### Cenário: Criar um novo post de blog

1. **No Sanity Web** (https://www.sanity.io/manage):
   - Criar novo post
   - Upload da imagem
   - Escrever conteúdo
   - Selecionar autor
   - Clicar em **"Publish"**

2. **Resultado:**
   - Post aparece INSTANTANEAMENTE no site de produção! ✨
   - Nenhuma ação adicional necessária!

3. **Visualizar:**
   - Acessar: `https://sua-url-vercel.vercel.app/blog`
   - Ver o novo post!

---

## 🆘 Troubleshooting

### "Publiquei no Sanity mas não aparece no site"

**Soluções:**
1. Certifique-se de clicar em **"Publish"** (não apenas salvar)
2. Faça hard refresh no navegador: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
3. Aguarde 10-30 segundos (cache do CDN)
4. Verifique se as variáveis de ambiente estão na Vercel

### "Não consigo acessar o Sanity Studio"

**Soluções:**
1. Certifique-se de estar logado no Sanity.io
2. Use a conta que criou o projeto
3. Tente fazer logout e login novamente

### "Mudanças no código não aparecem"

**Soluções:**
1. Verifique se fez `git push`
2. Acesse a Vercel e veja se o deploy foi feito
3. Veja os logs do deploy para erros

---

## 📊 Resumo das URLs

### Gerenciamento de Conteúdo:
- **Sanity Studio:** https://www.sanity.io/manage
- **Projeto Sanity:** `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]`

### Hospedagem:
- **Dashboard Vercel:** https://vercel.com/
- **GitHub Repo:** https://github.com/dinn-AI/naturerota-site-2026

### Site em Produção:
- **URL Vercel:** [Verificar na Vercel]
- **Domínio Personalizado:** (se configurado)

---

## 🎉 Vantagens do Workflow na Nuvem

✅ **Sem localhost** - Trabalhe de qualquer lugar  
✅ **Sem Node.js** - Tudo no navegador  
✅ **Updates instantâneos** - Posts aparecem na hora  
✅ **Deploy automático** - Commit → Deploy → No ar!  
✅ **Colaboração fácil** - Múltiplas pessoas podem editar  
✅ **Sempre disponível** - Não depende do seu computador  

---

**🚀 Comece agora: https://www.sanity.io/manage**
