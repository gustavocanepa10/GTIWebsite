import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/solucoes/automacoes")({
  head: () =>
    pageHead({
      title: "Automações de Atendimento | GTI Networks",
      description: products.automacoes.description,
      path: "/solucoes/automacoes",
    }),
  component: () => <SolutionPage productKey="automacoes" />,
});
