"use client";

import { track } from "@vercel/analytics";

type AffiliateLinkProps = {
  context: string;
  href: string;
  label: string;
  product: string;
};

export function AffiliateLink({
  context,
  href,
  label,
  product,
}: AffiliateLinkProps) {
  return (
    <a
      className="affiliate-link"
      href={href}
      onClick={() =>
        track("affiliate_click", {
          context,
          product,
        })
      }
      rel="sponsored nofollow noopener noreferrer"
      target="_blank"
    >
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
