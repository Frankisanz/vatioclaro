import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="contenido">
      <div className="eyebrow">Error 404</div>
      <h1>Esta página no consume nada.</h1>
      <p>No hemos encontrado la guía que buscabas.</p>
      <Link className="button button--dark" href="/">
        Volver al inicio
      </Link>
    </main>
  );
}
