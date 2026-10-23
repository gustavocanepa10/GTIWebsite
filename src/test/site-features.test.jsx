import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "@/components/site/Contact";
import { ReportExplorer } from "@/components/site/ReportExplorer";
import { VideoDemo } from "@/components/site/VideoDemo";
import { Screenshot } from "@/components/site/Screenshot";
import { Header } from "@/components/site/Header";
import { shots, contactUrl } from "@/data/site";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";
import { renderInRouter } from "./render-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { videoDemos } from "@/data/videos";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
function fillContact() {
  fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Maria Silva" } });
  fireEvent.change(screen.getByLabelText("E-mail *"), { target: { value: "maria@example.com" } });
}

describe("Contact form", () => {
  it("validates fields and focuses the first invalid input", () => {
    const send = vi.fn();
    render(<Contact onSend={send} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByLabelText("Nome *")).toHaveFocus();
    expect(screen.getByLabelText("E-mail *")).toHaveAttribute("aria-invalid", "true");
    expect(send).not.toHaveBeenCalled();
  });
  it("directs contact to the confirmed WhatsApp number without a demo form", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /Falar com a GTI Networks/ })).toHaveAttribute(
      "href",
      contactUrl,
    );
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByText(/enviada com sucesso/)).not.toBeInTheDocument();
  });
  it("rejects an invalid e-mail and a phone without digits", () => {
    const send = vi.fn();
    render(<Contact onSend={send} />);
    fillContact();
    fireEvent.change(screen.getByLabelText("E-mail *"), { target: { value: "email-invalido" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "........" } });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByLabelText("E-mail *")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Telefone")).toHaveAttribute("aria-invalid", "true");
    expect(send).not.toHaveBeenCalled();
  });
  it("prevents duplicate sends and confirms only after a successful response", async () => {
    let resolve;
    const send = vi.fn(
      () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    render(<Contact onSend={send} />);
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    fireEvent.submit(screen.getByRole("form"));
    expect(send).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /Enviando/ })).toBeDisabled();
    expect(screen.queryByText(/enviada com sucesso/)).not.toBeInTheDocument();
    await act(async () => resolve({ success: true }));
    expect(screen.getByRole("status")).toHaveTextContent("enviada com sucesso");
  });
  it("preserves values after failure and allows retry", async () => {
    const send = vi
      .fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce({ success: true });
    render(<Contact onSend={send} />);
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    expect(await screen.findByRole("alert")).toHaveTextContent("Não foi possível enviar");
    expect(screen.getByLabelText("Nome *")).toHaveValue("Maria Silva");
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("enviada com sucesso"),
    );
  });
});

describe("Media and navigation", () => {
  it("reuses the Home's omnichannel video on its solution page", async () => {
    const video = videoDemos.find((entry) => entry.id === "atendimento");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url) => ({
        ok: url === "/videos/apresentacaoV2.mp4",
        headers: new Headers({ "content-type": "video/mp4" }),
      })),
    );
    const { container } = await renderInRouter(<SolutionPage productKey="atendimento" />);
    await waitFor(() =>
      expect(container.querySelector("video source")).toHaveAttribute(
        "src",
        video.src || "/videos/apresentacaoV2.mp4",
      ),
    );
    expect(screen.getByRole("img", { name: shots.voz.alt })).toHaveAttribute("src", shots.voz.src);
    expect(screen.getByRole("img", { name: shots.filas.alt })).toHaveAttribute(
      "src",
      shots.filas.src,
    );
    expect(
      screen.queryByText(/O vídeo deste módulo ainda não está disponível/),
    ).not.toBeInTheDocument();
  });
  it("does not advertise a nonexistent automation video or integration links", async () => {
    const { container } = await renderInRouter(<SolutionPage productKey="automacoes" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Automatize processos");
    expect(container.querySelector("video")).toBeNull();
    expect(screen.queryByText("Vídeo demonstrativo em breve")).not.toBeInTheDocument();
    expect(container.querySelector('a[href*="integracoes"]')).toBeNull();
    expect(container.querySelector('a[href*="monitoramento"]')).toBeNull();
    expect(screen.queryByText("Integrações")).not.toBeInTheDocument();
  });
  it("presents dedicated heat-map and voice report sections", async () => {
    await renderInRouter(<SolutionPage productKey="relatorios" />);
    expect(screen.getByRole("heading", { level: 2, name: "Mapa de Calor" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Relatório de Voz" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: shots.calor.alt })).toHaveAttribute(
      "src",
      shots.calor.src,
    );
    expect(screen.getByRole("img", { name: shots.entrada.alt })).toHaveAttribute(
      "src",
      shots.entrada.src,
    );
    expect(screen.getByRole("link", { name: "Ver Mapa de Calor" })).toHaveAttribute(
      "href",
      "#relatorio-mapa-de-calor",
    );
    expect(screen.getByRole("link", { name: "Ver Relatório de Voz" })).toHaveAttribute(
      "href",
      "#relatorio-voz",
    );
  });
  it("finds a newly added MP4 using HEAD when the startup inventory is stale", async () => {
    const request = vi
      .fn()
      .mockResolvedValue({ ok: true, headers: new Headers({ "content-type": "video/mp4" }) });
    vi.stubGlobal("fetch", request);
    const { container } = render(
      <VideoDemo
        title="Visão geral"
        candidates={["/videos/apresentacao_linkedin.mp4"]}
        poster={shots.conversas}
      />,
    );
    await waitFor(() =>
      expect(container.querySelector("video source")).toHaveAttribute(
        "src",
        "/videos/apresentacao_linkedin.mp4",
      ),
    );
    expect(request).toHaveBeenCalledWith(
      "/videos/apresentacao_linkedin.mp4",
      expect.objectContaining({ method: "HEAD" }),
    );
    expect(container.querySelector("video")).toHaveAttribute("preload", "none");
  });
  it("keeps the placeholder when a missing video returns an HTML fallback", async () => {
    const request = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ "content-type": "text/html; charset=utf-8" }),
    });
    vi.stubGlobal("fetch", request);
    const { container } = render(
      <VideoDemo title="Vídeo ausente" candidates={["/videos/missing.mp4"]} />,
    );
    await waitFor(() => expect(request).toHaveBeenCalled());
    expect(container.querySelector("video")).toBeNull();
    expect(screen.getByText("Vídeo demonstrativo em breve")).toBeInTheDocument();
  });
  it("changes report text and capture together and identifies missing material", () => {
    render(<ReportExplorer />);
    expect(screen.getByRole("img", { name: shots.relatorio.alt })).toHaveAttribute(
      "src",
      shots.relatorio.src,
    );
    const heat = screen.getByRole("tab", { name: "Mapa de Calor" });
    fireEvent.mouseDown(heat, { button: 0, ctrlKey: false });
    fireEvent.click(heat);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("passagem pelas etapas");
    expect(screen.getByRole("img", { name: shots.calor.alt })).toHaveAttribute(
      "src",
      shots.calor.src,
    );
    const pending = screen.getByRole("tab", { name: /Pesquisas/ });
    fireEvent.mouseDown(pending, { button: 0, ctrlKey: false });
    fireEvent.click(pending);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Captura ainda não disponível");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
  it("shows an accessible placeholder without a fake player", () => {
    const { container } = render(<VideoDemo title="Demonstração" poster={shots.voz} />);
    expect(screen.getByText("Vídeo demonstrativo em breve")).toBeInTheDocument();
    expect(container.querySelector("video")).toBeNull();
  });
  it("renders a configured video with native controls, no autoplay and an error state", () => {
    const { container } = render(
      <VideoDemo title="Teste de player" src="/test-only-video.mp4" poster={shots.voz} />,
    );
    const video = container.querySelector("video");
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("preload", "none");
    fireEvent.error(video);
    expect(screen.getByText("Não foi possível carregar o vídeo.")).toBeInTheDocument();
  });
  it("shows a loading/error state for a failed screenshot", () => {
    render(<Screenshot shot={shots.conversas} />);
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent("Não foi possível carregar");
  });
  it("restores focus after closing a screenshot", async () => {
    render(<Screenshot shot={shots.voz} />);
    const trigger = screen.getByRole("button", { name: /Ampliar/ });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));
    await waitFor(() => expect(trigger).toHaveFocus());
  });
  it("closes mobile navigation with Escape and restores focus", async () => {
    await renderInRouter(<Header />);
    const trigger = screen.getByRole("button", { name: "Abrir menu" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});

describe("Route metadata", () => {
  it("provides distinct titles and descriptions for every solution", () => {
    const heads = Object.entries(products).map(([key, product]) =>
      pageHead({
        title: `${product.title} | GTI Networks`,
        description: product.description,
        path: `/solucoes/${key}`,
      }),
    );
    expect(new Set(heads.map((head) => head.meta.find((meta) => meta.title).title)).size).toBe(4);
    expect(
      new Set(heads.map((head) => head.meta.find((meta) => meta.name === "description").content))
        .size,
    ).toBe(4);
  });
  it("includes canonical only when the official URL is configured", () => {
    vi.stubEnv("VITE_SITE_URL", "");
    expect(pageHead({ title: "Teste", description: "Teste" }).links).toEqual([]);
    vi.stubEnv("VITE_SITE_URL", "https://example.com");
    expect(
      pageHead({ title: "Teste", description: "Teste", path: "/solucoes/telefonia" }).links,
    ).toContainEqual({ rel: "canonical", href: "https://example.com/solucoes/telefonia" });
  });
});
