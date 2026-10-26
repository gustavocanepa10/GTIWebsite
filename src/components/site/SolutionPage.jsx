import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Contact } from "./Contact";
import { SectionHead } from "./SectionHead";
import { Screenshot } from "./Screenshot";
import { VideoDemo } from "./VideoDemo";
import { Reveal } from "./Reveal";
import { ReportExplorer } from "./ReportExplorer";
import { ChannelOverview } from "./ChannelOverview";
import { videoDemos } from "@/data/videos";
import { products } from "@/data/products";
import { shots, getContactUrl } from "@/data/site";

function Journey({ title, description, steps }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Na prática" title={title} text={description} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step} className="border-t-2 border-teal pt-5">
              <span className="font-display text-sm font-semibold text-primary">0{index + 1}</span>
              <p className="mt-3 font-medium leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CaptureSection({ id, title, text, images, dark = false }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${dark ? "bg-navy text-navy-foreground" : "bg-secondary"}`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead light={dark} eyebrow="Telas reais" title={title} text={text} />
        <div
          className={`mt-10 grid items-start gap-6 ${images.length > 1 ? "lg:grid-cols-2" : ""}`}
        >
          {images.map((shot) => (
            <Reveal
              key={shot.src}
              className={shot === shots.webphone ? "mx-auto w-full max-w-52" : undefined}
            >
              <Screenshot shot={shot} />
              <p className={`mt-4 text-sm ${dark ? "text-navy-muted" : "text-muted-foreground"}`}>
                {shot.alt}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionPage({ productKey }) {
  const product = products[productKey];
  const contactUrl = getContactUrl(productKey);
  const videoKey = productKey === "telefonia" ? "atendimento" : productKey;
  const video = videoDemos.find((entry) => entry.id === videoKey);
  return (
    <div id="inicio" className="overflow-x-clip">
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <section className="relative bg-navy pb-14 pt-24 text-navy-foreground md:pb-20 md:pt-32">
          <div className="grid-dots absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <nav
              aria-label="Localização"
              className="mb-8 flex flex-wrap items-center gap-2 text-xs text-navy-muted"
            >
              <Link to="/" className="hover:text-white">
                Início
              </Link>
              <span aria-hidden="true">/</span>
              <a href="/#solucoes" className="hover:text-white">
                Soluções
              </a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.title}</span>
            </nav>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <Reveal>
                <p className="eyebrow text-teal">{product.title}</p>
                <h1 className="mt-4 text-[clamp(2rem,3.6vw,3.5rem)] font-bold leading-[1.12]">
                  {product.headline}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-muted md:text-lg">
                  {product.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
                  >
                    Solicitar demonstração <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#recursos"
                    className="inline-flex min-h-12 items-center rounded-full border border-navy-muted/40 px-6 py-3.5 font-semibold hover:bg-navy-soft"
                  >
                    Explorar recursos
                  </a>
                </div>
              </Reveal>
              <Reveal delay={100} className="min-w-0">
                {product.shot ? (
                  <Screenshot shot={product.shot} eager />
                ) : (
                  <div className="rounded-3xl border border-teal/30 bg-navy-soft p-7 md:p-10">
                    <h2 className="text-2xl font-semibold">Como o discador apoia sua operação</h2>
                    <p className="mt-4 leading-relaxed text-navy-muted">
                      O discador automático agiliza as chamadas de saída, reduzindo a necessidade
                      de digitar cada número manualmente e ajudando a equipe a se concentrar nas conversas.
                    </p>
                    <ul className="mt-7 space-y-5">
                      {product.features.map(([title, description]) => (
                        <li key={title} className="flex items-start gap-3">
                          <Check className="mt-1 h-5 w-5 shrink-0 text-lime" aria-hidden="true" />
                          <div>
                            <h3 className="font-semibold">{title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-navy-muted">{description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-7 border-t border-teal/20 pt-5 text-sm leading-relaxed text-navy-muted">
                      Na demonstração, conheça o funcionamento do discador e alinhe a configuração
                      às necessidades da sua equipe.
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
        <section id="recursos" className="scroll-mt-24 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              eyebrow="Recursos"
              title={`Conheça os recursos de ${product.title.toLocaleLowerCase("pt-BR")}`}
            />
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {product.features.map(([title, description], index) => (
                <Reveal key={title} delay={index * 60} className="border-t-2 border-teal pt-6">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {productKey === "atendimento" && (
          <>
            <ChannelOverview />
            <CaptureSection
              title="Uma visão organizada para cada contato"
              text="As telas fornecidas apresentam as áreas de conversas e de início de atendimento. Ainda não há uma captura com conversa demonstrativa aberta."
              images={[shots.conversas, shots.novoAtendimento]}
            />
            <CaptureSection
              title="Atendimento de voz e organização das filas"
              text="A tela de voz reúne as chamadas e o acesso ao histórico. Na tela de filas, o atendente seleciona os canais e departamentos de atendimento e consulta o status da sessão e do ramal."
              images={[shots.voz, shots.filas]}
              dark
            />
            <Journey
              title="Do primeiro contato ao encerramento."
              description="Uma sequência conceitual da jornada. Os caminhos e os responsáveis dependem da configuração da operação; a etapa de transferência deve ser confirmada na demonstração."
              steps={[
                "O cliente inicia o contato.",
                "A interação pode passar por uma automação.",
                "O fluxo direciona o contato à fila ou ao departamento.",
                "O atendente acompanha a conversa.",
                "Quando necessário, a equipe avalia a transferência para outro responsável.",
                "Após o encerramento, o histórico apoia a consulta do atendimento.",
              ]}
            />
          </>
        )}
        {productKey === "telefonia" && (
          <CaptureSection
            title="Chamadas de voz e WebPhone no mesmo ambiente"
            text="Acompanhe as chamadas de voz e acesse o histórico de ligações. No WebPhone, consulte o ramal e utilize o teclado de discagem para realizar chamadas pelo navegador."
            images={[shots.voz, shots.webphone]}
          />
        )}
        {productKey === "automacoes" && (
          <>
            <Journey
              title="Um caminho possível para o atendimento"
              description="Exemplo conceitual de jornada, não uma configuração real específica. Amplie a captura do editor para observar as etapas disponíveis."
              steps={[
                "Contato recebido",
                "Verificação de horário comercial",
                "Atendimento automatizado ou encaminhamento",
                "Fila responsável",
              ]}
            />
            <CaptureSection
              title="Veja as etapas conectadas"
              text="A captura original do editor apresenta mensagens, condições de horário e envio para filas. Clique para ampliar."
              images={[shots.automacao]}
            />
          </>
        )}
        {productKey === "relatorios" && (
          <>
            <ReportExplorer />
            <CaptureSection
              id="relatorio-mapa-de-calor"
              title="Mapa de Calor"
              text="Visualize a passagem pelas etapas de uma automação, com filtros de período e canal. A intensidade das cores representa o volume registrado no fluxo durante o intervalo selecionado. A captura é histórica, não um indicador ao vivo."
              images={[shots.calor]}
            />
            <CaptureSection
              id="relatorio-voz"
              title="Relatório de Voz"
              text="Conheça o relatório de ligações de entrada: recebidas, atendidas, abandonadas e não atendidas, com detalhamento e exportações disponíveis no sistema. Os valores fazem parte da captura histórica original."
              images={[shots.entrada]}
              dark
            />
            <CaptureSection
              title="Uma leitura visual das conversas"
              text="Captura histórica dos gráficos do sistema. Os valores são parte da imagem original e não representam indicadores atuais."
              images={[shots.graficos]}
            />
          </>
        )}
        <section className="bg-navy py-16 text-navy-foreground md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <SectionHead
              light
              eyebrow="Para sua operação"
              title="Recursos conectados à rotina da equipe"
            />
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-lime" />
                  <span className="leading-relaxed text-navy-muted">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {video && (
          <section className="py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <SectionHead
                  eyebrow="Demonstração"
                  title={`Conheça ${product.title.toLocaleLowerCase("pt-BR")} na prática`}
                  text="Assista à demonstração real da plataforma. Use os controles do vídeo para reproduzir, pausar ou ampliar a apresentação."
                />
                <VideoDemo
                  title={`Demonstração de ${product.title}`}
                  poster={video.poster}
                  src={video.src}
                  candidates={[video.path, ...(video.alternatives || [])]}
                  captions={video.captions}
                />
              </div>
            </div>
          </section>
        )}
        <section className="border-y bg-secondary py-14">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="text-2xl font-bold">Soluções que se complementam</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {product.related.map((key) => (
                <Link
                  key={key}
                  to={`/solucoes/${key}`}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4 font-semibold hover:border-teal"
                >
                  {products[key].title}
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <Contact contactHref={contactUrl} />
      </main>
      <Footer contactHref={contactUrl} />
    </div>
  );
}
