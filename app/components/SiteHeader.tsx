import { Menu } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="VatioClaro, inicio">
        vatio<i aria-hidden="true" />claro
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/consumo">Consumo</Link>
        <Link href="/guias">Guías</Link>
        <Link href="/calculadora">Calculadora</Link>
        <Link href="/metodologia">Metodología</Link>
      </nav>
      <Link className="header-cta" href="/calculadora">
        Calcular ahora
      </Link>
      <details className="mobile-nav">
        <summary>
          <Menu aria-hidden="true" strokeWidth={1.8} />
          <span>Menú</span>
        </summary>
        <nav aria-label="Navegación móvil">
          <Link href="/consumo">Guías de consumo</Link>
          <Link href="/guias">Guías prácticas</Link>
          <Link href="/calculadora">Calculadora</Link>
          <Link href="/metodologia">Metodología</Link>
          <Link href="/sobre-vatioclaro">Sobre VatioClaro</Link>
        </nav>
      </details>
    </header>
  );
}
