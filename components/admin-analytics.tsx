'use client';

import { useEffect, useState } from 'react';

type Analytics = {
  totalRequests: number;
  newRequests: number;
  totalProducts: number;
  bestsellers: number;
};

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadAnalytics() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/admin/analytics', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to load analytics'
        );
      }

      setAnalytics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load analytics'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-signal p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          {error}
        </p>

        <button
          type="button"
          onClick={loadAnalytics}
          className="mt-5 border border-line px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-grey transition hover:border-signal hover:text-signal"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          Overview
        </p>

        <h2 className="mt-3 font-display text-5xl uppercase md:text-7xl">
          Analytics
        </h2>

        <p className="mt-4 max-w-lg text-paper-dim">
          Overview of your SONDERspace store activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-line p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
            Total requests
          </p>

          <p className="mt-6 font-display text-6xl">
            {analytics.totalRequests}
          </p>

          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-grey">
            All customer requests
          </p>
        </div>

        <div className="border border-line p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
            New requests
          </p>

          <p className="mt-6 font-display text-6xl text-signal">
            {analytics.newRequests}
          </p>

          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-grey">
            Waiting for action
          </p>
        </div>

        <div className="border border-line p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
            Products
          </p>

          <p className="mt-6 font-display text-6xl">
            {analytics.totalProducts}
          </p>

          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-grey">
            In the collection
          </p>
        </div>

        <div className="border border-line p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
            Bestsellers
          </p>

          <p className="mt-6 font-display text-6xl">
            {analytics.bestsellers}
          </p>

          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-grey">
            Products marked bestseller
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={loadAnalytics}
        className="mt-8 border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-grey transition hover:border-signal hover:text-signal"
      >
        Refresh analytics ↻
      </button>
    </div>
  );
}