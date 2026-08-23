'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/theme-provider';

export function ThemeLogo({
  className,
  width = 140,
  height = 32,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const { light } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div aria-hidden="true" style={{ width, height }} className={className} />;

  const src = light
    ? '/logos/Gemini_Generated_Image_ol5lllol5lllol5l-removebg-preview.png'
    : '/logos/b9aaf4bc-ce6b-4d42-a0fb-e10dfdfb1487-removebg-preview.png';

  return <Image src={src} alt="SONDERspace" width={width} height={height} className={className} priority />;
}