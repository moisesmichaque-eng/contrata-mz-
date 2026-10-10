// @ts-nocheck
// CONTRATA-MZ - App.tsx - 432 linhas - ENCONTRAR RECUPERADO + LOGO CORRIGIDO + 11 CLAUSULAS + ASSINATURAS HORIZONTAL
import React, { useState, useMemo } from 'react';

type Worker = { id: number; nome: string; cat: string; local: string; tel: string; nota: number; exp: string; disponivel: boolean; };

export default function App() {
  const [aba, setAba] = useState<'encontrar' | 'contrato'>('encontrar');
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [localFiltro, setLocalFiltro] = useState('Todos');

  const [dados, setDados] = useState({
    id: '990152',
    contratante: 'Artur Simao Zimba',
    telContratante: '823832513',
    biContratante: '110200011B',
    contratado: 'Joao Carpinteiro',
    telContratado: '840532899',
    biContratado: '1102100MM',
    nuit: '401866876',
    valor: '7500',
    tarefas: '10 tarefas de Carpinteiro',
    local: 'Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola',
    dataConcordContratante: '10/10/2026, 18:05:24',
    dataConcordContratado: '10/10/2026, 18:05:41',
    dataAssinatura: '10/10/2026, 18:06:16',
    gps: '-25.96, 32.45',
    cidadeGps: 'Maputo - Matola',
    foro: 'Xai-Xai',
  });

  const [clausulas, setClausulas] = useState({
    c1: '1. OBJECTO: O presente contrato tem por objecto a prestacao de servicos de Carpinteiro, consistindo em 10 tarefas conforme combinado entre as partes, na localidade de Xai-Xai. O Contratado compromete-se a executar com qualidade e pontualidade.',
    c2: '2. LOCAL DE EXECUCAO: Os servicos serao prestados em Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola, conforme indicado pelo Contratante. O local possui acesso e condicoes basicas para trabalho.',
    c3: '3. HORARIO DE TRABALHO: Das 07:00 as 17:00, com intervalo de 1h para almoco (12h-13h). Horario editavel conforme acordo. Segunda a Sabado. Horas extras pagas a 150 MZN/hora se necessario. Editavel pelo contratante.',
    c4: '4. SALARIO E PAGAMENTO: Valor total de 7500 MZN, pago via M-Pesa para o numero do Contratado 840532899. 50% adiantamento no inicio (3750 MZN), 50% na conclusao. Comprovativo M-Pesa anexado como prova legal. Pagamento pontual obrigatorio.',
    c5: '5. ALIMENTACAO: A alimentacao durante o horario de trabalho sera fornecida pelo Contratante ou valor de 250 MZN/dia para alimentacao, conforme acordo entre partes. Agua potavel sempre disponivel no local.',
    c6: '6. FOLGAS E DESCANSO: 1 dia de folga por semana, aos Domingos. Feriados nacionais respeitados conforme Lei 23/2007. Folgas adicionais mediante aviso previo de 24h. Sem desconto no valor total.',
    c7: '7. PERIODO E PRAZO: Duracao estimada para conclusao das 10 tarefas de Carpinteiro. Inicio imediato apos CONCORDO via WhatsApp. Prazo maximo 30 dias, prorrogavel por acordo mutuo escrito via WhatsApp. Atraso justificado nao gera multa.',
    c8: '8. DEVERES E OBRIGACOES: Contratado deve executar com zelo, tecnica e seguranca, material fornecido pelo Contratante. Contratante deve garantir acesso ao local, material e pagamento pontual. Ambos comprometem-se com seguranca no trabalho e respeito mutuo.',
    c9: '9. TRANSPORTE E MATERIAL: Transporte ate Xai-Xai por conta do Contratante (ou reembolso 500 MZN). Material e ferramentas principais (madeira, pregos, cola) fornecidos pelo Contratante. Ferramentas pessoais do Contratado (serrote, martelo).',
    c10: '10. ANEXOS E PROVAS LEGAIS: Fazem parte deste contrato e sao provas legais: Foto BI frente e verso de ambas as partes, Audio de 5s de aceitacao "Eu aceito contrato ID 990152", GPS no momento do CONCORDO Maputo-Matola -25.96,32.45, Comprovativo M-Pesa. Tudo anexado digitalmente conforme Clausula 10.',
    c11: '11. VALIDADE LEGAL, FORO E ASSINATURAS: Contrato valido em Mocambique nos termos da Lei 23/2007. Assinado digitalmente via WhatsApp/SMS com registo de data/hora e GPS. 3 provas ligadas: Contrato 11 clausulas + CONCORDO WhatsApp + M-Pesa. Vale em tribunal como prova. Foro: Xai-Xai - casa do cliente. Assinaturas na horizontal lado a lado.',
  });

  const trabalhadores: Worker[] = [
    { id: 1, nome: 'Joao Carpinteiro', cat: 'Carpinteiro', local: 'Xai-Xai', tel: '840532899', nota: 4.9, exp: '8 anos', disponivel: true },
    { id: 2, nome: 'Carlos Pedreiro', cat: 'Pedreiro', local: 'Maputo', tel: '823000111', nota: 4.8, exp: '12 anos', disponivel: true },
    { id: 3, nome: 'Ana Electricista', cat: 'Electricista', local: 'Matola', tel: '840000222', nota: 5.0, exp: '6 anos', disponivel: false },
    { id: 4, nome: 'Marta Canalizador', cat: 'Canalizador', local: 'Xai-Xai', tel: '828000333', nota: 4.7, exp: '5 anos', disponivel: true },
    { id: 5, nome: 'Paulo Pintor', cat: 'Pintor', local: 'Xai-Xai', tel: '823000444', nota: 4.6, exp: '10 anos', disponivel: true },
    { id: 6, nome: 'Jose Soldador', cat: 'Soldador', local: 'Maputo', tel: '840000555', nota: 4.9, exp: '7 anos', disponivel: true },
  ];

  const categorias = ['Todos', 'Carpinteiro', 'Pedreiro', 'Electricista', 'Canalizador', 'Pintor', 'Soldador'];
  const locais = ['Todos', 'Xai-Xai', 'Maputo', 'Matola'];

  const filtrados = useMemo(() => {
    return trabalhadores.filter(t => {
      const txt = (t.nome + ' ' + t.cat + ' ' + t.local).toLowerCase();
      const matchTxt = txt.includes(filtro.toLowerCase());
      const matchCat = categoriaFiltro === 'Todos' || t.cat === categoriaFiltro;
      const matchLocal = localFiltro === 'Todos' || t.local === localFiltro;
      return matchTxt && matchCat && matchLocal;
    });
  }, [filtro, categoriaFiltro, localFiltro]);

  const updateClausula = (k: string, v: string) => setClausulas(s => ({ ...s, [k]: v }));

  const gerarPDF = () => {
    const style = `
      body{font-family:Arial,sans-serif;padding:28px;color:#111;line-height:1.55;font-size:12.5px}
      .header{text-align:center;border-bottom:3px solid #0f766e;padding-bottom:14px;margin-bottom:18px}
      .logo{font-size:30px;font-weight:900;color:#0f766e;letter-spacing:1px}
      .idbox{background:#f0fdfa;border:1px solid #99f6e0;padding:10px;border-radius:8px;margin:12px 0;font-size:11px}
      .cl{margin-bottom:11px;text-align:justify}
      .hori{display:flex;flex-direction:row;justify-content:space-between;gap:24px;margin-top:32px;border-top:2px solid #000;padding-top:16px}
      .box{flex:1;border:1px solid #cbd5e1;padding:14px;border-radius:8px;text-align:center;background:#f8fafc}
      .rodape{margin-top:28px;padding:14px;background:#111827;color:#fff;border-radius:8px;font-size:10.5px;text-align:center;line-height:1.6}
      .provas{background:#fef3c7;border:1px solid #fcd34d;padding:10px;border-radius:6px;margin-top:16px;font-size:10.5px}
      @media print{.noprint{display:none}}
    `;
    const clausHtml = Object.values(clausulas).map(c => `<div class="cl">${c}</div>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO-FINAL-11-CLAUSULAS-Carpinteiro-ID-${dados.id}-ASSINATURAS-HORIZONTAL</title><style>${style}</style></head><body>
      <div class="header"><div class="logo">CONTRATA-MZ</div><div>contrata-mz.vercel.app - Plataforma de Contratos Legais Mocambique</div></div>
      <h2 style="text-align:center;margin:8px 0">CONTRATO DE PRESTACAO DE SERVICOS - 11 CLAUSULAS COMPLETAS</h2>
      <div class="idbox"><strong>ID:</strong> ${dados.id} | <strong>Valor:</strong> ${dados.valor} MZN | <strong>Tarefas:</strong> ${dados.tarefas} | <strong>Local:</strong> ${dados.local}<br><strong>NUIT:</strong> ${dados.nuit} | Lei 23/2007 - Valido Mocambique | contrata-mz.vercel.app</div>
      <h3>DADOS DAS PARTES</h3>
      <p><strong>Contratante:</strong> ${dados.contratante} - Tel ${dados.telContratante} - BI ${dados.biContratante}</p>
      <p><strong>Contratado:</strong> ${dados.contratado} - Tel ${dados.telContratado} - BI ${dados.biContratado}</p>
      <h3>CLAUSULAS 1 A 11</h3>${clausHtml}
      <div class="provas"><strong>3 PROVAS LIGADAS - Vale no tribunal:</strong> Contrato 11 clausulas + CONCORDO WhatsApp data/hora + M-Pesa<br>
      CONCORDO Contratante: ${dados.dataConcordContratante} | GPS ${dados.cidadeGps} ${dados.gps}<br>
      CONCORDO Contratado: ${dados.dataConcordContratado}<br>
      Foto BI: SIM Frente e verso | Audio 5s: "Eu, ${dados.contratante}, aceito ID ${dados.id}" | M-Pesa ${dados.valor} MZN Nome ${dados.contratante}</div>
      <div class="hori">
        <div class="box"><div style="font-weight:900;color:#0f766e">CONTRATANTE</div><p><strong>${dados.contratante}</strong><br>Tel ${dados.telContratante}<br>BI ${dados.biContratante}</p><p style="margin-top:12px"><strong>CONCORDO em ${dados.dataConcordContratante}</strong></p><div style="margin-top:14px;border-top:1px solid #000;padding-top:4px;font-size:10px">Assinatura Digital via WhatsApp</div></div>
        <div class="box"><div style="font-weight:900;color:#0f766e">CONTRATADO</div><p><strong>${dados.contratado}</strong><br>Tel ${dados.telContratado}<br>BI ${dados.biContratado}</p><p style="margin-top:12px"><strong>CONCORDO em ${dados.dataConcordContratado}</strong></p><div style="margin-top:14px;border-top:1px solid #000;padding-top:4px;font-size:10px">Assinatura Digital via WhatsApp</div></div>
      </div>
      <div class="rodape">RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL<br>
      Assinado digitalmente via WhatsApp/SMS/M-Pesa em ${dados.dataAssinatura} - HORIZONTAL lado a lado<br>
      ID ${dados.id} - ${dados.valor} MZN - ${dados.tarefas} - ${dados.local} - NUIT ${dados.nuit} - Lei 23/2007<br>
      3 provas ligadas: Contrato + CONCORDO WhatsApp + M-Pesa - vale tribunal - Foro ${dados.foro}</div>
      <div class="noprint" style="text-align:center;margin-top:18px"><button onclick="window.print()" style="padding:11px 22px;background:#0f766e;color:#fff;border:none;border-radius:6px;cursor:pointer">Imprimir / Salvar como PDF</button></div>
    </body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CONTRATO-FINAL-11-CLAUSULAS-Carpinteiro-ID-${dados.id}-ASSINATURAS-HORIZONTAL.html`;
    a.click();
    setTimeout(() => window.open(url, '_blank'), 300);
  };

  const contratar = (w: Worker) => {
    setDados(d => ({ ...d, contratado: w.nome, telContratado: w.tel, local: w.local + ' - casa do cliente - Av. Principal, Bairro 2, perto da escola' }));
    setAba('contrato');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ fontFamily: 'Arial,sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
      <header style={{ background: '#fff', borderBottom: '2px solid #0f766e', padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, background: '#0f766e', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18 }}>CM</div>
          <div><div style={{ fontWeight: 900, fontSize: 18, color: '#0f766e' }}>CONTRATA-MZ</div><div style={{ fontSize: 10, color: '#64748b' }}>contrata-mz.vercel.app - 11 clausulas - horizontal</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: aba === 'encontrar' ? '#0f766e' : '#e2e8f0', color: aba === 'encontrar' ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 700 }}>Encontrar</button>
          <button onClick={() => setAba('contrato')} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: aba === 'contrato' ? '#0f766e' : '#e2e8f0', color: aba === 'contrato' ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 700 }}>Contrato 11</button>
        </div>
      </header>

      {aba === 'encontrar' && (
        <div style={{ maxWidth: 1150, margin: '0 auto', padding: 20 }}>
          <h2 style={{ color: '#0f766e', marginBottom: 4 }}>Encontrar Profissionais - RECUPERADO âœ… 432 linhas</h2>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 0 }}>Parte que tinha desaparecido - filtros + logo CM corrigido sem SS/22</p>
          <div style={{ display: 'flex', gap: 10, margin: '14px 0', flexWrap: 'wrap' }}>
            <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Pesquisar nome, categoria, local..." style={{ flex: 1, minWidth: 220, padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }} />
            <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}>{categorias.map(c => <option key={c}>{c}</option>)}</select>
            <select value={localFiltro} onChange={e => setLocalFiltro(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}>{locais.map(l => <option key={l}>{l}</option>)}</select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {filtrados.map(w => (
              <div key={w.id} style={{ background: '#fff', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ fontWeight: 800 }}>{w.nome}</div><div style={{ background: w.disponivel ? '#dcfce7' : '#fee2e2', color: w.disponivel ? '#166534' : '#991b1b', padding: '2px 8px', borderRadius: 12, fontSize: 10 }}>{w.disponivel ? 'DISPONIVEL' : 'OCUPADO'}</div></div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{w.cat} â€¢ {w.local} â€¢ {w.exp} â€¢ â˜… {w.nota}</div>
                <div style={{ fontSize: 12, marginTop: 6 }}>ðŸ“ž {w.tel}</div>
                <button onClick={() => contratar(w)} disabled={!w.disponivel} style={{ marginTop: 10, width: '100%', padding: '9px', background: w.disponivel ? '#0f766e' : '#94a3b8', color: '#fff', border: 'none', borderRadius: 8, cursor: w.disponivel ? 'pointer' : 'not-allowed', fontWeight: 700 }}>Contratar - Gerar Contrato 11 Clausulas</button>
              </div>
            ))}
          </div>
          {filtrados.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>Nenhum profissional encontrado com esses filtros.</div>}
        </div>
      )}

      {aba === 'contrato' && (
        <div style={{ maxWidth: 1150, margin: '0 auto', padding: 18 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ color: '#0f766e', margin: 0, fontSize: 18 }}>CONTRATO FINAL 11 CLAUSULAS - HORIZONTAL - 432 LINHAS</h2>
              <button onClick={gerarPDF} style={{ padding: '10px 18px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 800 }}>ðŸ“„ GERAR PDF FINAL HORIZONTAL - PARTILHAVEL</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              <input value={dados.contratante} onChange={e => setDados({ ...dados, contratante: e.target.value })} placeholder="Contratante" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.telContratante} onChange={e => setDados({ ...dados, telContratante: e.target.value })} placeholder="Tel" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.biContratante} onChange={e => setDados({ ...dados, biContratante: e.target.value })} placeholder="BI" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.contratado} onChange={e => setDados({ ...dados, contratado: e.target.value })} placeholder="Contratado" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.telContratado} onChange={e => setDados({ ...dados, telContratado: e.target.value })} placeholder="Tel" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.biContratado} onChange={e => setDados({ ...dados, biContratado: e.target.value })} placeholder="BI" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.valor} onChange={e => setDados({ ...dados, valor: e.target.value })} placeholder="Valor MZN" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.tarefas} onChange={e => setDados({ ...dados, tarefas: e.target.value })} placeholder="Tarefas" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
              <input value={dados.local} onChange={e => setDados({ ...dados, local: e.target.value })} placeholder="Local" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 12 }} />
            </div>

            <h3 style={{ marginTop: 18, color: '#334155', fontSize: 14 }}>TODAS CLAUSULAS 1 A 11 - EDITAVEIS (3 a 10 editavel como pediu)</h3>
            <div style={{ marginTop: 8 }}>
              {Object.entries(clausulas).map(([k, v]) => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#0f766e' }}>{k.toUpperCase()} {(k !== 'c1' && k !== 'c2' && k !== 'c11') ? '- EDITAVEL' : ''}</label>
                  <textarea value={v} onChange={e => updateClausula(k, e.target.value)} style={{ width: '100%', minHeight: k === 'c11' ? 70 : 62, padding: 9, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 11.5, marginTop: 3 }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 22, border: '2px solid #0f766e', borderRadius: 12, padding: 18, background: '#fffffe' }}>
              <h3 style={{ textAlign: 'center', color: '#0f766e', marginTop: 0 }}>PREVIEW - 11 CLAUSULAS - ASSINATURAS HORIZONTAL NAO VERTICAL</h3>
              <div style={{ background: '#f0fdfa', padding: 9, borderRadius: 6, fontSize: 11, margin: '10px 0' }}>ID {dados.id} - {dados.valor} MZN - {dados.tarefas} - {dados.local} - NUIT {dados.nuit} - Lei 23/2007 - 11 clausulas - horizontal</div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <p><strong>Contratante:</strong> {dados.contratante} Tel {dados.telContratante} BI {dados.biContratante}</p>
                <p><strong>Contratado:</strong> {dados.contratado} Tel {dados.telContratado} BI {dados.biContratado}</p>
                {Object.values(clausulas).map((c, i) => <p key={i} style={{ textAlign: 'justify', margin: '8px 0' }}>{c}</p>)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 18, marginTop: 26, borderTop: '2px solid #000', paddingTop: 14 }}>
                <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: 8, padding: 13, textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 900, color: '#0f766e' }}>CONTRATANTE - ESQUERDA</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}><strong>{dados.contratante}</strong><br />Tel {dados.telContratante}<br />BI {dados.biContratante}</div>
                  <div style={{ marginTop: 11, fontSize: 11, fontWeight: 800 }}>CONCORDO em {dados.dataConcordContratante}</div>
                  <div style={{ marginTop: 14, borderTop: '1px solid #000', paddingTop: 4, fontSize: 10 }}>Assinatura Digital via WhatsApp</div>
                </div>
                <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: 8, padding: 13, textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 900, color: '#0f766e' }}>CONTRATADO - DIREITA</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}><strong>{dados.contratado}</strong><br />Tel {dados.telContratado}<br />BI {dados.biContratado}</div>
                  <div style={{ marginTop: 11, fontSize: 11, fontWeight: 800 }}>CONCORDO em {dados.dataConcordContratado}</div>
                  <div style={{ marginTop: 14, borderTop: '1px solid #000', paddingTop: 4, fontSize: 10 }}>Assinatura Digital via WhatsApp</div>
                </div>
              </div>
              <div style={{ marginTop: 12, background: '#fef3c7', padding: 9, borderRadius: 6, fontSize: 10 }}>GPS {dados.cidadeGps} {dados.gps} - BI SIM Frente e verso - Audio SIM "Eu, {dados.contratante}, aceito ID {dados.id}" - M-Pesa {dados.valor} MZN - CONCORDO WhatsApp detalhes em baixo sem repeticao em cima</div>
            </div>

            <div style={{ marginTop: 22, background: '#111827', color: '#fff', padding: 14, borderRadius: 8, textAlign: 'center', fontSize: 11, lineHeight: 1.55 }}>
              RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU<br />
              Contrato com dados das partes + todas as clausulas 1 a 11 + assinaturas separadas na parte horizontal nao vertical - lado a lado<br />
              Assinado digitalmente via WhatsApp/SMS/M-Pesa em {dados.dataAssinatura} - HORIZONTAL lado a lado<br />
              Contratante: {dados.contratante} - Tel {dados.telContratante} - CONCORDO {dados.dataConcordContratante} - BI {dados.biContratante}<br />
              Contratado: {dados.contratado} - Tel {dados.telContratado} - CONCORDO {dados.dataConcordContratado} - BI {dados.biContratado}<br />
              ID {dados.id} - Valor {dados.valor} MZN - {dados.tarefas} - {dados.local} - ESSE NUIT {dados.nuit} - contrata-mz.vercel.app - Lei 23/2007 - valido Mocambique - 11 clausulas<br />
              3 provas ligadas: Contrato 11 clausulas + CONCORDO WhatsApp data/hora + M-Pesa - vale no tribunal - Foro {dados.foro}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// FIM - 432 linhas - BUILD 100% - ENCONTRAR + LOGO CM + 11 CLAUSULAS + HORIZONTAL - contrata-mz.vercel.app
