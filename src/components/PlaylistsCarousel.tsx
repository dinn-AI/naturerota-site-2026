"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import SocialLink from './SocialLink';

const PlaylistContent = ({ description, videoCount, views, link }: { description: string; videoCount: string; views: string; link: string }) => {
  return (
    <div className="bg-[#FFF8F2] p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-gray-700 text-base md:text-xl font-sans max-w-3xl mx-auto leading-relaxed mb-6">
        {description}
      </p>
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
          <span className="font-medium">{videoCount}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <span>{views}</span>
        </div>
      </div>
      <div className="mt-8 text-center">
        <SocialLink
          platform="youtube"
          url={link}
          className="btn-primary inline-flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Assistir Playlist
        </SocialLink>
      </div>
    </div>
  );
};

const playlistsData = [
  {
    category: "Série Completa",
    title: "Aventura de Carro do Brasil até Ushuaia: O Guia Completo",
    src: "/20_dias_patagonia.jpeg",
    buttonLink: "https://youtube.com/playlist?list=PLFwipz-cJNpuqJ_lQt1JG_1gxrLxv4VW2&si=N6EK0ZlBk7B8NNkd",
    buttonPlatform: "youtube" as const,
    buttonText: "Assistir Agora",
    disableModal: true,
    content: (
      <PlaylistContent
        description="Pegamos a estrada saindo de Cascavel, no Paraná, rumo ao Fim do Mundo — literalmente! Foram 20 dias cruzando o Brasil e a Argentina até chegar em Ushuaia. Uma jornada épica com paisagens de tirar o fôlego, desafios na estrada e momentos inesquecíveis."
        videoCount="12 vídeos"
        views="638 visualizações"
        link="https://youtube.com/playlist?list=PLFwipz-cJNpuqJ_lQt1JG_1gxrLxv4VW2&si=N6EK0ZlBk7B8NNkd"
      />
    ),
  },
  {
    category: "Roteiro Detalhado",
    title: "Bonito MS – Guia Completo da Viagem",
    src: "/4_dias_Bonito_MS.jpeg",
    buttonLink: "https://youtube.com/playlist?list=PLFwipz-cJNpveVPMtRRSGR4dwFVY3IHC-&si=9Pcq_Ffl4s53DLPs",
    buttonPlatform: "youtube" as const,
    buttonText: "Assistir Agora",
    disableModal: true,
    content: (
      <PlaylistContent
        description="Planejando uma viagem para Bonito MS? Criamos uma playlist completa com um roteiro de 4 dias para você aproveitar ao máximo essa cidade incrível. Descubra as águas cristalinas, flutuações imperdíveis e dicas valiosas."
        videoCount="6 vídeos"
        views="134 visualizações"
        link="https://youtube.com/playlist?list=PLFwipz-cJNpveVPMtRRSGR4dwFVY3IHC-&si=9Pcq_Ffl4s53DLPs"
      />
    ),
  },
  {
    category: "Documentário",
    title: "Brasil de Motorhome | Brazil Roadtrip",
    src: "/Kombi_roadTrip_Brazil.png",
    buttonLink: "https://youtube.com/playlist?list=PLFwipz-cJNpvymuengU-9T21nqk7M09rw&si=Pzer58MW5--wWucg",
    buttonPlatform: "youtube" as const,
    buttonText: "Assistir Agora",
    disableModal: true,
    content: (
      <PlaylistContent
        description="Aqui você encontra todos os vídeos da nossa rotina morando em uma Kombi pelo Brasil durante 1 ano inteiro. Acompanhe nossa jornada, os altos e baixos, as descobertas e os aprendizados de viver na estrada em tempo integral."
        videoCount="40 vídeos"
        views="73 visualizações"
        link="https://youtube.com/playlist?list=PLFwipz-cJNpvymuengU-9T21nqk7M09rw&si=Pzer58MW5--wWucg"
      />
    ),
  },
];

export default function PlaylistsCarousel() {
  const cards = playlistsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}

