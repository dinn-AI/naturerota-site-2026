"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

const cards = [
  {
    id: 1,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3487.jpeg",
  },
  {
    id: 2,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3865.jpeg",
  },
  {
    id: 3,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4210.jpeg",
  },
  {
    id: 4,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_5297.jpeg",
  },
  {
    id: 5,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_5789.jpeg",
  },
  {
    id: 6,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_6246.jpeg",
  },
  {
    id: 7,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_6289.jpeg",
  },
];

export default function GalleryGrid() {
  return (
    <div className="w-full py-10">
      <LayoutGrid cards={cards} />
    </div>
  );
}
