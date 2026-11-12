"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

type PreferuariUdhetimitProps = {
  udhetimId: string;
  pershkrimi?: string;
};

export function PreferuariUdhetimit({
  udhetimId,
  pershkrimi,
}: PreferuariUdhetimitProps) {
  const [favorit, setFavorit] = useState(false);
  const [dukeLexuar, setDukeLexuar] = useState(true);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [duhetHyrje, setDuhetHyrje] = useState(false);
  const [gabimLeximi, setGabimLeximi] = useState(false);
  const [mesazhi, setMesazhi] = useState("");
  const [qellimiPerRiprova, setQellimiPerRiprova] = useState<boolean | null>(
    null,
  );
  const [riprovaLeximi, setRiprovaLeximi] = useState(0);
  const pershkrimiIPlote = pershkrimi
    ? `udhëtimin ${pershkrimi}`
    : "këtë udhëtim";

  useEffect(() => {
    let aktiv = true;

    async function lexoPreferencen() {
      setDukeLexuar(true);
      setGabimLeximi(false);

      try {
        const response = await fetch(
          `/api/udhetimet/${encodeURIComponent(udhetimId)}/preferuar`,
          { cache: "no-store" },
        );

        if (response.status === 401) {
          if (aktiv) setDuhetHyrje(true);
          return;
        }

        if (!response.ok) throw new Error("Preferenca nuk u lexua.");

        const data: { favorit?: boolean } = await response.json();
        if (typeof data.favorit !== "boolean") {
          throw new Error("Përgjigjja e serverit nuk është e plotë.");
        }

        if (aktiv) {
          setFavorit(data.favorit);
          setDuhetHyrje(false);
          setMesazhi("");
        }
      } catch {
        if (aktiv) setGabimLeximi(true);
      } finally {
        if (aktiv) setDukeLexuar(false);
      }
    }

    void lexoPreferencen();
    return () => {
      aktiv = false;
    };
  }, [udhetimId, riprovaLeximi]);

  async function ndryshoPreferencen(qellimi: boolean) {
    if (dukeRuajtur || dukeLexuar || gabimLeximi) return;

    if (duhetHyrje) {
      void signIn("github", {
        callbackUrl: `${window.location.pathname}${window.location.search}`,
      });
      return;
    }

    const gjendjaEMeparshme = favorit;
    setFavorit(qellimi);
    setDukeRuajtur(true);
    setMesazhi("");
    setQellimiPerRiprova(null);

    try {
      const response = await fetch(
        `/api/udhetimet/${encodeURIComponent(udhetimId)}/preferuar`,
        { method: qellimi ? "PUT" : "DELETE", cache: "no-store" },
      );

      if (response.status === 401) {
        setFavorit(gjendjaEMeparshme);
        setDuhetHyrje(true);
        setMesazhi("Sesioni mbaroi. Hyr përsëri për të ruajtur udhëtimin.");
        return;
      }

      if (!response.ok) throw new Error("Ruajtja dështoi.");

      const data: { favorit?: boolean } = await response.json();
      if (data.favorit !== qellimi) throw new Error("Ruajtja nuk u konfirmua.");

      setFavorit(data.favorit);
      setMesazhi(
        qellimi
          ? "Udhëtimi u ruajt te të preferuarat."
          : "Udhëtimi u hoq nga të preferuarat.",
      );
    } catch {
      setFavorit(gjendjaEMeparshme);
      setQellimiPerRiprova(qellimi);
      setMesazhi("Nuk u ruajt. Gjendja u kthye si më parë.");
    } finally {
      setDukeRuajtur(false);
    }
  }

  return (
    <div className="favorite-control" data-testid="favorite-control">
      <button
        className="action action--favorite"
        type="button"
        aria-label={
          duhetHyrje
            ? `Hyr me GitHub për të ruajtur ${pershkrimiIPlote}`
            : favorit
              ? `Hiqe ${pershkrimiIPlote} nga të preferuarat`
              : `Ruaje ${pershkrimiIPlote} te të preferuarat`
        }
        aria-pressed={favorit}
        data-state={dukeLexuar ? "loading" : dukeRuajtur ? "saving" : "ready"}
        disabled={dukeLexuar || dukeRuajtur || gabimLeximi}
        onClick={() => void ndryshoPreferencen(!favorit)}
      >
        {dukeLexuar
          ? "Po kontrolloj…"
          : dukeRuajtur
            ? favorit
              ? "Po ruaj…"
              : "Po heq…"
            : duhetHyrje
              ? "Hyr për të ruajtur"
              : favorit
                ? "♥ Te të preferuarat"
                : "♡ Ruaj udhëtimin"}
      </button>

      {gabimLeximi ? (
        <>
          <p className="favorite-message favorite-message--error" role="alert">
            Nuk mundëm t’i lexojmë të preferuarat. Kontrollo lidhjen dhe provo përsëri.
          </p>
          <button
            className="action action--retry"
            type="button"
            onClick={() => setRiprovaLeximi((vlera) => vlera + 1)}
          >
            Rifresko gjendjen
          </button>
        </>
      ) : null}

      {mesazhi ? (
        <p
          className={`favorite-message${qellimiPerRiprova !== null ? " favorite-message--error" : ""}`}
          role={qellimiPerRiprova !== null || duhetHyrje ? "alert" : "status"}
          aria-live={qellimiPerRiprova !== null || duhetHyrje ? "assertive" : "polite"}
        >
          {mesazhi}
        </p>
      ) : null}

      {qellimiPerRiprova !== null ? (
        <button
          className="action action--retry"
          type="button"
          disabled={dukeRuajtur}
          onClick={() => void ndryshoPreferencen(qellimiPerRiprova)}
        >
          Provo përsëri
        </button>
      ) : null}
    </div>
  );
}
