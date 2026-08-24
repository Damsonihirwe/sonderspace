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

export async function GET() {
  try {
    const requests = await prisma.teeRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const statusOrder = {
      NEW: 1,
      APPROVED: 2,
      COMPLETED: 3,
      REJECTED: 4,
    };

    const sortedRequests = requests.sort((a, b) => {
      const statusA =
        statusOrder[a.status as keyof typeof statusOrder] || 99;

      const statusB =
        statusOrder[b.status as keyof typeof statusOrder] || 99;

      if (statusA !== statusB) {
        return statusA - statusB;
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });

    return NextResponse.json(sortedRequests);
  } catch (error) {
    console.error('Failed to fetch tee requests:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch requests.',
      },
      { status: 500 }
    );
  }
}