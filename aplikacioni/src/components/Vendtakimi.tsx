"use client";

import { useState, type FormEvent } from "react";

type VendtakimiProps = {
  vendtakimiFillestar: string;
};

type GjendjaLokacionit = "idle" | "loading" | "success" | "error";

export function Vendtakimi({ vendtakimiFillestar }: VendtakimiProps) {
  const [tekstNeForme, setTekstNeForme] = useState(vendtakimiFillestar);
  const [vendtakimiIZgjedhur, setVendtakimiIZgjedhur] =
    useState(vendtakimiFillestar);
  const [gjendjaLokacionit, setGjendjaLokacionit] =
    useState<GjendjaLokacionit>("idle");
  const [mesazhiLokacionit, setMesazhiLokacionit] = useState("");

  function konfirmoVendtakimin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const vendtakimi = tekstNeForme.trim();

    if (!vendtakimi) {
      setMesazhiLokacionit("Shkruaj një vendtakim para se ta konfirmosh.");
      setGjendjaLokacionit("error");
      return;
    }

    setVendtakimiIZgjedhur(vendtakimi);
    setMesazhiLokacionit("Vendtakimi u konfirmua në këtë pajisje.");
    setGjendjaLokacionit("success");
  }

  function kerkoVendndodhjen() {
    setGjendjaLokacionit("loading");
    setMesazhiLokacionit("Po kërkojmë vendndodhjen…");

    const geolocation = navigator.geolocation;

    if (!geolocation) {
      setGjendjaLokacionit("error");
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
          setMesazhiLokacionit(
            `Pozicioni u mor (saktësia rreth ${saktesia} m). Shkruaj emrin e vendtakimit dhe konfirmoje. Koordinatat nuk ruhen.`,
          );
        },
        (gabimi) => {
          setGjendjaLokacionit("error");

          if (gabimi.code === 1) {
            setMesazhiLokacionit(
              "Leja për vendndodhjen u refuzua. Shkruaje vendtakimin manualisht.",
            );
          } else if (gabimi.code === 2) {
            setMesazhiLokacionit(
              "Telefoni nuk e dha pozicionin. Shkruaje vendtakimin manualisht.",
            );
          } else if (gabimi.code === 3) {
            setMesazhiLokacionit(
              "Kërkimi i pozicionit skadoi pas 10 sekondash. Provo përsëri ose shkruaje vendtakimin manualisht.",
            );
          } else {
            setMesazhiLokacionit(
              "Nuk mundëm ta lexojmë pozicionin. Shkruaje vendtakimin manualisht.",
            );
          }
        },
        { timeout: 10000 },
      );
    } catch {
      setGjendjaLokacionit("error");
      setMesazhiLokacionit(
        "Nuk mundëm ta nisim kërkimin e pozicionit. Shkruaje vendtakimin manualisht.",
      );
    }
  }

  return (
    <section className="meeting-point" aria-labelledby="meeting-point-heading">
      <h2 id="meeting-point-heading">Vendtakimi</h2>
      <p className="meeting-point__selected" aria-live="polite">
        Vendtakimi i zgjedhur: <strong>{vendtakimiIZgjedhur}</strong>
      </p>

      <form className="meeting-point__form" onSubmit={konfirmoVendtakimin}>
        <label htmlFor="meeting-point-input">Shkruaj vendtakimin</label>
        <input
          id="meeting-point-input"
          name="vendtakimi"
          type="text"
          value={tekstNeForme}
          onChange={(event) => setTekstNeForme(event.target.value)}
          maxLength={120}
          autoComplete="off"
          placeholder="p.sh. Biblioteka"
          required
        />
        <button className="action action--secondary" type="submit">
          Konfirmo
        </button>
      </form>

      <button
        className="action action--location"
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
        role={gjendjaLokacionit === "error" ? "alert" : "status"}
        aria-live={gjendjaLokacionit === "error" ? "assertive" : "polite"}
      >
        {mesazhiLokacionit}
      </p>
      <p className="meeting-point__privacy">
        Leja kërkohet vetëm kur shtyp butonin. Aplikacioni nuk ruan ose dërgon
        koordinatat; vendtakimi i konfirmuar mbahet vetëm në gjendjen lokale të
        kësaj faqeje.
      </p>
    </section>
  );
}
