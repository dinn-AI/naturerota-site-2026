"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function HeroSectionParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const raw = (scrollY - sectionTop) / (sectionHeight * 0.8);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const overlayOpacity = useMemo(() => {
    return Math.max(0, 0.5 - 0.5 * progress);
  }, [progress]);

  const textOpacity = useMemo(() => {
    return Math.max(0, 1 - progress * 1.2);
  }, [progress]);

  const textTranslate = useMemo(() => {
    return 10 + progress * 20;
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "140vh", backgroundColor: "#FFF8F2" }}
    >
      {/* Imagem fixa durante a rolagem */}
      <div className="sticky top-0 h-screen">
        <div
          className="absolute z-0"
          style={{
            backgroundImage: "url('/IMG_3835.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            top: "1rem",
            left: "1rem",
            right: "1rem",
            bottom: "1rem",
            borderRadius: "0.5rem",
          }}
        />

        {/* Layer escura que clareia com o scroll */}
        <div
          className="absolute z-10"
          style={{
            top: "1rem",
            left: "1rem",
            right: "1rem",
            bottom: "1rem",
            borderRadius: "0.5rem",
            backgroundColor: "rgba(0,0,0,1)",
            opacity: overlayOpacity,
            transition: "opacity 0.1s linear",
          }}
        />

        {/* Texto centralizado que se move e some */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-6"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslate}px)`,
            transition: "opacity 0.1s linear, transform 0.1s linear",
          }}
        >
          <p className="text-white text-3xl md:text-5xl font-serif font-bold leading-tight max-w-3xl">
            Queremos inspirar você a viajar mais e transformar a vida uma grande aventura
          </p>
        </div>
      </div>
    </section>
  );
}

