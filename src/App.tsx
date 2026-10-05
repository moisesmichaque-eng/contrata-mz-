import { useState, useMemo } from "react";
import { supabase } from "./supabaseClient";

const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ã§/g,"c").replace(/Ã‡/g,"C");

type JobType = "Secretario/a Domestico/a" | "Cozinheiro/a" | "Baba/Cuidador Criancas" | "Motorista Privado" | "Jardineiro" | "Lavadeiro/a" | "Cuidador Idosos" | "Guarda" | "Pedreiro" | "Carpinteiro" | "Limpeza Escritorio";

const JOB_TASKS: Record<JobType, string[]> = {
  "Secretario/a Domestico/a": ["Limpeza geral da casa", "Lavar louca e organizar cozinha", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Organizar despensa"],
  "Cozinheiro/a": ["Preparar almoco e jantar", "Controlar alimentos", "Limpar cozinha"],
  "Baba/Cuidador Criancas": ["Cuidar criancas com seguranca", "Dar banho e trocar roupa", "Preparar refeicoes infantis"],
  "Motorista Privado": ["Conduzir familia com seguranca", "Manter viatura limpa", "Fazer recados"],
  "Jardineiro": ["Cortar relva", "Regar plantas", "Podar arvores"],
  "Lavadeiro/a": ["Lavar roupa", "Passar a ferro", "Dobrar e guardar"],
  "Cuidador Idosos": ["Acompanhar idoso", "Dar medicacao", "Preparar refeicoes"],
  "Guarda": ["Vigiar residencia", "Controlar entradas", "Fazer rondas"],
  "Pedreiro": ["Alvenaria e reboco", "Assentar blocos", "Acabamentos"],
  "Carpinteiro": ["Fabricar moveis", "Instalar portas e janelas", "Medir e cortar madeira"],
  "Limpeza Escritorio": ["Limpar secretarias", "Varrer chao", "Limpar vidros"],
};

const FORMAS_PAG = [
  { id:"mpesa", nome:"M-Pesa", num:"84 123 4567", titular:"Contrata.MZ", desc:"*150*00#" },
  { id:"emola", nome:"e-Mola", num:"82 987 6543", titular:"Contrata.MZ", desc:"e-Mola Movitel" },
  { id:"bim", nome:"Banco BIM", num:"NIB 000100000012345678910", titular:"Contrata.MZ Lda", desc:"BIM Millennium" },
  { id:"bci", nome:"Banco BCI", num:"NIB 000800000098765432110", titular:"Contrata.MZ Lda", desc:"BCI Fomento" },
];

const CONTRATOS = [
  { id:"domestico", nome:"Secretario/a Domestico/a", cat:"Domestico", desc:"Limpeza, arrumacao, cozinha" },
  { id:"pedreiro", nome:"Pedreiro", cat:"Construcao", desc:"Casa com pa, alvenaria, reboco" },
  { id:"carpinteiro", nome:"Carpinteiro", cat:"Construcao", desc:"Portas, janelas, mobiliario" },
  { id:"serralheiro", nome:"Serralheiro", cat:"Construcao", desc:"Portoes, grades, soldar" },
  { id:"eletricista", nome:"Eletricista", cat:"Construcao", desc:"Instalacoes eletricas" },
  { id:"motorista", nome:"Motorista Particular", cat:"Domestico", desc:"Carro, Toyota, Maputo" },
  { id:"pintor", nome:"Pintor", cat:"Construcao", desc:"Pintura interior e exterior" },
  { id:"canalizador", nome:"Canalizador", cat:"Construcao", desc:"Canalizacao e esgotos" },
];

export default function App(){
  const [tab,setTab]=useState<"encontrar"|"contratos"|"meus">("contratos");
  const [sel,setSel]=useState("carpinteiro");
  const [step,setStep]=useState(1);
  const [gerando,setGerando]=useState(false);
  const [gerado,setGerado]=useState(false);
  const [checkServ,setCheckServ]=useState<string[]>(["Portas","Janelas"]);

  const [form,setForm]=useState({
    empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"",
    trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"",
    trabalhadorTipo:"Secretario/a Domestico/a" as JobType,
    salario:"15000", dataInicio:new Date().toISOString().split("T")[0], horaEntrada:"07:00", horaSaida:"16:00",
    diasSemana:["Segunda","Terca","Quarta","Quinta","Sexta","Sabado"],
    tarefas:JOB_TASKS["Secretario/a Domestico/a"].join(", "),
    alimentacao:"Sim - incluida (almoco)", alojamento:"Nao - externo",
    formaPag:"mpesa", qtdPortas:"10", qtdJanelas:"14", qtdArmarios:"2", material:"Madeira", quemFornece:"Contratado", valorTotal:"45000", prazo:"25", localObra:"Matola, Machava, Rua 1234"
  });

  const tarefasArr = useMemo(()=> form.tarefas.split(",").map(t=>t.trim()).filter(Boolean),[form.tarefas]);

  const upd=(k:string,v:any)=> setForm((p:any)=>({...p,[k]:v}));
  const toggleDia=(d:string)=> setForm(p=>({...p, diasSemana: p.diasSemana.includes(d) ? p.diasSemana.filter(x=>x!==d) : [...p.diasSemana,d]}));
  const toggleCheck=(s:string)=> setCheckServ(p=> p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);

  const resetAll=()=>{
    setForm({ empregadorNome:"", empregadorBI:"", empregadorTel:"", empregadorBairro:"", trabalhadorNome:"", trabalhadorBI:"", trabalhadorTel:"", trabalhadorTipo:"Secretario/a Domestico/a", salario:"15000", dataInicio:new Date().toISOString().split("T")[0], horaEntrada:"07:00", horaSaida:"16:00", diasSemana:["Segunda","Terca","Quarta","Quinta","Sexta","Sabado"], tarefas:JOB_TASKS["Secretario/a Domestico/a"].join(", "), alimentacao:"Sim - incluida (almoco)", alojamento:"Nao - externo", formaPag:"mpesa", qtdPortas:"10", qtdJanelas:"14", qtdArmarios:"2", material:"Madeira", quemFornece:"Contratado", valorTotal:"45000", prazo:"25", localObra:"Matola, Machava" });
    setStep(1); setGerado(false); window.scrollTo({top:0,behavior:"smooth"});
  };

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

      doc.setFillColor(0,166,81); doc.rect(0,0,W,16,"F"); doc.setTextColor(255,255,255); doc.setFontSize(14); doc.setFont("helvetica","bold"); doc.text("CONTRATA.MZ",M,10); doc.setFontSize(9); doc.text("Contrato Formal",W-M,10,{align:"right"});

      y=24; doc.setTextColor(30,30,30);
      add(`CONTRATO DE TRABALHO - ${form.trabalhadorTipo.toUpperCase()}`,13,true); y+=2; doc.setDrawColor(0,166,81); doc.line(M,y,W-M,y); y+=6;
      add(`Maputo, ${semAcento(new Date().toLocaleDateString("pt-MZ"))}`,10); y+=4;
      add("1. PARTES",11,true); y+=1;
      add(`EMPREGADOR: ${form.empregadorNome}, BI ${form.empregadorBI}, Tel ${form.empregadorTel}, ${form.empregadorBairro}.`,10); y+=1;
      add(`TRABALHADOR: ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, Tel ${form.trabalhadorTel}, funcao ${form.trabalhadorTipo}.`,10); y+=5;
      add("2. CONDICOES",11,true); y+=1;
      if(sel==="carpinteiro"){ add(`Servicos: ${checkServ.join(", ")} - Portas ${form.qtdPortas}, Janelas ${form.qtdJanelas}, Armarios ${form.qtdArmarios}`,10); add(`Material: ${form.material} - Fornecimento: ${form.quemFornece}`,10); add(`Valor: ${form.valorTotal} MZN - Prazo: ${form.prazo} dias - Local: ${form.localObra}`,10); }
      else{ add(`Salario: ${form.salario} MT - Horario: ${form.horaEntrada} as ${form.horaSaida} - Dias: ${form.diasSemana.join(", ")}`,10); }
      y+=5; add("3. TAREFAS",11,true); y+=1; tarefasArr.forEach((t,i)=>{ add(`${i+1}. ${t}`,10,false,4); y+=0.5; }); y+=5;
      add("4. CLAUSULAS",11,true); y+=1;
      const taxa=Math.round(Number(form.valorTotal||form.salario)*0.05);
      const cls=[`CLAUSULA 1 - Objecto: Prestacao de servicos como ${form.trabalhadorTipo}.`,`CLAUSULA 2 - Local: ${form.localObra || form.empregadorBairro}.`,`CLAUSULA 3 - Horario: ${form.horaEntrada} as ${form.horaSaida}.`,`CLAUSULA 4 - Salario/Valor: ${form.valorTotal||form.salario} MZN via ${FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome} ate dia 05.`,`CLAUSULA 5 - Alimentacao/Alojamento: ${form.alimentacao} / ${form.alojamento}.`,`CLAUSULA 6 - Deveres Trabalhador: Cumprir horario, zelo.`,`CLAUSULA 7 - Deveres Empregador: Pagar em dia.`,`CLAUSULA 8 - Ferias: 1 dia/mes.`,`CLAUSULA 9 - Seguranca: Condicoes dignas.`,`CLAUSULA 10 - Confidencialidade.`,`CLAUSULA 11 - Rescisao: Aviso 15/30 dias.`,`CLAUSULA 12 - Foro: Lei 13/2023. Taxa 5% = ${taxa} MZN.`];
      cls.forEach(c=>{check(18); add(c,9); y+=2;});
      y+=8; check(40); add("Assinaturas:",10,true); y+=10; const c1=M, c2=W/2+10; doc.line(c1,y+10,c1+55,y+10); doc.line(c2,y+10,c2+55,y+10); doc.setFontSize(8); doc.text(semAcento("Empregador"),c1,y+14); doc.text(semAcento(form.empregadorNome),c1,y+18); doc.text(semAcento("Trabalhador"),c2,y+14); doc.text(semAcento(form.trabalhadorNome),c2,y+18);

      const fn=`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-").toUpperCase()}.pdf`;
      doc.save(fn); setGerado(true);

      // Salva no Supabase se configurado
      try{
        await supabase.from("contracts").insert([{ employer_name: form.empregadorNome, employee_name: form.trabalhadorNome, salary: form.valorTotal||form.salario, tipo: form.trabalhadorTipo, data: form }]);
      }catch{}

      return { blob:doc.output("blob"), fileName:fn };
    } finally{ setGerando(false); }
  };

  const compartilhar=async()=>{
    const forma=FORMAS_PAG.find(f=>f.id===form.formaPag);
    const txt=`CONTRATO ${semAcento(form.trabalhadorTipo).toUpperCase()} - ${form.trabalhadorNome} - Valor ${form.valorTotal||form.salario} MZN - Inicio ${form.dataInicio} - Pag ${forma?.nome} ${forma?.num} - Tarefas: ${form.tarefas}`;
    try{
      const {blob,fileName}=await gerarPDF() as any;
      const file=new File([blob],fileName,{type:"application/pdf"});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        await navigator.share({title:fileName, text:txt, files:[file]} as any);
        return;
      }
    }catch{}
    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-zinc-200">
        <div className="mx-auto max-w-[1280px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[15px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500 tracking-widest">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div>
          <div className="hidden md:flex items-center gap-2"><span className="px-3 py-1.5 rounded-full bg-[#00a651]/10 text-[#00a651] border border-[#00a651]/20 text-[11px] font-semibold">MVP 10 contratos Maputo</span><span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">Taxa 5% M-Pesa e-Mola Banco</span></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pt-4">
        <div className="bg-white border border-zinc-200 rounded-[16px] p-4 flex flex-col md:flex-row justify-between gap-3">
          <div><div className="text-[11px] font-bold tracking-widest text-zinc-500">MODELO DE NEGOCIO TRUST FIRST</div><div className="text-[15px] font-semibold mt-1 max-w-[560px]">Mercado digital onde cada servico termina com contrato formal, seguro e enviado por WhatsApp.</div><div className="text-[12px] text-zinc-500 mt-1">Contratante paga 5% sobre valor. Ex: 20.000 MZN taxa 1.000 MZN.</div></div>
          <div className="flex gap-2"><div className="bg-white border border-zinc-200 rounded-[12px] p-3 text-[11px] min-w-[120px]"><div className="font-bold text-[10px]">ESTADOS</div><div className="mt-1 space-y-1"><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>Rascunho</div><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>Enviado</div><div className="flex gap-1.5 items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>Activo</div></div></div><div className="bg-[#00a651] text-white rounded-[12px] p-3 text-[11px] min-w-[110px]"><div className="font-bold text-[10px] text-white/80">FLUXO</div><div className="mt-1 leading-4">Encontrar<br/>Negociar<br/>Contratar<br/>WhatsApp</div></div></div>
        </div>

        <div className="mt-4 flex gap-2 p-1 bg-white border border-zinc-200 rounded-[14px] w-fit">
          <button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>ENCONTRAR Mercado</button>
          <button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>CONTRATOS Biblioteca</button>
          <button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="meus"?"bg-[#00a651] text-white":"text-zinc-600"}`}>MEUS CONTRATOS Gestao</button>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 py-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4">
        {tab==="contratos" && (
          <>
            <div className="bg-white border border-zinc-200 rounded-[16px] p-3 h-fit">
              <div className="flex items-center justify-between"><span className="font-semibold text-[13px]">Biblioteca 10 MVP</span><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px]">ETAPA 2</span></div>
              <div className="text-[11px] text-zinc-500 mt-1">CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS</div>
              <div className="mt-3 space-y-2">
                {CONTRATOS.map(c=>{
                  const a=sel===c.id;
                  return <button key={c.id} onClick={()=>setSel(c.id)} className={`w-full text-left p-3 rounded-[12px] border flex gap-2.5 items-start ${a?"bg-emerald-50 border-emerald-300":"bg-white border-zinc-200"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text-[11px] font-bold">{c.nome.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{c.nome}</div><div className="text-[10px] text-zinc-500">{c.cat} - {c.desc}</div></div><div className={`w-4 h-4 rounded-full border grid place-items-center text-[10px] ${a?"bg-[#00a651] border-[#00a651] text-white":"border-zinc-300"}`}>{a?"v":""}</div></button>
                })}
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[16px] p-5">
              <h3 className="font-semibold text-[14px]">Contrato de {CONTRATOS.find(c=>c.id===sel)?.nome} - Modelo Inteligente</h3>

              {sel==="carpinteiro" ? (
                <div className="mt-4 space-y-4">
                  <div><div className="text-[11px] font-bold text-zinc-500 uppercase">Tipo de servico - Checklist</div><div className="mt-2 flex flex-wrap gap-1.5">{["Portas","Janelas","Armarios","Cozinha","Mobiliario","Outro"].map(s=>{const a=checkServ.includes(s); return <button key={s} onClick={()=>toggleCheck(s)} className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${a?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-200"}`}>{s}</button>})}</div></div>

                  <div className="grid grid-cols-3 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-zinc-500">Qtd Portas</label><input value={form.qtdPortas} onChange={e=>upd("qtdPortas",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase text-zinc-500">Qtd Janelas</label><input value={form.qtdJanelas} onChange={e=>upd("qtdJanelas",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase text-zinc-500">Qtd Armarios</label><input value={form.qtdArmarios} onChange={e=>upd("qtdArmarios",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[13px]" /></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase text-zinc-500">Material</label><select value={form.material} onChange={e=>upd("material",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[12px]"><option>Madeira</option><option>MDF</option><option>Ferragem</option></select></div>
                    <div><label className="text-[10px] font-bold uppercase text-zinc-500">Quem fornece material?</label><select value={form.quemFornece} onChange={e=>upd("quemFornece",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[12px]"><option>Contratado</option><option>Contratante</option></select></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[10px] font-bold uppercase">Valor Total MZN</label><input value={form.valorTotal} onChange={e=>upd("valorTotal",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[13px] font-semibold" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Prazo dias</label><input value={form.prazo} onChange={e=>upd("prazo",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-white text-[13px]" /></div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-3 text-[11px] text-blue-800">Regra inteligente: Portas + Janelas superior a 10 sugere prazo minimo 20 dias. Taxa plataforma 5% = {Math.round(Number(form.valorTotal||0)*0.05).toLocaleString()} MZN.</div>

                  <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
                    <div className="text-[11px] font-semibold">Forma de pagamento - 4 opcoes</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {FORMAS_PAG.map(f=>{
                        const a=form.formaPag===f.id;
                        return <button key={f.id} onClick={()=>upd("formaPag",f.id)} className={`text-left p-2.5 rounded-[10px] border ${a?"border-[#00a651] bg-emerald-50 ring-2 ring-emerald-100":"bg-zinc-50 border-zinc-200"}`}><div className="text-[11px] font-semibold">{f.nome}</div><div className="text-[10px] text-zinc-600">{f.desc}</div><div className="text-[10px] font-mono mt-1">{f.num}</div></button>
                      })}
                    </div>
                  </div>

                  {/* SETA VOLTAR E REINICIAR */}
                  <div className="flex gap-2">
                    <button onClick={()=>setTab("encontrar")} className="h-[40px] w-[40px] rounded-[10px] bg-white border border-zinc-200 grid place-items-center font-bold">â†</button>
                    <button disabled={gerando} onClick={compartilhar} className="flex-1 h-[40px] rounded-[10px] bg-[#00a651] text-white font-semibold text-[13px] disabled:opacity-50">{gerando?"Gerando...":"Gerar PDF + WhatsApp"}</button>
                  </div>

                  {gerado && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3">
                      <div className="text-[12px] font-semibold text-emerald-800">Contrato gerado com sucesso</div>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <button onClick={()=>gerarPDF()} className="h-[36px] rounded-[8px] bg-white border border-zinc-200 text-[11px] font-medium">Baixar de novo</button>
                        <button onClick={compartilhar} className="h-[36px] rounded-[8px] bg-[#00a651] text-white text-[11px] font-semibold">WhatsApp com PDF</button>
                        <button onClick={resetAll} className="h-[36px] rounded-[8px] bg-[#2563eb] text-white text-[11px] font-semibold">Novo contrato</button>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={()=>{setStep(1); window.scrollTo({top:0,behavior:"smooth"})}} className="flex-1 h-[32px] rounded-[8px] bg-white border border-zinc-200 text-[10px]">â† Voltar inicio</button>
                        <button onClick={resetAll} className="flex-1 h-[32px] rounded-[8px] bg-white border border-zinc-200 text-[10px]">Reiniciar sem refresh</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[11px] font-medium">Nome empregador</label><input value={form.empregadorNome} onChange={e=>upd("empregadorNome",e.target.value)} className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-zinc-200" /></div>
                    <div><label className="text-[11px] font-medium">Nome trabalhador</label><input value={form.trabalhadorNome} onChange={e=>upd("trabalhadorNome",e.target.value)} className="mt-1 w-full h-[40px] px-3 rounded-[10px] border border-zinc-200" /></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>setTab("encontrar")} className="h-[40px] w-[40px] rounded-[10px] bg-white border border-zinc-200 grid place-items-center">â†</button>
                    <button onClick={compartilhar} className="flex-1 h-[40px] rounded-[10px] bg-[#2563eb] text-white font-semibold">Gerar contrato {CONTRATOS.find(c=>c.id===sel)?.nome}</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-zinc-200 rounded-[16px] p-4 h-fit">
              <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">Preview Dinamico</span><span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">GERADO</span></div>
              <div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border border-zinc-200 rounded-[10px] p-3 text-[10px] font-mono leading-relaxed">
                CONTRATO DE PRESTACAO DE SERVICOS<br/>N CT-CARP-2026-002<br/><br/>
                CLAUSULA 1 - OBJECTO: {checkServ.join(", ")} - {form.qtdPortas} portas, {form.qtdJanelas} janelas<br/><br/>
                CLAUSULA 2 - QUANTIDADES<br/>Portas: {form.qtdPortas}<br/>Janelas: {form.qtdJanelas}<br/>Local: {form.localObra}<br/><br/>
                CLAUSULA 3 - MATERIAL: {form.material} - {form.quemFornece}<br/><br/>
                CLAUSULA 4 - VALOR: {form.valorTotal} MZN - Prazo {form.prazo} dias<br/><br/>
                Taxa 5% = {Math.round(Number(form.valorTotal||0)*0.05)} MZN<br/><br/>
                Pagamento: {FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome} - {FORMAS_PAG.find(f=>f.id===form.formaPag)?.num}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h-[38px] rounded-[10px] bg-[#2563eb] text-white text-[12px] font-semibold">Ver PDF</button><button onClick={compartilhar} className="h-[38px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">Negociar WhatsApp</button></div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
