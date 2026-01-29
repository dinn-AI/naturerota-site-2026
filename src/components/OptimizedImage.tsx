/**
 * Componente React para imagens otimizadas com AVIF e fallback
 * 
 * Automaticamente serve AVIF quando disponível, com fallback para formato original.
 * Preserva todos os atributos HTML padrão de <img>.
 * 
 * Uso:
 *   <OptimizedImage 
 *     src="/IMG_2316.jpg" 
 *     alt="Descrição" 
 *     className="w-full"
 *     loading="lazy"
 *   />
 */

import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Converte o src original para o caminho AVIF
 * Ex: /IMG_2316.jpg -> /avif/public/IMG_2316.avif
 */
function getAvifPath(originalSrc: string): string {
  const pathWithoutExtension = originalSrc.replace(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/i, '');
  return `/avif/public${pathWithoutExtension}.avif`;
}

export default function OptimizedImage({ src, alt, ...rest }: OptimizedImageProps) {
  const avifSrc = getAvifPath(src);

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrc} />
      <img src={src} alt={alt} {...rest} />
    </picture>
  );
}
