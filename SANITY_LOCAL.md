# 🎨 Sanity Studio Local - Guia Completo

## 🚀 Como Iniciar o Sanity Studio Localmente

### Opção 1: Usando o Script Automatizado (Mais Fácil)

Abra o **Terminal** e execute:

```bash
cd $PROJECT_DIR
./start-sanity.sh
```

### Opção 2: Comando Manual

```bash
cd $PROJECT_DIR
pnpm sanity dev
```

> **Nota:** Substitua `$PROJECT_DIR` pelo caminho da pasta do seu projeto.

---

## ⏳ O que Esperar

Após executar o comando, você verá:

```
🚀 Iniciando Sanity Studio...
🧹 Limpando cache do Sanity...
✅ Cache limpo!
🎨 Iniciando Sanity Studio...
📍 O Studio será aberto em: http://localhost:3333
⏳ Aguarde a compilação (pode levar alguns minutos)...
```

Então o Sanity vai compilar. Você verá várias mensagens. Ao final:

```
✔ Compiled in XXXms

┌──────────────────────────────────────────────────────┐
│                                                      │
│   Sanity Studio running on:                         │
│   http://localhost:3333                              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Acesse:** http://localhost:3333

---

## 📝 Como Usar o Sanity Studio

### 1. Criar um Novo Post

1. No menu lateral esquerdo, clique em **"Post"**
2. Clique no botão **"Create"** (ícone de +)
3. Preencha os campos:
   - **Title**: Título do artigo
   - **Slug**: URL amigável (ex: "meu-primeiro-post")
   - **Main Image**: Clique para fazer upload da imagem
   - **Excerpt**: Resumo curto (150-200 caracteres)
   - **Body**: Conteúdo completo do artigo (editor rico)
   - **Author**: Selecione "Renan Cavalheiro" ou "Millena Santana"
   - **Published at**: Data de publicação
4. Clique em **"Publish"** (canto superior direito)

### 2. Editar Post Existente

1. No menu lateral, clique em **"Post"**
2. Clique no post que deseja editar
3. Faça as alterações
4. Clique em **"Publish"**

### 3. Criar/Editar Autores

1. No menu lateral, clique em **"Author"**
2. Para criar: clique em **"Create"**
3. Para editar: clique no autor existente
4. Preencha:
   - **Name**: Nome completo
   - **Slug**: URL amigável
   - **Image**: Foto do autor
   - **Bio**: Biografia curta
5. Clique em **"Publish"**

---

## 🔄 Como as Mudanças Aparecem no Site

1. Você faz uma mudança no Sanity Studio
2. Clica em **"Publish"**
3. Vai para o site: http://localhost:4322
4. Faz **hard refresh**:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`
5. Pronto! As mudanças aparecem!

---

## ⚠️ Problemas Comuns

### "Não consigo acessar localhost:3333"

**Solução:**
1. Verifique se o comando `pnpm sanity dev` ainda está rodando
2. Se não estiver, execute novamente
3. Aguarde a mensagem "Sanity Studio running on..."

### "Timeout / Connection Error"

**Solução:**
1. Feche o terminal
2. Abra um novo terminal
3. Execute: `cd $PROJECT_DIR`
4. Execute: `pnpm sanity dev`

### "Não vejo meus posts no site"

**Solução:**
1. Certifique-se de clicar em **"Publish"** (não apenas salvar)
2. Faça hard refresh no navegador (`Cmd + Shift + R`)
3. Aguarde alguns segundos

---

## 📊 Status dos Servidores

Você precisa de **2 terminais abertos**:

### Terminal 1: Site Astro
```bash
cd $PROJECT_DIR
pnpm run dev
```
**URL:** http://localhost:4322

### Terminal 2: Sanity Studio
```bash
cd $PROJECT_DIR
pnpm sanity dev
```
**URL:** http://localhost:3333

---

## ✅ Tarefa Pendente

**POST SEM AUTOR:**

Você tem 1 post que precisa ter o autor associado:

📝 **"Vanlife, Carro ou Moto: Qual é o Melhor para Começar Gastando Menos?"**

**Para corrigir:**
1. Abra esse post no Sanity Studio
2. Campo **"Author"** → Selecione **"Renan Cavalheiro"**
3. Clique em **"Publish"**
4. Refresh no site e TODOS os cards terão foto! ✅

---

## 🆘 Ajuda Adicional

Se nada funcionar, me envie:
1. Captura de tela do terminal
2. Mensagem de erro completa
3. URL que você está tentando acessar

---

**🚀 Comece agora executando: `./start-sanity.sh`**
