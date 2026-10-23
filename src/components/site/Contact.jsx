import { useId, useRef, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { contact, contactUrl } from "@/data/site";
import { ContactDetails } from "./ContactDetails";

function validateContact(values) {
  const errors = {};
  if (values.nome.trim().length < 2) errors.nome = "Informe seu nome com pelo menos 2 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Informe um e-mail válido.";
  const phoneDigits = values.telefone.replace(/\D/g, "");
  if (
    values.telefone.trim() &&
    (!/^[+()\d\s.-]{8,25}$/.test(values.telefone.trim()) ||
      phoneDigits.length < 8 ||
      phoneDigits.length > 15)
  )
    errors.telefone = "Informe um telefone válido ou deixe este campo em branco.";
  return errors;
}

// A future integration supplies onSend(values), resolving { success: true } only
// after the configured service accepts the message. No network request by default.
export function Contact({ onSend, contactHref = contactUrl }) {
  const id = useId();
  const busy = useRef(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const demo = typeof onSend !== "function";
  if (demo)
    return (
      <section id="contato" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl bg-navy p-6 text-navy-foreground sm:p-10 lg:grid-cols-2 md:p-14">
          <SectionHead
            light
            eyebrow="Vamos conversar"
            title="Conheça a plataforma na prática"
            text="Fale com a equipe GTI Networks para conhecer a plataforma e solicitar uma demonstração para sua empresa."
          />
          <div className="min-w-0 rounded-2xl bg-navy-soft p-6 sm:p-8">
            <p className="text-sm text-navy-muted">Atendimento pelo WhatsApp</p>
            <p className="mt-3 text-xl font-semibold sm:text-2xl">{contact.whatsapp}</p>
            <a
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-center font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Falar com a GTI Networks <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
            <ContactDetails className="mt-6 border-t border-navy-muted/30 pt-6 text-navy-foreground" />
          </div>
        </div>
      </section>
    );
  async function submit(event) {
    event.preventDefault();
    if (busy.current || status === "success") return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const invalid = validateContact(values);
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      setStatus("invalid");
      form.elements.namedItem(Object.keys(invalid)[0]).focus();
      return;
    }
    if (demo) {
      setStatus("demo");
      return;
    }
    busy.current = true;
    setStatus("loading");
    try {
      const result = await onSend(
        Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()])),
      );
      if (result?.success !== true) throw new Error("Message was not accepted");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  const field =
    "w-full rounded-xl border border-navy-soft bg-navy-soft px-4 py-3.5 text-navy-foreground placeholder:text-navy-muted focus:border-teal focus:outline-none";
  return (
    <section id="contato" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-3xl bg-navy p-6 text-navy-foreground sm:p-10 lg:grid-cols-2 md:p-14">
        <SectionHead
          light
          eyebrow="Vamos conversar"
          title="Conheça a plataforma na prática"
          text="Conte um pouco sobre sua operação e descubra como a GTI Networks pode apoiar sua equipe."
        />
        <div className="min-w-0">
          <p id={`${id}-notice`} className="mb-5 text-sm leading-relaxed text-navy-muted">
            {demo
              ? "Formulário demonstrativo: os dados são validados apenas neste navegador. Nenhuma mensagem será enviada."
              : "Preencha os campos para solicitar uma demonstração."}
          </p>
          <form
            onSubmit={submit}
            noValidate
            aria-label="Solicitar demonstração"
            aria-describedby={`${id}-notice`}
            aria-busy={status === "loading"}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                name: "nome",
                label: "Nome",
                placeholder: "Seu nome",
                complete: "name",
                required: true,
              },
              {
                name: "email",
                label: "E-mail",
                placeholder: "E-mail corporativo",
                type: "email",
                complete: "email",
                required: true,
              },
              {
                name: "telefone",
                label: "Telefone",
                placeholder: "Telefone (opcional)",
                type: "tel",
                complete: "tel",
              },
              {
                name: "empresa",
                label: "Empresa",
                placeholder: "Empresa (opcional)",
                complete: "organization",
              },
            ].map((input) => (
              <div key={input.name} className={input.name === "nome" ? "sm:col-span-2" : ""}>
                <label htmlFor={`${id}-${input.name}`} className="mb-2 block text-sm font-medium">
                  {input.label}
                  {input.required && " *"}
                </label>
                <input
                  id={`${id}-${input.name}`}
                  name={input.name}
                  type={input.type || "text"}
                  autoComplete={input.complete}
                  required={input.required}
                  maxLength={input.name === "telefone" ? 25 : 180}
                  placeholder={input.placeholder}
                  className={field}
                  aria-invalid={!!errors[input.name]}
                  aria-describedby={errors[input.name] ? `${id}-${input.name}-error` : undefined}
                  disabled={status === "loading" || status === "success"}
                />
                {errors[input.name] && (
                  <p id={`${id}-${input.name}-error`} className="mt-2 text-sm text-navy-foreground">
                    {errors[input.name]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Enviando…
                </>
              ) : demo ? (
                <>
                  Validar demonstração <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Solicitar demonstração"
              )}
            </button>
            <div
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className="text-sm sm:col-span-2"
            >
              {status === "demo" &&
                "Campos validados. Modo demonstrativo: nenhuma mensagem foi enviada."}
              {status === "success" && "Sua solicitação foi enviada com sucesso."}
              {status === "error" &&
                "Não foi possível enviar. Seus dados continuam no formulário; tente novamente."}
              {status === "invalid" && "Revise os campos indicados antes de continuar."}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
