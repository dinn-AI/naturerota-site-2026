"use client";

import Carousel from "@/components/ui/carousel";

export default function CarouselDemo() {
  const slideData = [
    {
      title: "Brasil de Motorhome | Brazil Roadtrip",
      button: "Assistir série",
      src: "/Kombi_roadTrip_Brazil.png",
      href: "https://youtube.com/playlist?list=PLFwipz-cJNpvymuengU-9T21nqk7M09rw&si=bxutv9-UoeAZHTHd",
    },
    {
      title: "Viagem de carro até Ushuaia",
      button: "Assistir série",
      src: "/Ebook_ushuaia/Rectangle%2026-4.jpg",
      href: "https://youtube.com/playlist?list=PLFwipz-cJNpuqJ_lQt1JG_1gxrLxv4VW2&si=c1NtbGlrFemDhNsN",
    },
    {
      title: "Bonito MS – Guia Completo da Viagem com carro",
      button: "Assistir série",
      src: "/Ebook_bonito/Rectangle%2028-1.jpg",
      href: "https://youtube.com/playlist?list=PLFwipz-cJNpveVPMtRRSGR4dwFVY3IHC-&si=vkUSKHa1MW7BVIy0",
    },
  ];

  return (
    <div className="relative overflow-visible w-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}

