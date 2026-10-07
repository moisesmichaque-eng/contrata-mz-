import { useState, useEffect } from "react";
const ESSE_LOGO = "/mnt/data/logo_tipo.jpg";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

type Tipo = "Pedreiro" | "Carpinteiro" | "Eletricista" | "Pintor" | "Motorista Particular" | "Secretario/a Domestico/a" | "Serralheiro" | "Canalizador" | "Servicos/Consultoria" | "Outros/Particular";

const MODELOS_ESPECIFICOS: Record<Tipo, any> = {
  "Pedreiro": {
    titulo: "CONTRATO DE PRESTAÃ‡ÃƒO DE SERVIÃ‡OS - PEDREIRO",
    tarefasDefault: ["MarcaÃ§Ã£o e alicerce", "Alvenaria blocos 15cm", "Acabamento fino"],
    clausulas: {
      c5_titulo: "5. DOS MATERIAIS (ESPECÃFICA PEDREIRO)",
      c5_default: "Cimento 42.5N, areia grossa lavada, brita 1, ferragem 8mm/10mm. Contratante fornece ou reembolsa mediante factura. Cimento fornecido por contratante.",
      c6_titulo: "6. DO ALICERCE E ESTRUTURA (ESPECÃFICA PEDREIRO)",
      c6_default: "Alicerce mÃ­nimo 60cm profundidade, sapatas 80x80. Garantia contra infiltraÃ§Ã£o ascendente 12 meses.",
      c7_titulo: "7. DO PRAZO POR MÂ² (ESPECÃFICA PEDREIRO)",
      c7_default: "Prazo calculado: 1,5 dias/mÂ² alvenaria, 1 dia/mÂ² reboco. Atraso por chuva nÃ£o conta.",
    }
  },
  "Carpinteiro": {
    titulo: "CONTRATO DE PRESTAÃ‡ÃƒO DE SERVIÃ‡OS - CARPINTEIRO",
    tarefasDefault: ["Medir e cortar madeira", "Fabricar portas", "Instalar com acabamento"],
    clausulas: {
      c5_titulo: "5. DA MADEIRA E MATERIAL (ESPECÃFICA CARPINTEIRO)",
      c5_default: "Madeira: Umbila / Chanfuta seca, cola branca, pregos, verniz. Contratante fornece ou reembolsa.",
      c6_titulo: "6. DAS MEDIDAS E MODELO (ESPECÃFICA CARPINTEIRO)",
      c6_default: "Medidas conforme foto anexa. TolerÃ¢ncia 2mm. Garantia contra empeno 6 meses.",
      c7_titulo: "7. DO PRAZO POR PEÃ‡A",
      c7_default: "Prazo: 3 dias/porta, 2 dias/janela. Atraso por falta energia nÃ£o conta.",
    }
  },
  "Eletricista": {
    titulo: "CONTRATO - ELETRICISTA",
    tarefasDefault: ["Instalar quadro elÃ©trico", "Instalar tomadas", "Testar instalaÃ§Ã£o"],
    clausulas: {
      c5_titulo: "5. DO MATERIAL ELÃ‰TRICO (ESPECÃFICA ELETRICISTA)",
      c5_default: "Cabos 2.5mm / 1.5mm, disjuntores, tomadas. Material certificado INCM. Contratante fornece.",
      c6_titulo: "6. DA SEGURANÃ‡A E NORMA",
      c6_default: "InstalaÃ§Ã£o conforme norma NBR. Garantia 12 meses contra curto-circuito por mÃ¡ instalaÃ§Ã£o.",
      c7_titulo: "7. DO PRAZO POR PONTO",
      c7_default: "Prazo: 1 dia/5 pontos de luz. Teste final com multÃ­metro.",
    }
  },
  "Motorista Particular": {
    titulo: "CONTRATO DE TRABALHO - MOTORISTA",
    tarefasDefault: ["Conduzir empregador", "Levar crianÃ§as escola", "ManutenÃ§Ã£o bÃ¡sica viatura"],
    clausulas: {
      c5_titulo: "5. DA VIATURA E COMBUSTÃVEL",
      c5_default: "Viatura: [marca/matricula]. CombustÃ­vel fornecido por contratante, senhas ou reembolso com talÃ£o.",
      c6_titulo: "6. DO HORÃRIO E HORAS EXTRAS",
      c6_default: "HorÃ¡rio 06:00-18:00. Horas extras pagas 50% ou compensadas. Domingo Ã© folga.",
      c7_titulo: "7. DA CARTA E RESPONSABILIDADE",
      c7_default: "Carta vÃ¡lida categoria B/C. Multas por negligÃªncia do motorista sÃ£o dele, mecÃ¢nicas sÃ£o do contratante.",
    }
  },
  "Secretario/a Domestico/a": {
    titulo: "CONTRATO DE TRABALHO DOMÃ‰STICO",
    tarefasDefault: ["Limpeza geral", "Lavar louÃ§a e zelar", "Arrumar quartos", "Cozinhar"],
    clausulas: {
      c5_titulo: "5. DA ALIMENTAÃ‡ÃƒO E ALOJAMENTO",
      c5_default: "AlimentaÃ§Ã£o: 1 refeiÃ§Ã£o/dia no local. Alojamento: NÃ£o. Produtos limpeza fornecidos por contratante.",
      c6_titulo: "6. DA LOUÃ‡A E QUEBRAS (CLÃUSULA ESPECÃFICA)",
      c6_default: "Zela pela louÃ§a, avisa quebras. NÃ£o paga quebra acidental salvo negligÃªncia grave - max 25% salÃ¡rio parcelado.",
      c7_titulo: "7. DO HORÃRIO DOMÃ‰STICO",
      c7_default: "06:00-17:00 Seg-Sab. Descanso Domingo. NÃ£o faz trabalho pesado de obra.",
    }
  },
  "Pintor": {
    titulo: "CONTRATO - PINTOR",
    tarefasDefault: ["Preparar parede (lixar/massa)", "Pintura interior", "Pintura exterior"],
    clausulas: {
      c5_titulo: "5. DA TINTA E MATERIAL (ESPECÃFICA PINTOR)",
      c5_default: "Tinta: [marca/cor conforme foto anexa]. Contratante fornece tinta, rolos e lixa. Rendimento 1L/8mÂ².",
      c6_titulo: "6. DO ACABAMENTO",
      c6_default: "2 demÃ£os mÃ­nimo. Sem manchas ou escorrimentos. Garantia 6 meses contra descasque por mÃ¡ aplicaÃ§Ã£o.",
      c7_titulo: "7. DO PRAZO POR MÂ²",
      c7_default: "Prazo: 1 dia/20mÂ² interior. Atraso por chuva (exterior) nÃ£o conta.",
    }
  },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", tarefasDefault: ["Fabricar portÃµes", "Soldar estruturas"], clausulas: { c5_titulo: "5. DO FERRO E MATERIAL", c5_default: "Ferro cantoneira 40mm, chapa 1.5mm, tinta anti-ferrugem. Contratante fornece ou reembolsa.", c6_titulo: "6. DA SOLDADURA", c6_default: "Soldadura reforÃ§ada, sem rebarbas. Garantia 12 meses contra quebra de solda.", c7_titulo: "7. DO PRAZO", c7_default: "Prazo por medida. InstalaÃ§Ã£o inclusa." } },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", tarefasDefault: ["Instalar canos", "Instalar sanita"], clausulas: { c5_titulo: "5. DO MATERIAL", c5_default: "Tubos PVC 110mm, cola, joelhos. Contratante fornece.", c6_titulo: "6. DO TESTE", c6_default: "Teste de estanqueidade 24h. Garantia contra fuga 6 meses.", c7_titulo: "7. DO PRAZO", c7_default: "Prazo conforme pontos de Ã¡gua." } },
  "Servicos/Consultoria": { titulo: "CONTRATO PRESTAÃ‡ÃƒO SERVIÃ‡OS", tarefasDefault: ["Consultoria empresarial"], clausulas: { c5_titulo: "5. DOS ENTREGÃVEIS", c5_default: "RelatÃ³rios, reuniÃµes semanais, plano de aÃ§Ã£o.", c6_titulo: "6. DA PROPRIEDADE INTELECTUAL", c6_default: "Material pertence ao contratante apÃ³s pagamento.", c7_titulo: "7. DO PRAZO", c7_default: "Prazo por milestones." } },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR", tarefasDefault: ["ServiÃ§o personalizado"], clausulas: { c5_titulo: "5. DOS MATERIAIS", c5_default: "A definir - quem fornece o quÃª", c6_titulo: "6. DA EXECUÃ‡ÃƒO", c6_default: "Conforme combinado", c7_titulo: "7. DO PRAZO", c7_default: "A combinar" } },
};

export default function App() {
  const [tipo, setTipo] = useState<Tipo>("Pedreiro");
  const modelo = MODELOS_ESPECIFICOS[tipo];

  const [form, setForm] = useState({
    contratante: "", biContratante: "", local: "Xai-Xai",
    prestador: "", biPrestador: "",
    tarefas: modelo.tarefasDefault.join(", "),
    valor: "A combinar", prazo: "A combinar", formaPag: "Conforme acordado",
    c5: modelo.clausulas.c5_default,
    c6: modelo.clausulas.c6_default,
    c7: modelo.clausulas.c7_default,
    pagamento: "40% adiantado, restante na entrega. Via PagaFÃ¡cil M-Pesa 840532899, e-Mola 864341779",
    rescisao: "7 dias aviso prÃ©vio. Multa 10% se rescisÃ£o sem justa causa.",
    foro: "Foro de Xai-Xai, Gaza",
  });

  useEffect(() => {
    const m = MODELOS_ESPECIFICOS[tipo];
    setForm(f => ({
      ...f,
      tarefas: m.tarefasDefault.join(", "),
      c5: m.clausulas.c5_default,
      c6: m.clausulas.c6_default,
      c7: m.clausulas.c7_default,
    }));
  }, [tipo]);

  const tarefasArray = form.tarefas.split(",").map(t => t.trim()).filter(Boolean);

  const gerarPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = doc.internal.pageSize.getWidth(); let y = 15; const M = 12;
    const check = (h = 15) => { if (y + h > 285) { doc.addPage(); y = 12; } };
    doc.setFontSize(10); doc.setFont("helvetica", "bold");
    doc.text(semAcento(modelo.titulo), M, y); y += 5;
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.text(`PEDREIRO â€¢ NUIT 401 866 876 â€¢ Xai-Xai â€¢ ${new Date().toLocaleDateString()}`, M, y); y += 8;
    const add = (n: string, t: string, c: string) => {
      check(20); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text(semAcento(n + ". " + t), M, y); y += 4;
      doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.splitTextToSize(semAcento(c), W - M * 2).forEach((l: string) => { check(5); doc.text(l, M, y); y += 4; }); y += 2;
    };
    add("1", "PARTES", `${form.contratante || "[Contratante]"} (BI ${form.biContratante || "___"}) e ${form.prestador || "[Prestador]"} (BI ${form.biPrestador || "___"}).`);
    add("2", "OBJETO", `PrestaÃ§Ã£o de serviÃ§os de ${tipo} em ${form.local}.`);
    add("3", "TAREFAS", tarefasArray.map((t, i) => `${i + 1}. ${t}`).join(" | ") || "A definir");
    add("4", "VALOR E PRAZO", `${form.valor} â€¢ Prazo ${form.prazo} â€¢ ${form.formaPag}.`);
    add("5", modelo.clausulas.c5_titulo, form.c5);
    add("6", modelo.clausulas.c6_titulo, form.c6);
    add("7", modelo.clausulas.c7_titulo, form.c7);
    add("9", "PAGAMENTO", form.pagamento);
    add("10", "RESCISÃƒO", form.rescisao);
    add("11", "FORO", form.foro);
    y += 4; doc.setDrawColor(0); doc.rect(W / 2 - 30, y, 60, 18); doc.setFontSize(7); doc.text("ESSE â€¢ NUIT 401866876", W / 2 - 25, y + 6); doc.text("Contrata.MZ", W / 2 - 12, y + 11);
    doc.save(`Contrato-${tipo}-${form.prestador || "draft"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col">
      <header className="bg-white border-b px-4 h-[56px] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3"><img src={ESSE_LOGO} className="h-8" alt="ESSE" /><span className="font-extrabold text-[13px]">CONTRATA.MZ â€¢ DRAFT VIVO</span><span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">TUDO MUDA AO VIVO</span></div>
        <div className="flex gap-2"><button onClick={gerarPDF} className="px-4 py-2 bg-[#0f2a44] text-white rounded-[8px] text-[11px] font-bold">Ver preview PDF â†’</button></div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
        {/* ESQUERDA - FORMULÃRIO */}
        <div className="bg-white border-r p-4 overflow-auto h-[calc(100vh-56px)] space-y-4">
          <div className="text-[11px] font-bold uppercase text-zinc-500">1. Escolhe o tipo (muda as clÃ¡usulas 5,6,7)</div>
          <div className="flex flex-wrap gap-1.5">{(Object.keys(MODELOS_ESPECIFICOS) as Tipo[]).map(t => <button key={t} onClick={() => setTipo(t)} className={`px-3 py-1.5 rounded-full text-[11px] border font-bold ${tipo === t ? "bg-[#0f2a44] text-white" : "bg-white"}`}>{t}</button>)}</div>

          <div className="space-y-3 pt-2 border-t">
            <div className="text-[11px] font-bold">PARTES</div>
            <input value={form.contratante} onChange={e => setForm({ ...form, contratante: e.target.value })} placeholder="Nome Contratante" className="w-full h-[38px] border-2 px-3 rounded-[8px] text-[12px]" />
            <input value={form.prestador} onChange={e => setForm({ ...form, prestador: e.target.value })} placeholder="Nome Prestador / Pedreiro" className="w-full h-[38px] border-2 px-3 rounded-[8px] text-[12px] bg-yellow-50 font-bold" />
            <input value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} placeholder="Local obra: Ex Xai-Xai" className="w-full h-[38px] border-2 px-3 rounded-[8px] text-[12px]" />
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold">TAREFAS - separa por vÃ­rgula (aparece na clÃ¡usula 3)</div>
            <textarea value={form.tarefas} onChange={e => setForm({ ...form, tarefas: e.target.value })} className="w-full min-h-[70px] p-3 border-2 rounded-[8px] text-[12px]" placeholder="MarcaÃ§Ã£o e alicerce, Alvenaria blocos 15cm, Acabamento fino" />
            <div className="text-[10px] text-zinc-500">{tarefasArray.length} tarefas â€¢ Escreve e vÃª mudar no preview â†’</div>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-bold">VALOR E PRAZO</div>
            <div className="grid grid-cols-2 gap-2"><input value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} placeholder="Valor Ex: 45.000MT" className="h-[38px] border-2 px-3 rounded-[8px] text-[12px]" /><input value={form.prazo} onChange={e => setForm({ ...form, prazo: e.target.value })} placeholder="Prazo Ex: 15 dias" className="h-[38px] border-2 px-3 rounded-[8px] text-[12px]" /></div>
          </div>

          {/* CLÃUSULAS ESPECÃFICAS QUE MUDAM */}
          <div className="space-y-3 pt-3 border-t-2 border-amber-200 bg-amber-50/50 p-3 rounded-[12px]">
            <div className="text-[11px] font-extrabold text-amber-800">CLÃUSULAS ESPECÃFICAS DE {tipo.toUpperCase()} - 100% EDITÃVEIS (ex: cimento, atraso chuva)</div>

            <div><label className="text-[10px] font-bold">{MODELOS_ESPECIFICOS[tipo].clausulas.c5_titulo}</label><textarea value={form.c5} onChange={e => setForm({ ...form, c5: e.target.value })} className="w-full min-h-[80px] p-3 border-2 border-amber-300 rounded-[8px] text-[12px] bg-white mt-1" /></div>

            <div><label className="text-[10px] font-bold">{MODELOS_ESPECIFICOS[tipo].clausulas.c6_titulo}</label><textarea value={form.c6} onChange={e => setForm({ ...form, c6: e.target.value })} className="w-full min-h-[80px] p-3 border-2 rounded-[8px] text-[12px] bg-white mt-1" /></div>

            <div><label className="text-[10px] font-bold">{MODELOS_ESPECIFICOS[tipo].clausulas.c7_titulo}</label><textarea value={form.c7} onChange={e => setForm({ ...form, c7: e.target.value })} className="w-full min-h-[80px] p-3 border-2 rounded-[8px] text-[12px] bg-white mt-1" placeholder="Ex: Atraso chuva nÃ£o conta, 1.5 dias/mÂ²" /></div>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-bold">PAGAMENTO, RESCISÃƒO, FORO</div>
            <textarea value={form.pagamento} onChange={e => setForm({ ...form, pagamento: e.target.value })} className="w-full min-h-[50px] p-2 border-2 rounded-[8px] text-[11px]" />
            <input value={form.rescisao} onChange={e => setForm({ ...form, rescisao: e.target.value })} className="w-full h-[36px] border-2 px-3 rounded-[8px] text-[11px]" />
            <input value={form.foro} onChange={e => setForm({ ...form, foro: e.target.value })} className="w-full h-[36px] border-2 px-3 rounded-[8px] text-[11px]" />
          </div>
        </div>

        {/* DIREITA - PREVIEW PDF VIVO */}
        <div className="bg-[#e2e8f0] p-4 lg:p-8 overflow-auto h-[calc(100vh-56px)]">
          <div className="flex items-center justify-between mb-4"><button className="text-[12px] font-bold">â† Voltar</button><div className="flex items-center gap-2"><span className="text-[11px] font-bold">Preview PDF â€¢ 11 clÃ¡usulas</span><button onClick={gerarPDF} className="text-[11px] bg-white border px-3 py-1 rounded-full font-bold">Ver preview PDF â†’</button></div></div>

          <div className="bg-white max-w-[700px] mx-auto shadow-2xl rounded-[4px] p-8 font-serif text-[13px] leading-[1.6] min-h-[900px]">
            <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-4"><div><div className="font-extrabold text-[16px] tracking-tight">ESSE</div><div className="text-[11px] font-bold mt-1">{modelo.titulo}</div><div className="text-[10px] mt-1">{tipo.toUpperCase()} â€¢ NUIT 401 866 876 â€¢ Xai-Xai</div></div><div className="w-12 h-12 bg-[#0f2a44] rounded-full grid place-items-center text-white font-bold text-[10px]">ESSE</div></div>

            <div className="space-y-4">
              <div><span className="font-bold">1. PARTES:</span> {form.contratante || "[Contratante]"} (BI {form.biContratante || "___"}) e {form.prestador || "[Prestador]"} (BI {form.biPrestador || "___"}).</div>
              <div><span className="font-bold">2. OBJETO:</span> PrestaÃ§Ã£o de serviÃ§os de {tipo} em {form.local || "[Local]"}.</div>
              <div><span className="font-bold">3. TAREFAS:</span> {tarefasArray.length ? tarefasArray.join(", ") + "." : "A definir."} <span className="text-[10px] bg-yellow-100 px-1 rounded">{tarefasArray.length} tarefas</span></div>
              <div><span className="font-bold">4. VALOR E PRAZO:</span> {form.valor} â€¢ Prazo {form.prazo} â€¢ {form.formaPag}.</div>

              <div className="bg-amber-50 p-2 rounded border-l-4 border-amber-400"><span className="font-bold">{modelo.clausulas.c5_titulo}:</span> {form.c5}</div>
              <div className="bg-blue-50 p-2 rounded border-l-4 border-blue-400"><span className="font-bold">{modelo.clausulas.c6_titulo}:</span> {form.c6}</div>
              <div className="bg-emerald-50 p-2 rounded border-l-4 border-emerald-400"><span className="font-bold">{modelo.clausulas.c7_titulo}:</span> {form.c7}</div>

              <div><span className="font-bold">9. PAGAMENTO:</span> {form.pagamento}</div>
              <div><span className="font-bold">10. RESCISÃƒO:</span> {form.rescisao}</div>
              <div><span className="font-bold">11. FORO:</span> {form.foro}</div>

              <div className="pt-8 mt-8 border-t text-center text-[10px] text-zinc-500">ESSE â€¢ NUIT 401 866 876 â€¢ Xai-Xai â€¢ Gerado Contrata.MZ em {new Date().toLocaleDateString()}<br />Assinaturas: __________________ (Contratante) __________________ (Prestador)</div>
            </div>
          </div>

          <div className="max-w-[700px] mx-auto mt-4 bg-[#0f2a44] text-white p-3 rounded-[10px] text-[11px]">ðŸ’¡ Dica: Escreve no lado esquerdo "Cimento fornecido por contratante, atraso chuva..." e vÃª aqui na direita mudar instantaneamente na clÃ¡usula 5 e 7. Ã‰ o draft vivo que pediste.</div>
        </div>
      </div>
    </div>
  );
}
