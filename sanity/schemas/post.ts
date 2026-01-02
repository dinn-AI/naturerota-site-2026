import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo/Descrição (SEO)',
      type: 'text',
      description: 'Usado para meta description e previews sociais',
      validation: (Rule) => Rule.max(160).warning('Recomendado: máximo de 160 caracteres para SEO'),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'blockContent',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL do YouTube',
      type: 'url',
      description: 'URL completa do vídeo do YouTube (ex: https://www.youtube.com/watch?v=VIDEO_ID)',
    }),
    defineField({
      name: 'youtubeVideoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'ID do vídeo do YouTube (extraído automaticamente ou inserido manualmente)',
    }),
    defineField({
      name: 'relatedProductUrl',
      title: 'URL do Infoproduto Relacionado',
      type: 'url',
      description: 'Link para página de infoproduto relacionado ao conteúdo',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action (CTA)',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Texto do CTA',
          description: 'Ex: "Compre Agora", "Assista no YouTube"',
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL do CTA',
        },
        {
          name: 'type',
          type: 'string',
          title: 'Tipo de CTA',
          options: {
            list: [
              { title: 'Produto', value: 'product' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'Página', value: 'page' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `por ${author}` };
    },
  },
});

