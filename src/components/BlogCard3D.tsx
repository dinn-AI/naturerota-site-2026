"use client";

import React from "react";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

interface BlogCard3DProps {
  title: string;
  image: string;
  slug: string;
  publishedAt: string;
  formatDate: (dateString: string) => string;
  className?: string;
}

export default function BlogCard3D({
  title,
  image,
  slug,
  publishedAt,
  formatDate,
  className = "",
}: BlogCard3DProps) {
  return (
    <article className={`relative rounded-xl overflow-hidden cursor-pointer ${className}`}>
      <a href={`/blog/${slug}`} className="block h-full w-full">
        <DirectionAwareHover
          imageUrl={image}
          className="h-full w-full"
          imageClassName="rounded-xl"
          childrenClassName="!bottom-0 !left-0 !right-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl pointer-events-none"></div>
          <div>
            <p className="text-sm mb-2 opacity-90">{formatDate(publishedAt)}</p>
            <h3 className="text-2xl font-bold font-sans">{title}</h3>
          </div>
        </DirectionAwareHover>
      </a>
    </article>
  );
}

