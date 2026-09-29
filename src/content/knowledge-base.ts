import type { KnowledgeBase } from "./types";

/** Server-only grounding data. Keep claims verifiable and links explicit. */
export const knowledgeBase: KnowledgeBase = {
  facts: `Allexandra Felissa Tioputri (preferred name Allexandra; portfolio name Allexa) is a Computer Science student at BINUS University, specializing in Database Technology, with a GPA of 3.68. She is building experience toward Data Analyst, Data Science, Data Engineering, and Software Engineering roles. Her email is allexandrafelissa@gmail.com.`,
  sections: [
    {
      id: "profile",
      keywords: ["allexa", "allexandra", "about", "profile", "background", "education", "university", "binus", "gpa", "major", "jurusan", "who", "tell me"],
      content: `PROFILE
Name: Allexandra Felissa Tioputri. Preferred name: Allexandra. Portfolio name: Allexa.
Education: Computer Science at BINUS University, specializing in Database Technology. GPA: 3.68.
Summary: She is building practical experience across data analytics, machine learning, business intelligence, databases, and software engineering. Her strengths include analytical thinking, practical execution, data processing, problem solving, and turning raw data into structured insights and useful outputs. Her career goal is to build a data-focused career while strengthening software engineering and technical problem-solving skills.`,
    },
    {
      id: "satya-ragam-payflow",
      keywords: ["satya", "ragam", "intern", "internship", "software engineer", "experience", "payflow", "payroll", "pph21", "pph 21", "coretax", "payslip", "8 entities"],
      content: `EXPERIENCE — PT Satya Ragam
Role: Software Engineering Intern. Dates: July 2026–September 2026. Project: PayFlow.
PayFlow is a payroll application that processes employee and attendance data into payroll calculations, recaps, reporting, and payslip outputs. Allexandra worked with employee and attendance inputs; payroll recaps and dashboard outputs; final payroll calculations for eight corporate-group entities; individual payslips; division-level reporting; PPh 21 tax calculations; and output readable by Coretax.
Relevant areas: software engineering, payroll systems, data processing, and tax calculation.`,
    },
    {
      id: "leadership-mentoring",
      keywords: ["himti", "manager", "care", "sasc", "mentor", "mentoring", "leadership", "organization", "organisation", "experience", "hilet", "students"],
      content: `LEADERSHIP AND MENTORING
SASC Mentor Scholarship Program — Mentor, 2026–present: mentored eight students across multiple semesters and supported Data Analytics, Big Data Processing, Data Engineering, and programming-related learning.
HIMTI — Manager of HIMTI Care Division, January 2026–present: coordinates more than 50 HIMTI activists across multiple regions.
HIMTI — Mentor Division, HILET, November–December 2025: mentored newly recruited and Event Division activists and served as a primary mentee contact.`,
    },
    {
      id: "skills",
      keywords: ["skill", "tools", "technology", "tech stack", "python", "sql", "pandas", "numpy", "scikit", "xgboost", "power bi", "dax", "power query", "tableau", "matplotlib", "postgresql", "mysql", "git", "github", "jupyter", "database", "visualization"],
      content: `SKILLS WITH PORTFOLIO EVIDENCE
Programming and data: Python (analytics, machine learning, SIAGA, Shopee), SQL (analytics, databases, Shopee), Pandas (cleaning, transformation, EDA), NumPy (data processing), Scikit-learn (machine-learning workflows), and XGBoost (SIAGA risk modeling).
Business intelligence and visualization: Power BI (Shopee dashboard), DAX and Power Query (Power BI development), Tableau, and Matplotlib.
Databases and tools: PostgreSQL, MySQL, Git, GitHub, and Jupyter.
Do not assign an expert proficiency level; no proficiency levels are listed.`,
    },
    {
      id: "shopee",
      keywords: ["shopee", "e-commerce", "ecommerce", "sales", "analytics dashboard", "power bi", "dax", "favorite", "engagement", "fashion", "groceries", "health", "marketplace"],
      content: `PROJECT — E-Commerce BI & Analytics Dashboard (Shopee Sales Analysis)
Objective: analyze Shopee marketplace data to investigate product-category engagement and identify categories with strong and widespread favorite-engagement momentum.
Data: 20,312 rows, 111 source columns, 91 derived columns, and 19,015 complete cross-sectional rows (94%). Process: inspection, cleaning, validation, transformation, EDA, KPI development, Power BI dashboarding, and insight generation. Tools: Python, Pandas, SQL, Power BI, and DAX. Dashboard pages: Overview, Deep Dive, and Limitations.
Findings: 12 categories were analyzed; 74.61% of evaluated intervals were consistent across exact-interval and sensitivity analysis. Fashion, Groceries & Pets, Home, and Mobile & Technology were HIGH under the project framework; Health & Beauty was MODERATE.
Limitations: total_sold equals total_rating in every row; delivery locations are concentrated in KL City/Kuala Lumpur; results are not a universal marketplace ranking.
Repository: https://github.com/murcvys/shopee-sales.git`,
    },
    {
      id: "siaga",
      keywords: ["siaga", "flood", "drought", "disaster", "warning", "resource allocation", "xgboost", "geospatial", "satellite", "ristek", "datathon", "auc", "north java", "northern java"],
      content: `PROJECT — SIAGA
SIAGA is a multi-hazard early-warning and resource-allocation decision-support system for overlapping flood and drought risks across North Java. It covers Jakarta Utara, Bekasi, Karawang, Indramayu, Cirebon, Brebes, Tegal, Pemalang, Pekalongan, Demak, and Semarang.
Data sources include GADM 4.1, ERA5/Open-Meteo rainfall, GloFAS/Open-Meteo discharge, WorldPop 2020, OpenStreetMap, BPBD, Inalogs/warehouse data, and Sentinel-1. The approach includes integration, feature engineering, XGBoost modeling, isotonic calibration, risk mapping, decision support, and resource allocation.
Reported model results include AUC 0.931 and 0.959; average precision 44.4% vs 5% and 85.8% vs 19%; recall 69% and 79%; precision 35.3% and 77%; and worst-10% CVaR. SIAGA placed 4th among 200+ teams at Ristek UI Datathon 2026.
Repository: https://github.com/ethannchrstian/Siaga.git`,
    },
    {
      id: "storybook",
      keywords: ["storybook", "children", "child", "story", "parents", "personalized", "next.js", "supabase", "in development"],
      content: `PROJECT — Personalized Children's Storybook
Status: portfolio project in development. It is designed for parents to generate illustrated short stories using a child's name, hobby, age, selected theme, and a three- or ten-minute duration. Planned analytics events include age/theme selection, generation, reading, saving, regeneration, and exit. Technical direction: Next.js, AI-generated stories, per-page illustrations, analytics, and potential Supabase integration. Do not describe this project as finished.`,
    },
    {
      id: "achievements",
      keywords: ["achievement", "award", "competition", "scholarship", "datathon", "ristek", "s-class", "s class", "eureeka", "ureeka", "widia", "4th", "fourth"],
      content: `ACHIEVEMENTS
SIAGA earned 4th place at Ristek UI Datathon 2026 among 200+ teams.
S-Class BINUS/Eureeka, Competition track: a competitive School of Computer Science program for selected students with technical and soft-skill training.
Widia Scholarship: scholarship recipient.`,
    },
    {
      id: "career",
      keywords: ["hire", "suitable", "candidate", "strength", "career", "role", "job", "opportunity", "available", "availability", "intern", "internship", "data analyst", "data scientist", "data engineer", "software engineer", "company"],
      content: `CAREER PREFERENCES AND EVIDENCE
Target roles: Data Analyst Intern, Data Science Intern, Data Engineering Intern, and Software Engineering Intern. Target companies listed: Shopee, GoTo, Grab, Traveloka, and Blibli. Career focus: roles applying data analysis, machine learning, data processing, business intelligence, and technical problem solving.
Candidate evidence: her portfolio combines analytics, machine learning, BI, database knowledge, and real payroll software experience. Projects demonstrate workflows from data preparation through analysis and practical outputs. Current availability is not listed; direct visitors to contact her.`,
    },
    {
      id: "contact",
      keywords: ["contact", "email", "linkedin", "github", "repository", "repo", "cv", "resume", "reach", "link", "portfolio url"],
      content: `CONTACT AND VERIFIED LINKS
Email: allexandrafelissa@gmail.com
LinkedIn: https://www.linkedin.com/in/allexandra-felissa
GitHub: https://github.com/murcvys
Shopee repository: https://github.com/murcvys/shopee-sales.git
SIAGA repository: https://github.com/ethannchrstian/Siaga.git
No public portfolio URL or CV URL is listed in this knowledge base.`,
    },
  ],
};

export default knowledgeBase;
