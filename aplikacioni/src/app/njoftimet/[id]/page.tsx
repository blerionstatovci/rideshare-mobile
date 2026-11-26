import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { shenoNjoftiminLexuar } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export default async function HapNjoftimin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) redirect("/api/auth/signin");
  const sql = getSql();
  const rows = await sql`SELECT k.udhetim_id FROM njoftimet n JOIN udhetimet_kerkesat k ON k.id=n.kerkesa_id WHERE n.id=${id} AND n.udhetar_id=${userId}`;
  if (!rows.length) notFound();
  await shenoNjoftiminLexuar(Number(id));
  redirect(`/udhetimi/${rows[0].udhetim_id}`);
}
