import Image from "next/image";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const companyFacts = ["Desde 2020", "Cajamar · SP", "Engenharia & Facilities"];

export default async function HomePage() {
  const { data: session } = await auth.getSession();

  if (session?.user) redirect("/dashboard");

  return (
    <main className="login-page">
      <div className="top-rule" aria-hidden="true" />
      <div className="blueprint-grid" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Servcon Facility — início">
          <span className="brand-mark-wrap">
            <Image className="brand-mark" src="/brand/servcon-mark.png" alt="" width={64} height={64} priority />
          </span>
          <span className="brand-copy"><strong>SERVCON</strong><span>FACILITY</span></span>
        </a>
        <span className="portal-label"><span aria-hidden="true" /> Portal de gestão</span>
      </header>

      <section className="login-layout" id="inicio">
        <div className="hero-copy">
          <p className="overline"><span>01</span> Gestão que dá conta da obra</p>
          <h1>Cada gasto no lugar.<em>Cada projeto em frente.</em></h1>
          <p className="hero-intro">
            O espaço da equipe Servcon para organizar despesas com agilidade,
            clareza e a responsabilidade de quem constrói todos os dias.
          </p>

          <ul className="company-facts" aria-label="Informações da empresa">
            {companyFacts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>

          <div className="mascot-scene" aria-label="Douglas, fundador da Servcon, aponta para o acesso">
            <div className="speech-bubble">Bora organizar essa obra?</div>
            <div className="mascot-sprite" aria-hidden="true" />
            <div className="mascot-caption"><span>DOUGLAS DIZ:</span>Apontou, clicou, entrou. Sem complicação.</div>
          </div>
        </div>

        <aside className="login-panel" aria-labelledby="login-heading">
          <div className="panel-accent" aria-hidden="true" />
          <div className="panel-number" aria-hidden="true">02</div>
          <div className="secure-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4.5 5v6.2c0 4.8 3.2 8.9 7.5 10.2 4.3-1.3 7.5-5.4 7.5-10.2V5L12 2Zm0 3 4.5 1.8v4.4c0 3.2-1.8 6-4.5 7.2-2.7-1.2-4.5-4-4.5-7.2V6.8L12 5Zm-1.1 4v2H9v2h1.9v2H13v-2h2v-2h-2V9h-2.1Z" /></svg>
            Ambiente seguro
          </div>
          <p className="panel-kicker">ACESSO À PLATAFORMA</p>
          <h2 id="login-heading">Bem-vindo à Servcon.</h2>
          <p className="panel-description">Entre com sua conta Google corporativa para acessar a gestão de despesas.</p>
          <GoogleSignInButton />
          <div className="access-note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-7-2a2 2 0 1 1 4 0v2h-4V6Zm3 10.7V18h-2v-1.3a2 2 0 1 1 2 0Z" /></svg>
            <p><strong>Acesso exclusivo para colaboradores.</strong> Seus dados são usados somente para autenticação.</p>
          </div>
          <div className="panel-footer"><span>Precisa de ajuda?</span><strong>Fale com a administração</strong></div>
        </aside>
      </section>

      <footer className="site-footer">
        <p><strong>Servcon Engenharia e Serviços LTDA</strong> · CNPJ 36.192.761/0001-30</p>
        <p>Av. Deovair Cruz de Oliveira, 189 · Jordanésia · Cajamar — SP</p>
      </footer>
    </main>
  );
}
