'use client';
export function Waveform() { return <div aria-hidden="true" className="flex h-10 items-end gap-[3px]">{Array.from({ length: 32 }, (_, index) => <span key={index} className="wave-bar w-[3px] bg-signal" style={{ height: `${18 + ((index * 17) % 23)}%`, animationDelay: `${index * 35}ms` }} />)}</div>; }
