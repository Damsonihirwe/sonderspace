'use client';

import Link from 'next/link';

export function RequestTeeButton() {
  return <Link href="/shop" className="fixed bottom-5 right-5 z-50 bg-signal px-6 py-5 font-mono text-xs font-bold uppercase tracking-widest text-paper shadow-lg transition hover:scale-[1.03] hover:bg-paper hover:text-ink active:scale-[.98] md:bottom-6 md:right-6">Request Your Tee <span className="ml-2">↗</span></Link>;
}
