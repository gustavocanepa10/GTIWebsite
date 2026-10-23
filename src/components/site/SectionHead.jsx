import { Reveal } from "./Reveal";
export function SectionHead({ eyebrow, title, text, light }) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-teal" : "text-accent-foreground"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl font-bold leading-tight md:text-4xl ${light ? "text-navy-foreground" : "text-foreground"}`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 text-base md:text-lg ${light ? "text-navy-muted" : "text-muted-foreground"}`}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
