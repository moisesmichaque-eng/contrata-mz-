import { useState } from "react";
import { supabase } from "./lib/supabase";

type Pedido = {
  id: string;
  nome: string | null;
  telefone: string | null;
  tipo_servico: string | null;
  valor_oficial: number | null;
  taxa_servico: number | null;
  valor_total: number | null;
  ficheiro_url: string | null;
  status: string | null;
  created_at?: string;
};

const USER = "admin";
const PASS = "facil123";
const mt = (v: number | null) => `${(Number(v) || 0).toLocaleString("pt-PT", { maximumFractionDigits: 2 })} MT`;

export default function AdminPedidos() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [ok, setOk] = useState(false);
  const [bad, setBad] = useState(false);
  const [rows, setRows] = useState<Pedido[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("pedidos").select("*").order("created_at", { ascending: false });
    setRows((data as Pedido[]) ?? []);
    setErr(error?.message ?? null);
    setLoading(false);
  };

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === USER && p === PASS) { setOk(true); void load(); } else setBad(true);
  };

  const concluir = async (id: string) => {
    const { error } = await supabase.from("pedidos").update({ status: "Concluido" }).eq("id", id);
    if (error) return alert("Erro: " + error.message);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: "Concluido" } : x)));
  };

  const box: React.CSSProperties = { background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: 16 };
  const inp: React.CSSProperties = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 10, fontSize: 14 };

  if (!ok)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", fontFamily: "Arial, sans-serif", padding: 16 }}>
        <form onSubmit={entrar} style={{ ...box, width: "100%", maxWidth: 340 }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, marginTop: 0 }}>Admin — Pedidos</h1>
          <input style={inp} placeholder="Utilizador" value={u} onChange={(e) => { setU(e.target.value); setBad(false); }} />
          <input style={inp} type="password" placeholder="Senha" value={p} onChange={(e) => { setP(e.target.value); setBad(false); }} />
          {bad && <p style={{ color: "#dc2626", fontSize: 13 }}>Utilizador ou senha incorretos</p>}
          <button style={{ width: "100%", padding: 11, borderRadius: 8, border: "none", background: "#10b981", color: "white", fontWeight: 800, cursor: "pointer" }}>Entrar</button>
        </form>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Arial, sans-serif", padding: 16 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Pedidos ({rows.length})</h1>
          <button onClick={load} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #10b981", background: "white", color: "#10b981", fontWeight: 700, cursor: "pointer" }}>Atualizar</button>
        </div>
        {err && <p style={{ background: "#fee2e2", color: "#b91c1c", padding: 10, borderRadius: 8 }}>Erro ao carregar: {err}</p>}
        {loading && <p>A carregar…</p>}
        {!loading && !rows.length && !err && <p style={{ color: "#64748b" }}>Nenhum pedido encontrado.</p>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
          {rows.map((r) => {
            const done = /conclu/i.test(r.status ?? "");
            return (
              <div key={r.id} style={box}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <b style={{ fontSize: 15 }}>{r.nome || "—"}</b>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: done ? "#dcfce7" : "#fef3c7", color: done ? "#15803d" : "#92400e", whiteSpace: "nowrap" }}>{r.status || "Pendente"}</span>
                </div>
                <div style={{ fontSize: 13, color: "#475569", margin: "6px 0 10px" }}>
                  <div>📞 {r.telefone || "—"}</div>
                  <div>🗂 {r.tipo_servico || "—"}</div>
                </div>
                <div style={{ fontSize: 13, background: "#f0fdfa", borderRadius: 8, padding: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Valor oficial</span><span>{mt(r.valor_oficial)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span>Taxa serviço</span><span>{mt(r.taxa_servico)}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}><span>Total</span><span>{mt(r.valor_total)}</span></div>
                </div>
                <div style={{ fontSize: 13, marginTop: 8 }}>
                  {r.ficheiro_url ? <a href={r.ficheiro_url} target="_blank" rel="noreferrer" style={{ color: "#10b981", fontWeight: 700 }}>Ver ficheiro</a> : <span style={{ color: "#94a3b8" }}>Sem ficheiro</span>}
                </div>
                <button disabled={done} onClick={() => concluir(r.id)} style={{ marginTop: 10, width: "100%", padding: 9, borderRadius: 8, border: "none", background: done ? "#e2e8f0" : "#0f172a", color: done ? "#64748b" : "white", fontWeight: 700, cursor: done ? "default" : "pointer" }}>
                  {done ? "Concluido" : "Marcar como Concluido"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
