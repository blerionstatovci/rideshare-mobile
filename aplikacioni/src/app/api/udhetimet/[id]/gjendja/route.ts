import { lexoGjendjen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const state = await lexoGjendjen(id);
    if (!state) return Response.json({ error: "Hyr ose kontrollo lejet për këtë udhëtim." }, { status: 401, headers: { "Cache-Control": "no-store" } });
    return Response.json(state, { headers: { "Cache-Control": "no-store, private" } });
  } catch {
    return Response.json({ error: "Gjendja nuk mund të lexohet tani." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
