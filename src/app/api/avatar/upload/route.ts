import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeFilename(filename: string) {
  const baseName = filename.split(/[\\/]/).pop() ?? "imagem";
  return baseName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 100) || "imagem";
}

export async function POST(request: Request) {
  const filename = new URL(request.url).searchParams.get("filename");
  const contentType = request.headers.get("content-type")?.split(";")[0] ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!filename) {
    return NextResponse.json({ error: "Nome do arquivo ausente." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json({ error: "Formato de imagem não permitido." }, { status: 415 });
  }
  if (contentLength > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "A imagem excede 4,5 MB." }, { status: 413 });
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength === 0) {
    return NextResponse.json({ error: "O arquivo está vazio." }, { status: 400 });
  }
  if (bytes.byteLength > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "A imagem excede 4,5 MB." }, { status: 413 });
  }

  try {
    const blob = await put(
      `avatars/${randomUUID()}-${safeFilename(filename)}`,
      Buffer.from(bytes),
      {
        access: "private",
        addRandomSuffix: false,
        contentType,
      },
    );

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Falha ao enviar arquivo para o Vercel Blob", error);
    return NextResponse.json({ error: "Não foi possível armazenar a imagem." }, { status: 500 });
  }
}
