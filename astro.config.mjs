// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://cmudsc.com',
  base: '/archive/pokerai-2025',
  integrations: [tailwind()]
});