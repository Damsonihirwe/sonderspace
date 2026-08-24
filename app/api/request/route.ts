import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body?.artist || !body?.name || !body?.phone) {
      return NextResponse.json(
        {
          error: 'Artist, name, and phone are required.',
        },
        { status: 400 }
      );
    }

    const newRequest = await prisma.teeRequest.create({
      data: {
        artistName: body.artist,
        customerName: body.name,
        phone: body.phone,
        type: body.type || 'tee',
        notes: body.notes || '',
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: 'Request received.',
        requestId: newRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create tee request:', error);

    return NextResponse.json(
      {
        error: 'Unable to save request. Please try again.',
      },
      { status: 500 }
    );
  }
}