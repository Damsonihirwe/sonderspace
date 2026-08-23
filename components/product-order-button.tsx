'use client';

import { useState } from 'react';
import { buildWhatsAppOrderLink } from '@/lib/whatsapp';

export function ProductOrderButton({ artistName, productTitle, imageUrl, color }: { artistName: string; productTitle: string; imageUrl: string; color: string }) {
  const [size, setSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  function openWhatsApp() {
    if (!size || !selectedColor) return;
    window.open(buildWhatsAppOrderLink({ artistName, productTitle, imageUrl: new URL(imageUrl, window.location.origin).toString(), size, color: selectedColor }), '_blank', 'noopener,noreferrer');
  }

  return <>
    <p className="font-mono text-[10px] uppercase tracking-widest text-grey">Choose a size</p>
    <div className="mt-4 grid grid-cols-4 gap-2">{['S', 'M', 'L', 'XL'].map((option) => <button type="button" key={option} onClick={() => setSize(option)} className={`border py-3 font-mono text-xs ${size === option ? 'border-signal bg-signal text-paper' : 'border-line hover:border-signal'}`}>{option}</button>)}</div>
    <label className="mt-6 block font-mono text-[10px] uppercase tracking-widest text-grey">Choose a color
      <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)} className="mt-3 border border-line px-3 py-3 text-sm normal-case tracking-normal text-paper">
        <option value="">Select a color</option>
        <option value={color}>Signature color</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
      </select>
    </label>
    <button type="button" onClick={openWhatsApp} disabled={!size || !selectedColor} className="mt-5 w-full bg-signal px-5 py-4 text-left font-mono text-[11px] font-bold uppercase tracking-widest text-paper transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:opacity-50">Make Order <span className="float-right">↗</span></button>
    {(!size || !selectedColor) && <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-grey">Select a size and color to continue.</p>}
  </>;
}
