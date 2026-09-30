import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname || !pathname.startsWith("avatars/") || pathname.includes("..")) {
    return NextResponse.json({ error: "Caminho inválido." }, { status: 400 });
  }

  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200) {
      return new NextResponse("Arquivo não encontrado.", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Falha ao obter arquivo do Vercel Blob", error);
    return new NextResponse("Arquivo não encontrado.", { status: 404 });
  }
}
