import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="VatioClaro, inicio">
        vatio<i aria-hidden="true" />claro
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/#guias">Guías de consumo</Link>
        <Link href="/calculadora">Calculadora</Link>
        <Link href="/metodologia">Metodología</Link>
      </nav>
      <Link className="header-cta" href="/calculadora">
        Calcular ahora
      </Link>
    </header>
  );
}
