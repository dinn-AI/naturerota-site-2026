import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

const projectId = (import.meta.env.PUBLIC_SANITY_PROJECT_ID as string) || '';
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string) || 'production';
const apiVersion = (import.meta.env.PUBLIC_SANITY_API_VERSION as string) || '2024-01-01';
const token = (import.meta.env.SANITY_API_TOKEN as string) || '';

if (!projectId) {
  throw new Error('PUBLIC_SANITY_PROJECT_ID não está configurado nas variáveis de ambiente');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Usa CDN para produção
  token, // Token opcional para leitura/escrita
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

