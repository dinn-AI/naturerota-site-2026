# 📝 Guia das Páginas de Posts do Blog

## ✅ O que foi implementado

### 1. **Página Dinâmica de Posts** (`/src/pages/blog/[slug].astro`)

Criamos páginas individuais para cada post do blog com a seguinte estrutura:

#### 🎨 Estrutura Visual

1. **Imagem de Capa**
   - Imagem grande e impactante no topo
   - Altura responsiva: 400px (mobile) → 500px (tablet) → 600px (desktop)
   - Gradiente escuro sobreposto para melhor legibilidade do título
   - Título do post sobreposto na parte inferior da imagem

2. **Meta Informações**
   - Foto do autor (buscada do Sanity)
   - Nome do autor
   - Data de publicação formatada em português (ex: "2 de janeiro de 2026")
   - Excerpt/descrição do post (se disponível)

3. **Conteúdo do Artigo**
   - Renderização completa do conteúdo do Sanity (Portable Text)
   - Suporte para:
     - Parágrafos normais
     - Títulos H2, H3, H4
     - Listas (bullet e numbered)
     - Texto em negrito
     - Texto em itálico
     - Texto sublinhado
     - Código inline
     - Blockquotes
     - Imagens com legendas
   - Estilização consistente com o resto do site

4. **Seção "Sobre o Autor"**
   - Foto do autor
   - Nome do autor
   - Biografia (se disponível no Sanity)

5. **Posts Relacionados**
   - Título "Continue Lendo"
   - Grid com 4 posts relacionados (mais recentes, excluindo o atual)
   - Cada card mostra:
     - Imagem de capa
     - Título do post
     - Nome do autor
     - Data de publicação
   - Efeito hover com zoom na imagem
   - Botão "Ver Todos os Artigos" no final

#### 🔗 URLs e Navegação

- **Homepage** (`/`): Cards de blog levam para `/blog/[slug]`
- **Página de listagem** (`/blog`): Todos os cards levam para `/blog/[slug]`
- **Página de post** (`/blog/[slug]`): Posts relacionados levam para outros `/blog/[slug]`

Exemplos de URLs:
- `/blog/como-ganhar-dinheiro-na-estrada-a-nossa-verdade-nua-e-crua-sem-magica`
- `/blog/como-fazer-rusd-100-por-dia-na-estrada-e-nao-voltar-para-casa-guia-de-sobrevivencia`
- `/blog/5-formas-de-ganhar-dinheiro-viajando-o-que-da-certo-de-verdade`

#### 🎯 Funcionalidades Técnicas

1. **Static Site Generation (SSG)**
   - Função `getStaticPaths()` gera todas as rotas em tempo de build
   - Páginas pré-renderizadas para performance máxima
   - SEO otimizado com meta tags dinâmicas

2. **Integração com Sanity**
   - Busca de posts por slug
   - Busca de posts relacionados (4 mais recentes)
   - Processamento de imagens otimizadas via Sanity CDN
   - Suporte completo para Portable Text

3. **Imagens Otimizadas**
   - Fotos de autores: 80x80px (redondas)
   - Imagens de capa: 1920x1080px
   - Imagens de posts relacionados: 600x400px
   - Fallback para imagem padrão se não houver imagem

4. **Formatação de Datas**
   - Data completa: "2 de janeiro de 2026"
   - Data curta: "2 jan. 2026"

## 📂 Arquivos Modificados/Criados

### Criado
- `/src/pages/blog/[slug].astro` - Página dinâmica de posts

### Já existentes (links atualizados)
- `/src/pages/blog/index.astro` - Já tinha links corretos
- `/src/components/BlogHighlights.astro` - Já tinha links corretos

## 🚀 Como Usar

### Para Criar um Novo Post

1. Acesse o Sanity Studio em `http://localhost:3333/` (dev) ou `https://naturerota.sanity.studio/` (produção)
2. Clique em "Post" no menu lateral
3. Clique em "Create New"
4. Preencha:
   - **Title**: Título do post
   - **Slug**: URL amigável (ex: `meu-novo-post`)
   - **Main Image**: Imagem de capa
   - **Excerpt**: Resumo do post
   - **Body**: Conteúdo do post (Portable Text)
   - **Author**: Selecione o autor
   - **Published At**: Data de publicação
5. Clique em "Publish"
6. O post aparecerá automaticamente no site após rebuild/redeploy

### Para Visualizar um Post

1. **Desenvolvimento**: `http://localhost:4323/blog/[slug-do-post]`
2. **Produção**: `https://naturerota.vercel.app/blog/[slug-do-post]`

## 🎨 Personalização

### Cores
As cores principais são definidas em variáveis CSS:
- Verde principal: `#123A2B`
- Verde claro: `#A4D0AF`
- Fundo: `#FFF8F2`
- Texto: `text-gray-700`, `text-gray-900`

### Fontes
- **Títulos**: `font-serif` (DM Serif Display)
- **Corpo**: `font-sans` (Poppins)

### Layout
- **Container máximo**: `max-w-4xl` (896px)
- **Espaçamento**: `py-12` (3rem vertical)
- **Padding interno**: `p-8 md:p-12` (2rem → 3rem)

## 🐛 Troubleshooting

### Post não aparece no site
1. Verifique se o post está publicado no Sanity Studio
2. Verifique se o campo `slug` está preenchido
3. Faça um redeploy no Vercel ou rebuild local

### Imagem não carrega
1. Verifique se a imagem foi enviada corretamente no Sanity
2. Verifique se o campo `mainImage` está preenchido
3. Verifique as credenciais do Sanity no `.env`

### Conteúdo não renderiza corretamente
1. Verifique se o campo `body` está preenchido no Sanity
2. Verifique se o tipo do bloco é suportado (block, image, etc.)
3. Verifique o console do navegador para erros JavaScript

## 📊 Performance

- **Pré-renderização estática**: Páginas geradas em build time
- **Lazy loading**: Imagens carregadas sob demanda
- **CDN**: Imagens servidas via Sanity CDN com otimização automática
- **Caching**: Cache HTTP automático via Vercel

## 🔄 Próximos Passos Recomendados

1. **SEO Avançado**
   - Adicionar Schema.org para artigos
   - Meta tags Open Graph personalizadas
   - Twitter Cards

2. **Compartilhamento Social**
   - Botões de compartilhamento no topo/rodapé
   - Contadores de compartilhamentos

3. **Comentários**
   - Integração com sistema de comentários (Disqus, Facebook, etc.)

4. **Newsletter**
   - CTA para newsletter dentro do post
   - Pop-up de captura de email

5. **Analytics**
   - Google Analytics para tracking
   - Tempo de leitura real
   - Posts mais lidos

6. **Busca**
   - Campo de busca no blog
   - Filtros por categoria/autor

## 💡 Dicas

- Use títulos descritivos e chamativos
- Adicione imagens de alta qualidade
- Escreva excerpts envolventes (primeiro parágrafo do post)
- Use heading tags (H2, H3) para organizar o conteúdo
- Adicione CTAs ao longo do post
- Mantenha parágrafos curtos e escaneáveis
- Use listas e bullet points para facilitar a leitura

---

**Desenvolvido por**: Cursor AI Assistant  
**Data**: 2 de janeiro de 2026  
**Projeto**: Naturerota - Van Life Brasil

