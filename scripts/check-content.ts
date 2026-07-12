// ponytail: one-shot content integrity check, run via `npx tsx scripts/check-content.ts`
import { days } from '../content/index';
import * as fs from 'fs';
import * as path from 'path';

let errors = 0;
const err = (m: string) => { console.error('FAIL: ' + m); errors++; };
const activityIds = new Set<string>();
const sliderPairs: Record<string, Set<string>> = {};

for (const day of days) {
  for (const mod of day.modules) {
    if (mod.heroImage && !fs.existsSync(path.join('public', mod.heroImage)))
      err(`${mod.id}: missing heroImage ${mod.heroImage}`);
    mod.slides.forEach((s, i) => {
      const img = 'image' in s ? s.image : undefined;
      if (img && img.startsWith('/') && !fs.existsSync(path.join('public', img)))
        err(`${mod.id} slide ${i} (${s.kind}): missing image ${img}`);
      if (s.kind === 'activity') {
        const a = s.activity;
        if (activityIds.has(a.id)) err(`duplicate activity id ${a.id}`);
        activityIds.add(a.id);
        if (!a.id.startsWith(mod.id)) err(`${mod.id}: activity ${a.id} not prefixed with module id`);
        if (a.kind === 'slider') (sliderPairs[a.pairId] ??= new Set()).add(a.phase);
        if (a.kind === 'quiz') a.questions.forEach((q, qi) => {
          if (q.correct < 0 || q.correct >= q.options.length) err(`${a.id} q${qi}: correct out of range`);
        });
        if (a.kind === 'dragdrop') a.items.forEach((it, ii) => {
          if (it.bucket < 0 || it.bucket >= a.buckets.length) err(`${a.id} item ${ii}: bucket out of range`);
        });
        if (a.kind === 'poll' && a.correct !== undefined && (a.correct < 0 || a.correct >= a.options.length))
          err(`${a.id}: poll correct out of range`);
      }
    });
    if (!mod.notes.processingQuestions.length) err(`${mod.id}: no processing questions`);
    for (const role of ['head_teacher','nurse_dentist','counselor','admin'] as const)
      if (!mod.notes.examples[role]) err(`${mod.id}: missing example for ${role}`);
  }
}
for (const [pid, phases] of Object.entries(sliderPairs))
  if (!(phases.has('before') && phases.has('after')))
    console.warn(`WARN: slider pair ${pid} has only [${[...phases]}]`);

console.log(`Checked ${days.reduce((n,d)=>n+d.modules.length,0)} modules, ${activityIds.size} activities. Errors: ${errors}`);
process.exit(errors ? 1 : 0);
