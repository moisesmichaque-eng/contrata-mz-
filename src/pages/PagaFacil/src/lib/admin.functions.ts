import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkPassword, detectTable } from "./admin.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string() }).parse(d))
  .handler(async ({ data }) => {
    try {
      checkPassword(data.password);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });

export const adminListPedidos = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string() }).parse(d))
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabase } = await import("./supabase");
    const table = await detectTable();
    const { data: rows, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    return { table, rowsJson: JSON.stringify(rows ?? []), error: error?.message ?? null };
  });

export const adminUpdateStatus = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ password: z.string(), id: z.string(), status: z.string().max(50) }).parse(d),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { supabase } = await import("./supabase");
    const table = await detectTable();
    const { error } = await supabase.from(table).update({ status: data.status }).eq("id", data.id);
    return { error: error?.message ?? null };
  });

export const adminAnalisarComprovativo = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        password: z.string(),
        image: z.string().startsWith("data:image/").max(8_000_000),
        esperado: z.number(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    checkPassword(data.password);
    const { extrairComprovativo, divergencias } = await import("./comprovativo.server");
    try {
      const ext = await extrairComprovativo(data.image);
      return { ok: true as const, ext, divergencias: divergencias(ext, data.esperado) };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro";
      return { ok: false as const, error: /402|credit/i.test(msg) ? "Sem créditos de IA disponíveis." : msg };
    }
  });
