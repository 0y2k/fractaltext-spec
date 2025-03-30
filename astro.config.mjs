import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "FractalText",
      logo: {
        src: "./public/favicon.svg",
      },
      social: {
        github: "https://github.com/0y2k/fractaltext-spec",
      },
      sidebar: [
        {
          slug: "spec",
          translations: {
            en: "Specification",
            ja: "仕様",
          },
        },
      ],
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
        },
        ja: {
          label: "日本語",
        },
      },
    }),
  ],
  redirects: {
    "/": "/en",
  },
});
