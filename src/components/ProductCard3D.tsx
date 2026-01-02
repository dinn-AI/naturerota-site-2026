"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ProductCard3DProps {
  title: string;
  price: string;
  image: string;
  link: string;
}

export default function ProductCard3D({
  title,
  price,
  image,
  link,
}: ProductCard3DProps) {
  return (
    <CardContainer className="inter-var w-full">
      <a href={link} className="block">
        <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-lg border shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer">
          <CardItem translateZ="100" className="w-full">
            <img
              src={image}
              className="w-full aspect-square object-cover group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105"
              alt={title}
            />
          </CardItem>
        </CardBody>
      </a>
    </CardContainer>
  );
}

