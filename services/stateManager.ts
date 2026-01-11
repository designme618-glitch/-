
import { Novel, Chapter } from '../types';
import { mockNovels, mockChapters } from './mockData';

const NOVELS_KEY = 'abdullah_novels_data';
const CHAPTERS_KEY = 'abdullah_chapters_data';

export const getNovels = (): Novel[] => {
  const stored = localStorage.getItem(NOVELS_KEY);
  if (!stored) {
    localStorage.setItem(NOVELS_KEY, JSON.stringify(mockNovels));
    return mockNovels;
  }
  return JSON.parse(stored);
};

export const saveNovel = (novel: Omit<Novel, '_id' | 'createdAt'>): Novel => {
  const novels = getNovels();
  const newNovel: Novel = {
    ...novel,
    _id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  const updated = [newNovel, ...novels];
  localStorage.setItem(NOVELS_KEY, JSON.stringify(updated));
  return newNovel;
};

export const getChapters = (novelId: string): Chapter[] => {
  const stored = localStorage.getItem(CHAPTERS_KEY);
  const allChapters: Chapter[] = stored ? JSON.parse(stored) : mockChapters;
  if (!stored) localStorage.setItem(CHAPTERS_KEY, JSON.stringify(mockChapters));
  return allChapters.filter(c => c.novelId === novelId).sort((a, b) => a.order - b.order);
};

export const saveChapter = (chapter: Omit<Chapter, '_id'>): Chapter => {
  const stored = localStorage.getItem(CHAPTERS_KEY);
  const allChapters: Chapter[] = stored ? JSON.parse(stored) : mockChapters;
  const newChapter: Chapter = {
    ...chapter,
    _id: Math.random().toString(36).substr(2, 9)
  };
  const updated = [...allChapters, newChapter];
  localStorage.setItem(CHAPTERS_KEY, JSON.stringify(updated));
  return newChapter;
};

export const deleteNovel = (id: string) => {
  const novels = getNovels().filter(n => n._id !== id);
  localStorage.setItem(NOVELS_KEY, JSON.stringify(novels));
  // Also delete chapters
  const stored = localStorage.getItem(CHAPTERS_KEY);
  if (stored) {
    const chapters = JSON.parse(stored).filter((c: Chapter) => c.novelId !== id);
    localStorage.setItem(CHAPTERS_KEY, JSON.stringify(chapters));
  }
};
