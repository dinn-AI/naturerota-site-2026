# 🚀 Deploy Naturerota - Instruções

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Credenciais do Sanity CMS

---

## 🔧 Variáveis de Ambiente na Vercel

Após conectar o repositório na Vercel, adicione as seguintes variáveis de ambiente:

### **Variáveis Obrigatórias:**

```
PUBLIC_SANITY_PROJECT_ID=[SEU_PROJECT_ID]
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=[SEU_TOKEN_AQUI]
```

> **Nota:** Substitua os valores entre `[]` pelos seus dados reais.

### **Como Adicionar:**

1. Acesse seu projeto na Vercel
2. Vá em **Settings → Environment Variables**
3. Adicione cada variável acima
4. Marque para usar em: **Production**, **Preview** e **Development**

---

## 🎯 Comandos de Build

A Vercel detectará automaticamente que é um projeto Astro, mas caso precise configurar manualmente:

- **Build Command:** `pnpm build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`
- **Development Command:** `pnpm dev`

---

## 📦 Framework Preset

- **Framework:** Astro
- **Node Version:** 18.x ou superior (recomendado: 20.x)

---

## 🔐 Token do Sanity

Para obter o `SANITY_API_TOKEN`:

1. Acesse: `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/settings/api`
2. Clique em **"Add API token"**
3. Configure:
   - **Label:** `Vercel Production`
   - **Permissions:** `Viewer` ou `Editor`
4. Copie o token gerado

---

## 📝 Passo a Passo para Deploy

### **1. Commit do Código**

```bash
git add .
git commit -m "feat: configuração inicial do site Naturerota"
```

### **2. Criar Repositório Remoto**

Crie um repositório no GitHub/GitLab/Bitbucket e conecte:

```bash
git remote add origin <URL_DO_SEU_REPOSITORIO>
git branch -M main
git push -u origin main
```

### **3. Deploy na Vercel**

**Opção A - Via Interface:**
1. Acesse https://vercel.com/new
2. Importe seu repositório
3. Configure as variáveis de ambiente
4. Clique em **Deploy**

**Opção B - Via CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ✅ Checklist Pré-Deploy

- [ ] Build local funcionando (`pnpm build`)
- [ ] Arquivo `.env.example` criado
- [ ] Token do Sanity gerado
- [ ] Repositório Git criado
- [ ] Código commitado
- [ ] Repositório remoto conectado
- [ ] Variáveis de ambiente documentadas

---

## 🔄 Deploy Automático

Após o deploy inicial, qualquer push para a branch `main` irá:
- ✅ Fazer build automaticamente
- ✅ Rodar testes (se configurados)
- ✅ Fazer deploy em produção

---

## 🌐 Domínio Personalizado

Para usar seu domínio (naturerota.com.br):

1. Na Vercel, vá em **Settings → Domains**
2. Adicione `naturerota.com.br`
3. Configure os DNS conforme instruções da Vercel
4. Aguarde propagação (até 48h)

---

## 📊 Sanity Studio

Após o deploy, configure o Sanity Studio:

1. Adicione o domínio da Vercel nas CORS do Sanity:
   `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/settings/api`
2. Em **CORS Origins**, adicione:
   - `https://seu-dominio.vercel.app`
   - `https://naturerota.com.br` (se configurado)

---

## 🆘 Troubleshooting

### Erro: "Cannot read properties of undefined"
- Verifique se todas as variáveis de ambiente estão configuradas
- Certifique-se que o token do Sanity tem permissões corretas

### Build falhando
- Verifique os logs na Vercel
- Teste o build localmente: `pnpm build`
- Confirme que a versão do Node é compatível

### Conteúdo não aparece
- Verifique se há posts publicados no Sanity
- Confirme que o dataset está correto (production)
- Valide o token de API do Sanity

---

## 📞 Suporte

- **Documentação Astro:** https://docs.astro.build
- **Documentação Vercel:** https://vercel.com/docs
- **Documentação Sanity:** https://www.sanity.io/docs

---

**🎉 Bom deploy!**

