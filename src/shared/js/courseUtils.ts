import { getCollection } from "astro:content";
import { courseRoutes } from '@/shared/config/courseRouting';
import { filterCollectionByLanguage } from '@/docs/js/localeUtils';
import { defaultLocale } from '@/docs/config/siteSettings.json';

/**
 * Get the previous and next pages for a given course page
 */
export const getCourseAdjacentPages = async (currentId: string, courseId: string, tabId: string) => {
  // Import the sidebar navigation data for this course
  let sidebarNavData;
  try {
    sidebarNavData = await import(`../../${courseId}/config/en/sidebarNavData.json.ts`);
  } catch (error) {
    console.warn(`Could not load sidebar data for course ${courseId}:`, error);
    return { prev: null, next: null };
  }

  const sidebarTabs = sidebarNavData?.default?.tabs || [];
  
  // Find the current tab
  const currentTab = sidebarTabs.find((tab: any) => tab.id === tabId);
  if (!currentTab) {
    return { prev: null, next: null };
  }

  // Get all docs for this course and tab
  try {
    const allDocs = await getCollection(courseId as any, ({ data, id }) => {
      return data.draft !== true && data.tab === tabId;
    });

    // Filter by locale and strip the locale prefix from IDs so they match currentId
    const filteredDocs = filterCollectionByLanguage(allDocs as any[], defaultLocale);

    // Create a flat list of pages in order based on sidebar structure
    const orderedPages: Array<{id: string, title: string, slug: string}> = [];
    
    for (const section of currentTab.sections || []) {
      // Find all docs in this section within the current tab
      const sectionDocs = filteredDocs.filter((doc: any) => {
        const pathParts = doc.id.split('/');
        // For docs like "notes/games/strategies" in course collections after locale is stripped
        // We want to match the tab (notes) and section (games)
        if (pathParts.length >= 2) {
          const docTab = pathParts[0];
          const sectionId = pathParts[1];
          return docTab === tabId && sectionId === section.id;
        }
        return false;
      });

      // Sort docs within section by sidebar order, then alphabetically
      sectionDocs.sort((a: any, b: any) => {
        const aOrder = a.data.sidebar?.order;
        const bOrder = b.data.sidebar?.order;

        if (aOrder !== undefined && bOrder !== undefined) {
          return aOrder - bOrder;
        }
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return (a.data.sidebar?.label || a.data.title).localeCompare(
          b.data.sidebar?.label || b.data.title,
        );
      });

      // Add to ordered list
      for (const doc of sectionDocs) {
        const pathParts = doc.id.split('/');
        // Generate slug like "games/strategies" from "notes/games/strategies" (no locale prefix)
        // Skip the first part (tab) to get "games/strategies"
        let slug = pathParts.slice(1).join('/');
        // Normalize any trailing "/index"
        slug = slug.replace(/\/index$/, '').replace(/^index$/, '');
        orderedPages.push({
          id: doc.id, // e.g. "notes/games/strategies"
          title: doc.data.sidebar?.label || doc.data.title,
          slug,
        });
      }
    }

    // Find current page index
    const currentIndex = orderedPages.findIndex(page => page.id === currentId);
    
    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    return {
      prev: currentIndex > 0 ? {
        slug: orderedPages[currentIndex - 1].slug,
        title: orderedPages[currentIndex - 1].title
      } : null,
      next: currentIndex < orderedPages.length - 1 ? {
        slug: orderedPages[currentIndex + 1].slug,
        title: orderedPages[currentIndex + 1].title
      } : null
    };

  } catch (error) {
    console.warn(`Error getting adjacent pages for course ${courseId}:`, error);
    return { prev: null, next: null };
  }
};
