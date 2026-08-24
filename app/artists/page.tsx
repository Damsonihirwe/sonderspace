import { prisma } from '@/lib/prisma';
import { DiscCard } from '@/components/disc-card';
import type { Product } from '@/lib/types';

export default async function Artists() {
  const dbProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const seenArtists = new Set<string>();

  const artists: Product[] = dbProducts
    .filter((product) => {
      const key = product.name.toLowerCase();

      if (seenArtists.has(key)) {
        return false;
      }

      seenArtists.add(key);
      return true;
    })
    .map((product) => ({
      name: product.name,
      slug: product.slug,
      genre: product.genre,
      price: product.price,
      image: product.image,
      color: product.color,
      featured: product.featured,
      description: product.description,
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors),
      category: product.category,
      bestseller: product.bestseller,
      spotifyLink: product.spotifyLink,
      frontImage: product.frontImage,
      backImage: product.backImage,
      closeupImage: product.closeupImage,
      createdAt: product.createdAt,
    }));

  return (
    <main className="px-5 pb-24 pt-36 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          The artist wall / 001
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-7xl uppercase leading-[.85] md:text-[10rem]">
          Name your
          <br />
          influence.
        </h1>

        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {artists.map((artist) => (
            <DiscCard
              key={artist.slug}
              artist={artist}
            />
          ))}
        </div>
      </div>
    </main>
  );
}