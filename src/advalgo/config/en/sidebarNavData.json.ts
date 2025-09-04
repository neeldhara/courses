import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "notes",
      title: "Notes",
      description: "Course notes for Advanced Algorithms",
      icon: "tabler/file-text",
      sections: [
        {
          id: "01-greedy-algorithms",
          title: "Greedy Algorithms",
        },
        {
          id: "02-reductions-i-flows",
          title: "Reductions I: Flows",
        },
        {
          id: "03-reductions-ii-hardness",
          title: "Reductions II: Hardness",
        },
        {
          id: "04-interlude",
          title: "Interlude: Complexity",
        },
        {
          id: "05-randomized-algorithms",
          title: "Randomized Algorithms",
        },
        {
          id: "06-approximation-algorithms",
          title: "Approximation Algorithms",
        },
        {
          id: "07-parameterized-algorithms",
          title: "Parameterized Algorithms",
        },
        {
          id: "08-exact-algorithms",
          title: "Exact Algorithms",
        },
        {
          id: "09-parameterized-approximation",
          title: "Parameterized Approximation",
        },
        {
          id: "10-randomized-techniques-for-parameterized-algorithms",
          title: "Randomized FPT Techniques",
        },
        {
          id: "11-randomized-approximation",
          title: "Randomized Approximation",
        },
        {
          id: "12-hardness",
          title: "Hardness",
        },
      ],
    },
    {
      id: "assessments",
      title: "Assessments",
      description: "Assessments for Advanced Algorithms",
      icon: "tabler/edit-circle",
      sections: [
        {
          id: "01-greedy-algorithms",
          title: "Greedy Algorithms",
        },
        {
          id: "02-reductions-i-flows",
          title: "Reductions I: Flows",
        },
        {
          id: "03-reductions-ii-hardness",
          title: "Reductions II: Hardness",
        },
        {
          id: "04-interlude",
          title: "Interlude: Complexity",
        },
        {
          id: "05-randomized-algorithms",
          title: "Randomized Algorithms",
        },
        {
          id: "06-approximation-algorithms",
          title: "Approximation Algorithms",
        },
        {
          id: "07-parameterized-algorithms",
          title: "Parameterized Algorithms",
        },
        {
          id: "08-exact-algorithms",
          title: "Exact Algorithms",
        },
        {
          id: "09-parameterized-approximation",
          title: "Parameterized Approximation",
        },
        {
          id: "10-randomized-techniques-for-parameterized-algorithms",
          title: "Randomized FPT Techniques",
        },
        {
          id: "11-randomized-approximation",
          title: "Randomized Approximation",
        },
        {
          id: "12-hardness",
          title: "Hardness",
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
