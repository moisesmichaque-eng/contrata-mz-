import { useState, useMemo, useRef } from "react";
const ESSE_LOGO = "data:image/png;base64,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";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
type Lang = "pt" | "en";
type Pagina = 1|2|3|4|5|6;
const T = {
  pt: {
    encontrar: "ENCONTRAR", mercado: "Mercado", contratos: "CONTRATOS", biblioteca: "Biblioteca", meus: "MEUS CONTRATOS", gestao: "Gestao",
    modeloNegocio: "MODELO DE NEGOCIO - TRUST FIRST", modeloDesc: "Mercado digital mocambicano onde cada servico termina com contrato formal, seguro e enviado por WhatsApp.", modeloDetalhe: "FASE LANCAMENTO: FREE para testar + PAGO 200MT fixo. Agora com anexos e multi-paginas.",
    estados: "ESTADOS", rascunho: "Rascunho", enviado: "Enviado", activo: "Activo", terminado: "Terminado",
    fluxo: "FLUXO", f1: "Encontrar ->", f2: "Negociar ->", f3: "Contrato ->", f4: "WhatsApp",
    filtros: "Filtros Inteligentes", categoria: "CATEGORIA", todas: "Todas", domestico: "Domestico", construcao: "Construcao", servicos: "Servicos", consultoria: "Consultoria", outros: "Outros",
    provincia: "PROVINCIA", avaliacao: "AVALIACAO", disponibilidade: "DISPONIBILIDADE", disponivel: "Disponivel", ocupado: "Ocupado",
    verPerfil: "Ver Perfil", contactar: "Contactar", verificado: "Verificado",
    bibliotecaTitulo: "Biblioteca 10+ MVP", contratoFormula: "CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS + ANEXOS",
    dadosContratante: "1. DADOS DO CONTRATANTE (Empregador/Empresa)",
    dadosContratado: "2. DADOS DO CONTRATADO (Trabalhador/Empresa)",
    condicoes: "3. CONDICOES ESPECIFICAS",
    tarefas: "4. TAREFAS E RESPONSABILIDADES - Checklist",
    anexos: "5. ANEXOS - Fotos, Projetos, Documentos",
    acrescentar: "Acrescentar tarefas / Descricao livre",
    formaPag: "Forma de pagamento - Taxa Plataforma",
    preview: "Preview Dinamico - Sempre Aberto",
    gerar: "Gerar PDF + WhatsApp",
    voltar: "<- Voltar", novo: "Novo contrato", reiniciar: "Reiniciar",
    nomeCompleto: "Nome completo / Empresa", bi: "Numero BI / NUIT", contacto: "Contacto", localBairro: "Local / Bairro", provinciaField: "Provincia",
    valorTotal: "Valor Total MZN", prazo: "Prazo dias", salario: "Salario mensal MT", descricaoLivre: "Descricao livre",
    modoFree: "MODO FREE", modoPago: "MODO PAGO 200MT",
    freeDesc: "Gratis para testar", pagoDesc: "Valor unico 200MT qualquer contrato",
    taxa200: "Taxa Fixa 200MT",
    pag1: "Pag 1 - Contratante", pag2: "Pag 2 - Contratado", pag3: "Pag 3 - Condicoes", pag4: "Pag 4 - Tarefas", pag5: "Pag 5 - Anexos", pag6: "Pag 6 - Preview",
    proximo: "Proximo ->", anterior: "<- Anterior",
    anexarTitulo: "Anexar Documentos, Fotos ou Projetos",
    anexarDesc: "Ex: Foto da casa para pedreiro, projeto de construcao, foto da porta para carpinteiro, planta, orcamento",
    arraste: "Arraste fotos ou clique para anexar",
    tiposAceitos: "Aceita: JPG, PNG, PDF, DOC (max 5MB cada)",
    anexosAdicionados: "Anexos adicionados",
    nenhumAnexo: "Nenhum anexo ainda. Ex: Para pedreiro - foto da obra, para carpinteiro - foto da porta desejada"
  },
  en: {
    encontrar: "FIND", mercado: "Market", contratos: "CONTRACTS", biblioteca: "Library", meus: "MY CONTRACTS", gestao: "Management",
    modeloNegocio: "BUSINESS MODEL - TRUST FIRST", modeloDesc: "Mozambican digital market - FREE + PAID 200MT fixed. Now with attachments and multi-pages.", modeloDetalhe: "LAUNCH: FREE to test + PAID 200MT fixed.",
    estados: "STATUS", rascunho: "Draft", enviado: "Sent", activo: "Active", terminado: "Finished",
    fluxo: "FLOW", f1: "Find ->", f2: "Negotiate ->", f3: "Contract ->", f4: "WhatsApp",
    filtros: "Smart Filters", categoria: "CATEGORY", todas: "All", domestico: "Domestic", construcao: "Construction", servicos: "Services", consultoria: "Consulting", outros: "Others",
    provincia: "PROVINCE", avaliacao: "RATING", disponibilidade: "AVAILABILITY", disponivel: "Available", ocupado: "Busy",
    verPerfil: "View Profile", contactar: "Contact", verificado: "Verified",
    bibliotecaTitulo: "Library 10+ MVP", contratoFormula: "CONTRACT = MODEL + FIELDS + RULES + CLAUSES + ATTACHMENTS",
    dadosContratante: "1. CLIENT DATA", dadosContratado: "2. CONTRACTOR DATA",
    condicoes: "3. SPECIFIC CONDITIONS", tarefas: "4. TASKS", anexos: "5. ATTACHMENTS - Photos, Projects, Docs",
    acrescentar: "Add tasks", formaPag: "Payment - Platform Fee",
    preview: "Dynamic Preview - Always Open", gerar: "Generate PDF + WhatsApp", voltar: "<- Back", novo: "New contract", reiniciar: "Restart",
    nomeCompleto: "Full name / Company", bi: "ID Number", contacto: "Contact", localBairro: "Location", provinciaField: "Province",
    valorTotal: "Total Value MZN", prazo: "Deadline days", salario: "Monthly salary MT", descricaoLivre: "Free description",
    modoFree: "FREE MODE", modoPago: "PAID MODE 200MT", freeDesc: "Free to test", pagoDesc: "Fixed 200MT any contract", taxa200: "Fixed Fee 200MT",
    pag1: "Page 1 - Client", pag2: "Page 2 - Contractor", pag3: "Page 3 - Conditions", pag4: "Page 4 - Tasks", pag5: "Page 5 - Attachments", pag6: "Page 6 - Preview",
    proximo: "Next ->", anterior: "<- Previous",
    anexarTitulo: "Attach Documents, Photos or Projects",
    anexarDesc: "Ex: Photo of house for mason, construction project, door photo for carpenter, blueprint, budget",
    arraste: "Drag photos or click to attach",
    tiposAceitos: "Accepts: JPG, PNG, PDF, DOC (max 5MB each)",
    anexosAdicionados: "Attachments added", nenhumAnexo: "No attachments yet. Ex: For mason - photo of work, for carpenter - photo of desired door"
  }
};
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";
const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa","Lavar louca e organizar cozinha - zelar pela louca, repor se partir por negligencia","Arrumar quartos e fazer camas","Lavar, passar e dobrar roupa","Organizar despensa e fazer compras","Cozinhar refeicoes","Zelar pelos utensilios, louca e eletrodomesticos - avisar quebras","Nao se responsabiliza por quebra de louca antiga/desgastada salvo negligencia grave","Cuidar de criancas/idosos conforme combinado"], desc: "Domestico - inclui clausula louca" },
  "Motorista Particular": { titulo: "CONTRATO - MOTORISTA PARTICULAR", checklist: ["Conduzir empregador e familia","Manter viatura limpa e abastecida","Verificar oleo, agua, pneus","Fazer recados e compras"], desc: "Motorista" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos","Reboco interior e exterior","Assentar tijoleira e ceramica","Fundacoes e vigas","Acabamentos","Seguir projeto/foto anexa"], desc: "Pedreiro - anexar foto/projeto" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar e montar moveis em madeira","Instalar portas","Instalar janelas","Instalar armarios","Medir e cortar madeira","Aplicar verniz e acabamento","Seguir modelo da foto anexa"], desc: "Portas, janelas - anexar foto modelo" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes","Fabricar grades","Soldar estruturas metalicas","Instalar portoes","Reparos em ferro","Seguir desenho anexo"], desc: "Soldar, portoes - anexar desenho" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico","Instalar tomadas e interruptores","Instalar iluminacao","Passar cabos e fios","Testar instalacao","Seguir planta eletrica anexa"], desc: "Eletrica - anexar planta" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua","Instalar esgotos","Instalar sanita e lavatorio","Reparar fugas","Seguir projeto hidraulico anexo"], desc: "Canalizacao" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede","Pintura interior","Pintura exterior","Aplicar textura","Pintar teto","Usar cor conforme foto anexa"], desc: "Pintura - anexar foto cor" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial","Servicos administrativos","Servicos tecnicos","Assessoria juridica/contabil","Marketing e comunicacao","Formacao e treinamento","Seguir briefing anexo"], desc: "Empresas - anexar briefing" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Servico personalizado - descrever abaixo","Seguir anexo como referencia"], desc: "Formulario livre - anexar referencia" },
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
type Anexo = { id:string, nome:string, tipo:string, tamanho:string, url:string, file?:File };
export default function App(){
  const [lang, setLang] = useState<Lang>("pt");
  const [tab, setTab] = useState<"encontrar"|"contratos"|"meus">("encontrar");
  const [tipo, setTipo] = useState<TipoContrato>("Secretario/a Domestico/a");
  const [tarefasSel, setTarefasSel] = useState<string[]>(MODELOS["Secretario/a Domestico/a"].checklist.slice(0,3));
  const [tarefasExtra, setTarefasExtra] = useState("");
  const [descricaoLivre, setDescricaoLivre] = useState("");
  const [gerando, setGerando] = useState(false);
  const [gerado, setGerado] = useState(false);
  const [filtroCat, setFiltroCat] = useState("Todas");
  const [modo, setModo] = useState<"free"|"pago">("free");
  const [pagina, setPagina] = useState<Pagina>(1);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [showPagamento, setShowPagamento] = useState(false);
  const [metodoPag, setMetodoPag] = useState<"mpesa"|"emola"|"mkesh"|"banco">("mpesa");
  const [processandoPag, setProcessandoPag] = useState(false);
  const [telefonePag, setTelefonePag] = useState("");
  const [showPinPopup, setShowPinPopup] = useState(false);
  const L = T[lang]; const modelo = MODELOS[tipo];
  const [form, setForm] = useState({ empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", empregadorProvincia:"Maputo - Matola", trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"", salario:"8000", valorTotal:"8000", prazo:"30", localObra:"Maputo, Polana", provincia:"Maputo - Matola" });
  const todasTarefas = useMemo(()=>{ const extra=tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean); const livre=descricaoLivre? [descricaoLivre] : []; return [...tarefasSel,...extra,...livre]; },[tarefasSel,tarefasExtra,descricaoLivre]);
  const profissionaisFiltrados = useMemo(()=>{ if(filtroCat==="Todas") return PROFISSIONAIS; return PROFISSIONAIS.filter(p=>p.cat===filtroCat); },[filtroCat]);
  const handleFiles = (files: FileList | null) => {
    if(!files) return;
    const novos: Anexo[] = Array.from(files).slice(0,5).map(f=>{
      const url = f.type.startsWith("image/") ? URL.createObjectURL(f) : "";
      return { id: Math.random().toString(36).slice(2), nome: f.name, tipo: f.type, tamanho: (f.size/1024/1024).toFixed(2)+" MB", url, file: f };
    });
    setAnexos(prev=>[...prev, ...novos].slice(0,10));
  };
  const removerAnexo = (id:string) => setAnexos(prev=>prev.filter(a=>a.id!==id));
  const resetAll=()=>{ setTarefasSel(modelo.checklist.slice(0,2)); setTarefasExtra(""); setDescricaoLivre(""); setGerado(false); setAnexos([]); setPagina(1); window.scrollTo({top:0,behavior:"smooth"}); };
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
      // Pagina 1
      add("PAGINA 1 - DADOS DO CONTRATANTE",11,true); y+=1;
      add(`EMPREGADOR: ${form.empregadorNome}, BI ${form.empregadorBI}, Tel ${form.empregadorTel}, ${form.empregadorBairro} - ${form.empregadorProvincia}`,10); y+=5;
      add("PAGINA 2 - DADOS DO CONTRATADO",11,true); y+=1;
      add(`TRABALHADOR: ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, Tel ${form.trabalhadorTel}, Funcao ${tipo}`,10); y+=5;
      add("PAGINA 3 - CONDICOES",11,true); y+=1;
      add(`Valor: ${form.valorTotal||form.salario} MZN - Prazo: ${form.prazo} dias - Local: ${form.localObra} - ${form.provincia}`,10); y+=5;
      add(`PAGINA 4 - TAREFAS (${todasTarefas.length})`,11,true); y+=1; todasTarefas.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); }); y+=5;
      if(tipo==="Secretario/a Domestico/a"){ add("CLAUSULA LOUCA: Zelar pela louca, avisar quebras acidentais. Nao paga quebra acidental salvo negligencia grave - max 25% salario parcelado.",9,true); y+=3; }
      add(`PAGINA 5 - ANEXOS (${anexos.length})`,11,true); y+=1;
      if(anexos.length===0){ add("Nenhum anexo. Cliente pode anexar foto do servico desejado, projeto, planta, etc.",9); }
      else { anexos.forEach((a,i)=>{ add(`${i+1}. ${a.nome} - ${a.tamanho} - ${a.tipo}`,9); }); add("Nota: Fotos e projetos anexados fazem parte integrante deste contrato. Ver arquivos enviados via WhatsApp junto com PDF.",9); }
      y+=5;
      add(`PAGINA 6 - PREVIEW E ASSINATURAS - MODO: ${modo==="free"?"FREE - Lancamento Gratis":"PAGO 200MT Fixo"} - ${new Date().toLocaleDateString()}`,9,true); y+=8;
      check(40); add("Assinaturas:",10,true); y+=10; const c1=M, c2=W/2+10; doc.line(c1,y+10,c1+55,y+10); doc.line(c2,y+10,c2+55,y+10); doc.setFontSize(8); doc.text(semAcento(form.empregadorNome),c1,y+14); doc.text(semAcento(form.trabalhadorNome),c2,y+14);
      doc.save(`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-")}-${pagina}pag.pdf`); setGerado(true);
      return {blob:doc.output("blob"), fileName:`Contrato-${form.trabalhadorNome}.pdf`};
    } finally{ setGerando(false); }
  };
  const compartilhar=async()=>{
    if(modo==="pago"){ setShowPagamento(true); return; }
    const txt=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${form.trabalhadorNome} - ${form.valorTotal} MZN - ${todasTarefas.length} tarefas - ${anexos.length} anexos - MODO FREE`;
    try{ const {blob,fileName}=await gerarPDF() as any; const file=new File([blob],fileName,{type:"application/pdf"}); if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({title:fileName, text:txt, files:[file]} as any); return; } }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };
  const confirmarPagamento200 = async () => {
    if((metodoPag==="mpesa"||metodoPag==="emola"||metodoPag==="mkesh") && !telefonePag){ alert("Digite seu numero"); return; }
    setProcessandoPag(true); await new Promise(r=>setTimeout(r,1500));
    if(metodoPag!=="banco"){ setShowPinPopup(true); setTimeout(async ()=>{ setShowPinPopup(false); setProcessandoPag(false); setShowPagamento(false); await gerarPDF(); }, 3000); }
    else { await new Promise(r=>setTimeout(r,1000)); setProcessandoPag(false); setShowPagamento(false); await gerarPDF(); }
  };
  const podeAvancar = () => {
    if(pagina===1) return form.empregadorNome && form.empregadorBI;
    if(pagina===2) return form.trabalhadorNome;
    if(pagina===3) return form.valorTotal || form.salario;
    return true;
  };
  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white border-b shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[72px] flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold text-[16px]">C</div><div><div className="font-bold text-[15px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500 mt-0.5">ENCONTRE. NEGOCIE. FORMALIZE.</div><div className="text-[8px] text-zinc-400 font-semibold">Um projeto da ESSE</div></div></div><div className="flex items-center gap-3"><div className="hidden md:flex flex-col items-end mr-2"><span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Projeto de</span><span className="text-[11px] font-bold text-[#0f172a]">ESSE - Energy Solutions</span><span className="text-[8px] text-zinc-500">NUIT 401 866 876 | Xai-Xai</span></div><img src={ESSE_LOGO} alt="ESSE Energy Solutions & Services" className="h-[42px] md:h-[48px] w-auto object-contain" /><div className="flex p-1 bg-zinc-100 rounded-[10px] ml-1"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="pt"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded-[8px] text-[11px] font-semibold ${lang==="en"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>EN</button></div></div></div></header>
      <div className="mx-auto max-w-[1280px] px-4 pt-4">
        <div className="bg-gradient-to-r from-[#0033a0] via-[#2563eb] to-[#00a651] text-white rounded-[16px] p-4 flex flex-col md:flex-row justify-between gap-3 shadow-lg"><div><div className="text-[11px] font-bold text-white/60">{L.modeloNegocio}</div><div className="text-[15px] font-semibold mt-1 max-w-[560px]">{L.modeloDesc}</div><div className="text-[12px] text-white/60 mt-1">{L.modeloDetalhe}</div></div><div className="flex gap-2"><div className="bg-white text-zinc-800 rounded-[12px] p-3 text-[11px] min-w-[120px]"><div className="font-bold text-[10px]">{L.estados}</div><div className="mt-1">{L.rascunho} | {L.enviado}</div></div><div className="bg-[#00a651] text-white rounded-[12px] p-3 text-[11px] min-w-[110px]"><div className="font-bold text-[10px]">{L.fluxo}</div><div className="mt-1">{L.f1} {L.f2} {L.f3} {L.f4}</div></div></div></div>
        <div className="mt-4 flex flex-col lg:flex-row gap-3">
          <div className="flex gap-2 p-1 bg-white border rounded-[14px] w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.encontrar} - {L.mercado}</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>{L.contratos} - {L.biblioteca}</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600"}`}>{L.meus} - {L.gestao}</button></div>
          {tab==="contratos" && (<div className="flex p-1 bg-amber-50 border-2 border-amber-200 rounded-[14px] w-fit"><button onClick={()=>setModo("free")} className={`px-4 py-2 rounded-[10px] text-[12px] font-bold ${modo==="free"?"bg-[#00a651] text-white":"text-zinc-700"}`}>{L.modoFree}</button><button onClick={()=>setModo("pago")} className={`px-4 py-2 rounded-[10px] text-[12px] font-bold ${modo==="pago"?"bg-[#2563eb] text-white":"text-zinc-700"}`}>{L.modoPago}</button></div>)}
        </div>
        {tab==="contratos" && (
          <div className="mt-4 bg-white border rounded-[14px] p-2 flex gap-1 overflow-auto">
            {[1,2,3,4,5,6].map(p=>{
              const tit = p===1?L.pag1:p===2?L.pag2:p===3?"Pag 3 - Condicoes":p===4?L.tarefas:p===5?L.anexos:"Pag 6 - Preview";
              const ativo = pagina===p;
              return <button key={p} onClick={()=>setPagina(p as Pagina)} className={`px-3 py-2 rounded-[10px] text-[11px] font-semibold whitespace-nowrap ${ativo?"bg-[#2563eb] text-white":"bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{p}. {tit} {p===5 && anexos.length>0 ? `(${anexos.length})`:""}</button>
            })}
          </div>
        )}
      </div>
      <main className="mx-auto max-w-[1280px] px-4 py-6">
        {tab==="encontrar" && (<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4"><div className="bg-white border rounded-[16px] p-4 h-fit"><div className="font-semibold text-[13px]">{L.filtros}</div><div className="mt-4 flex flex-wrap gap-1.5">{[L.todas,"Domestico","Construcao","Servicos","Consultoria","Outros"].map(cat=>{const active=filtroCat===cat || (cat===L.todas && filtroCat==="Todas"); return <button key={cat} onClick={()=>setFiltroCat(cat===L.todas?"Todas":cat)} className={`px-3 py-1.5 rounded-full text-[11px] border ${active?"bg-[#00a651] text-white border-[#00a651]":"bg-white"}`}>{cat}</button>})}</div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{profissionaisFiltrados.map(p=>(<div key={p.nome} className="bg-white border rounded-[16px] p-4"><div className="flex items-start gap-3"><div className="w-10 h-10 rounded-full bg-[#00a651] text-white grid place-items-center font-bold">{p.ini}</div><div><div className="font-semibold text-[13px]">{p.nome}</div><div className="text-[11px] text-zinc-500">{p.func} - {p.local}</div><div className="text-[11px] mt-1">{p.nota} - {p.trab}</div></div></div><div className="mt-3 flex justify-between"><span className="px-2.5 py-1 rounded-full bg-emerald-50 border text-[11px]">{p.disp}</span><span className="text-[12px] font-semibold">{p.preco}</span></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-[36px] rounded-[10px] border text-[12px]">{L.verPerfil}</button><button onClick={()=>{setTab("contratos"); setPagina(1);}} className="h-[36px] rounded-[10px] bg-[#00a651] text-white text-[12px]">{L.contactar}</button></div></div>))}</div></div>)}
        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4">
            <div className="bg-white border rounded-[16px] p-3 h-fit lg:sticky lg:top-[100px]"><div className="flex items-center justify-between"><div className="font-semibold text-[13px]">{L.bibliotecaTitulo} - Escolhido: {tipo}</div><button onClick={()=>setBibAberta(!bibAberta)} className="lg:hidden px-3 py-1 rounded-[8px] bg-zinc-100 text-[11px] font-bold">{bibAberta?"Fechar X":"Trocar"}</button></div><div className="text-[10px] text-zinc-500 mt-1">{L.contratoFormula}</div><div className={`${bibAberta?"block":"hidden lg:block"} mt-3 space-y-2`}>{(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const a=tipo===t; return <button key={t} onClick={()=>{setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,3)); setGerado(false); setPagina(1); setBibAberta(false); formRef.current?.scrollIntoView({behavior:"smooth"});}} className={`w-full text-left p-3 rounded-[12px] border flex gap-2.5 ${a?"bg-emerald-50 border-emerald-300":"bg-white"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text-[11px] font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc}</div></div><div className={`w-4 h-4 rounded-full border grid place-items-center text-[10px] ${a?"bg-[#00a651] text-white":""}`}>{a?"v":""}</div></button>})}</div></div>
            <div ref={formRef} className="bg-white border rounded-[16px] p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold text-[14px]">{modelo.titulo} - Pagina {pagina}/6</h3><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${modo==="free"?"bg-emerald-100 text-emerald-700":"bg-blue-100 text-blue-700"}`}>{modo==="free"?"FREE":"200MT"}</span></div>
              <div className="mt-5">
                {pagina===1 && (<div className="space-y-4"><div className="bg-blue-50 border rounded-[12px] p-4"><div className="font-semibold text-[13px] text-blue-800">{L.dadosContratante} - {L.pag1}</div><div className="text-[11px] text-zinc-600 mt-1">Quem esta a contratar o servico</div><div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto} *</label><input value={form.empregadorNome} onChange={e=>setForm({...form, empregadorNome:e.target.value})} placeholder="Michaque Moises / Empresa XYZ" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.bi} *</label><input value={form.empregadorBI} onChange={e=>setForm({...form, empregadorBI:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.empregadorTel} onChange={e=>setForm({...form, empregadorTel:e.target.value})} placeholder="84xxxxxxx" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.localBairro}</label><input value={form.empregadorBairro} onChange={e=>setForm({...form, empregadorBairro:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div className="md:col-span-2"><label className="text-[10px] font-bold uppercase">{L.provinciaField}</label><select value={form.empregadorProvincia} onChange={e=>setForm({...form, empregadorProvincia:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div></div></div><div className="flex justify-end"><button disabled={!podeAvancar()} onClick={()=>setPagina(2)} className={`px-6 py-2.5 rounded-[10px] font-semibold text-[13px] ${podeAvancar()?"bg-[#2563eb] text-white":"bg-zinc-200 text-zinc-400"}`}>{L.proximo}</button></div></div>)}
                {pagina===2 && (<div className="space-y-4"><div className="bg-emerald-50 border rounded-[12px] p-4"><div className="font-semibold text-[13px] text-emerald-800">{L.dadosContratado} - {tipo} - {L.pag2}</div><div className="text-[11px] text-zinc-600 mt-1">Quem vai fazer o trabalho</div><div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">{L.nomeCompleto} *</label><input value={form.trabalhadorNome} onChange={e=>setForm({...form, trabalhadorNome:e.target.value})} placeholder="Zefanias / Maria Langa" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.bi}</label><input value={form.trabalhadorBI} onChange={e=>setForm({...form, trabalhadorBI:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">{L.contacto}</label><input value={form.trabalhadorTel} onChange={e=>setForm({...form, trabalhadorTel:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[13px]" /></div><div><label className="text-[10px] font-bold uppercase">Funcao / Tipo</label><input value={tipo} disabled className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 bg-zinc-100 text-[13px] font-semibold" /></div></div></div><div className="flex justify-between"><button onClick={()=>setPagina(1)} className="px-6 py-2.5 rounded-[10px] border font-semibold text-[13px]">{L.anterior}</button><button disabled={!podeAvancar()} onClick={()=>setPagina(3)} className={`px-6 py-2.5 rounded-[10px] font-semibold text-[13px] ${podeAvancar()?"bg-[#2563eb] text-white":"bg-zinc-200 text-zinc-400"}`}>{L.proximo}</button></div></div>)}
                {pagina===3 && (<div className="space-y-4"><div className="bg-white border-2 rounded-[12px] p-4"><div className="font-semibold text-[13px]">{L.condicoes} - {tipo} - Pag 3</div><div className="mt-3 grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold uppercase">{L.valorTotal}</label><input value={form.valorTotal} onChange={e=>setForm({...form, valorTotal:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 font-semibold" /></div><div><label className="text-[10px] font-bold uppercase">{L.prazo}</label><input value={form.prazo} onChange={e=>setForm({...form, prazo:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2" /></div><div className="col-span-2"><label className="text-[10px] font-bold uppercase">{L.localBairro} - Local da obra/servico</label><input value={form.localObra} onChange={e=>setForm({...form, localObra:e.target.value})} placeholder="Matola, Machava - descreva local" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2" /></div><div className="col-span-2"><label className="text-[10px] font-bold uppercase">{L.provinciaField}</label><select value={form.provincia} onChange={e=>setForm({...form, provincia:e.target.value})} className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div></div></div><div className="flex justify-between"><button onClick={()=>setPagina(2)} className="px-6 py-2.5 rounded-[10px] border font-semibold text-[13px]">{L.anterior}</button><button onClick={()=>setPagina(4)} className="px-6 py-2.5 rounded-[10px] bg-[#2563eb] text-white font-semibold text-[13px]">{L.proximo}</button></div></div>)}
                {pagina===4 && (<div className="space-y-4"><div className="bg-white border-2 rounded-[12px] p-4"><div className="font-semibold text-[13px]">{L.tarefas} - {tipo} - Pag 4</div>{tipo==="Secretario/a Domestico/a" && (<div className="mt-2 p-2 rounded-[8px] bg-amber-50 border border-amber-200 text-[11px]"><b>Clausula Louca:</b> Zela pela louca, avisa quebras, nao paga quebra acidental salvo negligencia grave max 25% salario.</div>)}<div className="mt-3 flex flex-wrap gap-2">{modelo.checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-2 rounded-full text-[11px] border text-left ${ativo?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-300 hover:bg-zinc-50"}`}>{t}</button>})}</div><div className="mt-4"><label className="text-[10px] font-bold uppercase">{L.acrescentar}</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} placeholder="Ex: Instalar 15 portas, aplicar verniz" className="mt-1 w-full min-h-[70px] p-3 rounded-[10px] border-2 text-[12px]" /></div><div className="mt-3"><label className="text-[10px] font-bold uppercase">{L.descricaoLivre}</label><textarea value={descricaoLivre} onChange={e=>setDescricaoLivre(e.target.value)} placeholder="Descricao livre para consultoria, empresas..." className="mt-1 w-full min-h-[100px] p-3 rounded-[10px] border-2 border-blue-200 bg-blue-50/30 text-[12px]" /></div><div className="mt-2 text-[11px] text-zinc-600">Total {todasTarefas.length} tarefas selecionadas</div></div><div className="flex justify-between"><button onClick={()=>setPagina(3)} className="px-6 py-2.5 rounded-[10px] border font-semibold text-[13px]">{L.anterior}</button><button onClick={()=>setPagina(5)} className="px-6 py-2.5 rounded-[10px] bg-[#2563eb] text-white font-semibold text-[13px]">{L.proximo} - Anexos</button></div></div>)}
                {pagina===5 && (
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-dashed border-blue-300 rounded-[16px] p-5">
                      <div className="font-bold text-[14px]">{L.anexarTitulo} - Pag 5</div>
                      <div className="text-[11px] text-zinc-600 mt-1">{L.anexarDesc}</div>
                      <div className="mt-4">
                        <label className="w-full min-h-[140px] border-2 border-dashed border-zinc-300 rounded-[12px] grid place-items-center p-6 cursor-pointer hover:bg-zinc-50 hover:border-[#00a651] transition">
                          <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e=>handleFiles(e.target.files)} />
                          <div className="text-center"><div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center mx-auto text-[20px]">+</div><div className="font-semibold text-[13px] mt-2">{L.arraste}</div><div className="text-[10px] text-zinc-500 mt-1">{L.tiposAceitos}</div></div>
                        </label>
                      </div>
                      <div className="mt-5">
                        <div className="font-semibold text-[12px]">{L.anexosAdicionados} ({anexos.length}/10)</div>
                        {anexos.length===0 ? (<div className="mt-2 p-4 rounded-[10px] bg-zinc-50 border text-[11px] text-zinc-500">{L.nenhumAnexo}<br/><br/><b>Exemplos:</b><br/>- Pedreiro: foto da casa/obra, projeto, planta<br/>- Carpinteiro: foto de porta/janela modelo<br/>- Eletricista: planta eletrica<br/>- Pintor: foto da cor desejada<br/>- Consultoria: briefing, documentos empresa</div>) : (
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                            {anexos.map(a=>(
                              <div key={a.id} className="border rounded-[10px] p-2 flex gap-2 items-center bg-white">
                                {a.url ? <img src={a.url} alt={a.nome} className="w-12 h-12 rounded-[8px] object-cover" /> : <div className="w-12 h-12 rounded-[8px] bg-blue-100 grid place-items-center text-[10px] font-bold">{a.nome.split(".").pop()?.toUpperCase()}</div>}
                                <div className="flex-1 min-w-0"><div className="text-[11px] font-semibold truncate">{a.nome}</div><div className="text-[10px] text-zinc-500">{a.tamanho}</div></div>
                                <button onClick={()=>removerAnexo(a.id)} className="w-7 h-7 rounded-full bg-red-50 text-red-600 grid place-items-center text-[12px]">x</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between"><button onClick={()=>setPagina(4)} className="px-6 py-2.5 rounded-[10px] border font-semibold text-[13px]">{L.anterior}</button><button onClick={()=>setPagina(6)} className="px-6 py-2.5 rounded-[10px] bg-[#00a651] text-white font-semibold text-[13px]">{L.proximo} - Preview Final</button></div>
                  </div>
                )}
                {pagina===6 && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[12px] p-4">
                      <div className="font-bold text-[13px]">Pag 6 - Preview Final + Gerar</div>
                      <div className="text-[11px] mt-1">Contrato: {form.empregadorNome} - {form.trabalhadorNome} | Valor: {form.valorTotal} MZN | Tarefas: {todasTarefas.length} | Anexos: {anexos.length}</div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {modo==="free" ? (<button disabled={gerando} onClick={compartilhar} className="h-[46px] rounded-[12px] bg-[#00a651] text-white font-bold text-[14px]">{gerando?"Gerando...":"Gerar PDF + WhatsApp - FREE"}</button>) : (<button onClick={()=>setShowPagamento(true)} className="h-[46px] rounded-[12px] bg-[#2563eb] text-white font-bold text-[14px]">Pagar 200MT - Gerar PDF</button>)}
                        <button onClick={resetAll} className="h-[46px] rounded-[12px] bg-white border-2 font-semibold text-[13px]">Novo Contrato</button>
                      </div>
                      {gerado && (<div className="mt-3 p-2 rounded-[8px] bg-white border text-[11px] text-emerald-700 font-semibold">PDF gerado com sucesso! {anexos.length>0 ? `${anexos.length} anexos serao enviados junto via WhatsApp` : ""}</div>)}
                    </div>
                    <div className="flex justify-start"><button onClick={()=>setPagina(5)} className="px-6 py-2.5 rounded-[10px] border font-semibold text-[13px]">{L.anterior} - Editar Anexos</button></div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white border rounded-[16px] p-4 h-fit sticky top-[140px]"><div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">{L.preview} - Pag {pagina}/6</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${modo==="free"?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-blue-50 border-blue-200 text-blue-700"}`}>{modo==="free"?"FREE":"200MT"} {anexos.length>0?`+${anexos.length} anexos`:""}</span></div><div className="mt-3 h-[620px] overflow-auto bg-[#f8fafc] border rounded-[10px] p-3 text-[10px] font-mono leading-relaxed">{modelo.titulo} - {tipo.toUpperCase()}<br/><br/>PAG 1 - CONTRATANTE:<br/>{form.empregadorNome} BI {form.empregadorBI}<br/>{form.empregadorBairro} - {form.empregadorProvincia}<br/><br/>PAG 2 - CONTRATADO:<br/>{form.trabalhadorNome} BI {form.trabalhadorBI}<br/>{tipo}<br/><br/>PAG 3 - CONDICOES:<br/>{form.valorTotal} MZN - {form.prazo} dias - {form.localObra} - {form.provincia}<br/><br/>PAG 4 - TAREFAS ({todasTarefas.length}):<br/>{todasTarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>{tipo==="Secretario/a Domestico/a" && (<>CLAUSULA LOUCA: Zela pela louca, nao paga quebra acidental salvo negligencia grave 25% max.<br/><br/></>)}PAG 5 - ANEXOS ({anexos.length}):<br/>{anexos.length===0?"Nenhum anexo":anexos.map((a,i)=>`${i+1}. ${a.nome} (${a.tamanho})`).join("<br/>")}<br/><br/>PAG 6 - MODO: {modo==="free"?"FREE Lancamento":"200MT Fixo"} - {new Date().toLocaleDateString()}<br/></div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h-[38px] rounded-[10px] bg-[#2563eb] text-white text-[12px] font-semibold">Baixar PDF {anexos.length>0?`+${anexos.length} anexos`:""}</button><button onClick={compartilhar} className="h-[38px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">WhatsApp</button></div><div className="mt-2 text-[10px] text-zinc-500">Multi-paginas: cada pagina do formulario vira secao no PDF. Anexos vao junto via WhatsApp.</div></div>
          </div>
        )}
        {tab==="meus" && (<div className="bg-white border rounded-[16px] p-6"><div className="font-bold text-[16px]">{L.meus} - {L.gestao}</div><div className="mt-2 text-[11px] text-zinc-500">Agora com {anexos.length} anexos no ultimo contrato - multi-paginas implementado</div><div className="mt-6 grid grid-cols-4 gap-3"><div className="bg-amber-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Rascunho (2)</div></div><div className="bg-blue-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Enviado (1)</div></div><div className="bg-emerald-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Activo (3)</div></div><div className="bg-zinc-50 border rounded-[12px] p-3"><div className="text-[11px] font-bold">Terminado (5)</div></div></div></div>)}
      </main>
      {showPagamento && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[420px] p-5 shadow-2xl">
            <div className="flex items-center justify-between"><div><div className="font-bold text-[15px]">Pagamento Taxa Fixa 200MT</div><div className="text-[11px] text-zinc-600">Valor unico qualquer contrato + {anexos.length} anexos</div></div><button onClick={()=>setShowPagamento(false)} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">x</button></div>
            <div className="mt-4 space-y-2">
              {(Object.keys(PAGAMENTOS_OWNER) as Array<keyof typeof PAGAMENTOS_OWNER>).map(key=>{
                const p = PAGAMENTOS_OWNER[key]; const active = metodoPag===key;
                return (<button key={key} onClick={()=>setMetodoPag(key)} className={`w-full text-left p-3 rounded-[12px] border-2 flex items-center gap-3 ${active?"border-[#00a651] bg-emerald-50":"border-zinc-200 bg-white"}`}><div className={`w-10 h-10 rounded-[10px] ${p.cor} text-white grid place-items-center font-bold text-[12px]`}>{p.display.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-semibold text-[13px]">{p.display}</div><div className="text-[10px] text-zinc-500">{key==="banco"?`Standard Bank **** ${p.nib.slice(-4)}`:"Recebera popup PIN"}</div></div><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${active?"bg-[#00a651] border-[#00a651] text-white":"border-zinc-300"}`}>{active?"âœ“":""}</div></button>)
              })}
            </div>
            {metodoPag!=="banco" ? (<div className="mt-4"><label className="text-[11px] font-bold uppercase">Seu Numero {PAGAMENTOS_OWNER[metodoPag].display}</label><input value={telefonePag} onChange={e=>setTelefonePag(e.target.value)} placeholder="84xxxxxxx" className="mt-1 w-full h-[42px] px-3 rounded-[10px] border-2 text-[14px]" /></div>) : (<div className="mt-4 p-3 rounded-[10px] bg-blue-50 border text-[11px]">NIB: {PAGAMENTOS_OWNER.banco.nib}<br/>Valor: 200MT</div>)}
            <div className="mt-5 grid grid-cols-2 gap-2"><button onClick={()=>setShowPagamento(false)} className="h-[44px] rounded-[10px] border text-[13px] font-semibold">Continuar Free</button><button disabled={processandoPag} onClick={confirmarPagamento200} className="h-[44px] rounded-[10px] bg-[#2563eb] text-white font-bold text-[13px]">{processandoPag?"Processando...":`Pagar 200MT`}</button></div>
          </div>
        </div>
      )}
      {showPinPopup && (
        <div className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[320px] p-5 text-center shadow-2xl">
            <div className={`w-12 h-12 rounded-full ${PAGAMENTOS_OWNER[metodoPag].cor} text-white grid place-items-center mx-auto font-bold`}>{PAGAMENTOS_OWNER[metodoPag].display.slice(0,1)}</div>
            <div className="font-bold text-[14px] mt-3">Pedido Enviado para {telefonePag}</div>
            <div className="text-[11px] text-zinc-600 mt-2">Popup no seu celular {PAGAMENTOS_OWNER[metodoPag].display}. Digite PIN para pagar 200MT</div>
            <div className="mt-4 flex justify-center gap-1">{[1,2,3,4].map(i=><div key={i} className="w-8 h-8 rounded-[8px] bg-zinc-100 border grid place-items-center font-bold">*</div>)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
