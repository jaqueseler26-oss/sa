import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { sendPasswordReset, signIn } from "@/lib/auth";

/** Tela de login do painel (e-mail + senha do Lovable Cloud / Supabase Auth) */
export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    setError("");
    setInfo("");
    if (!email.trim()) {
      setError("Digite o seu e-mail para receber o link de nova senha.");
      return;
    }
    try {
      await sendPasswordReset(email);
      setInfo("Enviamos um link para criar uma nova senha. Confira o seu e-mail.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar o e-mail.");
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-[420px] rounded-xl border border-[#e3e8ee] bg-white p-8 shadow-sm">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3f8] text-lba-link">
        <Lock size={20} />
      </div>
      <h1 className="font-serif text-[30px] normal-case leading-tight text-lba-navy">Entrar no painel</h1>
      <p className="mt-1 text-[#5b6478]">Use o e-mail e a senha de administrador do site.</p>

      <form onSubmit={onSubmit} className="mt-7 grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-[13px] font-semibold text-[#3d4660]">E-mail</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-md border border-[#d5dce5] px-3 outline-none transition focus:border-lba-link focus:ring-2 focus:ring-lba-link/15"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[13px] font-semibold text-[#3d4660]">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-md border border-[#d5dce5] px-3 outline-none transition focus:border-lba-link focus:ring-2 focus:ring-lba-link/15"
          />
        </label>

        {error && <p className="rounded-md bg-[#fdf0f0] px-3 py-2 text-[13.5px] text-[#b42318]">{error}</p>}
        {info && <p className="rounded-md bg-[#eefaf0] px-3 py-2 text-[13.5px] text-[#1f7a3a]">{info}</p>}

        <button type="submit" className="lba-btn mt-2 w-full" disabled={loading}>
          {loading && <Loader2 size={15} className="animate-spin" />} Entrar
        </button>
        <button type="button" onClick={onReset} className="text-[13px] font-semibold text-lba-link hover:underline">
          Esqueci a senha
        </button>
      </form>
    </div>
  );
}
