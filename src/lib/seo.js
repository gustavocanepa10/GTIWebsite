import logo from "@/assets/Logo_GTI-04.jpg";

export const siteTitle = "GTI Networks | Sua comunicação em um só lugar";
export const siteDescription =
  "Centralize o atendimento omnichannel, integre sua telefonia IP, automatize processos e acompanhe sua operação com a plataforma GTI Networks.";

export function pageHead({ title = siteTitle, description = siteDescription, path = "/" } = {}) {
  const configured = import.meta.env.VITE_SITE_URL;
  let canonical;
  try {
    const origin = new URL(configured);
    if (["http:", "https:"].includes(origin.protocol))
      canonical = new URL(path, origin.origin).href;
  } catch {
    /* Canonical is omitted until the official domain is configured. */
  }
  const image = canonical ? new URL(logo, canonical).href : logo;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: "GTI Networks Tecnologia" },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: canonical ? [{ rel: "canonical", href: canonical }] : [],
  };
}
