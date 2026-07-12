import type { Activity, Module } from '@/lib/types';
import { demoModule } from './demo';

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
    modules: [demoModule],
  },
  {
    day: 2,
    course: 'upc2',
    courseTitle: 'Physiology and Pharmacology for Prevention Specialists',
    modules: [],
  },
];

/** Find an activity by id across all days/modules (used by the join surface). */
export function findActivity(id: string): Activity | null {
  for (const day of days)
    for (const mod of day.modules)
      for (const slide of mod.slides)
        if (slide.kind === 'activity' && slide.activity.id === id) return slide.activity;
  return null;
}
