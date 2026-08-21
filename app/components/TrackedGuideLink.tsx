"use client";

import { track } from "@vercel/analytics";
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
      href={href}
      onClick={() => track("guide_click", { context, destination: href })}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
