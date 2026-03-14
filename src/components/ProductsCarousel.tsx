"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

interface ProductCard {
  id: string;
  image: string;
  alt: string;
  href?: string;
}

interface ProductsCarouselProps {
  products: ProductCard[];
}

export default function ProductsCarousel({ products }: ProductsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Calcular largura do card baseado no viewport
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined" || !carouselRef.current) return 0;
    const isMobile = window.innerWidth <= 768;
    const viewportWidth = window.innerWidth;
    const padding = isMobile ? 32 : 64; // px-4 (16px) ou px-8 (32px) em cada lado
    
    if (isMobile) {
      // Mobile: card ocupa ~85% da largura disponível
      const availableWidth = viewportWidth - padding;
      return availableWidth * 0.85;
    } else {
      // Desktop: 3 cards completos + ~30% do 4º card visível
      const gap = 40;
      const availableWidth = viewportWidth - padding;
      return (availableWidth - gap * 2) / 3.3;
    }
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return;
    
    const cardWidth = getCardWidth();
    const gap = 40;
    const scrollPosition = index * (cardWidth + gap);
    
    carouselRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  }, [getCardWidth]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < products.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, products.length, scrollToIndex]);

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Se o clique foi em um card com href, não iniciar drag
    const target = e.target as HTMLElement;
    const cardElement = target.closest('[data-product-card]');
    if (cardElement && cardElement.getAttribute('data-href')) {
      return; // Deixa o click do card ser processado normalmente
    }

    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setHasDragged(false);
    dragStartRef.current = { x: e.pageX, y: e.pageY, time: Date.now() };
    carouselRef.current.style.cursor = "grabbing";
    carouselRef.current.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Velocidade do drag
    carouselRef.current.scrollLeft = scrollLeft - walk;
    
    // Detectar se houve drag significativo (aumentado o threshold)
    if (Math.abs(walk) > 10) {
      setHasDragged(true);
    }
  }, [isDragging, startX, scrollLeft]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!carouselRef.current) return;
    const wasDragging = hasDragged;
    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.releasePointerCapture(e.pointerId);
    
    // Snap para o card mais próximo apenas se houve drag significativo
    if (wasDragging) {
      const cardWidth = getCardWidth();
      const gap = 40;
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      const clampedIndex = Math.max(0, Math.min(newIndex, products.length - 1));
      
      // Usar scroll-snap nativo se disponível, senão usar scrollToIndex
      if (typeof window !== "undefined" && "scrollBehavior" in document.documentElement.style) {
        scrollToIndex(clampedIndex);
      } else {
        const targetScroll = clampedIndex * (cardWidth + gap);
        carouselRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
        setCurrentIndex(clampedIndex);
      }
    }
    
    dragStartRef.current = null;
    // Reset hasDragged imediatamente para permitir clicks
    setHasDragged(false);
  }, [hasDragged, getCardWidth, scrollToIndex, products.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Atualizar índice baseado no scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = getCardWidth();
      const gap = 40;
      const scrollPosition = carousel.scrollLeft;
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      setCurrentIndex(Math.max(0, Math.min(newIndex, products.length - 1)));
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [getCardWidth, products.length]);

  // Verificar prefers-reduced-motion
  const prefersReducedMotion = typeof window !== "undefined" && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  return (
    <div className="w-full">
      {/* Carrossel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-10 px-4 md:px-8 pb-8"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
          scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
          WebkitOverflowScrolling: "touch",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="region"
        aria-label="Carrossel de produtos"
        tabIndex={0}
      >
        {products.map((product, index) => {
          const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
          return (
            <div
              key={product.id}
              className="flex-shrink-0 snap-center"
              style={{
                width: isMobile ? "85%" : "calc((100vw - 160px) / 3.3)",
                minWidth: isMobile ? "280px" : "300px",
                maxWidth: isMobile ? "320px" : "none",
              }}
            >
            {product.href ? (
              <a
                href={product.href}
                data-product-card
                onClick={(e) => {
                  // Se houve drag, prevenir navegação
                  if (hasDragged || isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  // Verificar se houve movimento significativo
                  if (dragStartRef.current) {
                    const dragDistance = Math.sqrt(
                      Math.pow(e.clientX - dragStartRef.current.x, 2) + 
                      Math.pow(e.clientY - dragStartRef.current.y, 2)
                    );
                    if (dragDistance > 10) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                  }
                }}
                onPointerDown={(e) => {
                  // Prevenir que o container capture o evento quando clicar no card
                  e.stopPropagation();
                  dragStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
                }}
                className={`
                  relative w-full aspect-[4/5] rounded-3xl overflow-hidden block
                  transition-transform duration-300 ease-out
                  cursor-pointer hover:scale-[1.02]
                  ${isDragging ? "select-none pointer-events-none" : ""}
                `}
                style={{
                  userSelect: isDragging ? "none" : "auto",
                  WebkitUserSelect: isDragging ? "none" : "auto",
                }}
                aria-label={product.alt}
              >
                {product.image.endsWith('.svg') ? (
                  <img
                    src={encodeURI(product.image)}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                ) : (
                  <picture className="absolute inset-0 w-full h-full">
                    <source
                      type="image/avif"
                      srcSet={encodeURI(`/avif/public${product.image.replace(/\.(jpg|jpeg|png)$/i, ".avif")}`)}
                    />
                    <img
                      src={encodeURI(product.image)}
                      alt={product.alt}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </picture>
                )}
              </a>
            ) : (
              <div
                className={`
                  relative w-full aspect-[4/5] rounded-3xl overflow-hidden
                  transition-transform duration-300 ease-out
                  cursor-default
                  ${isDragging ? "select-none" : ""}
                `}
                style={{
                  userSelect: isDragging ? "none" : "auto",
                  WebkitUserSelect: isDragging ? "none" : "auto",
                }}
                role="img"
                aria-label={product.alt}
              >
                {product.image.endsWith('.svg') ? (
                  <img
                    src={encodeURI(product.image)}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                ) : (
                  <picture className="absolute inset-0 w-full h-full">
                    <source
                      type="image/avif"
                      srcSet={encodeURI(`/avif/public${product.image.replace(/\.(jpg|jpeg|png)$/i, ".avif")}`)}
                    />
                    <img
                      src={encodeURI(product.image)}
                      alt={product.alt}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                  </picture>
                )}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Anterior"
          className={`
            w-10 h-10 flex items-center justify-center mx-2
            bg-neutral-200 dark:bg-neutral-800
            border-3 border-transparent rounded-full
            focus:border-[#6D64F7] focus:outline-none
            hover:-translate-y-0.5 active:translate-y-0.5
            transition duration-200
            ${currentIndex === 0
              ? "text-gray-400 cursor-not-allowed opacity-50"
              : "text-neutral-600 dark:text-neutral-200"
            }
          `}
        >
          <IconArrowNarrowLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentIndex >= products.length - 1}
          aria-label="Próximo"
          className={`
            w-10 h-10 flex items-center justify-center mx-2
            bg-neutral-200 dark:bg-neutral-800
            border-3 border-transparent rounded-full
            focus:border-[#6D64F7] focus:outline-none
            hover:-translate-y-0.5 active:translate-y-0.5
            transition duration-200
            ${currentIndex >= products.length - 1
              ? "text-gray-400 cursor-not-allowed opacity-50"
              : "text-neutral-600 dark:text-neutral-200"
            }
          `}
        >
          <IconArrowNarrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
