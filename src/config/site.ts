/**
 * DADOS GERAIS DO SITE — fonte única de verdade.
 * Para trocar telefone, e-mail, endereço, WhatsApp ou redes sociais, edite SÓ este arquivo.
 */

export const SITE = {
  name: "LBA Assessoria Jurídica",
  shortName: "LBA",
  legalName: "Lopes, Batista & Antunes",
  title: "LBA – Assessoria Jurídica – Advogados Especializados",
  tagline: "Advogados Especializados",
  url: "https://lbaassessoriajuridica.com.br",

  email: "contato@lbaassessoriajuridica.com.br",

  // Telefone principal (aparece no site inteiro)
  phone: { display: "(69) 99204-8517", tel: "+5569992048517" },

  // Telefone que aparecia só no painel lateral das páginas internas do site antigo.
  // CONFIRMAR com o escritório se ainda é usado. Para esconder, deixe null.
  phoneSecondary: { display: "(69) 99993-2904", tel: "+5569999932904" } as
    | { display: string; tel: string }
    | null,

  address: "Av. Tiradentes, 1107 – St. 2, Jaru – RO",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Tiradentes,+1107+-+Setor+2,+Jaru+-+RO",

  whatsapp: {
    number: "5569992048517",
    message: "Olá, gostaria de entrar em contato com a LBA Assessoria Jurídica.",
  },

  instagram: "https://www.instagram.com/lbaassessoriajuridica/",

  // Autor padrão exibido nos artigos
  defaultAuthor: "LBA Assessoria Jurídica",
} as const;

/** Link do WhatsApp com mensagem pronta */
export const whatsappLink = (message: string = SITE.whatsapp.message) =>
  `https://api.whatsapp.com/send?phone=${SITE.whatsapp.number}&text=${encodeURIComponent(message)}`;

/** Menu principal (mesma ordem e nomes do site original) */
export const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Quem Somos", href: "/#QuemSomos" },
  { label: "Serviços", href: "/#Servicos" },
  { label: "Artigos", href: "/artigos" },
  { label: "Contato", href: "/#Contato" },
] as const;

/** Imagens do site (todas em /public/images). Veja docs/06-imagens.md */
export const IMAGES = {
  logoWhite: "/images/logo/logo-branco.png",
  logoColor: "/images/logo/logo-cor.png",
  logoInverse: "/images/logo/logo-inverse.png",
  heroSlides: ["/images/hero/slide-1.webp", "/images/hero/slide-2.webp", "/images/hero/slide-3.webp"],
  servicesBg: "/images/fundos/servicos.webp",
  ctaBg: "/images/fundos/cta.webp",
  footerBg: "/images/fundos/rodape.webp",
  pageBanner: "/images/fundos/banner-paginas.jpg",
} as const;
