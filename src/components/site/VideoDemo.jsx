import { useEffect, useState } from "react";
import { Film } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { videoDemos } from "@/data/videos";

// Supply a real MP4/WebM URL when an approved demonstration becomes available.
export function VideoDemo({ candidates = [], ...props }) {
  const [discoveredSrc, setDiscoveredSrc] = useState();
  const candidateKey = JSON.stringify(candidates);
  useEffect(() => {
    if (props.src) return;
    const controller = new AbortController();
    setDiscoveredSrc(undefined);
    async function findAvailableVideo() {
      for (const candidate of JSON.parse(candidateKey)) {
        try {
          // HEAD checks availability without fetching the video body. A Vite/SPA
          // HTML fallback must never be mistaken for a playable video.
          const response = await fetch(candidate, {
            method: "HEAD",
            signal: controller.signal,
            cache: "no-store",
          });
          if (
            response.ok &&
            response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() === "video/mp4"
          ) {
            if (!controller.signal.aborted) setDiscoveredSrc(candidate);
            return;
          }
        } catch {
          if (controller.signal.aborted) return;
        }
      }
    }
    findAvailableVideo();
    return () => controller.abort();
  }, [props.src, candidateKey]);
  const src = props.src || discoveredSrc;
  // Remount the player when a configured source changes, resetting its error state.
  return <VideoPlayer key={src || "unavailable"} {...props} src={src} />;
}

function VideoPlayer({ title, poster, src, captions }) {
  const [error, setError] = useState(false);
  return (
    <figure className="overflow-hidden rounded-2xl border bg-card shadow-soft">
      {src && !error ? (
        <video
          controls
          playsInline
          preload="none"
          poster={poster?.src}
          aria-label={title}
          className="block aspect-video w-full bg-navy object-contain"
          onError={() => setError(true)}
        >
          <source src={src} type="video/mp4" onError={() => setError(true)} />
          {captions && (
            <track kind="captions" src={captions} srcLang="pt-BR" label="Português" default />
          )}
          Seu navegador não suporta este vídeo. <a href={src}>Abrir vídeo</a>
        </video>
      ) : (
        <div className="relative grid aspect-video place-items-center overflow-hidden bg-navy text-navy-foreground">
          {poster && (
            <img
              src={poster.src}
              alt=""
              width={poster.w}
              height={poster.h}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-left-top opacity-20"
            />
          )}
          <div className="relative px-5 text-center">
            <Film className="mx-auto mb-3 h-7 w-7 text-teal" aria-hidden="true" />
            <p className="text-sm">
              {error ? "Não foi possível carregar o vídeo." : "Vídeo demonstrativo em breve"}
            </p>
          </div>
        </div>
      )}
      <figcaption className="p-5 text-base font-semibold">{title}</figcaption>
    </figure>
  );
}

export function Videos() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHead
          eyebrow="Vídeos"
          title="A plataforma em movimento"
          text="Conheça a plataforma nos vídeos demonstrativos disponíveis. Os módulos sem vídeo publicado continuam identificados como em breve."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videoDemos.map((video) => (
            <VideoDemo
              key={video.id}
              title={video.title}
              poster={video.poster}
              src={video.src}
              candidates={[video.path, ...(video.alternatives || [])]}
              captions={video.captions}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
