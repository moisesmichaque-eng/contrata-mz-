import { useState, useEffect, useMemo } from "react";

// SEM ACENTOS NO PDF - para evitar caracteres bugados no jsPDF Helvetica
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Ã§/g,"c").replace(/Ã‡/g,"C");

type JobType = 
  | "Secretario/a Domestico/a"
  | "Cozinheiro/a"
  | "Baba/Cuidador Criancas"
  | "Motorista Privado"
  | "Jardineiro"
  | "Lavadeiro/a"
  | "Cuidador Idosos"
  | "Guarda"
  | "Pedreiro"
  | "Carpinteiro"
  | "Limpeza Escritorio";

const JOB_TASKS: Record<JobType, string[]> = {
  "Secretario/a Domestico/a": [
    "Limpeza geral da casa e arrumacao de todos os compartimentos",
    "Lavar louca e organizar cozinha apos refeicoes",
    "Arrumar quartos, fazer camas e organizar roupeiros",
    "Lavar, passar e dobrar roupa",
    "Organizar despensa e controlar stock de produtos",
    "Fazer compras domesticas e gerir mantimentos",
    "Receber encomendas e atender visitas",
  ],
  "Cozinheiro/a": [
    "Preparar pequeno-almoco, almoco e jantar diariamente",
    "Elaborar lista de compras e controlar validade dos alimentos",
    "Limpar e organizar cozinha, fogao e utensilios",
    "Conservar e armazenar alimentos correctamente",
    "Preparar lanches e refeicoes especiais quando solicitado",
  ],
  "Baba/Cuidador Criancas": [
    "Cuidar e supervisionar as criancas com seguranca e carinho",
    "Dar banho, trocar roupa e cuidar da higiene",
    "Preparar refeicoes infantis",
    "Ajudar nos deveres escolares e actividades ludicas",
    "Levar e buscar na escola",
  ],
  "Motorista Privado": [
    "Conduzir empregador e familia com seguranca",
    "Manter viatura limpa e em bom estado",
    "Verificar oleo, agua, combustivel e pneus",
    "Fazer manutencao preventiva",
    "Fazer recados e compras",
  ],
  "Jardineiro": [
    "Cortar relva e aparar bordas",
    "Regar plantas e relva",
    "Podar arvores e cercas vivas",
    "Limpar quintal e remover folhas",
    "Adubar jardim",
  ],
  "Lavadeiro/a": [
    "Lavar roupa separando por cores e tecidos",
    "Passar a ferro toda a roupa",
    "Dobrar e guardar roupa",
    "Tratar manchas dificeis",
  ],
  "Cuidador Idosos": [
    "Acompanhar idoso com respeito e paciencia",
    "Dar medicacao conforme orientacao medica",
    "Preparar refeicoes adequadas",
    "Ajudar na higiene pessoal",
    "Levar a consultas medicas",
  ],
  "Guarda": [
    "Vigiar residencia e bens",
    "Controlar entrada e saida de pessoas",
    "Fazer rondas nocturnas",
    "Manter portoes fechados",
    "Alertar sobre anomalias",
  ],
  "Pedreiro": [
    "Execucao de alvenaria e reboco",
    "Leitura de projectos simples",
    "Acabamentos de paredes e pisos",
    "Preparar argamassa e beta",
  ],
  "Carpinteiro": [
    "Fabricar e montar moveis em madeira",
    "Instalar portas e janelas",
    "Medir, cortar e lixar madeira",
    "Aplicar verniz e acabamentos",
  ],
  "Limpeza Escritorio": [
    "Limpar secretarias e equipamentos",
    "Varrer e encerar chao",
    "Limpar vidros",
    "Esvaziar lixeiras",
    "Limpar casas de banho",
  ],
};

const JOB_TYPES: JobType[] = Object.keys(JOB_TASKS) as JobType[];

const FORMAS_PAGAMENTO = [
  { id: "mpesa", nome: "M-Pesa", numero: "84 123 4567", titular: "Contrata.MZ", icon: "ðŸ“±", desc: "*150*00#", cor: "bg-red-50 border-red-200 text-red-700" },
  { id: "emola", nome: "e-Mola", numero: "82 987 6543", titular: "Contrata.MZ", icon: "ðŸ’³", desc: "Movitel e-Mola", cor: "bg-yellow-50 border-yellow-200 text-yellow-800" },
  { id: "bim", nome: "Banco BIM", numero: "123456789 - NIB 000100000012345678910", titular: "Contrata.MZ Lda", icon: "ðŸ¦", desc: "BIM - Millennium", cor: "bg-blue-50 border-blue-200 text-blue-800" },
  { id: "bci", nome: "Banco BCI", numero: "987654321 - NIB 000800000098765432110", titular: "Contrata.MZ Lda", icon: "ðŸ§", desc: "BCI - Fomento", cor: "bg-indigo-50 border-indigo-200 text-indigo-800" },
];

type FormData = {
  empregadorNome: string; empregadorBI: string; empregadorTel: string; empregadorBairro: string;
  trabalhadorTipo: JobType; trabalhadorNome: string; trabalhadorBI: string; trabalhadorTel: string;
  salario: string; dataInicio: string; horaEntrada: string; horaSaida: string;
  diasSemana: string[]; tarefas: string; alimentacao: string; alojamento: string;
  formaPagamento: string;
};

const DIAS = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];
const DIAS_LABEL: Record<string,string> = { Segunda:"Seg", Terca:"Ter", Quarta:"Qua", Quinta:"Qui", Sexta:"Sex", Sabado:"Sab", Domingo:"Dom" };

export default function App() {
  const [activeTab, setActiveTab] = useState<"contrato" | "profissionais">("contrato");
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contratoGerado, setContratoGerado] = useState(false);

  const [form, setForm] = useState<FormData>({
    empregadorNome: "", empregadorBI: "", empregadorTel: "", empregadorBairro: "",
    trabalhadorTipo: "Secretario/a Domestico/a",
    trabalhadorNome: "", trabalhadorBI: "", trabalhadorTel: "",
    salario: "15000", dataInicio: new Date().toISOString().split("T")[0],
    horaEntrada: "07:00", horaSaida: "16:00",
    diasSemana: ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"],
    tarefas: JOB_TASKS["Secretario/a Domestico/a"].join(", "),
    alimentacao: "Sim - incluida (almoco)", alojamento: "Nao - externo",
    formaPagamento: "mpesa"
  });

  const tarefasArray = useMemo(() => form.tarefas.split(",").map(t=>t.trim()).filter(Boolean), [form.tarefas]);

  useEffect(() => {
    const tasks = JOB_TASKS[form.trabalhadorTipo];
    if (tasks) setForm(prev => ({ ...prev, tarefas: tasks.join(", ") }));
  }, [form.trabalhadorTipo]);

  const resetContrato = () => {
    setForm({
      empregadorNome: "", empregadorBI: "", empregadorTel: "", empregadorBairro: "",
      trabalhadorTipo: "Secretario/a Domestico/a",
      trabalhadorNome: "", trabalhadorBI: "", trabalhadorTel: "",
      salario: "15000", dataInicio: new Date().toISOString().split("T")[0],
      horaEntrada: "07:00", horaSaida: "16:00",
      diasSemana: ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"],
      tarefas: JOB_TASKS["Secretario/a Domestico/a"].join(", "),
      alimentacao: "Sim - incluida (almoco)", alojamento: "Nao - externo",
      formaPagamento: "mpesa"
    });
    setStep(1);
    setContratoGerado(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const updateField = (field: keyof FormData, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleDia = (dia: string) => setForm(prev => ({
    ...prev, diasSemana: prev.diasSemana.includes(dia) ? prev.diasSemana.filter(d=>d!==dia) : [...prev.diasSemana, dia]
  }));

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      let jsPDFConstructor: any;
      try {
        const mod = await import("jspdf");
        jsPDFConstructor = mod.jsPDF || mod.default || mod;
      } catch {
        await new Promise<void>((resolve, reject) => {
          if ((window as any).jspdf) { resolve(); return; }
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
          s.onload = () => resolve(); s.onerror = () => reject(new Error("jsPDF failed"));
          document.head.appendChild(s);
        });
        jsPDFConstructor = (window as any).jspdf?.jsPDF || (window as any).jsPDF;
      }

      const doc = new jsPDFConstructor({ unit:"mm", format:"a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin*2;
      let y = margin;

      const checkPage = (needed=15) => { if (y+needed > pageHeight-20) { doc.addPage(); y=margin; } };
      const addWrapped = (text: string, fontSize=10, isBold=false, indent=0) => {
        const clean = semAcento(text);
        doc.setFontSize(fontSize); doc.setFont("helvetica", isBold?"bold":"normal");
        const lines = doc.splitTextToSize(clean, contentWidth - indent);
        for (const line of lines) { checkPage(6); doc.text(line, margin+indent, y); y+=5.5; }
      };

      // Header verde
      doc.setFillColor(0,166,81); doc.rect(0,0,pageWidth,18,"F");
      doc.setTextColor(255,255,255); doc.setFontSize(16); doc.setFont("helvetica","bold");
      doc.text("CONTRATA.MZ", margin, 11);
      doc.setFontSize(9); doc.setFont("helvetica","normal");
      doc.text(semAcento("Contrato Formal de Trabalho"), pageWidth-margin, 11, { align:"right" });

      y=26; doc.setTextColor(30,30,30);
      addWrapped(`CONTRATO DE TRABALHO - ${form.trabalhadorTipo.toUpperCase()}`,14,true); y+=2;
      doc.setDrawColor(0,166,81); doc.setLineWidth(0.8); doc.line(margin,y,pageWidth-margin,y); y+=8;

      const today = new Date().toLocaleDateString("pt-MZ",{day:"2-digit",month:"long",year:"numeric"});
      addWrapped(`Maputo, ${semAcento(today)}`,10,false); y+=4;

      addWrapped("1. IDENTIFICACAO DAS PARTES",11,true); y+=2;
      addWrapped(`EMPREGADOR(A): ${form.empregadorNome}, BI ${form.empregadorBI}, contacto ${form.empregadorTel}, residente em ${form.empregadorBairro}.`,10,false); y+=2;
      addWrapped(`TRABALHADOR(A): ${form.trabalhadorNome}, BI ${form.trabalhadorBI}, contacto ${form.trabalhadorTel}, funcao ${form.trabalhadorTipo}.`,10,false); y+=6;

      addWrapped("2. CONDICOES",11,true); y+=2;
      addWrapped(`Funcao: ${form.trabalhadorTipo}`,10,false);
      addWrapped(`Salario: ${form.salario} MT`,10,false);
      addWrapped(`Inicio: ${form.dataInicio.split("-").reverse().join("/")} - Horario: ${form.horaEntrada} as ${form.horaSaida}`,10,false);
      addWrapped(`Dias: ${form.diasSemana.join(", ")} - Alimentacao: ${form.alimentacao} - Alojamento: ${form.alojamento}`,10,false); y+=6;

      addWrapped("3. TAREFAS E RESPONSABILIDADES",11,true); y+=2;
      addWrapped(`O trabalhador na funcao de ${form.trabalhadorTipo} compromete-se a executar:`,10,false); y+=2;
      tarefasArray.forEach((t,i)=>{ checkPage(10); addWrapped(`${i+1}. ${t}`,10,false,4); y+=1; }); y+=6;

      addWrapped("4. CLAUSULAS",11,true); y+=2;
      const clauses = [
        `CLAUSULA 1 - OBJECTO: Prestacao de servicos como ${form.trabalhadorTipo} conforme tarefas da secao 3.`,
        `CLAUSULA 2 - LOCAL: Residencia do empregador em ${form.empregadorBairro}.`,
        `CLAUSULA 3 - HORARIO: ${form.horaEntrada} as ${form.horaSaida}, dias ${form.diasSemana.join(", ")}. Folga Domingo.`,
        `CLAUSULA 4 - SALARIO: ${form.salario} MT ate dia 05 via ${FORMAS_PAGAMENTO.find(f=>f.id===form.formaPagamento)?.nome || "M-Pesa"} com recibo.`,
        `CLAUSULA 5 - ALIMENTACAO E ALOJAMENTO: ${form.alimentacao}. ${form.alojamento}. Condicoes dignas garantidas.`,
        `CLAUSULA 6 - DEVERES DO TRABALHADOR: Cumprir horario, zelo, sigilo, cuidar bens, avisar faltas 24h.`,
        `CLAUSULA 7 - DEVERES DO EMPREGADOR: Pagar em dia, ambiente seguro, material de trabalho, respeito.`,
        `CLAUSULA 8 - FERIAS: 1 dia por mes, 12 dias apos 12 meses. Faltas justificadas com atestado.`,
        `CLAUSULA 9 - SEGURANCA: Empregador garante higiene e seguranca. Acidentes comunicados imediato.`,
        `CLAUSULA 10 - CONFIDENCIALIDADE: Sigilo sobre assuntos familiares mesmo apos termino.`,
        `CLAUSULA 11 - RESCISAO: Tempo indeterminado. Aviso 15 dias (1o ano) ou 30 dias (apos 1 ano).`,
        `CLAUSULA 12 - FORO: Lei do Trabalho Mocambicana 13/2023. Foro Maputo. 90% verbais falham - este protege.`,
      ];
      clauses.forEach(c=>{ checkPage(20); addWrapped(c,9,false); y+=3; });
      y+=6; checkPage(50);
      addWrapped("Assinaturas:",10,true); y+=12;
      const col1=margin, col2=pageWidth/2+10;
      doc.setDrawColor(120,120,120); doc.setLineWidth(0.3);
      doc.line(col1,y+15,col1+60,y+15); doc.line(col2,y+15,col2+60,y+15);
      doc.setFontSize(9); doc.setFont("helvetica","normal");
      doc.text(semAcento("Empregador(a)"),col1,y+20); doc.text(semAcento(form.empregadorNome),col1,y+24);
      doc.text(semAcento("Trabalhador(a)"),col2,y+20); doc.text(semAcento(form.trabalhadorNome),col2,y+24);
      y=y+35; doc.setFontSize(8); doc.setTextColor(100,100,100);
      doc.text(semAcento(`Gerado por Contrata.MZ - ${today} - Contrato CMZ-${new Date().getFullYear()}-${Math.floor(Math.random()*9000)+1000} - Valido Lei Mocambicana`),margin,y);

      const fileName = `Contrato-${form.trabalhadorNome.replace(/\s+/g,"-").toUpperCase()}.pdf`;
      doc.save(fileName);
      setContratoGerado(true);
      return { blob: doc.output("blob"), fileName };
    } finally { setIsGenerating(false); }
  };

  const handleWhatsAppShare = async () => {
    const forma = FORMAS_PAGAMENTO.find(f=>f.id===form.formaPagamento);
    const text = `*CONTRATO DE TRABALHO - ${semAcento(form.trabalhadorTipo).toUpperCase()}*\n\nOla ${form.trabalhadorNome}! Segue resumo:\n\nFuncao: ${form.trabalhadorTipo}\nSalario: ${form.salario} MT\nInicio: ${form.dataInicio.split("-").reverse().join("/")}\nHorario: ${form.horaEntrada} - ${form.horaSaida}\nDias: ${form.diasSemana.join(", ")}\nPagamento: ${forma?.nome} - ${forma?.numero}\n\nTarefas (${tarefasArray.length}):\n${tarefasArray.map((t,i)=>`${i+1}. ${t}`).join("\n")}\n\nPDF gerado. Protege ambas partes.\nGerado por Contrata.MZ`;

    try {
      const { blob, fileName } = await generatePDF() as any;
      const file = new File([blob], fileName, { type:"application/pdf" });
      if (navigator.canShare && navigator.canShare({ files:[file] })) {
        await navigator.share({ title:fileName, text, files:[file] } as any);
        return;
      }
    } catch(e){ console.log("share falhou", e); }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");
  };

  return (
    <div className="min-h-screen bg-[#fbfcfa] text-zinc-900 font-[Inter,sans-serif] antialiased">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); *{font-family:'Inter',sans-serif}`}</style>

      <header className="sticky top-0 z-30 bg-[#fbfcfa]/80 backdrop-blur-xl border-b border-zinc-200">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] bg-[#00a651] flex items-center justify-center text-white font-bold text-[18px]">C</div>
            <span className="font-bold text-[17px]">Contrata.MZ</span>
            <span className="px-2 py-0.5 rounded-full bg-[#00a651]/10 text-[#00a651] text-[10px] font-bold tracking-widest border border-[#00a651]/20">BETA</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[12px] text-zinc-500"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />90% verbais geram conflito. Formalize em 3 min.</div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 p-1.5 bg-white border border-zinc-200 rounded-[16px] w-fit">
          <button onClick={()=>setActiveTab("contrato")} className={`px-5 py-2.5 rounded-[12px] text-[14px] font-semibold ${activeTab==="contrato"?"bg-[#00a651] text-white":"bg-white text-zinc-600"}`}>Gerar Contrato <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-white/20">250MT</span></button>
          <button onClick={()=>setActiveTab("profissionais")} className={`px-5 py-2.5 rounded-[12px] text-[14px] font-semibold ${activeTab==="profissionais"?"bg-[#00a651] text-white":"bg-white text-zinc-600"}`}>Encontrar Profissionais</button>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 pb-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
        {activeTab==="contrato" ? (
          <>
            <div className="bg-white border border-zinc-200 rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {[1,2,3].map(s=>(
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border ${step===s?"bg-[#00a651] text-white border-[#00a651]":step>s?"bg-emerald-50 text-[#00a651] border-emerald-200":"bg-white text-zinc-400 border-zinc-200"}`}>{step>s?"âœ“":s}</div>
                      {s<3 && <div className={`w-8 h-[2px] ${step>s?"bg-[#00a651]":"bg-zinc-200"}`} />}
                    </div>
                  ))}
                </div>
                <div className="text-[12px] text-zinc-500">Passo {step} de 3</div>
              </div>

              <div className="p-6 sm:p-8">
                {step===1 && (
                  <div className="space-y-6">
                    <div><h2 className="text-[18px] font-semibold">Quem contrata</h2><p className="text-[13px] text-zinc-500 mt-1">Dados do empregador</p></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><label className="text-[12px] font-medium">Nome completo</label><input value={form.empregadorNome} onChange={e=>updateField("empregadorNome",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-[#00a651]" placeholder="Joao Mabunda" /></div>
                      <div><label className="text-[12px] font-medium">No BI</label><input value={form.empregadorBI} onChange={e=>updateField("empregadorBI",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div><label className="text-[12px] font-medium">Telefone</label><input value={form.empregadorTel} onChange={e=>updateField("empregadorTel",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div className="sm:col-span-2"><label className="text-[12px] font-medium">Bairro / Endereco</label><input value={form.empregadorBairro} onChange={e=>updateField("empregadorBairro",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                    </div>
                    <div className="flex gap-2"><button onClick={()=>setStep(2)} className="flex-1 h-[44px] rounded-[12px] bg-[#00a651] text-white font-semibold">Continuar â†’</button></div>
                  </div>
                )}

                {step===2 && (
                  <div className="space-y-6">
                    <div><h2 className="text-[18px] font-semibold">Quem vai trabalhar</h2><p className="text-[13px] text-zinc-500 mt-1">Dados do profissional</p></div>
                    <div><label className="text-[12px] font-medium">Tipo de trabalho</label>
                      <select value={form.trabalhadorTipo} onChange={e=>updateField("trabalhadorTipo",e.target.value as JobType)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px] font-medium">
                        {JOB_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><label className="text-[12px] font-medium">Nome completo</label><input value={form.trabalhadorNome} onChange={e=>updateField("trabalhadorNome",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div><label className="text-[12px] font-medium">No BI</label><input value={form.trabalhadorBI} onChange={e=>updateField("trabalhadorBI",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div><label className="text-[12px] font-medium">Telefone</label><input value={form.trabalhadorTel} onChange={e=>updateField("trabalhadorTel",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>setStep(1)} className="h-[44px] w-[44px] rounded-[12px] bg-white border border-zinc-200 flex items-center justify-center">â†</button>
                      <button onClick={()=>setStep(3)} className="flex-1 h-[44px] rounded-[12px] bg-[#00a651] text-white font-semibold">Continuar â†’</button>
                    </div>
                  </div>
                )}

                {step===3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><div><h2 className="text-[18px] font-semibold">Condicoes - {form.trabalhadorTipo}</h2><p className="text-[13px] text-zinc-500 mt-1">Salario, horario, pagamento</p></div></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className="text-[12px] font-medium">Salario mensal (MT)</label><input type="number" value={form.salario} onChange={e=>updateField("salario",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px] font-semibold" /></div>
                      <div><label className="text-[12px] font-medium">Data inicio</label><input type="date" value={form.dataInicio} onChange={e=>updateField("dataInicio",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div><label className="text-[12px] font-medium">Hora entrada</label><input type="time" value={form.horaEntrada} onChange={e=>updateField("horaEntrada",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                      <div><label className="text-[12px] font-medium">Hora saida</label><input type="time" value={form.horaSaida} onChange={e=>updateField("horaSaida",e.target.value)} className="mt-1.5 w-full h-[44px] px-4 rounded-[12px] border border-zinc-200 bg-white text-[14px]" /></div>
                    </div>

                    <div><label className="text-[12px] font-medium">Dias da semana</label>
                      <div className="mt-2 grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {DIAS.map(dia=>{
                          const active=form.diasSemana.includes(dia);
                          return <button key={dia} onClick={()=>toggleDia(dia)} className={`h-[36px] px-2 rounded-[10px] text-[11px] font-medium border ${active?"bg-[#00a651] text-white border-[#00a651]":"bg-white text-zinc-600 border-zinc-200"}`}>{DIAS_LABEL[dia]}</button>
                        })}
                      </div>
                    </div>

                    <div><label className="text-[12px] font-medium">Tarefas - {form.trabalhadorTipo}</label>
                      <textarea value={form.tarefas} onChange={e=>updateField("tarefas",e.target.value)} className="mt-1.5 w-full min-h-[90px] p-3 rounded-[12px] border border-zinc-200 bg-white text-[13px]" placeholder="Separe por virgula" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[12px] font-medium">Alimentacao</label><select value={form.alimentacao} onChange={e=>updateField("alimentacao",e.target.value)} className="mt-1.5 w-full h-[44px] px-3 rounded-[12px] border border-zinc-200 bg-white text-[13px]"><option>Sim - incluida (almoco)</option><option>Sim - todas refeicoes</option><option>Nao - por conta trabalhador</option></select></div>
                      <div><label className="text-[12px] font-medium">Alojamento</label><select value={form.alojamento} onChange={e=>updateField("alojamento",e.target.value)} className="mt-1.5 w-full h-[44px] px-3 rounded-[12px] border border-zinc-200 bg-white text-[13px]"><option>Nao - externo</option><option>Sim - interno</option><option>Sim - quarto separado</option></select></div>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-[14px] p-4">
                      <label className="text-[12px] font-semibold">Forma de pagamento - 4 opcoes</label>
                      <p className="text-[11px] text-zinc-500 mt-1">Escolha como vai pagar os 250MT do contrato</p>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {FORMAS_PAGAMENTO.map(fp=>{
                          const active = form.formaPagamento===fp.id;
                          return (
                            <button key={fp.id} onClick={()=>updateField("formaPagamento",fp.id)} className={`text-left p-3 rounded-[12px] border transition-all ${active? fp.cor + " ring-2 ring-[#00a651]/20 border-[#00a651]":"bg-[#fbfcfa] border-zinc-200 hover:bg-white"}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex gap-2.5"><span className="text-[16px]">{fp.icon}</span><div><p className="text-[12px] font-semibold leading-none">{fp.nome}</p><p className="text-[10px] text-zinc-600 mt-1">{fp.desc}</p></div></div>
                                {active && <span className="w-5 h-5 rounded-full bg-[#00a651] text-white grid place-items-center text-[10px]">âœ“</span>}
                              </div>
                              <p className="text-[11px] mt-2 font-mono text-zinc-700">{fp.numero}</p>
                              <p className="text-[10px] mt-1 text-zinc-500">{fp.titular}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {!contratoGerado ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <button onClick={()=>setStep(2)} className="h-[48px] w-[48px] rounded-[12px] bg-white border border-zinc-200 grid place-items-center text-[18px]">â†</button>
                          <button disabled={isGenerating} onClick={handleWhatsAppShare} className="flex-1 h-[48px] rounded-[12px] bg-[#00a651] text-white font-bold text-[14px] disabled:opacity-60">
                            {isGenerating?"Gerando...":`Pagar 250MT via ${FORMAS_PAGAMENTO.find(f=>f.id===form.formaPagamento)?.nome} e Gerar PDF`}
                          </button>
                        </div>
                        <p className="text-[11px] text-center text-zinc-500">Checkout igual EasyPay. Hoje simulado, amanha ligamos API real M-Pesa e banco.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-emerald-50 border border-emerald-200 rounded-[14px] p-4">
                        <div className="flex items-center gap-2 text-emerald-800 font-semibold text-[13px]"><span className="w-6 h-6 rounded-full bg-[#00a651] text-white grid place-items-center">âœ“</span>Contrato gerado com sucesso!</div>
                        <div className="grid grid-cols-3 gap-2">
                          <button onClick={generatePDF} className="h-[40px] rounded-[10px] bg-white border border-zinc-200 text-[12px] font-semibold">ðŸ“„ Baixar de novo</button>
                          <button onClick={handleWhatsAppShare} className="h-[40px] rounded-[10px] bg-[#00a651] text-white text-[12px] font-semibold">ðŸ“± WhatsApp com PDF</button>
                          <button onClick={resetContrato} className="h-[40px] rounded-[10px] bg-zinc-900 text-white text-[12px] font-semibold">ðŸ”„ Novo contrato</button>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-emerald-200">
                          <button onClick={()=>setStep(1)} className="flex-1 h-[36px] rounded-[10px] bg-white border border-zinc-200 text-[11px]">â† Voltar ao inicio</button>
                          <button onClick={()=>setStep(2)} className="flex-1 h-[36px] rounded-[10px] bg-white border border-zinc-200 text-[11px]">â† Editar trabalhador</button>
                          <button onClick={resetContrato} className="flex-1 h-[36px] rounded-[10px] bg-white border border-zinc-200 text-[11px]">âœ• Reiniciar sem refresh</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-zinc-200 rounded-[20px] p-5">
                <h4 className="font-semibold text-[13px]">Preview - {form.trabalhadorTipo}</h4>
                <div className="mt-3 text-[11px] font-mono bg-[#fbfcfa] p-3 rounded-[12px] border border-zinc-100 leading-relaxed max-h-[360px] overflow-auto">
                  CONTRATO DE TRABALHO<br/>{form.trabalhadorTipo.toUpperCase()}<br/>Lei 23/2007 + Dec 40/2008<br/><br/>
                  1. PARTES: {form.empregadorNome || "___"} e {form.trabalhadorNome || "___"}<br/>
                  2. TIPO: {form.trabalhadorTipo}<br/>
                  3. TAREFAS ({tarefasArray.length}):<br/>
                  {tarefasArray.map((t,i)=>`${i+1}. ${t}<br/>`).join("")}
                  4. HORARIO: {form.horaEntrada}-{form.horaSaida}<br/>
                  5. INICIO: {form.dataInicio}<br/>
                  6. SALARIO: {form.salario}MT via {FORMAS_PAGAMENTO.find(f=>f.id===form.formaPagamento)?.nome}<br/>
                  ... 12 clausulas
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-[20px] p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00a651]">ðŸ”’</div>
                <div><p className="text-[12px] font-semibold">Pagamento seguro</p><p className="text-[11px] text-zinc-500">M-Pesa, e-Mola, BIM, BCI â€¢ PDF valido juridicamente</p></div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-200 rounded-[20px] p-6">Profissionais verificados - em breve</div>
          </div>
        )}
      </main>
    </div>
  )
}
