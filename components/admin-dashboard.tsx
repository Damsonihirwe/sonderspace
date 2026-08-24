'use client';

import { useState } from 'react';
import type { TeeRequest } from '@/lib/types';
import { AddProductForm } from './add-product-form';
import { RequestsList } from './requests-list';
import { AdminProductsList } from './admin-products-list';

export function AdminDashboard({
  requests,
}: {
  requests: TeeRequest[];
}) {
  const [activeTab, setActiveTab] = useState<
    'requests' | 'products' | 'add-product'
  >('requests');

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });

      window.location.href = '/admin';
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Header */}
      <div className="border-b border-line px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl uppercase md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-grey">
              Manage requests and products
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="shrink-0 border border-line px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-grey transition hover:border-signal hover:text-signal disabled:opacity-50"
          >
            {loggingOut ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-line px-5 md:px-10">
        <div className="mx-auto flex max-w-[1440px] gap-8">

          {/* Requests */}
          <button
            onClick={() => setActiveTab('requests')}
            className={`border-b-2 py-4 font-mono text-[10px] uppercase tracking-widest transition ${
              activeTab === 'requests'
                ? 'border-signal text-signal'
                : 'border-transparent text-grey hover:text-paper'
            }`}
          >
            Requests ({requests.length})
          </button>

          {/* Products */}
          <button
            onClick={() => setActiveTab('products')}
            className={`border-b-2 py-4 font-mono text-[10px] uppercase tracking-widest transition ${
              activeTab === 'products'
                ? 'border-signal text-signal'
                : 'border-transparent text-grey hover:text-paper'
            }`}
          >
            Products
          </button>

          {/* Add Product */}
          <button
            onClick={() => setActiveTab('add-product')}
            className={`border-b-2 py-4 font-mono text-[10px] uppercase tracking-widest transition ${
              activeTab === 'add-product'
                ? 'border-signal text-signal'
                : 'border-transparent text-grey hover:text-paper'
            }`}
          >
            Add Product
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1440px]">

          {activeTab === 'requests' && (
            <RequestsList requests={requests} />
          )}

          {activeTab === 'products' && (
  <AdminProductsList />
)}

          {activeTab === 'add-product' && (
            <AddProductForm />
          )}

        </div>
      </div>
    </div>
  );
}