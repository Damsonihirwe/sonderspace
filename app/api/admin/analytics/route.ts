import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalRequests,
      newRequests,
      totalProducts,
      bestsellers,
    ] = await Promise.all([
      prisma.teeRequest.count(),

      prisma.teeRequest.count({
        where: {
          status: 'NEW',
        },
      }),

      prisma.product.count(),

      prisma.product.count({
        where: {
          bestseller: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalRequests,
      newRequests,
      totalProducts,
      bestsellers,
    });
  } catch (error) {
    console.error('Analytics error:', error);

    return NextResponse.json(
      {
        error: 'Failed to load analytics.',
      },
      {
        status: 500,
      }
    );
  }
}