import { shots, contact } from "./site";

export const galleryGroups = [
  {
    id: "atendimento",
    title: "Atendimento",
    images: [shots.conversas, shots.novoAtendimento, shots.filas],
  },
  { id: "voz", title: "Chamadas de voz", images: [shots.voz] },
  { id: "webphone", title: "WebPhone", images: [shots.webphone] },
  { id: "automacoes", title: "Automações", images: [shots.automacao] },
  {
    id: "relatorios",
    title: "Relatórios",
    images: [shots.relatorio, shots.entrada, shots.calor, shots.graficos],
  },
];

export const implementationSteps = [
  {
    title: "Entender sua operação",
    text: "O primeiro passo é conversar sobre sua equipe, os canais utilizados e as necessidades de atendimento da empresa.",
  },
  {
    title: "Definir a configuração",
    text: "Com a equipe GTI Networks, alinhe os canais, a telefonia, as filas e as automações adequadas à sua operação.",
  },
  {
    title: "Preparar a equipe",
    text: "Combine as orientações de uso e o treinamento para que os atendentes conheçam os recursos da plataforma.",
  },
  {
    title: "Acompanhar a operação",
    text: "Após a entrada em operação, conte com o suporte para esclarecer dúvidas e avaliar ajustes na configuração.",
  },
];

export const frequentlyAskedQuestions = [
  {
    question: "Quais canais posso reunir na plataforma?",
    answer:
      "WhatsApp, Instagram e Facebook, além do canal web próprio da GTI Networks, com automações para o atendimento. Na demonstração, nossa equipe ajuda a definir a configuração adequada para sua empresa.",
  },
  {
    question: "Posso continuar usando o número da minha empresa?",
    answer:
      "Nossa equipe precisa avaliar o número atual e como ele é utilizado na telefonia ou no WhatsApp. Entre em contato para verificar as possibilidades e os requisitos antes de realizar qualquer alteração.",
  },
  {
    question: "A plataforma funciona pela internet ou com instalação local?",
    answer:
      "O software pode ser 100% web ou local. A opção e os requisitos de acesso são definidos conforme o cenário da empresa, em conjunto com a equipe GTI Networks.",
  },
  {
    question: "Como funciona a implantação e quanto tempo leva?",
    answer:
      "A implantação começa pelo entendimento da operação e pela definição dos canais e recursos necessários. As etapas, o treinamento e o prazo são alinhados com a equipe conforme o escopo de cada empresa.",
  },
  {
    question: "O atendimento por chat também tem telefonia?",
    answer:
      "A GTI Networks reúne atendimento por chat e Telefonia IP na mesma plataforma. A área de voz permite acompanhar chamadas e acessar o histórico, enquanto o WebPhone oferece ramal e teclado de discagem no navegador. Os recursos contratados são definidos na proposta.",
  },
  {
    question: "Os templates de WhatsApp são aprovados pela Meta?",
    answer:
      "No atendimento pelo WhatsApp, a plataforma permite utilizar templates de mensagens aprovados pela Meta. Essa aprovação se refere aos templates do WhatsApp; o canal web próprio é independente da Meta.",
  },
  {
    question: "Qual é o horário de atendimento do suporte?",
    answer: `Nosso atendimento funciona de ${contact.businessHours.toLocaleLowerCase("pt-BR")}. Fale pelo WhatsApp ou pelos telefones e e-mail informados no rodapé.`,
  },
];
