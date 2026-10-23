import { useId, useState } from "react";
import { SectionHead } from "./SectionHead";
import { Screenshot } from "./Screenshot";
import { galleryGroups } from "@/data/discovery";
import { shots } from "@/data/site";

export function ScreenGallery() {
  const [selected, setSelected] = useState(galleryGroups[0].id);
  const panelId = useId();
  const group = galleryGroups.find((entry) => entry.id === selected);
  return (
    <section id="galeria" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Galeria de telas"
          title="Explore a plataforma por recurso"
          text="Selecione um recurso e clique nas capturas reais do sistema para ampliar."
        />
        <div
          role="group"
          aria-label="Filtrar telas por recurso"
          className="mt-8 flex flex-wrap gap-2"
        >
          {galleryGroups.map((entry) => (
            <button
              key={entry.id}
              type="button"
              aria-pressed={selected === entry.id}
              aria-controls={panelId}
              onClick={() => setSelected(entry.id)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${selected === entry.id ? "border-navy bg-navy text-navy-foreground" : "bg-background hover:border-primary"}`}
            >
              {entry.title}
            </button>
          ))}
        </div>
        <div id={panelId} role="region" aria-label={`Telas de ${group.title}`} className="mt-8">
          <h3 className="mb-5 text-xl font-semibold">{group.title}</h3>
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {group.images.map((shot) => (
              <figure
                key={shot.src}
                className={shot === shots.webphone ? "mx-auto w-full max-w-52" : "min-w-0"}
              >
                <Screenshot shot={shot} frame={shot !== shots.webphone} />
                <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {shot.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
