"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

const cards = [
  {
    id: 1,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_2184.jpg",
  },
  {
    id: 2,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_2659.jpg",
  },
  {
    id: 3,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_2992.jpg",
  },
  {
    id: 4,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3265.jpg",
  },
  {
    id: 5,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3407.jpg",
  },
  {
    id: 6,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3441.jpg",
  },
  {
    id: 7,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3450.jpg",
  },
  {
    id: 8,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3487.jpeg",
  },
  {
    id: 9,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3490.jpg",
  },
];

export default function GalleryGrid() {
  return (
    <div className="w-full py-10">
      <LayoutGrid cards={cards} />
    </div>
  );
}
