'use client';

import type { Module, Slide, StageMode } from '@/lib/types';
import type { StageLive } from '@/components/live/useSessionState';
import WelcomeSlide from './WelcomeSlide';
import TitleSlide from './TitleSlide';
import StatementSlide from './StatementSlide';
import FinaleSlide from './FinaleSlide';
import StatSlide from './StatSlide';
import BulletsSlide from './BulletsSlide';
import ImageSlide from './ImageSlide';
import AnalogySlide from './AnalogySlide';
import RecapSlide from './RecapSlide';
import ActivitySlide from './ActivitySlide';
import QrSlide from './QrSlide';

/** Dispatches a slide to its per-kind renderer. */
export default function SlideView({
  slide,
  code,
  live,
  course,
}: {
  slide: Slide;
  code: string;
  live?: StageLive;
  course: Module['course'];
}) {
  // The one place the course turns into a mode. UPC keeps the palette it
  // shipped with; The Catalyst rallies by default and a slide can opt into calm.
  const mode: StageMode = course === 'catalyst' ? (slide.mode ?? 'rally') : 'upc';

  switch (slide.kind) {
    case 'welcome':
      return <WelcomeSlide slide={slide} mode={mode} />;
    case 'title':
      return <TitleSlide slide={slide} mode={mode} />;
    case 'statement':
      return <StatementSlide slide={slide} mode={mode} />;
    case 'finale':
      return <FinaleSlide slide={slide} mode={mode} />;
    case 'stat':
      return <StatSlide slide={slide} mode={mode} />;
    case 'bullets':
      return <BulletsSlide slide={slide} mode={mode} />;
    case 'image':
      return <ImageSlide slide={slide} mode={mode} />;
    case 'analogy':
      return <AnalogySlide slide={slide} mode={mode} />;
    case 'recap':
      return <RecapSlide slide={slide} mode={mode} />;
    case 'activity':
      return <ActivitySlide slide={slide} code={code} live={live} mode={mode} />;
    case 'qr':
      return <QrSlide slide={slide} code={code} mode={mode} />;
  }
}
