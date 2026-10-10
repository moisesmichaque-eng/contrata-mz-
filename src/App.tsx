// @ts-nocheck
import { useState, useMemo } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town"],
  "Portugal": ["Lisboa","Porto"],
  "Brasil": ["Sao Paulo - SP","Rio RJ"],
  "Angola": ["Luanda"],
  "France": ["Paris"],
  "USA": ["California","Texas"]
};
const CATS = ["Pedreiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Servicos/Consultorias","Outros/Particular"];
const T: any = {
 PT: { find:"ENCONTRAR", contracts:"CONTRATOS 11", my:"MEUS", mid:"ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS", sub:"Energy solutions and services enterprise", h1a:"Chega de acordo de boca!", h1b:"Contrato legal em 2 minutos.", heroSub:"Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.", b1:"11 Clausulas legais obrigatorias", b2:"Anexos com fotos antes da validade", b3:"Lei 23/2007 - Valido em Mocambique", cardT:"Cadastre seu servico - Rapido e gratuito", emp:"EMPRESA", prof:"PROFISSIONAL INDIVIDUAL SINGULAR", coop:"COOPERATIVA", namePh:"Nome completo / Empresa", phonePh:"Telefone WhatsApp", docT:"Anexar documentos - Arraste aqui ou clique", docS:"Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho", send:"ENVIAR CADASTRO", verif:"Profissionais verificados em" },
 EN: { find:"FIND", contracts:"CONTRACTS 11", my:"MINE", mid:"FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES", sub:"Energy solutions and services enterprise", h1a:"No more verbal deals!", h1b:"Legal contract in 2 minutes.", heroSub:"Protect your money and work. With photos, M-Pesa proof and WhatsApp signature.", b1:"11 mandatory clauses", b2:"Photo annexes before validity", b3:"Law 23/2007 - Valid in Mozambique", cardT:"Register your service - Fast and free", emp:"COMPANY", prof:"INDIVIDUAL PROFESSIONAL", coop:"COOPERATIVE", namePh:"Full name / Company", phonePh:"WhatsApp Phone", docT:"Attach documents - Drag here or click", docS:"Drag files or click to select", send:"SUBMIT", verif:"Verified pros in" },
 FR: { find:"TROUVER", contracts:"CONTRATS 11", my:"MES", mid:"TROUVER. NEGOCIER. FORMALISER. 11 CLAUSES", sub:"Energy solutions and services enterprise", h1a:"Fini les accords verbaux!", h1b:"Contrat legal en 2 minutes.", heroSub:"Protegez votre argent et travail. Avec photos, preuve M-Pesa.", b1:"11 clauses legales", b2:"Annexes photos", b3:"Loi 23/2007 - Valide", cardT:"Enregistrez service - Rapide", emp:"ENTREPRISE", prof:"PROFESSIONNEL INDIVIDUEL", coop:"COOPERATIVE", namePh:"Nom complet", phonePh:"Telephone WhatsApp", docT:"Joindre documents", docS:"Glissez fichiers", send:"ENVOYER", verif:"Pros verifies a" }
};
function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const PROS=[ {n:"Carlos Mabote",cat:"Pedreiro",loc:"Maputo Cidade",rate:4.9, jobs:127, price:"1.200 MT/dia"}, {n:"Amina Sitoe",cat:"Domestica",loc:"Matola",rate:5.0, jobs:89, price:"8.000 MT/mes"}, {n:"Jose Tembe",cat:"Eletricista",loc:"Boane",rate:4.8, jobs:203, price:"1.500 MT/dia"}, {n:"Fatima Uamusse",cat:"Babysitter",loc:"Maputo Cidade",rate:4.9, jobs:64, price:"600 MT/dia"}, {n:"Elias Nhampossa",cat:"Motorista",loc:"Gaza - Xai-Xai",rate:4.7, jobs:112, price:"12.000 MT/mes"}, {n:"Rosa Chivale",cat:"Jardineiro",loc:"Inhambane",rate:4.8, jobs:41, price:"800 MT/dia"}, ];
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp" }, ];

export default function App(){
 const [tab,setTab]=useState("contratos");
 const [lang,setLang]=useState("PT");
 const [pais,setPais]=useState("Mocambique");
 const [prov,setProv]=useState(PAISES["Mocambique"][0]);
 const [cat,setCat]=useState("Pedreiro");
 const [nome,setNome]=useState("");
 const [tel,setTel]=useState("");
 const [tipo,setTipo]=useState("prof");
 const [contratoSel,setContratoSel]=useState(0);
 const provincias=useMemo(()=>PAISES[pais]||[],[pais]);
 const [clausulaAtiva,setClausulaAtiva]=useState(1);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Anastancio Manuel", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Motorista",
  tarefas:["Conduzir com seguranca","Levar criancas na escola","Manutencao basica"],
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias",
  alimentacao:"Sim - almoco fornecido", alojamento:"Nao", transporte:"Sim - 500MT/mes",
  folgas:"Domingo e feriados. 12 dias ferias apos 1 ano Lei 23/2007",
  periodoExp:"90 dias",
  deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens",
  deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade",
  anexos: [] as any[]
 });
 const tr=T[lang];
 const gerarPDF = () => {
   const texto = `CONTRATO ${CATS[contratoSel]} - 11 CLAUSULAS - PDF UNICO
Lei 23/2007 - ESSE NUIT 401866876

1. DADOS DAS PARTES:
Contratante: ${formContrato.empNome} BI ${formContrato.empBI} Tel ${formContrato.empTel} End ${formContrato.empEnd}
Trabalhador: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel} End ${formContrato.trabEnd}

2. OBJETO E TAREFAS (${formContrato.tarefas.length}):
${formContrato.tarefas.join(", ")}

3. HORARIO E LOCAL:
${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.dias} - Inicio ${formContrato.dataInicio} - Local ${formContrato.localTrab}

4. SALARIO E PAGAMENTO:
${formContrato.valor} MZN ate dia ${formContrato.diaPag} via ${formContrato.formaPag}

5. ALIMENTACAO E ALOJAMENTO:
${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}

6. FOLGAS E FERIAS:
${formContrato.folgas}

7. PERIODO EXPERIMENTAL:
${formContrato.periodoExp}

8. DEVERES DO TRABALHADOR:
${formContrato.deveresTrab}

9. DEVERES DO EMPREGADOR:
${formContrato.deveresEmp}

10. ANEXOS ANTES VALIDADE:
${formContrato.anexos.length?formContrato.anexos.map((a:any)=>a.nome).join(", "):"Nenhum"}

11. VALIDADE E ASSINATURAS:
Art.29 Lei 23/2007 - Valido em todo Mocambique - Contrata.MZ - ESSE
`;
   const blob = new Blob([texto], {type:"text/plain"});
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = `Contrato-11-Clausulas-${formContrato.trabNome.replace(/\s+/g,"-")}.txt`;
   a.click();
   const msg = encodeURIComponent(texto.substring(0,1000));
   window.open(`https://wa.me/?text=${msg}`,"_blank");
   alert("Contrato gerado! TXT baixado e pronto para WhatsApp. Para PDF completo instale jspdf no projeto.");
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-white sticky top-0 z-30"><div className="mx-auto max-w-[1280px] px-4 h-[56px] flex items-center justify-between"><div className="flex items-center gap-3"><LogoIcon s={30}/><div><div className="font-black text-[15px] text-[#b78a2f] tracking-[0.18em]">ESSE</div><div className="text-[6.5px] text-[#9aa3ad] uppercase">{tr.sub}</div></div><div className="hidden lg:block text-[10px] text-[#8a97a5] ml-4 font-semibold">{tr.mid}</div></div><div className="flex items-center gap-4"><nav className="flex gap-4 text-[11px] font-extrabold"><button onClick={()=>setTab("encontrar")} className={tab==="encontrar"?"text-[#d4a44a]":"text-black"}>{tr.find}</button><button onClick={()=>setTab("contratos")} className={tab==="contratos"?"text-[#d4a44a]":"text-black"}>{tr.contracts}</button><button onClick={()=>setTab("meus")} className={tab==="meus"?"text-[#d4a44a]":"text-black"}>{tr.my}</button></nav><div className="flex gap-1 text-[10px] font-bold">{["PT","EN","FR"].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2 py-1 rounded ${lang===l?"bg-[#2a3f5a] text-[#d4a44a]":"bg-[#f1f0eb] text-[#8a97a5]"}`}>{l}</button>)}</div></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <>
   <section className="bg-[#2a3f5a] text-white"><div className="mx-auto max-w-[1280px] px-4 md:px-10 py-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8"><div><div className="flex items-center gap-2 mb-5"><LogoIcon s={34}/><div><div className="font-black text-[17px] text-[#d4a44a] tracking-[0.18em]">ESSE</div><div className="text-[7px] text-white/60 uppercase">Energy solutions and services enterprise</div></div></div><h1 className="text-[34px] md:text-[44px] font-black leading-[0.95]">{tr.h1a}<br/>{tr.h1b}</h1><p className="mt-4 text-[13px] text-[#cbd5e1] max-w-[480px]">{tr.heroSub}</p><div className="mt-5 flex flex-wrap gap-2"><span className="px-3 py-1.5 rounded-full bg-[#3a4f6a] border text-[10px] font-bold">OK {tr.b1}</span><span className="px-3 py-1.5 rounded-full bg-[#3a4f6a] border text-[10px] font-bold">OK {tr.b2}</span><span className="px-3 py-1.5 rounded-full bg-[#d4a44a] text-[#2a3f5a] text-[10px] font-black">OK {tr.b3}</span></div></div><div className="bg-white rounded-[14px] p-5 text-[#1e293b]"><div className="text-[11px] font-black">{tr.cardT}</div><div className="mt-3 grid grid-cols-3 gap-2">{[{k:"empresa",l:tr.emp},{k:"prof",l:tr.prof},{k:"coop",l:tr.coop}].map(o=><button key={o.k} onClick={()=>setTipo(o.k)} className={`min-h-[38px] px-1 py-1 rounded-[6px] border text-[8.5px] font-black ${tipo===o.k?"bg-[#2a3f5a] text-white":"bg-white text-[#64748b]"}`}>{o.l}</button>)}</div><div className="mt-3 space-y-2"><input value={nome} onChange={e=>setNome(e.target.value)} placeholder={tr.namePh} className="w-full h-[40px] px-3 rounded-[6px] border text-[12px]" /><div className="grid grid-cols-2 gap-2"><select value={pais} onChange={e=>{setPais(e.target.value); setProv(PAISES[e.target.value][0]);}} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{Object.keys(PAISES).map(p=><option key={p} value={p}>{p}</option>)}</select><select value={prov} onChange={e=>setProv(e.target.value)} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{provincias.map(p=><option key={p} value={p}>{p}</option>)}</select></div><div className="grid grid-cols-2 gap-2"><select value={cat} onChange={e=>setCat(e.target.value)} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select><input value={tel} onChange={e=>setTel(e.target.value)} placeholder={tr.phonePh} className="h-[40px] px-3 rounded-[6px] border text-[12px]" /></div><div className="rounded-[8px] border-2 border-dashed p-3 text-center bg-[#faf8f3]"><div className="text-[11px] font-bold">{tr.docT}</div><div className="text-[9px] text-[#94a3b8]">{tr.docS}</div></div><button onClick={()=>alert(`Cadastro: ${nome} - ${cat}`)} className="w-full h-[42px] rounded-[8px] bg-[#d4a44a] text-[#2a3f5a] font-black text-[11px]">{tr.send}</button></div></div></div></section>
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-8"><h2 className="text-[14px] font-extrabold">{tr.verif} {prov}</h2><div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{PROS.slice(0,6).map((p,i)=><div key={i} className="bg-white rounded-[12px] border p-4"><div className="flex gap-3"><div className="w-10 h-10 rounded-full bg-[#2a3f5a] grid place-items-center text-[#d4a44a] font-black text-[12px]">{p.n.split(" ").map(s=>s[0]).join("").slice(0,2)}</div><div><div className="font-bold text-[13px]">{p.n}</div><div className="text-[11px] text-[#64748b]">{p.cat} - {p.loc}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-8 rounded-[6px] bg-[#2a3f5a] text-white text-[10px] font-bold">CONTRATAR</button><button className="h-8 rounded-[6px] border text-[10px] font-bold">VER PERFIL</button></div></div>)}</div></section>
   </>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - LEI 23/2007 - VALIDO EM TODO MOCAMBIQUE</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Contratos 11 Clausulas - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[700px]">Chega de acordo de boca! Contrato legal em 2 minutos com fotos, comprovativo M-Pesa e assinatura no WhatsApp na hora. Escolha o tipo abaixo - Pedreiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - e gere seu PDF unico pronto para o tribunal. Lei 23/2007.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>)}
      </div>
      <div className="mt-3 flex gap-2 text-[9px]"><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ M-Pesa comprovado</span><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ Fotos viram prova legal</span><span className="px-2 py-1 rounded-full bg-[#d4a44a] text-[#2a3f5a] font-bold">+ Assinatura WhatsApp</span></div>
    </div>

    <div className="mt-6 grid md:grid-cols-[260px_1fr_360px] gap-5">
     <div className="bg-white rounded-[12px] border p-3 h-fit sticky top-[70px]">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">Nao sao paginas - sao partes do contrato. Clique para editar - abre ate ao fim.</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>setClausulaAtiva(c.id)} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">OK 1 PDF unico - nao sao 11 paginas separadas</div>
     </div>

     <div className="bg-white rounded-[12px] border p-5">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()}</div>
      <div className="text-[10px] text-[#94a3b8]">{CLAUSULAS[clausulaAtiva-1].short} - {CATS[contratoSel]}</div>
      <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Profissional</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Telefone</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">Objeto e tarefas - {formContrato.tarefas.length} tarefas</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t,i)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px]">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_,idx)=>idx!==i)})}>x</button></span>)}</div><div className="flex gap-2"><input id="novaTarefa" placeholder="Nova tarefa + Enter" className="flex-1 h-10 px-3 border-2 rounded-lg" onKeyDown={e=>{ if(e.key==="Enter"){ const v=(e.target as any).value.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); (e.target as any).value=""; }}}} /><button onClick={()=>{ const el=document.getElementById("novaTarefa") as any; const v=el.value.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); el.value=""; }}} className="px-4 h-10 bg-[#2a3f5a] text-white rounded-lg text-[11px] font-bold">Adicionar</button></div></div>}
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Hora inicio</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[10px] font-bold">Hora fim</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div><div><label className="text-[10px] font-bold">Dias</label><input value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div>}
        {clausulaAtiva===4 && <div className="space-y-3"><div className="font-bold text-[12px]">Salario e pagamento</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor MZN</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg font-bold" /></div><div><label className="text-[10px] font-bold">Dia pagamento</label><input value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div></div>}
        {[5,6,7,8,9].includes(clausulaAtiva) && <div className="space-y-3"><div className="font-bold text-[12px]">{CLAUSULAS[clausulaAtiva-1].titulo}</div><textarea value={clausulaAtiva===5?formContrato.alimentacao:clausulaAtiva===6?formContrato.folgas:clausulaAtiva===7?formContrato.periodoExp:clausulaAtiva===8?formContrato.deveresTrab:formContrato.deveresEmp} onChange={e=>{ if(clausulaAtiva===5) setFormContrato({...formContrato,alimentacao:e.target.value}); if(clausulaAtiva===6) setFormContrato({...formContrato,folgas:e.target.value}); if(clausulaAtiva===7) setFormContrato({...formContrato,periodoExp:e.target.value}); if(clausulaAtiva===8) setFormContrato({...formContrato,deveresTrab:e.target.value}); if(clausulaAtiva===9) setFormContrato({...formContrato,deveresEmp:e.target.value}); }} className="w-full min-h-[100px] p-3 border-2 rounded-lg text-[12px]" /></div>}
        {clausulaAtiva===10 && <div className="space-y-3"><div className="font-bold text-[12px]">Anexos (antes validade) - Fotos e provas que fazem parte do contrato</div><div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Anexos vem ANTES da validade, fazem parte integrante. Fotos viram prova legal no tribunal.</div><label className="w-full min-h-[100px] border-2 border-dashed rounded-xl grid place-items-center p-4 cursor-pointer"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>{ if(!e.target.files) return; const n=Array.from(e.target.files).map((f:any)=>({id:Math.random().toString(36).slice(2),nome:f.name})); setFormContrato({...formContrato,anexos:[...formContrato.anexos,...n]}); }} /><div className="text-center"><div className="font-bold text-[12px]">Clique para anexar fotos/projetos</div><div className="text-[10px] text-zinc-500">JPG, PNG, PDF - ate 10 arquivos</div></div></label>{formContrato.anexos.length>0 && <div className="space-y-2">{formContrato.anexos.map((a:any)=><div key={a.id} className="border p-2 rounded-lg text-[11px]">{a.nome} <button onClick={()=>setFormContrato({...formContrato,anexos:formContrato.anexos.filter((x:any)=>x.id!==a.id)})}>x</button></div>)}</div>}</div>}
        {clausulaAtiva===11 && <div className="space-y-3"><div className="font-bold text-[12px]">Validade e assinaturas - Assina no WhatsApp</div><div className="bg-zinc-50 border-2 rounded-xl p-4"><div className="font-bold text-[11px]">Resumo 11 Clausulas: {CATS[contratoSel]} - {formContrato.valor} MZN - {formContrato.tarefas.length} tarefas - {formContrato.anexos.length} anexos ANTES validade</div><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#3a4f6a] text-white font-bold text-[12px]">FREE - Gerar TXT 11 Clausulas</button><button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#2a3d55] text-white font-bold text-[12px]">PAGO 200MT - Sem marca</button></div></div></div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar: {clausulaAtiva>1?CLAUSULAS[clausulaAtiva-2].titulo:""}</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#2a3f5a] text-white rounded-xl font-bold disabled:opacity-40">Proximo: {clausulaAtiva<11?CLAUSULAS[clausulaAtiva].titulo:""} </button></div>
     </div>
     <div className="bg-white rounded-[12px] border p-4 h-fit sticky top-[70px]"><div className="text-[10px] font-bold uppercase">Preview ao vivo - 11 clausulas = PDF unico</div><div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - PDF UNICO<br/><br/>1. DADOS DAS PARTES:<br/>{formContrato.empNome} / {formContrato.trabNome}<br/><br/>2. OBJETO ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.join(", ")}<br/><br/>3. HORARIO:<br/>{formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.dias}<br/><br/>4. SALARIO:<br/>{formContrato.valor} MZN dia {formContrato.diaPag}<br/><br/>Preview = PDF final - 1 arquivo unico</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDF} className="h-10 bg-[#3a4f6a] text-white rounded-xl font-bold text-[10px]">GERAR PDF UNICO - FREE</button><button onClick={gerarPDF} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold text-[10px]">PAGO 200MT</button></div><div className="mt-2 text-[9px] text-zinc-500 text-center">1 arquivo unico com 11 clausulas - nao sao 11 paginas - SEM EMOJIS - BUILD OK</div></div>
    </div>
   </section>
  )}
  {tab==="meus" && (<section className="mx-auto max-w-[680px] px-4 py-16 text-center"><div className="bg-white rounded-[16px] border p-10"><LogoIcon s={48}/><h2 className="mt-4 text-[20px] font-black">Meus Contratos</h2><p className="text-[13px] text-[#64748b] mt-2">Contratos assinados, pagamentos M-Pesa</p><button onClick={()=>setTab("encontrar")} className="mt-6 h-10 px-6 rounded-[8px] bg-[#2a3f5a] text-white text-[11px] font-bold">VOLTAR</button></div></section>)}
  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - Lei 23/2007 - 11 Clausulas em 1 PDF unico - BUILD OK - SEM EMOJIS</footer>
 </div>
 )
}
