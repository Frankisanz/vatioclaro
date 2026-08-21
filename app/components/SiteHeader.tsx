import { Menu } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="VatioClaro, inicio">
        vatio<i aria-hidden="true" />claro
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/consumo">Consumo</Link>
        <Link href="/comparativas">Comparativas</Link>
        <Link href="/guias">Guías</Link>
        <Link href="/calculadora">Calculadoras</Link>
        <Link href="/recomendaciones">Productos útiles</Link>
      </nav>
      <Link className="header-cta" href="/calculadora">
        Calcular ahora
      </Link>
      <Suspense
        fallback={
          <span aria-hidden="true" className="mobile-nav mobile-nav--fallback">
            <span className="mobile-nav__trigger">
              <Menu aria-hidden="true" strokeWidth={1.8} />
              <span className="mobile-nav__trigger-text">Menú</span>
            </span>
          </span>
        }
      >
        <MobileNav />
      </Suspense>
    </header>
  );
}
