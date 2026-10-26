/**
 * LOGIN DO PAINEL /admin
 * - Com banco: login por e-mail e senha (Supabase Auth). Só entra quem estiver na tabela
 *   public.admin_emails (conferido no banco pela função public.is_admin()).
 * - Sem banco: o painel abre em "modo local" (as alterações ficam só no navegador).
 */
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, hasBackend } from "@/lib/backend";

export async function signIn(email: string, password: string) {
  if (!hasBackend) throw new Error("Banco de dados não configurado.");
  const { error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
  if (error) {
    if (/invalid login/i.test(error.message)) throw new Error("E-mail ou senha incorretos.");
    if (/email not confirmed/i.test(error.message)) throw new Error("Confirme o seu e-mail antes de entrar.");
    throw error;
  }
}

export async function sendPasswordReset(email: string) {
  if (!hasBackend) throw new Error("Banco de dados não configurado.");
  const { error } = await supabase!.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/admin`,
  });
  if (error) throw error;
}

export async function signOut() {
  if (!hasBackend) return;
  await supabase!.auth.signOut();
}

export async function checkIsAdmin(): Promise<boolean> {
  if (!hasBackend) return true;
  const { data, error } = await supabase!.rpc("is_admin");
  if (error) {
    console.warn("[admin] não foi possível verificar permissão:", error.message);
    return false;
  }
  return Boolean(data);
}

type AdminState =
  | { status: "loading" }
  | { status: "local" }
  | { status: "signed-out" }
  | { status: "forbidden"; email: string }
  | { status: "admin"; session: Session };

/** Hook do estado de login do painel */
export function useAdminSession(): AdminState {
  const [state, setState] = useState<AdminState>(
    hasBackend ? { status: "loading" } : { status: "local" },
  );

  useEffect(() => {
    if (!hasBackend) return;
    let alive = true;

    const evaluate = async (session: Session | null) => {
      if (!session) {
        if (alive) setState({ status: "signed-out" });
        return;
      }
      const ok = await checkIsAdmin();
      if (!alive) return;
      setState(ok ? { status: "admin", session } : { status: "forbidden", email: session.user.email ?? "" });
    };

    supabase!.auth.getSession().then(({ data }) => evaluate(data.session));
    const { data: sub } = supabase!.auth.onAuthStateChange((_event, session) => {
      // adia a verificação para fora do callback (recomendação do Supabase)
      setTimeout(() => evaluate(session), 0);
    });
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
