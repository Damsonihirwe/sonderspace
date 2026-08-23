'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { ThemeLogo } from '@/components/theme-logo';

export function Nav() {
  const [open, setOpen] = useState(false);
  const { light, toggle } = useTheme();
  return <header className="fixed left-0 top-0 z-50 w-full text-paper">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
      <Link href="/" aria-label="SONDERspace home" className="flex h-8 w-[140px] items-center"><ThemeLogo width={140} height={32} /></Link>
      <div className="flex items-center gap-5"><button aria-label="Toggle dark and light mode" title={light ? 'Switch to dark mode' : 'Switch to light mode'} onClick={toggle} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] hover:text-signal"><span className={`h-3 w-3 border border-current ${light ? 'bg-paper' : 'bg-ink'}`} />{light ? 'Light' : 'Dark'}</button><button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.18em] md:hidden">{open ? 'Close' : 'Menu'} <span className="h-2 w-2 bg-signal" /></button></div>
      <nav className={`${open ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-6 bg-ink px-5 py-6 font-mono text-[11px] uppercase tracking-[.15em] md:static md:flex md:w-auto md:flex-row md:gap-8 md:bg-transparent md:p-0`}>
        <Link href="/shop" onClick={() => setOpen(false)} className="hover:text-signal">Collection</Link><Link href="/artists" onClick={() => setOpen(false)} className="hover:text-signal">Artists</Link><Link href="/the-space" onClick={() => setOpen(false)} className="hover:text-signal">The Space</Link><Link href="/request" onClick={() => setOpen(false)} className="hover:text-signal">Request a tee <span className="text-signal">↗</span></Link>
      </nav>
    </div>
  </header>;
}
