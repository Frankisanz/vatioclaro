"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAVIGATION_ID = "mobile-primary-navigation";

const primaryLinks = [
  { href: "/consumo", label: "Consumo" },
  { href: "/comparativas", label: "Comparativas" },
  { href: "/guias", label: "Guías" },
  { href: "/calculadora", label: "Calculadoras" },
  { href: "/recomendaciones", label: "Productos útiles" },
] as const;

const secondaryLinks = [
  { href: "/metodologia", label: "Metodología" },
  { href: "/sobre-vatioclaro", label: "Sobre VatioClaro" },
] as const;

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileNavMenu({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="mobile-nav" ref={containerRef}>
      <button
        aria-controls={NAVIGATION_ID}
        aria-expanded={isOpen}
        aria-label="Menú principal"
        className="mobile-nav__trigger"
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" strokeWidth={1.8} />
        ) : (
          <Menu aria-hidden="true" strokeWidth={1.8} />
        )}
        <span className="mobile-nav__trigger-text">Menú</span>
      </button>
      {isOpen ? (
        <nav aria-label="Navegación principal móvil" id={NAVIGATION_ID}>
          {primaryLinks.map((link) => (
            <Link
              aria-current={
                isCurrentRoute(pathname, link.href) ? "page" : undefined
              }
              href={link.href}
              key={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          {secondaryLinks.map((link, index) => (
            <Link
              aria-current={
                isCurrentRoute(pathname, link.href) ? "page" : undefined
              }
              className={
                index === 0
                  ? "mobile-nav__secondary-link mobile-nav__secondary-link--first"
                  : "mobile-nav__secondary-link"
              }
              href={link.href}
              key={link.href}
              onClick={closeMenu}
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return <MobileNavMenu key={pathname} pathname={pathname} />;
}
