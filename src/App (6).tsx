import { useState } from "react";
import jsPDF from "jspdf";

// Tipos - mesma logica EasyPay mas para contratos
type Tab = "gerar" | "profissionais";

type DadosContrato = {
  empregadorNome: string; empregadorBI: string; empregadorContacto: string; empregadorEndereco: string;
  domesticaNome: string; domesticaBI: string; domesticaContacto: string; domesticaEndereco: string;
  salario: string; dataInicio: string; horarioEntrada: string; horarioSaida: string;
  diasSemana: string[]; tarefas: string[]; alimentacao: string; alojamento: string;
}

const profissionaisMock = [
  { id: 1, nome: "Esperança Matsinhe", profissao: "Empregada Doméstica", zona: "Zimpeto", nota: 4.9, trabalhos: 23, foto: "EM", preco: "7.500MT/mês", verificado: true },
  { id: 2, nome: "Carlos Pedreiro", profissao: "Pedreiro", zona: "Matola", nota: 4.8, trabalhos: 41, foto: "CP", preco: "1.200MT/dia", verificado: true },
  { id: 3, nome: "João Carpinteiro", profissao: "Carpinteiro", zona: "Mafalala", nota: 5.0, trabalhos: 18, foto: "JC", preco: "Sob orçamento", verificado: true },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("gerar");
  const [step, setStep] = useState(1);
  const [gerando, setGerando] = useState(false);
  const [pago, setPago] = useState(false);

  const [dados, setDados] = useState<DadosContrato>({
    empregadorNome: "", empregadorBI: "", empregadorContacto: "", empregadorEndereco: "",
    domesticaNome: "", domesticaBI: "", domesticaContacto: "", domesticaEndereco: "",
    salario: "7500", dataInicio: new Date().toISOString().split('T')[0],
    horarioEntrada: "06:00", horarioSaida: "17:00",
    diasSemana: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    tarefas: ["Limpeza geral", "Lavar roupa", "Cozinhar"],
    alimentacao: "sim", alojamento: "nao"
  });

  const gerarPDF = async () => {
    if (!pago) {
      // SIMULAÇÃO M-PESA - igual EasyPay
      const confirmar = confirm("Para validar: Pagar 250MT via M-Pesa para gerar contrato com validade legal?\n\n[Simulação] Clique OK para simular pagamento aprovado igual no EasyPay.\n\nDepois ligamos com API real Vodacom: *150*00#");
      if (!confirmar) return;
      setPago(true);
    }

    setGerando(true);
    const doc = new jsPDF();
    let cy = 40;

    doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text("CONTRATO DE TRABALHO DOMÉSTICO", 105, 20, { align: "center" });
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text("Lei nº 23/2007 de 1 de Agosto e Decreto nº 40/2008 - Regulamento do Trabalho Doméstico", 105, 26, { align: "center" });

    const add = (titulo: string, texto: string) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text(titulo, 15, cy); cy+=6;
      doc.setFont("helvetica", "normal"); doc.setFontSize(10);
      const lines = doc.splitTextToSize(texto, 180);
      doc.text(lines, 15, cy); cy+= lines.length*5 + 8;
      if(cy > 270){ doc.addPage(); cy=20; }
    }

    add("1. PARTES", `EMPREGADOR: ${dados.empregadorNome}, BI ${dados.empregadorBI}, Tel ${dados.empregadorContacto}, ${dados.empregadorEndereco}. TRABALHADORA: ${dados.domesticaNome}, BI ${dados.domesticaBI}, Tel ${dados.domesticaContacto}, ${dados.domesticaEndereco}.`);
    add("2. OBJECTO E TAREFAS (Art. 4)", `Tarefas acordadas: ${dados.tarefas.join(", ")}. Qualquer alteração só por escrito. Evita entrega diferente do combinado (MDF vs Madeira).`);
    add("3. HORÁRIO E PROVA (Art. 13)", `Horário: ${dados.horarioEntrada} às ${dados.horarioSaida}, dias: ${dados.diasSemana.join(", ")}. Local: residência empregador. Faltas justificadas em 48h. Este contrato serve como prova de horário.`);
    add("4. SALÁRIO E ADIANTAMENTO (Art. 14)", `Salário: ${dados.salario} MT até dia 05 via M-Pesa para ${dados.domesticaContacto}. Adiantamentos só com recibo. Evita pedreiro sumir com dinheiro.`);
    add("5. ALIMENTAÇÃO E ALOJAMENTO (Art. 17)", `Alimentação: ${dados.alimentacao}. Alojamento: ${dados.alojamento}.`);
    add("6. FOLGAS E FÉRIAS (Art. 19)", `Descanso semanal Domingo + feriados. Após 1 ano: 12 dias férias pagas.`);
    add("7. PERÍODO EXPERIMENTAL (Art. 8)", `90 dias experimental. Aviso prévio 15 dias.`);
    add("8. VALIDADE", `Validade legal entre partes Art. 29 Lei 23/2007. Contrato escrito protege ambos.`);

    cy+=10; doc.text(`Maputo, ${new Date().toLocaleDateString('pt-MZ')}`, 15, cy); cy+=20;
    doc.text(`______________________________`, 15, cy); doc.text(`______________________________`, 115, cy); cy+=6;
    doc.setFontSize(8); doc.text(`${dados.empregadorNome}`, 15, cy); doc.text(`${dados.domesticaNome}`, 115, cy);

    doc.save(`Contrato-${dados.domesticaNome.replace(/\s/g,'_')}.pdf`);
    
    // WhatsApp - igual EasyPay
    const msg = encodeURIComponent(`Olá ${dados.domesticaNome}! Contrato gerado por Contrata.MZ com ${dados.empregadorNome}. Salário ${dados.salario}MT. Início ${dados.dataInicio}. PDF em anexo com validade Lei 23/2007.`);
    window.open(`https://wa.me/258${dados.domesticaContacto.replace(/\D/g,'').slice(-9)}?text=${msg}`, '_blank');

    setGerando(false);
  }

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-black text-white rounded-lg grid place-items-center font-black">C</div><b>Contrata.MZ</b><span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full ml-2">BETA</span></div>
          <div className="text-[11px] text-zinc-500">90% dos contratos em MZ são verbais. Nós resolvemos.</div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-2 pb-3">
          <button onClick={()=>setTab("gerar")} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==="gerar"?"bg-black text-white":"bg-zinc-100"}`}>📝 Gerar Contrato (250MT)</button>
          <button onClick={()=>setTab("profissionais")} className={`px-4 py-2 rounded-full text-sm font-bold ${tab==="profissionais"?"bg-black text-white":"bg-zinc-100"}`}>👷 Encontrar Profissionais</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        {tab==="gerar" ? (
          <>
            <div className="bg-white rounded-[24px] shadow-sm border p-6">
              <h1 className="text-2xl font-black leading-tight">Contrato de Empregada Doméstica<br/><span className="text-zinc-400 text-lg font-normal">com validade legal em 3 minutos</span></h1>
              
              <div className="flex gap-2 my-6">
                {[1,2,3].map(n=><div key={n} className={`h-2 flex-1 rounded-full ${step>=n?"bg-black":"bg-zinc-200"}`} />)}
              </div>

              {step===1 && (
                <div className="space-y-4">
                  <h2 className="font-bold">1. Quem contrata?</h2>
                  <input className="w-full border border-zinc-200 p-3 rounded-xl" placeholder="Nome completo" value={dados.empregadorNome} onChange={e=>setDados({...dados, empregadorNome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border border-zinc-200 p-3 rounded-xl" placeholder="Nº BI" value={dados.empregadorBI} onChange={e=>setDados({...dados, empregadorBI: e.target.value})} />
                    <input className="border border-zinc-200 p-3 rounded-xl" placeholder="WhatsApp 82/84" value={dados.empregadorContacto} onChange={e=>setDados({...dados, empregadorContacto: e.target.value})} />
                  </div>
                  <input className="w-full border border-zinc-200 p-3 rounded-xl" placeholder="Bairro - ex: Zimpeto" value={dados.empregadorEndereco} onChange={e=>setDados({...dados, empregadorEndereco: e.target.value})} />
                  <button onClick={()=>setStep(2)} className="w-full bg-black text-white p-3.5 rounded-xl font-bold">Continuar →</button>
                </div>
              )}
              {step===2 && (
                <div className="space-y-4">
                  <h2 className="font-bold">2. Quem vai trabalhar?</h2>
                  <input className="w-full border border-zinc-200 p-3 rounded-xl" placeholder="Nome da trabalhadora" value={dados.domesticaNome} onChange={e=>setDados({...dados, domesticaNome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border border-zinc-200 p-3 rounded-xl" placeholder="BI dela" value={dados.domesticaBI} onChange={e=>setDados({...dados, domesticaBI: e.target.value})} />
                    <input className="border border-zinc-200 p-3 rounded-xl" placeholder="WhatsApp dela" value={dados.domesticaContacto} onChange={e=>setDados({...dados, domesticaContacto: e.target.value})} />
                  </div>
                  <div className="flex gap-2"><button onClick={()=>setStep(1)} className="px-4 py-3 rounded-xl bg-zinc-100">←</button><button onClick={()=>setStep(3)} className="flex-1 bg-black text-white p-3.5 rounded-xl font-bold">Continuar →</button></div>
                </div>
              )}
              {step===3 && (
                <div className="space-y-4">
                  <h2 className="font-bold">3. Condições (isso vira prova legal)</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">Salário MT</label><input className="w-full border border-zinc-200 p-3 rounded-xl" value={dados.salario} onChange={e=>setDados({...dados, salario: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">Início</label><input type="date" className="w-full border border-zinc-200 p-3 rounded-xl" value={dados.dataInicio} onChange={e=>setDados({...dados, dataInicio: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">Entrada</label><input type="time" className="w-full border border-zinc-200 p-3 rounded-xl" value={dados.horarioEntrada} onChange={e=>setDados({...dados, horarioEntrada: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">Saída</label><input type="time" className="w-full border border-zinc-200 p-3 rounded-xl" value={dados.horarioSaida} onChange={e=>setDados({...dados, horarioSaida: e.target.value})} /></div>
                  </div>
                  <div><label className="text-[11px] uppercase font-bold text-zinc-500">Tarefas (separadas por vírgula)</label><input className="w-full border border-zinc-200 p-3 rounded-xl" value={dados.tarefas.join(", ")} onChange={e=>setDados({...dados, tarefas: e.target.value.split(",").map(s=>s.trim())})} /></div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-[13px] leading-snug">
                    <b className="text-green-800">✓ O que este PDF resolve (que o verbal não resolve):</b><br/>
                    • Horário com prova → empregada falta? Tem prova.<br/>
                    • Salário + adiantamento com recibo → pedreiro some? Tem prova.<br/>
                    • Tarefas listadas → carpinteiro entrega MDF? Tem prova.
                  </div>

                  <button disabled={gerando} onClick={gerarPDF} className="w-full bg-[#00a651] text-white p-4 rounded-xl font-black text-[16px] shadow-lg shadow-green-200">
                    {gerando ? "Gerando PDF..." : pago ? "📄 Baixar PDF + Enviar WhatsApp" : "🔒 Pagar 250MT via M-Pesa e Gerar PDF"}
                  </button>
                  <p className="text-[11px] text-center text-zinc-400">Checkout M-Pesa igual EasyPay. Hoje simulado, amanhã ligamos API Vodacom M-Pesa.</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-black text-white rounded-[24px] p-6">
                <h3 className="font-black text-lg">Por que 250MT vale?</h3>
                <p className="text-sm text-zinc-300 mt-2">Em Moçambique, sem contrato escrito, a lei presume a favor do trabalhador (Art. 29 Lei 23/2007). Um processo por falta de prova custa 15.000MT+ de indemnização.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black">90%</div><div className="text-[11px]">contratos verbais</div></div>
                  <div className="bg-white/10 rounded-xl p-3"><div className="text-2xl font-black">3 min</div><div className="text-[11px]">para gerar</div></div>
                </div>
              </div>
              <div className="bg-white rounded-[24px] border p-6">
                <h4 className="font-bold text-sm">Preview do contrato</h4>
                <div className="mt-3 text-[11px] font-mono bg-zinc-50 p-3 rounded-xl leading-relaxed">
                  CONTRATO DE TRABALHO DOMÉSTICO<br/>Lei 23/2007 + Dec 40/2008<br/><br/>1. PARTES: {dados.empregadorNome || "___"} e {dados.domesticaNome || "___"}<br/>2. TAREFAS: {dados.tarefas.slice(0,2).join(", ")}<br/>3. HORÁRIO: {dados.horarioEntrada}-{dados.horarioSaida}<br/>4. SALÁRIO: {dados.salario}MT<br/>...
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-4">Profissionais verificados em Maputo</h2>
            <p className="text-sm text-zinc-500 mb-6">PASSO 2 - Semana que vem: adicionamos login e perfis. Hoje é só visual para validar.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {profissionaisMock.map(p=>(
                <div key={p.id} className="bg-white rounded-[20px] border p-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-full grid place-items-center font-black">{p.foto}</div>
                    {p.verificado && <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full">✓ Verificado BI</span>}
                  </div>
                  <h3 className="font-bold mt-3">{p.nome}</h3>
                  <p className="text-sm text-zinc-500">{p.profissao} • {p.zona}</p>
                  <p className="text-sm mt-2">⭐ {p.nota} ({p.trabalhos} trabalhos)</p>
                  <p className="text-sm font-bold mt-1">{p.preco}</p>
                  <button onClick={()=>{setTab("gerar"); setDados({...dados, domesticaNome: p.profissao==="Empregada Doméstica"? p.nome : dados.domesticaNome})}} className="w-full mt-3 bg-black text-white p-2.5 rounded-xl text-sm font-bold">Contratar com contrato</button>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm">
              <b>Próxima semana:</b> Cada profissional terá login com telefone + código SMS (Supabase Auth), foto do BI, fotos de trabalhos, avaliações. Cliente clica Contratar → já preenche contrato automático + paga 250MT + envia WhatsApp para os dois.
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
