import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "notes",
      title: "Notes",
      description: "Course notes for Foundations of AI MultiAgent Systems",
      icon: "tabler/file-text",
      sections: [
        {
          id: "games",
          title: "Games",
        },
        {
          id: "resources",
          title: "Resources",
        },
      ],
    },
    {
      id: "assessments",
      title: "Assessments",
      description: "Assessments for Foundations of AI MultiAgent Systems",
      icon: "tabler/edit-circle",
      sections: [
        {
          id: "games",
          title: "Games",
        },
      ],
    },
    {
      id: "editions",
      title: "Editions",
      description: "Course editions",
      icon: "tabler/stack-2",
      sections: [
        {
          id: "current",
          title: "Current Edition",
        },
        {
          id: "archive",
          title: "Previous Editions",
        },
      ],
    },
  ],
};

export default sidebarNavData;
