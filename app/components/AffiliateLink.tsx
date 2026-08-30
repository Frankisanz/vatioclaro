"use client";

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
      data-affiliate-context={context}
      data-affiliate-product={product}
      href={href}
      rel="sponsored nofollow noopener noreferrer"
      target="_blank"
    >
      <span>{label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
