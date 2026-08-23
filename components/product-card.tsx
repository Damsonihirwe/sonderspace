import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
export function ProductCard({ product }: { product: Product }) { return <Link href={`/shop/${product.slug}`} className="group"><div className="relative aspect-[4/5] overflow-hidden bg-ink-2"><Image src={product.image} alt={`${product.name} artist tee`} fill className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" sizes="(max-width: 768px) 50vw, 25vw" /><div className="absolute bottom-3 left-3 bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-paper">New design</div></div><div className="pt-3 font-mono text-[10px] uppercase tracking-widest"><span>{product.name} / 01</span></div></Link>; }
