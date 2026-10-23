import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Activity, ArrowRight, BarChart3, Check, MessagesSquare, Phone, Play, Plug, Workflow, Headset } from "lucide-react";
import logo from "@/assets/gti-logo.jpg.asset.json";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Screenshot } from "@/components/site/Screenshot";
import { benefits, contact, shots, solutions } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GTI Networks — Sua comunicação em um só lugar" },
      { name: "description", content: "Plataforma integrada de chat, telefonia IP, automações e relatórios para organizar o atendimento da sua empresa." },
      { property: "og:title", content: "GTI Networks — Sua comunicação em um só lugar" },
      { property: "og:description", content: "Chat, telefonia e gestão de atendimento reunidos em uma única plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = { Phone, MessagesSquare, Workflow, Activity, BarChart3, Plug };

const demos = [
  { eyebrow: "Atendimento omnichannel", title: "Todas as conversas em uma única caixa de entrada", text: "Atendimento, espera e automação separados em abas. Inicie novos contatos por canal e departamento, com templates prontos.", points: ["Busca por conversa ou telefone", "Filas por departamento", "Envio de templates"], shot: shots.conversas, extra: shots.novoAtendimento },
  { eyebrow: "Automações", title: "Fluxos visuais que trabalham pela sua equipe", text: "Monte jornadas com condições de horário, envio para filas, consultas a sistemas externos e mensagens automáticas.", points: ["Condição de horário comercial", "Encaminhamento para filas", "Consultas integradas"], shot: shots.automacao },
  { eyebrow: "Relatórios", title: "Indicadores claros para decisões rápidas", text: "Consolidado de conversas iniciadas e finalizadas por período, canal e empresa — com exportação em PDF e CSV.", points: ["Filtros por período e canal", "Movimento por dia", "Exportação PDF e CSV"], shot: shots.relatorio },
];

function Index() {
  return (
    <div id="inicio" className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Platform />
        <Telephony />
        <Benefits />
        <Videos />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-navy pt-28 text-navy-foreground md:pt-36">
      <div className="grid-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-soft px-4 py-1.5 text-xs font-semibold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Chat + Telefonia + Gestão
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl">
            Sua comunicação <span className="text-orange">em um só lugar.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-navy-muted md:text-lg">
            A GTI Networks reúne chat, telefonia e ferramentas de gestão em uma plataforma integrada para organizar e acompanhar o atendimento da sua empresa.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contato" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110">
              Solicitar demonstração <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#plataforma" className="inline-flex items-center justify-center rounded-full border border-navy-soft px-7 py-3.5 font-semibold text-navy-foreground transition hover:bg-navy-soft">
              Conhecer a plataforma
            </a>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative mx-auto mt-14 max-w-6xl md:mt-16">
          <div className="relative translate-y-16 md:translate-y-24">
            <Screenshot shot={shots.conversas} eager />
            <div className="absolute -bottom-10 -right-2 hidden w-40 md:block lg:-right-10 lg:w-52">
              <Screenshot shot={shots.webphone} frame={false} className="rounded-2xl" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text, light }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-teal" : "text-accent-foreground"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold leading-tight md:text-4xl ${light ? "text-navy-foreground" : "text-foreground"}`}>{title}</h2>
      {text && <p className={`mt-4 text-base md:text-lg ${light ? "text-navy-muted" : "text-muted-foreground"}`}>{text}</p>}
    </Reveal>
  );
}

function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-24 pb-20 pt-36 md:pb-28 md:pt-52">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Soluções" title="Uma plataforma, todos os canais da sua operação" text="Cada módulo resolve uma parte do atendimento — e todos conversam entre si." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal key={s.key} delay={i * 60} className="h-full">
                <a href="#contato" className="group flex h-full flex-col bg-card p-7 transition-colors hover:bg-secondary md:p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="plataforma" className="scroll-mt-24 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="A plataforma" title="Veja como funciona, na tela real" text="Capturas reais do sistema GTI. Clique em qualquer imagem para ampliar." />
        <div className="mt-14 space-y-20 md:space-y-28">
          {demos.map((d, i) => (
            <div key={d.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className={`lg:col-span-4 ${i % 2 ? "lg:order-2" : ""}`}>
                <p className="eyebrow text-primary">{d.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{d.title}</h3>
                <p className="mt-4 text-muted-foreground">{d.text}</p>
                <ul className="mt-6 space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm font-medium">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-navy"><Check className="h-3 w-3" strokeWidth={3} /></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={120} className={`lg:col-span-8 ${i % 2 ? "lg:order-1" : ""}`}>
                <Screenshot shot={d.shot} />
                {d.extra && (
                  <div className="mt-5 sm:ml-auto sm:w-3/4">
                    <Screenshot shot={d.extra} />
                  </div>
                )}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Telephony() {
  return (
    <section className="relative bg-navy py-20 text-navy-foreground md:py-28">
      <div className="grid-dots absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead light eyebrow="Telefonia IP e ferramentas" title="Ligue, converse e organize a equipe sem sair da plataforma" text="WebPhone com ramal no navegador, chamadas de vídeo, gestão de pausas, mensagens prontas e chat interno entre atendentes." />
        </div>
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-end gap-4 sm:gap-6 lg:col-span-7">
          <Reveal className="space-y-4 sm:space-y-6">
            <Screenshot shot={shots.ferramentas} frame={false} />
            <Screenshot shot={shots.pausas} frame={false} />
          </Reveal>
          <Reveal delay={120}>
            <Screenshot shot={shots.webphone} frame={false} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Benefícios" title="Menos ruído, mais controle sobre o atendimento" />
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="border-t-2 border-foreground pt-6">
              <span className="font-display text-sm font-semibold text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const videos = [
  { title: "Atendimento omnichannel", poster: shots.conversas },
  { title: "Telefonia IP", poster: shots.ferramentas },
  { title: "Relatórios", poster: shots.relatorio },
];

function Videos() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Vídeos" title="A plataforma em movimento" text="Demonstrações em vídeo de cada módulo. Em breve." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <figure className="overflow-hidden rounded-2xl bg-card shadow-soft">
                <div className="relative aspect-video overflow-hidden bg-navy">
                  <img src={v.poster.src} alt="" loading="lazy" className="h-full w-full object-cover object-left-top opacity-40" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground"><Play className="ml-0.5 h-5 w-5" /></span>
                  </span>
                </div>
                <figcaption className="flex items-center justify-between gap-3 p-5">
                  <span className="font-semibold">{v.title}</span>
                  <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Em breve</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <SectionHead eyebrow="Sobre a GTI Networks" title="Tecnologia para empresas que levam o atendimento a sério" text="A GTI Networks desenvolve uma plataforma integrada de comunicação e atendimento empresarial, reunindo chat, telefonia e ferramentas de gestão em um único ambiente. Nosso diferencial é o suporte de alto nível: estamos ao lado de cada cliente para que a operação funcione todos os dias." />
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-10 md:p-14">
            <div className="grid-dots absolute inset-0" aria-hidden />
            <img src={logo.url} alt="GTI Networks Tecnologia" loading="lazy" className="relative mx-auto w-56 md:w-72" />
            <div className="relative mt-10 flex items-center gap-4 rounded-2xl bg-navy-soft p-5 text-navy-foreground">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Headset className="h-5 w-5" /></span>
              <div className="min-w-0">
                <p className="font-semibold">Suporte de alto nível</p>
                <p className="text-sm text-navy-muted">Atendimento próximo do início ao dia a dia.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  const field = "w-full rounded-xl border border-navy-soft bg-navy-soft px-4 py-3.5 text-navy-foreground placeholder:text-navy-muted focus:border-teal focus:outline-none";
  return (
    <section id="contato" className="scroll-mt-20 px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-navy text-navy-foreground">
        <div className="brand-bar h-1" aria-hidden />
        <div className="grid gap-12 p-7 md:p-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-teal">Fale com a gente</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">Pronto para centralizar sua comunicação?</h2>
            <p className="mt-5 max-w-md text-navy-muted">Agende uma demonstração e veja a plataforma GTI funcionando com a realidade da sua operação.</p>
          </div>
          {sent ? (
            <div role="status" className="grid place-items-center rounded-2xl bg-navy-soft p-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-navy"><Check className="h-6 w-6" strokeWidth={3} /></span>
              <p className="mt-4 text-xl font-semibold">Recebemos seu contato!</p>
              <p className="mt-2 text-sm text-navy-muted">Demonstração: o envio real será ativado em breve.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="sr-only">Nome</span><input required name="nome" placeholder="Seu nome" className={field} /></label>
              <label><span className="sr-only">E-mail</span><input required type="email" name="email" placeholder="E-mail corporativo" className={field} /></label>
              <label><span className="sr-only">Telefone</span><input name="telefone" type="tel" placeholder="Telefone" className={field} /></label>
              <label className="sm:col-span-2"><span className="sr-only">Empresa</span><input name="empresa" placeholder="Empresa" className={field} /></label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:brightness-110 sm:col-span-2">
                Solicitar demonstração <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const items = [
    contact.phone && `Telefone: ${contact.phone}`,
    contact.whatsapp && `WhatsApp: ${contact.whatsapp}`,
    contact.email && contact.email,
    contact.address && contact.address,
  ].filter(Boolean) as string[];
  return (
    <footer className="bg-background pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-2xl bg-navy p-4"><img src={logo.url} alt="GTI Networks Tecnologia" loading="lazy" className="h-12 w-auto" /></div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Plataforma integrada de comunicação e atendimento empresarial. Sua comunicação em um só lugar.</p>
        </div>
        <div>
          <p className="eyebrow text-foreground">Soluções</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {solutions.map((s) => <li key={s.key}><a href="#solucoes" className="hover:text-foreground">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-foreground">Contato</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {items.length ? items.map((t) => <li key={t}>{t}</li>) : <li>Contatos oficiais em breve.</li>}
            <li><a href="https://www.gtinetworks.com.br/" className="hover:text-foreground">gtinetworks.com.br</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t px-5 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between md:px-8">
        <p>© {new Date().getFullYear()} GTI Networks Tecnologia. Todos os direitos reservados.</p>
        <a href="#inicio" className="hover:text-foreground">Política de privacidade</a>
      </div>
    </footer>
  );
}
