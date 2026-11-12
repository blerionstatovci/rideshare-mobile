import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  eshteUdhetimiFavorit,
  hiqUdhetiminFavorit,
  ruajUdhetiminFavorit,
} from "@/lib/favoritet";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { profiliIm } from "@/lib/lejet";

type Parametrat = { params: Promise<{ id: string }> };

function eshteOrigjinaELigjshme(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function kontrolloQasjen(params: Parametrat["params"]) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return {
      response: Response.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404 },
      ),
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      response: Response.json(
        { error: "Duhet të hysh në llogari." },
        { status: 401 },
      ),
    };
  }

  const udhetimi = await gjejUdhetimin(id);
  if (!udhetimi) {
    return {
      response: Response.json(
        { error: "Udhëtimi nuk u gjet." },
        { status: 404 },
      ),
    };
  }

  const profili = await profiliIm();
  if (!profili) {
    return {
      response: Response.json(
        { error: "Duhet të hysh në llogari." },
        { status: 401 },
      ),
    };
  }

  return { id, githubId: profili.id };
}

function pergjigjeGabimiServerit() {
  return Response.json(
    { error: "Nuk mundëm ta ruajmë preferencën. Provo përsëri." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET(_request: Request, { params }: Parametrat) {
  try {
    const qasja = await kontrolloQasjen(params);
    if ("response" in qasja) return qasja.response;

    const favorit = await eshteUdhetimiFavorit(qasja.githubId, qasja.id);
    return Response.json(
      { favorit },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return pergjigjeGabimiServerit();
  }
}

export async function PUT(request: Request, { params }: Parametrat) {
  if (!eshteOrigjinaELigjshme(request)) {
    return Response.json({ error: "Kërkesë e pavlefshme." }, { status: 403 });
  }

  try {
    const qasja = await kontrolloQasjen(params);
    if ("response" in qasja) return qasja.response;

    await ruajUdhetiminFavorit(qasja.githubId, qasja.id);
    return Response.json(
      { favorit: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return pergjigjeGabimiServerit();
  }
}

export async function DELETE(request: Request, { params }: Parametrat) {
  if (!eshteOrigjinaELigjshme(request)) {
    return Response.json({ error: "Kërkesë e pavlefshme." }, { status: 403 });
  }

  try {
    const qasja = await kontrolloQasjen(params);
    if ("response" in qasja) return qasja.response;

    await hiqUdhetiminFavorit(qasja.githubId, qasja.id);
    return Response.json(
      { favorit: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return pergjigjeGabimiServerit();
  }
}
