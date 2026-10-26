/**
 * CONEXÃO COM O BANCO (Lovable Cloud / Supabase)
 *
 * - Se as variáveis de ambiente do Supabase existirem, o site usa o banco de verdade:
 *   artigos, mensagens do formulário, login do painel e upload de imagens.
 * - Se NÃO existirem, o site funciona em "modo local": mostra os artigos iniciais
 *   (src/content/artigos-seed.ts) e o painel salva só no navegador de quem está editando.
 *
 * Quando o Lovable Cloud for ativado, ele cria o arquivo src/integrations/supabase/client.ts.
 * Nesse caso, substitua o conteúdo deste arquivo por:
 *
 *   import { supabase as cloud } from "@/integrations/supabase/client";
 *   export const supabase = cloud;
 *   export const hasBackend = true;
 *
 * (Veja LOVABLE.md, seção "Ativar o banco de dados".)
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true, storage: window.localStorage },
      })
    : null;

export const hasBackend = Boolean(supabase);

/** Nome do "bucket" de imagens dos artigos no Storage */
export const ARTICLE_IMAGES_BUCKET = "artigos";
