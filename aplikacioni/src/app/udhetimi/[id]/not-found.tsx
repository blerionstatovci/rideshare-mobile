import Link from "next/link";

export default function UdhetimiNukUGjet() {
  return (
    <main className="detail-shell not-found">
      <p className="kicker">RideShare · 404</p>
      <h1>Udhëtimi nuk u gjet</h1>
      <p>Kjo adresë nuk përputhet me një udhëtim në listë.</p>
      <Link className="action action--secondary" href="/">
        Kthehu te lista
      </Link>
    </main>
  );
}
