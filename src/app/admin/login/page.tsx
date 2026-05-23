"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase-client";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [website, setWebsite] = useState("");
  const [middleName, setMiddleName] = useState("");
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await sleep(random(800, 2000));

    setLoading(true);
    setErrorMsg("");

    if(website || middleName) return

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Login bem sucedido. Forçar recarregamento das rotas e ir para o painel
      router.refresh();
      router.push("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Erro desconhecido ao tentar fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden font-sans">
      {/* Brutalist Abstract Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[20rem] h-[20rem] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[15rem] h-[15rem] bg-secondary/10 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Decorative Branding */}
      <div className="mb-8 z-10 text-center">
        <h1 className="text-3xl font-display font-black tracking-tight text-foreground uppercase">
          DPD <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ADMIN</span>
        </h1>
        <p className="text-xs font-mono text-tertiary uppercase tracking-widest mt-2">
          Acesso Restrito ao Painel
        </p>
      </div>

      {/* Brutalist Login Card */}
      <div className="w-full max-w-md bg-foreground/[0.02] border-2 border-tertiary-dark/30 p-8 z-10 relative rounded-none hover:border-primary/40 transition-colors duration-500">
        {/* Glowing Top Border Line */}
        <div className="absolute -top-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary" />

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-xs font-mono uppercase tracking-wider">
              {errorMsg}
            </div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300 rounded-none"
              placeholder="admin@dançandopordentro.com"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-tertiary uppercase tracking-widest">
              Senha
            </label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-tertiary-dark/40 px-4 py-3 text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors duration-300 rounded-none"
              placeholder="••••••••"
            />
          </div>

          <div className="absolute left-[-9999px]">
            <input
              name="middleName"
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background font-bold tracking-widest uppercase py-4 border-2 border-foreground hover:bg-primary hover:border-primary hover:text-background transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-sm cursor-pointer mt-2"
          >
            {loading ? "Entrando..." : "Entrar →"}
          </button>
        </form>
      </div>

      {/* Decorative footer */}
      <div className="mt-8 z-10">
        <a
          href="/"
          className="text-xs font-mono text-tertiary hover:text-primary transition-colors uppercase tracking-widest"
        >
          ← Voltar ao Site
        </a>
      </div>
    </main>
  );
}
