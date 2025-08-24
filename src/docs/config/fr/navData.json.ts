/**
 * * This file is used to define the navigation links for the documentation site.
 */

// types
import { type navItem } from "../types/configDataTypes";

const navConfig: navItem[] = [
  {
    text: "Introduction",
    link: "/docs/getting-started/",
  },
  {
    text: "Components",
    link: "/docs/components/",
  },
  {
    text: "Get Solstice",
    link: "https://cosmicthemes.com/themes/solstice",
    newTab: true,
  },
];

export default navConfig;
