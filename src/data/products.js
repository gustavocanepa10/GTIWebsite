import { shots } from "./site";

export const products = {
  discador: {
    title: "Discador Automático",
    headline: "Mais agilidade para conectar sua equipe aos clientes.",
    description:
      "Automatize a discagem das chamadas de saída e simplifique a rotina de contato da sua operação com o discador automático da GTI Networks.",
    features: [
      ["Discagem automática", "Dê agilidade às chamadas de saída com menos trabalho de discagem manual."],
      ["Foco na conversa", "Dedique mais atenção ao contato com o cliente durante o atendimento."],
      ["Resultados das chamadas", "Consulte o relatório de saída de voz para acompanhar chamadas realizadas, atendidas e não atendidas."],
    ],
    benefits: [
      "Mais agilidade na rotina de contato.",
      "Menos trabalho de discagem manual.",
      "Indicadores de saída de voz para acompanhar a operação.",
    ],
    related: ["telefonia", "relatorios", "atendimento"],
  },
  atendimento: {
    title: "Atendimento Omnichannel",
    headline: "Todos os seus atendimentos organizados em um só lugar.",
    description:
      "Reúna WhatsApp, Instagram, Facebook e nosso canal web próprio em uma operação de atendimento com automações, organização por departamentos e histórico das interações.",
    shot: shots.conversas,
    features: [
      [
        "Conversas organizadas",
        "Abas de atendimento, espera e automação ajudam a localizar cada etapa da operação.",
      ],
      [
        "Busca e contexto",
        "Busque por conversa ou telefone e consulte o histórico de interações do contato.",
      ],
      [
        "Início de atendimento",
        "Selecione contato, canal e departamento. No WhatsApp, utilize templates de mensagens aprovados pela Meta.",
      ],
    ],
    benefits: [
      "Uma visão organizada das conversas em atendimento.",
      "Direcionamento por filas e departamentos.",
      "Templates aprovados pela Meta no WhatsApp e histórico para apoiar a continuidade do contato.",
    ],
    related: ["automacoes", "relatorios", "telefonia"],
  },
  telefonia: {
    title: "Telefonia IP",
    headline: "Sua telefonia integrada à operação.",
    description:
      "Utilize o WebPhone no navegador, acompanhe seu ramal e consulte as informações de chamadas no mesmo ambiente de trabalho.",
    shot: shots.voz,
    features: [
      [
        "WebPhone no navegador",
        "Discador integrado com identificação do ramal e indicação de disponibilidade.",
      ],
      [
        "Chamadas e histórico",
        "Uma área dedicada às chamadas de voz e acesso ao histórico de ligações.",
      ],
      [
        "Disponibilidade do ramal",
        "Consulte o ramal identificado e sua disponibilidade no WebPhone.",
      ],
    ],
    benefits: [
      "Telefonia próxima dos demais recursos de atendimento.",
      "Disponibilidade e ramal visíveis para a equipe.",
      "Histórico e relatórios para consultar a operação de voz.",
    ],
    related: ["atendimento", "automacoes", "relatorios"],
  },
  automacoes: {
    title: "Automações",
    headline: "Automatize processos e organize a jornada dos seus clientes.",
    description:
      "Construa jornadas para WhatsApp, Instagram, Facebook e canal web próprio em um editor visual, com mensagens, condições de horário e encaminhamento para a fila responsável.",
    shot: shots.automacao,
    features: [
      ["Fluxos visuais", "Etapas conectadas tornam os caminhos de atendimento mais claros."],
      [
        "Condições e horários",
        "Defina caminhos conforme o horário comercial e as condições do fluxo.",
      ],
      [
        "Mensagens e encaminhamento",
        "Combine mensagens automatizadas e encaminhamento para as filas responsáveis pelo atendimento.",
      ],
    ],
    benefits: [
      "Critérios de encaminhamento organizados em um fluxo.",
      "Mensagens e horários alinhados à jornada de atendimento.",
      "Visibilidade das etapas para revisar o processo.",
    ],
    related: ["atendimento", "telefonia", "relatorios"],
  },
  relatorios: {
    title: "Relatórios",
    headline: "Informações para compreender sua operação e apoiar decisões.",
    description:
      "Explore capturas do consolidado de chat, das ligações de entrada e do mapa de calor, com os filtros e exportações apresentados pelo sistema.",
    shot: shots.relatorio,
    features: [
      [
        "Conversas e canais",
        "Consulte conversas iniciadas e finalizadas por período, empresa e canais.",
      ],
      [
        "Operação de voz",
        "Visualize o relatório de ligações de entrada, seus indicadores e opções de detalhamento.",
      ],
      [
        "Fluxos em perspectiva",
        "No mapa de calor, observe a passagem pelas etapas do fluxo no período selecionado.",
      ],
    ],
    benefits: [
      "Informações reunidas para contextualizar o atendimento.",
      "Filtros para delimitar o período e o escopo da análise.",
      "Exportações PDF e CSV nos relatórios que disponibilizam essas opções.",
    ],
    related: ["telefonia", "automacoes", "atendimento"],
  },
};

export const reports = [
  {
    id: "chat",
    title: "Consolidado de Chat",
    description:
      "Conversas iniciadas e finalizadas por período, empresa e canais, com movimento por dia e distribuição por canal.",
    points: [
      "Filtros por período e canal",
      "Conversas iniciadas e finalizadas",
      "Exportações em PDF e CSV",
    ],
    benefit: "Consulte o movimento do atendimento com o contexto do período analisado.",
    shot: shots.relatorio,
  },
  {
    id: "entrada",
    title: "Relatório de Voz",
    description:
      "Visão das ligações de entrada nas filas selecionadas e acesso ao detalhamento dos indicadores.",
    points: [
      "Recebidas, atendidas e não atendidas",
      "Transferências e tempos médios",
      "Exportação do resumo em PDF e CSV",
    ],
    benefit: "Observe os resultados de atendimento das ligações de entrada.",
    shot: shots.entrada,
  },
  {
    id: "calor",
    title: "Mapa de Calor",
    description:
      "Uma leitura visual da passagem pelas etapas de um fluxo de automação, com filtros de período e canal.",
    points: ["Seleção de automação", "Período e canal", "Intensidade de passagem por etapa"],
    benefit: "Identifique os caminhos percorridos no fluxo durante o intervalo selecionado.",
    shot: shots.calor,
  },
  {
    id: "saida",
    title: "Saída de Ligações",
    description:
      "Acompanhe as chamadas originadas pelos ramais e a distribuição dos resultados das ligações.",
    points: [
      "Realizadas, atendidas e não atendidas",
      "Chamadas transferidas",
      "Tempo total e tempo médio de atendimento",
    ],
    benefit: "Consulte os indicadores e os resultados das chamadas de saída.",
    shot: shots.saida,
  },
  ...[
    ["atividades", "Atividades dos Atendentes"],
    ["buscar", "Buscar"],
    ["etiquetas", "Etiquetas"],
    ["pesquisas", "Pesquisas"],
  ].map(([id, title]) => ({
    id,
    title,
    description:
      "O detalhamento deste recurso depende de validação e de material oficial. Solicite uma apresentação para confirmar a disponibilidade e as informações contempladas.",
    pending: true,
  })),
];
