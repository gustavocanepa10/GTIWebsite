import { Plus } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { frequentlyAskedQuestions } from "@/data/discovery";
import { contactUrl } from "@/data/site";

export function Faq() {
  return (
    <section id="perguntas-frequentes" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead eyebrow="Perguntas frequentes" title="Tire suas dúvidas sobre a plataforma" />
        <div className="mt-10 divide-y border-y">
          {frequentlyAskedQuestions.map(({ question, answer }) => (
            <details key={question} className="group py-2">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-3xl pb-5 leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary hover:underline"
        >
          Ainda tem dúvidas? Fale com a equipe
        </a>
      </div>
    </section>
  );
}
