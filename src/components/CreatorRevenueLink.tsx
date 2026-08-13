'use client';

import { usePathname } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';

type CreatorRevenueLinkProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function creatorRevenueLinkRel(pathname: string): string {
  return pathname === '/' ? 'noopener noreferrer' : 'nofollow noopener noreferrer';
}

export default function CreatorRevenueLink({ children, className, style }: CreatorRevenueLinkProps) {
  const pathname = usePathname();

  return (
    <a
      href="https://creatorrevenuecalculator.com"
      target="_blank"
      rel={creatorRevenueLinkRel(pathname)}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
