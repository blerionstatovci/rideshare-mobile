"use client";

import { useState, type FormEvent } from "react";

type VendtakimiProps = {
  vendtakimiFillestar: string;
};

type GjendjaLokacionit =
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "timeout"
  | "unavailable";

export function Vendtakimi({ vendtakimiFillestar }: VendtakimiProps) {
  const [tekstNeForme, setTekstNeForme] = useState(vendtakimiFillestar);
  const [vendtakimiIZgjedhur, setVendtakimiIZgjedhur] =
    useState(vendtakimiFillestar);
  const [gjendjaLokacionit, setGjendjaLokacionit] =
    useState<GjendjaLokacionit>("idle");
  const [mesazhiLokacionit, setMesazhiLokacionit] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);
  const [gabimiVendtakimit, setGabimiVendtakimit] = useState("");
  const [mesazhiKonfirmimit, setMesazhiKonfirmimit] = useState("");
  const kaGabimLokacioni = ["denied", "timeout", "unavailable"].includes(
    gjendjaLokacionit,
  );

  function konfirmoVendtakimin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const vendtakimi = tekstNeForme.trim();

    if (!vendtakimi) {
      setGabimiVendtakimit("Shkruaj një vendtakim para se ta konfirmosh.");
      setMesazhiKonfirmimit("");
      return;
    }

    setVendtakimiIZgjedhur(vendtakimi);
    setGabimiVendtakimit("");
    setMesazhiKonfirmimit("Vendtakimi u konfirmua në këtë pajisje.");
  }

  function kerkoVendndodhjen() {
    setGjendjaLokacionit("loading");
    setMesazhiLokacionit("Po kërkojmë vendndodhjen…");
    setSaktesia(null);

    const geolocation = navigator.geolocation;

    if (!geolocation) {
      setGjendjaLokacionit("unavailable");
      setMesazhiLokacionit(
        "Kjo pajisje nuk e mbështet vendndodhjen. Shkruaje vendtakimin manualisht.",
      );
      return;
    }

    try {
      geolocation.getCurrentPosition(
        (pozicioni) => {
          const saktesia = Math.round(pozicioni.coords.accuracy);
          setGjendjaLokacionit("success");
          setSaktesia(saktesia);
          setMesazhiLokacionit(
            "Pozicioni u mor. Shkruaj emrin e vendtakimit dhe konfirmoje. Koordinatat nuk ruhen.",
          );
        },
        (gabimi) => {
          if (gabimi.code === 1) {
            setGjendjaLokacionit("denied");
            setMesazhiLokacionit(
              "Leja për vendndodhjen u refuzua. Shkruaje vendtakimin manualisht.",
            );
          } else if (gabimi.code === 3) {
            setGjendjaLokacionit("timeout");
            setMesazhiLokacionit(
              "Kërkimi i pozicionit skadoi pas 10 sekondash. Provo përsëri ose shkruaje vendtakimin manualisht.",
            );
          } else {
            setGjendjaLokacionit("unavailable");
            setMesazhiLokacionit(
              "Telefoni nuk e dha pozicionin. Shkruaje vendtakimin manualisht.",
            );
          }
        },
        { timeout: 10000 },
      );
    } catch {
      setGjendjaLokacionit("unavailable");
      setMesazhiLokacionit(
        "Nuk mundëm ta nisim kërkimin e pozicionit. Shkruaje vendtakimin manualisht.",
      );
    }
  }

  return (
    <section className="meeting-point" aria-labelledby="meeting-point-heading">
      <h2 id="meeting-point-heading">Vendtakimi</h2>
      <p
        className="meeting-point__selected"
        data-testid="confirmed-meeting"
        aria-live="polite"
      >
        Vendtakimi i zgjedhur: <strong>{vendtakimiIZgjedhur}</strong>
      </p>

      <form className="meeting-point__form" onSubmit={konfirmoVendtakimin}>
        <label htmlFor="meeting-point-input">Shkruaj vendtakimin</label>
        <input
          id="meeting-point-input"
          data-testid="meeting-input"
          name="vendtakimi"
          type="text"
          value={tekstNeForme}
          onChange={(event) => setTekstNeForme(event.target.value)}
          maxLength={120}
          autoComplete="off"
          placeholder="p.sh. Biblioteka"
          required
        />
        <button
          className="action action--secondary"
          data-testid="confirm-meeting"
          type="submit"
        >
          Konfirmo
        </button>
      </form>

      <p
        className="meeting-point__error"
        data-testid="meeting-error"
        role="alert"
        aria-live="assertive"
      >
        {gabimiVendtakimit}
      </p>
      <p className="meeting-point__confirmation" aria-live="polite">
        {mesazhiKonfirmimit}
      </p>

      <button
        className="action action--location"
        data-testid="locate-me"
        type="button"
        onClick={kerkoVendndodhjen}
        disabled={gjendjaLokacionit === "loading"}
      >
        {gjendjaLokacionit === "loading"
          ? "Po kërkojmë vendndodhjen…"
          : "Përdor vendndodhjen time"}
      </button>

      <p
        className={`meeting-point__status meeting-point__status--${gjendjaLokacionit}`}
        data-testid="location-status"
        data-state={gjendjaLokacionit}
        role={kaGabimLokacioni ? "alert" : "status"}
        aria-live={kaGabimLokacioni ? "assertive" : "polite"}
      >
        {mesazhiLokacionit}
      </p>
      <p className="meeting-point__accuracy" data-testid="location-accuracy">
        {saktesia === null ? "" : `Saktësia: ${saktesia} m`}
      </p>
      <p className="meeting-point__privacy">
        Leja kërkohet vetëm kur shtyp butonin. Aplikacioni nuk ruan ose dërgon
        koordinatat; vendtakimi i konfirmuar mbahet vetëm në gjendjen lokale të
        kësaj faqeje.
      </p>
    </section>
  );
}
