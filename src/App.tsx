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
const CATS=["Pedreiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter"];

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

export default function App(){
 const [tab,setTab]=useState<"encontrar"|"contratos"|"meus">("encontrar");
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
     <div className="h-4 w-px bg-[#e8e2d5] hidden md:block"/>
     <div className="flex items-center gap-2 text-[11px] font-bold">
      {(["PT","EN","FR"] as const).map(l=>(
       <button key={l} onClick={()=>{setLang(l); setPulse(p=>p+1);}} className={`${lang===l?"text-[#d4a44a]":"text-[#b0b9c2]"} tracking-wide hover:text-black transition`}>{l}</button>
      ))}
     </div>
    </div>
   </div>
    <div className="h-[3px] w-full bg-[#d4a44a]"/>
  </header>
  <div className="h-0 overflow-hidden"><span>{pulse}</span></div>

  {/* HERO */}
  {tab==="encontrar" && (
   <>
   <section className="bg-[#2a3f5a] relative overflow-hidden">
    <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-8 md:py-10 grid md:grid-cols-[55%_45%] gap-8 md:gap-6 items-start">
     {/* LEFT */}
     <div className="pt-2">
      <div className="flex items-center gap-3 mb-6">
       <LogoIcon s={42}/>
       <div className="leading-none">
        <div className="font-black tracking-[0.2em] text-[20px] text-[#d4a44a]">ESSE</div>
        <div className="text-[8px] text-white/70 tracking-wide mt-1">{tr.sub}</div>
       </div>
      </div>

      <h1 className="text-white font-black leading-[0.95] text-[30px] md:text-[44px] tracking-tight">
       {tr.h1a}<br/>{tr.h1b}
      </h1>

      <p className="mt-4 text-[#cbd5e1] text-[13px] md:text-[14px] leading-[1.5] max-w-[520px]">{tr.heroSub}</p>

      <div className="mt-6 flex flex-wrap gap-2">
       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a4f6a] border border-[#4a607d] text-white text-[10px] font-semibold">
        <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-[8px]">âœ“</span> {tr.b1}
       </span>
       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3a4f6a] border border-[#4a607d] text-white text-[10px] font-semibold">
        <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-[8px]">âœ“</span> {tr.b2}
       </span>
       <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#d4a44a] text-[#2a3f5a] text-[10px] font-extrabold tracking-wide">
        {tr.b3}
       </span>
      </div>

      <div className="mt-8 hidden md:flex gap-6 text-[11px] text-white/60">
       <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">âœ”</span> M-Pesa â€¢ eMola â€¢ Conta Movel</div>
       <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">â—</span> Fotos de prova integradas</div>
      </div>
     </div>

     {/* RIGHT CARD */}
     <div className="bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-5 md:p-6 w-full">
      <div className="text-[12px] font-extrabold text-[#334155] tracking-wide mb-4">{tr.cardT}</div>

      <div className="grid grid-cols-3 gap-2 mb-4">
       <button onClick={()=>setTipo("empresa")} className={`h-[42px] rounded-[8px] border text-[8px] font-extrabold uppercase leading-tight tracking-wide px-1 ${tipo==="empresa"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>EMPRESA</button>
       <button onClick={()=>setTipo("prof")} className={`h-[42px] rounded-[8px] border text-[8px] font-extrabold uppercase leading-tight tracking-wide px-1 ${tipo==="prof"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>
         <span className="block">PROFISSIONAL</span><span className="block">INDIVIDUAL SINGULAR</span>
       </button>
       <button onClick={()=>setTipo("coop")} className={`h-[42px] rounded-[8px] border text-[8px] font-extrabold uppercase leading-tight tracking-wide px-1 ${tipo==="coop"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>COOPERATIVA</button>
      </div>

      <div className="space-y-2">
       <input value={nome} onChange={e=>setNome(e.target.value)} placeholder={tr.namePh} className="w-full h-[42px] rounded-[8px] border border-[#d7dde4] bg-white px-3 text-[13px] outline-none focus:border-[#d4a44a] placeholder:text-[#94a3b8]"/>
       <div className="grid grid-cols-2 gap-2">
        <select value={pais} onChange={e=>{const v=e.target.value; setPais(v); setProv(PAISES[v][0]);}} className="h-[42px] rounded-[8px] border border-[#d7dde4] bg-white px-3 text-[12px] outline-none">
         {Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}
        </select>
        <select value={prov} onChange={e=>setProv(e.target.value)} className="h-[42px] rounded-[8px] border border-[#d7dde4] bg-white px-3 text-[12px] outline-none">
         {provincias.map(pr=><option key={pr}>{pr}</option>)}
        </select>
       </div>
       <div className="grid grid-cols-2 gap-2">
        <select value={cat} onChange={e=>setCat(e.target.value)} className="h-[42px] rounded-[8px] border border-[#d7dde4] bg-white px-3 text-[12px] outline-none">
         {CATS.map(c=><option key={c}>{c}</option>)}
        </select>
        <input value={tel} onChange={e=>setTel(e.target.value)} placeholder={tr.phonePh} className="h-[42px] rounded-[8px] border border-[#d7dde4] bg-white px-3 text-[12px] outline-none placeholder:text-[#94a3b8]"/>
       </div>

       <div onDragOver={e=>{e.preventDefault(); setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault(); setDrag(false);}}
        className={`mt-2 h-[70px] rounded-[10px] border border-dashed ${drag?"border-[#2a3f5a] bg-[#fff7e6]":"border-[#d4a44a] bg-[#faf8f3]"} grid place-items-center text-center px-3 cursor-pointer`}>
        <div>
         <div className="text-[11px] font-bold text-[#2a3f5a]">{tr.docT}</div>
         <div className="text-[9px] text-[#94a3b8] mt-0.5">{tr.docS}</div>
        </div>
       </div>

       <button onClick={()=>alert(lang==="PT"?`Cadastrado! ${nome||"Profissional"} - ${prov} - ${cat}`: lang==="EN"?`Registered! ${nome||"Pro"} - ${prov} - ${cat}`:`Enregistre! ${nome||"Pro"} - ${prov} - ${cat}`)}
        className="w-full h-[46px] rounded-[8px] bg-[#c8a44a] hover:bg-[#d4a44a] transition text-[#2a3f5a] font-black tracking-[0.12em] text-[12px] mt-2">
        {tr.send}
       </button>

       <div className="text-[9px] text-[#94a3b8] text-center pt-1">Lei 23/2007 â€¢ Assinatura via WhatsApp â€¢ Valido em todo Mocambique</div>
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
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-8">
    <div className="bg-[#2a3f5a] rounded-[16px] p-6 md:p-8 text-white flex flex-wrap justify-between gap-4">
     <div>
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS â€¢ LEI 23/2007</div>
      <h2 className="text-[26px] md:text-[32px] font-black leading-none mt-2">Contratos 11 - Valido em todo Mocambique</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[560px]">Modelo legal com fotos, M-Pesa e assinatura WhatsApp. Protege empregador e trabalhador.</p>
     </div>
     <div className="flex gap-2 flex-wrap self-end">
      {CATS.slice(0,10).map((c,i)=>(
       <button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>
      ))}
     </div>
    </div>

    <div className="mt-6 grid md:grid-cols-[200px_1fr] gap-6">
     <div className="bg-white rounded-[12px] border p-3 h-fit">
      <div className="text-[11px] font-bold text-[#334155] mb-3">11 PAGINAS DO CONTRATO</div>
      {Array.from({length:11},(_,i)=>i+1).map(n=>(
       <div key={n} className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-[11px] mb-1 ${n===1?"bg-[#2a3f5a] text-white":"bg-[#f8fafc] text-[#64748b]"}`}>
        <span className="font-bold">Pagina {n}</span><span className="text-[9px]">{n===1?"Partes": n===11?"Assinaturas":"Clausula "+n}</span>
       </div>
      ))}
     </div>
     <div className="bg-white rounded-[12px] border p-6 md:p-8">
      <div className="flex items-center gap-2 text-[10px] font-bold tracking-wide">
       <span className="px-2 py-1 rounded bg-[#fef3c7] text-[#92400e]">TIPO: {CATS[contratoSel].toUpperCase()}</span>
       <span className="px-2 py-1 rounded bg-[#f0f7e9] text-[#4a7c2e]">M-PESA COMPROVADO</span>
       <span className="px-2 py-1 rounded bg-[#e0f2fe] text-[#0c4a6e]">FOTOS ANEXO</span>
      </div>
      <h3 className="mt-4 text-[18px] font-black">CONTRATO DE PRESTACAO DE SERVICOS - {CATS[contratoSel].toUpperCase()}</h3>
      <div className="mt-4 space-y-4 text-[12px] leading-[1.6] text-[#334155]">
       <p><b>CLAUSULA 1 - PARTES:</b> Contratante e Contratado(a) {CATS[contratoSel]}, identificados com BI/NUIT anexos com fotos.</p>
       <p><b>CLAUSULA 2 - OBJETO:</b> Servicos de {CATS[contratoSel]} conforme descricao e local {prov}.</p>
       <p><b>CLAUSULA 3 - PRAZO:</b> Inicio e fim com fotos antes/depois obrigatorias.</p>
       <p><b>CLAUSULA 4 - REMUNERACAO:</b> Valor, forma M-Pesa/eMola, comprovativo anexado.</p>
       <p><b>CLAUSULA 5 - HORARIO:</b> Dias e horarios, tolerancia e faltas.</p>
       <p className="opacity-60">... Clausulas 6 a 11 incluem rescisao, multas, foro Maputo, Lei 23/2007 e assinaturas digitais via WhatsApp.</p>
      </div>
      <div className="mt-6 flex gap-2">
       <button onClick={()=>alert("Contrato gerado PDF")} className="h-10 px-5 rounded-[8px] bg-[#d4a44a] text-[#2a3f5a] font-black text-[11px] tracking-wide">GERAR CONTRATO PDF</button>
       <button onClick={()=>alert("Enviado WhatsApp")} className="h-10 px-5 rounded-[8px] bg-[#2a3f5a] text-white font-bold text-[11px]">ASSINAR NO WHATSAPP</button>
      </div>
     </div>
    </div>
   </section>
  )}

  {tab==="meus" && (
   <section className="mx-auto max-w-[680px] px-4 py-16 text-center">
    <div className="bg-white rounded-[16px] border p-10">
     <LogoIcon s={48}/>
     <h2 className="mt-4 text-[20px] font-black">Meus Contratos & Servicos</h2>
     <p className="text-[13px] text-[#64748b] mt-2">Aqui voce ve contratos assinados, pagamentos M-Pesa e avaliacoes. FacÌ§a login com WhatsApp para sincronizar.</p>
     <button onClick={()=>setTab("encontrar")} className="mt-6 h-10 px-6 rounded-[8px] bg-[#2a3f5a] text-white text-[11px] font-bold">VOLTAR PARA ENCONTRAR</button>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t border-[#e8e2d5] py-6 text-center text-[10px] text-[#94a3b8] tracking-wide">
   <span className="inline-block">ESSE â€¢ Energy solutions â€¢ Lei 23/2007 â€¢ {prov} â€¢ {pulse>0?`#${pulse}`:""} â€¢ M-Pesa â€¢ WhatsApp â€¢ 11 Clausulas</span>
  </footer>
 </div>
 )
}
