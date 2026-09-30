"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn() {
    setLoading(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
      });
      if (result.error) throw new Error(result.error.message || "Não foi possível entrar com o Google.");
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Não foi possível entrar agora.");
      setLoading(false);
    }
  }

  return (
    <div className="sign-in-action">
      <button className="google-button" type="button" onClick={handleSignIn} disabled={loading}>
        <span className="google-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.6A10.1 10.1 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.5 14a6.1 6.1 0 0 1 0-3.9V7.4H3.1a10 10 0 0 0 0 9.2L6.5 14Z" /><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 12 2a10.1 10.1 0 0 0-8.9 5.4l3.4 2.7A5.9 5.9 0 0 1 12 5.9Z" /></svg></span>
        <span>{loading ? "Abrindo o Google…" : "Continuar com o Google"}</span>
        <svg className="button-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m13.3 5.3 5.9 5.9a1.1 1.1 0 0 1 0 1.6l-5.9 5.9-1.6-1.5 4-4H5v-2.3h10.7l-4-4 1.6-1.6Z" /></svg>
      </button>
      {error && <p className="login-error" role="alert">{error}</p>}
    </div>
  );
}
