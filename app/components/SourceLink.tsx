"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

type SourceLinkProps = {
  children: ReactNode;
  context: string;
  href: string;
  sourceId: string;
};

export function SourceLink({
  children,
  context,
  href,
  sourceId,
}: SourceLinkProps) {
  return (
    <a
      href={href}
      onClick={() => track("source_click", { context, source: sourceId })}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
