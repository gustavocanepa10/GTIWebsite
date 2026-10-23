import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Screenshot } from "./Screenshot";
import { SectionHead } from "./SectionHead";
import { reports } from "@/data/products";

export function ReportExplorer() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Hub de Relatórios"
          title="Explore as informações da operação"
          text="Alterne entre os relatórios para conhecer o conteúdo de cada captura. As imagens mostram dados históricos do sistema, não indicadores atuais da GTI Networks."
        />
        <nav
          aria-label="Seções de relatórios"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary"
        >
          <a href="#relatorio-mapa-de-calor" className="inline-flex min-h-11 items-center">
            Ver Mapa de Calor
          </a>
          <a href="#relatorio-voz" className="inline-flex min-h-11 items-center">
            Ver Relatório de Voz
          </a>
        </nav>
        <Tabs defaultValue="chat" className="mt-6 min-w-0">
          <div className="relative max-w-full overflow-x-auto pb-3">
            <TabsList
              aria-label="Relatórios disponíveis e materiais pendentes"
              className="h-auto w-max justify-start gap-1 rounded-2xl border bg-background p-2"
            >
              {reports.map((report) => (
                <TabsTrigger
                  key={report.id}
                  value={report.id}
                  aria-label={
                    report.pending ? `${report.title} — material a confirmar` : report.title
                  }
                  className="min-h-11 whitespace-nowrap rounded-xl px-4"
                >
                  {report.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {reports.map((report) => (
            <TabsContent
              key={report.id}
              value={report.id}
              className="mt-5 rounded-3xl border bg-card p-5 sm:p-8 motion-safe:animate-in motion-safe:fade-in"
            >
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div>
                  <p className="eyebrow text-primary">
                    {report.pending ? "Material a confirmar" : "Captura real do sistema"}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{report.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{report.description}</p>
                  {report.points && (
                    <ul className="mt-6 space-y-3 text-sm font-medium">
                      {report.points.map((point) => (
                        <li key={point} className="border-l-2 border-teal pl-3">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  {report.benefit && (
                    <p className="mt-6 text-sm text-muted-foreground">{report.benefit}</p>
                  )}
                </div>
                {report.shot ? (
                  <Screenshot shot={report.shot} />
                ) : (
                  <div className="grid min-h-64 place-content-center rounded-2xl border border-dashed bg-secondary p-8 text-center">
                    <p className="font-semibold">Captura ainda não disponível</p>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                      Os detalhes serão apresentados após confirmação do recurso e recebimento do
                      material oficial.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
