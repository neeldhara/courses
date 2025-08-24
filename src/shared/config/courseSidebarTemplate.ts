import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

/**
 * Course sidebar navigation template
 * This template is used for all course sites with Notes/Assessments/Editions structure
 */
export const getCourseSidebarData = (courseName: string, courseTitle: string): DocsSidebarNavData => ({
  tabs: [
    {
      // "notes" is the default tab for course content
      id: "notes",
      title: "Notes",
      description: `Course notes for ${courseTitle}`,
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
      description: `Assessments and exercises for ${courseTitle}`,
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
      description: `Previous editions of ${courseTitle}`,
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
});

// Course metadata
export const courseMetadata = {
  fun: {
    shortName: "fun",
    fullName: "Fun with Math and Computing",
    type: "NPTEL",
  },
  mas: {
    shortName: "mas",
    fullName: "Foundations of AI MultiAgent Systems",
    type: "IITGN Core",
  },
  mfai: {
    shortName: "mfai",
    fullName: "Mathematical Foundations of AI",
    type: "IITGN Core",
  },
  dm: {
    shortName: "dm",
    fullName: "Discrete Mathematics",
    type: "IITGN Core",
  },
  dsa: {
    shortName: "dsa",
    fullName: "Data Structures and Algorithms",
    type: "IITGN Core",
  },
  fpt: {
    shortName: "fpt",
    fullName: "Parameterized Algorithms",
    type: "NPTEL",
  },
  cp: {
    shortName: "cp",
    fullName: "Competitive Programming",
    type: "NPTEL",
  },
  magic: {
    shortName: "magic",
    fullName: "Math with Cards",
    type: "Swayam Prabha",
  },
  advalgo: {
    shortName: "advalgo",
    fullName: "Advanced Algorithms",
    type: "IIT Madras",
  },
  combinatorics: {
    shortName: "combinatorics",
    fullName: "Combinatorics with Applications in Computer Science",
    type: "IITGN Elective",
  },
  linalg: {
    shortName: "linalg",
    fullName: "Linear Algebraic Methods in Combinatorics",
    type: "IITGN Elective",
  },
  comsoc: {
    shortName: "comsoc",
    fullName: "Computational Social Choice",
    type: "IITGN Elective",
  },
};
