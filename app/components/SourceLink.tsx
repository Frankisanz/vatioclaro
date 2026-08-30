"use client";

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
      data-source-context={context}
      data-source-id={sourceId}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
