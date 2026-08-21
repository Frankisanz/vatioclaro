import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/lib/affiliate";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link
          aria-label="VatioClaro, inicio"
          className="brand"
          href="/"
          prefetch={false}
        >
          vatio<i aria-hidden="true" />claro
        </Link>
        <nav className="site-footer__links" aria-label="Navegación del pie">
          <Link href="/consumo" prefetch={false}>
            Consumo
          </Link>
          <Link href="/comparativas" prefetch={false}>
            Comparativas
          </Link>
          <Link href="/guias" prefetch={false}>
            Guías
          </Link>
          <Link href="/calculadora" prefetch={false}>
            Calculadoras
          </Link>
          <Link href="/recomendaciones" prefetch={false}>
            Productos útiles
          </Link>
          <Link href="/metodologia" prefetch={false}>
            Metodología
          </Link>
          <Link href="/sobre-vatioclaro" prefetch={false}>
            Sobre VatioClaro
          </Link>
          <Link href="/privacidad" prefetch={false}>
            Privacidad
          </Link>
          <Link href="/cookies" prefetch={false}>
            Cookies
          </Link>
          <Link href="/afiliacion" prefetch={false}>
            Afiliación
          </Link>
          <Link href="/aviso-legal" prefetch={false}>
            Aviso legal
          </Link>
        </nav>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} VatioClaro</span>
        <span>
          Estimaciones informativas. Comprueba siempre la etiqueta y tu factura.
        </span>
      </div>
      <p className="site-footer__affiliate">{AMAZON_ASSOCIATE_DISCLOSURE}</p>
    </footer>
  );
}
