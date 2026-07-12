import SlideShell from '@/components/ui/SlideShell';
import Kicker from '@/components/ui/Kicker';
import BigStatement from '@/components/ui/BigStatement';
import StatBlock from '@/components/ui/StatBlock';
import AnalogyCard from '@/components/ui/AnalogyCard';
import RecapCard from '@/components/ui/RecapCard';
import ProgressRail from '@/components/ui/ProgressRail';
import RoleBadge from '@/components/ui/RoleBadge';
import { ROLES, type Role } from '@/lib/types';

export const metadata = { title: 'Design Gallery — UPC Live' };

export default function DesignPage() {
  return (
    <main>
      {/* ---- STAGE: statement slide ---- */}
      <SlideShell>
        <Kicker>UPC 1 · Module 3 · Risk &amp; Protective Factors</Kicker>
        <BigStatement
          attribution="Universal Prevention Curriculum, UNODC"
          className="mt-10"
        >
          Prevention is not about scaring the young. It is about growing what
          protects them.
        </BigStatement>
      </SlideShell>

      {/* ---- STAGE: stat slide ---- */}
      <SlideShell>
        <StatBlock
          value="1 in 7"
          label="Filipino students aged 13–15 has been offered, sold, or given a drug on school grounds."
          context="Most first offers come from someone the student already knows — which is exactly why school-based prevention works."
          source="Global School-based Student Health Survey, Philippines"
        />
      </SlideShell>

      {/* ---- STAGE: recap slide ---- */}
      <SlideShell>
        <Kicker className="self-start">Bago tayo magpatuloy</Kicker>
        <RecapCard
          className="mt-10"
          title="Module 3, in one breath"
          points={[
            'Risk factors load the dice; protective factors unload them.',
            'No single factor decides a child’s path — accumulation does.',
            'Schools are the most reliable protective system we control.',
            'Every teacher interaction is a dose of prevention.',
          ]}
        />
      </SlideShell>

      {/* ---- LIGHT: join / guide surface primitives ---- */}
      <SlideShell variant="light" className="!justify-start !py-24">
        <div className="w-full max-w-4xl space-y-20 self-center">
          <div>
            <Kicker className="justify-start">Analogy card — tap to flip</Kicker>
            <div className="mt-8 flex justify-start">
              <AnalogyCard
                title="Ang Bakod at ang Ambulansya"
                front="Isang barangay ang may bangin. Saan mo ilalagay ang pera: sa bakod sa taas, o sa ambulansya sa ibaba?"
                back="Ang treatment ay ambulansya — kailangan, pero huli na. Ang prevention ay bakod: mas mura, mas maaga, mas marami ang naililigtas. Ang eskwela ang pinakamatibay na bakod natin."
              />
            </div>
          </div>

          <div>
            <Kicker className="justify-start">Role badges</Kicker>
            <div className="mt-8 flex flex-wrap gap-4">
              {(Object.keys(ROLES) as Role[]).map((role) => (
                <RoleBadge key={role} role={role} />
              ))}
            </div>
          </div>

          <div>
            <Kicker className="justify-start">Light-surface statement</Kicker>
            <div className="mt-8 [&_blockquote]:text-[clamp(1.8rem,3.5vw,3.5rem)]">
              <BigStatement>
                Malamig sa mata, mabigat sa puso — light surfaces stay warm,
                never clinical.
              </BigStatement>
            </div>
          </div>
        </div>
      </SlideShell>

      {/* progress rail demo — pinned to viewport bottom */}
      <ProgressRail
        groups={[
          { label: 'M1', slides: 5 },
          { label: 'M2', slides: 6 },
          { label: 'M3', slides: 8 },
          { label: 'M4', slides: 5 },
        ]}
        current={13}
      />
    </main>
  );
}
