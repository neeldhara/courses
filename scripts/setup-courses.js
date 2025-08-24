#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const courses = [
  { id: 'fun', name: 'Fun with Math and Computing', type: 'NPTEL' },
  { id: 'mas', name: 'Foundations of AI MultiAgent Systems', type: 'IITGN Core' },
  { id: 'mfai', name: 'Mathematical Foundations of AI', type: 'IITGN Core' },
  { id: 'dm', name: 'Discrete Mathematics', type: 'IITGN Core' },
  { id: 'dsa', name: 'Data Structures and Algorithms', type: 'IITGN Core' },
  { id: 'fpt', name: 'Parameterized Algorithms', type: 'NPTEL' },
  { id: 'cp', name: 'Competitive Programming', type: 'NPTEL' },
  { id: 'magic', name: 'Math with Cards', type: 'Swayam Prabha' },
  { id: 'advalgo', name: 'Advanced Algorithms', type: 'IIT Madras' },
  { id: 'combinatorics', name: 'Combinatorics with Applications in Computer Science', type: 'IITGN Elective' },
  { id: 'linalg', name: 'Linear Algebraic Methods in Combinatorics', type: 'IITGN Elective' },
  { id: 'comsoc', name: 'Computational Social Choice', type: 'IITGN Elective' },
];

// Create the coming soon index template
const createComingSoonIndex = (courseName, courseType) => `---
title: ${courseName}
description: ${courseType} Course
tab: notes
---

# ${courseName}

## Coming Soon

This course website is currently under development. Please check back later for updates.

### Course Information
- **Type**: ${courseType}
- **Status**: Coming Soon

### What to Expect

This course will cover:
- Comprehensive course notes
- Assignments and assessments
- Resources and references
- Previous editions archive

Stay tuned for updates!
`;

// Create sidebar config for each course
const createCourseSidebar = (courseId, courseName) => `import type { DocsSidebarNavData } from "@/docs/config/types/configDataTypes";

const sidebarNavData: DocsSidebarNavData = {
  tabs: [
    {
      id: "notes",
      title: "Notes",
      description: "Course notes for ${courseName}",
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
      description: "Assessments for ${courseName}",
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
`;

// Main setup function
function setupCourses() {
  courses.forEach(course => {
    const courseDir = path.join(rootDir, 'src', course.id);
    
    // Create main course directories
    const dirs = [
      path.join(courseDir, 'data', 'docs', 'en', 'notes', 'introduction'),
      path.join(courseDir, 'data', 'docs', 'en', 'notes', 'modules'),
      path.join(courseDir, 'data', 'docs', 'en', 'notes', 'resources'),
      path.join(courseDir, 'data', 'docs', 'en', 'assessments', 'assignments'),
      path.join(courseDir, 'data', 'docs', 'en', 'assessments', 'quizzes'),
      path.join(courseDir, 'data', 'docs', 'en', 'assessments', 'exams'),
      path.join(courseDir, 'data', 'docs', 'en', 'editions', 'current'),
      path.join(courseDir, 'data', 'docs', 'en', 'editions', 'archive'),
      path.join(courseDir, 'config', 'en'),
      path.join(courseDir, 'layouts'),
      path.join(courseDir, 'components'),
      path.join(courseDir, 'pages'),
    ];
    
    dirs.forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
    });
    
    // Create coming soon index for each section
    const indexContent = createComingSoonIndex(course.name, course.type);
    
    // Create index files for main sections
    fs.writeFileSync(
      path.join(courseDir, 'data', 'docs', 'en', 'notes', 'introduction', 'index.mdx'),
      indexContent
    );
    
    fs.writeFileSync(
      path.join(courseDir, 'data', 'docs', 'en', 'assessments', 'assignments', 'index.mdx'),
      indexContent.replace('tab: notes', 'tab: assessments')
    );
    
    fs.writeFileSync(
      path.join(courseDir, 'data', 'docs', 'en', 'editions', 'current', 'index.mdx'),
      indexContent.replace('tab: notes', 'tab: editions')
    );
    
    // Create sidebar configuration for the course
    fs.writeFileSync(
      path.join(courseDir, 'config', 'en', 'sidebarNavData.json.ts'),
      createCourseSidebar(course.id, course.name)
    );
    
    console.log(`✅ Set up course: ${course.name} (${course.id})`);
  });
  
  console.log('\n✨ All courses have been set up successfully!');
}

// Run the setup
setupCourses();
