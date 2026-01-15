# 🚀 Deploy do Sanity Studio para a Nuvem

## 🎯 O que Você Precisa

Hospedar o Sanity Studio na nuvem do Sanity para acessar de qualquer lugar!

**URL final será:** `https://naturerota.sanity.studio` (ou similar)

---

## ✅ OPÇÃO 1: Deploy via Sanity.io Manage (MAIS FÁCIL)

### Passo 1: Acesse o Painel do Sanity

**👉 `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]`**

> **Nota:** Substitua `[SEU_PROJECT_ID]` pelo ID do seu projeto (encontrado no `.env`).

### Passo 2: Configurar o Studio

1. Faça login no Sanity.io
2. Vá até o projeto "Naturerota Blog"
3. Na barra lateral, procure por **"Studio"** ou **"Hosted Studio"**
4. Clique em **"Deploy Studio"** ou **"Set up hosted studio"**

### Passo 3: Escolher o Hostname

Escolha um nome para seu Studio:
- Sugestão: `naturerota`
- URL final: `https://naturerota.sanity.studio`

### Passo 4: Fazer Upload dos Arquivos

O Sanity vai pedir para você fazer upload dos arquivos do Studio.

**Arquivos necessários:**
- `sanity.config.ts` ✅
- `sanity.cli.ts` ✅
- Pasta `sanity/schemas/` ✅

---

## ✅ OPÇÃO 2: Deploy via CLI (Se o ambiente permitir)

### No Terminal do seu Mac (FORA do Cursor):

```bash
cd $PROJECT_DIR

# Login no Sanity
pnpm exec sanity login

# Deploy do Studio
pnpm exec sanity deploy
```

Você será perguntado:
- **Hostname:** Digite `naturerota` (ou outro nome)
- Confirmação

Aguarde o upload e pronto!

**Sua URL será:** `https://naturerota.sanity.studio`

---

## 🌐 OPÇÃO 3: Usar o Manage Studio (Já Existe!)

**Na verdade, você JÁ tem acesso ao Sanity Studio pela web!**

### Acesse Direto:

**👉 `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]/desk`**

OU

**👉 https://www.sanity.io/manage**
- Login
- Clique no seu projeto
- Clique em **"Desk"** ou **"Content"**

**Pronto! É o Studio completo funcionando!** ✨

---

## 🎨 Como Ficará seu Workflow

### 1. Criar/Editar Posts:

**👉 https://www.sanity.io/manage**
- Ou: `https://naturerota.sanity.studio` (após deploy)
- Login
- Content → Post → Create/Edit
- Publish

### 2. Ver no Site:

**👉 https://sua-url.vercel.app/blog**
- As mudanças aparecem INSTANTANEAMENTE!
- Sem deploy, sem espera!

---

## ⚡ Vantagens do Studio na Nuvem

✅ **Acesso de qualquer lugar** - Casa, trabalho, celular  
✅ **Não precisa de localhost** - Sem terminal, sem Node.js  
✅ **Sempre atualizado** - Última versão do Sanity  
✅ **Compartilhável** - Adicione outros editores facilmente  
✅ **Backup automático** - Dados sempre seguros  
✅ **Integrado com Vercel** - Updates instantâneos no site  

---

## 🔧 Configurações Importantes

### 1. CORS (Já configurado?)

Verifique se sua URL da Vercel está no CORS:

1. Acesse: `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]/api`
2. Em "CORS Origins", deve ter:
   - `https://sua-url.vercel.app`
   - `https://naturerota.sanity.studio` (após deploy)

### 2. Adicionar Editores (Opcional)

Para adicionar outras pessoas para editar:

1. Acesse: `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]/members`
2. Clique em "Invite members"
3. Digite o email da pessoa
4. Escolha a permissão (Admin, Editor, etc.)

---

## ✅ Resumo Final

**Você TEM 3 opções para usar o Studio:**

### Opção A: Via Manage (Funciona AGORA)
**👉 https://www.sanity.io/manage**
- Mais rápido
- Já funciona
- Sem configuração adicional

### Opção B: Deploy Custom (URL Personalizada)
**👉 Executar `pnpm exec sanity deploy`**
- URL personalizada (`naturerota.sanity.studio`)
- Mesmo conteúdo, interface idêntica

### Opção C: Embedded no Seu Site
- Studio integrado no seu próprio domínio
- Requer configuração avançada

---

## 🎯 Recomendação

**USE A OPÇÃO A (Manage) que já funciona!**

1. **Acesse:** https://www.sanity.io/manage
2. **Login**
3. **Clique no seu projeto**
4. **Clique em "Desk"**
5. **Crie/Edite seus posts!**

**É exatamente o mesmo Studio, só que na nuvem!** ☁️✨

---

## 📞 Precisa de Ajuda?

**Me diga:**
1. Você consegue acessar o Manage Studio?
2. Quer que eu te ajude a fazer o deploy personalizado?
3. Precisa adicionar outros editores?

---

**🚀 Comece agora: https://www.sanity.io/manage**
