import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_PASSWORD = "esse2024";

export function checkPassword(input: string) {
  const a = createHash("sha256").update(input ?? "").digest();
  const b = createHash("sha256").update(ADMIN_PASSWORD).digest();
  if (!timingSafeEqual(a, b)) throw new Error("Senha inválida");
}

const CANDIDATES = ["pedidos", "solicitacoes", "orders", "fmz"];

export async function detectTable() {
  const { supabase } = await import("./supabase");
  for (const t of CANDIDATES) {
    const { error } = await supabase.from(t).select("*").limit(1);
    if (!error) return t;
  }
  return "pedidos";
}
