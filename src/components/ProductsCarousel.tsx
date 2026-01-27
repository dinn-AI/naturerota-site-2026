"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const ProductContent = ({ title, description, features, checkoutUrl }: { title: string; description: string; features: string[]; checkoutUrl?: string }) => {
  return (
    <div className="bg-[#FFF8F2] p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-gray-700 text-base md:text-xl font-sans max-w-3xl mx-auto leading-relaxed mb-6">
        {description}
      </p>
      <div className="space-y-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start">
            <svg className="w-6 h-6 mr-3 mt-1 shrink-0" style={{ color: '#123A2B' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="text-gray-700 text-base md:text-lg">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Quero Este Guia
          </a>
        ) : (
          <p className="text-gray-600 text-base md:text-lg font-medium">
            Disponível em breve...
          </p>
        )}
      </div>
    </div>
  );
};

const productsData = [
  {
    category: "Guia Completo",
    title: "20 Dias pela Patagônia de Carro",
    src: "/products_cover/20_dias_pela_patagonia_de_CARRO.jpg",
    hideOverlay: true,
    disableModal: true,
    buttonLink: "/20-dias-pela-patagonia",
    buttonPlatform: "internal" as const,
    content: (
      <ProductContent
        title="20 Dias pela Patagônia de Carro"
        description="Roteiro detalhado da nossa jornada épica até o Fim do Mundo. Tudo que você precisa saber para planejar sua viagem dos sonhos pela Patagônia Argentina."
        features={[
          "Roteiro dia a dia com quilometragens exatas",
          "Melhores pontos de parada e pernoite",
          "Dicas de economia e orçamento realista",
          "Lugares escondidos que não estão nos guias tradicionais"
        ]}
        checkoutUrl="https://pay.hotmart.com/U98520938Y"
      />
    ),
  },
  {
    category: "Roteiro Prático",
    title: "4 Dias em Bonito MS",
    src: "/products_cover/Roteiro_de_4_dias_em_Bonito_MS_Brasil.jpg",
    hideOverlay: true,
    disableModal: true,
    buttonLink: "/4-dias-em-bonito-ms",
    buttonPlatform: "internal" as const,
    content: (
      <ProductContent
        title="4 Dias em Bonito MS"
        description="Descubra as águas cristalinas de Bonito com nosso guia otimizado para aproveitar o máximo em 4 dias."
        features={[
          "Sequência ideal de passeios para economizar tempo",
          "Dicas de agências e valores atualizados",
          "Onde comer bem gastando pouco",
          "Campings e hospedagens testados por nós"
        ]}
        checkoutUrl="https://pay.hotmart.com/T98534013N"
      />
    ),
  },
  {
    category: "Curso Essencial",
    title: "Começando a Vida na Estrada",
    src: "/products_cover/comecando_a_vida_na_estrada.jpg",
    hideOverlay: true,
    content: (
      <ProductContent
        title="Começando a Vida na Estrada"
        description="O passo a passo completo para largar tudo e viver viajando. Da decisão inicial até os primeiros meses na estrada."
        features={[
          "Como se preparar financeiramente",
          "Escolhendo o veículo ideal para seu perfil",
          "Documentação e burocracias essenciais",
          "Primeiros passos e adaptação"
        ]}
      />
    ),
  },
  {
    category: "Trabalho Remoto",
    title: "Como Ganhar Dinheiro na Estrada",
    src: "/products_cover/COMO_ganhar_dinheiro_na_estrada.jpg",
    hideOverlay: true,
    content: (
      <ProductContent
        title="Como Ganhar Dinheiro na Estrada"
        description="Transforme sua paixão por viagens em fonte de renda. Aprenda as estratégias que usamos para viver viajando."
        features={[
          "7 formas comprovadas de ganhar dinheiro viajando",
          "Como criar conteúdo que gera renda",
          "Trabalhos remotos para nômades digitais",
          "Gerenciamento financeiro na vida mobile"
        ]}
      />
    ),
  },
  {
    category: "Van Life com Pets",
    title: "Vida na Estrada com Pets",
    src: "/products_cover/Vida_na_Estrada_com_Pets.jpg",
    hideOverlay: true,
    content: (
      <ProductContent
        title="Vida na Estrada com Pets"
        description="Ayla Husky é nossa companheira de viagens. Aprenda tudo sobre viajar com seu pet em segurança e conforto."
        features={[
          "Preparação e adaptação do pet",
          "Documentação e vacinas necessárias",
          "Cuidados diários e alimentação",
          "Lugares pet-friendly pelo Brasil"
        ]}
      />
    ),
  },
  {
    category: "Segurança",
    title: "Pernoite Seguro na Estrada",
    src: "/products_cover/Pernoite_seguro_na_estrada.jpg",
    hideOverlay: true,
    content: (
      <ProductContent
        title="Pernoite Seguro na Estrada"
        description="Durma tranquilo onde quer que esteja. Tudo sobre segurança e conforto para pernoites em van/kombi."
        features={[
          "Como escolher locais seguros",
          "Equipamentos de segurança essenciais",
          "Apps e comunidades de viajantes",
          "Protocolo de emergências"
        ]}
      />
    ),
  },
  {
    category: "Gastronomia Mobile",
    title: "Receitas para Camping e Motorhome",
    src: "/products_cover/Receitas_cozinhar_em_camping_ou_motorhome.jpg",
    hideOverlay: true,
    content: (
      <ProductContent
        title="Receitas para Camping"
        description="Cozinhe pratos incríveis com recursos limitados. Nossas receitas favoritas da vida na estrada."
        features={[
          "30+ receitas práticas e saborosas",
          "Ingredientes fáceis de encontrar",
          "Pouco uso de gás e água",
          "Dicas de armazenamento sem geladeira"
        ]}
      />
    ),
  },
];

export default function ProductsCarousel() {
  const cards = productsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} variant="product" />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} variant="product" />
    </div>
  );
}

