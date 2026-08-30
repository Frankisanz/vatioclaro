"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TrackedGuideLinkProps = {
  children: ReactNode;
  className?: string;
  context: string;
  href: string;
  prefetch?: boolean;
};

export function TrackedGuideLink({
  children,
  className,
  context,
  href,
  prefetch,
}: TrackedGuideLinkProps) {
  return (
    <Link
      className={className}
      data-guide-context={context}
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
