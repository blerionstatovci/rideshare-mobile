import Link from "next/link";
import { notFound } from "next/navigation";

import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main className="detail-shell">
        <p className="kicker">RideShare · Neon</p>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link className="action action--secondary" href="/">
          ← Kthehu te lista
        </Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main className="detail-shell">
      <Link className="back-link" href={`/udhetimi/${id}`}>
        ← Kthehu te detajet
      </Link>
      <section className="pending">
        <p className="kicker">
          Udhëtimi 0{udhetim.id} · {udhetim.shoferi}
        </p>
        {udhetim.vende > 0 ? (
          <>
            <h1>Simulim: Në pritje</h1>
            <p>
              Kërkesa për udhëtimin {udhetim.nisja} → {udhetim.destinacioni} u
              pranua nga demonstrimi.
            </p>
            <p>Nuk u dërgua te shoferi dhe nuk krijon rezervim real.</p>
          </>
        ) : (
          <h1>Nuk ka vende të lira.</h1>
        )}
      </section>
    </main>
  );
}
