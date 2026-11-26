import { refuzoKerkese } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return Response.json({ error: "ID e pavlefshme." }, { status: 400 });
  try {
    const result = await refuzoKerkese(Number(id));
    return Response.json("error" in result ? { error: result.error } : result.result, { status: result.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Refuzimi nuk u ruajt. Kontrollo lidhjen dhe provo sërish." }, { status: 503 });
  }
}
