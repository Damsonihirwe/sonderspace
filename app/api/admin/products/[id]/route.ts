import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required.' },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      ok: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    console.error('Product deletion error:', error);

    return NextResponse.json(
      { error: 'Failed to delete product.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required.' },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product update error:', error);

    return NextResponse.json(
      { error: 'Failed to update product.' },
      { status: 500 }
    );
  }
}