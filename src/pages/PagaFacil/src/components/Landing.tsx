const PASSOS = [
  { t: "Envie", d: "Escolha o serviço e envie os dados ou o documento." },
  { t: "Confirme", d: "Veja o valor oficial, a taxa de 10% e o total." },
  { t: "Pague", d: "Pague por M-Pesa, e-Mola ou mKesh." },
  { t: "Nós facilitamos", d: "Tratamos do pagamento junto da entidade." },
  { t: "Receba", d: "Receba o comprovativo e o estado do pedido." },
];

export const CATS = [
  { nome: "Fiscal & Tributário", icon: "🧾", d: "IVA, IRPS, IRPC, NUIT" },
  { nome: "Multas", icon: "🚦", d: "Trânsito e municipais" },
  { nome: "Inspeções", icon: "🔍", d: "Viaturas e estabelecimentos" },
  { nome: "Licenças & Certificações", icon: "📜", d: "Alvarás, cartas, certidões" },
  { nome: "Taxas & Serviços Públicos", icon: "🏛️", d: "Água, energia, taxas" },
  { nome: "Educação & Escolas", icon: "🎓", d: "Propinas, matrículas, exames", popular: true },
  { nome: "Serviços Empresariais", icon: "💼", d: "INSS, registos, obrigações" },
  { nome: "Outro Serviço", icon: "✨", d: "Diga-nos o que precisa" },
];

type Props = { onStart: () => void; onCategoria: (c: string) => void; onConsultar: () => void };

export function Landing({ onStart, onCategoria, onConsultar }: Props) {
  return (
    <div className="text-foreground">
      <section className="mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-primary">Plataforma privada • Não é entidade pública</span>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">Você envia.<br /><span className="text-primary">Nós facilitamos.</span></h1>
          <p className="max-w-lg text-lg text-muted-foreground">Facilitamos pagamentos, obrigações, documentos, inspeções, licenças e outros serviços administrativos, ajudando cidadãos e empresas a reduzir deslocações e burocracia.</p>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onStart} className="rounded-xl bg-foreground px-6 py-3.5 font-bold text-background">Solicitar serviço →</button>
            <button onClick={onConsultar} className="rounded-xl border border-border bg-card px-6 py-3.5 font-bold">Consultar pedido</button>
            <button onClick={onStart} className="px-2 font-bold text-primary">Entrar →</button>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["A", "B", "C"].map((l) => <span key={l} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-xs font-bold text-primary-foreground">{l}</span>)}
            </div>
            <span><b className="text-foreground">+2.340</b> pedidos facilitados (demo) • M-Pesa • e-Mola • mKesh</span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm font-bold">FMZ-2026-001024</span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">Em processamento</span>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {[["Serviço", "IVA - 03/2026"], ["Entidade", "AT"], ["Valor", "12.500 MT"], ["Taxa facilitação", "400 MT"]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-bold">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Pedido recebido", "Em análise", "Pagamento confirmado"].map((b) => <span key={b} className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-primary">✓ {b}</span>)}
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-muted p-3 text-xs text-muted-foreground">📄 Documento extraído com IA — valores confirmados</div>
        </div>
      </section>

      <section id="como-funciona" className="bg-muted/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold">Como funciona?</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PASSOS.map((p, i) => (
              <div key={p.t} className="rounded-2xl border border-border bg-card p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-extrabold text-primary-foreground">{i + 1}</span>
                <h3 className="mt-3 font-bold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold">Categorias de serviço</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATS.map((c) => (
              <button key={c.nome} onClick={() => onCategoria(c.nome)}
                className={`relative rounded-2xl border bg-card p-5 text-left hover:shadow-lg ${c.popular ? "border-info" : "border-border hover:border-primary"}`}>
                {c.popular && <span className="absolute right-3 top-3 rounded-full bg-info px-2 py-0.5 text-[10px] font-extrabold text-info-foreground">POPULAR</span>}
                <span className="text-3xl">{c.icon}</span>
                <h3 className="mt-3 font-bold">{c.nome}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-extrabold">Plataforma privada</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• O PagaFácil MZ é uma empresa privada e não é uma entidade pública nem representa o Governo.</li>
            <li>• Os valores oficiais são cobrados pelas respetivas entidades; cobramos apenas uma taxa de facilitação de 10%.</li>
            <li>• Os seus dados são usados apenas para tratar o seu pedido.</li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:justify-between">
          <span>© 2026 PagaFácil MZ — Facilita Moçambique</span>
          <div className="flex flex-wrap gap-4">
            <a href="#">Política de Privacidade</a><a href="#">Termos de Uso</a><a href="#">Reembolsos</a><a href="#">Contacto</a><a href="/admin" className="opacity-20 hover:opacity-60" aria-label="Admin">·</a>
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-6xl px-4 text-xs text-muted-foreground">Aviso: os textos legais são provisórios e devem ser revistos juridicamente.</p>
      </footer>
    </div>
  );
}
