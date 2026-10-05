import { useState, useMemo } from "react";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
type Lang = "pt" | "en";
type Pagina = 1|2|3;
const T = {
  pt: {
    encontrar: "ENCONTRAR", mercado: "Mercado", contratos: "CONTRATOS", biblioteca: "Biblioteca", meus: "MEUS CONTRATOS", gestao: "Gestao",
    modeloNegocio: "MODELO DE NEGOCIO - TRUST FIRST", modeloDesc: "Mercado digital mocambicano onde cada servico termina com contrato formal, seguro e enviado por WhatsApp.", modeloDetalhe: "3 PAGINAS SIMPLES: 1-Dados, 2-Condicoes e Tarefas, 3-Anexos e Preview. 2 formas: FREE e PAGO 200MT fixo.",
    estados: "ESTADOS", rascunho: "Rascunho", enviado: "Enviado", activo: "Activo", terminado: "Terminado",
    fluxo: "FLUXO", f1: "Encontrar ->", f2: "Negociar ->", f3: "Contrato ->", f4: "WhatsApp",
    filtros: "Filtros Inteligentes", categoria: "CATEGORIA", todas: "Todas", domestico: "Domestico", construcao: "Construcao", servicos: "Servicos", consultoria: "Consultoria", outros: "Outros",
    provincia: "PROVINCIA", avaliacao: "AVALIACAO", disponibilidade: "DISPONIBILIDADE", disponivel: "Disponivel", ocupado: "Ocupado",
    verPerfil: "Ver Perfil", contactar: "Contactar", verificado: "Verificado",
    bibliotecaTitulo: "Biblioteca 10+ MVP", contratoFormula: "CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS + ANEXOS - 3 PAGINAS",
    dadosContratante: "1. DADOS DO CONTRATANTE", dadosContratado: "2. DADOS DO CONTRATADO",
    condicoes: "CONDICOES E TAREFAS",
    tarefas: "TAREFAS E RESPONSABILIDADES - Checklist",
    anexos: "ANEXOS - Fotos, Projetos, Documentos",
    acrescentar: "Acrescentar tarefas",
    preview: "Preview Dinamico - Sempre Aberto",
    gerar: "Gerar PDF + WhatsApp",
    voltar: "<- Voltar", novo: "Novo contrato", reiniciar: "Reiniciar",
    nomeCompleto: "Nome completo / Empresa", bi: "Numero BI / NUIT", contacto: "Contacto", localBairro: "Local / Bairro", provinciaField: "Provincia",
    valorTotal: "Valor Total MZN", prazo: "Prazo dias", salario: "Salario mensal MT",
    modoFree: "FREE - Gratis", modoPago: "PAGO 200MT",
    freeDesc: "Testar com amigos", pagoDesc: "Valor unico futuro",
    pag1: "Pagina 1 - Dados", pag2: "Pagina 2 - Tarefas e Condicoes", pag3: "Pagina 3 - Anexos e Preview",
    proximo: "Proximo ->", anterior: "<- Anterior",
    anexarTitulo: "Anexar Fotos, Projeto ou Documento",
    anexarDesc: "Ex: Pedreiro - foto da obra ou projeto. Carpinteiro - foto da porta modelo. Pintor - cor desejada.",
    arraste: "Clique para anexar foto ou projeto",
    tiposAceitos: "JPG, PNG, PDF (max 5MB)",
    anexosAdicionados: "Anexos",
    nenhumAnexo: "Nenhum anexo. Para pedreiro anexe foto da obra ou projeto.",
    btnFree: "Gerar FREE - Gratis",
    btnPago: "Pagar 200MT - Gerar PDF"
  },
  en: {
    encontrar: "FIND", mercado: "Market", contratos: "CONTRACTS", biblioteca: "Library", meus: "MY CONTRACTS", gestao: "Management",
    modeloNegocio: "BUSINESS MODEL - TRUST FIRST", modeloDesc: "Mozambican digital market - 3 pages simple.", modeloDetalhe: "3 PAGES: 1-Data, 2-Tasks, 3-Attachments and Preview.",
    estados: "STATUS", rascunho: "Draft", enviado: "Sent", activo: "Active", terminado: "Finished",
    fluxo: "FLOW", f1: "Find ->", f2: "Negotiate ->", f3: "Contract ->", f4: "WhatsApp",
    filtros: "Smart Filters", categoria: "CATEGORY", todas: "All", domestico: "Domestic", construcao: "Construction", servicos: "Services", consultoria: "Consulting", outros: "Others",
    provincia: "PROVINCE", avaliacao: "RATING", disponibilidade: "AVAILABILITY", disponivel: "Available", ocupado: "Busy",
    verPerfil: "View Profile", contactar: "Contact", verificado: "Verified",
    bibliotecaTitulo: "Library 10+ MVP", contratoFormula: "CONTRACT = MODEL + FIELDS + RULES + CLAUSES + ATTACHMENTS - 3 PAGES",
    dadosContratante: "1. CLIENT DATA", dadosContratado: "2. CONTRACTOR DATA", condicoes: "CONDITIONS AND TASKS", tarefas: "TASKS", anexos: "ATTACHMENTS",
    acrescentar: "Add tasks", preview: "Dynamic Preview - Always Open", gerar: "Generate PDF + WhatsApp", voltar: "<- Back", novo: "New contract", reiniciar: "Restart",
    nomeCompleto: "Full name / Company", bi: "ID Number", contacto: "Contact", localBairro: "Location", provinciaField: "Province",
    valorTotal: "Total Value MZN", prazo: "Deadline days", salario: "Monthly salary MT",
    modoFree: "FREE", modoPago: "PAID 200MT", freeDesc: "Free test", pagoDesc: "Fixed value future",
    pag1: "Page 1 - Data", pag2: "Page 2 - Tasks and Conditions", pag3: "Page 3 - Attachments and Preview",
    proximo: "Next ->", anterior: "<- Previous",
    anexarTitulo: "Attach Photos, Project or Document", anexarDesc: "Ex: Mason - photo of work or project.", arraste: "Click to attach photo or project", tiposAceitos: "JPG, PNG, PDF (max 5MB)", anexosAdicionados: "Attachments", nenhumAnexo: "No attachments.",
    btnFree: "Generate FREE", btnPago: "Pay 200MT - Generate PDF"
  }
};
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";
const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa","Lavar louca e organizar cozinha - zelar pela louca, repor se partir por negligencia","Arrumar quartos e fazer camas","Lavar, passar e dobrar roupa","Organizar despensa e fazer compras","Cozinhar refeicoes","Zelar pelos utensilios, louca e eletrodomesticos - avisar quebras","Nao se responsabiliza por quebra de louca antiga/desgastada salvo negligencia grave"], desc: "Domestico - clausula louca" },
  "Motorista Particular": { titulo: "CONTRATO - MOTORISTA PARTICULAR", checklist: ["Conduzir empregador e familia","Manter viatura limpa e abastecida","Verificar oleo, agua, pneus","Fazer recados e compras"], desc: "Motorista" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos","Reboco interior e exterior","Assentar tijoleira e ceramica","Fundacoes e vigas","Acabamentos","Seguir projeto/foto anexa"], desc: "Pedreiro - anexar foto/projeto" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar e montar moveis em madeira","Instalar portas","Instalar janelas","Instalar armarios","Medir e cortar madeira","Aplicar verniz e acabamento"], desc: "Portas, janelas - anexar modelo" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes","Fabricar grades","Soldar estruturas metalicas","Instalar portoes","Reparos em ferro"], desc: "Soldar, portoes" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico","Instalar tomadas e interruptores","Instalar iluminacao","Passar cabos e fios","Testar instalacao"], desc: "Eletrica" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua","Instalar esgotos","Instalar sanita e lavatorio","Reparar fugas"], desc: "Canalizacao" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede","Pintura interior","Pintura exterior","Aplicar textura","Pintar teto","Usar cor conforme foto anexa"], desc: "Pintura" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial","Servicos administrativos","Servicos tecnicos","Assessoria juridica/contabil","Marketing e comunicacao","Formacao e treinamento"], desc: "Empresas" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Servico personalizado - descrever no campo acrescentar"], desc: "Formulario livre" },
};
const PAGAMENTOS_OWNER = {
  mpesa: { numero: "840532899", display: "M-Pesa", cor: "bg-[#e4002b]" },
  emola: { numero: "864341779", display: "e-Mola", cor: "bg-[#ff6b00]" },
  mkesh: { numero: "823832513", display: "mKesh", cor: "bg-[#00a651]" },
  banco: { numero: "000301170814421100321", banco: "Standard Bank", display: "Standard Bank", cor: "bg-[#0033a0]", nib: "000301170814421100321" }
};
const PROVINCIAS = ["Maputo Cidade","Maputo - Matola","Maputo - Machava","Gaza - Xai-Xai","Gaza - Chokwe","Inhambane","Sofala - Beira","Nampula","Tete"];
const PROFISSIONAIS = [
  { ini:"ML", nome:"Maria Langa", func:"Empregada Domestica", cat:"Domestico", local:"Maputo - Polana", nota:"4.9", trab:"23 trabalhos", anos:"8 anos", disp:"Disponivel", preco:"8.000 MZN" },
  { ini:"JM", nome:"Joao Manuel", func:"Carpinteiro", cat:"Construcao", local:"Matola - Machava", nota:"4.8", trab:"34 trabalhos", anos:"7 anos", disp:"Disponivel", preco:"Sob consulta" },
  { ini:"PM", nome:"Pedro Massingue", func:"Pedreiro", cat:"Construcao", local:"Maputo - Zimpeto", nota:"4.7", trab:"56 trabalhos", anos:"12 anos", disp:"Ocupado", preco:"1.200 MZN/dia" },
  { ini:"EC", nome:"Esperanca Cossa", func:"Eletricista", cat:"Construcao", local:"Maputo - Sommershield", nota:"4.9", trab:"41 trabalhos", anos:"6 anos", disp:"Disponivel", preco:"1.500 MZN/dia" },
  { ini:"SC", nome:"Servicos Lda", func:"Consultoria Empresarial", cat:"Servicos", local:"Maputo - Central", nota:"5.0", trab:"12 projetos", anos:"3 anos", disp:"Disponivel", preco:"15.000 MZN" },
  { ini:"CT", nome:"Carlos Tivane", func:"Motorista", cat:"Domestico", local:"Matola - Liberdade", nota:"4.8", trab:"29 trabalhos", anos:"7 anos", disp:"Disponivel", preco:"12.000 MZN" },
];
type Anexo = { id:string, nome:string, tamanho:string, url:string };
export default function App(){
  const [lang, setLang] = useState<Lang>("pt");
  const [tab, setTab] = useState<"encontrar"|"contratos"|"meus">("encontrar");
  const [tipo, setTipo] = useState<TipoContrato>("Secretario/a Domestico/a");
  const [tarefasSel, setTarefasSel] = useState<string[]>(MODELOS["Secretario/a Domestico/a"].checklist.slice(0,3));
  const [tarefasExtra, setTarefasExtra] = useState("");
  const [gerando, setGerando] = useState(false);
  const [gerado, setGerado] = useState(false);
  const [filtroCat, setFiltroCat] = useState("Todas");
  const [pagina, setPagina] = useState<Pagina>(1);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [showPagamento, setShowPagamento] = useState(false);
  const [metodoPag, setMetodoPag] = useState<"mpesa"|"emola"|"mkesh"|"banco">("mpesa");
  const [processandoPag, setProcessandoPag] = useState(false);
  const [telefonePag, setTelefonePag] = useState("");
  const [showPinPopup, setShowPinPopup] = useState(false);
  const L = T[lang]; const modelo = MODELOS[tipo];
  const [form, setForm] = useState({ empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", empregadorProvincia:"Maputo - Matola", trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"", valorTotal:"8000", prazo:"30", localObra:"Maputo, Polana", provincia:"Maputo - Matola" });
  const todasTarefas = useMemo(()=>{ const extra=tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean); return [...tarefasSel,...extra]; },[tarefasSel,tarefasExtra]);
  const profissionaisFiltrados = useMemo(()=>{ if(filtroCat==="Todas") return PROFISSIONAIS; return PROFISSIONAIS.filter(p=>p.cat===filtroCat); },[filtroCat]);
  const handleFiles = (files: FileList | null) => {
    if(!files) return;
    const novos: Anexo[] = Array.from(files).slice(0,5).map(f=>{
      const url = f.type.startsWith("image/") ? URL.createObjectURL(f) : "";
      return { id: Math.random().toString(36).slice(2), nome: f.name, tamanho: (f.size/1024/1024).toFixed(2)+" MB", url };
    });
    setAnexos(prev=>[...prev, ...novos].slice(0,10));
  };
  const removerAnexo = (id:string) => setAnexos(prev=>prev.filter(a=>a.id!==id));
  const resetAll=()=>{ setTarefasSel(modelo.checklist.slice(0,2)); setTarefasExtra(""); setGerado(false); setAnexos([]); setPagina(1); };
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
      y=24; doc.setTextColor(30,30,30); add(`${modelo.titulo} - ${tipo.toUpperCase()} - 3 PAGINAS`,12,true); y+=2; doc.setDrawColor(0,166,81); doc.line(M,y,W-M,y); y+=6;
      add("PAGINA 1 - DADOS DAS PARTES",11,true); y+=1;
      add(`CONTRATANTE: ${form.empregadorNome}, BI ${form.empregadorBI}, Tel ${form.empregadorTel}, ${form.empregadorBairro} - ${form.empregadorProvincia}`,10); y+=1;
      add(`CONTRATADO: ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, Tel ${form.trabalhadorTel}, Funcao ${tipo}`,10); y+=5;
      add("PAGINA 2 - CONDICOES E TAREFAS",11,true); y+=1;
      add(`Valor: ${form.valorTotal} MZN - Prazo: ${form.prazo} dias - Local: ${form.localObra} - ${form.provincia}`,10); y+=1;
      todasTarefas.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); }); y+=2;
      if(tipo==="Secretario/a Domestico/a"){ add("CLAUSULA LOUCA: Zelar pela louca, avisar quebras, nao paga quebra acidental salvo negligencia grave - max 25% salario parcelado.",9,true); y+=3; }
      add(`PAGINA 3 - ANEXOS (${anexos.length})`,11,true); y+=1;
      if(anexos.length===0){ add("Nenhum anexo.",9); } else { anexos.forEach((a,i)=>{ add(`${i+1}. ${a.nome} - ${a.tamanho}`,9); }); add("Fotos/projetos anexados fazem parte integrante do contrato - ver arquivos via WhatsApp.",9); }
      y+=8; check(40); add("Assinaturas:",10,true); y+=10; const c1=M, c2=W/2+10; doc.line(c1,y+10,c1+55,y+10); doc.line(c2,y+10,c2+55,y+10); doc.setFontSize(8); doc.text(semAcento(form.empregadorNome),c1,y+14); doc.text(semAcento(form.trabalhadorNome),c2,y+14);
      doc.save(`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-")}.pdf`); setGerado(true);
      return {blob:doc.output("blob"), fileName:`Contrato-${form.trabalhadorNome}.pdf`};
    } finally{ setGerando(false); }
  };
  const compartilharFree=async()=>{
    const txt=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${form.trabalhadorNome} - ${form.valorTotal} MZN - ${todasTarefas.length} tarefas - ${anexos.length} anexos - FREE`;
    try{ const {blob,fileName}=await gerarPDF() as any; const file=new File([blob],fileName,{type:"application/pdf"}); if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({title:fileName, text:txt, files:[file]} as any); return; } }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };
  const confirmarPagamento200 = async () => {
    if((metodoPag==="mpesa"||metodoPag==="emola"||metodoPag==="mkesh") && !telefonePag){ alert("Digite seu numero"); return; }
    setProcessandoPag(true); await new Promise(r=>setTimeout(r,1500));
    if(metodoPag!=="banco"){ setShowPinPopup(true); setTimeout(async ()=>{ setShowPinPopup(false); setProcessandoPag(false); setShowPagamento(false); await gerarPDF(); }, 3000); }
    else { await new Promise(r=>setTimeout(r,1000)); setProcessandoPag(false); setShowPagamento(false); await gerarPDF(); }
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white border-b"><div className="mx-auto max-w-[1280px] px-4 h-[64px] flex items-center justify-between"><div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[15px]">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div><div className="flex p-1 bg-zinc-100 rounded-[10px]"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="pt"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="en"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>EN</button></div></div></header>
      <div className="mx-auto max-w-[1280px] px-4 pt-4">
        <div className="bg-[#1a1a1a] text-white rounded-[16px] p-4 flex flex-col md:flex-row justify-between gap-3"><div><div className="text-[11px] font-bold text-white/60">{L.modeloNegocio}</div><div className="text-[15px] font-semibold mt-1 max-w-[560px]">{L.modeloDesc}</div><div className="text-[12px] text-white/60 mt-1">{L.modeloDetalhe}</div></div><div className="bg-[#00a651] text-white rounded-[12px] p-3 text-[11px] min-w-[130px]"><div className="font-bold text-[10px]">3 PAGINAS</div><div className="mt-1 leading-4">Pag 1: Dados<br/>Pag 2: Tarefas<br/>Pag 3: Anexos + Preview</div></div></div>
        <div className="mt-4 flex gap-2 p-1 bg-white border rounded-[14px] w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.encontrar}</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>{L.contratos}</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.meus}</button></div>
        {tab==="contratos" && (
          <div className="mt-4 bg-white border-2 rounded-[14px] p-1.5 flex gap-1.5 w-fit">
            {[1,2,3].map(p=>{
              const ativo = pagina===p;
              const label = p===1?L.pag1:p===2?L.pag2:L.pag3;
              return <button key={p} onClick={()=>setPagina(p as Pagina)} className={`px-4 py-2.5 rounded-[10px] text-[12px] font-bold ${ativo?"bg-[#2563eb] text-white shadow":"bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{p}. {label} {p===3 && anexos.length>0?`(${anexos.length})`:""}</button>
            })}
          </div>
        )}
      </div>
      <main className="mx-auto max-w-[1280px] px-4 py-6">
        {tab==="encontrar" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"><div className="bg-white border rounded-[16px] p-4 h-fit"><div className="font-semibold text-[13px]">{L.filtros}</div><div className="mt-4 flex flex-wrap gap-1.5">{[L.todas,"Domestico","Construcao","Servicos","Consultoria","Outros"].map(cat=>{const active=filtroCat===cat || (cat===L.todas && filtroCat==="Todas"); return <button key={cat} onClick={()=>setFiltroCat(cat===L.todas?"Todas":cat)} className={`px-3 py-1.5 rounded-full text-[11px] border ${active?"bg-[#00a651] text-white":"bg-white"}`}>{cat}</button>})}</div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{profissionaisFiltrados.map(p=>(<div key={p.nome} className="bg-white border rounded-[16px] p-4"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-[#00a651] text-white grid place-items-center font-bold">{p.ini}</div><div><div className="font-semibold text-[13px]">{p.nome}</div><div className="text-[11px] text-zinc-500">{p.func} - {p.local}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-[36px] rounded-[10px] border text-[12px]">{L.verPerfil}</button><button onClick={()=>{setTab("contratos"); setPagina(1);}} className="h-[36px] rounded-[10px] bg-[#00a651] text-white text-[12px]">{L.contactar}</button></div></div>))}</div></div>)}
        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4">
            <div className="bg-white border rounded-[16px] p-3 h-fit sticky top-[100px]"><div className="font-semibold text-[13px]">{L.bibliotecaTitulo}</div><div className="text-[10px] text-zinc-500 mt-1">{L.contratoFormula}</div><div className="mt-3 space-y-2">{(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const a=tipo===t; return <button key={t} onClick={()=>{setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,3)); setGerado(false); setPagina(1);}} className={`w-full text-left p-3 rounded-[12px] border flex gap-2.5 ${a?"bg-emerald-50 border-emerald-300":"bg-white"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text-[11px] font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc}</div></div></button>})}</div></div>
            <div className="bg-white border rounded-[16px] p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold text-[14px]">{modelo.titulo}</h3><span className="px-2 py-0.5 rounded-full bg-blue-50 border text-[10px] font-bold">Pagina {pagina}/3</span></div>
              <div className="mt-5">
                {pagina===1 && (
                  <div className="space-y-5">
                    <div className="bg-blue-50 border-2 rounded-[12px] p-4"><div className="font-bold text-[13px] text-blue-800">PAGINA 1 - DADOS DAS PARTES</div>
                      <div className="mt-3"><div className="font-semibold text-[11px] uppercase text-blue-700">{L.dadosContratante}</div><div className="mt-2 grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">Nome / Empresa *</label><input value={form.empregadorNome} onChange={e=>setForm({...form, empregadorNome:e.target.value})} placeholder="Michaque Moises" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">BI / NUIT *</label><input value={form.empregadorBI} onChange={e=>setForm({...form, empregadorBI:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Contacto</label><input value={form.empregadorTel} onChange={e=>setForm({...form, empregadorTel:e.target.value})} placeholder="84xxxxxxx" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Local / Bairro</label><input value={form.empregadorBairro} onChange={e=>setForm({...form, empregadorBairro:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div></div></div>
                      <div className="mt-4"><div className="font-semibold text-[11px] uppercase text-emerald-700">{L.dadosContratado}</div><div className="mt-2 grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">Nome Trabalhador *</label><input value={form.trabalhadorNome} onChange={e=>setForm({...form, trabalhadorNome:e.target.value})} placeholder="Maria Langa" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">BI / NUIT</label><input value={form.trabalhadorBI} onChange={e=>setForm({...form, trabalhadorBI:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Contacto</label><input value={form.trabalhadorTel} onChange={e=>setForm({...form, trabalhadorTel:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Funcao</label><input value={tipo} disabled className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 bg-zinc-100 text-[12px] font-bold" /></div></div></div>
                    </div>
                    <div className="flex justify-end"><button onClick={()=>setPagina(2)} className="px-8 py-3 rounded-[12px] bg-[#2563eb] text-white font-bold text-[13px]">Proximo -> Pagina 2 - Tarefas</button></div>
                  </div>
                )}
                {pagina===2 && (
                  <div className="space-y-5">
                    <div className="bg-white border-2 rounded-[12px] p-4"><div className="font-bold text-[13px]">PAGINA 2 - CONDICOES, TAREFAS E CLAUSULA LOUCA</div>
                      <div className="mt-4 grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">Valor Total MZN *</label><input value={form.valorTotal} onChange={e=>setForm({...form, valorTotal:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 font-bold" /></div><div><label className="text-[10px] font-bold uppercase">Prazo dias</label><input value={form.prazo} onChange={e=>setForm({...form, prazo:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2" /></div><div className="col-span-2"><label className="text-[10px] font-bold uppercase">Local Obra / Servico</label><input value={form.localObra} onChange={e=>setForm({...form, localObra:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2" /></div></div>
                      <div className="mt-5"><div className="font-semibold text-[12px]">Checklist de Tarefas - {tipo}</div>{tipo==="Secretario/a Domestico/a" && (<div className="mt-2 p-2.5 rounded-[10px] bg-amber-50 border-2 border-amber-200 text-[11px]"><b>Clausula Louca atualizada:</b> Empregada zela pela louca, avisa quebras, nao paga quebra acidental. So paga se negligencia grave comprovada, max 25% salario parcelado.</div>)}<div className="mt-3 flex flex-wrap gap-2">{modelo.checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-2 rounded-full text-[11px] border text-left ${ativo?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-300"}`}>{t}</button>})}</div><div className="mt-4"><label className="text-[10px] font-bold uppercase">{L.acrescentar} - Unica descricao agora</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} placeholder="Ex: Instalar 15 portas, aplicar verniz, seguir projeto anexo..." className="mt-1 w-full min-h-[80px] p-3 rounded-[10px] border-2 text-[12px]" /></div><div className="mt-2 text-[11px] text-zinc-600">{todasTarefas.length} tarefas selecionadas</div></div>
                    </div>
                    <div className="flex justify-between"><button onClick={()=>setPagina(1)} className="px-6 py-3 rounded-[12px] border-2 font-bold text-[13px]"><- Pagina 1</button><button onClick={()=>setPagina(3)} className="px-8 py-3 rounded-[12px] bg-[#2563eb] text-white font-bold text-[13px]">Proximo -> Pagina 3 - Anexos</button></div>
                  </div>
                )}
                {pagina===3 && (
                  <div className="space-y-5">
                    <div className="bg-white border-2 border-dashed border-blue-400 rounded-[16px] p-5">
                      <div className="font-bold text-[14px]">PAGINA 3 - {L.anexarTitulo}</div><div className="text-[11px] text-zinc-600 mt-1">{L.anexarDesc}</div>
                      <label className="mt-4 w-full min-h-[130px] border-2 border-dashed border-zinc-300 rounded-[12px] grid place-items-center p-6 cursor-pointer hover:bg-blue-50 hover:border-[#2563eb] transition"><input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e=>handleFiles(e.target.files)} /><div className="text-center"><div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center mx-auto text-[22px]">+</div><div className="font-bold text-[13px] mt-2">{L.arraste}</div><div className="text-[10px] text-zinc-500 mt-1">{L.tiposAceitos}</div></div></label>
                      <div className="mt-4"><div className="font-bold text-[12px]">{L.anexosAdicionados} ({anexos.length}/10)</div>{anexos.length===0 ? (<div className="mt-2 p-4 rounded-[10px] bg-zinc-50 border text-[11px] text-zinc-500"><b>Exemplos por tipo:</b><br/>- Pedreiro: foto da casa, projeto, planta baixa<br/>- Carpinteiro: foto de porta modelo desejada<br/>- Pintor: foto da cor/parede<br/>- Eletricista: esquema eletrico<br/>- Consultoria: briefing, docs empresa</div>) : (<div className="mt-2 grid grid-cols-2 gap-2">{anexos.map(a=>(<div key={a.id} className="border-2 rounded-[10px] p-2 flex gap-2 items-center bg-white"><div className="w-12 h-12 rounded-[8px] bg-blue-100 grid place-items-center text-[9px] font-bold">{a.url ? <img src={a.url} alt={a.nome} className="w-full h-full object-cover rounded-[8px]" /> : a.nome.split(".").pop()?.toUpperCase()}</div><div className="flex-1 min-w-0"><div className="text-[11px] font-semibold truncate">{a.nome}</div><div className="text-[10px] text-zinc-500">{a.tamanho}</div></div><button onClick={()=>removerAnexo(a.id)} className="w-7 h-7 rounded-full bg-red-50 text-red-600 grid place-items-center">x</button></div>))}</div>)}</div>
                    </div>
                    {/* DOIS BOTOES LADO A LADO - FREE E PAGO */}
                    <div className="bg-zinc-50 border-2 rounded-[12px] p-4">
                      <div className="font-bold text-[13px]">Escolha como gerar - 2 formas</div><div className="text-[11px] text-zinc-600 mt-1">Lado direito FREE para testar, lado azul PAGO 200MT fixo futuro</div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button disabled={gerando} onClick={compartilharFree} className="h-[56px] rounded-[12px] bg-[#00a651] text-white font-bold text-[14px] flex flex-col items-center justify-center leading-tight"><span>ðŸŸ¢ {L.btnFree}</span><span className="text-[10px] font-normal opacity-90">Para testar com amigos agora</span></button>
                        <button onClick={()=>setShowPagamento(true)} className="h-[56px] rounded-[12px] bg-[#2563eb] text-white font-bold text-[14px] flex flex-col items-center justify-center leading-tight"><span>ðŸ”µ {L.btnPago}</span><span className="text-[10px] font-normal opacity-90">M-Pesa e-Mola mKesh Banco - 200MT</span></button>
                      </div>
                      {gerado && (<div className="mt-3 p-2 rounded-[8px] bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">PDF gerado! {anexos.length} anexos vao junto via WhatsApp</div>)}
                    </div>
                    <div className="flex justify-start"><button onClick={()=>setPagina(2)} className="px-6 py-3 rounded-[12px] border-2 font-bold text-[13px]"><- Voltar Pagina 2</button></div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white border rounded-[16px] p-4 h-fit sticky top-[140px]"><div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">Preview - Pag {pagina}/3 - Sempre Aberto</span><span className="px-2 py-0.5 rounded-full bg-emerald-50 border text-[10px] font-bold">{anexos.length} anexos</span></div><div className="mt-3 h-[640px] overflow-auto bg-[#f8fafc] border rounded-[10px] p-3 text-[10px] font-mono leading-relaxed">{modelo.titulo}<br/>Tipo: {tipo.toUpperCase()}<br/><br/>PAGINA 1 - PARTES:<br/>Contratante: {form.empregadorNome} BI {form.empregadorBI}<br/>Contratado: {form.trabalhadorNome} BI {form.trabalhadorBI}<br/><br/>PAGINA 2 - CONDICOES E TAREFAS:<br/>Valor: {form.valorTotal} MZN | Prazo: {form.prazo} dias | Local: {form.localObra}<br/><br/>{todasTarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>{tipo==="Secretario/a Domestico/a" && (<>CLAUSULA LOUCA: Zela pela louca, nao paga quebra acidental salvo negligencia grave 25% max.<br/><br/></>)}PAGINA 3 - ANEXOS ({anexos.length}):<br/>{anexos.length===0?"Nenhum anexo - cliente pode anexar foto/projeto":anexos.map((a,i)=>`${i+1}. ${a.nome} (${a.tamanho})`).join("<br/>")}<br/><br/>3 PAGINAS - {new Date().toLocaleDateString()}</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h-[38px] rounded-[10px] bg-zinc-800 text-white text-[11px] font-semibold">Ver PDF</button><button onClick={compartilharFree} className="h-[38px] rounded-[10px] bg-[#00a651] text-white text-[11px] font-semibold">WhatsApp FREE</button></div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={compartilharFree} className="h-[42px] rounded-[10px] bg-[#00a651] text-white font-bold text-[12px]">FREE Gratis</button><button onClick={()=>setShowPagamento(true)} className="h-[42px] rounded-[10px] bg-[#2563eb] text-white font-bold text-[12px]">PAGO 200MT</button></div></div>
          </div>
        )}
        {tab==="meus" && (<div className="bg-white border rounded-[16px] p-6"><div className="font-bold text-[16px]">{L.meus} - {L.gestao} - 3 Paginas</div><div className="mt-2 text-[11px] text-zinc-500">Agora com sistema de 3 paginas e anexos no lugar de descricao livre duplicada</div></div>)}
      </main>
      {showPagamento && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[420px] p-5 shadow-2xl">
            <div className="flex items-center justify-between"><div><div className="font-bold text-[15px]">Pagamento 200MT - Contas do Dono</div><div className="text-[11px] text-zinc-600">Valor unico qualquer contrato - vai para tuas contas</div></div><button onClick={()=>setShowPagamento(false)} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">x</button></div>
            <div className="mt-3 p-3 rounded-[10px] bg-blue-50 border border-blue-200 text-[11px]"><b>Contas internas (nao visiveis no site publico):</b><br/>M-Pesa 840532899, e-Mola 864341779, mKesh 823832513, Standard Bank 000301170814421100321<br/>Cliente escolhe operadora e recebe popup PIN no celular.</div>
            <div className="mt-4 space-y-2">
              {(Object.keys(PAGAMENTOS_OWNER) as Array<keyof typeof PAGAMENTOS_OWNER>).map(key=>{
                const p = PAGAMENTOS_OWNER[key]; const active = metodoPag===key;
                return (<button key={key} onClick={()=>setMetodoPag(key)} className={`w-full text-left p-3 rounded-[12px] border-2 flex items-center gap-3 ${active?"border-[#00a651] bg-emerald-50":"border-zinc-200 bg-white"}`}><div className={`w-10 h-10 rounded-[10px] ${p.cor} text-white grid place-items-center font-bold text-[12px]`}>{p.display.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-semibold text-[13px]">{p.display}</div><div className="text-[10px] text-zinc-500">{key==="banco"?`Standard Bank **** ${p.nib.slice(-4)}`:"Recebera popup PIN no celular"}</div></div><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${active?"bg-[#00a651] border-[#00a651] text-white":"border-zinc-300"}`}>{active?"âœ“":""}</div></button>)
              })}
            </div>
            {metodoPag!=="banco" ? (<div className="mt-4"><label className="text-[11px] font-bold uppercase">Seu Numero {PAGAMENTOS_OWNER[metodoPag].display} (para receber popup PIN)</label><input value={telefonePag} onChange={e=>setTelefonePag(e.target.value)} placeholder="84xxxxxxx" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[14px]" /></div>) : (<div className="mt-4 p-3 rounded-[10px] bg-blue-50 border text-[11px]">Banco: Standard Bank<br/>NIB: {PAGAMENTOS_OWNER.banco.nib}<br/>Valor: 200MT fixo</div>)}
            <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={()=>setShowPagamento(false)} className="h-[44px] rounded-[10px] border text-[13px] font-semibold">Usar FREE Gratis</button><button disabled={processandoPag} onClick={confirmarPagamento200} className="h-[44px] rounded-[10px] bg-[#2563eb] text-white font-bold text-[13px]">{processandoPag?"Processando...":`Pagar 200MT - ${PAGAMENTOS_OWNER[metodoPag].display}`}</button></div>
          </div>
        </div>
      )}
      {showPinPopup && (
        <div className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[320px] p-5 text-center shadow-2xl">
            <div className={`w-12 h-12 rounded-full ${PAGAMENTOS_OWNER[metodoPag].cor} text-white grid place-items-center mx-auto font-bold`}>{PAGAMENTOS_OWNER[metodoPag].display.slice(0,1)}</div>
            <div className="font-bold text-[14px] mt-3">Pedido Enviado para {telefonePag}</div>
            <div className="text-[11px] text-zinc-600 mt-2">Recebeu popup no celular {PAGAMENTOS_OWNER[metodoPag].display}. Digite PIN para confirmar 200MT para conta {PAGAMENTOS_OWNER[metodoPag].numero}</div>
            <div className="mt-4 flex justify-center gap-1">{[1,2,3,4].map(i=><div key={i} className="w-8 h-8 rounded-[8px] bg-zinc-100 border grid place-items-center font-bold">*</div>)}</div>
            <div className="mt-3 text-[10px] text-zinc-500">Aguardando PIN...</div>
          </div>
        </div>
      )}
    </div>
  );
}
