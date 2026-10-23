import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/solucoes/relatorios")({
  head: () =>
    pageHead({
      title: "Hub de Relatórios e Indicadores | GTI Networks",
      description: products.relatorios.description,
      path: "/solucoes/relatorios",
    }),
  component: () => <SolutionPage productKey="relatorios" />,
});
