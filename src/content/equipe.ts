/**
 * EQUIPE — "Nosso time de Especialistas" (Home) e páginas /team/:slug
 * Mesmos nomes, cargos, OAB, Instagram, habilidades (barras de %) e minibiografias do site original.
 * Fotos em /public/images/equipe/<slug>.webp (proporção 1230x1500, ou seja, 4:5 aprox.)
 */

export type Skill = { label: string; value: number };

export type Lawyer = {
  slug: string;
  name: string;
  role: string; // "Advogado" | "Advogada"
  oab: string;
  instagram: string;
  photo: string;
  skills: Skill[];
  bio: string[];
};

export const TEAM: Lawyer[] = [
  {
    slug: "henrik-lopes",
    name: "Henrik Lopes",
    role: "Advogado",
    oab: "OAB/RO 7795",
    instagram: "https://www.instagram.com/henrikflopes/",
    photo: "/images/equipe/henrik-lopes.webp",
    skills: [
      { label: "Licitações e Contratos", value: 92 },
      { label: "Advocacia Pública", value: 90 },
      { label: "Construção de Projetos", value: 88 },
    ],
    bio: [
      "Advogado, Sócio e co-fundador da LBA ASSESSORIA JURÍDICA, Pós graduado em Gestão Pública, Licitações e contratos. Atuou por mais de 8 anos na advocacia pública a frente a importantes projetos de aquisição e implementação de serviços públicos.",
      "Atualmente representa a iniciativa privada na construção de projetos e soluções para os desafios da Administração pública na execução de suas políticas públicas.",
    ],
  },
  {
    slug: "rafael-batista",
    name: "Rafael Batista",
    role: "Advogado",
    oab: "OAB/RO 8472",
    instagram: "https://www.instagram.com/rafaelbatista.adv/",
    photo: "/images/equipe/rafael-batista.webp",
    skills: [
      { label: "Agronegócio", value: 80 },
      { label: "Ambiental", value: 90 },
      { label: "Relações Governamentais", value: 88 },
    ],
    bio: [
      "Possuo graduação em Direito pelo Centro Universitário Luterano de Ji-Paraná (CEULJI/ULBRA) e pós-graduação em Metodologia e Didática do Ensino Superior pelas Faculdades Integradas Aparício Carvalho (FIMCA).",
      "Além disso, participei de diversos cursos e capacitações relevantes, conforme listado na Formação Complementar abaixo. Desde 2017, atuo como advogado, acumulando ampla experiência em assessoria jurídica.",
      "Minha trajetória inclui atuação como Assessor Jurídico Legislativo na Câmara Municipal de Jaru em 2021, onde desenvolvi habilidades em consultoria legislativa e orientação jurídica.",
      "Em 2023, exerci o cargo de Chefe de Gabinete Parlamentar, aprimorando competências em gestão, liderança e compreensão das dinâmicas do poder legislativo.",
      "Atualmente, dedico-me exclusivamente à advocacia, com foco em direito privado (direito agrário, ambiental e cível) e direito público, acumulando mais de sete anos de experiência.",
      "Meu trabalho abrange regularização fundiária rural, defesas ambientais, contratos, responsabilidade civil, direitos reais (como usucapião), além de licitações e contratações públicas.",
    ],
  },
  {
    slug: "thais-antunes",
    name: "Thaís Antunes",
    role: "Advogada",
    oab: "OAB/RO 10.478",
    instagram: "https://www.instagram.com/thaiseler/",
    photo: "/images/equipe/thais-antunes.webp",
    skills: [
      { label: "Controladoria Jurídica", value: 95 },
      { label: "Especialista em Gestão Pública", value: 90 },
      { label: "Licitação e Contratos", value: 92 },
    ],
    bio: [
      "Advogada, especialista em Gestão Pública, Controladoria, Licitações e Contratos, Com MBA Executivo em Direito: Gestão e Business Law pela FGV, com 7 anos de experiência em Administração Pública com foco em legística e licitação e contratos.",
      "Atuação direta com a implementação do compliance dos fornecedores para o setor público, exercendo função pública e privada.",
      "Soft Skills: transdisciplinaridade; planejamento; flexibilidade; controle emocional; solução de conflitos; interação com autoridade; resiliência; proatividade; empatia; e disciplina.",
      "Hard Skills: Controladoria jurídica; experiência em legística e mediação entre Gestores Público e fornecedores do setor público.",
    ],
  },
  {
    slug: "mikele-lopes",
    name: "Mikele Lopes",
    role: "Advogada",
    oab: "OAB/RO 12.087",
    instagram: "https://www.instagram.com/mikele_lopesm/",
    photo: "/images/equipe/mikele-lopes.webp",
    skills: [
      { label: "Processo Civil", value: 80 },
      { label: "Direito Ambiental", value: 90 },
      { label: "Direito do Agronegócio", value: 88 },
    ],
    bio: [
      "Advogada, pós-graduada em advocacia cível, graduanda em processo civil e direito ambiental com ênfase em agronegócio. Atuante em direito agrário, ambiental e civil.",
      "Com estudos em ações possessórias no agronegócio, regularização fundiária e ambiental de imóveis rurais, manual de crédito rural, prorrogações de dívidas rurais, contratos agrários, anulação de leilão de imóveis rurais, entre outras.",
      "Associada a academia brasileira de direito do agronegócio – ABRADA. Membra da comissão estadual de agronegócio OAB/RO.",
    ],
  },
];

export const getLawyer = (slug: string) => TEAM.find((l) => l.slug === slug);
