'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  withoutLink?: boolean;
}

export function Logo({ className = '', width = 450, height = 150, withoutLink = false }: LogoProps) {
  const locale = useLocale();
  const [imageError, setImageError] = useState(false);

  const logoContent = (
    <>
      {!imageError ? (
        <Image
          src="/images/logo.png"
          alt="HIGSS HUB"
          width={width}
          height={height}
          className={`h-[120px] w-auto object-contain hover:opacity-80 transition-opacity ${className}`}
          priority
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-4xl font-manrope font-bold text-text hover:text-accent transition-colors">
          HIGSS HUB
        </span>
      )}
    </>
  );

  if (withoutLink) {
    return <div className="flex items-center">{logoContent}</div>;
  }

  return (
    <Link href={`/${locale}`} className="flex items-center">
      {logoContent}
    </Link>
  );
}
