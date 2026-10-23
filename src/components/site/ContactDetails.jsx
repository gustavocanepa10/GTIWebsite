import { contact } from "@/data/site";
import { cn } from "@/lib/utils";

export function ContactDetails({ className }) {
  return (
    <ul aria-label="Informações de contato" className={cn("min-w-0 space-y-4 text-sm", className)}>
      <li>
        <span className="font-semibold">Telefones</span>
        <ul className="mt-1">
          {contact.phones.map((phone) => (
            <li key={phone}>
              <a
                href={`tel:+55${phone.replace(/\D/g, "")}`}
                className="inline-flex min-h-11 items-center hover:underline"
              >
                {phone}
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex min-h-11 max-w-full items-center break-all hover:underline"
        >
          E-mail
        </a>
      </li>
      <li>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 max-w-full items-center break-all hover:underline"
        >
          Instagram: {contact.instagramLabel}
        </a>
      </li>
      <li>
        <p className="font-semibold">Horário de atendimento</p>
        <p className="mt-1 leading-relaxed">{contact.businessHours}</p>
      </li>
    </ul>
  );
}
