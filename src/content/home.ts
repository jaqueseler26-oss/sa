/**
 * TEXTOS DA PÁGINA INICIAL — iguais ao site original.
 * Para mudar um texto da Home, edite aqui (não precisa mexer nos componentes).
 */
import { IMAGES } from "@/config/site";

export type HeroSlide = {
  image: string;
  /** Texto do "selo" (botão creme com ponta inclinada). smallLine = linha pequena de cima. */
  badge: { smallLine?: string; mainLine?: string };
  /** Duas linhas em letras maiúsculas à direita do selo */
  lines: [string, string];
  /** Paleta do selo: "olive" (dourado) ou "royal" (azul) — igual ao original */
  tone: "olive" | "royal";
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: IMAGES.heroSlides[0],
    badge: { smallLine: "nosso diferencial", mainLine: "está nos detalhes" },
    lines: ["Não aceite menos que", "alta qualidade e transparência"],
    tone: "olive",
  },
  {
    image: IMAGES.heroSlides[1],
    badge: { mainLine: "Lopes, Batista\n& Antunes" },
    lines: ["Focada em potencializar as empresas", "que atuam com o setor público"],
    tone: "royal",
  },
  {
    image: IMAGES.heroSlides[2],
    badge: { smallLine: "LBA assessoria jurídica" },
    lines: ["Pautada no compromisso com", "a integridade e ética profissional"],
    tone: "olive",
  },
];

/** Tempo de cada slide (ms) e tempos das animações — iguais ao Slider Revolution original */
export const HERO_TIMING = {
  slideDuration: 9000,
  crossfade: 1000,
  line1Delay: 1370,
  line2Delay: 1600,
  badgeDelay: 2190,
  layerDuration: 1000,
};

export const TEAM_INTRO = {
  subtitle: "Nosso time de",
  title: "Especialistas",
  text: "Assessoria jurídica estratégica com soluções eficazes que garantem a satisfação dos nossos clientes.",
  button: "Entre em contato",
};

export type Service = {
  icon: "bank" | "deal" | "feather";
  title: string;
  description: string;
  href: string;
};

export const SERVICES_INTRO = {
  subtitle: "Um pouco dos",
  title: "Nossos serviços",
  text: "Converse agora mesmo com a nossa equipe de especialistas.",
};

export const SERVICES: Service[] = [
  {
    icon: "bank",
    title: "Licitações",
    description:
      "Especialistas em licitações, garantimos conformidade e estratégia para o sucesso em todas as etapas",
    href: "/#Contato",
  },
  {
    icon: "deal",
    title: "Direito Agrário",
    description:
      "Regularização fundiária rural: segurança jurídica, valorização e crescimento sustentável para suas terras",
    href: "/#Contato",
  },
  {
    icon: "feather",
    title: "Direito Ambiental",
    description:
      "Para empresas e produtores rurais em esferas administrativas, civis e criminais, regularizando atividades e protegendo seu patrimônio",
    href: "/#Contato",
  },
];

export const CONTACT = {
  subtitle: "Contato",
  title: "Alguma dúvida? Fale conosco!",
  text: "Contamos com um atendimento ágil e humanizado com foco em soluções que atendem as particularidades de cada negócio.",
  form: {
    name: "Nome",
    email: "Endereço de Email",
    phone: "Telefone",
    subject: "Tema",
    message: "Como podemos te ajudar? Deixe sua dúvida que entramos em contato.",
    submit: "Enviar",
    consentPrefix: "Eu concordo com os termos da",
    consentLink: "política de privacidade",
  },
};

export const CTA = {
  title: "Descubra como maximizar suas chances de vencer licitações",
  button: "Fale conosco",
};

export const TESTIMONIALS_INTRO = {
  subtitle: "O que dizem os",
  title: "Nossos clientes",
};

export type Testimonial = { name: string; text: string; stars: number };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Vanessa Rodrigues",
    text: "Um escritório com profissionais capacitados, excelente atendimento e agilidade.",
    stars: 5,
  },
  {
    name: "Nadia Nubia Silva Batista Miranda",
    text: "Trata-se de um escritório de advocacia bastante promissor, com profissionais éticos, confiáveis e compromissados com o trabalho essencial à justiça, facilitadores ao cidadão que necessita de acesso direto ao poder judiciário para dirimir toda e qualquer situação. Super indico!",
    stars: 5,
  },
  {
    name: "Mauro Júnior Batista Cruz",
    text: "Excelentes profissionais! Muita responsabilidade e seriedade.",
    stars: 5,
  },
  {
    name: "Gustavo Lopes",
    text: "Ótimo atendimento e local bem preparado para receber os clientes.",
    stars: 5,
  },
  {
    name: "Ana Clara Nere",
    text: "Muito bom 👏🏻",
    stars: 5,
  },
];

export const FOOTER = {
  title: "Assessoria Jurídica personalizada | resultados excepcionais",
  addressLabel: "Endereço",
  contactLabel: "Contato",
  rights: "LBA Assessoria Jurídica. Todos os direitos reservados.",
};
