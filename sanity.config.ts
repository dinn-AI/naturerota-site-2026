import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || '12wgha1o';
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Naturerota Blog',

  projectId,
  dataset,

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});

