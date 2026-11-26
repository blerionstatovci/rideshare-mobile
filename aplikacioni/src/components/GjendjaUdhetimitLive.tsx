"use client";

import { useCallback, useEffect, useState } from "react";
import type { GjendjaUdhetimit } from "@/lib/udhetimet";

export function GjendjaUdhetimitLive({ udhetimId, fillimi, hyrNe }: { udhetimId: string; fillimi: GjendjaUdhetimit; hyrNe: string }) {
  const [state, setState] = useState(fillimi);
  const [offline, setOffline] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const lexo = useCallback(async () => {
    try {
      const response = await fetch(`/api/udhetimet/${udhetimId}/gjendja`, { cache: "no-store" });
      if (!response.ok) throw new Error("Leximi dështoi.");
      setState(await response.json() as GjendjaUdhetimit);
      setOffline(false);
      setError("");
    } catch {
      setOffline(true);
      setError("Nuk u lidhëm. Po ruajmë pamjen e fundit; veprimet që kërkojnë rrjet janë ndalur.");
    }
  }, [udhetimId]);

  useEffect(() => {
    const timer = window.setInterval(() => { void lexo(); }, 5000);
    const onOnline = () => { void lexo(); };
    window.addEventListener("online", onOnline);
    return () => { window.clearInterval(timer); window.removeEventListener("online", onOnline); };
  }, [lexo]);

  async function vepro(path: string, method: "POST") {
    setBusy(true); setError("");
    try {
      const response = await fetch(path, { method, cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Veprimi dështoi.");
      await lexo();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Veprimi dështoi.");
    } finally { setBusy(false); }
  }

  const request = state.kerkesaIme;
  const isDriver = state.roli === "shofer" && state.pronar;
  return <section className="detail-card live-state" aria-live="polite">
    <p className="kicker">Gjendje e sinkronizuar · çdo 5 sekonda</p>
    <div className="detail-grid">
      <div className="detail-item"><span>Vende të lira</span><strong>{state.udhetim.vende}</strong></div>
      <div className="detail-item"><span>Udhëtimi</span><strong>{state.udhetim.nisja} → {state.udhetim.destinacioni}</strong></div>
      <div className="detail-item"><span>Ora</span><strong>{state.udhetim.ora}</strong></div>
    </div>
    {!isDriver ? <div className="request-state">
      <p>Statusi i kërkesës: <strong>{request ? request.statusi === "pranuar" ? "U pranua" : request.statusi === "refuzuar" ? "U refuzua" : "Në pritje" : "Pa kërkesë"}</strong></p>
      {!request && state.udhetim.vende > 0 ? <button className="action action--primary" disabled={busy || offline} onClick={() => void vepro(`/api/udhetimet/${udhetimId}/kerkesat`, "POST")}>Kërko një vend</button> : null}
      {!request && state.udhetim.vende < 1 ? <p>Nuk ka vende të lira.</p> : null}
    </div> : <div className="request-state">
      <h2>Kërkesat e udhëtarëve</h2>
      {state.kerkesat.length ? state.kerkesat.map((item) => <div className="request-row" key={item.id}>
        <span>{item.udhetari} · <strong>{item.statusi === "pranuar" ? "U pranua" : item.statusi === "refuzuar" ? "U refuzua" : "Në pritje"}</strong></span>
        {item.statusi === "ne_pritje" ? <div><button className="action action--secondary" disabled={busy || offline || state.udhetim.vende < 1} onClick={() => void vepro(`/api/kerkesat/${item.id}/prano`, "POST")}>Prano</button> <button className="action action--secondary" disabled={busy || offline} onClick={() => void vepro(`/api/kerkesat/${item.id}/refuzo`, "POST")}>Refuzo</button></div> : null}
      </div>) : <p>Ende nuk ka kërkesa.</p>}
    </div>}
    <p className={offline ? "connection-status is-offline" : "connection-status"} role="status">{error || (offline ? "Po rilidhemi…" : "Gjendja u lexua nga serveri.")}</p>
    <p className="small">Kërkesat dhe pranimi ruhen në Neon. Rileximi automatik nuk ndryshon të dhënat.</p>
    {hyrNe ? <a href={hyrNe}>Hyr me GitHub për të aktivizuar kërkesat.</a> : null}
  </section>;
}
