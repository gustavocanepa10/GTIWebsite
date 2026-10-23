import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/solucoes/telefonia")({
  head: () =>
    pageHead({
      title: "Telefonia IP e WebPhone | GTI Networks",
      description: products.telefonia.description,
      path: "/solucoes/telefonia",
    }),
  component: () => <SolutionPage productKey="telefonia" />,
});
