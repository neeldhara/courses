import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "short-courses",
      title: "Short Courses",
      description: "Brief focused courses and mini-series",
      icon: "tabler/school",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
        },
      ],
    },
    {
      id: "workshops",
      title: "Workshops",
      description: "Hands-on workshops and interactive sessions",
      icon: "tabler/edit-circle",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
        },
      ],
    },
    {
      id: "other",
      title: "Other",
      description: "Miscellaneous content and resources",
      icon: "tabler/stack-2",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
        },
      ],
    },
  ],
};

export default sidebarNavData;
