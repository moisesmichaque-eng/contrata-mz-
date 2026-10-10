// @ts-nocheck
import { useState, useMemo } from 'react';

const PAISES: Record<string,string[]> = {
  "Mocambique":["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula"],
  "South Africa":["Gauteng - Johannesburg","Western Cape - Cape Town"],
  "Portugal":["Lisboa","Porto"],
  "Brasil":["Sao Paulo - SP","Rio RJ"],
  "Angola":["Luanda"],
  "France":["Paris"],
  "USA":["California","Texas"]
};
const CATS=["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter"];

const T={
 PT:{
  find:"ENCONTRAR", contracts:"CONTRATOS 11", my:"MEUS",
  mid:"ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS",
  sub:"Energy solutions and services enterprise",
  h1a:"Chega de acordo de boca!",
  h1b:"Contrato legal em 2 minutos.",
  heroSub:"Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.",
  b1:"11 Clausulas legais obrigatorias",
  b2:"Anexos com fotos antes da validade",
  b3:"Lei 23/2007 - Valido em Mocambique",
  cardT:"Cadastre seu servico - Rapido e gratuito",
  emp:"EMPRESA", prof:"PROFISSIONAL INDIVIDUAL SINGULAR", coop:"COOPERATIVA",
  namePh:"Nome completo / Empresa", phonePh:"Telefone WhatsApp",
  docT:"Anexar documentos - Arraste aqui ou clique",
  docS:"Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho",
  send:"ENVIAR CADASTRO",
  verif:"Profissionais verificados em",
  catPh:"Categoria"
 },
 EN:{
  find:"FIND", contracts:"CONTRACTS 11", my:"MINE",
  mid:"FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES",
  sub:"Energy solutions and services enterprise",
  h1a:"No more verbal deals!",
  h1b:"Legal contract in 2 minutes.",
  heroSub:"Protect your money and work. With photos, M-Pesa proof and WhatsApp signature instantly. Valid across Mozambique Law 23/2007.",
  b1:"11 mandatory legal clauses",
  b2:"Photo annexes before validity",
  b3:"Law 23/2007 - Valid in Mozambique",
  cardT:"Register your service - Fast and free",
  emp:"COMPANY", prof:"INDIVIDUAL PROFESSIONAL", coop:"COOPERATIVE",
  namePh:"Full name / Company", phonePh:"WhatsApp Phone",
  docT:"Attach documents - Drag here or click",
  docS:"Drag files or click to select - ID, NUIT, Work photos",
  send:"SUBMIT REGISTRATION",
  verif:"Verified pros in",
  catPh:"Category"
 },
 FR:{
  find:"TROUVER", contracts:"CONTRATS 11", my:"MES",
  mid:"TROUVER. NEGOCIER. FORMALISER. 11 CLAUSES",
  sub:"Energy solutions and services enterprise",
  h1a:"Fini les accords verbaux!",
  h1b:"Contrat legal en 2 minutes.",
  heroSub:"Protegez votre argent et travail. Avec photos, preuve M-Pesa et signature WhatsApp. Valide au Mozambique Loi 23/2007.",
  b1:"11 clauses legales obligatoires",
  b2:"Annexes photos avant validite",
  b3:"Loi 23/2007 - Valide au Mozambique",
  cardT:"Enregistrez service - Rapide et gratuit",
  emp:"ENTREPRISE", prof:"PROFESSIONNEL INDIVIDUEL", coop:"COOPERATIVE",
  namePh:"Nom complet / Entreprise", phonePh:"Telephone WhatsApp",
  docT:"Joindre documents - Glissez ici ou cliquez",
  docS:"Glissez fichiers ou cliquez - BI, NUIT, Photos travail",
  send:"ENVOYER INSCRIPTION",
  verif:"Pros verifies a",
  catPh:"Categorie"
 }
};

function LogoIcon({s=28}:{s?:number}){
 return(
  <svg width={s} height={s} viewBox="0 0 40 40" style={{flexShrink:0}}>
   <circle cx="20" cy="20" r="19" fill="#d4a44a"/>
   <path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/>
   <path d="M20 12 L20 18 M16 20 L24 20" stroke="#d4a44a" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
  </svg>
 )
}

const PROS=[
 {n:"Carlos Mabote",cat:"Pedreiro",loc:"Maputo Cidade",rate:4.9, jobs:127, price:"1.200 MT/dia"},
 {n:"Amina Sitoe",cat:"Domestica",loc:"Matola",rate:5.0, jobs:89, price:"8.000 MT/mes"},
 {n:"Jose Tembe",cat:"Eletricista",loc:"Boane",rate:4.8, jobs:203, price:"1.500 MT/dia"},
 {n:"Fatima Uamusse",cat:"Babysitter",loc:"Maputo Cidade",rate:4.9, jobs:64, price:"600 MT/dia"},
 {n:"Elias Nhampossa",cat:"Motorista",loc:"Gaza - Xai-Xai",rate:4.7, jobs:112, price:"12.000 MT/mes"},
 {n:"Rosa Chivale",cat:"Jardineiro",loc:"Inhambane",rate:4.8, jobs:41, price:"800 MT/dia"},
];

const CLAUSULAS = [
 { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz", icon:"ðŸ‘¥" },
 { id:2, titulo:"Objeto e tarefas", short:"O que sera feito", icon:"ðŸŽ¯" },
 { id:3, titulo:"Horario e local", short:"Quando e onde", icon:"ðŸ“" },
 { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga", icon:"ðŸ’°" },
 { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios", icon:"ðŸ½ï¸" },
 { id:6, titulo:"Folgas e ferias", short:"Descanso legal", icon:"ðŸ–ï¸" },
 { id:7, titulo:"Periodo experimental", short:"Teste inicial", icon:"â±ï¸" },
 { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes", icon:"âœ…" },
 { id:9, titulo:"Deveres do empregador", short:"Obrigacoes", icon:"ðŸ¤" },
 { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas", icon:"ðŸ“Ž" },
 { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp", icon:"âœï¸" },
];

export default function App(){
 const [tab,setTab]=useState<"encontrar"|"contratos"|"meus">("contratos");
 const [lang,setLang]=useState<"PT"|"EN"|"FR">("PT");
 const [pulse,setPulse]=useState(0);
 const tr=T[lang];
 const [pais,setPais]=useState("Mocambique");
 const [prov,setProv]=useState(PAISES["Mocambique"][0]);
 const [cat,setCat]=useState("Pedreiro");
 const [nome,setNome]=useState("");
 const [tel,setTel]=useState("");
 const [tipo,setTipo]=useState<"empresa"|"prof"|"coop">("prof");
 const [contratoSel,setContratoSel]=useState(0);
 const [drag,setDrag]=useState(false);
 const provincias=useMemo(()=>PAISES[pais]||[],[pais]);

 // CONTRATOS FORM STATE - 11 clausulas
 const [clausulaAtiva,setClausulaAtiva]=useState(1);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empNuit:"401866876", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Anastancio Manuel", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Motorista",
  tarefas:["Conduzir com seguranca","Levar criancas na escola","Manutencao basica oleo e pneu","Abastecer e controlar consumo"],
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:new Date().toISOString().split('T')[0], localTrab:"Xai-Xai - casa",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias",
  alimentacao:"Sim - almoco fornecido", alojamento:"Nao", transporte:"Sim - 500MT/mes",
  folgas:"Domingo e feriados nacionais. Apos 1 ano: 12 dias ferias pagas Lei 23/2007",
  periodoExp:"90 dias",
  deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens, nao usar viatura sem autorizacao",
  deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade, fornecer material",
  anexos: [] as any[]
 });

 const gerarPDF = async () => {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const M = 15; let y = 20;
    doc.setFillColor(42,63,90); doc.rect(0,0,210,22,"F");
    doc.setTextColor(212,164,74); doc.setFontSize(12); doc.setFont("helvetica","bold");
    doc.text(`CONTRATO - ${CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS`, M, 12);
    doc.setTextColor(255,255,255); doc.setFontSize(7); doc.text(`Lei 23/2007 - ESSE NUIT 401866876 - Valido Mocambique`, M, 17);
    y = 30; doc.setTextColor(20,20,20); doc.setFontSize(10);
    CLAUSULAS.forEach(c=>{
      doc.setFont("helvetica","bold"); doc.setFillColor(245,247,250); doc.rect(M, y-5, 180, 7, "F");
      doc.text(`${c.id}. ${c.titulo.toUpperCase()} - ${c.short}`, M+2, y); y+=6;
      doc.setFont("helvetica","normal"); doc.setFontSize(9);
      let txt = "";
      if(c.id===1) txt = `Empregador: ${formContrato.empNome} BI ${formContrato.empBI} NUIT ${formContrato.empNuit} Tel ${formContrato.empTel} End ${formContrato.empEnd}. Trabalhador: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel} End ${formContrato.trabEnd} Prof ${formContrato.trabProf}.`;
      if(c.id===2) txt = `Funcao: ${CATS[contratoSel]}. Tarefas: ${formContrato.tarefas.join(", ")}.`;
      if(c.id===3) txt = `Horario: ${formContrato.horarioInicio} as ${formContrato.horarioFim}, Dias: ${formContrato.dias}, Inicio: ${formContrato.dataInicio}, Local: ${formContrato.localTrab}.`;
      if(c.id===4) txt = `Salario: ${formContrato.valor} MT ate dia ${formContrato.diaPag} via ${formContrato.formaPag} para ${formContrato.trabTel}. Prazo: ${formContrato.prazo}.`;
      if(c.id===5) txt = `Alimentacao: ${formContrato.alimentacao}. Alojamento: ${formContrato.alojamento}. Transporte: ${formContrato.transporte}.`;
      if(c.id===6) txt = formContrato.folgas;
      if(c.id===7) txt = `Periodo experimental: ${formContrato.periodoExp} a contar de ${formContrato.dataInicio}. Aviso 15 dias.`;
      if(c.id===8) txt = formContrato.deveresTrab;
      if(c.id===9) txt = formContrato.deveresEmp;
      if(c.id===10) txt = formContrato.anexos.length ? `Anexos: ${formContrato.anexos.map((a:any)=>a.nome).join(", ")} - fazem parte integrante` : "Nenhum anexo - fotos via WhatsApp fazem parte se anexadas.";
      if(c.id===11) txt = `Validade Art.29 Lei 23/2007. Assinaturas digitais via WhatsApp. ID ${Math.floor(Math.random()*1000000)} - Contrata.MZ - ESSE.`;
      const lines = doc.splitTextToSize(txt, 180);
      lines.forEach((l:string)=>{ if(y>270){ doc.addPage(); y=20; } doc.text(l, M, y); y+=5; });
      y+=4;
    });
    doc.save(`Contrato-11-Clausulas-${formContrato.trabNome.replace(/\s+/g,"-")}.pdf`);
    alert("PDF gerado com 11 clausulas - pronto para WhatsApp");
  } catch(e){ alert("Erro ao gerar PDF: "+e); }
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a] font-sans antialiased selection:bg-[#d4a44a]/30" data-pulse={pulse}>
  {/* HEADER */}
  <header className="bg-white sticky top-0 z-30">
   <div className="mx-auto max-w-[1280px] px-4 md:px-6 h-[56px] flex items-center justify-between gap-4">
    <div className="flex items-center gap-3 min-w-0">
     <div className="flex items-center gap-2">
      <LogoIcon s={30}/>
      <div className="leading-none">
       <div className="font-black tracking-[0.18em] text-[15px] text-[#b78a2f]">ESSE</div>
       <div className="text-[6.5px] tracking-wide text-[#9aa3ad] uppercase mt-[1px] whitespace-nowrap">{tr.sub}</div>
      </div>
     </div>
     <div className="hidden lg:block h-5 w-px bg-[#e5e2db] mx-2"/>
     <div className="hidden lg:block text-[10px] tracking-[0.14em] text-[#8a97a5] font-semibold whitespace-nowrap">{tr.mid}</div>
    </div>

    <div className="flex items-center gap-4 md:gap-6">
     <nav className="flex items-center gap-4 md:gap-5 text-[11px] font-extrabold tracking-wide">
      <button onClick={()=>{setTab("encontrar"); setPulse(p=>p+1);}} className={`${tab==="encontrar"?"text-[#d4a44a]":"text-black"} hover:opacity-70 transition`}>{tr.find}</button>
      <button onClick={()=>{setTab("contratos"); setPulse(p=>p+1);}} className={`${tab==="contratos"?"text-[#d4a44a]":"text-black"} hover:opacity-70 transition`}>{tr.contracts}</button>
      <button onClick={()=>{setTab("meus"); setPulse(p=>p+1);}} className={`${tab==="meus"?"text-[#d4a44a]":"text-black"} hover:opacity-70 transition`}>{tr.my}</button>
     </nav>
     <div className="hidden md:flex items-center gap-1 text-[10px] font-bold">
      {["PT","EN","FR"].map(l=>(
       <button key={l} onClick={()=>setLang(l as any)} className={`px-2 py-1 rounded ${lang===l?"bg-[#2a3f5a] text-[#d4a44a]":"bg-[#f1f0eb] text-[#8a97a5]"}`}>{l}</button>
      ))}
     </div>
    </div>
   </div>
   <div className="h-[3px] w-full bg-[#d4a44a]"/>
  </header>

  {tab==="encontrar" && (
   <>
   {/* HERO - LAYOUT EXATO PRINT */}
   <section className="bg-[#2a3f5a] text-white">
    <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-8 md:py-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
     <div className="pt-2">
      <div className="flex items-center gap-2 mb-5">
       <LogoIcon s={34}/>
       <div className="leading-none">
        <div className="font-black tracking-[0.18em] text-[17px] text-[#d4a44a]">ESSE</div>
        <div className="text-[7px] tracking-wide text-white/60 uppercase">Energy solutions and services enterprise</div>
       </div>
      </div>
      <h1 className="text-[34px] md:text-[44px] font-black leading-[0.95] tracking-tight">
       {tr.h1a}<br/>{tr.h1b}
      </h1>
      <p className="mt-4 text-[13px] leading-[1.5] text-[#cbd5e1] max-w-[480px]">{tr.heroSub}</p>
      <div className="mt-5 flex flex-wrap gap-2">
       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a4f6a] border border-[#4a607d] text-[10px] font-bold">âœ“ {tr.b1}</span>
       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a4f6a] border border-[#4a607d] text-[10px] font-bold">âœ“ {tr.b2}</span>
       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4a44a] text-[#2a3f5a] text-[10px] font-black">âœ“ {tr.b3}</span>
      </div>
     </div>

     <div className="bg-white rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] p-4 md:p-5 text-[#1e293b]">
      <div className="text-[11px] font-black tracking-wide text-[#334155]">{tr.cardT}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
       {[{k:"empresa",l:tr.emp},{k:"prof",l:tr.prof},{k:"coop",l:tr.coop}].map(o=>(
        <button key={o.k} onClick={()=>setTipo(o.k as any)} className={`min-h-[38px] px-1 py-1 rounded-[6px] border text-[8.5px] font-black leading-[1.1] tracking-wide ${tipo===o.k?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#64748b] border-[#e2e8f0]"}`}>{o.l}</button>
       ))}
      </div>
      <div className="mt-3 space-y-2">
       <input value={nome} onChange={e=>setNome(e.target.value)} placeholder={tr.namePh} className="w-full h-[40px] px-3 rounded-[6px] border border-[#e2e8f0] text-[12px] outline-none focus:border-[#d4a44a]" />
       <div className="grid grid-cols-2 gap-2">
        <select value={pais} onChange={e=>{setPais(e.target.value); setProv(PAISES[e.target.value][0]);}} className="h-[40px] px-2 rounded-[6px] border border-[#e2e8f0] text-[12px] bg-white">
         {Object.keys(PAISES).map(p=><option key={p} value={p}>{p}</option>)}
        </select>
        <select value={prov} onChange={e=>setProv(e.target.value)} className="h-[40px] px-2 rounded-[6px] border border-[#e2e8f0] text-[12px] bg-white">
         {provincias.map(p=><option key={p} value={p}>{p}</option>)}
        </select>
       </div>
       <div className="grid grid-cols-2 gap-2">
        <select value={cat} onChange={e=>setCat(e.target.value)} className="h-[40px] px-2 rounded-[6px] border border-[#e2e8f0] text-[12px] bg-white">
         {CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <input value={tel} onChange={e=>setTel(e.target.value)} placeholder={tr.phonePh} className="h-[40px] px-3 rounded-[6px] border border-[#e2e8f0] text-[12px]" />
       </div>
       <div onDragOver={e=>{e.preventDefault(); setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault(); setDrag(false); alert("Documentos anexados: "+e.dataTransfer.files.length);}} className={`mt-1 rounded-[8px] border-2 border-dashed p-3 text-center ${drag?"border-[#d4a44a] bg-[#fff8ed]":"border-[#e2e8f0] bg-[#faf8f3]"}`}>
        <div className="text-[11px] font-bold text-[#334155]">{tr.docT}</div>
        <div className="text-[9px] text-[#94a3b8] mt-1">{tr.docS}</div>
       </div>
       <button onClick={()=>alert(`Cadastro enviado: ${nome} - ${cat} - ${pais}/${prov} - ${tipo}`)} className="w-full h-[42px] rounded-[8px] bg-[#d4a44a] text-[#2a3f5a] font-black text-[11px] tracking-[0.12em] hover:brightness-95 transition">{tr.send}</button>
      </div>
     </div>
    </div>
   </section>

   {/* PROF LIST */}
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-8">
    <div className="flex items-center justify-between mb-5">
     <h2 className="text-[14px] font-extrabold text-[#1e293b]">{tr.verif} {prov} <span className="text-[#94a3b8] font-semibold">â€¢ {PROS.length} disponiveis</span></h2>
     <div className="flex gap-2">
      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#2a3f5a] text-white font-bold">{cat}</span>
      <span className="text-[10px] px-2.5 py-1 rounded-full bg-white border text-[#64748b]">{prov}</span>
     </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {PROS.filter(p=>p.loc===prov || prov.includes("Maputo") || true).slice(0,6).map((p,i)=>(
      <div key={i} className="bg-white rounded-[12px] border border-[#e9e3d6] p-4 hover:shadow-lg transition">
       <div className="flex items-start justify-between">
        <div className="flex gap-3">
         <div className="w-10 h-10 rounded-full bg-[#2a3f5a] grid place-items-center text-[#d4a44a] font-black text-[12px]">{p.n.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
         <div>
          <div className="font-bold text-[13px] leading-tight">{p.n}</div>
          <div className="text-[11px] text-[#64748b]">{p.cat} â€¢ {p.loc}</div>
          <div className="flex items-center gap-1 mt-1">
           <span className="text-[#d4a44a] text-[11px]">â˜… {p.rate}</span><span className="text-[10px] text-[#94a3b8]">({p.jobs} jobs)</span>
           <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-[#f0f7e9] text-[#4a7c2e] font-bold">VERIFICADO</span>
          </div>
         </div>
        </div>
        <span className="text-[11px] font-bold text-[#2a3f5a]">{p.price}</span>
       </div>
       <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={()=>alert(`Contrato 11 clausulas para ${p.n}`)} className="h-8 rounded-[6px] bg-[#2a3f5a] text-white text-[10px] font-bold tracking-wide">CONTRATAR</button>
        <button onClick={()=>alert(`Perfil ${p.n}`)} className="h-8 rounded-[6px] border border-[#e2e8f0] text-[10px] font-bold text-[#475569]">VER PERFIL</button>
       </div>
      </div>
     ))}
    </div>
   </section>
   </>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white flex flex-wrap justify-between gap-4">
     <div>
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS â€¢ LEI 23/2007</div>
      <h2 className="text-[22px] md:text-[26px] font-black leading-none mt-1">Contratos 11 Clausulas - Valido em todo Mocambique</h2>
      <p className="text-[#cbd5e1] text-[11px] mt-2 max-w-[560px]">Agora com clausulas nomeadas - nao sao paginas. Contrato completo em 1 PDF.</p>
     </div>
     <div className="flex gap-2 flex-wrap self-end">
      {CATS.slice(0,6).map((c,i)=>(
       <button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>
      ))}
     </div>
    </div>

    <div className="mt-6 grid md:grid-cols-[260px_1fr_360px] gap-5">
     {/* ESQUERDA - LISTA CLAUSULAS NOMEADAS - SEM PALAVRA PAGINA */}
     <div className="bg-white rounded-[12px] border p-3 h-fit sticky top-[70px]">
      <div className="text-[11px] font-black text-[#334155] mb-3 tracking-wide">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">Nao sao paginas - sao partes do contrato. Clique para editar.</div>
      {CLAUSULAS.map(c=>{
        const ativo = clausulaAtiva===c.id;
        return (
          <button key={c.id} onClick={()=>setClausulaAtiva(c.id)} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border transition ${ativo?"bg-[#2a3f5a] text-white border-[#2a3f5a] shadow":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0] hover:bg-white"}`}>
            <span className="text-[14px]">{c.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[11px] leading-tight truncate">{c.id}. {c.titulo}</div>
              <div className={`text-[9px] leading-tight truncate ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short}</div>
            </div>
            {ativo && <span className="text-[10px]">â—</span>}
          </button>
        );
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border border-[#fde68a] text-[9px] text-[#92400e]">âœ“ Todas as clausulas vao para 1 PDF unico - nao sao 11 paginas separadas</div>
     </div>

     {/* CENTRO - FORM DA CLAUSULA ATIVA - ABRE ATE AO FIM */}
     <div className="bg-white rounded-[12px] border p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">{CLAUSULAS[clausulaAtiva-1].icon}</span>
          <h3 className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()}</h3>
        </div>
        <span className="px-2 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-[9px] font-bold">{clausulaAtiva}/11 - {CLAUSULAS[clausulaAtiva-1].short}</span>
      </div>

      <div className="mt-5">
        {clausulaAtiva===1 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px] text-[#334155]">Dados das partes - Quem contrata e quem faz</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">BI / NUIT Contratante</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">Endereco Contratante</label><input value={formContrato.empEnd} onChange={e=>setFormContrato({...formContrato,empEnd:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div className="md:col-span-2 h-px bg-zinc-200 my-1"></div>
              <div><label className="text-[10px] font-bold">Nome Profissional *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">Profissao</label><input value={formContrato.trabProf} onChange={e=>setFormContrato({...formContrato,trabProf:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">BI Profissional</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div><label className="text-[10px] font-bold">Telefone M-Pesa Profissional</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
            </div>
          </div>
        )}
        {clausulaAtiva===2 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px]">Objeto e tarefas - O que sera feito ({formContrato.tarefas.length} tarefas)</div>
            <div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t,i)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px] flex items-center gap-2">{t}<button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_,idx)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center">x</button></span>)}</div>
            <div className="flex gap-2"><input id="novaTarefa" placeholder="Nova tarefa + Enter" className="flex-1 h-10 px-3 border-2 rounded-lg text-[12px]" onKeyDown={e=>{ if(e.key==="Enter"){ const v=(e.target as any).value.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); (e.target as any).value=""; }}}} /><button onClick={()=>{ const el=document.getElementById("novaTarefa") as any; const v=el.value.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); el.value=""; }}} className="px-4 h-10 bg-[#2a3f5a] text-white rounded-lg text-[11px] font-bold">Adicionar</button></div>
            <div className="text-[10px] text-zinc-500">Categoria: {CATS[contratoSel]} - todas as tarefas vao para o PDF final</div>
          </div>
        )}
        {clausulaAtiva===3 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px]">Horario e local - Quando e onde</div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Hora inicio</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[10px] font-bold">Hora fim</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div>
            <div><label className="text-[10px] font-bold">Dias da semana</label><input value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Data inicio</label><input type="date" value={formContrato.dataInicio} onChange={e=>setFormContrato({...formContrato,dataInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[10px] font-bold">Local trabalho</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div>
          </div>
        )}
        {clausulaAtiva===4 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px]">Salario e pagamento - Quanto e como paga</div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor MZN *</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg font-bold" /></div><div><label className="text-[10px] font-bold">Dia pagamento</label><input value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Forma pagamento</label><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato,formaPag:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg"><option>M-Pesa</option><option>e-Mola</option><option>mKesh</option><option>Banco</option><option>Numerario</option></select></div><div><label className="text-[10px] font-bold">Prazo contrato</label><input value={formContrato.prazo} onChange={e=>setFormContrato({...formContrato,prazo:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px]">Pagamento para {formContrato.trabTel} via {formContrato.formaPag} ate dia {formContrato.diaPag} - comprovativo obrigatorio como recibo.</div>
          </div>
        )}
        {clausulaAtiva===5 && (<div className="space-y-3"><div className="font-bold text-[12px]">Alimentacao e alojamento</div><div><label className="text-[10px] font-bold">Alimentacao</label><textarea value={formContrato.alimentacao} onChange={e=>setFormContrato({...formContrato,alimentacao:e.target.value})} className="mt-1 w-full min-h-[60px] p-3 border-2 rounded-lg text-[12px]" /></div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Alojamento</label><input value={formContrato.alojamento} onChange={e=>setFormContrato({...formContrato,alojamento:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[10px] font-bold">Transporte</label><input value={formContrato.transporte} onChange={e=>setFormContrato({...formContrato,transporte:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div></div>)}
        {clausulaAtiva===6 && (<div className="space-y-3"><div className="font-bold text-[12px]">Folgas e ferias</div><div><label className="text-[10px] font-bold">Descricao folgas, feriados, ferias</label><textarea value={formContrato.folgas} onChange={e=>setFormContrato({...formContrato,folgas:e.target.value})} className="mt-1 w-full min-h-[100px] p-3 border-2 rounded-lg text-[12px]" /></div></div>)}
        {clausulaAtiva===7 && (<div className="space-y-3"><div className="font-bold text-[12px]">Periodo experimental</div><div><label className="text-[10px] font-bold">Duracao periodo experimental</label><input value={formContrato.periodoExp} onChange={e=>setFormContrato({...formContrato,periodoExp:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div className="p-3 bg-zinc-50 border rounded-lg text-[11px]">A contar de {formContrato.dataInicio}, {formContrato.periodoExp} dias. Aviso previo 15 dias neste periodo conforme Lei 23/2007.</div></div>)}
        {clausulaAtiva===8 && (<div className="space-y-3"><div className="font-bold text-[12px]">Deveres do trabalhador</div><div><label className="text-[10px] font-bold">Deveres - vai para PDF</label><textarea value={formContrato.deveresTrab} onChange={e=>setFormContrato({...formContrato,deveresTrab:e.target.value})} className="mt-1 w-full min-h-[100px] p-3 border-2 rounded-lg text-[12px]" /></div></div>)}
        {clausulaAtiva===9 && (<div className="space-y-3"><div className="font-bold text-[12px]">Deveres do empregador</div><div><label className="text-[10px] font-bold">Deveres - vai para PDF</label><textarea value={formContrato.deveresEmp} onChange={e=>setFormContrato({...formContrato,deveresEmp:e.target.value})} className="mt-1 w-full min-h-[80px] p-3 border-2 rounded-lg text-[12px]" /></div></div>)}
        {clausulaAtiva===10 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px]">Anexos (antes validade) - Fotos e provas que fazem parte do contrato</div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Anexos vem ANTES da validade, fazem parte integrante. Fotos viram prova legal no tribunal.</div>
            <label className="w-full min-h-[100px] border-2 border-dashed rounded-xl grid place-items-center p-4 cursor-pointer hover:bg-blue-50"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>{ if(!e.target.files) return; const n=Array.from(e.target.files).map((f:any)=>({id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024).toFixed(1)+" KB"})); setFormContrato({...formContrato,anexos:[...formContrato.anexos,...n].slice(0,10)}); }} /><div className="text-center"><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 grid place-items-center mx-auto">+</div><div className="font-bold text-[12px] mt-2">Clique para anexar fotos/projetos</div><div className="text-[10px] text-zinc-500">JPG, PNG, PDF - ate 10 arquivos</div></div></label>
            {formContrato.anexos.length>0 && <div className="space-y-2">{formContrato.anexos.map((a:any)=><div key={a.id} className="flex gap-2 items-center border p-2 rounded-lg bg-white"><div className="flex-1 text-[11px] font-bold">{a.nome} - {a.tamanho}</div><button onClick={()=>setFormContrato({...formContrato,anexos:formContrato.anexos.filter((x:any)=>x.id!==a.id)})} className="w-6 h-6 bg-red-50 text-red-600 rounded-full text-[10px]">x</button></div>)}</div>}
          </div>
        )}
        {clausulaAtiva===11 && (
          <div className="space-y-3">
            <div className="font-bold text-[12px]">Validade e assinaturas - Assina no WhatsApp</div>
            <div className="bg-zinc-50 border-2 rounded-xl p-4"><div className="font-bold text-[11px]">Resumo 11 Clausulas: {CATS[contratoSel]} - {formContrato.valor} MZN - {formContrato.tarefas.length} tarefas - {formContrato.anexos.length} anexos ANTES validade</div><div className="text-[10px] text-zinc-600 mt-1">Validade legal Art.29 Lei 23/2007. Carimbo ESSE. Tudo que editou aparece aqui e no PDF unico.</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#3a4f6a] text-white font-bold text-[12px] flex flex-col items-center justify-center"><span>FREE - Gerar PDF 11 Clausulas</span><span className="text-[10px] font-normal opacity-80">WhatsApp + PDF unico</span></button>
                <button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#2a3d55] text-white font-bold text-[12px] flex flex-col items-center justify-center"><span>PAGO 200MT - Sem marca</span><span className="text-[10px] font-normal opacity-80">M-Pesa e-Mola mKesh Banco</span></button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1) as any)} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">â† Voltar: {clausulaAtiva>1?CLAUSULAS[clausulaAtiva-2].titulo:""}</button>
        <button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1) as any)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold disabled:opacity-40">Proximo: {clausulaAtiva<11?CLAUSULAS[clausulaAtiva].titulo:""} â†’</button>
      </div>
    </div>

    {/* DIREITA - PREVIEW AO VIVO - SEMPRE MOSTRA CONTRATO COMPLETO ATE AO FIM */}
    <div className="bg-white rounded-[12px] border p-4 h-fit sticky top-[70px]">
      <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase">Preview ao vivo - 11 clausulas = PDF unico</span><span className="px-2 py-0.5 rounded-full bg-[#fff8ed] border text-[9px] font-bold">{formContrato.anexos.length} anexos antes validade</span></div>
      <div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">
        CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - PDF UNICO<br/>Lei 23/2007<br/><br/>
        1. DADOS DAS PARTES:<br/>Contratante: {formContrato.empNome} BI {formContrato.empBI} NUIT {formContrato.empNuit} Tel {formContrato.empTel} End {formContrato.empEnd}<br/>Profissional: {formContrato.trabNome} BI {formContrato.trabBI} Tel {formContrato.trabTel} End {formContrato.trabEnd} Prof {formContrato.trabProf}<br/><br/>
        2. OBJETO E TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>
        3. HORARIO E LOCAL:<br/>{formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.dias} - Inicio {formContrato.dataInicio} - Local {formContrato.localTrab}<br/><br/>
        4. SALARIO E PAGAMENTO:<br/>{formContrato.valor} MZN ate dia {formContrato.diaPag} via {formContrato.formaPag} para {formContrato.trabTel} - Prazo {formContrato.prazo}<br/><br/>
        5. ALIMENTACAO E ALOJAMENTO:<br/>{formContrato.alimentacao} - {formContrato.alojamento} - {formContrato.transporte}<br/><br/>
        6. FOLGAS E FERIAS:<br/>{formContrato.folgas}<br/><br/>
        7. PERIODO EXPERIMENTAL:<br/>{formContrato.periodoExp} dias desde {formContrato.dataInicio}<br/><br/>
        8. DEVERES DO TRABALHADOR:<br/>{formContrato.deveresTrab}<br/><br/>
        9. DEVERES DO EMPREGADOR:<br/>{formContrato.deveresEmp}<br/><br/>
        10. ANEXOS ({formContrato.anexos.length}) ANTES VALIDADE:<br/>{formContrato.anexos.length?formContrato.anexos.map((a:any)=>a.nome).join(", "):"Nenhum - fotos via WhatsApp fazem parte"}<br/><br/>
        11. VALIDADE E ASSINATURAS:<br/>Art.29 Lei 23/2007 - ID {Math.floor(Math.random()*1000)} - ESSE NUIT 401866876<br/><br/>
        Gerado Contrata.MZ - 11 clausulas em 1 PDF unico
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={gerarPDF} className="h-10 bg-[#3a4f6a] text-white rounded-xl font-bold text-[10px]">GERAR PDF UNICO - FREE</button>
        <button onClick={gerarPDF} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold text-[10px]">PAGO 200MT - SEM MARCA</button>
      </div>
      <div className="mt-2 text-[9px] text-zinc-500 text-center">Preview = PDF final - 1 arquivo unico com 11 clausulas - nao sao 11 paginas separadas</div>
    </div>
   </div>
   </section>
  )}

  {tab==="meus" && (
   <section className="mx-auto max-w-[680px] px-4 py-16 text-center">
    <div className="bg-white rounded-[16px] border p-10">
     <LogoIcon s={48}/>
     <h2 className="mt-4 text-[20px] font-black">Meus Contratos & Servicos</h2>
     <p className="text-[13px] text-[#64748b] mt-2">Aqui voce ve contratos assinados, pagamentos M-Pesa e avaliacoes.</p>
     <button onClick={()=>setTab("encontrar")} className="mt-6 h-10 px-6 rounded-[8px] bg-[#2a3f5a] text-white text-[11px] font-bold">VOLTAR PARA ENCONTRAR</button>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t border-[#e8e2d5] py-6 text-center text-[10px] text-[#94a3b8] tracking-wide">
   <span className="inline-block">ESSE â€¢ Energy solutions â€¢ Lei 23/2007 â€¢ {prov} â€¢ M-Pesa â€¢ WhatsApp â€¢ 11 Clausulas em 1 PDF unico</span>
  </footer>
 </div>
 )
}
