import { cleanup, fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "@/components/site/Header";
import { Screenshot } from "@/components/site/Screenshot";
import { shots, contactUrl } from "@/data/site";
import { renderInRouter } from "./render-router";

const uiModules = import.meta.glob("../components/ui/*.jsx", { eager: true });

afterEach(cleanup);

describe("Migrated components", () => {
  it("loads every UI component module without broken imports", () => {
    expect(Object.keys(uiModules)).toHaveLength(46);
    for (const module of Object.values(uiModules)) {
      expect(Object.keys(module).length).toBeGreaterThan(0);
    }
  });

  it("opens the mobile menu and closes it when navigating to contact", async () => {
    await renderInRouter(<Header />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobile = screen.getByRole("navigation", { name: "Mobile" });
    const contact = within(mobile).getByRole("link", { name: "Contato" });
    expect(contact).toHaveAttribute("href", contactUrl);
    fireEvent.click(contact);
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("enlarges the original screenshot and closes it with Escape", async () => {
    const shot = shots.conversas;
    render(<Screenshot shot={shot} />);
    expect(screen.getByRole("img", { name: shot.alt })).toHaveAttribute("src", shot.src);
    fireEvent.click(screen.getByRole("button", { name: `Ampliar: ${shot.alt}` }));
    const dialog = screen.getByRole("dialog", { name: shot.alt });
    expect(within(dialog).getByRole("img")).toHaveAttribute("src", shot.src);
    expect(document.body).toHaveAttribute("data-scroll-locked");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body).not.toHaveAttribute("data-scroll-locked");
  });
});
