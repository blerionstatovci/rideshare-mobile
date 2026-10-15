import Link from "next/link";

import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";

import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 08:25. ID duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ m?: string | string[] }>;
}) {
  const { m } = await searchParams;
  const mesazh = typeof m === "string" ? mesazhet[m] : undefined;

  let profili;
  try {
    profili = await profiliIm();
  } catch {
    return (
      <main className="detail-shell">
        <p className="kicker">RideShare · Paneli</p>
        <h1>Paneli im</h1>
        <p role="alert">{mesazhet.databaza}</p>
        <Link className="action action--secondary" href="/panel">
          Provo përsëri
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-shell">
      <Link className="back-link" href="/">
        ← Kthehu te udhëtimet
      </Link>
      <div className="detail-header">
        <p className="kicker">RideShare · GitHub</p>
        <h1>Paneli im</h1>
      </div>
      <section className="detail-card panel-card">
        {mesazh ? <p role="status">{mesazh}</p> : null}
        {!profili ? (
          <>
            <p>Hyr me GitHub për të parë profilin dhe lejet e tua.</p>
            <Hyrja brenda={false} />
          </>
        ) : (
          <>
            <p>
              Përshëndetje, {profili.emri}. Roli: <strong>{profili.roli}</strong>.
            </p>
            <p>
              ID ime GitHub: <code>{profili.id}</code>
            </p>
            <Hyrja brenda />
            {profili.roli === "shofer" ? (
              <form className="driver-form" action={ruajOren}>
                <h2>Ndrysho orën e udhëtimit tim</h2>
                <input type="hidden" name="id" value="2" />
                <label htmlFor="ora">Ora e re</label>
                <input id="ora" name="ora" type="time" defaultValue="08:15" required />
                <button className="action action--secondary" type="submit">
                  Ruaj orën
                </button>
                <p>Formulari provon ID 2; serveri verifikon rolin dhe pronarin.</p>
              </form>
            ) : (
              <p>Si udhëtar mund t’i shohësh udhëtimet, por nuk mund të ndryshosh orën.</p>
            )}
          </>
        )}
      </section>
      <p className="footer-note">Kërkesa për vend mbetet simulim këtë javë.</p>
    </main>
  );
}
