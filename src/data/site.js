import relatorio from "@/assets/relatorioChat.png";
import pausas from "@/assets/atendimentoPausas.png";
import conversas from "@/assets/atendimentoChat.png";
import novoAtendimento from "@/assets/iniciarAtendimento.png";
import webphone from "@/assets/webPhone.png";
import ferramentas from "@/assets/chatInterno.png";
import automacao from "@/assets/automaçoes.png";
import filas from "@/assets/atendimentoFila.png";
import voz from "@/assets/atendimentoVoz.png";
import calor from "@/assets/mapaCalor.png";
import entrada from "@/assets/relatorioEntrada.png";
import graficos from "@/assets/gráficos.png";
export const shots = {
  relatorio: {
    src: relatorio,
    alt: "Relatório consolidado de chat da plataforma GTI",
    w: 1575,
    h: 913,
  },
  pausas: { src: pausas, alt: "Tela de gestão de pausas dos atendentes", w: 1902, h: 901 },
  conversas: {
    src: conversas,
    alt: "Painel de atendimento sem conversa selecionada, com abas de atendimento, espera e automação",
    w: 1907,
    h: 903,
  },
  novoAtendimento: {
    src: novoAtendimento,
    alt: "Janela para iniciar um novo atendimento",
    w: 1908,
    h: 898,
  },
  webphone: {
    src: webphone,
    alt: "WebPhone integrado com teclado de discagem",
    w: 397,
    h: 762,
  },
  ferramentas: {
    src: ferramentas,
    alt: "Ferramentas do atendente e chat interno",
    w: 1899,
    h: 899,
  },
  automacao: { src: automacao, alt: "Editor visual de fluxos de automação", w: 1553, h: 688 },
  filas: {
    src: filas,
    alt: "Filas de atendimento, status do agente e disponibilidade do ramal",
    w: 1911,
    h: 903,
  },
  voz: {
    src: voz,
    alt: "Tela de chamadas de voz e acesso ao histórico de ligações",
    w: 1907,
    h: 897,
  },
  calor: {
    src: calor,
    alt: "Mapa de calor do fluxo de automação com filtros de período e canal",
    w: 1562,
    h: 895,
  },
  entrada: {
    src: entrada,
    alt: "Relatório de ligações de entrada com indicadores e exportações",
    w: 1584,
    h: 903,
  },
  graficos: {
    src: graficos,
    alt: "Gráficos históricos de conversas por dia e por canal",
    w: 1554,
    h: 911,
  },
};
// No supplied capture shows an open conversation. Replace this reference when one is available.
export const heroShot = shots.conversas;
export const solutions = [
  {
    key: "telefonia",
    href: "/solucoes/telefonia",
    title: "Telefonia IP",
    text: "Ramais, WebPhone no navegador e chamadas integradas ao atendimento.",
    icon: "Phone",
  },
  {
    key: "atendimento",
    href: "/solucoes/atendimento",
    title: "Atendimento Omnichannel",
    text: "WhatsApp, Instagram, Facebook e canal web próprio, com automações para o atendimento.",
    icon: "MessagesSquare",
  },
  {
    key: "automacoes",
    href: "/solucoes/automacoes",
    title: "Automações",
    text: "Fluxos visuais com condições de horário, filas e respostas automáticas.",
    icon: "Workflow",
  },
  {
    key: "relatorios",
    href: "/solucoes/relatorios",
    title: "Relatórios",
    text: "Indicadores consolidados por período, canal e empresa, com exportação.",
    icon: "BarChart3",
  },
];
export const benefits = [
  {
    title: "Comunicação centralizada",
    text: "Conversas por canais e departamentos e telefonia IP reunidas na mesma plataforma.",
    href: "/solucoes/atendimento",
  },
  {
    title: "Organização das filas",
    text: "Selecione as filas e os canais de atendimento e acompanhe a disponibilidade do ramal.",
    href: "/solucoes/atendimento",
  },
  {
    title: "Histórico de interações",
    text: "Consulte o histórico de atendimento para dar continuidade ao relacionamento com o contato.",
    href: "/solucoes/atendimento",
  },
  {
    title: "Acompanhamento da operação",
    text: "Visualize status, filas e pausas e consulte relatórios de conversas e ligações.",
    href: "/solucoes/relatorios",
  },
  {
    title: "Produtividade da equipe",
    text: "Mensagens prontas, templates e fluxos com condições de horário apoiam a rotina de atendimento.",
    href: "/solucoes/automacoes",
  },
  {
    title: "Suporte especializado",
    text: "Uma equipe próxima, que acompanha sua operação e resolve com agilidade.",
  },
];
// Only confirmed contact information is displayed.
export const contact = {
  phone: "+55 (21) 2203-7888",
  whatsapp: "+55 (21) 2203-7888",
  phones: ["(21) 2203-7888", "(21) 2203-7800", "(21) 2203-7801"],
  email: "suporte@gtinetworks.com.br",
  address: "",
  instagram: "https://www.instagram.com/gtitecnologia_/",
  instagramLabel: "@gtitecnologia_",
  businessHours: "Segunda a sexta, das 08:00 às 18:00",
  linkedin: "",
};
export const contactMessage =
  "Olá! Gostaria de solicitar uma demonstração da plataforma GTI Networks.";
export function getContactUrl(solutionKey) {
  const solution = solutions.find((entry) => entry.key === solutionKey);
  const message = solution
    ? `Olá! Gostaria de solicitar uma demonstração de ${solution.title} da GTI Networks para minha empresa.`
    : contactMessage;
  return `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
export const contactUrl = getContactUrl();
