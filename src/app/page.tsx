"use client";

import type { PutBlobResult } from "@vercel/blob";
import { FormEvent, useRef, useState } from "react";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type UploadResult = Pick<PutBlobResult, "pathname">;

export default function HomePage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBlob(null);

    const file = inputFileRef.current?.files?.[0];
    if (!file) {
      setError("Selecione uma imagem.");
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Use uma imagem JPEG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("A imagem deve ter no máximo 4,5 MB.");
      return;
    }

    setUploading(true);
    try {
      const query = new URLSearchParams({ filename: file.name });
      const response = await fetch(`/api/avatar/upload?${query}`, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const result = (await response.json()) as UploadResult & { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível enviar a imagem.");
      }
      setBlob(result);
      if (inputFileRef.current) inputFileRef.current.value = "";
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Falha no envio.");
    } finally {
      setUploading(false);
    }
  }

  const viewUrl = blob
    ? `/api/avatar/view?${new URLSearchParams({ pathname: blob.pathname })}`
    : null;

  return (
    <main>
      <section className="card">
        <span className="eyebrow">SERVICON</span>
        <h1>Arquivos da equipe</h1>
        <p className="intro">Envie imagens para o armazenamento privado da Servicon.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="avatar">Imagem</label>
          <input
            id="avatar"
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
          />
          <small>JPEG, PNG ou WebP, até 4,5 MB.</small>
          <button type="submit" disabled={uploading}>
            {uploading ? "Enviando…" : "Enviar imagem"}
          </button>
        </form>

        {error && <p className="message error">{error}</p>}
        {viewUrl && (
          <div className="result">
            <p className="message success">Imagem enviada com sucesso.</p>
            {/* The private object is streamed by the authenticated server route. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={viewUrl} alt="Imagem enviada" />
            <a href={viewUrl} target="_blank" rel="noreferrer">
              Abrir imagem
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
