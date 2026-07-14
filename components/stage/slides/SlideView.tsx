'use client';

import type { Slide } from '@/lib/types';
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
}: {
  slide: Slide;
  code: string;
  live?: StageLive;
}) {
  switch (slide.kind) {
    case 'welcome':
      return <WelcomeSlide slide={slide} />;
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'statement':
      return <StatementSlide slide={slide} />;
    case 'finale':
      return <FinaleSlide slide={slide} />;
    case 'stat':
      return <StatSlide slide={slide} />;
    case 'bullets':
      return <BulletsSlide slide={slide} />;
    case 'image':
      return <ImageSlide slide={slide} />;
    case 'analogy':
      return <AnalogySlide slide={slide} />;
    case 'recap':
      return <RecapSlide slide={slide} />;
    case 'activity':
      return <ActivitySlide slide={slide} code={code} live={live} />;
    case 'qr':
      return <QrSlide slide={slide} code={code} />;
  }
}
