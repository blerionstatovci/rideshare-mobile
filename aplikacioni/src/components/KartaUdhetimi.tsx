import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  const kaVende = udhetim.vende > 0;
  return (
    <article className="trip-card">
      <div className="trip-card__topline">
        <span className="trip-card__number">0{udhetim.id}</span>
        <span
          className={
            kaVende ? "availability" : "availability availability--closed"
          }
        >
          {kaVende ? `${udhetim.vende} vende të lira` : "Plot"}
        </span>
      </div>
      <div className="route">
        <div>
          <span className="eyebrow">Nisja</span>
          <strong>{udhetim.nisja}</strong>
        </div>
        <span className="route__arrow" aria-hidden="true">
          →
        </span>
        <div>
          <span className="eyebrow">Destinacioni</span>
          <strong>{udhetim.destinacioni}</strong>
        </div>
      </div>
      <div className="trip-card__meta">
        <span>{udhetim.ora}</span>
        <span>{udhetim.shoferi}</span>
        <span>{udhetim.vendtakimi}</span>
      </div>
      {kaVende ? (
        <Link
          className="action action--secondary"
          href={`/udhetimi/${udhetim.id}`}
        >
          Shiko detajet <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <button className="action action--disabled" disabled>
          Nuk ka vende të lira
        </button>
      )}
    </article>
  );
}
