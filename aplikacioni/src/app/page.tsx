import Link from "next/link"
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  let udhetimet: Udhetim[];

  try {
    udhetimet = await lexoUdhetimet();
  } catch {
    return (
      <main className="detail-shell">
        <p className="kicker">RideShare · Neon</p>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link className="action action--secondary" href="/">
          Provo përsëri
        </Link>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="hero">
        <div className="brand-mark" aria-hidden="true">
          RS
        </div>
        <div>
          <p className="kicker">RIDE / SHARE / AAB</p>
          <h1>Udhëtimet për në AAB.</h1>
          <p className="hero__copy">
            Zgjidh një nisje, kontrollo detajet dhe kërko vendin tënd.
          </p>
        </div>
      </header>

      <section className="section-heading" aria-labelledby="trip-list-heading">
        <div>
          <p className="kicker">Burimi: Neon · të dhëna fiktive</p>
          <h2 id="trip-list-heading">Gjej udhëtimin tënd</h2>
        </div>
        <span className="trip-count">{udhetimet.length} udhëtime</span>
      </section>

      {udhetimet.length === 0 ? (
        <p>Nuk ka udhëtime për momentin.</p>
      ) : (
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </div>
      )}

      <footer className="footer-note">
        MVP demonstrim · Të dhëna fiktive · Pa rezervim real
      </footer>
    </main>
  );
}
