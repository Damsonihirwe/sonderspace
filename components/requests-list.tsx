'use client';

import { useState } from 'react';
import type { TeeRequest } from '@/lib/types';

const STATUSES = [
  'NEW',
  'CONTACTED',
  'PROCESSING',
  'COMPLETED',
  'CANCELLED',
] as const;

export function RequestsList({ requests }: { requests: TeeRequest[] }) {
  const [requestList, setRequestList] = useState(requests);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    setError(null);

    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to update status.');
      }

      setRequestList((current) =>
        current.map((request) =>
          request.id === id
            ? { ...request, status: data.request.status }
            : request
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update request status.'
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (requestList.length === 0) {
    return (
      <div className="rounded border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          No requests yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {error && (
        <div className="border border-signal p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
            {error}
          </p>
        </div>
      )}

      {requestList.map((request) => (
        <div
          key={request.id}
          className="border border-line p-6 transition hover:bg-ink-2"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Artist
              </p>
              <p className="mt-1 font-display text-lg text-signal">
                {request.artistName}
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Customer
              </p>
              <p className="mt-1 font-space-grotesk">
                {request.customerName}
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Phone
              </p>
              <p className="mt-1 font-mono text-sm">{request.phone}</p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Type
              </p>
              <p className="mt-1 font-space-grotesk">{request.type}</p>
            </div>
          </div>

          {request.notes && (
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                Notes
              </p>
              <p className="mt-1 text-paper-dim">{request.notes}</p>
            </div>
          )}

          <div className="mt-4 border-t border-line pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-grey">
                Submitted:{' '}
                {new Date(request.createdAt).toLocaleDateString()} at{' '}
                {new Date(request.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor={`status-${request.id}`}
                className="font-mono text-[9px] uppercase tracking-widest text-grey"
              >
                Status
              </label>

              <select
                id={`status-${request.id}`}
                value={request.status}
                disabled={updatingId === request.id}
                onChange={(event) =>
                  updateStatus(request.id, event.target.value)
                }
                className="border border-line bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-paper outline-none transition focus:border-signal disabled:opacity-50"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}