const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/**
 * Data no mesmo formato do site original: "abril 30, 2025"
 * (o site antigo exibia "artigos / abril 30, 2025" nas listas).
 */
export function formatDatePost(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${MESES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Data por extenso em português: "30 de abril de 2025" */
export function formatDateBR(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

/** Data + hora curta: "26/10/2026 15:40" (usado no painel) */
export function formatDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Converte ISO -> valor de <input type="date"> (YYYY-MM-DD) */
export function toDateInput(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

/** Converte <input type="date"> -> ISO ao meio-dia UTC (evita "pular" um dia por fuso horário) */
export function fromDateInput(value: string) {
  if (!value) return new Date().toISOString();
  return new Date(`${value}T12:00:00.000Z`).toISOString();
}

/** Tempo de leitura aproximado */
export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
