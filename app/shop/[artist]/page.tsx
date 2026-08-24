import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductOrderButton } from '@/components/product-order-button';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ artist: string }>;
}) {
  const { artist: slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="px-5 pb-24 pt-36 md:px-10">
      <div className="mx-auto max-w-[1440px]">

        {/* BACK TO SHOP */}
        <Link
          href="/shop"
          className="font-mono text-[10px] uppercase tracking-widest text-grey hover:text-signal"
        >
          ← Back to collection
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_.8fr]">

          {/* =========================
              PRODUCT IMAGES
          ========================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* FRONT IMAGE */}
            <div className="relative col-span-2 aspect-[4/3] bg-ink-2">
              <Image
                src={product.frontImage || product.image}
                alt={`${product.name} front`}
                fill
                className="object-cover"
                sizes="70vw"
                unoptimized
              />
            </div>

            {/* BACK IMAGE */}
            <div className="relative aspect-square bg-ink-2">
              <Image
                src={product.backImage || product.image}
                alt={`${product.name} back`}
                fill
                className="object-cover"
                sizes="35vw"
                unoptimized
              />
            </div>

            {/* CLOSEUP IMAGE */}
            <div className="relative aspect-square bg-ink-2">
              <Image
                src={product.closeupImage || product.image}
                alt={`${product.name} closeup`}
                fill
                className="object-cover"
                sizes="35vw"
                unoptimized
              />
            </div>

          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}

          <div className="md:pl-8">

            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
              Artist series / 001
            </p>

            <h1 className="mt-5 font-display text-7xl uppercase leading-[.84] md:text-8xl">
              {product.name}
            </h1>

            {product.genre && (
              <p className="mt-5 font-mono text-xs uppercase tracking-widest text-grey">
                {product.genre}
              </p>
            )}

            {/* PRICE */}
            <p className="mt-4 font-mono text-lg uppercase tracking-widest">
              {product.price}
            </p>

            {/* DESCRIPTION */}
            {product.description && (
              <p className="mt-6 text-lg text-paper-dim">
                {product.description}
              </p>
            )}

            {/* =========================
                ORDER BUTTON
            ========================= */}

            <div className="mt-12 border-t border-line pt-5">
              <ProductOrderButton
                artistName={product.name}
                productTitle={product.name}
                imageUrl={product.frontImage || product.image}
                color={product.color}
              />
            </div>

            {/* =========================
                SPOTIFY
            ========================= */}

            <div className="mt-12 border-t border-line pt-5">

              <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
                The sound
              </p>

              <p className="mt-4 text-lg text-paper-dim">
                For the songs that made the room feel different.
              </p>

              {product.spotifyLink && (
                <a
                  href={product.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-mono text-[10px] uppercase tracking-widest text-signal"
                >
                  Listen on Spotify ↗
                </a>
              )}

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}