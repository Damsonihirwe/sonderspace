import { NextResponse } from 'next/server';
export async function POST(request: Request) { const body = await request.json().catch(() => null); if (!body?.artist || !body?.name || !body?.phone) return NextResponse.json({ error: 'Artist, name, and phone are required.' }, { status: 400 }); return NextResponse.json({ ok: true, message: 'Request received.' }); }
