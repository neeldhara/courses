import type { DocsSidebarNavData } from "../types/configDataTypes";

/**
 * Combined sidebar navigation data for the English locale
 * Updated for course documentation with Notes/Assessments/Editions structure
 */
const sidebarNavData: DocsSidebarNavData = {
  /**
   * Course documentation tabs configuration
   * These define the different top-level documentation section tabs
   */
  tabs: [
    {
      // "notes" is the default tab keyword (replacing "main")
      id: "notes",
      title: "Notes",
      description: "Course notes and materials",
      icon: "tabler/file-text",
      // Ordered list of sidebar sections for the 'notes' tab
      // The "id" of each section should match a folder in the docs content collection
      sections: [
        {
          id: "getting-started",
          title: "Getting Started",
        },
        {
          id: "components",
          title: "Components",
        },
        {
          id: "reference",
          title: "Reference",
        },
      ],
    },
    {
      id: "assessments",
      title: "Assessments",
      description: "Assignments, quizzes, and exams",
      icon: "tabler/edit-circle",
      // Ordered list of sidebar sections for the 'assessments' tab
      sections: [
        {
          id: "endpoints",
          title: "Endpoints",
        },
        {
          id: "authentication",
          title: "Authentication",
        },
      ],
    },
    {
      id: "editions",
      title: "Editions",
      description: "Course editions and archives",
      icon: "tabler/stack-2",
      // Ordered list of sidebar sections for the 'editions' tab
      sections: [
        {
          id: "tips-and-tricks",
          title: "Tips and Tricks",
        },
      ],
    },
  ],
};

export default sidebarNavData;
