"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4 relative">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden rounded-xl cursor-pointer group"
            )}
            layoutId={`card-${card.id}`}
          >
            <motion.img
              src={card.thumbnail}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt={`Galeria ${card.id}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal de imagem expandida */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOutsideClick}
              className="fixed inset-0 bg-black/90 z-[9999] cursor-pointer"
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <motion.div
                className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center pointer-events-auto"
                onClick={handleOutsideClick}
              >
                <motion.img
                  src={selected.thumbnail}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  alt={`Galeria ${selected.id}`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Botão de fechar */}
                <button
                  onClick={handleOutsideClick}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
                  aria-label="Fechar"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

