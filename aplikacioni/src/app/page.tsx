import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
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
          <p className="kicker">Sot · 01 Tetor</p>
          <h2 id="trip-list-heading">Gjej udhëtimin tënd</h2>
        </div>
        <span className="trip-count">{udhetimet.length} udhëtime</span>
      </section>
      <div className="trip-list">
        {udhetimet.map((udhetim) => (
          <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
        ))}
      </div>
      <footer className="footer-note">
        MVP demonstrim · Të dhëna fiktive · Pa rezervim real
      </footer>
    </main>
  );
}
