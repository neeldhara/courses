import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "notes",
      title: "Notes",
      description: "Course notes for Fun with Math and Computing",
      icon: "tabler/file-text",
      sections: [
        {
          id: "01-binary-numbers",
          title: "Binary Numbers",
        },
        {
          id: "02-beyond-binary",
          title: "Beyond Binary",
        },
        {
          id: "03-intro-to-search",
          title: "Intro to Search",
        },
        {
          id: "04-error-detection",
          title: "Error Detection",
        },
        {
          id: "05-sorting-basics",
          title: "Sorting Basics",
        },
        {
          id: "06-sorting-revisited",
          title: "Sorting Revisited",
        },
        {
          id: "07-ranking-algorithms",
          title: "Ranking Algorithms",
        },
        {
          id: "08-arrows-theorem",
          title: "Arrow's Theorem",
        },
      ],
    },
    {
      id: "assessments",
      title: "Assessments",
      description: "Assessments for Fun with Math and Computing",
      icon: "tabler/edit-circle",
      sections: [
        {
          id: "assignments",
          title: "Assignments",
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
