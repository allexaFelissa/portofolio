import type { SiteContent } from "./types";

/**
 * Owner-editable portfolio content. Replace URLs and placeholder assets before
 * publishing; UI components should not contain profile-specific copy.
 */
export const siteContent: SiteContent = {
  hero: {
    eyebrow: "DATA ANALYST PORTFOLIO",
    name: "Allexa",
    role: "Aspiring Data Analyst & Data Scientist",
    description:
      "I'm a Computer Science student focused on data analytics, business intelligence, and machine learning. I enjoy turning raw data into meaningful insights and building data-driven solutions to solve real-world problems.",
    portrait: {
      src: "/placeholder-portrait.svg",
      alt: "Placeholder portrait for Allexa",
    },
    capabilityBadges: ["Data Analytics", "Python • SQL • Power BI", "Machine Learning"],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/", iconAlt: "GitHub profile" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/", iconAlt: "LinkedIn profile" },
      { platform: "Instagram", url: "https://www.instagram.com/", iconAlt: "Instagram profile" },
    ],
    cvFile: "/allexa-cv-placeholder.txt",
  },
  about: {
    eyebrow: "DISCOVER",
    heading: "About Me",
    portrait: {
      src: "/placeholder-portrait.svg",
      alt: "Placeholder portrait for Allexa",
    },
    whoAmI:
      "I'm a Computer Science student passionate about data analytics and data science. Through academic, organizational, and real-world projects, I've worked with data to analyze business problems, build dashboards, and develop machine learning solutions.",
    myApproach:
      "I believe good analysis starts with asking the right questions. I combine Python, SQL, Power BI, and machine learning to turn raw data into clear insights and practical solutions, while paying close attention to data quality and the context behind the numbers.",
    personalDetails: {
      name: "Allexandra Felissa Tioputri",
      placeOfBirth: "Jakarta, Indonesia",
      phone: "+62 896-7770-2873",
      education: "Universitas Bina Nusantara",
    },
  },
  experience: [
    {
      id: "software-engineer-intern",
      year: "2025",
      role: "Software Engineer Intern",
      company: "PT. Satya Ragam Truxpress",
      description:
        "Developed and maintained PayFlow HR for eight entities within the same corporate group, covering final payroll, dashboards, recaps, payslips, PPh 21, and Coretax processing.",
      techTags: ["Data Processing", "Dashboard", "Full-Stack"],
    },
    {
      id: "sasc-mentor",
      year: "2024",
      role: "SASC Mentor Scholarship",
      company: "BINUS University",
      description:
        "Mentored students in data analytics, big data processing, data engineering, programming, and related subjects while helping build analytical and technical skills.",
      techTags: ["Mentoring", "Data Analytics", "Programming"],
    },
    {
      id: "himti-care-manager",
      year: "2023–2024",
      role: "HIMTI Care Manager",
      company: "HIMTI BINUS University",
      description:
        "Led and coordinated a team of more than 50 student activists, managing planning, task allocation, and progress tracking across multiple regions.",
      techTags: ["Leadership", "Project Management", "Teamwork"],
    },
    {
      id: "s-class-participant",
      year: "2023",
      role: "S-Class Program Participant",
      company: "Ureeka, BINUS University",
      description:
        "Selected for S-Class, an intensive SoCS program for technical development and IT competitions; placed fourth among 200+ teams at the Ristek UI Datathon with SIAGA.",
      techTags: ["Data Science", "Machine Learning", "Competition"],
    },
  ],
  marquee: { text: "DATA ANALYTICS • BUSINESS INTELLIGENCE • MACHINE LEARNING" },
  hardSkills: [
    { id: "programming-data", icon: "code", title: "Programming & Data", description: "Core languages and packages for data manipulation.", skills: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn"] },
    { id: "bi-visualization", icon: "chart", title: "BI & Visualization", description: "Interactive dashboards and business intelligence reporting.", skills: ["Power BI", "DAX", "Power Query", "Tableau", "Matplotlib"] },
    { id: "machine-learning", icon: "spark", title: "Machine Learning", description: "Predictive modeling, classifiers, and evaluation metrics.", skills: ["XGBoost", "Classification", "Model Evaluation"] },
    { id: "database-dev", icon: "database", title: "Database & Dev", description: "Relational stores, version control, and interface services.", skills: ["PostgreSQL", "MySQL", "Git / GitHub", "REST API"] },
  ],
  softSkills: [
    "Analytical Thinking", "Problem Solving", "Communication", "Team Collaboration", "Leadership", "Project Management", "Adaptability", "Mentoring",
  ].map((label) => ({ id: label.toLowerCase().replaceAll(" ", "-"), label })),
  projects: [
    {
      id: "payflow-hr",
      title: "PayFlow HR",
      description: "Payroll management application for eight entities, supporting final payroll, recaps, payslips, and PPh 21 processing.",
      thumbnail: { src: "/placeholder-project.svg", alt: "PayFlow HR dashboard placeholder" },
      detailBody: "Built during a software engineering internship to support payroll operations across a corporate group.",
      role: "Software Engineer Intern",
      stack: ["Laravel", "PHP", "MySQL", "Dashboarding"],
    },
    {
      id: "siaga",
      title: "SIAGA",
      description: "Multi-hazard early warning and resource allocation system using machine learning for flood and drought risks.",
      thumbnail: { src: "/placeholder-project.svg", alt: "SIAGA analytics placeholder" },
      detailBody: "A Ristek UI Datathon project that placed fourth among more than 200 teams.",
      role: "Data Science Team Member",
      stack: ["Python", "Machine Learning", "Data Analysis"],
    },
    {
      id: "shopee-sales-analytics",
      title: "Shopee Sales Analytics",
      description: "End-to-end e-commerce analytics from data validation and transformation to KPI analysis and Power BI dashboards.",
      thumbnail: { src: "/placeholder-project.svg", alt: "Shopee sales analytics dashboard placeholder" },
      detailBody: "Analyzed category engagement momentum and translated findings into an interactive business intelligence dashboard.",
      role: "Data Analyst",
      stack: ["Python", "SQL", "Power BI", "DAX"],
    },
  ],
  sectionHeadings: {
    experience: { eyebrow: "EXPERIENCE", heading: "What I've Done" },
    skills: { eyebrow: "SKILLS & TOOLS", heading: "Skills & Expertise" },
    projects: { eyebrow: "PORTFOLIO", heading: "Selected Works" },
    contact: { eyebrow: "GET IN TOUCH", heading: "Contact Me" },
  },
};

export default siteContent;
