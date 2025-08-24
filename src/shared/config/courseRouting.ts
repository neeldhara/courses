// Course routing configuration
export const courseRoutes = {
  fun: {
    path: '/fun',
    name: 'Fun with Math and Computing',
    type: 'NPTEL',
  },
  mas: {
    path: '/mas',
    name: 'Foundations of AI',
    type: 'IITGN Core',
  },
  mfai: {
    path: '/mfai',
    name: 'Mathematical Foundations of AI',
    type: 'IITGN Core',
  },
  dm: {
    path: '/dm',
    name: 'Discrete Mathematics',
    type: 'IITGN Core',
  },
  dsa: {
    path: '/dsa',
    name: 'Data Structures and Algorithms',
    type: 'IITGN Core',
  },
  fpt: {
    path: '/fpt',
    name: 'Parameterized Algorithms',
    type: 'NPTEL',
  },
  cp: {
    path: '/cp',
    name: 'Competitive Programming',
    type: 'NPTEL',
  },
  magic: {
    path: '/magic',
    name: 'Math with Cards',
    type: 'Swayam Prabha',
  },
  advalgo: {
    path: '/advalgo',
    name: 'Advanced Algorithms',
    type: 'IIT Madras',
  },
  combinatorics: {
    path: '/combinatorics',
    name: 'Combinatorics',
    type: 'IITGN Elective',
  },
  linalg: {
    path: '/linalg',
    name: 'Linear Algebra',
    type: 'IITGN Elective',
  },
  comsoc: {
    path: '/comsoc',
    name: 'Computational Social Choice',
    type: 'IITGN Elective',
  },
  misc: {
    path: '/misc',
    name: 'Miscellany',
    type: 'Hidden', // Special type to exclude from homepage
  },
};

export type CourseId = keyof typeof courseRoutes;
