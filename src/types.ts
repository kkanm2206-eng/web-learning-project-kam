export interface CourseSection {
  title: string;
  content: string;
  code?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Project {
  id: string;
  topicNumber?: number;
  title: string;
  chapterTitle?: string;
  sourceDomain?: string;
  category: string;
  year: string;
  image: string;
  colSpan: number; // 7 or 5
  description: string;
  role: string;
  deliverables: string[];
  metrics: string;
  client: string;
  sections?: CourseSection[];
  summary?: string;
  activity?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
  image: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  medium: string;
  year: string;
  image: string;
  rotation: string;
  description: string;
}
