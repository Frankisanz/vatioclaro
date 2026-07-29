import Link from "next/link";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/lib/affiliate";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link className="brand" href="/">
          vatio<i aria-hidden="true" />claro
        </Link>
        <div className="site-footer__links">
          <Link href="/consumo">Guías de consumo</Link>
          <Link href="/guias">Guías prácticas</Link>
          <Link href="/recomendaciones">Productos útiles</Link>
          <Link href="/calculadora">Calculadora</Link>
          <Link href="/metodologia">Metodología</Link>
          <Link href="/sobre-vatioclaro">Sobre VatioClaro</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/afiliacion">Afiliación</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
        </div>
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
