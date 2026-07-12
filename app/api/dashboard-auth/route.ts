import { NextResponse } from 'next/server';
import { expectedCookie, passwordValid } from '@/lib/dashboardAuth';

export async function POST(request: Request) {
  const expected = expectedCookie();
  if (expected === null) {
    return NextResponse.json({ error: 'not configured' }, { status: 500 });
  }
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!passwordValid(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('upc-dash', expected, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14,
    path: '/',
  });
  return res;
}
