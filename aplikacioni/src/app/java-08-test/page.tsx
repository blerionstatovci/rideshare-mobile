import { Vendtakimi } from "@/components/Vendtakimi";

const udhetimiFiktiv = {
  shoferi: "Driton",
  nisja: "Prishtinë",
  destinacioni: "Kolegji AAB",
  ora: "08:00",
  vendtakimi: "Te stacioni kryesor",
};

export default function Java08TestPage() {
  return (
    <main className="detail-shell">
      <header className="detail-header">
        <p className="kicker">Faqe lokale prove · Java 8</p>
        <h1>Udhëtimi i {udhetimiFiktiv.shoferi}</h1>
      </header>
      <section className="detail-card" aria-label="Të dhënat e udhëtimit provë">
        <div className="detail-grid">
          <div className="detail-item">
            <span>Nisja</span>
            <strong>{udhetimiFiktiv.nisja}</strong>
          </div>
          <div className="detail-item">
            <span>Destinacioni</span>
            <strong>{udhetimiFiktiv.destinacioni}</strong>
          </div>
          <div className="detail-item">
            <span>Data dhe ora</span>
            <strong>Sot, {udhetimiFiktiv.ora}</strong>
          </div>
          <div className="detail-item">
            <span>Shoferi</span>
            <strong>{udhetimiFiktiv.shoferi}</strong>
          </div>
        </div>
        <Vendtakimi vendtakimiFillestar={udhetimiFiktiv.vendtakimi} />
      </section>
    </main>
  );
}
