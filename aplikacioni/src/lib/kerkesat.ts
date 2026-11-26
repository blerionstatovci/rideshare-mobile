import "server-only";

import { getServerSession } from "next-auth";

import { authOptions } from "./auth";
import { getSql } from "./db";
import type { GjendjaUdhetimit, Udhetim } from "./udhetimet";

async function identiteti() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || !/^\d+$/.test(id)) return null;
  return { id, emri: session.user?.name ?? "Student" };
}

async function siguroProfil(id: string, emri: string) {
  const sql = getSql();
  await sql`INSERT INTO profilet (github_id, emri) VALUES (${id}, ${emri}) ON CONFLICT (github_id) DO NOTHING`;
  const rows = await sql`SELECT github_id AS id, roli FROM profilet WHERE github_id = ${id}`;
  return rows[0] as { id: string; roli: "udhetar" | "shofer" } | undefined;
}

export async function lexoGjendjen(id: string): Promise<GjendjaUdhetimit | null> {
  const personi = await identiteti();
  if (!personi) return null;
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili) return null;
  const sql = getSql();
  const trips = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, shoferi, vende, shofer_id
    FROM udhetimet WHERE id = ${id}
  `;
  const trip = trips[0] as (Udhetim & { shofer_id: string | null }) | undefined;
  const udhetim = trip ? {
    id: trip.id, nisja: trip.nisja, destinacioni: trip.destinacioni,
    ora: trip.ora, vendtakimi: trip.vendtakimi, shoferi: trip.shoferi, vende: trip.vende,
  } : undefined;
  if (!udhetim) return null;

  const pronar = trip?.shofer_id === profili.id;
  if (profili.roli === "shofer" && pronar) {
    const rows = await sql`
      SELECT id, udhetar_id AS udhetari, statusi
      FROM udhetimet_kerkesat WHERE udhetim_id = ${id} ORDER BY krijuar_me
    `;
    return { udhetim, kerkesaIme: null, kerkesat: rows as GjendjaUdhetimit["kerkesat"], roli: "shofer", pronar };
  }
  const rows = await sql`
    SELECT id, statusi FROM udhetimet_kerkesat
    WHERE udhetim_id = ${id} AND udhetar_id = ${profili.id}
  `;
  return {
    udhetim,
    kerkesaIme: (rows[0] as GjendjaUdhetimit["kerkesaIme"]) ?? null,
    kerkesat: [],
    roli: "udhetar",
    pronar: false,
  };
}

export async function dergoKerkese(id: string) {
  const personi = await identiteti();
  if (!personi) return { status: 401, error: "Hyr me GitHub për të kërkuar vend." };
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili || profili.roli !== "udhetar") return { status: 403, error: "Vetëm udhëtarët mund të kërkojnë vend." };
  const sql = getSql();
  const rows = await sql`
    INSERT INTO udhetimet_kerkesat (udhetim_id, udhetar_id)
    SELECT id, ${profili.id} FROM udhetimet WHERE id = ${id} AND vende > 0
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
    RETURNING id, statusi
  `;
  if (rows.length) return { status: 201, request: rows[0] };
  const existing = await sql`SELECT id, statusi FROM udhetimet_kerkesat WHERE udhetim_id = ${id} AND udhetar_id = ${profili.id}`;
  if (existing.length) return { status: 200, request: existing[0] };
  return { status: 409, error: "Udhëtimi nuk ekziston ose nuk ka vende të lira." };
}

export async function pranoKerkese(id: number) {
  const personi = await identiteti();
  if (!personi) return { status: 401, error: "Hyr me GitHub për të pranuar kërkesën." };
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili || profili.roli !== "shofer") return { status: 403, error: "Vetëm shoferi mund ta pranojë kërkesën." };
  const sql = getSql();
  const rows = await sql`SELECT * FROM prano_kerkesen(${id}, ${profili.id})`;
  const result = rows[0] as { rezultati: string; udhetim_id: string | null; vende: number | null } | undefined;
  if (!result || result.rezultati === "ndaluar") return { status: 404, error: "Kërkesa nuk u gjet." };
  if (result.rezultati === "pa_vende") return { status: 409, error: "Nuk ka më vende të lira." };
  if (result.rezultati === "pranuar") {
    await sql`INSERT INTO njoftimet (kerkesa_id, udhetar_id, pergjigjja) SELECT id, udhetar_id, 'pranuar' FROM udhetimet_kerkesat WHERE id = ${id} ON CONFLICT DO NOTHING`;
  }
  return { status: 200, result };
}

export async function refuzoKerkese(id: number) {
  const personi = await identiteti();
  if (!personi) return { status: 401, error: "Hyr me GitHub për të refuzuar kërkesën." };
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili || profili.roli !== "shofer") return { status: 403, error: "Vetëm shoferi mund ta refuzojë kërkesën." };
  const sql = getSql();
  const rows = await sql`SELECT * FROM refuzo_kerkesen(${id}, ${profili.id})`;
  const result = rows[0] as { rezultati: string; udhetim_id: string | null } | undefined;
  if (!result || result.rezultati === "ndaluar") return { status: 404, error: "Kërkesa nuk u gjet." };
  return { status: 200, result };
}

export async function njoftimetEPerdoruesit() {
  const personi = await identiteti();
  if (!personi) return [];
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili) return [];
  const sql = getSql();
  return sql`SELECT n.id, n.kerkesa_id, n.pergjigjja, n.lexuar_me, u.id AS udhetim_id,
    u.nisja, u.destinacioni, u.ora FROM njoftimet n
    JOIN udhetimet_kerkesat k ON k.id = n.kerkesa_id JOIN udhetimet u ON u.id = k.udhetim_id
    WHERE n.udhetar_id = ${profili.id} ORDER BY n.krijuar_me DESC`;
}

export async function shenoNjoftiminLexuar(id: number) {
  const personi = await identiteti();
  if (!personi) return;
  const profili = await siguroProfil(personi.id, personi.emri);
  if (!profili) return;
  const sql = getSql();
  await sql`UPDATE njoftimet SET lexuar_me = NOW() WHERE id = ${id} AND udhetar_id = ${profili.id} AND lexuar_me IS NULL`;
}
