import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// =========================
// GET ONE PRODUCT
// =========================

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch product.' },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE PRODUCT
// =========================

export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const data = await req.json();

    // Make sure product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    // Check if another product already uses this slug
    if (data.slug && data.slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: {
          slug: data.slug,
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'A product with this slug already exists.' },
          { status: 409 }
        );
      }
    }

    const product = await prisma.product.update({
      where: {
        id,
      },

      data: {
        name:
          data.name !== undefined
            ? data.name
            : existingProduct.name,

        slug:
          data.slug !== undefined
            ? data.slug
            : existingProduct.slug,

        genre:
          data.genre !== undefined
            ? data.genre
            : existingProduct.genre,

        price:
          data.price !== undefined
            ? data.price
            : existingProduct.price,

        category:
          data.category !== undefined
            ? data.category
            : existingProduct.category,

        bestseller:
          data.bestseller !== undefined
            ? Boolean(data.bestseller)
            : existingProduct.bestseller,

        featured:
          data.featured !== undefined
            ? Boolean(data.featured)
            : existingProduct.featured,

        // IMAGE FIELDS
        frontImage:
          data.frontImage !== undefined
            ? data.frontImage
            : existingProduct.frontImage,

        backImage:
          data.backImage !== undefined
            ? data.backImage
            : existingProduct.backImage,

        closeupImage:
          data.closeupImage !== undefined
            ? data.closeupImage
            : existingProduct.closeupImage,

        // Main image follows the front image
        image:
          data.frontImage !== undefined
            ? data.frontImage
            : existingProduct.image,
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

// =========================
// DELETE PRODUCT
// =========================

export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
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