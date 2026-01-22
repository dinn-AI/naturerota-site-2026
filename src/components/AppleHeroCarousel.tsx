"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
  const dragOffsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const onPointerDown = (event: React.PointerEvent) => {
    if (
      event.target instanceof Element &&
      event.target.closest("a, button")
    ) {
      return;
    }
    startXRef.current = event.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(true);
    containerRef.current?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = event.clientX - startXRef.current;
    dragOffsetRef.current = delta;
    setDragOffset(delta);
  };

  const finishDrag = () => {
    if (!isDragging) return;
    const delta = dragOffsetRef.current;
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

  const trackTransform = useMemo(() => {
    const base = `calc(50vw - var(--slideW) / 2 - ${activeIndex} * (var(--slideW) + var(--gap)))`;
    if (!isDragging || dragOffset === 0) {
      return `translateX(${base})`;
    }
    return `translateX(calc(${base} + ${dragOffset}px))`;
  }, [activeIndex, dragOffset, isDragging]);

  return (
    <section
      ref={containerRef}
      className={cn("w-full pt-14 pb-24 overflow-hidden", className)}
      aria-roledescription="carousel"
    >
      <div className="relative w-full">
        <div
          className={cn(
            "flex items-center",
            isDragging
              ? "transition-none"
              : "transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={
            {
              "--slideW": "min(1466px, 72vw)",
              "--gap": "32px",
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
                  "relative shrink-0 overflow-hidden rounded-[28px]",
                  "transition-[transform,filter,box-shadow] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                )}
                style={{
                  width: "var(--slideW)",
                  aspectRatio: "16 / 9",
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
                      <h3 className="text-2xl md:text-3xl font-serif font-semibold text-white leading-tight drop-shadow-sm">
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
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          onClick={goPrev}
          aria-label="Anterior"
          type="button"
        >
          <Chevron direction="left" className="h-12 w-12" />
        </button>
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&/]+)/
  );
  const id = match?.[1];
  if (!id) {
    return url;
  }
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
    playlist: id,
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
};

const VideoBackground = ({ src, title }: { src: string; title: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <iframe
      className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] pointer-events-none"
      src={getYouTubeEmbedUrl(src)}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);
