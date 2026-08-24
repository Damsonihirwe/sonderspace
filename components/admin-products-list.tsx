'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  slug: string;
  genre: string;
  price: string;
  image: string;
  category: string;
  bestseller: boolean;
  featured: boolean;
  createdAt: string;
};

export function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/admin/products');

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load products'
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-signal p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          {error}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-line p-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-grey">
          No products yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-line p-4 transition hover:bg-ink-2 md:p-6"
        >
          <div className="grid gap-6 md:grid-cols-[140px_1fr_auto] md:items-center">

            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-ink-2">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono text-[9px] uppercase text-grey">
                    No image
                  </span>
                </div>
              )}
            </div>

            {/* Information */}
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-signal">
                {product.category}
              </p>

              <h2 className="mt-2 font-display text-3xl uppercase">
                {product.name}
              </h2>

              {product.genre && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-grey">
                  {product.genre}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                <span>{product.price}</span>

                {product.bestseller && (
                  <span className="text-signal">
                    Bestseller
                  </span>
                )}

                {product.featured && (
                  <span className="text-signal">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Slug */}
            <div className="border-t border-line pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
              <p className="font-mono text-[9px] uppercase tracking-widest text-grey">
                Slug
              </p>

              <p className="mt-2 break-all font-mono text-[10px] text-paper-dim">
                {product.slug}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}