"use client";
import React from "react";

interface SocialLinkProps {
  platform: "youtube" | "instagram";
  url: string;
  className?: string;
  children: React.ReactNode;
}

export default function SocialLink({ platform, url, className, children }: SocialLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Detecta se é mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      e.preventDefault();
      
      let appUrl = "";
      
      if (platform === "youtube") {
        // Extrai o username/channel do URL
        const match = url.match(/@([^/?]+)/);
        const username = match ? match[1] : "";
        
        if (username) {
          appUrl = `youtube://www.youtube.com/@${username}`;
        } else if (url.includes("playlist")) {
          // Para playlists, usa o URL completo
          appUrl = url.replace("https://", "youtube://");
        } else {
          appUrl = "youtube://";
        }
      } else if (platform === "instagram") {
        // Extrai o username do URL
        const match = url.match(/instagram\.com\/([^/?]+)/);
        const username = match ? match[1] : "naturerota";
        appUrl = `instagram://user?username=${username}`;
      }
      
      // Tenta abrir o app
      window.location.href = appUrl;
      
      // Fallback para navegador após 1.5s se o app não abrir
      setTimeout(() => {
        window.open(url, "_blank");
      }, 1500);
    }
  };
  
  return (
    <a
      href={url}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

