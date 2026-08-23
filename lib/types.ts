export type Product = {
  name: string;
  slug: string;
  genre: string;
  price: string;
  image: string;
  color: string;
  featured?: boolean;
  description?: string;
  sizes?: string[];
  colors?: string[];
  category?: string;
  bestseller?: boolean;
  spotifyLink?: string;
  frontImage?: string;
  backImage?: string;
  closeupImage?: string;
  createdAt?: Date;
};

export type TeeRequest = {
  id: string;
  artistName: string;
  customerName: string;
  phone: string;
  type: string;
  notes: string;
  createdAt: Date;
};

export const artists: Product[] = [
  { name: 'Frank Ocean', slug: 'frank-ocean', genre: 'alternative / r&b', price: '$68', image: '/images/tees/IMG_20260821_173249_104.jpg.jpeg', color: '#d7d0c2', featured: true },
  { name: 'Central Cee', slug: 'central-cee', genre: 'hip-hop / uk rap', price: '$68', image: '/images/tees/IMG_20260821_173253_444.jpg.jpeg', color: '#a7b2a0', featured: true },
  { name: 'The Weeknd', slug: 'the-weeknd', genre: 'r&b / pop', price: '$72', image: '/images/tees/IMG_20260821_173251_273.jpg.jpeg', color: '#c5a87d' },
  { name: 'Kanye West', slug: 'kanye-west', genre: 'hip-hop / experimental', price: '$68', image: '/images/tees/IMG_20260821_173255_487.jpg.jpeg', color: '#b68b84' },
  { name: 'Brent Faiyaz', slug: 'brent-faiyaz', genre: 'r&b / soul', price: '$72', image: '/images/tees/IMG_20260821_173302_329.jpg.jpeg', color: '#ba9b53' },
  { name: 'Frank Ocean / alt', slug: 'frank-ocean-alt', genre: 'alternative / long sleeve', price: '$78', image: '/images/tees/IMG_20260821_173241_954.jpg.jpeg', color: '#9da4b1' },
  { name: 'Central Cee / alt', slug: 'central-cee-alt', genre: 'hip-hop / long sleeve', price: '$72', image: '/images/tees/IMG_20260821_173246_976.jpg.jpeg', color: '#9da4b1' },
  { name: 'The Weeknd / alt', slug: 'the-weeknd-alt', genre: 'r&b / heavyweight tee', price: '$68', image: '/images/tees/IMG_20260821_173300_176.jpg.jpeg', color: '#ba9b53' },
];
