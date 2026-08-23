'use client';
import { useState } from 'react';
import { buildWhatsAppOrderLink } from '@/lib/whatsapp';

export function RequestForm() {
	const [sent, setSent] = useState(false);
	const [error, setError] = useState('');

	async function submit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');
		const form = new FormData(event.currentTarget);
		const artist = String(form.get('artist') || '');
		const name = String(form.get('name') || '');
		const phone = String(form.get('phone') || '');
		const type = String(form.get('type') || '');
		const notes = String(form.get('notes') || '');

		try {
			const response = await fetch('/api/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ artist, name, phone, type, notes }) });
			if (!response.ok) throw new Error('Request failed');
			window.open(buildWhatsAppOrderLink({ artistName: artist, productTitle: type, notes: `Name: ${name}. Phone: ${phone}. ${notes}` }), '_blank', 'noopener,noreferrer');
			setSent(true);
		} catch {
			setError('Something went wrong. Please try again.');
		}
	}

	return sent ? <div className="border border-signal p-8"><p className="font-display text-4xl uppercase">We got the signal.</p><p className="mt-3 text-paper-dim">Your WhatsApp order is ready to send.</p></div> : <form className="grid gap-5" onSubmit={submit}><div className="grid gap-5 md:grid-cols-2"><label>Artist name<input required name="artist" placeholder="Who are you listening to?" /></label><label>Your name<input required name="name" placeholder="Your name" /></label></div><label>WhatsApp number<input required name="phone" placeholder="+250 ..." /></label><label>What are we making?<select name="type" defaultValue="tee"><option value="tee">T-shirt</option><option value="long-sleeve">Long sleeve</option></select></label><label>Design notes<textarea name="notes" rows={4} placeholder="Colors, lyrics, era, feeling..." /></label>{error && <p className="font-mono text-[10px] uppercase tracking-widest text-signal">{error}</p>}<button type="submit" className="mt-2 w-full bg-signal px-6 py-4 text-left font-mono text-[11px] uppercase tracking-widest text-paper transition hover:bg-paper hover:text-ink">Send request <span className="float-right">↗</span></button></form>;
}
