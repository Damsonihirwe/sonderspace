import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/lib/types';

// Mock database storage (in a real app, this would be a database)
let products: Product[] = [];

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const data = await req.json();

    const newProduct: Product = {
      name: data.artistName,
      slug: data.slug,
      genre: data.genre,
      price: data.price,
      image: data.frontImage, // Use front image as main image
      color: data.color,
      featured: data.bestseller || false,
      description: data.description,
      sizes: data.sizes,
      colors: data.colors,
      category: data.category,
      bestseller: data.bestseller,
      spotifyLink: data.spotifyLink,
      frontImage: data.frontImage,
      backImage: data.backImage,
      closeupImage: data.closeupImage,
      createdAt: new Date(),
    };

    // Validate required fields
    if (!newProduct.name || !newProduct.slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    if (products.some((p) => p.slug === newProduct.slug)) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 409 }
      );
    }

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json(products);
}
