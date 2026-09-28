import type { KnowledgeBase } from "./types";

/**
 * Server-only AI grounding data. Update this copy alongside the Content Store.
 * Do not import this module from client components.
 */
export const knowledgeBase: KnowledgeBase = {
  facts: `Allexa (Allexandra Felissa Tioputri) is a Computer Science student at Universitas Bina Nusantara and an aspiring Data Analyst and Data Scientist. Her focus areas are data analytics, business intelligence, and machine learning. She works with Python, SQL, Power BI, Pandas, NumPy, Scikit-learn, DAX, Power Query, Tableau, Matplotlib, PostgreSQL, MySQL, Git/GitHub, and REST APIs.

Her projects include PayFlow HR, a payroll management application for eight entities that supports final payroll, recaps, payslips, PPh 21, and Coretax processing; SIAGA, a machine-learning multi-hazard early-warning and resource-allocation system for flood and drought risk that placed fourth among more than 200 teams at the Ristek UI Datathon; and Shopee Sales Analytics, an e-commerce analytics project using data validation, transformation, KPI analysis, and a Power BI dashboard.

Her experience includes Software Engineer Intern at PT. Satya Ragam Truxpress (July–September 2026), SASC Mentor Scholarship at BINUS University (February 2026–present), HIMTI Care Manager at HIMTI BINUS University (January 2026–present), and S-Class Program Participant at Ureeka, BINUS University (March 2026–present). She values analytical thinking, problem solving, communication, collaboration, leadership, project management, adaptability, and mentoring.

If a question cannot be answered from these facts, answer exactly: "Information not available."`,
};

export default knowledgeBase;
