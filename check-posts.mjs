import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌ Variáveis de ambiente não configuradas!');
  console.error('Certifique-se de ter um arquivo .env com:');
  console.error('  PUBLIC_SANITY_PROJECT_ID=seu_project_id');
  console.error('  SANITY_API_TOKEN=seu_token');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

console.log('🔍 Verificando posts publicados no Sanity...\n');

try {
  // Buscar posts publicados
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "hasImage": defined(mainImage.asset)
    }`
  );
  
  console.log(`✅ Total de posts encontrados: ${posts.length}\n`);
  
  if (posts.length === 0) {
    console.log('⚠️  Nenhum post encontrado!');
    console.log('Certifique-se de que você:');
    console.log('  1. Criou posts no Sanity Studio');
    console.log('  2. Clicou no botão "Publish" em cada post');
    console.log('  3. Preencheu os campos obrigatórios (título, slug, imagem)');
  } else {
    console.log('📝 Posts publicados:\n');
    posts.forEach((post, i) => {
      const date = new Date(post.publishedAt).toLocaleDateString('pt-BR');
      const hasImage = post.hasImage ? '✅' : '❌';
      const hasSlug = post.slug ? '✅' : '❌';
      
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   Slug: ${hasSlug} ${post.slug?.current || 'FALTANDO'}`);
      console.log(`   Imagem: ${hasImage}`);
      console.log(`   Data: ${date}`);
      console.log('');
    });
    
    // Verificar os 3 mais recentes (que aparecem na home)
    console.log('🏠 Posts que devem aparecer na HOME (3 mais recentes):\n');
    posts.slice(0, 3).forEach((post, i) => {
      console.log(`   ${i + 1}. ${post.title}`);
    });
  }
  
} catch (error) {
  console.error('❌ Erro ao buscar posts:', error.message);
  process.exit(1);
}

