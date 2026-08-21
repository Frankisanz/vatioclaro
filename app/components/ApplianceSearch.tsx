"use client";

import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";

type SearchItem = {
  name: string;
  slug: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .trim();
}

export function ApplianceSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeQuery = query.trim().slice(0, 80);

    if (!safeQuery) {
      return;
    }

    const normalized = normalize(safeQuery);
    const exact = items.find((item) => normalize(item.name) === normalized);
    const partial = items.find(
      (item) =>
        normalize(item.name).includes(normalized) ||
        normalized.includes(normalize(item.name)),
    );
    const match = exact ?? partial;

    track("appliance_search", {
      destination: match ? "guide" : "calculator",
      ...(match ? { slug: match.slug } : {}),
    });

    router.push(
      match
        ? `/consumo/${match.slug}`
        : `/calculadora?aparato=${encodeURIComponent(safeQuery)}`,
    );
  }

  return (
    <form className="appliance-search" onSubmit={submit} role="search">
      <label htmlFor="appliance-search-input">
        ¿Qué aparato quieres calcular?
      </label>
      <div className="appliance-search__controls">
        <input
          autoComplete="off"
          id="appliance-search-input"
          list={listId}
          maxLength={80}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ej.: aire acondicionado, horno o router"
          type="search"
          value={query}
        />
        <datalist id={listId}>
          {items.map((item) => (
            <option key={item.slug} value={item.name} />
          ))}
        </datalist>
        <button className="button button--dark" type="submit">
          Buscar o calcular
        </button>
      </div>
      <p>
        Si tenemos una guía, iremos a ella. Si no, abrirás la calculadora sin
        crear una página automática.
      </p>
    </form>
  );
}
