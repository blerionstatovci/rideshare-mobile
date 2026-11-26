import Link from "next/link";
import { njoftimetEPerdoruesit } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export default async function Njoftimet() {
  let items: Awaited<ReturnType<typeof njoftimetEPerdoruesit>> = [];
  let gabim = false;
  try { items = await njoftimetEPerdoruesit(); } catch { gabim = true; }
  return <main className="detail-shell"><Link className="back-link" href="/">← Udhëtimet</Link>
    <div className="detail-header"><p className="kicker">RideShare · Inbox</p><h1>Njoftimet</h1></div>
    <section className="detail-card"><p>{gabim ? "Njoftimet nuk u ngarkuan. Kontrollo migrimin schema-java11.sql." : "Përgjigjet e shoferëve për kërkesat e tua."}</p>
      {!gabim && items.length === 0 ? <p>Nuk ke njoftime ende.</p> : null}
      {items.map((item) => <article className="request-row" key={item.id}>
        <span>{item.pergjigjja === "pranuar" ? "Shoferi e pranoi" : "Shoferi e refuzoi"} kërkesën · {item.nisja} → {item.destinacioni} · {item.ora}{!item.lexuar_me ? " · E palexuar" : ""}</span>
        <Link className="action action--secondary" href={`/njoftimet/${item.id}`}>Hap kërkesën</Link>
      </article>)}
    </section></main>;
}
