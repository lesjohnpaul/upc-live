import type { Module } from '@/lib/types';

export type Day = {
  day: 1 | 2;
  course: 'upc1' | 'upc2';
  courseTitle: string;
  modules: Module[];
};

export const days: Day[] = [
  {
    day: 1,
    course: 'upc1',
    courseTitle: 'Introduction to Prevention Science',
    modules: [],
  },
  {
    day: 2,
    course: 'upc2',
    courseTitle: 'Physiology and Pharmacology for Prevention Specialists',
    modules: [],
  },
];
