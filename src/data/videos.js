import { shots, heroShot } from "./site";

const availableFiles = new Set(import.meta.env.GTI_PUBLIC_VIDEO_FILES || []);

export const videoDemos = [
  {
    id: "apresentacao",
    title: "Visão geral da plataforma",
    path: "/videos/apresentacao_linkedin.mp4",
    alternatives: ["/videos/apresentacao.mp4"],
    poster: heroShot,
  },
  {
    id: "atendimento",
    title: "Atendimento omnichannel",
    path: "/videos/atendimento.mp4",
    alternatives: ["/videos/apresentacaoV2.mp4"],
    poster: shots.conversas,
  },
  {
    id: "relatorios",
    title: "Relatórios",
    path: "/videos/relatorios.mp4",
    alternatives: ["/videos/1021 (2).mp4"],
    poster: shots.relatorio,
  },
].map((video) => ({
  ...video,
  src: [video.path, ...(video.alternatives || [])].find((path) => availableFiles.has(path)),
}));
