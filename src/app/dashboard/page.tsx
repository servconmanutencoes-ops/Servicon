import Image from "next/image";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/");

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="brand compact"><span className="brand-mark-wrap"><Image src="/brand/servcon-mark.png" alt="" width={48} height={48} /></span><span className="brand-copy"><strong>SERVCON</strong><span>FACILITY</span></span></div>
        <SignOutButton />
      </nav>
      <section className="dashboard-welcome">
        <span className="dashboard-tag">ACESSO LIBERADO</span>
        <h1>Olá, {session.user.name?.split(" ")[0] || "colaborador"}.</h1>
        <p>Seu acesso com o Google está funcionando. A gestão de despesas será construída aqui.</p>
        <div className="coming-soon"><span aria-hidden="true">🛠️</span><div><strong>Próxima etapa</strong><p>Painel de despesas da equipe Servcon.</p></div></div>
      </section>
    </main>
  );
}
