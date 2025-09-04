import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import expressiveCode, { createInlineSvgUrl } from "astro-expressive-code";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// tabler icons "clipboard-check"
const copySvg = createInlineSvgUrl(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 14l2 2l4 -4" /></svg>`,
);

// https://astro.build/config
export default defineConfig({
  site: "https://neeldhara.courses",
  redirects: {
    '/advalgo/notes/01-greedy-algorithms/': '/advalgo/notes/01-greedy-algorithms/a-generic-problem',
    '/advalgo/assessments/01-greedy-algorithms/': '/advalgo/assessments/01-greedy-algorithms/a-generic-problem',
    '/mas/notes/resources': '/mas/notes/resources/references',
  },
  // i18n configuration must match src/docs/config/translationData.json.ts
  i18n: {
    defaultLocale: "en",  
    locales: ["en", "fr"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    // auto-imported component into all mdx files
    AutoImport({
      imports: [
        // https://github.com/delucis/astro-auto-import
        "@/docs/components/mdx-components/Aside.astro",
        "@/docs/components/mdx-components/Badge.astro",
        "@/docs/components/mdx-components/Button.astro",
        "@/docs/components/mdx-components/Steps.astro",
        "@/docs/components/mdx-components/Tabs.astro",
        "@/docs/components/mdx-components/TabsContent.astro",
        "@/docs/components/mdx-components/TabsList.astro",
        "@/docs/components/mdx-components/TabsTrigger.astro",
        "@/docs/components/mdx-components/Sidenote.astro",
        "@/docs/components/mdx-components/SidenoteBlock.astro",
        "@/docs/components/mdx-components/MarginNote.astro",
        // Tooltip components
        "@/docs/components/starwind/tooltip/Tooltip.astro",
        "@/docs/components/starwind/tooltip/TooltipContent.astro",
        "@/docs/components/starwind/tooltip/TooltipTrigger.astro",
        // Course-specific components
        "@/mas/components/NimGameTree.tsx",
      ],
    }),
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ["dracula"],
      styleOverrides: {
        codeBackground: "var(--expressive-code-bg)",
        borderColor: "var(--expressive-code-bg)",
        // borderColor: "var(--color-base-800)",
        borderRadius: "var(--radius-md)",
        uiFontFamily: "inherit",
        codeFontFamily: "var(--font-mono)",
        frames: {
          copyIcon: copySvg,
          editorActiveTabBackground: "var(--expressive-code-bg)",
          editorTabBarBackground: "var(--expressive-code-bg-darker)",
          editorBackground: "var(--expressive-code-bg)",
          terminalBackground: "var(--expressive-code-bg)",
          terminalTitlebarBackground: "var(--expressive-code-bg-darker)",
          frameBoxShadowCssValue: "0",
          tooltipSuccessBackground: "var(--success)",
          tooltipSuccessForeground: "var(--success-foreground)",
        },
      },
      defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,
        // But enable line numbers for certain languages
        overridesByLang: {
          "js,ts,html,astro": {
            showLineNumbers: true,
          },
        },
      },
    }),
    mdx(),
    icon(),
    sitemap(),
    compress({
      HTML: true,
      JavaScript: true,
      CSS: false,
      Image: false, // astro:assets handles this. Enabling this can dramatically increase build times
      SVG: false, // astro-icon handles this
    }),
  ],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  
  vite: {
    plugins: [tailwindcss()],
    // stop inlining short scripts to fix issues with ClientRouter
    build: {
      assetsInlineLimit: 0,
    },
  },
});
