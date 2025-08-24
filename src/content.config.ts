import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

import { locales } from "@/docs/config/siteSettings.json";
import type { DocsTab } from "@/docs/config/types/configDataTypes";
import { getTranslatedData } from "@/docs/js/translationUtils";

// Extract all unique section IDs from all tabs in all locales
const allTabIds = new Set<string>();

// For each configured locale
for (const locale of locales) {
  // Get translated sidebar data for this locale
  const sidebarData = getTranslatedData("sidebarNavData", locale);

  // For each tab in this locale's data
  if (sidebarData.tabs) {
    sidebarData.tabs.forEach((tab: DocsTab) => {
      // Add the tab ID itself as a valid section
      allTabIds.add(tab.id);
    });
  }
}

// Add course-specific tab IDs that might not be in the main docs config
const courseSpecificTabs = ["short-courses", "workshops", "other", "games"];
courseSpecificTabs.forEach(tabId => allTabIds.add(tabId));

// Convert Set to Array for z.enum
const tabIds = [...allTabIds].length > 0 ? [...allTabIds] : ["notes"];

// Schema for course documents
const courseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    // Tab field is used to associate individual docs with specific tabs
    tab: z.enum(tabIds as [string, ...string[]]).default("notes"),
    sidebar: z
      .object({
        label: z.string().optional(),
        order: z.number().optional(),
        badge: z
          .object({
            text: z.string(),
            variant: z.enum(["note", "tip", "caution", "danger", "info"]).default("note"),
          })
          .optional(),
      })
      .optional(),
    tableOfContents: z
      .object({
        minHeadingLevel: z.number().min(1).max(6).optional(),
        maxHeadingLevel: z.number().min(1).max(6).optional(),
      })
      .optional(),
    summary: z
      .object({
        title: z.string().optional(),
        content: z.string().optional(),
        items: z.array(z.string()).optional(),
        variant: z.enum(["default", "info", "tip", "warning"]).optional(),
      })
      .optional(),
    pagefind: z.boolean().optional(),
    mappingKey: z.string().optional(),
    draft: z.boolean().optional(),
  });

// Main docs collection
const docsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*{md,mdx}", base: "./src/docs/data/docs" }),
  schema: courseSchema,
});

// Course collections
const funCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/fun/data/docs" }),
  schema: courseSchema,
});

const masCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/mas/data/docs" }),
  schema: courseSchema,
});

const mfaiCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/mfai/data/docs" }),
  schema: courseSchema,
});

const dmCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/dm/data/docs" }),
  schema: courseSchema,
});

const dsaCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/dsa/data/docs" }),
  schema: courseSchema,
});

const fptCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/fpt/data/docs" }),
  schema: courseSchema,
});

const cpCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/cp/data/docs" }),
  schema: courseSchema,
});

const magicCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/magic/data/docs" }),
  schema: courseSchema,
});

const advalgoCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/advalgo/data/docs" }),
  schema: courseSchema,
});

const combinatoricsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/combinatorics/data/docs" }),
  schema: courseSchema,
});

const linalgCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/linalg/data/docs" }),
  schema: courseSchema,
});

const comsocCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/comsoc/data/docs" }),
  schema: courseSchema,
});

const miscCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*/*.mdx", base: "./src/misc/data/docs" }),
  schema: courseSchema,
});

export const collections = {
  docs: docsCollection,
  fun: funCollection,
  mas: masCollection,
  mfai: mfaiCollection,
  dm: dmCollection,
  dsa: dsaCollection,
  fpt: fptCollection,
  cp: cpCollection,
  magic: magicCollection,
  advalgo: advalgoCollection,
  combinatorics: combinatoricsCollection,
  linalg: linalgCollection,
  comsoc: comsocCollection,
  misc: miscCollection,
};
