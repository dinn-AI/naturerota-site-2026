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
  variant?: "default" | "playlist" | "product";
  infinite?: boolean;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  videoSrc?: string;
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

export const Carousel = ({
  items,
  initialScroll = 0,
  variant = "default",
  infinite = false,
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [activeRenderedIndex, setActiveRenderedIndex] = useState(0);
  const [setWidth, setSetWidth] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const renderedItems = infinite ? [...items, ...items, ...items] : items;
  const itemsPerSet = items.length;

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    if (!infinite) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
      return;
    }

    const raf = requestAnimationFrame(() => {
      const first = itemRefs.current[0];
      const middle = itemRefs.current[itemsPerSet];
      if (!first || !middle) {
        return;
      }
      const width = middle.offsetLeft - first.offsetLeft;
      setSetWidth(width);
      carouselRef.current!.scrollLeft = width + initialScroll;
      setActiveRenderedIndex(itemsPerSet);
      setCurrentIndex(0);
      checkScrollability();
    });

    return () => cancelAnimationFrame(raf);
  }, [initialScroll, infinite, itemsPerSet]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      if (infinite) {
        setCanScrollLeft(true);
        setCanScrollRight(true);
        return;
      }
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  const getStepWidth = () => {
    const first = itemRefs.current[0];
    const second = itemRefs.current[1];
    if (first && second) {
      return second.offsetLeft - first.offsetLeft;
    }
    return isMobile() ? 220 : 360;
  };

  const scrollLeftBtn = () => {
    if (carouselRef.current) {
      if (variant === "product") {
        const nextIndex = Math.max(activeRenderedIndex - 1, 0);
        scrollToRenderedIndex(nextIndex);
        return;
      }
      const step = getStepWidth();
      carouselRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (carouselRef.current) {
      if (variant === "product") {
        const nextIndex = Math.min(activeRenderedIndex + 1, renderedItems.length - 1);
        scrollToRenderedIndex(nextIndex);
        return;
      }
      const step = getStepWidth();
      carouselRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const step = getStepWidth();
      const scrollPosition = step * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const updateActiveIndex = () => {
    if (!carouselRef.current || itemRefs.current.length === 0) {
      return;
    }
    const containerCenter =
      carouselRef.current.scrollLeft + carouselRef.current.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, idx) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveRenderedIndex(closestIndex);
    if (itemsPerSet > 0) {
      setCurrentIndex(closestIndex % itemsPerSet);
    }
  };

  const scrollToRenderedIndex = (index: number) => {
    if (!carouselRef.current) {
      return;
    }
    const item = itemRefs.current[index];
    if (!item) {
      return;
    }
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const target =
      itemCenter - carouselRef.current.clientWidth / 2;
    carouselRef.current.scrollTo({ left: target, behavior: "smooth" });
  };

  const handleInfiniteLoop = () => {
    if (!carouselRef.current || !infinite || setWidth === 0) {
      return;
    }
    const min = setWidth * 0.5;
    const max = setWidth * 1.5;
    if (carouselRef.current.scrollLeft < min) {
      carouselRef.current.scrollLeft += setWidth;
    } else if (carouselRef.current.scrollLeft > max) {
      carouselRef.current.scrollLeft -= setWidth;
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

  // Touch handlers for mobile - removidos para permitir scroll nativo puro no mobile
  // O CSS com overflow-x-scroll e snap-x vai cuidar disso perfeitamente e mais fluido

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, isDragging: hasDragged }}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className={cn(
            "flex w-full overflow-x-scroll overscroll-x-auto pt-14 pb-40 [scrollbar-width:none] md:pt-20 md:pb-40 select-none overflow-y-hidden snap-x snap-mandatory",
            !isDragging && "scroll-smooth"
          )}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-x pan-y",
            WebkitOverflowScrolling: "touch",
          }}
          ref={carouselRef}
          onScroll={() => {
            checkScrollability();
            updateActiveIndex();
            handleInfiniteLoop();
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={cn(
              "flex flex-row justify-start gap-[24px] pl-6 pr-4",
            )}
          >
            {renderedItems.map((item, index) => {
              const isActive = index === activeRenderedIndex;
              return (
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
                className={cn(
                  "relative shrink-0 rounded-3xl transition-all duration-300 snap-start",
                  !infinite && "last:mr-[5%] md:last:mr-[33%]",
                  variant === "playlist" &&
                    (isActive ? "scale-100 opacity-100" : "scale-[0.9] opacity-70"),
                  variant === "product" &&
                    (isActive
                      ? "scale-110 opacity-100 shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
                      : "scale-[0.92] opacity-80 shadow-[0_12px_30px_rgba(0,0,0,0.35)]")
                )}
                style={{ zIndex: renderedItems.length - index }}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                {item}
              </motion.div>
              );
            })}
          </div>
        </div>
        {/* Setas de navegação - Desktop: centralizadas verticalmente e nas laterais */}
        <div className="hidden md:flex absolute inset-y-0 left-0 right-0 pointer-events-none z-40">
          <button
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed",
              variant === "product"
                ? "text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                : "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50"
            )}
            onClick={scrollLeftBtn}
            disabled={!canScrollLeft}
            type="button"
          >
            <IconArrowNarrowLeft
              className={cn(
                "h-12 w-12",
                variant === "product" ? "text-white/60" : "h-6 w-6 text-gray-700"
              )}
            />
          </button>
          <button
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed",
              variant === "product"
                ? "text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                : "flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50"
            )}
            onClick={scrollRightBtn}
            disabled={!canScrollRight}
            type="button"
          >
            <IconArrowNarrowRight
              className={cn(
                "h-12 w-12",
                variant === "product" ? "text-white/60" : "h-6 w-6 text-gray-700"
              )}
            />
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
  variant = "default",
}: {
  card: Card;
  index: number;
  layout?: boolean;
  variant?: "default" | "playlist" | "product";
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
        <div className="fixed inset-0 z-100000 h-screen overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg z-100000"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            layoutId={layout ? `card-${card.title}` : undefined}
            className="relative z-100001 mx-auto my-10 h-fit w-[90%] md:w-[80%] lg:max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10"
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

  const isPlaylist = variant === "playlist";
  const isProduct = variant === "product";

  return (
    <>
      {typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleCardClick}
        className={cn(
          "relative flex flex-col items-start justify-between overflow-hidden rounded-3xl bg-gray-100",
          isPlaylist
            ? "h-64 w-56 md:h-104 md:w-152"
            : isProduct
              ? "h-72 w-56 md:h-112 md:w-80"
              : "h-64 w-48 md:h-96 md:w-72"
        )}
      >
        {!card.hideOverlay && (
          <>
            <div className="pointer-events-none absolute inset-0 z-30 h-full w-full bg-linear-to-b from-black/50 via-transparent to-transparent rounded-3xl" />
            <div
              className={cn(
                "relative z-40 w-full overflow-hidden",
                isPlaylist || isProduct ? "p-4 md:p-6" : "p-4 md:p-8"
              )}
            >
              <motion.p
                layoutId={layout ? `category-${card.category}` : undefined}
                className={cn(
                  "text-left font-sans font-medium text-white",
                  isPlaylist || isProduct ? "text-xs md:text-sm" : "text-sm md:text-base"
                )}
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className={cn(
                  "mt-2 w-full text-left font-serif font-semibold text-white line-clamp-3 md:line-clamp-4",
                  isPlaylist || isProduct ? "text-base md:text-2xl" : "text-lg md:text-3xl"
                )}
              >
                {card.title}
              </motion.p>
            </div>
            
            {card.buttonLink && card.buttonPlatform && (
              <div
                className={cn(
                  "relative z-40 w-full overflow-hidden flex items-start justify-start",
                  isPlaylist || isProduct ? "p-4 md:p-6" : "p-4 md:p-8"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center gap-2 text-white pointer-events-none whitespace-nowrap transition-all duration-300 ease-in-out self-start",
                    isPlaylist || isProduct
                      ? "border border-white/60 bg-white/10 px-3 py-1.5 rounded-full font-sans text-xs md:text-sm font-medium"
                      : "border-2 border-white px-4 md:px-8 py-2.5 md:py-3.5 rounded-full font-sans font-bold text-sm md:text-lg uppercase tracking-wide hover:bg-white/25"
                  )}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {card.buttonText || "Assistir Agora"}
                </span>
              </div>
            )}
          </>
        )}
        
        {card.videoSrc ? (
          <VideoBackground
            src={card.videoSrc}
            title={card.title}
            className="absolute inset-0 z-10 rounded-3xl"
          />
        ) : (
          <BlurImage
            src={card.src}
            alt={card.title}
            className="absolute inset-0 z-10 object-cover rounded-3xl"
          />
        )}
      </motion.button>
    </>
  );
};

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

const VideoBackground = ({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
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

