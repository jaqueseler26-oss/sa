import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

/**
 * Paleta e tipografia extraídas do site original (tema "Law Office" + Elementor).
 * Os mesmos valores existem como variáveis CSS em src/index.css (--lba-*).
 * Documentação completa: docs/02-design-system.md
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      // Breakpoints equivalentes aos do tema original
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        lba: {
          ink: "#242304", // títulos no esquema claro, botão "voltar ao topo"
          text: "#5a6a93", // texto padrão do corpo
          soft: "#8290c2", // parágrafo da seção equipe, subtítulo de serviços
          link: "#194768", // links, ícones de contato, botão "Enviar"
          "link-hover": "#253262",
          navy: "#0d1f59", // títulos em seções claras (Serviços, Clientes)
          "navy-2": "#2e4a74", // card "Licitações"
          "navy-3": "#09183e", // card "Direito Agrário"
          "navy-4": "#0b436f", // texto do card branco "Direito Ambiental"
          royal: "#102e88", // subtítulo "O que dizem os"
          "royal-2": "#6278c5", // parágrafo da seção Serviços
          indigo: "#2b396a", // subtítulo "Nosso time de"
          steel: "#597992", // cargo/OAB nos cards da equipe
          olive: "#88865a", // detalhe dourado (botão do slide, seta do banner)
          "olive-dark": "#5d5c39", // hover do botão do slide
          "olive-ink": "#41413f", // linha pequena do botão do slide
          cream: "#f1f5ed", // fundo do botão do slide e da seção "Nossos clientes"
          "cream-2": "#f2f2e2", // texto do botão do slide no hover
          sage: "#e5e9dd", // fundo do carrossel de depoimentos
          footer: "#242353", // fundo do rodapé
          slate: "#5a7888", // botão "Fale conosco"
          "slate-hover": "#2d4e7f",
          "footer-text": "#b4b6b9",
          "footer-copy": "#d2d3d5",
          "footer-link": "#e3eef2",
          "input-line": "#bdd1e6",
          "input-text": "#416195",
          "input-focus": "#35627c",
          "testi-text": "#0d2742",
          "cat-icon": "#2d4665", // ícones das páginas de artigos
          paper: "#f9f9f9", // fundo da seção Serviços
          "royal-btn": "#6277c1", // texto do botão do slide 2
          "royal-btn-hover": "#3c59c1",
          star: "#1d4fb8", // estrelas dos depoimentos
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', "Georgia", "serif"],
        sans: ["Lato", "Helvetica", "Arial", "sans-serif"],
        actor: ["Actor", "Lato", "sans-serif"],
        times: ['"Times New Roman"', "Times", "serif"],
      },
      maxWidth: {
        site: "1130px",
        "site-wide": "1320px",
      },
      transitionTimingFunction: {
        // equivalentes às curvas do GSAP usadas no Slider Revolution original
        "power2-out": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "power3-out": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "power1-in-out": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
        tilt: "cubic-bezier(.03,.98,.52,.99)",
        underline: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in .6s ease-out both",
        "fade-up": "fade-up .7s cubic-bezier(0.215, 0.61, 0.355, 1) both",
      },
    },
  },
  plugins: [typography, animate],
} satisfies Config;
