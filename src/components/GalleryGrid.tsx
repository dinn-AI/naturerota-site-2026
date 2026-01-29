"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import OptimizedImage from "./OptimizedImage";

// Imagens otimizadas em AVIF - selecionadas por tamanho compacto
const cards = [
  {
    id: 1,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3637.jpg", // 255K - menor AVIF disponível
  },
  {
    id: 2,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3407.jpg", // 330K
  },
  {
    id: 3,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3512.jpg", // 309K
  },
  {
    id: 4,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3537.jpg", // 448K
  },
  {
    id: 5,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3487.jpg", // 498K
  },
  {
    id: 6,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4206.jpg", // 429K
  },
  {
    id: 7,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_2659.jpg", // 358K
  },
];

export default function GalleryGrid() {
  return (
    <div className="w-full py-10">
      <LayoutGrid cards={cards} />
    </div>
  );
}
