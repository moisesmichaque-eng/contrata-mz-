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
    formaPag: "Forma de pagamento - 4 opcoes inclui banco",
    preview: "Preview Dinamico", gerar: "Gerar PDF + WhatsApp",
    voltar: "<- Voltar", novo: "Novo contrato", reiniciar: "Reiniciar sem refresh",
    nomeCompleto: "Nome completo / Empresa", bi: "Numero BI / NUIT", contacto: "Contacto", localBairro: "Local / Bairro", provinciaField: "Provincia",
    valorTotal: "Valor Total MZN", prazo: "Prazo dias", salario: "Salario mensal MT", descricaoLivre: "Descricao livre das actividades"
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
    acrescentar: "Add tasks / Free description", formaPag: "Payment method - 4 options",
    preview: "Dynamic Preview", gerar: "Generate PDF + WhatsApp", voltar: "<- Back", novo: "New contract", reiniciar: "Restart",
    nomeCompleto: "Full name / Company", bi: "ID Number / NUIT", contacto: "Contact", localBairro: "Location", provinciaField: "Province",
    valorTotal: "Total Value MZN", prazo: "Deadline days", salario: "Monthly salary MT", descricaoLivre: "Free description"
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
const FORMAS_PAG = [{ id:"mpesa", nome:"M-Pesa", num:"84 123 4567" },{ id:"emola", nome:"e-Mola", num:"82 987 6543" },{ id:"bim", nome:"BIM", num:"NIB 000100000012345678910" },{ id:"bci", nome:"BCI", num:"NIB 000800000098765432110" }];
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
  const L = T[lang]; const modelo = MODELOS[tipo];
  const [form, setForm] = useState({ empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", empregadorProvincia:"Maputo - Matola", trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"", salario:"15000", valorTotal:"45000", prazo:"25", localObra:"Matola, Machava", provincia:"Maputo - Matola", qtdPortas:"15", qtdJanelas:"0", material:"Madeira", quemFornece:"Contratado", metros:"120", formaPag:"mpesa", horaEntrada:"07:00", horaSaida:"16:00", dataInicio:new Date().toISOString().split("T")[0] });
  const todasTarefas = useMemo(()=>{ const extra=tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean); const livre=descricaoLivre? [descricaoLivre] : []; return [...tarefasSel,...extra,...livre]; },[tarefasSel,tarefasExtra,descricaoLivre]);
  const profissionaisFiltrados = useMemo(()=>{ if(filtroCat==="Todas") return PROFISSIONAIS; return PROFISSIONAIS.filter(p=>p.cat===filtroCat); },[filtroCat]);
  const resetAll=()=>{ setTarefasSel(modelo.checklist.slice(0,2)); setTarefasExtra(""); setDescricaoLivre(""); setGerado(false); window.scrollTo({top:0,behavior:"smooth"}); };
  const gerarPDF=async()=>{
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
      add(`CONDICOES - Valor: ${form.valorTotal} MZN - Prazo: ${form.prazo} dias - Local: ${form.localObra} - ${form.provincia}`,10); y+=5;
      add(`TAREFAS (${todasTarefas.length}):`,11,true); y+=1; todasTarefas.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); }); y+=5;
      add(`Taxa 5% = ${Math.round(Number(form.valorTotal||15000)*0.05)} MZN - ${FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome}`,9); y+=10;
      doc.save(`Contrato-${form.trabalhadorNome}.pdf`); setGerado(true);
      return {blob:doc.output("blob"), fileName:`Contrato-${form.trabalhadorNome}.pdf`};
    } finally{ setGerando(false); }
  };
  const compartilhar=async()=>{
    const txt=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${form.trabalhadorNome} - ${form.valorTotal} MZN - ${todasTarefas.join(", ")}`;
    try{ const {blob,fileName}=await gerarPDF() as any; const file=new File([blob],fileName,{type:"application/pdf"}); if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({title:fileName, text:txt, files:[file]} as any); return; } }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white border-b"><div className="mx-auto max-w- px-4 h- flex items-center justify-between"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded- bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-">CONTRATA.MZ</div><div className="text- text-zinc-500">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div><div className="flex p-1 bg-zinc-100 rounded-"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded- text- font-semibold ${lang==="pt"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded- text- font-semibold ${lang==="en"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>EN</button></div></div></header>
      <div className="mx-auto max-w- px-4 pt-4"><div className="bg-[#1a1a1a] text-white rounded- p-4 flex flex-col md:flex-row justify-between gap-3"><div><div className="text- font-bold text-white/60">{L.modeloNegocio}</div><div className="text- font-semibold mt-1 max-w-">{L.modeloDesc}</div><div className="text- text-white/60 mt-1">{L.modeloDetalhe}</div></div><div className="flex gap-2"><div className="bg-white text-zinc-800 rounded- p-3 text- min-w-"><div className="font-bold text-">{L.estados}</div><div className="mt-1">{L.rascunho} | {L.enviado} | {L.activo} | {L.terminado}</div></div><div className="bg-[#00a651] text-white rounded- p-3 text- min-w-"><div className="font-bold text-">{L.fluxo}</div><div className="mt-1">{L.f1} {L.f2} {L.f3} {L.f4}</div></div></div></div><div className="mt-4 flex gap-2 p-1 bg-white border rounded- w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded- text- font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.encontrar} - {L.mercado}</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded- text- font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>{L.contratos} - {L.biblioteca}</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded- text- font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.meus} - {L.gestao}</button></div></div>
      <main className="mx-auto max-w- px-4 py-6">
        {tab==="encontrar" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"><div className="bg-white border rounded- p-4 h-fit"><div className="font-semibold text-">{L.filtros}</div><div className="mt-4 flex flex-wrap gap-1.5">{[L.todas,"Domestico","Construcao","Servicos","Consultoria","Outros"].map(cat=>{const active=filtroCat===cat || (cat===L.todas && filtroCat==="Todas"); return <button key={cat} onClick={()=>setFiltroCat(cat===L.todas?"Todas":cat)} className={`px-3 py-1.5 rounded-full text- border ${active?"bg-[#00a651] text-white border-[#00a651]":"bg-white"}`}>{cat}</button>})}</div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{profissionaisFiltrados.map(p=>(<div key={p.nome} className="bg-white border rounded- p-4"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-[#00a651] text-white grid place-items-center font-bold">{p.ini}</div><div><div className="font-semibold text-">{p.nome}</div><div className="text- text-zinc-500">{p.func} - {p.local}</div><div className="text- mt-1">{p.nota} - {p.trab}</div></div></div><div className="mt-3 flex justify-between"><span className="px-2.5 py-1 rounded-full bg-emerald-50 border text-">{p.disp}</span><span className="text- font-semibold">{p.preco}</span></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h- rounded- border text-">{L.verPerfil}</button><button onClick={()=>{setTab("contratos");}} className="h- rounded- bg-[#00a651] text-white text-">{L.contactar}</button></div></div>))}</div></div>)}
        {tab==="contratos" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4"><div className="bg-white border rounded- p-3 h-fit"><div className="font-semibold text-">{L.bibliotecaTitulo}</div><div className="mt-3 space-y-2">{(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const a=tipo===t; return <button key={t} onClick={()=>{setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,2)); setGerado(false);}} className={`w-full text-left p-3 rounded- border flex gap-2.5 ${a?"bg-emerald-50 border-emerald-300":"bg-white"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text- font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-">{t}</div><div className="text- text-zinc-500">{MODELOS[t].desc}</div></div><div className={`w-4 h-4 rounded-full border grid place-items-center text- ${a?"bg-[#00a651] text-white":""}`}>{a?"v":""}</div></button>})}</div></div><div className="bg-white border rounded- p-5"><h3 className="font-bold text-">{modelo.titulo}</h3><div className="mt-5 space-y-4"><div className="bg-blue-50 border rounded- p-3"><div className="font-semibold text-">{L.dadosContratante}</div><div className="mt-2 grid grid-cols-2 gap-2"><div><label className="text- font-bold uppercase">{L.nomeCompleto}</label><input value={form.empregadorNome} onChange={e=>setForm({...form, empregadorNome:e.target.value})} placeholder="Michaque Moises / Empresa XYZ" className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">{L.bi}</label><input value={form.empregadorBI} onChange={e=>setForm({...form, empregadorBI:e.target.value})} className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">{L.contacto}</label><input value={form.empregadorTel} onChange={e=>setForm({...form, empregadorTel:e.target.value})} className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">{L.localBairro}</label><input value={form.empregadorBairro} onChange={e=>setForm({...form, empregadorBairro:e.target.value})} className="mt-1 w-full h- px-3 rounded- border text-" /></div></div></div><div className="bg-emerald-50 border rounded- p-3"><div className="font-semibold text-">{L.dadosContratado} - {tipo}</div><div className="mt-2 grid grid-cols-2 gap-2"><div><label className="text- font-bold uppercase">{L.nomeCompleto}</label><input value={form.trabalhadorNome} onChange={e=>setForm({...form, trabalhadorNome:e.target.value})} placeholder="Zefanias / Construtora" className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">{L.bi}</label><input value={form.trabalhadorBI} onChange={e=>setForm({...form, trabalhadorBI:e.target.value})} className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">{L.contacto}</label><input value={form.trabalhadorTel} onChange={e=>setForm({...form, trabalhadorTel:e.target.value})} className="mt-1 w-full h- px-3 rounded- border text-" /></div><div><label className="text- font-bold uppercase">Funcao</label><input value={tipo} disabled className="mt-1 w-full h- px-3 rounded- border bg-zinc-100 text-" /></div></div></div><div className="bg-white border rounded- p-3"><div className="font-semibold text-">{L.condicoes} - {tipo}</div><div className="mt-3 grid grid-cols-2 gap-2"><div><label className="text- font-bold uppercase">{L.valorTotal}</label><input value={form.valorTotal} onChange={e=>setForm({...form, valorTotal:e.target.value})} className="mt-1 w-full h- px-3 rounded- border" /></div><div><label className="text- font-bold uppercase">{L.prazo}</label><input value={form.prazo} onChange={e=>setForm({...form, prazo:e.target.value})} className="mt-1 w-full h- px-3 rounded- border" /></div><div><label className="text- font-bold uppercase">{L.localBairro}</label><input value={form.localObra} onChange={e=>setForm({...form, localObra:e.target.value})} className="mt-1 w-full h- px-3 rounded- border" /></div><div><label className="text- font-bold uppercase">{L.provinciaField}</label><select value={form.provincia} onChange={e=>setForm({...form, provincia:e.target.value})} className="mt-1 w-full h- px-3 rounded- border">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div></div></div><div className="bg-white border rounded- p-3"><div className="font-semibold text-">{L.tarefas} - {tipo}</div><div className="mt-2 flex flex-wrap gap-1.5">{modelo.checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-1.5 rounded-full text- border ${ativo?"bg-[#00a651] text-white":"bg-white"}`}>{t}</button>})}</div><div className="mt-3"><label className="text- font-bold uppercase">{L.acrescentar}</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} className="mt-1 w-full min-h- p-3 rounded- border text-" /></div><div className="mt-3"><label className="text- font-bold uppercase">{L.descricaoLivre}</label><textarea value={descricaoLivre} onChange={e=>setDescricaoLivre(e.target.value)} placeholder="Escreva livremente para empresas ou servicos particulares" className="mt-1 w-full min-h- p-3 rounded- border-2 border-blue-200 bg-blue-50/30 text-" /></div></div><div className="flex gap-2"><button onClick={()=>setTab("encontrar")} className="h- w- rounded- bg-white border grid place-items-center font-bold">{"<-"}</button><button disabled={gerando} onClick={compartilhar} className="flex-1 h- rounded- bg-[#00a651] text-white font-semibold text-">{gerando?"Gerando...":`${L.gerar} - ${tipo}`}</button></div>{gerado && (<div className="bg-emerald-50 border border-emerald-200 rounded- p-3"><div className="text- font-semibold text-emerald-800">Contrato gerado com sucesso</div><div className="mt-2 grid grid-cols-3 gap-2"><button onClick={()=>gerarPDF()} className="h- rounded- bg-white border text-">Baixar de novo</button><button onClick={compartilhar} className="h- rounded- bg-[#00a651] text-white text-">WhatsApp com PDF</button><button onClick={resetAll} className="h- rounded- bg-[#2563eb] text-white text-">{L.novo}</button></div></div>)}</div></div><div className="bg-white border rounded- p-4 h-fit"><div className="text- font-bold uppercase">{L.preview} - {tipo}</div><div className="mt-3 h- overflow-auto bg-[#f8fafc] border rounded- p-3 text- font-mono">{modelo.titulo} - {tipo.toUpperCase()}<br/><br/>1. {form.empregadorNome} BI {form.empregadorBI}<br/><br/>2. {form.trabalhadorNome} BI {form.trabalhadorBI}<br/><br/>3. {form.valorTotal} MZN - {form.localObra}<br/><br/>4. TAREFAS ({todasTarefas.length})<br/>{todasTarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/></div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h- rounded- bg-[#2563eb] text-white text-">Ver PDF</button><button onClick={compartilhar} className="h- rounded- bg-[#00a651] text-white text-">WhatsApp</button></div></div></div>)}
        {tab==="meus" && (<div className="bg-white border rounded- p-6"><div className="font-bold text-">{L.meus} - {L.gestao}</div><div className="mt-6 grid grid-cols-4 gap-3"><div className="bg-amber-50 border rounded- p-3"><div className="text- font-bold">Rascunho (2)</div></div><div className="bg-blue-50 border rounded- p-3"><div className="text- font-bold">Enviado (1)</div></div><div className="bg-emerald-50 border rounded- p-3"><div className="text- font-bold">Activo (3)</div></div><div className="bg-zinc-50 border rounded- p-3"><div className="text- font-bold">Terminado (5)</div></div></div></div>)}
      </main>
    </div>
  );
}
