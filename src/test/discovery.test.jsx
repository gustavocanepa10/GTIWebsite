import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScreenGallery } from "@/components/site/ScreenGallery";
import { SolutionPage } from "@/components/site/SolutionPage";
import { shots, solutions, contactUrl, getContactUrl } from "@/data/site";
import { renderInRouter } from "./render-router";

afterEach(cleanup);

describe("Discovery and contextual contact", () => {
  it("filters gallery captures by resource without mixing reports and voice", () => {
    render(<ScreenGallery />);
    expect(screen.getByRole("img", { name: shots.conversas.alt })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Chamadas de voz", exact: true }));
    expect(screen.getByRole("img", { name: shots.voz.alt })).toHaveAttribute("src", shots.voz.src);
    expect(screen.queryByRole("img", { name: shots.conversas.alt })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "WebPhone", exact: true }));
    expect(screen.getByRole("img", { name: shots.webphone.alt })).toHaveAttribute(
      "src",
      shots.webphone.src,
    );
    fireEvent.click(screen.getByRole("button", { name: "Relatórios", exact: true }));
    expect(screen.getByRole("button", { name: "Relatórios", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("img", { name: shots.relatorio.alt })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: shots.calor.alt })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: shots.webphone.alt })).not.toBeInTheDocument();
  });

  it.each(solutions)(
    "prepares a demonstration message for $title at the confirmed number",
    (solution) => {
      const url = new URL(getContactUrl(solution.key));
      expect(url.origin + url.pathname).toBe("https://wa.me/552122037888");
      expect(url.searchParams.get("text")).toContain(solution.title);
      expect(url.searchParams.get("text")).toContain("demonstração");
      expect(getContactUrl("unknown")).toBe(contactUrl);
    },
  );

  it("uses the solution message in the page CTA, contact card and footer", async () => {
    const { container } = await renderInRouter(<SolutionPage productKey="telefonia" />);
    const link = within(screen.getByRole("main")).getByRole("link", {
      name: "Solicitar demonstração",
    });
    expect(link).toHaveAttribute("href", getContactUrl("telefonia"));
    for (const anchor of container.querySelectorAll(
      'main a[href*="wa.me"], footer a[href*="wa.me"]',
    )) {
      expect(anchor).toHaveAttribute("href", getContactUrl("telefonia"));
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
