import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Logo } from "./Logo";
import { contact, contactUrl, solutions } from "@/data/site";

export function Footer({ contactHref = contactUrl }) {
  const linkClass =
    "inline-flex min-h-10 items-center text-sm text-navy-muted transition-colors hover:text-navy-foreground";
  return (
    <footer className="bg-navy pb-6 pt-12 text-navy-foreground md:pt-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1.15fr_1fr] lg:gap-12">
          <div>
            <Link to="/" aria-label="GTI Networks — início" className="inline-block max-w-full">
              <Logo className="h-36 w-auto max-w-full md:h-44" />
            </Link>
          </div>
          <nav aria-label="Companhia">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide">Companhia</h2>
            <ul>
              <li>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" hash="sobre" className={linkClass}>
                  Empresa
                </Link>
              </li>
              <li>
                <a
                  href={contactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Fale conosco
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Links importantes">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide">
              Links importantes
            </h2>
            <ul>
              {solutions.map((solution) => (
                <li key={solution.key}>
                  <Link
                    to={solution.href}
                    className={linkClass}
                    activeProps={{ "aria-current": "page", className: "text-navy-foreground" }}
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide">Redes sociais</h2>
            <div className="flex items-center gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da GTI Networks"
                className="grid h-11 w-11 place-items-center rounded-full text-navy-muted transition-colors hover:bg-navy-soft hover:text-navy-foreground"
              >
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da GTI Networks"
                className="grid h-11 w-11 place-items-center rounded-full text-navy-muted transition-colors hover:bg-navy-soft hover:text-navy-foreground"
              >
                <WhatsAppIcon className="h-6 w-6" />
              </a>
            </div>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} mt-2 break-all`}
            >
              {contact.instagramLabel}
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 text-sm text-navy-muted lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <ul aria-label="Telefones de contato" className="flex flex-wrap gap-x-5 gap-y-1">
            {contact.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:+55${phone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-navy-foreground"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed">{contact.businessHours}</p>
        </div>
        <div className="mt-6 flex flex-col gap-4 border-t border-navy-muted/25 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="leading-relaxed text-navy-muted">
            © {new Date().getFullYear()} GTI Networks Tecnologia. Todos os direitos reservados.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-11 min-w-0 items-center gap-2 text-orange hover:underline"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>E-mail</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
