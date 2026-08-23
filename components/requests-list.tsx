import type { TeeRequest } from '@/lib/types';

export function RequestsList({ requests }: { requests: TeeRequest[] }) {
  if (requests.length === 0) {
    return (
      <div className="rounded border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">No requests yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {requests.map((request) => (
        <div key={request.id} className="border border-line p-6 hover:bg-ink-2 transition">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Artist</p>
              <p className="mt-1 font-display text-lg text-signal">{request.artistName}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Customer</p>
              <p className="mt-1 font-space-grotesk">{request.customerName}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Phone</p>
              <p className="mt-1 font-mono text-sm">{request.phone}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Type</p>
              <p className="mt-1 font-space-grotesk">{request.type}</p>
            </div>
          </div>
          {request.notes && (
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Notes</p>
              <p className="mt-1 text-paper-dim">{request.notes}</p>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-line">
            <p className="font-mono text-[9px] uppercase tracking-widest text-grey">
              Submitted: {new Date(request.createdAt).toLocaleDateString()} at {new Date(request.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
