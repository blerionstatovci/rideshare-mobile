import { dergoKerkese } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const result = await dergoKerkese(id);
    return Response.json(result.status === 201 || result.status === 200 ? result.request : { error: result.error }, { status: result.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Kërkesa nuk u ruajt. Kontrollo lidhjen dhe provo sërish." }, { status: 503 });
  }
}
