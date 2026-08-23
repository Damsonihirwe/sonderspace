export type Product = {
  name: string;
  slug: string;
  genre: string;
  price: string;
  image: string;
  color: string;
  featured?: boolean;
};

export const artists: Product[] = [
  { name: 'Frank Ocean', slug: 'frank-ocean', genre: 'alternative / r&b', price: '$68', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80', color: '#d7d0c2', featured: true },
  { name: 'Sade', slug: 'sade', genre: 'soul / quiet storm', price: '$68', image: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=800&q=80', color: '#a7b2a0' },
  { name: 'Tyler, The Creator', slug: 'tyler-the-creator', genre: 'hip-hop / odd future', price: '$72', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80', color: '#c5a87d' },
  { name: 'Amy Winehouse', slug: 'amy-winehouse', genre: 'soul / jazz', price: '$68', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80', color: '#b68b84' },
  { name: 'Fela Kuti', slug: 'fela-kuti', genre: 'afrobeat / protest', price: '$72', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', color: '#ba9b53' },
  { name: 'Solange', slug: 'solange', genre: 'r&b / art pop', price: '$68', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', color: '#9da4b1' },
];
