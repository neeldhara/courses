import { getCollection } from "astro:content";

import { defaultLocale, locales, siteSettings } from "@/docs/config/siteSettings.json";
import type { DocsSection, DocsSidebarNavData, DocsTab } from "@/docs/config/types/configDataTypes";

import { filterCollectionByLanguage } from "./localeUtils";
import { getTranslatedData } from "./translationUtils";

type LocaleType = (typeof locales)[number];

export const docsRoute = (siteSettings.docsRoute || "docs").replace(/^\/|\/$/g, "");

// Cache for translated tab data to avoid repeated data fetching
const tabCache = new Map<LocaleType, DocsTab[]>();

/**
 * Get translated tabs data with caching
 */
const getTranslatedTabs = (locale: LocaleType): DocsTab[] => {
  if (!tabCache.has(locale)) {
    tabCache.set(locale, getTranslatedData("sidebarNavData", locale).tabs);
  }
  return tabCache.get(locale)!;
};

/**
 * Get tab by ID
 */
export const getTabById = (tabId: string, locale: LocaleType): DocsTab | undefined => {
  return getTranslatedTabs(locale).find((tab) => tab.id === tabId);
};

/**
 * Get sections for a specific tab
 */
export const getTabSections = (tabId: string, locale: LocaleType): DocsSection[] => {
  const tab = getTabById(tabId, locale);
  return tab?.sections || [];
};

/**
 * Get an array of section IDs in the order they should appear in navigation for a specific tab
 */
export const getOrderedSectionIds = (tabId: string, locale: LocaleType): string[] => {
  return getTabSections(tabId, locale).map((section) => section.id);
};

/**
 * Get the section details by ID within a specific tab
 */
export const getSectionById = (
  sectionId: string,
  tabId: string,
  locale: LocaleType,
): DocsSection | undefined => {
  return getTabSections(tabId, locale).find((section) => section.id === sectionId);
};

/**
 * Get the title for a documentation section
 */
export const getSectionTitle = (sectionId: string, tabId: string, locale: LocaleType): string => {
  const section = getSectionById(sectionId, tabId, locale);
  if (section?.title) return section.title;

  // Fallback to title case if section not found
  return sectionId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Get the previous and next pages for a given doc id
 */
export const getAdjacentPages = async (currentId: string, locale: LocaleType, tabId: string) => {
  // Get all non-draft docs
  const allDocs = await getCollection("docs", ({ data }) => {
    return data.draft !== true;
  });

  // Filter docs by locale
  let filteredDocs = filterCollectionByLanguage(allDocs, locale);

  // Filter by tab if tabId is provided
  if (tabId) {
    filteredDocs = filteredDocs.filter((doc) => doc.data.tab === tabId);
  }

  // Get tab details
  const tab = getTabById(tabId, locale);

  // Get ordered section IDs for this tab and create a Map for faster lookups
  const orderedSectionIds = tab ? getOrderedSectionIds(tabId, locale) : [];
  const sectionIndexMap = new Map(orderedSectionIds.map((id, index) => [id, index]));

  // Sort docs by section order and then by sidebar order
  const sortedDocs = filteredDocs.sort((a, b) => {
    const [aSection] = a.id.split("/");
    const [bSection] = b.id.split("/");

    // Get section indices
    const aSectionIndex = sectionIndexMap.get(aSection) ?? -1;
    const bSectionIndex = sectionIndexMap.get(bSection) ?? -1;

    // If sections are different, sort by section order
    if (aSectionIndex !== bSectionIndex) {
      return aSectionIndex - bSectionIndex;
    }

    // If in same section, sort by sidebar order if available
    const aOrder = a.data.sidebar?.order;
    const bOrder = b.data.sidebar?.order;

    if (aOrder !== undefined && bOrder !== undefined) {
      return aOrder - bOrder;
    }

    // If only one has order, it should come first
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;

    // If neither has order, sort by title
    return a.data.title.localeCompare(b.data.title, locale);
  });

  // Find the current doc's index
  const currentIndex = sortedDocs.findIndex((doc) => doc.id === currentId);

  return {
    prev:
      currentIndex > 0
        ? {
            slug: sortedDocs[currentIndex - 1].id,
            title:
              sortedDocs[currentIndex - 1].data.sidebar?.label ||
              sortedDocs[currentIndex - 1].data.title,
          }
        : null,
    next:
      currentIndex < sortedDocs.length - 1
        ? {
            slug: sortedDocs[currentIndex + 1].id,
            title:
              sortedDocs[currentIndex + 1].data.sidebar?.label ||
              sortedDocs[currentIndex + 1].data.title,
          }
        : null,
  };
};

// Type definitions for sidebar data processing
export type TabContent = {
  id: string;
  sections: string[];
  tabSections: Record<string, Array<{ text: string; link: string; order?: number; badge?: any }>>;
};

type DocLink = {
  text: string;
  link: string;
  order?: number;
  badge?: { text: string; variant: "tip" | "caution" | "danger" | "info" };
};

/**
 * Process tab content for all tabs - generates structured data for displaying sidebar tabs
 * @param sidebarTabs All available sidebar tabs
 * @param filteredDocs Filtered document collection for the current locale
 * @param currLocale Current locale
 * @returns Array of processed tab content objects
 */
export const processTabsContent = async (
  sidebarTabs: any[],
  filteredDocs: any[],
  currLocale: LocaleType,
): Promise<TabContent[]> => {
  if (!sidebarTabs || sidebarTabs.length <= 1) return [];

  const tabsContent: TabContent[] = [];

  for (const tab of sidebarTabs) {
    // For each tab, get its specific documents
    const tabSections = filteredDocs
      .filter((doc) => doc.data.tab === tab.id)
      .reduce((acc, doc) => {
        // Get the top-level directory from the doc.id
        const [section] = doc.id.split("/");
        if (!acc[section]) {
          acc[section] = [];
        }

        acc[section].push({
          text: doc.data.sidebar?.label ? doc.data.sidebar.label : doc.data.title,
          link: `/${docsRoute}/${doc.id}`,
          order: doc.data.sidebar?.order,
          badge: doc.data.sidebar?.badge,
        });
        return acc;
      }, {});

    // Get the tab config to get ordered sections
    const tabConfig = getTabById(tab.id, currLocale);
    const tabConfigSections = tabConfig?.sections || [];

    // Sort sections for this tab
    const tabSectionKeys = Object.keys(tabSections);
    const orderedTabSectionIds = tabConfigSections.map((section) => section.id);
    const tabSectionIndexMap = new Map(orderedTabSectionIds.map((id, index) => [id, index]));

    const sortedTabSections = tabSectionKeys.sort((a, b) => {
      const aIndex = tabSectionIndexMap.get(a) ?? -1;
      const bIndex = tabSectionIndexMap.get(b) ?? -1;

      if (aIndex === -1 && bIndex === -1) {
        return getSectionTitle(a, tab.id, currLocale).localeCompare(
          getSectionTitle(b, tab.id, currLocale),
          currLocale,
        );
      }

      return aIndex === -1 ? 1 : bIndex === -1 ? -1 : aIndex - bIndex;
    });

    // Sort documents within each section for this tab
    for (const section of sortedTabSections) {
      if (tabSections[section]) {
        tabSections[section].sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          return a.text.localeCompare(b.text, currLocale, { sensitivity: "base", numeric: true });
        });
      }
    }

    tabsContent.push({
      id: tab.id,
      sections: sortedTabSections,
      tabSections: tabSections,
    });
  }

  return tabsContent;
};

/**
 * Generate first page URLs for each tab
 * @param sidebarTabs All available sidebar tabs
 * @param filteredDocs Filtered document collection for the current locale
 * @param currLocale Current locale
 * @returns Map of tab IDs to their first page URLs
 */
export const getFirstPagesMap = async (
  sidebarTabs: any[],
  filteredDocs: any[],
  currLocale: LocaleType,
): Promise<Map<string, string>> => {
  const firstPagesMap = new Map<string, string>();

  if (!sidebarTabs) return firstPagesMap;

  // For each tab (documentation section)
  for (const tab of sidebarTabs) {
    // Get all docs for this tab section
    const tabDocs = filteredDocs.filter((doc) => doc.data.tab === tab.id);

    // Get the sections for this tab in their configured order
    const tabSections = getTabSections(tab.id, currLocale);

    // If we have configured sections and docs
    if (tabSections && tabSections.length > 0 && tabDocs.length > 0) {
      let firstPageFound = false;

      // For each section in the config order
      for (const section of tabSections) {
        // Find docs in this section (top-level directory) and index file
        const sectionDocs = tabDocs.filter((doc) => doc.id.startsWith(section.id + "/"));

        // Find index files in this section (doc.id == section.id, like 'getting-started/index')
        const indexDoc = tabDocs.find(
          (doc) => doc.id === section.id || doc.id === `${section.id}/index`,
        );

        // If we have an index doc, use that as the first page
        if (indexDoc) {
          const firstPageUrl = `/${docsRoute}/${indexDoc.id}`;
          firstPagesMap.set(tab.id, firstPageUrl);
          firstPageFound = true;
          break; // Exit loop once we've found the first page
        }
        // If we have other docs in this section
        else if (sectionDocs.length > 0) {
          // Sort the docs within this section
          const sortedSectionDocs = [...sectionDocs].sort((a, b) => {
            // If both have order, sort by order
            if (a.data.sidebar?.order !== undefined && b.data.sidebar?.order !== undefined) {
              return a.data.sidebar.order - b.data.sidebar.order;
            }

            // If only one has order, it comes first
            if (a.data.sidebar?.order !== undefined) return -1;
            if (b.data.sidebar?.order !== undefined) return 1;

            // If neither has order, sort by title
            return a.data.title.localeCompare(b.data.title);
          });

          // Use the first doc from the first section that has docs
          const firstPageUrl = `/${docsRoute}/${sortedSectionDocs[0].id}`;
          firstPagesMap.set(tab.id, firstPageUrl);
          firstPageFound = true;
          break; // Exit loop once we've found the first page
        }
      }

      // If no docs found in any section, fall back to generic approach
      if (!firstPageFound) {
        // Sort all tab docs as a fallback
        const sortedDocs = [...tabDocs].sort((a, b) => {
          // If both have order, sort by order
          if (a.data.sidebar?.order !== undefined && b.data.sidebar?.order !== undefined) {
            return a.data.sidebar.order - b.data.sidebar.order;
          }

          // If only one has order, it comes first
          if (a.data.sidebar?.order !== undefined) return -1;
          if (b.data.sidebar?.order !== undefined) return 1;

          // If neither has order, sort by title
          return a.data.title.localeCompare(b.data.title);
        });

        if (sortedDocs.length > 0) {
          const firstPageUrl = `/${docsRoute}/${sortedDocs[0].id}`;
          firstPagesMap.set(tab.id, firstPageUrl);
        } else {
          // Fallback to section base route if no docs
          firstPagesMap.set(tab.id, `/${docsRoute}`);
        }
      }
    } else if (tabDocs.length > 0) {
      // No sections configured but we have docs
      // Use standard sorting logic as fallback
      const sortedDocs = [...tabDocs].sort((a, b) => {
        // If both have order, sort by order
        if (a.data.sidebar?.order !== undefined && b.data.sidebar?.order !== undefined) {
          return a.data.sidebar.order - b.data.sidebar.order;
        }

        // If only one has order, it comes first
        if (a.data.sidebar?.order !== undefined) return -1;
        if (b.data.sidebar?.order !== undefined) return 1;

        // If neither has order, sort by title
        return a.data.title.localeCompare(b.data.title);
      });

      const firstPageUrl = `/${docsRoute}/${sortedDocs[0].id}`;
      firstPagesMap.set(tab.id, firstPageUrl);
    } else {
      // No docs and no sections or empty sections
      firstPagesMap.set(tab.id, `/${docsRoute}`);
    }
  }

  return firstPagesMap;
};

/**
 * Process documents by section for the current tab
 * @param sectionFilteredDocs Documents filtered to the current section
 * @param currLocale Current locale
 * @param sectionId Current section ID
 * @returns Object with documents grouped by section
 */
export const processDocsBySection = (
  sectionFilteredDocs: any[],
  currLocale: LocaleType,
  sectionId: string,
): {
  docsBySection: Record<string, DocLink[]>;
  sections: string[];
} => {
  // Group docs by their top-level directory
  const docsBySection = sectionFilteredDocs.reduce(
    (acc, doc) => {
      // Get the top-level directory from the doc.id
      const [section] = doc.id.split("/");
      if (!acc[section]) {
        acc[section] = [];
      }

      acc[section].push({
        text: doc.data.sidebar?.label ? doc.data.sidebar.label : doc.data.title,
        link: `/${docsRoute}/${doc.id}`,
        order: doc.data.sidebar?.order,
        badge: doc.data.sidebar?.badge,
      });
      return acc;
    },
    {} as Record<string, DocLink[]>,
  );

  // Get the current tab configuration
  const currentTab = getTabById(sectionId, currLocale);
  const currentTabSections = currentTab?.sections || [];

  // Get ordered section IDs and create a Map for faster lookups
  const orderedSectionIds = currentTabSections.map((section) => section.id);
  const sectionIndexMap = new Map(orderedSectionIds.map((id, index) => [id, index]));

  // Sort sections according to the config order
  const sections = Object.keys(docsBySection).sort((a, b) => {
    const aIndex = sectionIndexMap.get(a) ?? -1;
    const bIndex = sectionIndexMap.get(b) ?? -1;

    // If neither section is in the config, sort by translated titles
    if (aIndex === -1 && bIndex === -1) {
      return getSectionTitle(a, sectionId, currLocale).localeCompare(
        getSectionTitle(b, sectionId, currLocale),
        currLocale,
      );
    }

    // Prioritize configured sections over unconfigured ones
    return aIndex === -1 ? 1 : bIndex === -1 ? -1 : aIndex - bIndex;
  });

  // Sort docs within each section
  for (const section of sections) {
    docsBySection[section].sort((a, b) => {
      // If both items have an order, sort by order
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }

      // If only one has an order, it should come first
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;

      // If neither has an order, sort alphabetically
      return a.text.localeCompare(b.text, currLocale, {
        sensitivity: "base",
        numeric: true,
      });
    });
  }

  return { docsBySection, sections };
};

/**
 * Initialize sidebar tabs with interactive behavior
 */
export function initSidebarTabs(): void {
  const tabButtons = document.querySelectorAll('button[role="tab"]');
  if (tabButtons.length === 0) return;

  // Add click event handlers to all tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const sectionId = button.getAttribute("data-section-id");
      if (!sectionId) return;

      // Update tab button states
      tabButtons.forEach((tab) => {
        tab.setAttribute(
          "aria-selected",
          (tab.getAttribute("data-section-id") === sectionId).toString(),
        );
      });

      // Show the selected panel and hide others
      document.querySelectorAll('div[role="tabpanel"]').forEach((panel) => {
        const isForSection =
          panel.id === `${sectionId}-content` ||
          panel.getAttribute("aria-labelledby") === `tab-${sectionId}`;
        panel.setAttribute("data-state", isForSection ? "active" : "inactive");
      });
    });
  });
}
