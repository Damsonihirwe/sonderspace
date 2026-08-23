import type { Metadata } from 'next';
import { Anton, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { TapeProgress } from '@/components/tape-progress';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' });

export const metadata: Metadata = { title: 'SONDERspace — Wear what you listen to.', description: 'Your favorite artist. Your own tee.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${anton.variable} ${grotesk.variable} ${mono.variable}`}><body><TapeProgress /><Nav />{children}<Footer /></body></html>;
}
