import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Maximize2, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

function CaptureImage({ shot, eager, expanded = false }) {
  const [status, setStatus] = useState("loading");
  if (status === "error")
    return (
      <div
        role="status"
        className="grid min-h-40 place-content-center gap-3 p-6 text-center text-sm text-muted-foreground"
      >
        <ImageOff className="mx-auto h-6 w-6" />
        <span>Não foi possível carregar esta captura.</span>
        <span>{shot.alt}</span>
      </div>
    );
  return (
    <div
      className="relative min-w-0"
      style={expanded ? undefined : { aspectRatio: `${shot.w} / ${shot.h}` }}
      aria-busy={status === "loading"}
    >
      {status === "loading" && (
        <span
          className="pointer-events-none absolute inset-0 grid place-items-center bg-secondary text-xs text-muted-foreground"
          aria-hidden="true"
        >
          Carregando captura…
        </span>
      )}
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        loading={eager || expanded ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
        className={cn(
          "relative block h-auto w-full",
          expanded && "max-h-[80dvh] w-auto max-w-full object-contain",
        )}
      />
    </div>
  );
}

export function Screenshot({ shot, className, frame = true, eager = false }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Ampliar: ${shot.alt}`}
          className={cn(
            "group relative block w-full overflow-hidden rounded-2xl bg-card text-left shadow-shot transition-transform duration-500 hover:-translate-y-1 motion-reduce:transform-none [clip-path:inset(1px_round_1rem)]",
            !frame && "bg-transparent",
            className,
          )}
        >
          {frame && (
            <div
              className="flex items-center gap-1.5 border-b bg-secondary px-4 py-2.5"
              aria-hidden="true"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-orange" />
              <span className="h-2.5 w-2.5 rounded-full bg-lime" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
            </div>
          )}
          <CaptureImage key={shot.src} shot={shot} eager={eager} />
          <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-navy text-navy-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 grid max-h-[100dvh] w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl bg-navy p-2 pt-14 shadow-shot sm:p-4 sm:pt-14"
        >
          <Dialog.Title className="sr-only">{shot.alt}</Dialog.Title>
          <Dialog.Close
            aria-label="Fechar"
            className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-navy-soft text-navy-foreground"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
          <CaptureImage key={shot.src} shot={shot} expanded />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
