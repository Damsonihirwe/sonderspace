import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.artistName || !data.slug) {
      return NextResponse.json(
        { error: 'Artist name and slug are required.' },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this slug already exists.' },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.artistName,
        slug: data.slug,
        genre: data.genre || '',
        price: data.price || '',
        image: data.frontImage || '',
        color: data.color || '',
        featured: data.bestseller || false,
        description: data.description || '',
        sizes: JSON.stringify(data.sizes || []),
        colors: JSON.stringify(data.colors || []),
        category: data.category || 'tee',
        bestseller: data.bestseller || false,
        spotifyLink: data.spotifyLink || '',
        frontImage: data.frontImage || '',
        backImage: data.backImage || '',
        closeupImage: data.closeupImage || '',
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);

    return NextResponse.json(
      { error: 'Failed to create product.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Product fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
}