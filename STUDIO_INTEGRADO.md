# 🎨 Sanity Studio Integrado no Site

## ✅ CONFIGURAÇÃO CONCLUÍDA!

O Sanity Studio agora está integrado ao seu site!

---

## 🌐 Como Acessar

### Local (Desenvolvimento):
**👉 http://localhost:4322/admin/studio**

### Produção (Após Deploy):
**👉 https://sua-url.vercel.app/admin/studio**

---

## 📝 Como Usar

1. **Acesse:** http://localhost:4322/admin/studio
2. **Faça login** no Sanity (se pedido)
3. **Você verá o Sanity Studio completo!**
4. **Criar/Editar Posts:**
   - Menu lateral → "Post"
   - Clique em "+ Create" para novo
   - Clique em um post existente para editar
5. **Publicar:** Sempre clique em "Publish" ao finalizar

---

## ✅ Vantagens

✅ **Integrado no seu site** - Não precisa de URL separada  
✅ **Funciona local e produção** - Mesmo ambiente  
✅ **Sem CLI** - Não depende de comandos que dão timeout  
✅ **Mesmo código** - Usa o mesmo sanity.config.ts  
✅ **Deploy automático** - Vai junto com o site para Vercel  

---

## 🚀 Próximos Passos

1. **Teste Local:**
   - Acesse: http://localhost:4322/admin/studio
   - Corrija o post sem autor
   - Crie um post de teste

2. **Deploy para Produção:**
   ```bash
   git add .
   git commit -m "feat: Adiciona Sanity Studio integrado"
   git push
   ```

3. **Acesse na Produção:**
   - https://sua-url.vercel.app/admin/studio
   - Mesma interface, mesmos dados!

---

## 🔧 Configurações Importantes

### CORS do Sanity

Adicione sua URL na lista de CORS do Sanity:

1. Acesse: `https://www.sanity.io/manage/personal/project/[SEU_PROJECT_ID]/api`
2. Em "CORS Origins", adicione:
   - `http://localhost:4322` (local)
   - `https://sua-url.vercel.app` (produção)
   - Marque: "Allow credentials"

---

## ❗ Tarefa Pendente

**Corrija o post sem autor:**

1. Acesse: http://localhost:4322/admin/studio
2. Menu lateral → "Post"
3. Encontre: "Vanlife, Carro ou Moto..."
4. Campo "Author" → Selecione "Renan Cavalheiro"
5. Clique em "Publish"
6. Vá em http://localhost:4322/blog
7. Hard refresh (Cmd+Shift+R)
8. ✅ Todos os cards terão foto!

---

## 🎉 Pronto!

Seu Studio está configurado e pronto para usar!

**Acesse agora: http://localhost:4322/admin/studio**
