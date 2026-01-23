"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { buildYouTubeEmbedUrl, cn, initYouTubeAutoplay } from "@/lib/utils";

type HeroSlide = {
  id: string;
  imageSrc: string;
  alt: string;
  videoSrc?: string;
  title?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "drops-of-god",
    imageSrc:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2400&auto=format&fit=crop",
    videoSrc: "https://youtu.be/Vy6GGodB3Wk?si=6CPFZzXxrJK_3UpP",
    title: "Brasil de Motorhome | Brazil Road Trip",
    buttonLabel: "Assistir agora",
    buttonHref:
      "https://www.youtube.com/watch?v=LKE1nUT6Is0&list=PLFwipz-cJNpvymuengU-9T21nqk7M09rw",
    alt: "Brasil de Motorhome | Brazil Road Trip",
  },
  {
    id: "mountain-forest",
    imageSrc:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2400&auto=format&fit=crop",
    videoSrc: "https://youtu.be/CE4fW_Zxz08?si=3LZNuRsmPweLWeRg",
    title:
      "Aventura de Carro do Brasil até Ushuaia: O Roteiro Completo de Verão!",
    buttonLabel: "Assistir agora",
    buttonHref:
      "https://www.youtube.com/watch?v=CE4fW_Zxz08&list=PLFwipz-cJNpuqJ_lQt1JG_1gxrLxv4VW2",
    alt:
      "Aventura de Carro do Brasil até Ushuaia: O Roteiro Completo de Verão!",
  },
  {
    id: "night-city",
    imageSrc:
      "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=2400&auto=format&fit=crop",
    videoSrc: "https://youtu.be/xIPdqZ5kLH4?si=Qi71rhCdWBns3McH",
    title: "Bonito MS – Guia Completo da Viagem com carro",
    buttonLabel: "Assistir agora",
    buttonHref:
      "https://www.youtube.com/watch?v=xIPdqZ5kLH4&list=PLFwipz-cJNpveVPMtRRSGR4dwFVY3IHC-",
    alt: "Bonito MS – Guia Completo da Viagem com carro",
  },
];

export default function AppleHeroCarousel({
  slides = DEFAULT_SLIDES,
  className,
}: {
  slides?: HeroSlide[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const clampIndex = (index: number) => {
    if (index < 0) return 0;
    if (index > slides.length - 1) return slides.length - 1;
    return index;
  };

  const goTo = (index: number) => setActiveIndex(clampIndex(index));
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    initYouTubeAutoplay(containerRef.current);
  }, []);

  const beginDrag = (clientX: number, clientY: number) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    dragOffsetRef.current = 0;
    isDraggingRef.current = true;
    setDragOffset(0);
    setIsDragging(true);
  };

  const updateDrag = (clientX: number) => {
    const delta = clientX - startXRef.current;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const finishDrag = () => {
    if (!isDraggingRef.current) return;
    const delta = dragOffsetRef.current;
    isDraggingRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
    if (Math.abs(delta) > 60) {
      if (delta > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "touch") {
      return;
    }
    beginDrag(event.clientX, event.clientY);
    containerRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
      updateDrag(event.clientX);
    }
  };

  useEffect(() => {
    const target = trackRef.current;
    if (!target) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      beginDrag(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = event.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - startXRef.current;
      const deltaY = touch.clientY - startYRef.current;
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 5) {
        event.preventDefault();
        updateDrag(touch.clientX);
      }
    };

    const handleTouchEnd = () => {
      finishDrag();
    };

    target.addEventListener("touchstart", handleTouchStart, { passive: true });
    target.addEventListener("touchmove", handleTouchMove, { passive: false });
    target.addEventListener("touchend", handleTouchEnd, { passive: true });
    target.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
      target.removeEventListener("touchend", handleTouchEnd);
      target.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const trackTransform = useMemo(() => {
    const base = `calc(50% - var(--slideW) / 2 - ${activeIndex} * (var(--slideW) + var(--gap)))`;
    if (!isDragging || dragOffset === 0) {
      return `translateX(${base})`;
    }
    return `translateX(calc(${base} + ${dragOffset}px))`;
  }, [activeIndex, dragOffset, isDragging]);

  return (
    <section
      ref={containerRef}
      className={cn("w-full px-4 pt-14 pb-24 overflow-hidden md:px-0", className)}
      aria-roledescription="carousel"
    >
      <div className="relative w-full">
        <div
          ref={trackRef}
          className={cn(
            "flex items-center touch-pan-y",
            isDragging
              ? "transition-none"
              : "transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={
            {
              "--slideW": "min(1466px, 88vw)",
              "--gap": "clamp(12px, 2.5vw, 24px)",
              transform: trackTransform,
              gap: "var(--gap)",
            } as React.CSSProperties
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={finishDrag}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === activeIndex - 1;
            const isNext = index === activeIndex + 1;
            return (
              <div
                key={slide.id}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-[28px] h-[540px] md:h-auto md:aspect-video",
                  "transition-[transform,filter,box-shadow] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                )}
                style={{
                  width: "var(--slideW)",
                  zIndex: isActive ? 3 : 1,
                  boxShadow: isActive
                    ? "0 24px 60px rgba(0,0,0,0.55)"
                    : "none",
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  filter: isActive
                    ? "none"
                    : "blur(10px) brightness(0.55) saturate(0.9)",
                }}
                onClick={() => {
                  if (isPrev) goPrev();
                  if (isNext) goNext();
                }}
              >
                {slide.videoSrc ? (
                  <VideoBackground src={slide.videoSrc} title={slide.alt} />
                ) : (
                  <img
                    src={slide.imageSrc}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                )}
                {(slide.title || slide.buttonLabel) && (
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col justify-end p-6 md:p-10",
                      isActive ? "pointer-events-auto" : "pointer-events-none"
                    )}
                  >
                    {slide.title && (
                      <h3 className="text-xl md:text-2xl font-serif font-semibold text-white leading-tight drop-shadow-sm">
                        {slide.title}
                      </h3>
                    )}
                    {slide.buttonLabel && slide.buttonHref && (
                      <a
                        href={slide.buttonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wide text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        aria-label={slide.buttonLabel}
                      >
                        {slide.buttonLabel}
                      </a>
                    )}
                  </div>
                )}
                {!isActive && (
                  <div className="pointer-events-none absolute inset-0 bg-black/35" />
                )}
                {(isPrev || isNext) && !isActive && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Chevron
                      direction={isPrev ? "left" : "right"}
                      className="h-12 w-12 text-white/55"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={goPrev}
          aria-label="Anterior"
          type="button"
        >
          <Chevron direction="left" className="h-12 w-12" />
        </button>
        <button
          className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={goNext}
          aria-label="Próximo"
          type="button"
        >
          <Chevron direction="right" className="h-12 w-12" />
        </button>
      </div>
    </section>
  );
}

const Chevron = ({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === "left" ? (
      <path d="M15 6l-6 6 6 6" />
    ) : (
      <path d="M9 6l6 6-6 6" />
    )}
  </svg>
);

const VideoBackground = ({ src, title }: { src: string; title: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <iframe
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto min-w-full min-h-full aspect-video scale-[1.02] pointer-events-none"
      src={buildYouTubeEmbedUrl(src)}
      title={title}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      data-youtube-autoplay="1"
    />
  </div>
);
