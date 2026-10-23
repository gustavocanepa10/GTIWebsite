import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Facebook, Instagram, MessagesSquare } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const channels = [
  { name: "WhatsApp", icon: WhatsAppIcon },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "Canal web GTI", icon: MessagesSquare },
];

export function ChannelOverview() {
  return (
    <section className="bg-navy py-16 text-navy-foreground md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHead
            light
            eyebrow="Canais de atendimento"
            title="Converse onde seu cliente está"
            text="Atenda pelo WhatsApp, Instagram e Facebook, todos com automações. Conte também com nosso canal web próprio, independente da Meta, para otimizar a operação com baixo custo."
          />
          <div className="mt-6 space-y-5 border-t border-navy-soft pt-6">
            <div>
              <h3 className="font-semibold text-teal">Templates aprovados pela Meta</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-muted">
                Utilize templates de mensagens aprovados pela Meta no atendimento pelo WhatsApp.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-teal">Canal web próprio, fora da Meta</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-muted">
                Uma alternativa de baixo custo para otimizar o atendimento, com automações e sem
                depender dos canais da Meta.
              </p>
            </div>
          </div>
        </div>
        <Reveal>
          <ul aria-label="Canais com automações" className="grid grid-cols-2 gap-4">
            {channels.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="rounded-2xl border border-navy-muted/30 bg-navy-soft p-5 md:p-8"
              >
                <Icon className="mb-5 h-9 w-9 text-teal" aria-hidden="true" />
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-navy-muted">Atendimento com automações</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
