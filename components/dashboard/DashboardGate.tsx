'use client';

import { useState } from 'react';

export default function DashboardGate({ code }: { code: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (busy || !password) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/dashboard-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        location.reload();
        return;
      }
      setError(res.status === 500 ? 'Dashboard password not configured.' : 'Incorrect password.');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-cream-50 px-6 text-forest-950">
      <div className="w-full max-w-sm rounded-3xl bg-cream-100 p-8 ring-1 ring-cream-300 shadow-md">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
          UPC Live
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium">Facilitator Access</h1>
        <p className="mt-2 font-sans text-sm text-forest-700">
          Enter the facilitator password to open the dashboard for session{' '}
          <span className="font-bold">{code}</span>.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void submit();
          }}
          placeholder="Password"
          aria-label="Facilitator password"
          className="mt-6 w-full rounded-full bg-cream-50 px-5 py-3 font-sans text-forest-950 ring-1 ring-cream-300 outline-none focus:ring-2 focus:ring-gold-500"
        />

        {error && <p className="mt-3 font-sans text-sm font-bold text-clay-600">{error}</p>}

        <button
          type="button"
          onClick={() => void submit()}
          disabled={busy || !password}
          className="mt-4 w-full rounded-full bg-forest-700 px-5 py-3 font-sans text-sm font-bold text-cream-50 disabled:opacity-40"
        >
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </div>
    </main>
  );
}
