import Link from "next/link";
import { notFound } from "next/navigation";

import { PreferuariUdhetimit } from "@/components/PreferuariUdhetimit";
import { Vendtakimi } from "@/components/Vendtakimi";
import { GjendjaUdhetimitLive } from "@/components/GjendjaUdhetimitLive";
import { lexoGjendjen } from "@/lib/kerkesat";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { profiliIm } from "@/lib/lejet";

export const dynamic = "force-dynamic";

export default async function Detajet({
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

  let gjendja = null;
  let perdoruesi = null;
  try {
    [gjendja, perdoruesi] = await Promise.all([lexoGjendjen(id), profiliIm()]);
  } catch {
    // Detajet mbeten të lexueshme edhe kur tabela e javës 10 ende s'është aplikuar.
  }

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
            <span>Vende të lira</span>
            <strong>{udhetim.vende}</strong>
          </div>
        </div>
        <Vendtakimi vendtakimiFillestar={udhetim.vendtakimi} />
        <PreferuariUdhetimit
          udhetimId={udhetim.id}
          pershkrimi={`${udhetim.nisja} – ${udhetim.destinacioni}`}
        />
      </section>
      {gjendja ? <GjendjaUdhetimitLive udhetimId={id} fillimi={gjendja} hyrNe={perdoruesi ? "" : "/api/auth/signin"} /> : (
        <section className="detail-card">
          <h2>Kërkesa për vend</h2>
          {!perdoruesi ? <><p>Hyr me GitHub për të kërkuar ose menaxhuar vendet.</p><Link className="action action--secondary" href="/api/auth/signin">Hyr me GitHub</Link></> : <p>Kërkesat live nuk janë gati. Ekzekuto <code>schema-java10.sql</code> në Neon pas migrimeve të mëparshme.</p>}
        </section>
      )}
    </main>
  );
}
