import { useState } from "react";
import jsPDF from "jspdf";
import { supabase } from "./supabaseClient";

type Tab = "gerar" | "profissionais";

type DadosContrato = {
  empregadorNome: string; empregadorBI: string; empregadorContacto: string; empregadorEndereco: string;
  profissionalNome: string; profissionalBI: string; profissionalContacto: string; profissionalEndereco: string;
  tipoTrabalho: string; salario: string; dataInicio: string; horarioEntrada: string; horarioSaida: string;
  diasSemana: string[]; tarefas: string[]; alimentacao: string; alojamento: string;
}

const tiposTrabalho = [
  { value: "SecretÃ¡rio/a DomÃ©stico/a", tarefas: ["Limpeza geral", "Lavar roupa", "Cozinhar", "Arrumar casa", "Passar roupa"] },
  { value: "Cozinheiro/a", tarefas: ["Preparar refeiÃ§Ãµes", "Comprar alimentos", "Limpar cozinha", "Organizar despensa"] },
  { value: "BabÃ¡ / Cuidador de CrianÃ§as", tarefas: ["Cuidar crianÃ§as", "Preparar lanche", "Acompanhar tarefas escolares", "Dar banho", "Brincar"] },
  { value: "Motorista Privado", tarefas: ["Conduzir empregador", "Levar crianÃ§as escola", "ManutenÃ§Ã£o bÃ¡sica viatura", "Compras"] },
  { value: "Jardineiro", tarefas: ["Cortar relva", "Regar plantas", "Podar Ã¡rvores", "Limpar quintal", "Cuidar horta"] },
  { value: "Lavadeiro/a e Engomador/a", tarefas: ["Lavar roupa", "Engomar", "Dobrar e guardar", "Lavar cortinas"] },
  { value: "Cuidador de Idosos", tarefas: ["Acompanhar idoso", "Dar medicamentos", "Preparar refeiÃ§Ãµes", "Higiene", "Companhia"] },
  { value: "Guarda / SeguranÃ§a Residencial", tarefas: ["Vigiar residÃªncia", "Controlar entradas", "Ronda noturna", "Apoio geral"] },
  { value: "Pedreiro", tarefas: ["Assentar blocos", "Reboco", "Pavimento", "Medir e nivelar"] },
  { value: "Carpinteiro", tarefas: ["Cortar madeira", "Montar mÃ³veis", "Portas e janelas", "Acabamento"] },
  { value: "Empregada de Limpeza (EscritÃ³rio)", tarefas: ["Limpeza escritÃ³rio", "WC", "Vidros", "Lixo"] },
];

const profissionaisMock = [
  { id: 1, nome: "EsperanÃ§a Matsinhe", profissao: "SecretÃ¡rio/a DomÃ©stico/a", zona: "Zimpeto", nota: 4.9, trabalhos: 23, foto: "EM", preco: "7.500MT/mÃªs", verificado: true },
  { id: 2, nome: "Carlos Pedreiro", profissao: "Pedreiro", zona: "Matola", nota: 4.8, trabalhos: 41, foto: "CP", preco: "1.200MT/dia", verificado: true },
  { id: 3, nome: "JoÃ£o Carpinteiro", profissao: "Carpinteiro", zona: "Mafalala", nota: 5.0, trabalhos: 18, foto: "JC", preco: "Sob orÃ§amento", verificado: true },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("gerar");
  const [step, setStep] = useState(1);
  const [gerando, setGerando] = useState(false);
  const [pago, setPago] = useState(false);

  const [dados, setDados] = useState<DadosContrato>({
    empregadorNome: "", empregadorBI: "", empregadorContacto: "", empregadorEndereco: "",
    profissionalNome: "", profissionalBI: "", profissionalContacto: "", profissionalEndereco: "",
    tipoTrabalho: "SecretÃ¡rio/a DomÃ©stico/a",
    salario: "7500", dataInicio: new Date().toISOString().split('T')[0],
    horarioEntrada: "06:00", horarioSaida: "17:00",
    diasSemana: ["Segunda", "TerÃ§a", "Quarta", "Quinta", "Sexta", "SÃ¡bado"],
    tarefas: ["Limpeza geral", "Lavar roupa", "Cozinhar"],
    alimentacao: "sim", alojamento: "nao"
  });

  const mudarTipo = (tipo: string) => {
    const encontrado = tiposTrabalho.find(t => t.value === tipo);
    setDados({ ...dados, tipoTrabalho: tipo, tarefas: encontrado ? encontrado.tarefas : dados.tarefas });
  }

  const gerarPDFBlob = () => {
    const doc = new jsPDF();
    let cy = 40;
    doc.setFont("helvetica", "bold"); doc.setFontSize(14);
    doc.text(`CONTRATO DE TRABALHO - ${dados.tipoTrabalho.toUpperCase()}`, 105, 20, { align: "center" });
    doc.setFontSize(9); doc.setFont("helvetica", "normal");
    doc.text("Lei nÂº 23/2007 de 1 de Agosto e Decreto nÂº 40/2008", 105, 26, { align: "center" });

    const add = (titulo: string, texto: string) => {
      doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      if(cy > 260){ doc.addPage(); cy=20; }
      doc.text(doc.splitTextToSize(titulo, 180), 15, cy); cy+=7;
      doc.setFont("helvetica", "normal"); doc.setFontSize(10);
      const lines = doc.splitTextToSize(texto, 180);
      if(cy + lines.length*5 > 275){ doc.addPage(); cy=20; }
      doc.text(lines, 15, cy); cy+= lines.length*5 + 8;
    }

    add("1. PARTES", `EMPREGADOR: ${dados.empregadorNome}, BI ${dados.empregadorBI}, Tel ${dados.empregadorContacto}, ${dados.empregadorEndereco}. PROFISSIONAL: ${dados.profissionalNome}, BI ${dados.profissionalBI}, Tel ${dados.profissionalContacto}, ${dados.profissionalEndereco}.`);
    add(`2. OBJECTO - ${dados.tipoTrabalho.toUpperCase()}`, `FunÃ§Ã£o: ${dados.tipoTrabalho}\nTarefas acordadas:\n${dados.tarefas.map((t,i)=> `${i+1}. ${t}`).join("\n")}\n\nQualquer alteraÃ§Ã£o sÃ³ por escrito.`);
    add("3. HORÃRIO E PROVA", `HorÃ¡rio: ${dados.horarioEntrada} Ã s ${dados.horarioSaida}, dias: ${dados.diasSemana.join(", ")}. InÃ­cio: ${dados.dataInicio}. Local: ${dados.empregadorEndereco}. Este horÃ¡rio serve como prova legal.`);
    add("4. SALÃRIO E RECIBO M-PESA", `SalÃ¡rio: ${dados.salario} MT atÃ© dia 05 via M-Pesa para ${dados.profissionalContacto}. Comprovativo obrigatÃ³rio. Adiantamentos sÃ³ com recibo.`);
    add("5. ALIMENTAÃ‡ÃƒO E ALOJAMENTO", `AlimentaÃ§Ã£o: ${dados.alimentacao}. Alojamento: ${dados.alojamento}.`);
    add("6. FOLGAS E FÃ‰RIAS", `Descanso semanal Domingo + feriados. ApÃ³s 1 ano: 12 dias fÃ©rias pagas.`);
    add("7. PERÃODO EXPERIMENTAL", `90 dias a contar de ${dados.dataInicio}. Aviso prÃ©vio 15 dias neste perÃ­odo.`);
    add("8. DEVERES", `Profissional: cumprir horÃ¡rio, guardar sigilo, cuidar bens, zelo. Empregador: pagar em dia, respeitar dignidade, fornecer material, garantir seguranÃ§a.`);
    add("9. RESCISÃƒO", `Justa causa: roubo, violÃªncia, falta grave. Sem justa causa: aviso 30 dias.`);
    add("10. VALIDADE", `Validade legal Art. 29 Lei 23/2007. Contrato escrito protege ambos. ID: ${Date.now()}`);

    if(cy > 240){ doc.addPage(); cy=20; }
    doc.text(`_________________________________`, 15, cy); doc.text(`_________________________________`, 115, cy); cy+=6;
    doc.setFontSize(8); doc.text(`${dados.empregadorNome}`, 15, cy); doc.text(`${dados.profissionalNome}`, 115, cy);
    return doc;
  }

  const gerarPDF = async () => {
    if (!pago) {
      const confirmar = confirm(`Para validar contrato de ${dados.tipoTrabalho}: Pagar 250MT via M-Pesa?\n\n[SimulaÃ§Ã£o] Clique OK para aprovar.\n*150*00#`);
      if (!confirmar) return;
      setPago(true);
    }
    setGerando(true);
    try {
      const doc = gerarPDFBlob();
      const blob = doc.output("blob");
      try {
        await supabase.from("contracts").insert([{ employer_name: dados.empregadorNome, employee_name: dados.profissionalNome, salary: dados.salario, tipo: dados.tipoTrabalho, data: dados }]);
      } catch(e){ console.log(e); }

      const file = new File([blob], `Contrato-${dados.profissionalNome.replace(/\s/g,'_')}.pdf`, { type: "application/pdf" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: `Contrato ${dados.tipoTrabalho}`, text: `Contrato ${dados.tipoTrabalho} - ${dados.profissionalNome} - ${dados.salario}MT` });
          doc.save(`Contrato-${dados.profissionalNome}.pdf`);
          setGerando(false); return;
        } catch(e){}
      }
      doc.save(`Contrato-${dados.profissionalNome}.pdf`);
      const msg = encodeURIComponent(`OlÃ¡ ${dados.profissionalNome}! Contrato de ${dados.tipoTrabalho} gerado com ${dados.empregadorNome}. SalÃ¡rio ${dados.salario}MT. InÃ­cio ${dados.dataInicio}. Tarefas: ${dados.tarefas.join(", ")}. PDF baixado.`);
      window.open(`https://wa.me/258${dados.profissionalContacto.replace(/\D/g,'').slice(-9)}?text=${msg}`, '_blank');
    } finally { setGerando(false); }
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] text-zinc-800">
      <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-[#00a651] text-white rounded-lg grid place-items-center font-black">C</div><b className="text-zinc-900">Contrata.MZ</b><span className="text-[10px] bg-[#00a651] text-white px-2 py-0.5 rounded-full ml-2">BETA</span></div>
          <div className="text-[11px] text-zinc-500">90% dos contratos em MZ sÃ£o verbais. NÃ³s resolvemos.</div>
        </div>
        <div className="max-w-6xl mx-auto px-4 flex gap-2 pb-3">
          <button onClick={()=>setTab("gerar")} className={`px-4 py-2 rounded-full text-sm font-bold border ${tab==="gerar"?"bg-[#00a651] text-white border-[#00a651]":"bg-white text-zinc-700 border-zinc-200"}`}>ðŸ“ Gerar Contrato (250MT)</button>
          <button onClick={()=>setTab("profissionais")} className={`px-4 py-2 rounded-full text-sm font-bold border ${tab==="profissionais"?"bg-[#00a651] text-white border-[#00a651]":"bg-white text-zinc-700 border-zinc-200"}`}>ðŸ‘· Encontrar Profissionais</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        {tab==="gerar" ? (
          <>
            <div className="bg-white rounded-[24px] shadow-sm border border-zinc-200 p-6">
              <h1 className="text-2xl font-black leading-tight text-zinc-900">Contrato de Trabalho<br/><span className="text-zinc-500 text-lg font-normal">com validade legal em 3 minutos</span></h1>
              
              <div className="flex gap-2 my-6">
                {[1,2,3].map(n=><div key={n} className={`h-2 flex-1 rounded-full ${step>=n?"bg-[#00a651]":"bg-zinc-200"}`} />)}
              </div>

              {step===1 && (
                <div className="space-y-4">
                  <h2 className="font-bold text-zinc-900">1. Quem contrata?</h2>
                  <input className="w-full border border-zinc-200 p-3 rounded-xl bg-white" placeholder="Nome completo" value={dados.empregadorNome} onChange={e=>setDados({...dados, empregadorNome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border border-zinc-200 p-3 rounded-xl bg-white" placeholder="NÂº BI" value={dados.empregadorBI} onChange={e=>setDados({...dados, empregadorBI: e.target.value})} />
                    <input className="border border-zinc-200 p-3 rounded-xl bg-white" placeholder="WhatsApp 82/84" value={dados.empregadorContacto} onChange={e=>setDados({...dados, empregadorContacto: e.target.value})} />
                  </div>
                  <input className="w-full border border-zinc-200 p-3 rounded-xl bg-white" placeholder="Bairro - ex: Zimpeto" value={dados.empregadorEndereco} onChange={e=>setDados({...dados, empregadorEndereco: e.target.value})} />
                  <button onClick={()=>setStep(2)} className="w-full bg-[#00a651] text-white p-3.5 rounded-xl font-bold hover:bg-[#008a44]">Continuar â†’</button>
                </div>
              )}
              {step===2 && (
                <div className="space-y-4">
                  <h2 className="font-bold text-zinc-900">2. Quem vai trabalhar?</h2>
                  
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-500">Tipo de Trabalho *</label>
                    <select className="w-full border border-zinc-200 p-3 rounded-xl bg-white font-medium" value={dados.tipoTrabalho} onChange={e=> mudarTipo(e.target.value)}>
                      {tiposTrabalho.map(t=> <option key={t.value} value={t.value}>{t.value}</option>)}
                    </select>
                  </div>

                  <input className="w-full border border-zinc-200 p-3 rounded-xl bg-white" placeholder="Nome do profissional" value={dados.profissionalNome} onChange={e=>setDados({...dados, profissionalNome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="border border-zinc-200 p-3 rounded-xl bg-white" placeholder="BI" value={dados.profissionalBI} onChange={e=>setDados({...dados, profissionalBI: e.target.value})} />
                    <input className="border border-zinc-200 p-3 rounded-xl bg-white" placeholder="WhatsApp" value={dados.profissionalContacto} onChange={e=>setDados({...dados, profissionalContacto: e.target.value})} />
                  </div>
                  <div className="flex gap-2"><button onClick={()=>setStep(1)} className="px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-200">â†</button><button onClick={()=>setStep(3)} className="flex-1 bg-[#00a651] text-white p-3.5 rounded-xl font-bold hover:bg-[#008a44]">Continuar â†’</button></div>
                </div>
              )}
              {step===3 && (
                <div className="space-y-4">
                  <h2 className="font-bold text-zinc-900">3. CondiÃ§Ãµes - {dados.tipoTrabalho}</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">SalÃ¡rio MT</label><input className="w-full border border-zinc-200 p-3 rounded-xl bg-white" value={dados.salario} onChange={e=>setDados({...dados, salario: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">InÃ­cio</label><input type="date" className="w-full border border-zinc-200 p-3 rounded-xl bg-white" value={dados.dataInicio} onChange={e=>setDados({...dados, dataInicio: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">Entrada</label><input type="time" className="w-full border border-zinc-200 p-3 rounded-xl bg-white" value={dados.horarioEntrada} onChange={e=>setDados({...dados, horarioEntrada: e.target.value})} /></div>
                    <div><label className="text-[11px] uppercase font-bold text-zinc-500">SaÃ­da</label><input type="time" className="w-full border border-zinc-200 p-3 rounded-xl bg-white" value={dados.horarioSaida} onChange={e=>setDados({...dados, horarioSaida: e.target.value})} /></div>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase font-bold text-zinc-500">Tarefas - {dados.tipoTrabalho} (pode editar)</label>
                    <textarea className="w-full border border-zinc-200 p-3 rounded-xl bg-white min-h-[80px]" value={dados.tarefas.join(", ")} onChange={e=>setDados({...dados, tarefas: e.target.value.split(",").map(s=>s.trim()).filter(Boolean)})} />
                    <p className="text-[11px] text-zinc-500 mt-1">SugestÃ£o automÃ¡tica baseada no tipo selecionado. Pode adicionar mais.</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-[13px] leading-snug">
                    <b className="text-green-800">âœ“ O que este PDF resolve:</b><br/>
                    â€¢ HorÃ¡rio com prova â†’ falta? Tem prova.<br/>
                    â€¢ SalÃ¡rio + recibo M-Pesa â†’ sumiu? Tem prova.<br/>
                    â€¢ Tarefas de {dados.tipoTrabalho} listadas â†’ entrega errada? Tem prova.
                  </div>

                  <button disabled={gerando} onClick={gerarPDF} className="w-full bg-[#00a651] text-white p-4 rounded-xl font-black text-[16px] shadow-lg shadow-green-100 hover:bg-[#008a44]">
                    {gerando ? "Gerando PDF..." : pago ? `ðŸ“„ Baixar Contrato de ${dados.tipoTrabalho} + WhatsApp` : "ðŸ”’ Pagar 250MT via M-Pesa e Gerar PDF"}
                  </button>
                  <p className="text-[11px] text-center text-zinc-400">M-Pesa igual EasyPay. Hoje simulado, amanhÃ£ API Vodacom.</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-[#00a651] text-white rounded-[24px] p-6 shadow-sm">
                <h3 className="font-black text-lg">Por que 250MT vale?</h3>
                <p className="text-sm text-green-50 mt-2">Sem contrato escrito, a lei presume a favor do trabalhador (Art. 29 Lei 23/2007). Processo sem prova custa 15.000MT+ de indemnizaÃ§Ã£o.</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/20 rounded-xl p-3"><div className="text-2xl font-black">90%</div><div className="text-[11px]">contratos verbais</div></div>
                  <div className="bg-white/20 rounded-xl p-3"><div className="text-2xl font-black">3 min</div><div className="text-[11px]">para gerar</div></div>
                </div>
              </div>
              <div className="bg-white rounded-[24px] border border-zinc-200 p-6">
                <h4 className="font-bold text-sm text-zinc-900">Preview - {dados.tipoTrabalho}</h4>
                <div className="mt-3 text-[11px] font-mono bg-[#f8faf8] p-3 rounded-xl leading-relaxed max-h-[400px] overflow-auto border border-zinc-100">
                  CONTRATO DE TRABALHO<br/>{dados.tipoTrabalho.toUpperCase()}<br/>Lei 23/2007 + Dec 40/2008<br/><br/>
                  1. PARTES: {dados.empregadorNome || "___"} e {dados.profissionalNome || "___"}<br/>
                  2. TIPO: {dados.tipoTrabalho}<br/>
                  3. TAREFAS ({dados.tarefas.length}):<br/>
                  {dados.tarefas.map((t,i)=> `&nbsp;&nbsp;${i+1}. ${t}<br/>`).join("")}
                  4. HORÃRIO: {dados.horarioEntrada}-{dados.horarioSaida}<br/>
                  5. INÃCIO: {dados.dataInicio}<br/>
                  6. SALÃRIO: {dados.salario}MT<br/>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-4 text-zinc-900">Profissionais verificados em Maputo</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {profissionaisMock.map(p=>(
                <div key={p.id} className="bg-white rounded-[20px] border border-zinc-200 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-[#00a651] text-white rounded-full grid place-items-center font-black">{p.foto}</div>
                    {p.verificado && <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full">âœ“ Verificado BI</span>}
                  </div>
                  <h3 className="font-bold mt-3 text-zinc-900">{p.nome}</h3>
                  <p className="text-sm text-zinc-500">{p.profissao} â€¢ {p.zona}</p>
                  <p className="text-sm mt-2">â­ {p.nota} ({p.trabalhos} trabalhos)</p>
                  <p className="text-sm font-bold mt-1 text-zinc-900">{p.preco}</p>
                  <button onClick={()=>{setTab("gerar"); setDados({...dados, profissionalNome: p.nome, tipoTrabalho: p.profissao})}} className="w-full mt-3 bg-white border border-zinc-200 text-zinc-900 p-2.5 rounded-xl text-sm font-bold hover:bg-zinc-50">Contratar com contrato</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
