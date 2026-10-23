import relatorio from "@/assets/relatorio.png.asset.json";
import pausas from "@/assets/pausas.png.asset.json";
import conversas from "@/assets/conversas.png.asset.json";
import novoAtendimento from "@/assets/novo-atendimento.png.asset.json";
import webphone from "@/assets/webphone.png.asset.json";
import ferramentas from "@/assets/ferramentas.png.asset.json";
import automacao from "@/assets/automacao.png.asset.json";

export const shots = {
  relatorio: { src: relatorio.url, alt: "Relatório consolidado de chat da plataforma GTI", w: 1575, h: 913 },
  pausas: { src: pausas.url, alt: "Tela de gestão de pausas dos atendentes", w: 1902, h: 901 },
  conversas: { src: conversas.url, alt: "Painel de conversas em atendimento", w: 1907, h: 903 },
  novoAtendimento: { src: novoAtendimento.url, alt: "Janela para iniciar um novo atendimento", w: 1908, h: 898 },
  webphone: { src: webphone.url, alt: "WebPhone integrado com teclado de discagem", w: 397, h: 762 },
  ferramentas: { src: ferramentas.url, alt: "Ferramentas do atendente e chat interno", w: 1899, h: 899 },
  automacao: { src: automacao.url, alt: "Editor visual de fluxos de automação", w: 1553, h: 688 },
} as const;

export type Shot = (typeof shots)[keyof typeof shots];

export const solutions = [
  { key: "telefonia", title: "Telefonia IP", text: "Ramais, WebPhone no navegador e chamadas integradas ao atendimento.", icon: "Phone" },
  { key: "atendimento", title: "Atendimento Omnichannel", text: "Conversas de vários canais reunidas em uma única caixa de entrada.", icon: "MessagesSquare" },
  { key: "automacoes", title: "Automações", text: "Fluxos visuais com condições de horário, filas e respostas automáticas.", icon: "Workflow" },
  { key: "monitoramento", title: "Monitoramento", text: "Acompanhe filas, pausas e o status da equipe em tempo real.", icon: "Activity" },
  { key: "relatorios", title: "Relatórios", text: "Indicadores consolidados por período, canal e empresa, com exportação.", icon: "BarChart3" },
  { key: "integracoes", title: "Integrações", text: "Conecte a plataforma a sistemas e consultas externas nos seus fluxos.", icon: "Plug" },
] as const;

export const benefits = [
  { title: "Tudo em um só lugar", text: "Chat, telefonia e ferramentas de gestão no mesmo ambiente, sem alternar entre sistemas." },
  { title: "Filas organizadas", text: "Distribua atendimentos por departamento e evite contatos sem resposta." },
  { title: "Histórico completo", text: "Cada interação com o cliente fica registrada e acessível para a equipe." },
  { title: "Operação sob controle", text: "Monitore pausas, status e movimento da operação enquanto ela acontece." },
  { title: "Mais produtividade", text: "Mensagens prontas, automações e chat interno agilizam o dia a dia." },
  { title: "Suporte de alto nível", text: "Uma equipe próxima, que acompanha sua operação e resolve com agilidade." },
] as const;

/* PROVISÓRIO — preencher com os dados oficiais. Itens vazios não são exibidos. */
export const contact = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  instagram: "",
  linkedin: "",
};
