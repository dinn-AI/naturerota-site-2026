# 📝 Guia: Como Adicionar Posts ao Blog

## 🎯 Acesse o Sanity Studio

1. Abra no navegador: **http://localhost:3333/**
2. Faça login com sua conta Google (se solicitado)

## ✍️ Criar um Novo Post

### Passo 1: Criar o Post
1. No Sanity Studio, clique em **"Post"** no menu lateral
2. Clique no botão **"+ Create"** (canto superior direito)

### Passo 2: Preencher os Campos Obrigatórios

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| **Título** | Título do post (obrigatório) | "10 Dicas para Viajar pela Patagônia" |
| **Slug** | URL amigável (clique em "Generate") | `10-dicas-para-viajar-pela-patagonia` |
| **Imagem Principal** | Upload da imagem de capa (recomendado 1200x800px) | Escolha uma imagem de boa qualidade |
| **Alt Text** | Texto alternativo da imagem (obrigatório para acessibilidade) | "Vista panorâmica da Patagônia" |

### Passo 3: Campos Opcionais

- **Resumo/Descrição (SEO)**: Máximo 160 caracteres, usado para meta description
- **Conteúdo**: Use o editor rico para criar o conteúdo do post
- **URL do YouTube**: Cole o link completo de um vídeo relacionado
- **Data de Publicação**: Define quando o post aparece (padrão: data/hora atual)
- **Autor**: Selecione ou crie um autor

### Passo 4: Publicar

1. Clique no botão **"Publish"** (canto superior direito)
2. Aguarde a confirmação de publicação

## 🔄 Atualização Automática

- A página inicial mostra automaticamente os **3 posts mais recentes**
- Os posts são ordenados por data de publicação (mais novos primeiro)
- A atualização é instantânea após publicar no Sanity

## 📋 Dica Importante

**Você precisa criar pelo menos 3 posts para a seção de blog aparecer completa na página inicial!**

Se tiver menos de 3 posts, uma mensagem aparecerá indicando que você precisa criar mais conteúdo.

## 🎨 Recomendações de Imagens

Para melhor resultado visual:
- **Tamanho recomendado**: 1200x800px (proporção 3:2)
- **Formato**: JPEG ou PNG
- **Peso máximo**: 2MB por imagem
- **Tema**: Imagens de alta qualidade relacionadas ao conteúdo

## 🔗 URLs Geradas

Após publicar um post com slug `exemplo-post`, ele estará disponível em:
- **URL do post**: `http://localhost:4321/blog/exemplo-post`
- **Lista de posts**: `http://localhost:4321/blog`

## 🚀 Comandos Úteis

```bash
# Iniciar Sanity Studio (porta 3333)
pnpm sanity

# Iniciar site Astro (porta 4321)
pnpm dev

# Fazer deploy do Sanity Studio (hospedar online)
pnpm sanity:deploy
```

## 🆘 Problemas Comuns

### Posts não aparecem na página inicial
- Verifique se você publicou os posts (botão "Publish")
- Certifique-se de ter preenchido: título, slug e imagem principal
- Verifique se a data de publicação não está no futuro

### Imagem não carrega
- Certifique-se de ter preenchido o campo "Alt Text" da imagem
- Aguarde alguns segundos após o upload para o Sanity processar

### Erro 404 ao clicar no post
- Verifique se você criou páginas dinâmicas para posts individuais
- O slug deve estar preenchido corretamente

---

**🎉 Pronto! Agora você pode gerenciar todo o conteúdo do blog através do Sanity Studio!**

