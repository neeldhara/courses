import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "notes",
      title: "Notes",
      description: "Course notes for Linear Algebraic Methods in Combinatorics",
      icon: "tabler/file-text",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
        },
        {
          id: "modules",
          title: "Modules",
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
      description: "Assessments for Linear Algebraic Methods in Combinatorics",
      icon: "tabler/edit-circle",
      sections: [
        {
          id: "assignments",
          title: "Assignments",
        },
        {
          id: "quizzes",
          title: "Quizzes",
        },
        {
          id: "exams",
          title: "Exams",
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
