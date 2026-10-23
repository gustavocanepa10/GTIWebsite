import { useEffect, useState } from "react";
import { X, Maximize2 } from "lucide-react";
import type { Shot } from "@/data/site";
import { cn } from "@/lib/utils";

export function Screenshot({ shot, className, frame = true, eager = false }: { shot: Shot; className?: string; frame?: boolean; eager?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar: ${shot.alt}`}
        className={cn(
          "group relative block w-full overflow-hidden rounded-2xl bg-card text-left shadow-shot transition-transform duration-500 hover:-translate-y-1",
          className,
        )}
      >
        {frame && (
          <div className="flex items-center gap-1.5 border-b bg-secondary px-4 py-2.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-orange" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal" />
          </div>
        )}
        <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading={eager ? "eager" : "lazy"} className="block h-auto w-full" />
        <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-navy text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={shot.alt} className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setOpen(false)}>
          <button type="button" aria-label="Fechar" autoFocus className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-navy-soft text-navy-foreground" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
          <img src={shot.src} alt={shot.alt} className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-shot animate-in zoom-in-95" />
        </div>
      )}
    </>
  );
}
