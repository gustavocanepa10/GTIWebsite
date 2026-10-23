import { SectionHead } from "./SectionHead";
import { implementationSteps } from "@/data/discovery";
import { contactUrl } from "@/data/site";

export function Implementation() {
  return (
    <section id="implantacao" className="bg-navy py-16 text-navy-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          light
          eyebrow="Implantação"
          title="Da primeira conversa ao dia a dia da sua equipe"
          text="Conheça as etapas para planejar a adoção da plataforma com a GTI Networks. O escopo e os prazos são alinhados conforme sua operação."
        />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {implementationSteps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-teal pt-5">
              <span className="font-display text-sm font-semibold text-teal">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:brightness-110"
        >
          Conversar sobre a implantação
        </a>
      </div>
    </section>
  );
}
