import { useState, useMemo } from "react";

const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ã§/g,"c").replace(/Ã‡/g,"C");

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
    preview: "Preview Dinamico",
    gerar: "Gerar PDF + WhatsApp",
    voltar: "<- Voltar", novo: "Novo contrato", reiniciar: "Reiniciar sem refresh",
    nomeCompleto: "Nome completo / Empresa", bi: "Numero BI / NUIT", contacto: "Contacto", localBairro: "Local / Bairro", provinciaField: "Provincia",
    valorTotal: "Valor Total MZN", prazo: "Prazo dias", salario: "Salario mensal MT", descricaoLivre: "Descricao livre das actividades (para consultoria, servicos, empresas)"
  },
  en: {
    encontrar: "FIND", mercado: "Market", contratos: "CONTRACTS", biblioteca: "Library", meus: "MY CONTRACTS", gestao: "Management",
    modeloNegocio: "BUSINESS MODEL - TRUST FIRST",
    modeloDesc: "Mozambican digital market where each service ends with formal contract, secure and sent via WhatsApp.",
    modeloDetalhe: "Client pays 5% fee. Ex: 20,000 MZN fee 1,000 MZN. Platform manages notifications, payment and legally valid PDF.",
    estados: "STATUS", rascunho: "Draft", enviado: "Sent", activo: "Active", terminado: "Finished",
    fluxo: "FLOW", f1: "Find ->", f2: "Negotiate ->", f3: "Contract ->", f4: "WhatsApp",
    filtros: "Smart Filters", categoria: "CATEGORY", todas: "All", domestico: "Domestic", construcao: "Construction", servicos: "Services", consultoria: "Consulting", outros: "Others",
    provincia: "PROVINCE", avaliacao: "RATING", disponibilidade: "AVAILABILITY", disponivel: "Available", ocupado: "Busy",
    verPerfil: "View Profile", contactar: "Contact", verificado: "Verified",
    bibliotecaTitulo: "Library 10+ MVP", contratoFormula: "CONTRACT = MODEL + FIELDS + RULES + CLAUSES",
    dadosContratante: "1. CLIENT DATA (Employer/Company)", dadosContratado: "2. CONTRACTOR DATA (Worker/Company)",
    condicoes: "3. SPECIFIC CONDITIONS", tarefas: "4. TASKS AND RESPONSIBILITIES - Checklist",
    acrescentar: "Add tasks / Free description (for companies or private services)", formaPag: "Payment method - 4 options includes bank",
    preview: "Dynamic Preview", gerar: "Generate PDF + WhatsApp", voltar: "<- Back", novo: "New contract", reiniciar: "Restart without refresh",
    nomeCompleto: "Full name / Company", bi: "ID Number / NUIT", contacto: "Contact", localBairro: "Location / Neighborhood", provinciaField: "Province",
    valorTotal: "Total Value MZN", prazo: "Deadline days", salario: "Monthly salary MT", descricaoLivre: "Free description of activities (for consulting, services, companies)"
  }
};

type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";

const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa", "Lavar louca e organizar cozinha", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Organizar despensa e fazer compras", "Cozinhar refeicoes"], desc: "Domestico - salario mensal, horario, dias, alimentacao" },
  "Motorista Particular": { titulo: "CONTRATO - MOTORISTA PARTICULAR", checklist: ["Conduzir empregador e familia", "Manter viatura limpa e abastecida", "Verificar oleo, agua, pneus", "Fazer recados e compras"], desc: "Motorista - viatura, carta, combustivel" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos", "Reboco interior e exterior", "Assentar tijoleira e ceramica", "Fundacoes e vigas", "Acabamentos"], desc: "Pedreiro - casa com pa, alvenaria" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar e montar moveis em madeira", "Instalar portas", "Instalar janelas", "Instalar armarios", "Medir e cortar madeira", "Aplicar verniz e acabamento"], desc: "Portas, janelas, mobiliario madeira" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes", "Fabricar grades", "Soldar estruturas metalicas - maquina de soldar", "Instalar portoes", "Reparos em ferro"], desc: "Soldar, portoes, grades com maquina soldar" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico", "Instalar tomadas e interruptores", "Instalar iluminacao", "Passar cabos e fios", "Testar instalacao"], desc: "Instalacoes eletricas, quadro" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua", "Instalar esgotos", "Instalar sanita e lavatorio", "Reparar fugas"], desc: "Canalizacao e esgotos" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede (lixar e massajar)", "Pintura interior", "Pintura exterior", "Aplicar textura", "Pintar teto"], desc: "Pintura interior e exterior" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial", "Servicos administrativos", "Servicos tecnicos", "Assessoria juridica/contabil", "Marketing e comunicacao", "Formacao e treinamento"], desc: "Empresas, consultoria, servicos gerais" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Servico personalizado - descrever abaixo"], desc: "Formulario livre para cliente escrever descricao" },
};

const FORMAS_PAG = [
  { id:"mpesa", nome:"M-Pesa", num:"84 123 4567" },
  { id:"emola", nome:"e-Mola", num:"82 987 6543" },
  { id:"bim", nome:"BIM", num:"NIB 000100000012345678910" },
  { id:"bci", nome:"BCI", num:"NIB 000800000098765432110" },
];

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

  const L = T[lang];
  const modelo = MODELOS[tipo];

  const [form, setForm] = useState({
    empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", empregadorProvincia:"Maputo - Matola",
    trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"",
    salario:"15000", valorTotal:"45000", prazo:"25", localObra:"Matola, Machava", provincia:"Maputo - Matola",
    qtdPortas:"15", qtdJanelas:"0", material:"Madeira", quemFornece:"Contratado",
    metros:"120", formaPag:"mpesa", horaEntrada:"07:00", horaSaida:"16:00", dataInicio:new Date().toISOString().split("T")[0]
  });

  const upd=(k:string,v:any)=> setForm(p=>({...p,[k]:v} as any));
  const toggleTarefa=(t:string)=> setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const mudarTipo=(novo:TipoContrato)=>{ setTipo(novo); setTarefasSel(MODELOS[novo].checklist.slice(0,2)); setTarefasExtra(""); setDescricaoLivre(""); setGerado(false); };
  const todasTarefas = useMemo(()=>{ const extra=tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean); const livre=descricaoLivre? [descricaoLivre] : []; return [...tarefasSel, ...extra, ...livre]; },[tarefasSel,tarefasExtra,descricaoLivre]);

  const profissionaisFiltrados = useMemo(()=>{
    if(filtroCat==="Todas") return PROFISSIONAIS;
    return PROFISSIONAIS.filter(p=>p.cat===filtroCat || (filtroCat==="Servicos" && p.cat==="Servicos"));
  },[filtroCat]);

  const resetAll=()=>{ setTarefasSel(modelo.checklist.slice(0,2)); setTarefasExtra(""); setDescricaoLivre(""); setGerado(false); window.scrollTo({top:0,behavior:"smooth"}); };

  const gerarPDF=async()=>{
    setGerando(true);
    try{
      let jsPDF:any;
      try{ const m=await import("jspdf"); jsPDF=m.jsPDF||m.default; }catch{
        await new Promise<void>((res)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"; s.onload=()=>res(); document.head.appendChild(s); });
        jsPDF=(window as any).jspdf.jsPDF;
      }
      const doc=new jsPDF({unit:"mm",format:"a4"});
      const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(), M=20, CW=W-M*2;
      let y=M;
      const check=(n=15)=>{ if(y+n>H-20){doc.addPage(); y=M;} };
      const add=(txt:string,fs=10,bold=false,ind=0)=>{ const cl=semAcento(txt); doc.setFontSize(fs); doc.setFont("helvetica",bold?"bold":"normal"); const ls=doc.splitTextToSize(cl,CW-ind); for(const l of ls){check(6); doc.text(l,M+ind,y); y+=5.5;} };
      doc.setFillColor(0,166,81); doc.rect(0,0,W,16,"F"); doc.setTextColor(255,255,255); doc.setFontSize(14); doc.setFont("helvetica","bold"); doc.text("CONTRATA.MZ",M,10); doc.setFontSize(9); doc.text(lang==="pt"?"Contrato Formal":"Formal Contract",W-M,10,{align:"right"});
      y=24; doc.setTextColor(30,30,30);
      add(`${modelo.titulo} - ${tipo.toUpperCase()}`,13,true); y+=2; doc.setDrawColor(0,166,81); doc.line(M,y,W-M,y); y+=6;
      add(`Maputo, ${semAcento(new Date().toLocaleDateString(lang==="pt"?"pt-MZ":"en-US"))}`,10); y+=4;
      add(lang==="pt"?"1. IDENTIFICACAO DAS PARTES":"1. PARTIES IDENTIFICATION",11,true); y+=1;
      add(`EMPREGADOR/EMPRESA: ${form.empregadorNome}, BI/NUIT ${form.empregadorBI}, Tel ${form.empregadorTel}, ${form.empregadorBairro} - ${form.empregadorProvincia}.`,10); y+=1;
      add(`TRABALHADOR/EMPRESA: ${form.trabalhadorNome}, BI/NUIT ${form.trabalhadorBI}, Tel ${form.trabalhadorTel}, Funcao ${tipo}.`,10); y+=5;
      add(lang==="pt"?"2. CONDICOES":"2. CONDITIONS",11,true); y+=1;
      add(`Funcao/Tipo: ${tipo} - Valor: ${form.valorTotal||form.salario} MZN - Prazo: ${form.prazo} dias`,10);
      add(`Local: ${form.localObra} - Provincia: ${form.provincia}`,10);
      if(tipo==="Carpinteiro") add(`Portas ${form.qtdPortas}, Janelas ${form.qtdJanelas}, Material ${form.material}, Fornecimento ${form.quemFornece}`,10);
      if(descricaoLivre) add(`Descricao livre: ${descricaoLivre}`,10);
      y+=5;
      add(lang==="pt"?"3. TAREFAS E RESPONSABILIDADES":"3. TASKS",11,true); y+=1;
      todasTarefas.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); y+=0.5; }); y+=5;
      add(lang==="pt"?"4. CLAUSULAS":"4. CLAUSES",11,true); y+=1;
      const taxa=Math.round(Number(form.valorTotal||form.salario)*0.05);
      const cls=[`CLAUSULA 1 - Objecto: ${tipo}.`, `CLAUSULA 2 - Local: ${form.localObra} - ${form.provincia}.`, `CLAUSULA 3 - Valor: ${form.valorTotal||form.salario} MZN via ${FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome}. Taxa 5% = ${taxa} MZN.`, `CLAUSULA 12 - Foro: Lei 13/2023 Mocambique.`];
      cls.forEach(c=>{check(18); add(c,9); y+=2;});
      y+=8; check(40); add(lang==="pt"?"Assinaturas:":"Signatures:",10,true); y+=10; const c1=M, c2=W/2+10; doc.line(c1,y+10,c1+55,y+10); doc.line(c2,y+10,c2+55,y+10); doc.setFontSize(8); doc.text(semAcento(form.empregadorNome),c1,y+14); doc.text(semAcento(form.trabalhadorNome),c2,y+14);
      const fn=`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-").toUpperCase()}.pdf`;
      doc.save(fn); setGerado(true);
      return {blob:doc.output("blob"), fileName:fn};
    } finally{ setGerando(false); }
  };

  const compartilhar=async()=>{
    const txt=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${form.trabalhadorNome} - ${form.valorTotal||form.salario} MZN - ${todasTarefas.join(", ")}`;
    try{
      const {blob,fileName}=await gerarPDF() as any;
      const file=new File([blob],fileName,{type:"application/pdf"});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({title:fileName, text:txt, files:[file]} as any); return;
      }
    }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-[1280px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[15px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500 tracking-widest">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div>
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-zinc-100 rounded-[10px]"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="pt"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="en"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>EN</button></div>
            <span className="hidden md:inline px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">Taxa 5% M-Pesa e-Mola Banco</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pt-4">
        <div className="bg-[#1a1a1a] text-white rounded-[16px] p-4 flex flex-col md:flex-row justify-between gap-3">
          <div><div className="text-[11px] font-bold tracking-widest text-white/60">{L.modeloNegocio}</div><div className="text-[15px] font-semibold mt-1 max-w-[560px]">{L.modeloDesc}</div><div className="text-[12px] text-white/60 mt-1">{L.modeloDetalhe}</div></div>
          <div className="flex gap-2"><div className="bg-white text-zinc-800 rounded-[12px] p-3 text-[11px] min-w-[120px]"><div className="font-bold text-[10px] tracking-widest text-zinc-500">{L.estados}</div><div className="mt-1 space-y-1"><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{L.rascunho}</div><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>{L.enviado}</div><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>{L.activo}</div><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>{L.terminado}</div></div></div><div className="bg-[#00a651] text-white rounded-[12px] p-3 text-[11px] min-w-[110px]"><div className="font-bold text-[10px] text-white/80">{L.fluxo}</div><div className="mt-1 leading-4 font-medium">{L.f1}<br/>{L.f2}<br/>{L.f3}<br/>{L.f4}</div></div></div>
        </div>

        <div className="mt-4 flex gap-2 p-1 bg-white border border-zinc-200 rounded-[14px] w-fit">
          <button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600 hover:bg-zinc-50"}`}>{L.encontrar} - {L.mercado}</button>
          <button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600 hover:bg-zinc-50"}`}>{L.contratos} - {L.biblioteca}</button>
          <button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600 hover:bg-zinc-50"}`}>{L.meus} - {L.gestao}</button>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 py-6">
        {tab==="encontrar" && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            <div className="bg-white border border-zinc-200 rounded-[16px] p-4 h-fit sticky top-[100px]">
              <div className="font-semibold text-[13px]">{L.filtros}</div>
              <div className="mt-4"><div className="text-[11px] font-bold text-zinc-500 uppercase">{L.categoria}</div><div className="mt-2 flex flex-wrap gap-1.5">{[L.todas,"Domestico","Construcao",L.servicos,L.consultoria,L.outros].map(cat=>{const active=filtroCat===cat || (cat===L.todas && filtroCat==="Todas"); return <button key={cat} onClick={()=>setFiltroCat(cat===L.todas?"Todas":cat)} className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${active?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-200"}`}>{cat}</button>})}</div></div>
              <div className="mt-4"><div className="text-[11px] font-bold text-zinc-500 uppercase">{L.provincia}</div><div className="mt-2 flex flex-wrap gap-1.5"><button className="px-3 py-1.5 rounded-full bg-[#00a651] text-white text-[11px]">{L.todas}</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">Maputo</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">Matola</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">Gaza</button></div></div>
              <div className="mt-4"><div className="text-[11px] font-bold text-zinc-500 uppercase">{L.avaliacao}</div><div className="mt-2 flex gap-1.5"><button className="px-3 py-1.5 rounded-full bg-[#00a651] text-white text-[11px]">{L.todas}</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">4.5+</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">4.8+</button></div></div>
              <div className="mt-4"><div className="text-[11px] font-bold text-zinc-500 uppercase">{L.disponibilidade}</div><div className="mt-2 flex gap-1.5"><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">{L.todas}</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">{L.disponivel}</button><button className="px-3 py-1.5 rounded-full bg-white border text-[11px]">{L.ocupado}</button></div></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profissionaisFiltrados.map(p=>(
                <div key={p.nome} className="bg-white border border-zinc-200 rounded-[16px] p-4 hover:shadow-md transition">
                  <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-[#00a651] text-white grid place-items-center font-bold text-[13px]">{p.ini}</div><div className="flex-1"><div className="flex items-center gap-2"><span className="font-semibold text-[13px]">{p.nome}</span><span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">{L.verificado}</span></div><div className="text-[11px] text-zinc-500">{p.func} - {p.local}</div><div className="text-[11px] mt-1">{p.nota} - {p.trab} - {p.anos}</div></div></div>
                  <div className="mt-3 flex items-center justify-between"><span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${p.disp==="Disponivel"?"bg-emerald-50 border border-emerald-200 text-emerald-700":"bg-amber-50 border border-amber-200 text-amber-700"}`}>{p.disp}</span><span className="text-[12px] font-semibold">{p.preco}</span></div>
                  <div className="mt-3 grid grid-cols-2 gap-2"><button className="h-[36px] rounded-[10px] border border-zinc-200 bg-white text-[12px] font-medium hover:bg-zinc-50">{L.verPerfil}</button><button onClick={()=>{setTab("contratos"); const map:any={Domestico:"Secretario/a Domestico/a", Construcao:"Pedreiro", Servicos:"Servicos/Consultoria"}; const t=map[p.cat]||"Carpinteiro"; setTipo(t as any);}} className="h-[36px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold hover:bg-[#008a43]">{L.contactar}</button></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4">
            <div className="bg-white border border-zinc-200 rounded-[16px] p-3 h-fit sticky top-[100px]">
              <div className="flex items-center justify-between"><span className="font-semibold text-[13px]">{L.bibliotecaTitulo}</span><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">ETAPA 2</span></div>
              <div className="text-[11px] text-zinc-500 mt-1">{L.contratoFormula}</div>
              <div className="mt-3 space-y-2">
                {(Object.keys(MODELOS) as TipoContrato[]).map(t=>{
                  const a=tipo===t;
                  return <button key={t} onClick={()=>mudarTipo(t)} className={`w-full text-left p-3 rounded-[12px] border flex gap-2.5 items-start ${a?"bg-emerald-50 border-emerald-300":"bg-white border-zinc-200 hover:bg-zinc-50"}`}><div className="w-7 h-7 rounded-full bg-white border border-zinc-200 grid place-items-center text-[11px] font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500 line-clamp-1">{MODELOS[t].desc}</div></div><div className={`w-4 h-4 rounded-full border grid place-items-center text-[10px] ${a?"bg-[#00a651] border-[#00a651] text-white":"border-zinc-300"}`}>{a?"v":""}</div></button>
                })}
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[16px] p-5">
              <h3 className="font-bold text-[14px]">{modelo.titulo}</h3>
              <div className="text-[11px] text-zinc-500 mt-1">{modelo.desc} - {modelo.checklist.length} tarefas especificas + descricao livre</div>

              <div className="mt-5 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-3">
                  <div className="font-semibold text-[12px] text-blue-800">{L.dadosContratante}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto}</label><input value={form.empregadorNome} onChange={e=>upd("empregadorNome",e.target.value)} placeholder="Michaque Moises / Empresa XYZ Lda" className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.bi}</label><input value={form.empregadorBI} onChange={e=>upd("empregadorBI",e.target.value)} placeholder="BI / NUIT" className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.empregadorTel} onChange={e=>upd("empregadorTel",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.localBairro}</label><input value={form.empregadorBairro} onChange={e=>upd("empregadorBairro",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div className="col-span-2"><label className="text-[10px] font-bold uppercase">{L.provinciaField}</label><select value={form.empregadorProvincia} onChange={e=>upd("empregadorProvincia",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[12px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3">
                  <div className="font-semibold text-[12px] text-emerald-800">{L.dadosContratado} - {tipo}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto}</label><input value={form.trabalhadorNome} onChange={e=>upd("trabalhadorNome",e.target.value)} placeholder="Zefanias / Construtora ABC" className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.bi}</label><input value={form.trabalhadorBI} onChange={e=>upd("trabalhadorBI",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.trabalhadorTel} onChange={e=>upd("trabalhadorTel",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Funcao / Tipo</label><input value={tipo} disabled className="mt-1 w-full h-[36px] px-3 rounded-[10px] border bg-zinc-100 text-[12px] font-semibold" /></div>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
                  <div className="font-semibold text-[12px]">{L.condicoes} - {tipo}</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase">{L.valorTotal}</label><input value={form.valorTotal} onChange={e=>{upd("valorTotal",e.target.value); upd("salario",e.target.value)}} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px] font-semibold" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.prazo}</label><input value={form.prazo} onChange={e=>upd("prazo",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.localBairro}</label><input value={form.localObra} onChange={e=>upd("localObra",e.target.value)} placeholder="Xai-Xai, Machava, Polana..." className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[12px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">{L.provinciaField}</label><select value={form.provincia} onChange={e=>upd("provincia",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[12px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
                  <div className="font-semibold text-[12px]">{L.tarefas} - {tipo}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {modelo.checklist.map(t=>{
                      const ativo=tarefasSel.includes(t);
                      return <button key={t} onClick={()=>toggleTarefa(t)} className={`px-3 py-1.5 rounded-full text-[11px] border ${ativo?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-200 hover:bg-zinc-50"}`}>{t}</button>
                    })}
                  </div>
                  <div className="mt-3"><label className="text-[10px] font-bold uppercase">{L.acrescentar}</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} placeholder="Ex: Instalar 15 portas e janelas, Aplicar verniz e acabamento" className="mt-1 w-full min-h-[60px] p-3 rounded-[10px] border border-zinc-200 text-[12px]" /></div>
                  {(tipo==="Servicos/Consultoria" || tipo==="Outros/Particular") && (
                    <div className="mt-3"><label className="text-[10px] font-bold uppercase">{L.descricaoLivre} - Formulario particular</label><textarea value={descricaoLivre} onChange={e=>setDescricaoLivre(e.target.value)} placeholder="Escreva aqui livremente as actividades: Ex: Empresa XYZ contrata para consultoria contabil mensal..." className="mt-1 w-full min-h-[90px] p-3 rounded-[10px] border-2 border-blue-200 bg-blue-50/30 text-[12px]" /></div>
                  )}
                  <div className="mt-2 text-[11px] text-zinc-600">Total {todasTarefas.length} tarefas: {todasTarefas.join(", ")}</div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
                  <div className="text-[11px] font-semibold">{L.formaPag}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">{FORMAS_PAG.map(f=>{const a=form.formaPag===f.id; return <button key={f.id} onClick={()=>upd("formaPag",f.id)} className={`text-left p-2.5 rounded-[10px] border ${a?"border-[#00a651] bg-emerald-50 ring-2 ring-emerald-100":"bg-zinc-50 border-zinc-200"}`}><div className="text-[11px] font-semibold">{f.nome}</div><div className="text-[10px] font-mono mt-1">{f.num}</div></button>})}</div>
                </div>

                <div className="flex gap-2"><button onClick={()=>setTab("encontrar")} className="h-[44px] w-[44px] rounded-[12px] bg-white border border-zinc-200 grid place-items-center font-bold"><- </button><button disabled={gerando} onClick={compartilhar} className="flex-1 h-[44px] rounded-[12px] bg-[#00a651] text-white font-semibold text-[13px]">{gerando?"Gerando...":`${L.gerar} - ${tipo}`}</button></div>

                {gerado && (<div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3"><div className="text-[12px] font-semibold text-emerald-800">Contrato gerado com sucesso</div><div className="mt-2 grid grid-cols-3 gap-2"><button onClick={()=>gerarPDF()} className="h-[36px] rounded-[8px] bg-white border text-[11px]">Baixar de novo</button><button onClick={compartilhar} className="h-[36px] rounded-[8px] bg-[#00a651] text-white text-[11px]">WhatsApp com PDF</button><button onClick={resetAll} className="h-[36px] rounded-[8px] bg-[#2563eb] text-white text-[11px]">{L.novo}</button></div><div className="mt-2 flex gap-2"><button onClick={resetAll} className="flex-1 h-[32px] rounded-[8px] bg-white border text-[10px]">{L.voltar} inicio</button><button onClick={resetAll} className="flex-1 h-[32px] rounded-[8px] bg-white border text-[10px]">{L.reiniciar}</button></div></div>)}
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[16px] p-4 h-fit sticky top-[100px]">
              <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">{L.preview} - {tipo}</span><span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">GERADO</span></div>
              <div className="text-[10px] text-zinc-500 mt-1">{modelo.titulo}</div>
              <div className="mt-3 h-[600px] overflow-auto bg-[#f8fafc] border border-zinc-200 rounded-[10px] p-3 text-[10px] font-mono leading-relaxed">
                {modelo.titulo} - {tipo.toUpperCase()}<br/><br/>
                1. {L.dadosContratante}<br/>{form.empregadorNome}, BI {form.empregadorBI}, {form.empregadorBairro} - {form.empregadorProvincia}<br/><br/>
                2. {L.dadosContratado}<br/>{form.trabalhadorNome}, BI {form.trabalhadorBI}, {tipo}<br/><br/>
                3. CONDICOES - {form.valorTotal} MZN - {form.localObra} - {form.provincia}<br/><br/>
                4. TAREFAS ({todasTarefas.length})<br/>{todasTarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>
                Taxa 5% = {Math.round(Number(form.valorTotal||15000)*0.05)} MZN<br/>
                {FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome} {FORMAS_PAG.find(f=>f.id===form.formaPag)?.num}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h-[38px] rounded-[10px] bg-[#2563eb] text-white text-[12px] font-semibold">Ver PDF</button><button onClick={compartilhar} className="h-[38px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">WhatsApp</button></div>
            </div>
          </div>
        )}

        {tab==="meus" && (
          <div className="bg-white border border-zinc-200 rounded-[16px] p-6">
            <div className="flex items-center justify-between"><div><div className="font-bold text-[16px]">{L.meus} - {L.gestao}</div><div className="text-[12px] text-zinc-500 mt-1">Rascunho, Enviado, Activo, Terminado - todos os contratos salvos</div></div><button onClick={()=>setTab("contratos")} className="px-4 py-2 rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">+ Novo contrato</button></div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-3"><div className="text-[11px] font-bold text-amber-800">Rascunho (2)</div><div className="mt-2 text-[11px]">Zefanias - Carpinteiro<br/>Maria Langa - Domestica</div></div>
              <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-3"><div className="text-[11px] font-bold text-blue-800">Enviado (1)</div><div className="mt-2 text-[11px]">Joao Manuel - Carpinteiro</div></div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3"><div className="text-[11px] font-bold text-emerald-800">Activo (3)</div><div className="mt-2 text-[11px]">Pedro Massingue - Pedreiro<br/>Esperanca Cossa - Eletricista<br/>Servicos Lda - Consultoria</div></div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-[12px] p-3"><div className="text-[11px] font-bold text-zinc-700">Terminado (5)</div><div className="mt-2 text-[11px]">Varios contratos concluidos</div></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
