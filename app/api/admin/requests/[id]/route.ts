import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_STATUSES = [
  'NEW',
  'CONTACTED',
  'PROCESSING',
  'COMPLETED',
  'CANCELLED',
] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid request status.' },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.teeRequest.update({
      where: { id },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      ok: true,
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Failed to update request:', error);

    return NextResponse.json(
      { error: 'Unable to update request.' },
      { status: 500 }
    );
  }
}