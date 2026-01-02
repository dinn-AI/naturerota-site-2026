"use client";
import React from "react";

export default function HeroSectionParallax() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#FFF8F2" }}
    >
      {/* Imagem de fundo centralizada, mantendo proporção sem distorção */}
      <div
        className="absolute z-0"
        style={{
          backgroundImage: "url('/Header_BG.jpg')",
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
      
      {/* Card branco conectando hero com seção Sobre nós */}
      <div
        className="absolute z-10 bg-white rounded-lg shadow-lg p-8 max-w-lg"
        style={{
          bottom: "2rem",
          right: "2rem",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Ícone: icon_naturerota.svg */}
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
            <img
              src="/icon_naturerota.svg"
              alt="Nature Rota"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Queremos inspirar você a viajar mais e transformar a vida uma grande aventura
            </p>
          </div>
          <a
            href="#sobre-nos"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Conheça quem somos"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

