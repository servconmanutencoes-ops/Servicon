"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    await authClient.signOut();
    window.location.assign("/");
  }

  return <button className="sign-out-button" onClick={signOut} disabled={loading}>{loading ? "Saindo…" : "Sair"}</button>;
}
