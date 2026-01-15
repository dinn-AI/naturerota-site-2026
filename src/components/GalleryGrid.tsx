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
  {
    id: 10,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3512.jpg",
  },
  {
    id: 11,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3535.jpg",
  },
  {
    id: 12,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3537.jpg",
  },
  {
    id: 13,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3637.jpg",
  },
  {
    id: 14,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3837.JPG",
  },
  {
    id: 15,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_3865.jpeg",
  },
  {
    id: 16,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_3963.JPG",
  },
  {
    id: 17,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4206.JPG",
  },
  {
    id: 18,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4210.jpeg",
  },
  {
    id: 19,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4236.JPG",
  },
  {
    id: 20,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_4261.JPG",
  },
  {
    id: 21,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4443.JPG",
  },
  {
    id: 22,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4476.JPG",
  },
  {
    id: 23,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_4678.JPG",
  },
  {
    id: 24,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4738.JPG",
  },
  {
    id: 25,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4846.JPG",
  },
  {
    id: 26,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_4880.JPG",
  },
  {
    id: 27,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_5789.jpeg",
  },
  {
    id: 28,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_6246.jpeg",
  },
  {
    id: 29,
    className: "col-span-1 row-span-2",
    thumbnail: "/IMG_7951.jpeg",
  },
  {
    id: 30,
    className: "col-span-1 row-span-1",
    thumbnail: "/IMG_8337.jpeg",
  },
];

export default function GalleryGrid() {
  return (
    <div className="w-full py-10">
      <LayoutGrid cards={cards} />
    </div>
  );
}
