# ✅ Checklist de Verificação - Swipe/Touch Gestures

## 📋 Pre-Flight Checks

- [ ] Servidor dev rodando: `pnpm run dev`
- [ ] Sem erros de compilação TypeScript
- [ ] Console do navegador sem erros (F12)
- [ ] Página carregou completamente (~2-3 segundos)
- [ ] Carrosséis visíveis na página

---

## 🎮 Teste 1: Desktop (DevTools Modo Mobile)

### Preparação
1. Abrir http://localhost:4321/
2. Pressionar `F12` (DevTools)
3. Pressionar `Ctrl+Shift+M` (mobile mode)
4. Selecionar "iPhone 12" no dropdown

### Teste de Swipe

| Ação | Esperado | Status |
|------|----------|--------|
| Arrastar para **esquerda** | Próximo slide | ⬜ |
| Arrastar para **direita** | Slide anterior | ⬜ |
| Arrastar **verticalmente** | Sem efeito (page scrolls) | ⬜ |
| Arrastar **<50px** | Sem voltar | ⬜ |
| Rápido vs Lento | Ambos funcionam igual | ⬜ |

**Como Marcar:**
- ✅ = Funcionou
- ❌ = Não funcionou
- ⚠️ = Comportamento estranho

---

## 📱 Teste 2: Dispositivo Real (Opcional)

### Preparação
1. Descobrir IP do Mac: `ifconfig | grep inet`
2. No celular, acessar: `http://<IP>:4321/`
3. Esperar carregar

### Checklist
- [ ] Página acessível via WiFi
- [ ] Carrosséis carregam
- [ ] Swipe esquerda funciona
- [ ] Swipe direita funciona
- [ ] Sem lag/travamentos

---

## 🔍 Teste 3: Comportamento Esperado Detalhado

### Swipe para Esquerda (Próximo Slide)
```
Antes:  [Slide 1] [Slide 2] [Slide 3]
                   ↑

Ação:   Arrastar dedo para ESQUERDA →

Depois: [Slide 2] [Slide 3] [Slide 4]
                   ↑
```
- [ ] Transição suave
- [ ] Novo slide aparece da direita
- [ ] Borda do slide não aparece abruptamente

### Swipe para Direita (Slide Anterior)
```
Antes:  [Slide 2] [Slide 3] [Slide 4]
                   ↑

Ação:   Arrastar dedo para DIREITA ←

Depois: [Slide 1] [Slide 2] [Slide 3]
                   ↑
```
- [ ] Transição suave
- [ ] Slide anterior aparece da esquerda
- [ ] Continuidade visual

### Gestos Inválidos
```
Ação: Arrastar VERTICALMENTE para:
      - Cima   → Page scrolls (não carrossel)
      - Baixo  → Page scrolls (não carrossel)

Esperado: Carrossel não se mexe, página faz scroll
```
- [ ] Swipe vertical não navega carrossel
- [ ] Página faz scroll normalmente

---

## 🎨 Verificação Visual

### Cursor Feedback
- [ ] Em repouso: cursor muda para `grab` (mãozinha aberta)
- [ ] Ao arrastar: cursor muda para `grabbing` (mão fechada)

### Animação
- [ ] Slide desliza suavemente (não "pula")
- [ ] Transição levou ~200-500ms
- [ ] Sem distorção visual do slide

---

## 🐛 Teste de Bugs Conhecidos

| Cenário | Comportamento Esperado | Status |
|---------|------------------------|--------|
| Arrastar + liberar no meio | Slide volta se < 50px | ⬜ |
| Dois dedos simultâneos | Ignorado (toca primeiro) | ⬜ |
| Swipe + scroll rápido | Um ganha (geralmente scroll) | ⬜ |
| Toque (sem movimento) | Sem efeito | ⬜ |
| Rápida sequência de swipes | Todos registram | ⬜ |

---

## 📊 Performance Check

### No DevTools Performance Tab
1. Abrir DevTools → Performance
2. Gravar (red circle)
3. Fazer 3-4 swipes rápidos
4. Parar gravação

**Métricas desejadas:**
- [ ] FPS consistente (≥30fps em mobile)
- [ ] Sem "jank" (pausas visíveis)
- [ ] CPU usage razoável (<30%)
- [ ] Memory estável (sem crescimento contínuo)

---

## 🔧 Debugging (se necessário)

### Ver eventos de touch no console
```javascript
// No console do DevTools:
document.addEventListener('touchstart', (e) => console.log('touchstart', e.touches[0]));
document.addEventListener('touchend', (e) => console.log('touchend', e.changedTouches[0]));
```

### Verificar refs
```javascript
// Se houver um swipe, checar no console:
console.log('Touch Delta X:', endX - startX);
```

---

## 📝 Relatório Final

Após completar todos os testes:

```markdown
## Resumo de Testes - Swipe/Touch

**Data:** [insira data]
**Tester:** [seu nome]
**Dispositivo:** [Desktop/iPhone/Android]

### Resultados
- Desktop DevTools: [✅/❌]
- Dispositivo Real: [✅/❌/⏭️]
- Performance: [✅/❌]

### Problemas Encontrados
- [nenhum / list]

### Notas
[adicional comments]
```

---

## ✅ Conclusão

Quando todos os testes passarem:

```bash
# Feature está pronta para produção
pnpm run build

# Deploy
vercel --prod
```

---

**Desenvolvido por:** GitHub Copilot  
**Versão:** 1.0  
**Data:** 5 de Março de 2026
