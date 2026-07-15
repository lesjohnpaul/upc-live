import type { Activity, Module, SliderActivity } from '@/lib/types';
import { demoModule } from './demo';
import { module1 as upc1m1 } from './upc1/module-1';
import { module2 as upc1m2 } from './upc1/module-2';
import { module3 as upc1m3 } from './upc1/module-3';
import { module4 as upc1m4 } from './upc1/module-4';
import { module5 as upc1m5 } from './upc1/module-5';
import { module6 as upc1m6 } from './upc1/module-6';
import { module7 as upc1m7 } from './upc1/module-7';
import { module1 as upc2m1 } from './upc2/module-1';
import { module2 as upc2m2 } from './upc2/module-2';
import { module3 as upc2m3 } from './upc2/module-3';
import { module4 as upc2m4 } from './upc2/module-4';
import { module5 as upc2m5 } from './upc2/module-5';
import { module6 as upc2m6 } from './upc2/module-6';

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
    modules: [upc1m1, upc1m2, upc1m3, upc1m4, upc1m5, upc1m6, upc1m7],
  },
  {
    day: 2,
    course: 'upc2',
    courseTitle: 'Physiology and Pharmacology for Prevention Specialists',
    modules: [upc2m1, upc2m2, upc2m3, upc2m4, upc2m5, upc2m6],
  },
];

// The demo module isn't part of any real day, but the demo join/stage surfaces
// resolve activities through these helpers — so include it in the search.
const allModules: Module[] = [...days.flatMap((d) => d.modules), demoModule];

/** Find an activity by id across all days/modules (used by the join surface). */
export function findActivity(id: string): Activity | null {
  for (const mod of allModules)
    for (const slide of mod.slides)
      if (slide.kind === 'activity' && slide.activity.id === id) return slide.activity;
  return null;
}

/** Find one phase of a before/after slider pair (used by the confidence shift view). */
export function findSliderPair(pairId: string, phase: 'before' | 'after'): SliderActivity | null {
  for (const mod of allModules)
    for (const slide of mod.slides)
      if (
        slide.kind === 'activity' &&
        slide.activity.kind === 'slider' &&
        slide.activity.pairId === pairId &&
        slide.activity.phase === phase
      )
        return slide.activity;
  return null;
}
