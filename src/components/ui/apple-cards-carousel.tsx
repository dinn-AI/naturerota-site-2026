"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { createPortal } from "react-dom";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  buttonLink?: string;
  buttonPlatform?: "youtube" | "instagram" | "internal";
  buttonText?: string;
  disableModal?: boolean;
  hideOverlay?: boolean;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  isDragging: boolean;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  isDragging: false,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  const scrollLeftBtn = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 192 : 288; // (md:w-72)
      const gap = isMobile() ? 4 : 8;
      carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 192 : 288; // (md:w-72)
      const gap = isMobile() ? 4 : 8;
      carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 192 : 288; // (md:w-72)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
    }
    // Reset hasDragged after a short delay to allow click events to check it
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador para velocidade do scroll
    
    // If moved more than 5px, consider it a drag
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grab';
      }
      setTimeout(() => setHasDragged(false), 100);
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    // If moved more than 5px, consider it a drag
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 100);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, isDragging: hasDragged }}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className={cn(
            "flex w-full overflow-x-scroll overscroll-x-auto py-10 [scrollbar-width:none] md:py-20 select-none overflow-y-hidden",
            !isDragging && "scroll-smooth"
          )}
          style={{ cursor: 'grab' }}
          ref={carouselRef}
          onScroll={checkScrollability}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-6 pl-4 pr-4",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="relative shrink-0 rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                style={{ zIndex: items.length - index }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Setas de navegação - Desktop: centralizadas verticalmente e nas laterais */}
        <div className="hidden md:flex absolute inset-y-0 left-0 right-0 pointer-events-none z-40">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto transition-all"
            onClick={scrollLeftBtn}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto transition-all"
            onClick={scrollRightBtn}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        {/* Setas de navegação - Mobile: mantém posição original */}
        <div className="md:hidden mr-10 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeftBtn}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRightBtn}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex, isDragging } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevenir ação se houve arrasto
    if (isDragging) {
      e.preventDefault();
      return;
    }

    if (card.disableModal && card.buttonLink) {
      // Se modal está desabilitado e há link, abrir diretamente
      if (card.buttonPlatform === "internal") {
        window.location.href = card.buttonLink;
        return;
      }

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && card.buttonPlatform === "youtube") {
        e.preventDefault();
        const playlistMatch = card.buttonLink.match(/list=([^&]+)/);
        if (playlistMatch) {
          window.location.href = `youtube://youtube.com/playlist?list=${playlistMatch[1]}`;
          setTimeout(() => {
            window.location.href = card.buttonLink!;
          }, 1500);
          return;
        }
      }

      window.open(card.buttonLink, "_blank", "noopener,noreferrer");
    } else {
      // Comportamento padrão: abrir modal
      handleOpen();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {open && !card.disableModal && (
        <div className="fixed inset-0 z-[100000] h-screen overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg z-[100000]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            layoutId={layout ? `card-${card.title}` : undefined}
            className="relative z-[100001] mx-auto my-10 h-fit w-[90%] md:w-[80%] lg:max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10"
          >
            <button
              className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black"
              onClick={handleClose}
            >
              <IconX className="h-6 w-6 text-neutral-100" />
            </button>
            <motion.p
              layoutId={layout ? `category-${card.title}` : undefined}
              className="text-base font-medium text-black"
            >
              {card.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl font-serif"
            >
              {card.title}
            </motion.p>
            <div className="py-10">{card.content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleCardClick}
        className="relative flex h-64 w-48 flex-col items-start justify-between overflow-hidden rounded-3xl bg-gray-100 md:h-96 md:w-72"
      >
        {!card.hideOverlay && (
          <>
            <div className="pointer-events-none absolute inset-0 z-30 h-full w-full bg-gradient-to-b from-black/50 via-transparent to-transparent rounded-3xl" />
            <div className="relative z-40 p-4 md:p-8 w-full overflow-hidden">
              <motion.p
                layoutId={layout ? `category-${card.category}` : undefined}
                className="text-left font-sans text-sm font-medium text-white md:text-base"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-2 w-full text-left font-serif text-lg font-semibold text-white md:text-3xl line-clamp-3 md:line-clamp-4"
              >
                {card.title}
              </motion.p>
            </div>
            
            {card.buttonLink && card.buttonPlatform && (
              <div className="relative z-40 p-4 md:p-8 w-full overflow-hidden">
                <span className="inline-flex items-center justify-center gap-2 md:gap-3 text-white border-2 border-white px-4 md:px-8 py-2.5 md:py-3.5 rounded-full font-sans font-bold text-sm md:text-lg uppercase tracking-wide transition-all duration-300 ease-in-out hover:bg-white/25 pointer-events-none whitespace-nowrap">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {card.buttonText || "Assistir Agora"}
                </span>
              </div>
            )}
          </>
        )}
        
        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 object-cover rounded-3xl"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  src,
  className,
  alt,
  ...rest
}: {
  src: string;
  className?: string;
  alt?: string;
  [key: string]: any;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};

