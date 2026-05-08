import type { Language } from '@/translations/types';

export const BLOG_CATEGORIES: Record<Language, string[]> = {
  'pt-BR': [
    'Finanças Criativas',
    'Produtividade',
    'Gestão Freelancer',
    'Negócios Criativos',
    'Fluxo de Caixa',
    'Precificação',
    'Automação',
  ],
  en: [
    'Creative Finance',
    'Productivity',
    'Freelancer Management',
    'Creative Business',
    'Cash Flow',
    'Pricing',
    'Automation',
  ],
};

export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith('/embed/')) return url;
    }
    return null;
  } catch {
    return null;
  }
};