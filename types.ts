export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  excerpt: string;
  content: string; // HTML or Markdown string
  author: string;
  date: string;
  imageUrl: string;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
}

export type CategoryType = 'Termite Control' | 'General Pest' | 'Herbal' | 'Commercial';

export interface LeadForm {
  fullName: string;
  email: string;
  phone?: string;
  referralSource: string;
  message?: string;
  consent: boolean;
}

export const CATEGORIES: CategoryType[] = ['Termite Control', 'General Pest', 'Herbal', 'Commercial'];