import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';
import { findActivity } from '@/content';
import { composeLetter, type Answer } from '@/lib/letter';
import type { Role } from '@/lib/types';

/** fs.readFile for the fonts → Node, not Edge. */
export const runtime = 'nodejs';

/**
 * The participant's letter as a shareable PNG.
 *
 * Rendered from the answers stored in Supabase rather than from anything the
 * client posts, so the image is always the real letter — a screenshot would
 * capture whatever the phone happened to lay out, and a client-supplied body
 * would let anyone render any text under Jessica's signature.
 */

// Satori cannot parse oklch(), so the brand tokens are pre-converted to sRGB.
const C = {
  cream50: '#fbf9f3',
  cream100: '#f5f2e9',
  cream300: '#dcd5c4',
  forest950: '#04170f',
  forest800: '#113423',
  forest600: '#2f6545',
  forest500: '#46885d',
  gold500: '#ca8e36',
  gold600: '#aa6f23',
};

const font = (name: string) => readFile(join(process.cwd(), 'public', 'fonts', name));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const participantId = searchParams.get('p');
  const activityId = searchParams.get('a');
  if (!participantId || !activityId) {
    return new Response('missing p or a', { status: 400 });
  }

  const activity = findActivity(activityId);
  if (!activity || activity.kind !== 'reflection') {
    return new Response('not a reflection activity', { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return new Response('supabase not configured', { status: 500 });
  const db = createClient(url, key);

  const [{ data: person }, { data: response }] = await Promise.all([
    db.from('participants').select('role').eq('id', participantId).maybeSingle(),
    db
      .from('responses')
      .select('payload')
      .eq('participant_id', participantId)
      .eq('activity_id', activityId)
      .maybeSingle(),
  ]);

  const payload = response?.payload as { answers?: Answer[]; firstName?: string } | undefined;
  if (!person || !payload?.answers) {
    return new Response('no letter for this participant', { status: 404 });
  }

  const letter = composeLetter({
    activity,
    answers: payload.answers,
    firstName: payload.firstName ?? '',
    role: person.role as Role,
  });

  // static instances, not the [wght] variable files — Satori cannot parse
  // variable fonts and dies with a cryptic "cannot read property '256'"
  const [fraunces, frauncesItalic, alegreya, alegreyaBold, caveat] = await Promise.all([
    font('Fraunces.ttf'),
    font('Fraunces-Italic.ttf'),
    font('AlegreyaSans-Regular.ttf'),
    font('AlegreyaSans-Bold.ttf'),
    font('Caveat.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 64,
          background: C.cream50,
          // hairline gold frame — makes it read as a keepsake, not a screenshot
          border: `2px solid ${C.gold500}`,
          fontFamily: 'Alegreya',
        }}
      >
        {/* centered so a short letter sits balanced instead of leaving a hole
            above the signature; a long one still fills the page */}
        <div
          style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'AlegreyaBold',
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: C.gold600,
            }}
          >
            {letter.archetypeTitle}
          </div>

          {/* the papuri, in three words — this is the line they screenshot */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 12,
              fontFamily: 'Fraunces',
              fontSize: 30,
              color: C.forest600,
            }}
          >
            {letter.traits}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 40,
              fontFamily: 'Fraunces',
              fontSize: 52,
              color: C.forest950,
            }}
          >
            {letter.greeting}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.55,
              color: C.forest800,
            }}
          >
            {letter.praise}
          </div>

          {letter.quote && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 34,
                paddingLeft: 26,
                borderLeft: `6px solid ${C.gold500}`,
              }}
            >
              <div style={{ display: 'flex', fontSize: 22, color: C.forest600 }}>
                You wrote this, to a student who will never read it:
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 12,
                  fontFamily: 'Fraunces',
                  fontSize: 34,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  color: C.forest950,
                }}
              >
                “{letter.quote}”
              </div>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 36,
              fontFamily: 'Fraunces',
              fontSize: 34,
              lineHeight: 1.35,
              color: C.forest950,
            }}
          >
            {letter.closing.map((c, i) => (
              <div key={i} style={{ display: 'flex' }}>
                {c}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: `1px solid ${C.cream300}`,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Caveat',
              fontSize: 82,
              color: C.forest800,
            }}
          >
            {letter.signature}
          </div>
          <div style={{ display: 'flex', marginTop: 4, fontSize: 20, color: C.forest500 }}>
            {letter.signatureSub}
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350, // 4:5 — the portrait ratio Instagram and Facebook both keep intact
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'normal' },
        { name: 'Fraunces', data: frauncesItalic, style: 'italic' },
        { name: 'Alegreya', data: alegreya, style: 'normal' },
        { name: 'AlegreyaBold', data: alegreyaBold, style: 'normal' },
        { name: 'Caveat', data: caveat, style: 'normal' },
      ],
      headers: {
        // the letter never changes once written; let the phone keep it
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  );
}
