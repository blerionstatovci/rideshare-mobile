import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function Detajet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);
  if (!udhetim) notFound();
  return (
    <main className="detail-shell">
      <Link className="back-link" href="/">
        ← Kthehu te lista
      </Link>
      <div className="detail-header">
        <p className="kicker">Detajet e udhëtimit · 0{udhetim.id}</p>
        <h1>
          {udhetim.nisja} → {udhetim.destinacioni}
        </h1>
      </div>
      <section className="detail-card">
        <div className="detail-grid">
          <div className="detail-item">
            <span>Ora e nisjes</span>
            <strong>{udhetim.ora}</strong>
          </div>
          <div className="detail-item">
            <span>Shoferi</span>
            <strong>{udhetim.shoferi}</strong>
          </div>
          <div className="detail-item">
            <span>Vendtakimi</span>
            <strong>{udhetim.vendtakimi}</strong>
          </div>
          <div className="detail-item">
            <span>Vende të lira</span>
            <strong>{udhetim.vende}</strong>
          </div>
        </div>
        <Link
          className="action action--secondary"
          href={`/udhetimi/${id}/kerkesa`}
        >
          Kërko vend <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
