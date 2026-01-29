"use client";

import Carousel from "@/components/ui/carousel";

export default function ProductsCarouselDemo() {
  const slideData = [
    {
      title: "Guia da Patagônia de Carro (20 dias)",
      button: "Ver produto",
      src: "/products_cover/20_dias_pela_patagonia_de_CARRO.jpg",
      href: "/20-dias-pela-patagonia",
      openInNewTab: false,
    },
    {
      title: "Bonito em 4 Dias (MS)",
      button: "Ver produto",
      src: "/products_cover/Roteiro_de_4_dias_em_Bonito_MS_Brasil.jpg",
      href: "/4-dias-em-bonito-ms",
      openInNewTab: false,
    },
    {
      title: "Vida na Estrada com Pets",
      button: "Ver produto",
      src: "/products_cover/Vida_na_Estrada_com_Pets.jpg",
      href: "/products_cover/Vida_na_Estrada_com_Pets.jpg",
      openInNewTab: true,
    },
    {
      title: "Praias no Espírito Santo de Motorhome",
      button: "Ver produto",
      src: encodeURI("/products_cover/Praias para conhecer no Espírito Santo de Motorhome.jpg"),
      href: encodeURI("/products_cover/Praias para conhecer no Espírito Santo de Motorhome.jpg"),
      openInNewTab: true,
    },
  ];

  return (
    <div className="relative overflow-hidden w-full max-w-full py-16">
      <Carousel slides={slideData} />
    </div>
  );
}

