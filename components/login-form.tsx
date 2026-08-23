'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setDebugInfo('');
    setLoading(true);

    try {
      // First verify credentials via API
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!verifyRes.ok) {
        setError('Invalid username or password.');
        setLoading(false);
        return;
      }

      // Then sign in with NextAuth
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      setLoading(false);

      if (result?.error) {
        setError('Login failed. Please try again.');
        setDebugInfo(`NextAuth error: ${result.error}`);
        return;
      }

      if (result?.ok) {
        window.location.href = '/admin';
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
      setDebugInfo(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-ink px-5">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <h1 className="font-display text-5xl uppercase text-paper">Admin</h1>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-grey">SONDERspace management</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 border-t border-line pt-8">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="sonderspaceadmin"
              className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 font-space-grotesk text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
              disabled={loading}
              required
            />
          </label>

          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-grey">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full border-b border-line bg-transparent px-0 py-2 font-space-grotesk text-paper placeholder-grey/50 focus:border-signal focus:outline-none"
              disabled={loading}
              required
            />
          </label>

          {error && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{error}</p>
          )}

          {debugInfo && (
            <p className="font-mono text-[9px] uppercase tracking-widest text-paper-dim bg-ink-2 p-2">{debugInfo}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-signal px-6 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-widest text-paper transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'} <span className="float-right">↗</span>
          </button>

          <div className="mt-4 p-4 bg-ink-2 border border-line text-[9px] font-mono text-grey space-y-1">
            <p><strong>Debug credentials:</strong></p>
            <p>Username: sonderspaceadmin</p>
            <p>Password: sonderspace@buystore</p>
          </div>
        </form>
      </div>
    </div>
  );
}
