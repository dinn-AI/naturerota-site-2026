# 🔧 Código Implementado - Swipe/Touch Handlers

**Arquivo:** [src/components/ui/carousel.tsx](src/components/ui/carousel.tsx)

---

## 📦 Imports (nenhum novo - usa React padrão)

```tsx
import React, { useRef, useState, useEffect } from "react";
// Todos os imports existentes continuam os mesmos
```

---

## 🎯 Refs para Touch Tracking

**Adicionar dentro do componente `Slide`:**

```tsx
const Slide = ({ index, isActive, onPreviousClick, onNextClick, slidesLength, ...props }: SlideProps) => {
  // ===== REFS PARA TOUCH TRACKING =====
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwiping = useRef(false);
  // ===================================
  
  // ... resto do código
}
```

---

## 🎌 Event Handlers

### Handler 1: Touch Start

```tsx
const handleTouchStart = (event: React.TouchEvent) => {
  if (event.touches.length === 0) return;
  
  // Captura posição inicial do toque
  touchStartXRef.current = event.touches[0].clientX;
  touchStartYRef.current = event.touches[0].clientY;
  isSwiping.current = true;
};
```

**O que faz:**
- Registra posição X inicial do primeiro dedo
- Registra posição Y inicial do primeiro dedo
- Marca que um swipe começou

**Quando dispara:** Quando toca na tela

---

### Handler 2: Touch Move

```tsx
const handleTouchMove = (event: React.TouchEvent) => {
  if (!isSwiping.current || event.touches.length === 0) return;
  
  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;
  const deltaX = currentX - touchStartXRef.current;
  const deltaY = currentY - touchStartYRef.current;
  
  // Se movimento vertical > horizontal, cancela swipe
  // Permite scroll normal da página
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    isSwiping.current = false;
    return;
  }
};
```

**O que faz:**
- Monitora movimento contínuo do dedo
- Calcula delta X e Y desde o início
- Se for mais vertical que horizontal, cancela
- Deixa scroll vertical funcionar normalmente

**Quando dispara:** Constantemente enquanto move o dedo

---

### Handler 3: Touch End

```tsx
const handleTouchEnd = (event: React.TouchEvent) => {
  if (!isSwiping.current) return;
  
  // Posição final do toque
  const endX = event.changedTouches[0]?.clientX || touchStartXRef.current;
  const deltaX = endX - touchStartXRef.current;
  
  // Threshold mínimo de movimento para ser considerado swipe
  const minSwipeDistance = 50;
  
  // Swipe para direita = slide anterior
  if (deltaX > minSwipeDistance) {
    onPreviousClick();
  }
  // Swipe para esquerda = próximo slide
  else if (deltaX < -minSwipeDistance) {
    onNextClick();
  }
  
  // Reseta estado
  isSwiping.current = false;
};
```

**O que faz:**
- Detecta fim do toque
- Calcula distância total de swipe
- Se > 50px direita: vai slide anterior
- Se > 50px esquerda: vai próximo slide
- Se < 50px: sem ação (foi clique, não swipe)

**Quando dispara:** Quando levanta o dedo da tela

---

## 🎨 Event Listeners e CSS

### Adicionar aos Event Listeners

```tsx
// Na tag do container do slide, adicionar:
onTouchStart={handleTouchStart}
onTouchMove={handleTouchMove}
onTouchEnd={handleTouchEnd}

// Exemplo completo:
<div
  className="cursor-grab active:cursor-grabbing"
  style={{ touchAction: "pan-y" }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  // ... outros props
>
  {/* conteúdo do slide */}
</div>
```

### CSS Classes

```tsx
// Cursor Feedback
className="cursor-grab active:cursor-grabbing"
```

**O que faz:**
- `cursor-grab` → Repouso (mão aberta)
- `active:cursor-grabbing` → Arrastando (mão fechada)

### Touch Action CSS

```tsx
style={{ touchAction: "pan-y" }}
```

**O que faz:**
- `pan-y` → Permite scroll vertical
- Bloqueia comportamentos padrão de swipe do iOS
- Deixa swipe horizontal funcionar com nossa lógica

---

## 🔄 Props Interface Update

### SlideProps - Antes

```tsx
interface SlideProps {
  index: number;
  isActive: boolean;
  {...}
}
```

### SlideProps - Depois

```tsx
interface SlideProps {
  index: number;
  isActive: boolean;
  onPreviousClick: () => void;      // ← Novo
  onNextClick: () => void;           // ← Novo
  slidesLength: number;              // ← Novo
  // ... resto das props
}
```

---

## 📍 Integração com Componente Carousel

### Passar Props ao Slide

```tsx
// No map() de slides do Carousel component:
slides.map((slide, index) => (
  <Slide
    key={index}
    index={index}
    isActive={currentIndex === index}
    onPreviousClick={goToPrevious}      // ← Novo
    onNextClick={goToNext}               // ← Novo
    slidesLength={slides.length}         // ← Novo
    // ... outras props
  />
))
```

---

## 🧪 Teste Rápido (Console)

```javascript
// No console do browser (F12):

// 1. Verificar se refs estão sendo inicializadas
console.log('Carousel component loaded');

// 2. Adicionar logging às funções:
// (adicionar temporariamente no código)

const handleTouchEnd = (event) => {
  const endX = event.changedTouches[0]?.clientX || touchStartXRef.current;
  const deltaX = endX - touchStartXRef.current;
  console.log('Touch delta:', deltaX);
  
  if (deltaX > 50) {
    console.log('Swipe RIGHT - previous');
    onPreviousClick();
  }
  else if (deltaX < -50) {
    console.log('Swipe LEFT - next');
    onNextClick();
  }
};

// 3. Fazer swipe no carrossel
// Ver mensagens no console
```

---

## 🚀 Exemplos de Uso

### Exemplo 1: Simples Swipe Left/Right

```tsx
<div
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{ touchAction: "pan-y" }}
>
  <img src={slide.image} alt="Slide" />
</div>
```

### Exemplo 2: Com Cursor Feedback

```tsx
<div
  className="cursor-grab active:cursor-grabbing transition-cursor"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{ touchAction: "pan-y" }}
>
  <img src={slide.image} alt="Slide" />
</div>
```

### Exemplo 3: Com Animação

```tsx
<motion.div
  className="cursor-grab active:cursor-grabbing"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
  style={{ touchAction: "pan-y" }}
  animate={{ opacity: isActive ? 1 : 0 }}
  transition={{ duration: 0.5 }}
>
  <img src={slide.image} alt="Slide" />
</motion.div>
```

---

## 📊 Fluxograma de Execução

```
┌─────────────────────────────────┐
│ Usuário toca na tela            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ handleTouchStart()              │
│ - Capture X, Y inicial          │
│ - Set isSwiping = true          │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ Usuário arrasta dedo            │
│ handleTouchMove() chamado N×    │
│ - Calcula delta X, Y            │
│ - Se vertical > horizontal:     │
│   Set isSwiping = false; return │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ Usuário levanta dedo            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ handleTouchEnd()                │
│ - Calcula delta final           │
│ - Se > 50px direita:            │
│   Call onPreviousClick()        │
│ - Se < -50px esquerda:          │
│   Call onNextClick()            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ Slide navegado! 🎉               │
└─────────────────────────────────┘
```

---

## 🔍 Debugging Tips

### Ver se handlers estão sendo chamados

```tsx
const handleTouchStart = (event: React.TouchEvent) => {
  console.log('✓ handleTouchStart called');
  // ... resto do código
};

const handleTouchMove = (event: React.TouchEvent) => {
  console.log('✓ handleTouchMove called');
  // ... resto do código
};

const handleTouchEnd = (event: React.TouchEvent) => {
  console.log('✓ handleTouchEnd called');
  // ... resto do código
};
```

### Ver valores de delta

```tsx
const handleTouchEnd = (event: React.TouchEvent) => {
  const endX = event.changedTouches[0]?.clientX || touchStartXRef.current;
  const deltaX = endX - touchStartXRef.current;
  
  console.log(`Delta X: ${deltaX}`);
  console.log(`Start X: ${touchStartXRef.current}`);
  console.log(`End X: ${endX}`);
  
  // ... resto
};
```

### Verificar se callbacks são chamados

```tsx
const handleTouchEnd = (event: React.TouchEvent) => {
  // ... calcs
  
  if (deltaX > 50) {
    console.log('>> Calling onPreviousClick');
    onPreviousClick();
  }
  else if (deltaX < -50) {
    console.log('>> Calling onNextClick');
    onNextClick();
  }
};
```

---

## ⚙️ Customizações Comuns

### Aumentar Sensibilidade

```tsx
// De 50px para 30px
const minSwipeDistance = 30;
```

### Diminuir Sensibilidade

```tsx
// De 50px para 100px
const minSwipeDistance = 100;
```

### Permitir Gestos Diagonais

```tsx
// Remover verificação de vertical:
// if (Math.abs(deltaY) > Math.abs(deltaX)) {
//   isSwiping.current = false;
//   return;
// }
```

### Adicionar Timeout para Swipe

```tsx
const swipeTimeoutRef = useRef<NodeJS.Timeout>();

const handleTouchStart = (event: React.TouchEvent) => {
  // Reset timeout anterior
  if (swipeTimeoutRef.current) {
    clearTimeout(swipeTimeoutRef.current);
  }
  
  // Criar novo timeout (2 segundos)
  swipeTimeoutRef.current = setTimeout(() => {
    isSwiping.current = false; // Cancelar se demorar muito
  }, 2000);
  
  // ... resto do código
};
```

---

## 🎯 Checklist de Implementação

- [ ] Adicionar refs (touchStartXRef, touchStartYRef, isSwiping)
- [ ] Implementar handleTouchStart
- [ ] Implementar handleTouchMove
- [ ] Implementar handleTouchEnd
- [ ] Adicionar onTouchStart event listener
- [ ] Adicionar onTouchMove event listener
- [ ] Adicionar onTouchEnd event listener
- [ ] Adicionar className "cursor-grab active:cursor-grabbing"
- [ ] Adicionar style={{ touchAction: "pan-y" }}
- [ ] Adicionar props ao SlideProps interface
- [ ] Passar callbacks do Carousel para Slide
- [ ] Testar em DevTools mobile mode
- [ ] Testar em dispositivo real
- [ ] Documentar comportamento
- [ ] Commit & deploy

---

**Desenvolvido por:** GitHub Copilot  
**Versão:** 1.0  
**Compatibilidade:** iOS 13.4+, Android 4.4+, Windows Touch  
**Fallback:** Botões de navegação continuam funcionando

---

## 📚 Referências

- React Touch Events: https://react.dev/reference/react-dom/components/common#touch-event-handler
- MDN Touch API: https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
- CSS touch-action: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action

---

**Última atualização:** 5 de Março de 2026
