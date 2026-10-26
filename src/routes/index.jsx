import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { SectionHead } from "@/components/site/SectionHead";
import { Videos } from "@/components/site/VideoDemo";
import { heroShot } from "@/data/site";
import heroBackground from "@/assets/hero-tecnologia-smooth.png";
import { ChannelOrbit } from "@/components/site/ChannelOrbit";
import { ChannelOverview } from "@/components/site/ChannelOverview";
import { ScreenGallery } from "@/components/site/ScreenGallery";
import { Implementation } from "@/components/site/Implementation";
import { Faq } from "@/components/site/Faq";
import { pageHead } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  MessagesSquare,
  Phone,
  Workflow,
  Headset,
  PhoneOutgoing,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Screenshot } from "@/components/site/Screenshot";
import { benefits, shots, solutions, contactUrl } from "@/data/site";
export const Route = createFileRoute("/")({
  head: () => pageHead(),
  component: Index,
});
const icons = { Phone, MessagesSquare, Workflow, BarChart3, PhoneOutgoing };
const demos = [
  {
    eyebrow: "Atendimento omnichannel",
    title: "Todas as conversas em uma única caixa de entrada",
    text: "WhatsApp, Instagram e Facebook com automações, além do nosso canal web próprio. Organize os atendimentos por canais e departamentos e utilize templates aprovados pela Meta no WhatsApp.",
    points: [
      "Automações em todos os canais",
      "Filas por departamento",
      "Templates aprovados pela Meta no WhatsApp",
    ],
    shot: shots.conversas,
    extra: shots.novoAtendimento,
  },
  {
    eyebrow: "Automações",
    title: "Fluxos visuais que trabalham pela sua equipe",
    text: "Monte jornadas com condições de horário, envio para filas e mensagens automáticas.",
    points: [
      "Condição de horário comercial",
      "Encaminhamento para filas",
      "Mensagens automatizadas",
    ],
    shot: shots.automacao,
  },
  {
    eyebrow: "Relatórios",
    title: "Indicadores claros para decisões rápidas",
    text: "Consolidado de conversas iniciadas e finalizadas por período, canal e empresa — com exportação em PDF e CSV.",
    points: ["Filtros por período e canal", "Movimento por dia", "Exportação PDF e CSV"],
    shot: shots.relatorio,
  },
  {
    eyebrow: "Mapa de Calor",
    title: "Entenda os caminhos percorridos no atendimento",
    text: "Selecione a automação, o período e o canal para observar a passagem pelas etapas do fluxo. A captura mostra um registro histórico do sistema.",
    points: ["Seleção de automação", "Filtros de período e canal", "Passagens por etapa do fluxo"],
    shot: shots.calor,
    href: "/solucoes/relatorios",
    hash: "relatorio-mapa-de-calor",
  },
  {
    eyebrow: "Relatório de Voz",
    title: "Uma visão das ligações de entrada",
    text: "Consulte os indicadores das ligações recebidas pelas filas selecionadas, com opções de detalhamento e exportação. Os valores exibidos pertencem à captura original.",
    points: [
      "Recebidas, atendidas e não atendidas",
      "Transferências e tempos médios",
      "Exportação em PDF e CSV",
    ],
    shot: shots.entrada,
    href: "/solucoes/relatorios",
    hash: "relatorio-voz",
  },
];
function Index() {
  return (
    <div id="inicio" className="overflow-x-clip">
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Solutions />
        <Platform />
        <ChannelOverview />
        <Telephony />
        <AutoDialer />
        <Benefits />
        <Videos />
        <ScreenGallery />
        <Implementation />
        <About />
        <Faq />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
}
function Hero() {
  return (
    <section className="relative bg-navy pt-24 text-navy-foreground md:pt-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-20 h-[560px] overflow-hidden bg-[#031c43] md:top-24 lg:h-[620px]"
        aria-hidden="true"
      >
        <img
          src={heroBackground}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-25 lg:opacity-100"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <Reveal className="mx-auto flex min-h-[500px] max-w-3xl flex-col justify-center py-8 text-center lg:mx-0 lg:min-h-[570px] lg:py-12 lg:text-left">
            <h1 className="mt-4 text-[clamp(2.1rem,4.5vw,3.75rem)] font-bold leading-[1.08]">
              Sua comunicação <span className="text-orange">em um só lugar.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-navy-muted md:text-lg lg:mx-0">
              Centralize o atendimento omnichannel, integre sua telefonia IP, automatize processos e
              acompanhe sua operação com a plataforma GTI Networks.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:flex-wrap lg:justify-start">
              <a
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Solicitar demonstração <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#plataforma"
                className="inline-flex items-center hover:bg-orange-500 justify-center rounded-full border border-navy-soft px-7 py-3.5 font-semibold text-navy-foreground transition"
              >
                Conhecer a plataforma
              </a>
            </div>
           
          </Reveal>
          <ChannelOrbit />
        </div>
        <Reveal delay={150} className="relative mx-auto mt-8 max-w-6xl md:mt-10">
          <div className="relative translate-y-10 md:translate-y-12">
            <Screenshot shot={heroShot} eager />
            <div className="absolute -bottom-10 -right-2 hidden w-40 md:block lg:-right-6 lg:w-48">
              <Screenshot shot={shots.webphone} frame={false} className="rounded-2xl" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Solutions() {
  return (
    <section id="solucoes" className="scroll-mt-24 pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Soluções"
          title="Uma plataforma, todos os canais da sua operação"
          text="Cada módulo resolve uma parte do atendimento — e todos conversam entre si."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2">
          {solutions.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal
                key={s.key}
                delay={i * 60}
                className={`h-full ${solutions.length % 2 !== 0 && i === solutions.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <Link
                  to={s.href}
                  className="group flex h-full flex-col bg-card p-7 transition-colors hover:bg-secondary md:p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Saiba mais{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
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
        <SectionHead
          eyebrow="A plataforma"
          title="Veja como funciona, na tela real"
          text="Capturas reais do sistema GTI. Clique em qualquer imagem para ampliar."
        />
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
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-navy">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                {d.href && (
                  <Link
                    to={d.href}
                    hash={d.hash}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Conhecer o relatório <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
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
          <SectionHead
            light
            eyebrow="Telefonia IP"
            title="Chamadas de voz e WebPhone na mesma plataforma"
            text="Acompanhe chamadas de voz, acesse o histórico de ligações e utilize o WebPhone com ramal e teclado de discagem no navegador."
          />
        </div>
        <div className="grid grid-cols-1 items-end sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 sm:gap-6 lg:col-span-7">
          <Reveal className="space-y-4 sm:space-y-6">
            <Screenshot shot={shots.voz} />
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-52 sm:max-w-none">
            <Screenshot shot={shots.webphone} frame={false} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function AutoDialer() {
  const features = [
    {
      title: "Automatize a discagem",
      text: "Dê agilidade às chamadas de saída com o discador automático.",
    },
    {
      title: "Concentre-se na conversa",
      text: "Reduza o trabalho de discagem manual para dedicar mais atenção ao contato com o cliente.",
    },
    {
      title: "Acompanhe os resultados",
      text: "Consulte o relatório de saída de voz para analisar as chamadas realizadas, atendidas e não atendidas.",
    },
  ];

  return (
    <section id="discador-automatico" className="scroll-mt-24 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <PhoneOutgoing className="h-7 w-7" aria-hidden="true" />
            </span>
            <SectionHead
              eyebrow="Discador Automático"
              title="Mais agilidade para conectar sua equipe aos clientes"
              text="Automatize a discagem das chamadas de saída e simplifique a rotina de contato da sua operação. Conheça o discador automático da GTI Networks em uma demonstração."
            />
            <a
              href={`${contactUrl.split("?")[0]}?text=${encodeURIComponent("Olá! Gostaria de solicitar uma demonstração do Discador Automático da GTI Networks.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Conhecer o discador <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60}>
                <div className="flex gap-5 rounded-2xl border bg-card p-6 md:p-7">
                  <span
                    className="font-display text-sm font-semibold text-primary"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.text}
                    </p>
                    {index === 2 && (
                      <Link
                        to="/solucoes/relatorios"
                        className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
                      >
                        Explorar relatórios <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
              {b.href && (
                <Link
                  to={b.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
                >
                  Conheça o recurso <ArrowRight className="h-4 w-4" />
                </Link>
              )}
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
        <div>
          <SectionHead
            eyebrow="Sobre a GTI Networks"
            title="Desde 2009, conectando empresas e pessoas"
          />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Desde 2009 no mercado, a <strong>GTI Networks</strong> construiu sua história na
              Telefonia IP, com atendimento próximo e customizações específicas para cada cliente.
              Com o software <strong>GTI-Metrics</strong>, oferece soluções completas para operações
              de atendimento receptivo, incluindo números 0800, 4003 e 4004.
            </p>
            <p>
              Essa experiência reúne métricas detalhadas de chamadas, URAs integradas, pesquisas de
              satisfação, discador automatizado e uma estrutura de Voz sobre IP adaptada a
              diferentes cenários corporativos.
            </p>
            <p>
              As URAs integradas ajudam a reduzir em cerca de 30% os atendimentos humanos,
              automatizando processos como emissão de segunda via de boletos, desbloqueio de planos,
              reset de equipamentos e criação de leads comerciais. São recursos que aumentam a
              produtividade e reduzem os custos operacionais.
            </p>
            <p>
              Agora, a GTI Networks amplia essa trajetória e entra de vez no mercado de chat e
              atendimento omnichannel, reunindo <strong>WhatsApp, Instagram e Facebook</strong>,
              além do nosso canal web, em uma única plataforma. Com automações nos canais, sua
              equipe mantém as conversas organizadas e atende cada cliente com mais agilidade.
            </p>
            <p>
              Com software 100% web ou instalação local, sua empresa acompanha em tempo real a
              produtividade e o desempenho do atendimento. E conta com o nosso suporte de alto
              nível, do início da operação ao dia a dia.
            </p>
          </div>
        </div>
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-10 md:p-14">
            <div className="grid-dots absolute inset-0" aria-hidden />
            <Logo className="relative mx-auto w-64 max-w-full md:w-80" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
