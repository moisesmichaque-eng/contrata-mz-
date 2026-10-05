import { useState, useMemo } from "react";

const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ã§/g,"c").replace(/Ã‡/g,"C");

type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor";

const MODELOS_CONTRATO: Record<TipoContrato, any> = {
  "Secretario/a Domestico/a": {
    titulo: "CONTRATO DE TRABALHO DOMESTICO",
    checklist: ["Limpeza geral da casa", "Lavar louca e organizar cozinha", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Organizar despensa e fazer compras", "Cozinhar refeicoes", "Cuidar de criancas", "Receber visitas"],
    campos: ["salarioMensal", "horario", "diasSemana", "alimentacao", "alojamento"],
    clausulasEspecificas: "Trabalho domestico conforme Lei 13/2023, horario flexivel, folga domingo"
  },
  "Motorista Particular": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - MOTORISTA PARTICULAR",
    checklist: ["Conduzir empregador e familia", "Manter viatura limpa e abastecida", "Verificar oleo, agua, pneus", "Fazer manutencao preventiva", "Fazer recados e compras", "Registar quilometragem"],
    campos: ["salarioMensal", "horario", "tipoViatura", "cartaConducao", "combustivel"],
    clausulasEspecificas: "Responsabilidade sobre viatura, seguro, acidentes"
  },
  "Pedreiro": {
    titulo: "CONTRATO DE EMPREITADA - PEDREIRO",
    checklist: ["Alvenaria de blocos", "Reboco interior e exterior", "Assentar tijoleira e ceramica", "Fundacoes e vigas", "Acabamentos e pintura base", "Preparar argamassa e betao"],
    campos: ["valorTotal", "prazoDias", "localObra", "provincia", "materialFornecido", "metrosQuadrados", "formaPagamento"],
    clausulasEspecificas: "Obra por empreitada, materiais, medidas, garantia estrutural"
  },
  "Carpinteiro": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CARPINTEIRO",
    checklist: ["Fabricar e montar moveis em madeira", "Instalar portas", "Instalar janelas", "Instalar armarios", "Medir e cortar madeira", "Cortar e lixar madeira", "Aplicar verniz e acabamento", "Reparos em madeira"],
    campos: ["qtdPortas", "qtdJanelas", "qtdArmarios", "material", "quemFornece", "valorTotal", "prazoDias", "localObra", "provincia", "formaPagamento"],
    clausulasEspecificas: "Medidas, tipo madeira, garantia 6 meses"
  },
  "Serralheiro": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - SERRALHEIRO",
    checklist: ["Fabricar portoes", "Fabricar grades", "Soldar estruturas metalicas", "Instalar portoes", "Reparos em ferro e aluminio", "Pintura anti-ferrugem"],
    campos: ["qtdPortoes", "qtdGrades", "material", "valorTotal", "prazoDias", "localObra", "provincia", "formaPagamento"],
    clausulasEspecificas: "Medidas em metros, tipo ferro, soldadura, garantia"
  },
  "Eletricista": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - ELETRICISTA",
    checklist: ["Instalar quadro eletrico", "Instalar tomadas e interruptores", "Instalar iluminacao", "Passar cabos e fios", "Testar instalacao", "Manutencao eletrica"],
    campos: ["qtdPontos", "tipoInstalacao", "valorTotal", "prazoDias", "localObra", "provincia", "formaPagamento"],
    clausulasEspecificas: "Normas de seguranca, material eletrico, garantia"
  },
  "Canalizador": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CANALIZADOR",
    checklist: ["Instalar canos de agua", "Instalar esgotos", "Instalar sanita e lavatorio", "Reparar fugas", "Desentupir canos", "Testar pressao"],
    campos: ["valorTotal", "prazoDias", "localObra", "provincia", "material", "formaPagamento"],
    clausulasEspecificas: "Testes de estanquidade, garantia contra fugas"
  },
  "Pintor": {
    titulo: "CONTRATO DE PRESTACAO DE SERVICOS - PINTOR",
    checklist: ["Preparar parede (lixar e massajar)", "Pintura interior", "Pintura exterior", "Aplicar textura", "Pintar teto", "Limpeza final"],
    campos: ["metrosQuadrados", "tipoTinta", "cores", "valorTotal", "prazoDias", "localObra", "provincia", "formaPagamento"],
    clausulasEspecificas: "Tipo de tinta, numero de demaos, garantia de pintura"
  }
};

const FORMAS_PAG = [
  { id:"mpesa", nome:"M-Pesa", num:"84 123 4567", titular:"Contrata.MZ" },
  { id:"emola", nome:"e-Mola", num:"82 987 6543", titular:"Contrata.MZ" },
  { id:"bim", nome:"Banco BIM", num:"NIB 000100000012345678910 - Conta 123456789", titular:"Contrata.MZ Lda" },
  { id:"bci", nome:"Banco BCI", num:"NIB 000800000098765432110 - Conta 987654321", titular:"Contrata.MZ Lda" },
];

const PROVINCIAS = ["Maputo Cidade", "Maputo Provincia - Matola", "Maputo Provincia - Machava", "Gaza - Xai-Xai", "Gaza - Chokwe", "Inhambane", "Sofala - Beira", "Nampula", "Tete", "ZambÃ©zia"];

export default function App(){
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoContrato>("Carpinteiro");
  const [tab, setTab] = useState<"contratos"|"encontrar">("contratos");
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState<string[]>(["Fabricar e montar moveis em madeira", "Instalar 15 portas e janelas"]);
  const [tarefasExtra, setTarefasExtra] = useState("");
  const [gerando, setGerando] = useState(false);
  const [gerado, setGerado] = useState(false);

  const modelo = MODELOS_CONTRATO[tipoSelecionado];

  // Form completo com dados do contratante e contratado como no PDF Zefanias
  const [form, setForm] = useState({
    empregadorNome: "Michaque Moises Moises",
    empregadorBI: "1211561515Ab",
    empregadorTel: "840532899",
    empregadorBairro: "xai-xai",
    empregadorProvincia: "Gaza - Xai-Xai",
    trabalhadorNome: "zefanias",
    trabalhadorBI: "122254513211A",
    trabalhadorTel: "840532899",
    salario: "45000",
    valorTotal: "45000",
    dataInicio: "2026-10-05",
    horaEntrada: "07:00",
    horaSaida: "16:00",
    diasSemana: ["Segunda","Terca","Quarta","Quinta","Sexta","Sabado"],
    alimentacao: "Sim - incluida (almoco)",
    alojamento: "Nao - externo",
    formaPag: "mpesa",
    // Campos especificos por tipo
    qtdPortas: "15",
    qtdJanelas: "0",
    qtdArmarios: "0",
    qtdPortoes: "1",
    qtdGrades: "2",
    qtdPontos: "10",
    metrosQuadrados: "120",
    material: "Madeira",
    quemFornece: "Contratado",
    prazoDias: "25",
    localObra: "xai-xai",
    provincia: "Gaza - Xai-Xai",
    tipoViatura: "Toyota Corolla",
    cartaConducao: "Profissional",
    tipoInstalacao: "Instalacao completa",
    tipoTinta: "Plastica lavavel",
  });

  const upd = (k:string, v:any) => setForm((p:any)=>({...p,[k]:v}));

  const toggleTarefa = (tarefa:string) => {
    setTarefasSelecionadas(prev => prev.includes(tarefa) ? prev.filter(t=>t!==tarefa) : [...prev, tarefa]);
  };

  const todasTarefas = useMemo(()=>{
    const extra = tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean);
    return [...tarefasSelecionadas, ...extra];
  }, [tarefasSelecionadas, tarefasExtra]);

  const resetContrato = () => {
    setTarefasSelecionadas(modelo.checklist.slice(0,2));
    setTarefasExtra("");
    setGerado(false);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  // Quando muda tipo, reseta tarefas
  const mudarTipo = (novoTipo: TipoContrato) => {
    setTipoSelecionado(novoTipo);
    const novoModelo = MODELOS_CONTRATO[novoTipo];
    setTarefasSelecionadas(novoModelo.checklist.slice(0,2));
    setTarefasExtra("");
    setGerado(false);
  };

  const gerarPDF = async () => {
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

      // Header verde como no PDF Zefanias
      doc.setFillColor(0,166,81); doc.rect(0,0,W,16,"F");
      doc.setTextColor(255,255,255); doc.setFontSize(14); doc.setFont("helvetica","bold");
      doc.text("CONTRATA.MZ",M,10);
      doc.setFontSize(9); doc.setFont("helvetica","normal"); doc.text("Contrato Formal de Trabalho",W-M,10,{align:"right"});

      y=24; doc.setTextColor(30,30,30);
      add(`CONTRATO DE TRABALHO - ${tipoSelecionado.toUpperCase()}`,13,true); y+=2;
      doc.setDrawColor(0,166,81); doc.setLineWidth(0.6); doc.line(M,y,W-M,y); y+=6;

      const hoje=new Date().toLocaleDateString("pt-MZ",{day:"2-digit",month:"long",year:"numeric"});
      add(`Maputo, ${semAcento(hoje)}`,10); y+=6;

      // 1. IDENTIFICACAO - como no PDF Zefanias com todos dados
      add("1. IDENTIFICACAO DAS PARTES",11,true); y+=2;
      add(`EMPREGADOR(A): ${form.empregadorNome}, BI ${form.empregadorBI}, contacto ${form.empregadorTel}, residente em ${form.empregadorBairro} - ${form.empregadorProvincia}.`,10); y+=2;
      add(`TRABALHADOR(A): ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, contacto ${form.trabalhadorTel}, funcao ${tipoSelecionado}.`,10); y+=6;

      // 2. CONDICOES - varia por tipo
      add("2. CONDICOES",11,true); y+=2;
      if(tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular"){
        add(`Funcao: ${tipoSelecionado}`,10);
        add(`Salario: ${form.salario} MT`,10);
        add(`Inicio: ${form.dataInicio.split("-").reverse().join("/")} - Horario: ${form.horaEntrada} as ${form.horaSaida}`,10);
        add(`Dias: ${form.diasSemana.join(", ")} - Alimentacao: ${form.alimentacao} - Alojamento: ${form.alojamento}`,10);
        if(tipoSelecionado==="Motorista Particular"){
          add(`Viatura: ${form.tipoViatura} - Carta: ${form.cartaConducao}`,10);
        }
      } else {
        add(`Funcao: ${tipoSelecionado}`,10);
        add(`Valor Total: ${form.valorTotal} MT`,10);
        add(`Prazo: ${form.prazoDias} dias - Inicio: ${form.dataInicio.split("-").reverse().join("/")}`,10);
        add(`Local da Obra: ${form.localObra} - Provincia: ${form.provincia}`,10);
        if(tipoSelecionado==="Carpinteiro"){
          add(`Quantidades: ${form.qtdPortas} portas, ${form.qtdJanelas} janelas, ${form.qtdArmarios} armarios`,10);
          add(`Material: ${form.material} - Fornecimento: ${form.quemFornece}`,10);
        }
        if(tipoSelecionado==="Serralheiro"){
          add(`Quantidades: ${form.qtdPortoes} portoes, ${form.qtdGrades} grades - Material: ${form.material}`,10);
        }
        if(tipoSelecionado==="Pintor"){
          add(`Area: ${form.metrosQuadrados} m2 - Tinta: ${form.tipoTinta}`,10);
        }
        if(tipoSelecionado==="Eletricista"){
          add(`Pontos: ${form.qtdPontos} - Tipo: ${form.tipoInstalacao}`,10);
        }
      }
      y+=6;

      // 3. TAREFAS - com todas tarefas selecionadas + extra (como pediste espaÃ§o para acrescentar)
      add("3. TAREFAS E RESPONSABILIDADES",11,true); y+=2;
      add(`O trabalhador na funcao de ${tipoSelecionado} compromete-se a executar:`,10); y+=2;
      todasTarefas.forEach((t,i)=>{
        check(10);
        add(`${i+1}. ${t}`,10,false,4);
        y+=1;
      });
      y+=6;

      // 4. CLAUSULAS - especificas por tipo
      add("4. CLAUSULAS",11,true); y+=2;
      const formaPag = FORMAS_PAG.find(f=>f.id===form.formaPag);
      const clausulas=[
        `CLAUSULA 1 - OBJECTO: Prestacao de servicos como ${tipoSelecionado} conforme tarefas da secao 3. ${modelo.clausulasEspecificas}.`,
        `CLAUSULA 2 - LOCAL: ${tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? `Residencia do empregador em ${form.empregadorBairro} - ${form.empregadorProvincia}` : `Local da obra: ${form.localObra} - Provincia: ${form.provincia}`}.`,
        `CLAUSULA 3 - HORARIO: ${tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? `${form.horaEntrada} as ${form.horaSaida}, dias ${form.diasSemana.join(", ")}. Folga Domingo.` : `Prazo de execucao: ${form.prazoDias} dias uteis a contar do adiantamento. Horario de trabalho: ${form.horaEntrada} as ${form.horaSaida}.`}`,
        `CLAUSULA 4 - ${tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? "SALARIO" : "VALOR"}: ${form.valorTotal||form.salario} MT ${formaPag ? `via ${formaPag.nome} ${formaPag.num}` : "ate dia 05"} com recibo. Taxa plataforma 5% = ${Math.round(Number(form.valorTotal||form.salario)*0.05)} MZN.`,
        `CLAUSULA 5 - ${tipoSelecionado==="Secretario/a Domestico/a" ? "ALIMENTACAO E ALOJAMENTO" : "MATERIAL"}: ${tipoSelecionado==="Secretario/a Domestico/a" ? `${form.alimentacao}. ${form.alojamento}. Condicoes dignas garantidas.` : `${form.material}. Fornecimento a cargo do ${form.quemFornece}. Qualidade garantida.`}`,
        `CLAUSULA 6 - DEVERES DO TRABALHADOR: Cumprir horario/prazo, zelo, qualidade, sigilo, cuidar bens, avisar faltas 24h.`,
        `CLAUSULA 7 - DEVERES DO EMPREGADOR/CONTRATANTE: Pagar em dia, ambiente seguro, material de trabalho quando acordado, respeito.`,
        `CLAUSULA 8 - FERIAS/FINALIZACAO: ${tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? "1 dia de ferias por mes, 12 dias apos 12 meses." : "Entrega da obra conforme prazo. Vistoria final com contratante."}`,
        `CLAUSULA 9 - SEGURANCA: Empregador garante higiene e seguranca. Acidentes comunicados imediato. Uso de EPIs em obras.`,
        `CLAUSULA 10 - CONFIDENCIALIDADE: Sigilo sobre assuntos familiares e da obra mesmo apos termino.`,
        `CLAUSULA 11 - RESCISAO: ${tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? "Tempo indeterminado. Aviso 15 dias (1o ano) ou 30 dias (apos 1 ano)." : "Rescisao por incumprimento. Aviso 7 dias. Materiais pagos serao entregues."}`,
        `CLAUSULA 12 - FORO: Lei do Trabalho Mocambicana 13/2023 e Codigo Civil. Foro ${form.provincia.includes("Maputo") ? "Maputo" : form.provincia}. 90% verbais falham - este protege.`,
      ];
      clausulas.forEach(c=>{ check(20); add(c,9); y+=3; });
      y+=8; check(50);
      add("Assinaturas:",10,true); y+=12;
      const c1=M, c2=W/2+10;
      doc.setDrawColor(100,100,100); doc.setLineWidth(0.3);
      doc.line(c1,y+15,c1+60,y+15); doc.line(c2,y+15,c2+60,y+15);
      doc.setFontSize(9); doc.text(semAcento("Empregador(a)"),c1,y+20); doc.text(semAcento(form.empregadorNome),c1,y+24);
      doc.text(semAcento("Trabalhador(a)"),c2,y+20); doc.text(semAcento(form.trabalhadorNome),c2,y+24);
      y=y+35; doc.setFontSize(8); doc.setTextColor(100,100,100);
      doc.text(semAcento(`Gerado por Contrata.MZ - ${hoje} - Contrato CMZ-${new Date().getFullYear()}-${Math.floor(Math.random()*9000)+1000} - Valido Lei Mocambicana`),M,y);

      const fn=`Contrato-${form.trabalhadorNome.replace(/\s+/g,"-").toUpperCase()}-${tipoSelecionado.replace(/\s+/g,"-").toUpperCase()}.pdf`;
      doc.save(fn); setGerado(true);
      return { blob:doc.output("blob"), fileName:fn };
    } finally{ setGerando(false); }
  };

  const compartilhar=async()=>{
    const txt=`CONTRATO ${semAcento(tipoSelecionado).toUpperCase()} - ${form.trabalhadorNome} - Valor ${form.valorTotal||form.salario} MZN - Tarefas: ${todasTarefas.join(", ")}`;
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
      <header className="sticky top-0 z-20 bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-[1280px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-[12px] bg-[#00a651] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[15px]">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">ENCONTRE. NEGOCIE. FORMALIZE.</div></div></div>
          <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">Taxa 5% M-Pesa e-Mola Banco BIM BCI</div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pt-4">
        <div className="bg-white border border-zinc-200 rounded-[16px] p-4 flex justify-between">
          <div><div className="text-[11px] font-bold tracking-widest text-zinc-500">BIBLIOTECA 10 MVP - CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS</div><div className="text-[13px] font-semibold mt-1">Cada trabalho tem seu contrato diferente: tarefas, salario, valor, local, provincia, BI, contacto</div></div>
        </div>

        <div className="mt-4 flex gap-2 p-1 bg-white border border-zinc-200 rounded-[14px] w-fit">
          <button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="contratos"?"bg-[#2563eb] text-white":"text-zinc-600"}`}>CONTRATOS Biblioteca</button>
          <button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold ${tab==="encontrar"?"bg-[#00a651] text-white":"text-zinc-600"}`}>ENCONTRAR</button>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 py-6 grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-4">
        <div className="bg-white border border-zinc-200 rounded-[16px] p-3 h-fit">
          <div className="font-semibold text-[13px]">Biblioteca - Selecione o tipo</div>
          <div className="text-[11px] text-zinc-500 mt-1">Cada tipo tem contrato proprio com tarefas e clausulas diferentes</div>
          <div className="mt-3 space-y-2">
            {(Object.keys(MODELOS_CONTRATO) as TipoContrato[]).map(t=>{
              const a=tipoSelecionado===t;
              return <button key={t} onClick={()=>mudarTipo(t)} className={`w-full text-left p-3 rounded-[12px] border ${a?"bg-emerald-50 border-emerald-300":"bg-white border-zinc-200 hover:bg-zinc-50"}`}><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500 mt-1">{MODELOS_CONTRATO[t].checklist.slice(0,2).join(", ")}</div><div className="text-[10px] mt-1 text-blue-700">{MODELOS_CONTRATO[t].campos.length} campos especificos</div></button>
            })}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-[16px] p-5">
          <h3 className="font-bold text-[14px]">{modelo.titulo}</h3>
          <div className="text-[11px] text-zinc-500 mt-1">Modelo especifico para {tipoSelecionado} - com tarefas, valor/salario e clausulas proprias</div>

          {/* DADOS CONTRATANTE E CONTRATADO - como no PDF Zefanias */}
          <div className="mt-5 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-3">
              <div className="font-semibold text-[12px] text-blue-800">1. DADOS DO CONTRATANTE (Empregador)</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase">Nome completo</label><input value={form.empregadorNome} onChange={e=>upd("empregadorNome",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Numero BI</label><input value={form.empregadorBI} onChange={e=>upd("empregadorBI",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Contacto</label><input value={form.empregadorTel} onChange={e=>upd("empregadorTel",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Local / Bairro</label><input value={form.empregadorBairro} onChange={e=>upd("empregadorBairro",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div className="col-span-2"><label className="text-[10px] font-bold uppercase">Provincia</label><select value={form.empregadorProvincia} onChange={e=>upd("empregadorProvincia",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[12px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3">
              <div className="font-semibold text-[12px] text-emerald-800">2. DADOS DO CONTRATADO (Trabalhador) - {tipoSelecionado}</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div><label className="text-[10px] font-bold uppercase">Nome completo</label><input value={form.trabalhadorNome} onChange={e=>upd("trabalhadorNome",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Numero BI</label><input value={form.trabalhadorBI} onChange={e=>upd("trabalhadorBI",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Contacto</label><input value={form.trabalhadorTel} onChange={e=>upd("trabalhadorTel",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px]" /></div>
                <div><label className="text-[10px] font-bold uppercase">Funcao</label><input value={tipoSelecionado} disabled className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 bg-zinc-100 text-[12px] font-semibold" /></div>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
              <div className="font-semibold text-[12px]">3. CONDICOES ESPECIFICAS - {tipoSelecionado}</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular") ? (
                  <>
                    <div><label className="text-[10px] font-bold uppercase">Salario mensal MT</label><input value={form.salario} onChange={e=>upd("salario",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[13px] font-semibold" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Data inicio</label><input type="date" value={form.dataInicio} onChange={e=>upd("dataInicio",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border border-zinc-200 text-[12px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Hora entrada</label><input type="time" value={form.horaEntrada} onChange={e=>upd("horaEntrada",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Hora saida</label><input type="time" value={form.horaSaida} onChange={e=>upd("horaSaida",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div>
                  </>
                ) : (
                  <>
                    <div><label className="text-[10px] font-bold uppercase">Valor total MZN</label><input value={form.valorTotal} onChange={e=>upd("valorTotal",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px] font-semibold" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Prazo dias</label><input value={form.prazoDias} onChange={e=>upd("prazoDias",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[13px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Local da obra</label><input value={form.localObra} onChange={e=>upd("localObra",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[12px]" /></div>
                    <div><label className="text-[10px] font-bold uppercase">Provincia</label><select value={form.provincia} onChange={e=>upd("provincia",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border text-[12px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div>
                    {tipoSelecionado==="Carpinteiro" && (
                      <>
                        <div><label className="text-[10px] font-bold uppercase">Qtd Portas</label><input value={form.qtdPortas} onChange={e=>upd("qtdPortas",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div>
                        <div><label className="text-[10px] font-bold uppercase">Qtd Janelas</label><input value={form.qtdJanelas} onChange={e=>upd("qtdJanelas",e.target.value)} className="mt-1 w-full h-[36px] px-3 rounded-[10px] border" /></div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
              <div className="font-semibold text-[12px]">4. TAREFAS E RESPONSABILIDADES - Checklist {tipoSelecionado}</div>
              <div className="text-[11px] text-zinc-500 mt-1">Selecione as tarefas e acrescentem mais no campo abaixo - vao direto para descricao do contrato como no PDF Zefanias</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {modelo.checklist.map(t=>{
                  const ativo=tarefasSelecionadas.includes(t);
                  return <button key={t} onClick={()=>toggleTarefa(t)} className={`px-3 py-1.5 rounded-full text-[11px] border ${ativo?"bg-[#00a651] text-white border-[#00a651]":"bg-white border-zinc-200"}`}>{t}</button>
                })}
              </div>
              <div className="mt-3">
                <label className="text-[10px] font-bold uppercase">Acrescentar tarefas (separe por virgula) - Espaco para acrescentar</label>
                <textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} placeholder="Ex: Instalar 15 portas e janelas, Aplicar verniz e acabamento valor" className="mt-1 w-full min-h-[70px] p-3 rounded-[10px] border border-zinc-200 text-[12px]" />
              </div>
              <div className="mt-2 text-[11px] text-zinc-600">Total {todasTarefas.length} tarefas selecionadas: {todasTarefas.join(", ")}</div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-[12px] p-3">
              <div className="text-[11px] font-semibold">Forma de pagamento - 4 opcoes inclui banco</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {FORMAS_PAG.map(f=>{
                  const a=form.formaPag===f.id;
                  return <button key={f.id} onClick={()=>upd("formaPag",f.id)} className={`text-left p-2.5 rounded-[10px] border ${a?"border-[#00a651] bg-emerald-50 ring-2 ring-emerald-100":"bg-zinc-50 border-zinc-200"}`}><div className="text-[11px] font-semibold">{f.nome}</div><div className="text-[10px] font-mono mt-1">{f.num}</div></button>
                })}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={()=>setTab("encontrar")} className="h-[44px] w-[44px] rounded-[12px] bg-white border border-zinc-200 grid place-items-center font-bold">â†</button>
              <button disabled={gerando} onClick={compartilhar} className="flex-1 h-[44px] rounded-[12px] bg-[#00a651] text-white font-semibold text-[13px]">{gerando?"Gerando...":"Gerar PDF + WhatsApp - "+tipoSelecionado}</button>
            </div>

            {gerado && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-3">
                <div className="text-[12px] font-semibold text-emerald-800">Contrato gerado com sucesso</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <button onClick={()=>gerarPDF()} className="h-[36px] rounded-[8px] bg-white border text-[11px]">Baixar de novo</button>
                  <button onClick={compartilhar} className="h-[36px] rounded-[8px] bg-[#00a651] text-white text-[11px]">WhatsApp com PDF</button>
                  <button onClick={resetContrato} className="h-[36px] rounded-[8px] bg-[#2563eb] text-white text-[11px]">Novo contrato</button>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={resetContrato} className="flex-1 h-[32px] rounded-[8px] bg-white border text-[10px]">â† Voltar inicio</button>
                  <button onClick={resetContrato} className="flex-1 h-[32px] rounded-[8px] bg-white border text-[10px]">Reiniciar sem refresh</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-[16px] p-4 h-fit sticky top-[80px]">
          <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">Preview Dinamico - {tipoSelecionado}</span><span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">GERADO</span></div>
          <div className="text-[10px] text-zinc-500 mt-1">CONTRATO = MODELO + CAMPOS + REGRAS + CLAUSULAS - especifico para {tipoSelecionado}</div>
          <div className="mt-3 h-[600px] overflow-auto bg-[#f8fafc] border border-zinc-200 rounded-[10px] p-3 text-[10px] font-mono leading-relaxed">
            {MODELOS_CONTRATO[tipoSelecionado].titulo}<br/><br/>
            1. IDENTIFICACAO DAS PARTES<br/>
            EMPREGADOR(A): {form.empregadorNome}, BI {form.empregadorBI}, contacto {form.empregadorTel}, residente em {form.empregadorBairro} - {form.empregadorProvincia}.<br/>
            TRABALHADOR(A): {form.trabalhadorNome}, BI {form.trabalhadorBI}, contacto {form.trabalhadorTel}, funcao {tipoSelecionado}.<br/><br/>
            2. CONDICOES<br/>
            Funcao: {tipoSelecionado}<br/>
            {tipoSelecionado==="Secretario/a Domestico/a" || tipoSelecionado==="Motorista Particular" ? `Salario: ${form.salario} MT - Horario: ${form.horaEntrada} as ${form.horaSaida}` : `Valor: ${form.valorTotal} MT - Prazo: ${form.prazoDias} dias - Local: ${form.localObra} - ${form.provincia}`}<br/><br/>
            3. TAREFAS E RESPONSABILIDADES ({todasTarefas.length})<br/>
            {todasTarefas.map((t,i)=>`${i+1}. ${t}<br/>`).join("")}<br/>
            4. CLAUSULAS (12 clausulas especificas para {tipoSelecionado})<br/>
            Taxa 5% = {Math.round(Number(form.valorTotal||form.salario)*0.05)} MZN<br/>
            Pagamento: {FORMAS_PAG.find(f=>f.id===form.formaPag)?.nome} {FORMAS_PAG.find(f=>f.id===form.formaPag)?.num}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={()=>gerarPDF()} className="h-[38px] rounded-[10px] bg-[#2563eb] text-white text-[12px] font-semibold">Ver PDF</button><button onClick={compartilhar} className="h-[38px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">WhatsApp</button></div>
        </div>
      </main>
    </div>
  );
}
