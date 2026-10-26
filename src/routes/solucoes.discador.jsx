import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/solucoes/discador")({
  head: () =>
    pageHead({
      title: "Discador Automático | GTI Networks",
      description: products.discador.description,
      path: "/solucoes/discador",
    }),
  component: () => <SolutionPage productKey="discador" />,
});
