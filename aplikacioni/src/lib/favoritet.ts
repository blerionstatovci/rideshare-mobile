import "server-only";

import { getSql } from "./db";

export async function eshteUdhetimiFavorit(
  githubId: string,
  udhetimId: string,
): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    SELECT 1
    FROM udhetimet_favoritet
    WHERE github_id = ${githubId} AND udhetim_id = ${udhetimId}
    LIMIT 1
  `;

  return rows.length > 0;
}

export async function ruajUdhetiminFavorit(
  githubId: string,
  udhetimId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO udhetimet_favoritet (github_id, udhetim_id)
    VALUES (${githubId}, ${udhetimId})
    ON CONFLICT (github_id, udhetim_id) DO NOTHING
  `;
}

export async function hiqUdhetiminFavorit(
  githubId: string,
  udhetimId: string,
): Promise<void> {
  const sql = getSql();
  await sql`
    DELETE FROM udhetimet_favoritet
    WHERE github_id = ${githubId} AND udhetim_id = ${udhetimId}
  `;
}
