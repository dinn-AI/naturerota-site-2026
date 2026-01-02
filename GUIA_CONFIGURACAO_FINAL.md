# 🎯 Guia de Configuração Final - Naturerota

## ✅ Status Atual (2 de Janeiro, 2026)

- ✅ Site desenvolvido e funcionando
- ✅ Deploy na Vercel: https://naturerota.vercel.app/
- ✅ Código no GitHub: https://github.com/dinn-AI/naturerota-site-2026
- ✅ Sanity CMS configurado (Project ID: 12wgha1o)
- ✅ Domínio registrado: naturerota.com.br
- ⏳ **Aguardando 2h para configurar DNS no Registro.br**

---

## 📋 Próximos Passos (Após 2 horas)

### **Passo 1: Configurar DNS no Registro.br**

**Horário para executar:** Após ~18:00 (2h após registro)

1. Acesse: https://registro.br/
2. Faça login e selecione: **naturerota.com.br**
3. Vá em **"Servidores DNS"**
4. Escolha **"Usar outros servidores DNS"**
5. Adicione:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Salve as alterações

**Tempo de propagação:** 30 minutos a 2 horas

---

### **Passo 2: Verificar Propagação do DNS**

Execute no terminal:

```bash
cd ~/Documents/Naturerota_site_2026
./check-dns.sh
```

Ou teste online:
- https://dnschecker.org/#A/naturerota.com.br

**Quando ver:** `76.76.21.21` ou nameservers da Vercel = ✅ Propagado!

---

### **Passo 3: Configurar CORS no Sanity**

**Quando:** Após DNS propagar

1. Acesse: https://www.sanity.io/manage/project/12wgha1o/settings/api
2. Vá em **"CORS Origins"**
3. Clique em **"Add CORS origin"**
4. Adicione os domínios:

**Origem 1:**
```
https://naturerota.com.br
```
- [x] Allow credentials

**Origem 2:**
```
https://www.naturerota.com.br
```
- [x] Allow credentials

**Origem 3 (manter também):**
```
https://naturerota.vercel.app
```
- [x] Allow credentials

5. Salve

---

### **Passo 4: Deploy do Sanity Studio**

**Duas opções:**

#### **Opção A - Via Painel Sanity.io (Mais Fácil):**

1. Acesse: https://www.sanity.io/manage/project/12wgha1o
2. No menu lateral, clique em **"Studios"**
3. Clique em **"Deploy Studio"**
4. Escolha hostname: `naturerota` ou `naturerota-studio`
5. Aguarde o deploy (2-3 minutos)
6. Acesse: `https://naturerota.sanity.studio` ou o hostname escolhido

#### **Opção B - Via CLI Local (Avançado):**

Só use se a Opção A não funcionar:

```bash
cd ~/Documents/Naturerota_site_2026

# Fazer deploy do Studio
SANITY_AUTH_TOKEN=skvEsE1mT84ixh2mbhLsPsmGNbi1LOuMyArsup0wtBMJIZSYmCynSbyyOolAFRQUf4MmgwP9egDUzrpUXyxQqNGFKVBvhWakZH4L23iZtvYVrGlLcmYJxAvYEVOyYPY6H9ZGe5C4zQbnYwwp2Cva2rgLI5eWeYGXYkbj8cdUoYXnvEI4hGmh npx sanity@latest deploy --yes
```

---

### **Passo 5: Criar Primeiro Post de Teste**

1. Acesse o Sanity Studio hospedado
2. Faça login com sua conta Google
3. Clique em **"Post"** → **"Create"**
4. Preencha:
   - **Título:** "Bem-vindos ao Naturerota!"
   - **Slug:** Clique em "Generate" → `bem-vindos-ao-naturerota`
   - **Imagem Principal:** Upload de uma foto da viagem
   - **Alt Text:** Descrição da imagem
   - **Conteúdo:** Escreva o conteúdo do post
   - **Data de Publicação:** Deixe a data atual
5. Clique em **"Publish"**

---

### **Passo 6: Verificar o Post no Site**

1. Acesse: https://naturerota.com.br/
2. Role até a seção **"Últimos assuntos"**
3. Seu post deve aparecer automaticamente! 🎉

Se não aparecer:
- Aguarde 30 segundos (cache do CDN)
- Force refresh: `Cmd+Shift+R` (Mac) ou `Ctrl+F5` (Windows)

---

## 🔐 Credenciais e Tokens

### **Sanity CMS:**
- **Project ID:** `12wgha1o`
- **Dataset:** `production`
- **API Token:** `skvEsE1mT84ixh2mbhLsPsmGNbi1LOuMyArsup0wtBMJIZSYmCynSbyyOolAFRQUf4MmgwP9egDUzrpUXyxQqNGFKVBvhWakZH4L23iZtvYVrGlLcmYJxAvYEVOyYPY6H9ZGe5C4zQbnYwwp2Cva2rgLI5eWeYGXYkbj8cdUoYXnvEI4hGmh`

### **GitHub:**
- **Repositório:** https://github.com/dinn-AI/naturerota-site-2026
- **Token:** `[Configurado]`

### **Vercel:**
- **Projeto:** https://vercel.com/dinn-ai/naturerota-site-2026
- **URL Produção:** https://naturerota.vercel.app/ (depois: naturerota.com.br)

---

## 📱 Links Úteis

### **Gerenciamento:**
- Painel Registro.br: https://registro.br/
- Painel Vercel: https://vercel.com/dashboard
- Painel Sanity: https://www.sanity.io/manage/project/12wgha1o

### **Documentação:**
- Sanity Schemas: https://www.sanity.io/docs/schema-types
- Astro Docs: https://docs.astro.build
- Vercel Docs: https://vercel.com/docs

---

## 🔄 Fluxo de Trabalho Após Configuração

```
1. Criar/Editar Post no Sanity Studio
   ↓
2. Publicar (botão "Publish")
   ↓
3. Aguardar 10-30 segundos
   ↓
4. Post aparece automaticamente no site
   ↓
5. Compartilhar nas redes sociais! 🎉
```

---

## 🆘 Troubleshooting

### **DNS não propaga:**
- Aguarde até 24h (raramente necessário)
- Verifique se removeu redirecionamentos antigos
- Use: https://dnschecker.org/

### **Post não aparece no site:**
- Verifique se clicou em "Publish" no Sanity
- Confirme CORS configurado
- Limpe cache do navegador
- Verifique data de publicação (não pode ser futura)

### **Erro de CORS:**
- Adicione o domínio em: https://www.sanity.io/manage/project/12wgha1o/settings/api
- Marque "Allow credentials"
- Aguarde 1 minuto para propagar

### **Sanity Studio não carrega:**
- Limpe cache do navegador
- Tente modo anônimo
- Verifique se fez login

---

## ✨ Funcionalidades do Site

### **Páginas:**
- `/` - Home com todas as seções
- `/blog` - Listagem de posts
- `/politica-de-privacidade` - Política de privacidade
- `/termos-de-uso` - Termos de uso

### **Seções:**
- Hero com parallax
- Quem Somos
- Galeria de fotos
- Produtos/E-books
- Blog (3 últimos posts)
- Playlists do YouTube
- Newsletter

### **CMS (Sanity):**
- Posts de blog
- Autores
- Imagens otimizadas
- Rich text editor
- Campos customizados (YouTube, CTAs, etc.)

---

## 📊 Métricas e Performance

### **Lighthouse Score (esperado):**
- ⚡ Performance: 90+
- ♿ Acessibilidade: 95+
- 🔍 SEO: 100
- ✅ Best Practices: 100

### **Tecnologias:**
- **Frontend:** Astro 5 + React 19
- **Styling:** TailwindCSS 4
- **CMS:** Sanity.io
- **Hosting:** Vercel
- **Git:** GitHub

---

## 🎯 Checklist Final

- [ ] DNS configurado no Registro.br (após 2h)
- [ ] DNS propagado (verificar)
- [ ] CORS configurado no Sanity
- [ ] Sanity Studio deployed
- [ ] Primeiro post criado
- [ ] Post aparece no site
- [ ] Certificado SSL ativo (automático)
- [ ] Domínio funcionando
- [ ] Tudo testado e funcionando! 🎉

---

**Data de Criação:** 2 de Janeiro de 2026  
**Última Atualização:** 2 de Janeiro de 2026  
**Status:** Aguardando período de carência do Registro.br (2h)

