import { prisma } from '@/lib/prisma';
import { ProductCard } from '@/components/product-card';

export default async function Shop() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    sizes: JSON.parse(product.sizes || '[]'),
    colors: JSON.parse(product.colors || '[]'),
  }));

  return (
    <main className="px-5 pb-24 pt-36 md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          The collection / 2026
        </p>

        <h1 className="mt-5 border-b border-line pb-10 font-display text-7xl uppercase leading-[.85] md:text-[10rem]">
          Wear the
          <br />
          sound.
        </h1>

        <div className="grid grid-cols-2 gap-3 pt-10 md:grid-cols-4">
          {formattedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </main>
  );
}