import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const WA = "258823832513";
const WA_GREEN = "#25D366";
const NAVY = "#0E3A5D";

type Msg = { from: "user" | "bot"; text: string };

const QUICK: { q: string; a: string }[] = [
  {
    q: "Quais serviços atendem?",
    a: "Atendemos Fiscal (IVA, IRPS), Multas, Inspeções, Licenças, Taxas municipais e Educação (propinas). Taxa fixa 10% do valor.",
  },
  {
    q: "Taxa é 10% mesmo?",
    a: "Sim, nossa facilitação é 10%. Ex: conta 550 MT = 55 MT taxa. Total 605 MT. Você paga M-Pesa/e-Mola e nós resolvemos.",
  },
  { q: "Consultar meu pedido", a: "Digite seu código FMZ-XXXX ou vá em Consultar pedido no menu" },
];

function waText() {
  const p = (window as unknown as { __pfPedido?: { id: string; servico: string; valor: string | number } }).__pfPedido;
  if (p) return `Olá PagaFácil! Dúvida sobre pedido ${p.id} - serviço ${p.servico} - valor ${p.valor}MT`;
  return "Olá PagaFácil MZ! Vim do site e preciso de ajuda com um pagamento.";
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.3 11.3 0 0 0 5.77 1.47c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.04" />
    </svg>
  );
}

export function SupportWidgets() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Olá! 👋 Como podemos ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, open]);

  const reply = (q: string, a: string) =>
    setMsgs((m) => [...m, { from: "user", text: q }, { from: "bot", text: a }]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const phone = text.replace(/\D/g, "").match(/(258)?8[2-7]\d{7}/)?.[0];
    let a = "Obrigado! Deixe o seu número de telefone e entraremos em contacto, ou fale no WhatsApp 82 383 2513.";
    if (/FMZ-/i.test(text)) a = "Recebemos o código. Vá em Consultar pedido no menu ou fale connosco no WhatsApp para o estado atualizado.";
    if (phone) {
      a = "Obrigado! Guardámos o seu contacto, a nossa equipa vai ligar ou escrever em breve.";
      const { error } = await supabase
        .from("mensagens")
        .insert({ nome: null, telefone: phone, mensagem: text, resposta: a, origem: "site_chat" });
      if (error) console.error("mensagens insert:", error.message);
    }
    reply(text, a);
  };

  return (
    <>
      <style>{`@keyframes pfpulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.6)}70%{box-shadow:0 0 0 16px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}`}</style>

      <button
        type="button"
        title="Fale no WhatsApp"
        aria-label="Fale no WhatsApp"
        onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(waText())}`, "_blank")}
        className="group fixed bottom-5 left-5 flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-lg"
        style={{ background: WA_GREEN, zIndex: 9999, animation: "pfpulse 2s infinite" }}
      >
        <WaIcon />
        <span className="pointer-events-none absolute left-[70px] whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">
          Fale no WhatsApp
        </span>
      </button>

      <button
        type="button"
        aria-label="Abrir chat de suporte"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 flex h-[60px] w-[60px] items-center justify-center rounded-full shadow-lg"
        style={{ background: NAVY, zIndex: 9999, color: "#fff" }}
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div
          className="fixed bottom-[92px] right-5 flex flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
          style={{ zIndex: 9999, width: "min(360px, calc(100vw - 40px))", height: "min(480px, calc(100vh - 120px))" }}
        >
          <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ background: NAVY, color: "#fff" }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: WA_GREEN }} />
            Suporte PagaFácil MZ - Online
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 ${m.from === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-1.5 border-t px-3 pt-2">
            {QUICK.map((x) => (
              <button
                key={x.q}
                type="button"
                onClick={() => reply(x.q, x.a)}
                className="rounded-full border px-2.5 py-1 text-xs hover:bg-muted"
              >
                {x.q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex gap-2 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva a sua mensagem ou telefone…"
              className="flex-1 rounded-full border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" aria-label="Enviar" className="rounded-full p-2" style={{ background: NAVY, color: "#fff" }}>
              <Send className="h-4 w-4" />
            </button>
          </form>
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noreferrer"
            className="border-t py-2 text-center text-xs text-muted-foreground hover:underline"
          >
            Ou fale direto no WhatsApp 82 383 2513
          </a>
        </div>
      )}
    </>
  );
}
