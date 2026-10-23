import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/solucoes/atendimento")({
  head: () =>
    pageHead({
      title: "Atendimento Omnichannel | GTI Networks",
      description: products.atendimento.description,
      path: "/solucoes/atendimento",
    }),
  component: () => <SolutionPage productKey="atendimento" />,
});
