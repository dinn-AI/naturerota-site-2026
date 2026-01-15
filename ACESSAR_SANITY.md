# 🎨 Como Acessar o Sanity Studio Após o Deploy

## ✅ Opções para Acessar o Studio em Produção

Após o deploy do seu site na Vercel, você terá **3 formas de acessar o Sanity Studio** para editar posts:

---

## 🌐 **Opção 1: Via URL do Seu Site (RECOMENDADO)**

Depois do deploy na Vercel, você pode acessar o admin do blog através do seu próprio domínio:

```
https://www.naturerota.com.br/admin
```

ou

```
https://naturerota.vercel.app/admin
```

👉 **Esta página vai redirecionar automaticamente para o Sanity Studio.**

---

## 🔗 **Opção 2: Diretamente no Sanity.io**

Você pode acessar o Studio diretamente no site da Sanity:

```
https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/desk
```

👉 **Salve este link nos seus favoritos!**

> **Nota:** Substitua `[SEU_PROJECT_ID]` pelo ID do seu projeto Sanity (encontrado no arquivo `.env` como `PUBLIC_SANITY_PROJECT_ID`).

---

## 💻 **Opção 3: Localmente (Desenvolvimento)**

Para editar posts no seu computador:

```bash
cd $PROJECT_DIR
pnpm sanity dev
```

Depois, abra:

```
http://localhost:3333
```

> **Nota:** Substitua `$PROJECT_DIR` pelo caminho da pasta do seu projeto.

---

## 📝 **Como Editar Posts**

1. **Acesse o Studio** (qualquer uma das opções acima)
2. **Faça login com sua conta Sanity**
3. **Clique em "Post"** na barra lateral
4. **Edite um post existente** ou **clique em "Create"** para criar novo
5. **Preencha os campos:**
   - Título
   - Slug (URL do post)
   - Imagem Principal
   - Excerpt (resumo)
   - Conteúdo (corpo do post)
   - Data de Publicação
   - Autor
6. **Clique em "Publish"**

---

## 🔄 **Como as Mudanças Aparecem no Site**

### **Mudanças Imediatas (CDN Cache)**

O site usa o CDN do Sanity, que atualiza automaticamente em **alguns minutos**. 

### **Forçar Atualização Imediata (Opcional)**

Se você quiser que as mudanças apareçam instantaneamente, faça um **redeploy na Vercel**:

1. Acesse: https://vercel.com/seu-usuario/naturerota-site-2026/deployments
2. Clique em **"Redeploy"** no último deploy
3. Aguarde ~2 minutos

---

## 🚨 **Problemas Comuns**

### 1. **"Insufficient permissions"**

- Faça logout no Sanity e faça login novamente
- Verifique se você está usando a conta correta (a mesma que criou o projeto)

### 2. **"Post não aparece no site"**

- Verifique se o post está **Publicado** (não como rascunho)
- Verifique se a **Data de Publicação** não está no futuro
- Aguarde 2-3 minutos para o cache atualizar

### 3. **"Erro ao carregar imagens"**

- Certifique-se de que as imagens foram enviadas através do Studio
- Verifique se o CORS está configurado (veja abaixo)

---

## 🔐 **Configurar CORS (Importante)**

Após o deploy, configure o CORS no Sanity:

1. Acesse: `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/settings/api`
2. Role até **"CORS Origins"**
3. Clique em **"Add CORS Origin"**
4. Adicione:
   - `https://www.naturerota.com.br`
   - `https://naturerota.vercel.app`
   - `http://localhost:4321` (para dev local)
5. Marque **"Allow credentials"**
6. Clique em **"Save"**

---

## 📚 **Links Úteis**

- **Sanity Studio:** `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/desk`
- **Configurações do Projeto:** `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/settings`
- **Site ao Vivo (depois do deploy):** https://www.naturerota.com.br
- **Vercel Dashboard:** https://vercel.com

---

## ✅ **Próximos Passos**

1. ✅ Acessar o Studio via `https://www.naturerota.com.br/admin` (após deploy)
2. ✅ Criar/editar posts
3. ✅ Configurar CORS no Sanity
4. ✅ Fazer um redeploy na Vercel para forçar atualização

---

**🎉 Pronto! Agora você pode gerenciar seu blog de qualquer lugar, sem precisar do Cursor ou ambiente local!**
