import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { solutions, getContactUrl } from "@/data/site";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Plataforma", hash: "plataforma" },
  { label: "Benefícios", hash: "beneficios" },
  { label: "Sobre", hash: "sobre" },
  { label: "Contato", hash: "contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const contactUrl = getContactUrl(
    solutions.find((solution) => solution.href === pathname.replace(/\/$/, ""))?.key,
  );
  const home = pathname === "/" ? "" : "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <header
        className={cn(
          "right-scroll-bar-position fixed inset-x-0 top-0 z-40 bg-navy transition-shadow",
          scrolled && "shadow-soft",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 md:h-24 md:px-8">
          <Link to="/" hash="inicio" className="shrink-0" aria-label="GTI Networks — início">
            <Logo className="h-16 w-auto md:h-20" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex min-h-11 items-center gap-1 rounded-lg px-4 text-sm font-medium text-navy-foreground/85 hover:text-navy-foreground",
                    pathname.startsWith("/solucoes/") && "text-teal",
                  )}
                >
                  Soluções <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={12}
                  className="z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border bg-popover p-2 shadow-shot"
                >
                  {solutions.map((solution) => (
                    <DropdownMenu.Item key={solution.key} asChild>
                      <Link
                        to={solution.href}
                        activeProps={{ "aria-current": "page", className: "bg-secondary" }}
                        className="block rounded-xl px-4 py-3 outline-none hover:bg-secondary focus:bg-secondary"
                      >
                        <span className="block text-sm font-semibold text-foreground">
                          {solution.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {solution.text}
                        </span>
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            {nav.map((item) => (
              <a
                key={item.hash}
                href={item.hash === "contato" ? contactUrl : `${home}#${item.hash}`}
                target={item.hash === "contato" ? "_blank" : undefined}
                rel={item.hash === "contato" ? "noopener noreferrer" : undefined}
                className="flex min-h-11 items-center rounded-lg px-4 text-sm font-medium text-navy-foreground/85 hover:text-navy-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:inline-flex"
            >
              Solicitar demonstração
            </a>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full text-navy-foreground lg:hidden"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </Dialog.Trigger>
          </div>
        </div>
        <div className="brand-bar h-0.5 w-full" aria-hidden="true" />
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-navy/70 lg:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 top-0 z-50 overflow-y-auto bg-navy px-5 pb-8 pt-6 text-navy-foreground lg:hidden"
        >
          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
          <div className="mb-6 flex items-center justify-between">
            <Logo className="h-14 w-auto" />
            <Dialog.Close
              className="grid h-11 w-11 place-items-center rounded-full"
              aria-label="Fechar menu"
            >
              <X />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile">
            <p className="eyebrow mb-3 text-teal">Soluções</p>
            <div className="grid grid-cols-2 gap-2">
              {solutions.map((solution) => (
                <Link
                  key={solution.key}
                  to={solution.href}
                  onClick={() => setOpen(false)}
                  activeProps={{ "aria-current": "page", className: "ring-1 ring-teal" }}
                  className="flex min-h-12 items-center rounded-xl bg-navy-soft px-3 py-3 text-sm font-medium"
                >
                  {solution.title}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.hash}
                  href={item.hash === "contato" ? contactUrl : `${home}#${item.hash}`}
                  target={item.hash === "contato" ? "_blank" : undefined}
                  rel={item.hash === "contato" ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="border-b border-navy-soft py-4 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 flex justify-center rounded-full bg-primary px-5 py-3.5 font-semibold text-primary-foreground"
            >
              Solicitar demonstração
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
