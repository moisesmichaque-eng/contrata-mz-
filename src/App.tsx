import { useState, useMemo } from "react";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
type Lang = "pt" | "en";
const T = {
  pt: {
    encontrar: "ENCONTRAR", mercado: "Mercado", contratos: "CONTRATOS", biblioteca: "Biblioteca", meus: "MEUS CONTRATOS", gestao: "Gestao",
    modeloNegocio: "MODELO DE NEGOCIO - TRUST FIRST",
    modeloDesc: "Mercado digital mocambicano onde cada servico termina com contrato formal, seguro e enviado por WhatsApp.",
    modeloDetalhe: "Contratante paga 5% sobre valor. Ex: 20.000 MZN taxa 1.000 MZN. Plataforma gere notificacoes, pagamento e PDF com validade juridica.",
    estados: "ESTADOS", rascunho: "Rascunho", enviado: "Enviado", activo: "Activo", terminado: "Terminado",
    fluxo: "FLUXO", f1: "Encontrar ->", f2: "Negociar ->", f3: "Contrato ->", f4: "WhatsApp",
    filtros: "Filtros Inteligentes", categoria: "CATEGORIA", todas: "Todas", domestico: "Domestico", construcao: "Construcao", servicos: "Servicos", consultoria: "Consultoria", outros: "Outros",
    provincia: "PROVINCIA", avaliacao: "AVALIACAO", disponibilidade: "DISPONIBILIDADE", disponivel: "Disponivel", ocupado: "Ocupado",
    verPerfil: "Ver Perfil", contactar: "Contactar", verificado: "Verificado",
    bibliotecaTitulo: "Biblioteca 10+ MVP", contratoFormula: "CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS",
    dadosContratante: "1. DADOS DO CONTRATANTE (Empregador/Empresa)",
    dadosContratado: "2. DADOS DO CONTRATADO (Trabalhador/Empresa)",
    condicoes: "3. CONDICOES ESPECIFICAS",
    tarefas: "4. TAREFAS E RESPONSABILIDADES - Checklist",
    acrescentar: "Acrescentar tarefas / Descricao livre (para empresas ou servicos particulares)",
    formaPag: "Forma de pagamento - Taxa 5%",
    preview: "Preview Dinamico",
    gerar: "Pagar Contrato - Liberar PDF",
    voltar: "<- Voltar", novo: "Novo contrato", reiniciar: "Reiniciar sem refresh",
    nomeCompleto: "Nome completo / Empresa", bi: "Numero BI / NUIT", contacto: "Contacto", localBairro: "Local / Bairro", provinciaField: "Provincia",
    valorTotal: "Valor Total MZN", prazo: "Prazo dias", salario: "Salario mensal MT", descricaoLivre: "Descricao livre das actividades",
    pagarTitulo: "Pagamento da Taxa 5% - Plataforma",
    pagarSub: "Escolha a forma de pagamento. Valores vao direto para o dono da plataforma.",
    taxaInfo: "Taxa",
    pagarBtn: "Pagar Agora",
    aguardando: "Aguardando confirmacao...",
    pago: "Pagamento Confirmado - PDF Liberado"
  },
  en: {
    encontrar: "FIND", mercado: "Market", contratos: "CONTRACTS", biblioteca: "Library", meus: "MY CONTRACTS", gestao: "Management",
    modeloNegocio: "BUSINESS MODEL - TRUST FIRST",
    modeloDesc: "Mozambican digital market where each service ends with formal contract, secure and sent via WhatsApp.",
    modeloDetalhe: "Client pays 5% fee. Ex: 20,000 MZN fee 1,000 MZN.",
    estados: "STATUS", rascunho: "Draft", enviado: "Sent", activo: "Active", terminado: "Finished",
    fluxo: "FLOW", f1: "Find ->", f2: "Negotiate ->", f3: "Contract ->", f4: "WhatsApp",
    filtros: "Smart Filters", categoria: "CATEGORY", todas: "All", domestico: "Domestic", construcao: "Construction", servicos: "Services", consultoria: "Consulting", outros: "Others",
    provincia: "PROVINCE", avaliacao: "RATING", disponibilidade: "AVAILABILITY", disponivel: "Available", ocupado: "Busy",
    verPerfil: "View Profile", contactar: "Contact", verificado: "Verified",
    bibliotecaTitulo: "Library 10+ MVP", contratoFormula: "CONTRACT = MODEL + FIELDS + RULES + CLAUSES",
    dadosContratante: "1. CLIENT DATA", dadosContratado: "2. CONTRACTOR DATA",
    condicoes: "3. SPECIFIC CONDITIONS", tarefas: "4. TASKS AND RESPONSIBILITIES",
    acrescentar: "Add tasks / Free description", formaPag: "Payment - 5% Fee",
    preview: "Dynamic Preview", gerar: "Pay Contract - Unlock PDF", voltar: "<- Back", novo: "New contract", reiniciar: "Restart",
    nomeCompleto: "Full name / Company", bi: "ID Number / NUIT", contacto: "Contact", localBairro: "Location", provinciaField: "Province",
    valorTotal: "Total Value MZN", prazo: "Deadline days", salario: "Monthly salary MT", descricaoLivre: "Free description",
    pagarTitulo: "Pay 5% Platform Fee", pagarSub: "Choose payment method. Values go to platform owner.",
    taxaInfo: "Fee", pagarBtn: "Pay Now", aguardando: "Awaiting confirmation...", pago: "Payment Confirmed - PDF Unlocked"
  }
};
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";
const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa", "Lavar louca e organizar cozinha", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Organizar despensa e fazer compras", "Cozinhar refeicoes"], desc: "Domestico" },
  "Motorista Particular": { titulo: "CONTRATO - MOTORISTA PARTICULAR", checklist: ["Conduzir empregador e familia", "Manter viatura limpa e abastecida", "Verificar oleo, agua, pneus", "Fazer recados e compras"], desc: "Motorista" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos", "Reboco interior e exterior", "Assentar tijoleira e ceramica", "Fundacoes e vigas", "Acabamentos"], desc: "Pedreiro" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar e montar moveis em madeira", "Instalar portas", "Instalar janelas", "Instalar armarios", "Medir e cortar madeira", "Aplicar verniz e acabamento"], desc: "Portas, janelas, mobiliario madeira" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes", "Fabricar grades", "Soldar estruturas metalicas - maquina de soldar", "Instalar portoes", "Reparos em ferro"], desc: "Soldar, portoes" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico", "Instalar tomadas e interruptores", "Instalar iluminacao", "Passar cabos e fios", "Testar instalacao"], desc: "Instalacoes eletricas" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua", "Instalar esgotos", "Instalar sanita e lavatorio", "Reparar fugas"], desc: "Canalizacao" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede (lixar e massajar)", "Pintura interior", "Pintura exterior", "Aplicar textura", "Pintar teto"], desc: "Pintura" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial", "Servicos administrativos", "Servicos tecnicos", "Assessoria juridica/contabil", "Marketing e comunicacao", "Formacao e treinamento"], desc: "Empresas, consultoria" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Servico personalizado - descrever abaixo"], desc: "Formulario livre" },
};
// PAGAMENTOS INTERNOS - NUMEROS ESCONDIDOS, SO PARA DONO RECEBER - NAO VISIVEIS NO SITE PUBLICO
const PAGAMENTOS_OWNER = {
  mpesa: { numero: "840532899", nome: "M-Pesa", display: "M-Pesa", cor: "bg-[#e4002b]" },
  emola: { numero: "864341779", nome: "e-Mola", display: "e-Mola", cor: "bg-[#ff6b00]" },
  mkesh: { numero: "823832513", nome: "M-Kesh", display: "mKesh", cor: "bg-[#00a651]" },
  banco: { numero: "000301170814421100321", banco: "Standard Bank", nome: "Standard Bank", display: "Standard Bank", cor: "bg-[#0033a0]", nib: "000301170814421100321" }
};
const PROVINCIAS = ["Maputo Cidade", "Maputo - Matola", "Maputo - Machava", "Gaza - Xai-Xai", "Gaza - Chokwe", "Inhambane", "Sofala - Beira", "Nampula", "Tete"];
const PROFISSIONAIS = [
  { ini:"ML", nome:"Maria Langa", func:"Empregada Domestica", cat:"Domestico", local:"Maputo - Polana", nota:"4.9", trab:"23 trabalhos", anos:"8 anos", disp:"Disponivel", preco:"8.000 MZN" },
  { ini:"JM", nome:"Joao Manuel", func:"Carpinteiro", cat:"Construcao", local:"Matola - Machava", nota:"4.8", trab:"34 trabalhos", anos:"7 anos", disp:"Disponivel", preco:"Sob consulta" },
  { ini:"PM", nome:"Pedro Massingue", func:"Pedreiro", cat:"Construcao", local:"Maputo - Zimpeto", nota:"4.7", trab:"56 trabalhos", anos:"12 anos", disp:"Ocupado", preco:"1.200 MZN/dia" },
  { ini:"EC", nome:"Esperanca Cossa", func:"Eletricista", cat:"Construcao", local:"Maputo - Sommershield", nota:"4.9", trab:"41 trabalhos", anos:"6 anos", disp:"Disponivel", preco:"1.500 MZN/dia" },
  { ini:"SC", nome:"Servicos Lda", func:"Consultoria Empresarial", cat:"Servicos", local:"Maputo - Central", nota:"5.0", trab:"12 projetos", anos:"3 anos", disp:"Disponivel", preco:"15.000 MZN" },
  { ini:"CT", nome:"Carlos Tivane", func:"Motorista", cat:"Domestico", local:"Matola - Liberdade", nota:"4.8", trab:"29 trabalhos", anos:"7 anos", disp:"Disponivel", preco:"12.000 MZN" },
];
export default function App(){
  const [lang, setLang] = useState<Lang>("pt");
  const [tab, setTab] = useState<"encontrar"|"contratos"|"meus">("encontrar");
  const [tipo, setTipo] = useState<TipoContrato>("Carpinteiro");
  const [tarefasSel, setTarefasSel] = useState<string[]>(MODELOS["Carpinteiro"].checklist.slice(0,2));
  const [tarefasExtra, setTarefasExtra] = useState("Instalar 15 portas e janelas, Aplicar verniz e acabamento");
  const [descricaoLivre, setDescricaoLivre] = useState("");
  const [gerando, setGerando] = useState(false);
  const [gerado, setGerado] = useState(false);
  const [filtroCat, setFiltroCat] = useState("Todas");
  const [showPagamento, setShowPagamento] = useState(false);
  const [metodoPag, setMetodoPag] = useState<"mpesa"|"emola"|"mkesh"|"banco">("mpesa");
  const [pagamentoFeito, setPagamentoFeito] = useState(false);
  const [processandoPag, setProcessandoPag] = useState(false);
  const [telefonePag, setTelefonePag] = useState("");
  const [showPinPopup, setShowPinPopup] = useState(false);
  const L = T[lang]; const modelo = MODELOS[tipo];
  const [form, setForm] = useState({ empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", empregadorProvincia:"Maputo - Matola", trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"", salario:"15000", valorTotal:"45000", prazo:"25", localObra:"Matola, Machava", provincia:"Maputo - Matola", qtdPortas:"15", qtdJanelas:"0", material:"Madeira", quemFornece:"Contratado", metros:"120", formaPag:"mpesa", horaEntrada:"07:00", horaSaida:"16:00", dataInicio:new Date().toISOString().split("T")[0] });
  const taxa = useMemo(()=> Math.round(Number(form.valorTotal||form.salario||0)*0.05), [form.valorTotal, form.salario]);
  const todasTarefas = useMemo(()=>{ const extra=tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean); const livre=descricaoLivre? [descricaoLivre] : []; return [...tarefasSel,...extra,...livre]; },[tarefasSel,tarefasExtra,descricaoLivre]);
  const profissionaisFiltrados = useMemo(()=>{ if(filtroCat==="Todas") return PROFISSIONAIS; return PROFISSIONAIS.filter(p=>p.cat===filtroCat); },[filtroCat]);
  const resetAll=()=>{ setTarefasSel(modelo.checklist.slice(0,2)); setTarefasExtra(""); setDescricaoLivre(""); setGerado(false); setPagamentoFeito(false); setShowPagamento(false); window.scrollTo({top:0,behavior:"smooth"}); };
  const iniciarPagamento = () => {
    if(!form.empregadorNome || !form.trabalhadorNome){ alert(lang==="pt"?"Preencha nome do contratante e contratado":"Fill contractor names"); return; }
    setShowPagamento(true);
  };
  const processarPagamento = async () => {
    if((metodoPag==="mpesa"||metodoPag==="emola"||metodoPag==="mkesh") && !telefonePag){ alert(lang==="pt"?"Digite seu numero de celular":"Enter your phone number"); return; }
    setProcessandoPag(true);
    // Simula chamada API para operadora - numeros do owner ficam escondidos no backend
    // Aqui simula STK push: envia para 840532899 (mpesa) / 864341779 (emola) / 823832513 (mkesh)
    await new Promise(r=>setTimeout(r,1500));
    if(metodoPag!=="banco"){
      setShowPinPopup(true);
      setProcessandoPag(false);
      // Simula popup no celular - depois de 3s confirma
      setTimeout(()=>{
        setShowPinPopup(false);
        setPagamentoFeito(true);
        setProcessandoPag(false);
        setShowPagamento(false);
      }, 3000);
    } else {
      // Banco - mostra dados bancarios mas numero interno
      await new Promise(r=>setTimeout(r,1000));
      setPagamentoFeito(true);
      setProcessandoPag(false);
      setShowPagamento(false);
    }
  };
  const gerarPDF=async()=>{
    if(!pagamentoFeito){
      setShowPagamento(true);
      return;
    }
    setGerando(true);
    try{
      let jsPDF:any;
      try{ const m=await import("jspdf"); jsPDF=m.jsPDF||m.default; }catch{
        await new Promise<void>((res)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"; s.onload=()=>res(); document.head.appendChild(s); });
        jsPDF=(window as any).jspdf.jsPDF;
      }
      const doc=new jsPDF({unit:"mm",format:"a4"}); const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(), M=20, CW=W-M*2; let y=M;
      const check=(n=15)=>{ if(y+n>H-20){doc.addPage(); y=M;} };
      const add=(txt:string,fs=10,bold=false,ind=0)=>{ const cl=semAcento(txt); doc.setFontSize(fs); doc.setFont("helvetica",bold?"bold":"normal"); const ls=doc.splitTextToSize(cl,CW-ind); for(const l of ls){check(6); doc.text(l,M+ind,y); y+=5.5;} };
      doc.setFillColor(0,166,81); doc.rect(0,0,W,16,"F"); doc.setTextColor(255,255,255); doc.setFontSize(14); doc.setFont("helvetica","bold"); doc.text("CONTRATA.MZ",M,10);
      y=24; doc.setTextColor(30,30,30); add(`${modelo.titulo} - ${tipo.toUpperCase()}`,13,true); y+=2; doc.setDrawColor(0,166,81); doc.line(M,y,W-M,y); y+=6;
      add(`EMPREGADOR: ${form.empregadorNome}, BI ${form.empregadorBI}, Tel ${form.empregadorTel}`,10); y+=1;
      add(`TRABALHADOR: ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, Tel ${form.trabalhadorTel}, ${tipo}`,10); y+=5;
      add(`CONDICOES - Valor: ${form.valorTotal} MZN - Taxa Paga: ${taxa} MZN - Prazo: ${form.prazo} dias - Local: ${form.localObra} - ${form.provincia}`,10); y+=5;
      add(`TAREFAS (${todasTarefas.length}):`,11,true); y+=1; todasTarefas.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); }); y+=5;
      add(`PAGAMENTO TAXA 5% CONFIRMADO via ${PAGAMENTOS_OWNER[metodoPag].display} - ${new Date().toLocaleDateString()}`,9,true); y+=10;
      doc.save(`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-")}.pdf`); setGerado(true);
      return {blob:doc.output("blob"), fileName:`Contrato-${form.trabalhadorNome}.pdf`};
    } finally{ setGerando(false); }
  };
  const compartilhar=async()=>{
    if(!pagamentoFeito){ setShowPagamento(true); return; }
    const txt=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${form.trabalhadorNome} - ${form.valorTotal} MZN - TAXA PAGA`;
    try{ const {blob,fileName}=await gerarPDF() as any; const file=new File([blob],fileName,{type:"application/pdf"}); if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({title:fileName, text:txt, files:[file]} as any); return; } }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white border-b"><div className="mx-auto max-w-[1280px] px-4 h-[64px] flex items-center justify-between"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[15px]">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div><div className="flex p-1 bg-zinc-100 rounded-[10px]"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="pt"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="en"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>EN</button></div></div></header>
      <div className="mx-auto max-w-[1280px] px-4 pt-4"><div className="bg-[#1a1a1a] text-white rounded-[16px] p-4 flex flex-col md:flex-row justify-between gap-3"><div><div className="text-[11px] font-bold text-white/60">{L.modeloNegocio}</div><div className="text-[15px] font-semibold mt-1 max-w-[560px]">{L.modeloDesc}</div><div className="text-[12px] text-white/60 mt-1">{L.modeloDetalhe}</div></div><div className="flex gap-2"><div className="bg-white text-zinc-800 rounded-[12px] p-3 text-[11px] min-w-[120px]"><div className="font-bold text-[10px]">{L.estados}</div><div className="mt-1">{L.rascunho} | {L.enviado} | {L.activo} | {L.terminado}</div></div><div className="bg-[#00a651] text-white rounded-[12px] p-3 text-[11px] min-w-[110px]"><div className="font-bold text-[10px]">{L.fluxo}</div><div className="mt-1">{L.f1} {L.f2} {L.f3} {L.f4}</div></div></div></div><div className="mt-4 flex gap-2 p-1 bg-white border rounded-[14px] w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.encontrar} - {L.mercado}</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>{L.contratos} - {L.biblioteca}</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.meus} - {L.gestao}</button></div></div>
      <main className="mx-auto max-w-[1280px] px-4 py-6">
        {tab==="encontrar" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"><div className="bg-white border rounded-[16px] p-4 h-fit"><div className="font-semibold text-[13px]">{L.filtros}</div><div className="mt-4 flex flex-wrap gap-1.5">{[L.todas,"Domestico","Construcao","Servicos","Consultoria","Outros"].map(cat=>{const active=filtroCat===cat || (cat===L.todas && filtroCat==="Todas"); return <button key={cat} onClick={()=>setFiltroCat(cat===L.todas?"Todas":cat)} className={`px-3 py-1.5 rounded-full text-[11px] border ${active?"bg-[#00a651] text-white border-[#00a651]":"bg-white"}`}>{cat}</button>})}</div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{profissionaisFiltrados.map(p=>(<div key={p.nome} className="bg-white border rounded-[16px] p-4"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-[#00a651] text-white grid place-items-center font-bold">{p.ini}</div><div><div className="font-semibold text-[13px]">{p.nome}</div><div className="text-[11px] text-zinc-500">{p.func} - {p.local}</div><div className="text-[11px] mt-1">{p.nota} - {p.trab}</div></div></div><div className="mt-3 flex justify-between"><span className="px-2.5 py-1 rounded-full bg-emerald-50 border text-[11px]">{p.disp}</span><span className="text-[12px] font-semibold">{p.preco}</span></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-[36px] rounded-[10px] border text-[12px]">{L.verPerfil}</button><button onClick={()=>{setTab("contratos");}} className="h-[36px] rounded-[10px] bg-[#00a651] text-white text-[12px]">{L.contactar}</button></div></div>))}</div></div>)}
        {tab==="contratos" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4"><div className="bg-white border rounded-[16px] p-3 h-fit"><div className="font-semibold text-[13px]">{L.bibliotecaTitulo}</div><div className="mt-3 space-y-2">{(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const a=tipo===t; return <button key={t} onClick={()=>{setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,2)); setGerado(false); setPagamentoFeito(false);}} className={`w-full text-left p-3 rounded-[12px] border flex gap-2.5 ${a?"bg-emerald-50 border-emerald-300":"bg-white"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text-[11px] font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc}</div></div><div className={`w-4 h-4 rounded-full border grid place-items-center text-[10px] ${a?"bg-[#00a651] text-white":""}`}>{a?"v":""}</div></button>})}</div></div><div className="bg-white border rounded-[16px] p-5"><h3 className="font-bold text-[14px]">{modelo.titulo}</h3><div className="mt-5 space-y-4"><div className="bg-blue-50 border rounded-[12px] p-3"><div className="font-semibold text-[12px]">{L.dadosContratante}</div><div className="mt-2 grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto}</label><input value={form.empregadorNome} onChange={e=>setForm({...form, empregadorNome:e.target.value})} placeholder="Michaque Moises / Empresa XYZ" className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.bi}</label><input value={form.empregadorBI} onChange={e=>setForm({...form, empregadorBI:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.empregadorTel} onChange={e=>setForm({...form, empregadorTel:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.localBairro}</label><input value={form.empregadorBairro} onChange={e=>setForm({...form, empregadorBairro:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div></div></div><div className="bg-emerald-50 border rounded-[12px] p-3"><div className="font-semibold text-[12px]">{L.dadosContratado} - {tipo}</div><div className="mt-2 grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto}</label><input value={form.trabalhadorNome} onChange={e=>setForm({...form, trabalhadorNome:e.target.value})} placeholder="Zefanias / Construtora" className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.bi}</label><input value={form.trabalhadorBI} onChange={e=>setForm({...form, trabalhadorBI:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.trabalhadorTel} onChange={e=>setForm({...form, trabalhadorTel:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Funcao</label><input value={tipo} disabled className="mt-1 w-full h-[36px] px-3 rounded-[10px] border bg-zinc-100 text-[12px]" /></div></div></div><div className="bg-white border rounded-[12px] p-3"><div className="font-semibold text-[12px]">{L.condicoes} - {tipo}</div><div className="mt-3 grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold uppercase">{L.valorTotal}</label><input value={form.valorTotal} onChange={e=>setForm({...form, valorTotal:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div><div><label className="text-[10px] font-bold uppercase">{L.prazo}</label><input value={form.prazo} onChange={e=>setForm({...form, prazo:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div><div><label className="text-[10px] font-bold uppercase">{L.localBairro}</label><input value={form.localObra} onChange={e=>setForm({...form, localObra:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div><div><label className="text-[10px] font-bold uppercase">{L.provinciaField}</label><select value={form.provincia} onChange={e=>setForm({...form, provincia:e.target.value})} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div></div></div><div className="bg-white border rounded-[12px] p-3"><div className="font-semibold text-[12px]">{L.tarefas} - {tipo}</div><div className="mt-2 flex flex-wrap gap-1.5">{modelo.checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-1.5 rounded-full text-[11px] border ${ativo?"bg-[#00a651] text-white":"bg-white"}`}>{t}</button>})}</div><div className="mt-3"><label className="text-[10px] font-bold uppercase">{L.acrescentar}</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} className="mt-1 w-full min-h-[60px] p-3 rounded-[10px] border text-[12px]" /></div><div className="mt-3"><label className="text-[10px] font-bold uppercase">{L.descricaoLivre}</label><textarea value={descricaoLivre} onChange={e=>setDescricaoLivre(e.target.value)} placeholder="Escreva livremente para empresas ou servicos particulares" className="mt-1 w-full min-h-[90px] p-3 rounded-[10px] border-2 border-blue-200 bg-blue-50/30 text-[12px]" /></div></div>
                {/* PAGAMENTO E GERACAO */}
                {!pagamentoFeito ? (
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-[12px] p-4">
                    <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-amber-500 text-white grid place-items-center font-bold">!</div><div><div className="font-bold text-[13px]">PDF Bloqueado - Pague a Taxa 5%</div><div className="text-[11px] text-zinc-600">Valor do contrato: {form.valorTotal} MZN | {L.taxaInfo}: <b>{taxa} MZN</b> | So preview visivel, PDF so apos pagamento</div></div></div>
                    <button onClick={iniciarPagamento} className="mt-3 w-full h-[46px] rounded-[12px] bg-[#00a651] text-white font-bold text-[14px]">{L.gerar} - {taxa} MZN</button>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border-2 border-emerald-300 rounded-[12px] p-4">
                    <div className="font-bold text-[13px] text-emerald-800">{L.pago} - {PAGAMENTOS_OWNER[metodoPag].display}</div>
                    <div className="mt-3 grid grid-cols-2 gap-2"><button disabled={gerando} onClick={()=>gerarPDF()} className="h-[44px] rounded-[10px] bg-[#2563eb] text-white font-semibold text-[13px]">{gerando?"Gerando...":"Baixar PDF"}</button><button onClick={compartilhar} className="h-[44px] rounded-[10px] bg-[#00a651] text-white font-semibold text-[13px]">WhatsApp com PDF</button></div>
                  </div>
                )}
                {gerado && pagamentoFeito && (<div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3"><div className="text-[12px] font-semibold text-emerald-800">Contrato gerado com sucesso - Taxa paga</div><div className="mt-2 flex gap-2"><button onClick={resetAll} className="flex-1 h-[36px] rounded-[8px] bg-white border text-[11px]">{L.novo}</button><button onClick={resetAll} className="flex-1 h-[36px] rounded-[8px] bg-white border text-[11px]">{L.reiniciar}</button></div></div>)}
                </div></div>
            <div className="bg-white border rounded-[16px] p-4 h-fit sticky top-[100px]"><div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">{L.preview} - {tipo}</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${pagamentoFeito?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-amber-50 border-amber-200 text-amber-700"}`}>{pagamentoFeito?"LIBERADO":"PREVIEW - PDF BLOQUEADO"}</span></div><div className="mt-3 h-[600px] overflow-auto bg-[#f8fafc] border rounded-[10px] p-3 text-[10px] font-mono"><div className={`${!pagamentoFeito?"blur-[1.5px] select-none":""}`}>{modelo.titulo} - {tipo.toUpperCase()}<br/><br/>1. {form.empregadorNome} BI {form.empregadorBI}<br/><br/>2. {form.trabalhadorNome} BI {form.trabalhadorBI}<br/><br/>3. {form.valorTotal} MZN - {form.localObra} - Taxa {taxa} MZN PAGA via {PAGAMENTOS_OWNER[metodoPag].display}<br/><br/>4. TAREFAS ({todasTarefas.length})<br/>{todasTarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/></div>{!pagamentoFeito && (<div className="absolute inset-0 grid place-items-center"><div className="bg-white/90 border-2 border-amber-400 rounded-[12px] p-4 text-center shadow-lg"><div className="text-[12px] font-bold">PDF Bloqueado</div><div className="text-[10px] mt-1">Pague {taxa} MZN para liberar<br/>preview completo e download</div><button onClick={iniciarPagamento} className="mt-2 px-4 py-1.5 rounded-full bg-[#00a651] text-white text-[11px] font-bold">Pagar {taxa} MZN</button></div></div>)}</div><div className="mt-3"><div className="text-[10px] text-zinc-500">Contrato: {form.valorTotal} MZN | Taxa 5%: {taxa} MZN | Total pago ao dono da plataforma</div><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={iniciarPagamento} disabled={pagamentoFeito} className={`h-[38px] rounded-[10px] text-[12px] font-semibold ${pagamentoFeito?"bg-zinc-100 text-zinc-400":"bg-[#2563eb] text-white"}`}>{pagamentoFeito?"Pago":"Pagar Taxa"}</button><button onClick={()=>{if(!pagamentoFeito){setShowPagamento(true); return;} gerarPDF();}} className={`h-[38px] rounded-[10px] text-[12px] font-semibold ${pagamentoFeito?"bg-[#00a651] text-white":"bg-zinc-200 text-zinc-500"}`}>Ver PDF</button></div></div></div></div>)}
        {tab==="meus" && (<div className="bg-white border rounded-[16px] p-6"><div className="font-bold text-[16px]">{L.meus} - {L.gestao}</div><div className="mt-6 grid grid-cols-4 gap-3"><div className="bg-amber-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Rascunho (2)</div></div><div className="bg-blue-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Enviado (1)</div></div><div className="bg-emerald-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Activo (3)</div></div><div className="bg-zinc-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Terminado (5)</div></div></div></div>)}
      </main>
      {/* MODAL PAGAMENTO - ESCOLHA OPERADORA */}
      {showPagamento && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[420px] p-5 shadow-2xl">
            <div className="flex items-center justify-between"><div className="font-bold text-[15px]">{L.pagarTitulo}</div><button onClick={()=>setShowPagamento(false)} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">x</button></div>
            <div className="text-[11px] text-zinc-600 mt-1">{L.pagarSub} | Contrato {form.valorTotal} MZN - Taxa {taxa} MZN</div>
            <div className="mt-4 space-y-2">
              {(Object.keys(PAGAMENTOS_OWNER) as Array<keyof typeof PAGAMENTOS_OWNER>).map(key=>{
                const p = PAGAMENTOS_OWNER[key]; const active = metodoPag===key;
                return (
                  <button key={key} onClick={()=>setMetodoPag(key)} className={`w-full text-left p-3 rounded-[12px] border-2 flex items-center gap-3 ${active?"border-[#00a651] bg-emerald-50":"border-zinc-200 bg-white hover:bg-zinc-50"}`}>
                    <div className={`w-10 h-10 rounded-[10px] ${p.cor} text-white grid place-items-center font-bold text-[12px]`}>{p.display.slice(0,2).toUpperCase()}</div>
                    <div className="flex-1"><div className="font-semibold text-[13px]">{p.display}</div><div className="text-[10px] text-zinc-500">{key==="banco"?`Standard Bank - NIB **** ${p.nib.slice(-4)}`:"Carteira Movel - Recebera popup para PIN"}</div></div>
                    <div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${active?"bg-[#00a651] border-[#00a651] text-white":"border-zinc-300"}`}>{active?"âœ“":""}</div>
                  </button>
                )
              })}
            </div>
            {metodoPag!=="banco" ? (
              <div className="mt-4"><label className="text-[11px] font-bold uppercase">Seu Numero {PAGAMENTOS_OWNER[metodoPag].display} (para receber popup PIN)</label><input value={telefonePag} onChange={e=>setTelefonePag(e.target.value)} placeholder="84xxxxxxx" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 border-zinc-200 text-[14px]" /></div>
            ) : (
              <div className="mt-4 p-3 rounded-[10px] bg-blue-50 border border-blue-200"><div className="text-[11px] font-bold">Dados Bancarios - Transferencia</div><div className="text-[11px] mt-1">Banco: Standard Bank<br/>NIB: {PAGAMENTOS_OWNER.banco.nib}<br/>Titular: Contrata.MZ (Plataforma)<br/>Valor: {taxa} MZN</div><div className="text-[10px] text-zinc-500 mt-2">Apos transferir, envie comprovativo via WhatsApp</div></div>
            )}
            <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={()=>setShowPagamento(false)} className="h-[44px] rounded-[10px] border text-[13px] font-semibold">Cancelar</button><button disabled={processandoPag} onClick={processarPagamento} className="h-[44px] rounded-[10px] bg-[#00a651] text-white font-bold text-[13px]">{processandoPag?L.aguardando:`${L.pagarBtn} ${taxa} MZN - ${PAGAMENTOS_OWNER[metodoPag].display}`}</button></div>
            <div className="mt-3 text-[10px] text-zinc-500 text-center">Pagamento seguro vai direto para conta do dono da plataforma. Numeros internos nao visiveis publicamente.</div>
          </div>
        </div>
      )}
      {/* POPUP SIMULADO DE PIN NO CELULAR */}
      {showPinPopup && (
        <div className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[320px] p-5 text-center shadow-2xl animate-pulse">
            <div className={`w-12 h-12 rounded-full ${PAGAMENTOS_OWNER[metodoPag].cor} text-white grid place-items-center mx-auto font-bold text-[16px]`}>{PAGAMENTOS_OWNER[metodoPag].display.slice(0,1)}</div>
            <div className="font-bold text-[14px] mt-3">Pedido Enviado para {telefonePag}</div>
            <div className="text-[11px] text-zinc-600 mt-2">Recebeu um popup no seu celular {PAGAMENTOS_OWNER[metodoPag].display}.<br/>Digite seu PIN para confirmar pagamento de <b>{taxa} MZN</b> para Contrata.MZ</div>
            <div className="mt-4 flex justify-center gap-1">{[1,2,3,4].map(i=><div key={i} className="w-8 h-8 rounded-[8px] bg-zinc-100 border grid place-items-center font-bold">*</div>)}</div>
            <div className="mt-4 text-[10px] text-zinc-500">Aguardando confirmacao do PIN no celular...</div>
            <div className="mt-3 w-full h-1 bg-zinc-200 rounded-full overflow-hidden"><div className="h-full bg-[#00a651] w-full animate-[progress_3s_linear]"></div></div>
          </div>
        </div>
      )}
    </div>
  );
}
