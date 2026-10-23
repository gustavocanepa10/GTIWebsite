import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/gti-logo.jpg.asset.json";
import { solutions } from "@/data/site";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 bg-navy transition-shadow", scrolled && "shadow-soft")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <a href="#inicio" className="shrink-0" aria-label="GTI Networks — início">
          <img src={logo.url} alt="GTI Networks Tecnologia" width={940} height={720} className="h-10 w-auto md:h-12" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <div className="group relative">
            <a href="#solucoes" className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-navy-foreground/85 transition-colors hover:text-navy-foreground">
              Soluções <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </a>
            <div className="invisible absolute left-0 top-full w-80 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-2xl border bg-popover p-2 shadow-shot">
                {solutions.map((s) => (
                  <a key={s.key} href="#solucoes" className="block rounded-xl px-4 py-3 transition-colors hover:bg-secondary">
                    <span className="block text-sm font-semibold text-foreground">{s.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{s.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="rounded-lg px-4 py-2 text-sm font-medium text-navy-foreground/85 transition-colors hover:text-navy-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contato" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:inline-flex">
            Solicitar demonstração
          </a>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-navy-foreground lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div className="brand-bar h-0.5 w-full" aria-hidden />

      {open && (
        <nav className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-soft bg-navy px-5 pb-8 pt-4 lg:hidden animate-in slide-in-from-top-2" aria-label="Mobile">
          <p className="eyebrow mb-2 text-teal">Soluções</p>
          <div className="grid grid-cols-2 gap-2">
            {solutions.map((s) => (
              <a key={s.key} href="#solucoes" onClick={() => setOpen(false)} className="rounded-xl bg-navy-soft px-3 py-3 text-sm font-medium text-navy-foreground">
                {s.title}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-navy-soft py-4 text-base font-medium text-navy-foreground">
                {n.label}
              </a>
            ))}
          </div>
          <a href="#contato" onClick={() => setOpen(false)} className="mt-6 flex justify-center rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground">
            Solicitar demonstração
          </a>
        </nav>
      )}
    </header>
  );
}
