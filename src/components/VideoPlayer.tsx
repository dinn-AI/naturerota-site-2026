"use client";

import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/**
 * Componente de vídeo HTML5 otimizado com lazy-load
 * 
 * Carrega o vídeo apenas quando entra no viewport usando IntersectionObserver
 * para melhorar performance inicial do site.
 */
export default function VideoPlayer({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = false,
  playsInline = true,
  className = "",
  preload = "metadata",
  onPlay,
  onPause,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Evitar carregar vídeo em rede lenta ou modo economia de dados (mobile/sinal fraco)
  const shouldLoadVideo = (): boolean => {
    if (typeof navigator === "undefined") return true;
    const conn = (navigator as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData) return false;
    const et = conn?.effectiveType;
    if (et === "slow-2g" || et === "2g") return false;
    return true;
  };

  // Lazy-load: só carrega quando entra no viewport; com autoplay, atrasa para poster pintar primeiro (LCP)
  useEffect(() => {
    if (!containerRef.current) return;

    if (autoplay) {
      if (!shouldLoadVideo()) return; // Fica só no poster em Save-Data/rede muito lenta
      const scheduleLoad = () => setShouldLoad(true);
      const id =
        typeof requestIdleCallback !== "undefined"
          ? requestIdleCallback(scheduleLoad, { timeout: 2000 })
          : (setTimeout(scheduleLoad, 100) as unknown as number);
      return () => {
        if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
        else clearTimeout(id);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && shouldLoadVideo()) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px", threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoplay]);

  // Gerenciar autoplay quando o vídeo carregar
  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (autoplay && muted) {
        // Tentar autoplay após interação do usuário
        const attemptPlay = async () => {
          try {
            await video.play();
          } catch (error) {
            // Autoplay bloqueado - usuário precisa interagir
            console.log("Autoplay bloqueado pelo navegador");
          }
        };

        // Tentar imediatamente se já houve interação
        attemptPlay();

        // Tentar após primeira interação do usuário
        const handleUserInteraction = () => {
          attemptPlay();
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction, { once: true });
        document.addEventListener("touchstart", handleUserInteraction, { once: true });
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [shouldLoad, autoplay, muted]);

  // Handlers de eventos
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (onPlay) video.addEventListener("play", onPlay);
    if (onPause) video.addEventListener("pause", onPause);
    if (onEnded) video.addEventListener("ended", onEnded);

    return () => {
      if (onPlay) video.removeEventListener("play", onPlay);
      if (onPause) video.removeEventListener("pause", onPause);
      if (onEnded) video.removeEventListener("ended", onEnded);
    };
  }, [onPlay, onPause, onEnded]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          className="w-full h-full object-cover"
        />
      ) : (
        // Placeholder enquanto não carrega
        poster ? (
          <img
            src={poster}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-white/50 text-sm">Carregando vídeo...</div>
          </div>
        )
      )}
    </div>
  );
}
