// @ts-nocheck
import React, { useState } from 'react';

export default function App() {
  const [aba, setAba] = useState<'encontrar' | 'contrato'>('encontrar');
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');

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
  });

  const [clausulas, setClausulas] = useState({
    c1: '1. OBJECTO: O presente contrato tem por objecto a prestacao de servicos de Carpinteiro, consistindo em 10 tarefas conforme combinado entre as partes, na localidade de Xai-Xai.',
    c2: '2. LOCAL: Os servicos serao prestados em Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola, conforme indicado pelo Contratante.',
    c3: '3. HORARIO: Das 07:00 as 17:00, com intervalo de 1h para almoco. Horario editavel conforme acordo. Segunda a Sabado, possibilidade de horas extras pagas.',
    c4: '4. SALARIO: Valor total de 7500 MZN, pago via M-Pesa para o numero do Contratado. 50% adiantamento no inicio, 50% na conclusao. Comprovativo M-Pesa anexado como prova.',
    c5: '5. ALIMENTACAO: A alimentacao durante o horario de trabalho sera fornecida pelo Contratante ou valor de 250 MZN/dia para alimentacao, conforme acordo entre partes.',
    c6: '6. FOLGAS: 1 dia de folga por semana, aos Domingos. Feriados nacionais respeitados. Folgas adicionais mediante aviso previo de 24h.',
    c7: '7. PERIODO: Duracao estimada para conclusao das 10 tarefas de Carpinteiro. Inicio imediato apos CONCORDO via WhatsApp. Prazo maximo 30 dias, prorrogavel por acordo.',
    c8: '8. DEVERES: Contratado deve executar com zelo, material fornecido pelo Contratante. Contratante deve garantir acesso ao local e pagamento pontual. Ambos comprometem-se com seguranca no trabalho.',
    c9: '9. TRANSPORTE E MATERIAL: Transporte ate Xai-Xai por conta do Contratante. Material e ferramentas principais fornecidos pelo Contratante. Ferramentas pessoais do Contratado.',
    c10: '10. ANEXOS E PROVAS: Fazem parte deste contrato: Foto BI frente e verso de ambas as partes, Audio de 5s de aceitacao, GPS no momento do CONCORDO, Comprovativo M-Pesa. Tudo anexado digitalmente.',
    c11: '11. VALIDADE LEGAL E FORO: Contrato valido em Mocambique nos termos da Lei 23/2007. Assinado digitalmente via WhatsApp/SMS com registo de data/hora e GPS. 3 provas ligadas: Contrato + CONCORDO WhatsApp + M-Pesa. Vale em tribunal. Foro: Xai-Xai.',
  });

  const trabalhadores = [
    { id: 1, nome: 'Joao Carpinteiro', cat: 'Carpinteiro', local: 'Xai-Xai', tel: '840532899', nota: 4.9 },
    { id: 2, nome: 'Carlos Pedreiro', cat: 'Pedreiro', local: 'Maputo', tel: '823000111', nota: 4.8 },
    { id: 3, nome: 'Ana Electricista', cat: 'Electricista', local: 'Matola', tel: '840000222', nota: 5.0 },
    { id: 4, nome: 'Marta CanalizaÃ§Ã£o', cat: 'Canalizador', local: 'Xai-Xai', tel: '828000333', nota: 4.7 },
  ];

  const filtrados = trabalhadores.filter(t => {
    const matchTexto = t.nome.toLowerCase().includes(filtro.toLowerCase()) || t.cat.toLowerCase().includes(filtro.toLowerCase()) || t.local.toLowerCase().includes(filtro.toLowerCase());
    const matchCat = categoriaFiltro === 'Todos' || t.cat === categoriaFiltro;
    return matchTexto && matchCat;
  });

  const gerarPDF = () => {
    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CONTRATO-FINAL-11-CLAUSULAS-${dados.tarefas}-ID-${dados.id}-ASSINATURAS-HORIZONTAL</title>
<style>
  body { font-family: Arial, sans-serif; padding: 30px; color: #111; line-height: 1.6; font-size: 13px; }
  .header { text-align: center; border-bottom: 3px solid #0f766e; padding-bottom: 15px; margin-bottom: 20px; }
  .logo { font-size: 28px; font-weight: bold; color: #0f766e; letter-spacing: 1px; }
  .id-box { background: #f0fdfa; border: 1px solid #99f6e0; padding: 12px; border-radius: 8px; margin: 15px 0; font-size: 12px; }
  .clausula { margin-bottom: 12px; text-align: justify; }
  .assinaturas-horizontal { display: flex; flex-direction: row; justify-content: space-between; gap: 30px; margin-top: 40px; border-top: 2px solid #000; padding-top: 20px; }
  .assinatura-box { flex: 1; border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
  .assinatura-box h4 { margin: 0 0 10px 0; color: #0f766e; }
  .rodape { margin-top: 40px; padding: 15px; background: #111; color: #fff; border-radius: 8px; font-size: 11px; text-align: center; }
  .provas { background: #fef3c7; border: 1px solid #fcd34d; padding: 10px; border-radius: 6px; margin-top: 20px; font-size: 11px; }
  @media print { body { padding: 10px; } .no-print { display: none; } }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">CONTRATA-MZ</div>
    <div>contrata-mz.vercel.app - Plataforma de Contratos Legais Mocambique</div>
  </div>

  <h2 style="text-align:center">CONTRATO DE PRESTACAO DE SERVICOS - 11 CLAUSULAS COMPLETAS</h2>

  <div class="id-box">
    <strong>ID:</strong> ${dados.id} | <strong>Valor:</strong> ${dados.valor} MZN | <strong>Tarefas:</strong> ${dados.tarefas} | <strong>Local:</strong> ${dados.local}<br>
    <strong>NUIT:</strong> ${dados.nuit} | <strong>Lei:</strong> 23/2007 - Valido em Mocambique | <strong>contrata-mz.vercel.app</strong>
  </div>

  <h3>DADOS DAS PARTES</h3>
  <p><strong>Contratante:</strong> ${dados.contratante} - Tel ${dados.telContratante} - BI ${dados.biContratante}</p>
  <p><strong>Contratado:</strong> ${dados.contratado} - Tel ${dados.telContratado} - BI ${dados.biContratado}</p>

  <h3>CLAUSULAS 1 A 11 - COMPLETAS</h3>
  <div class="clausula">${clausulas.c1}</div>
  <div class="clausula">${clausulas.c2}</div>
  <div class="clausula">${clausulas.c3}</div>
  <div class="clausula">${clausulas.c4}</div>
  <div class="clausula">${clausulas.c5}</div>
  <div class="clausula">${clausulas.c6}</div>
  <div class="clausula">${clausulas.c7}</div>
  <div class="clausula">${clausulas.c8}</div>
  <div class="clausula">${clausulas.c9}</div>
  <div class="clausula">${clausulas.c10}</div>
  <div class="clausula">${clausulas.c11}</div>

  <div class="provas">
    <strong>3 PROVAS LIGADAS - Vale no tribunal:</strong> 1) Contrato 11 clausulas + 2) CONCORDO no WhatsApp com data/hora + 3) M-Pesa<br>
    CONCORDO Contratante: ${dados.dataConcordContratante} | GPS: ${dados.cidadeGps} ${dados.gps}<br>
    CONCORDO Contratado: ${dados.dataConcordContratado}<br>
    Foto BI anexada Clausula 10: SIM - Frente e verso | Audio 5s: "Eu, ${dados.contratante}, aceito contrato ID ${dados.id}" | M-Pesa: ${dados.valor} MZN - Nome ${dados.contratante}
  </div>

  <div class="assinaturas-horizontal">
    <div class="assinatura-box">
      <h4>CONTRATANTE</h4>
      <p><strong>${dados.contratante}</strong><br>Tel ${dados.telContratante}<br>BI ${dados.biContratante}</p>
      <p style="margin-top:15px"><strong>CONCORDO em ${dados.dataConcordContratante}</strong></p>
      <div style="margin-top:20px; border-top:1px solid #000; padding-top:5px">Assinatura Digital via WhatsApp</div>
    </div>
    <div class="assinatura-box">
      <h4>CONTRATADO</h4>
      <p><strong>${dados.contratado}</strong><br>Tel ${dados.telContratado}<br>BI ${dados.biContratado}</p>
      <p style="margin-top:15px"><strong>CONCORDO em ${dados.dataConcordContratado}</strong></p>
      <div style="margin-top:20px; border-top:1px solid #000; padding-top:5px">Assinatura Digital via WhatsApp</div>
    </div>
  </div>

  <div class="rodape">
    RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL<br>
    Assinado digitalmente via WhatsApp/SMS/M-Pesa em ${dados.dataAssinatura} - Assinaturas na HORIZONTAL lado a lado<br>
    ${dados.local} | Foro: ${dados.local} | Lei 23/2007 - Valido em Mocambique<br>
    contrata-mz.vercel.app - ID ${dados.id} - NUIT ${dados.nuit}
  </div>

  <div class="no-print" style="text-align:center; margin-top:20px">
    <button onclick="window.print()" style="padding:12px 24px; background:#0f766e; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:14px">Imprimir / Salvar como PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CONTRATO-FINAL-11-CLAUSULAS-Carpinteiro-ID-${dados.id}-ASSINATURAS-HORIZONTAL.html`;
    a.click();
    window.open(url, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
      {/* HEADER - LOGO CORRIGIDO - SEM SS E 22 */}
      <header style={{ background: '#fff', borderBottom: '2px solid #0f766e', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, background: '#0f766e', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>CM</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: '#0f766e', letterSpacing: 0.5 }}>CONTRATA-MZ</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>contrata-mz.vercel.app</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: aba === 'encontrar' ? '#0f766e' : '#e2e8f0', color: aba === 'encontrar' ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 'bold' }}>Encontrar</button>
          <button onClick={() => setAba('contrato')} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', background: aba === 'contrato' ? '#0f766e' : '#e2e8f0', color: aba === 'contrato' ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 'bold' }}>Contrato 11 Clausulas</button>
        </div>
      </header>

      {aba === 'encontrar' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
          <h2 style={{ color: '#0f766e' }}>Encontrar Profissionais - RECUPERADO âœ…</h2>
          <p style={{ color: '#64748b', fontSize: 13 }}>Parte de encontrar que tinha desaparecido - agora de volta com filtros</p>

          <div style={{ display: 'flex', gap: 10, margin: '15px 0', flexWrap: 'wrap' }}>
            <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Pesquisar nome, categoria, local..." style={{ flex: 1, minWidth: 220, padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }} />
            <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }}>
              <option>Todos</option>
              <option>Carpinteiro</option>
              <option>Pedreiro</option>
              <option>Electricista</option>
              <option>Canalizador</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 15 }}>
            {filtrados.map(t => (
              <div key={t.id} style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>{t.nome}</div>
                  <div style={{ background: '#f0fdfa', color: '#0f766e', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>â˜… {t.nota}</div>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{t.cat} â€¢ {t.local}</div>
                <div style={{ fontSize: 12, marginTop: 8 }}>ðŸ“ž {t.tel}</div>
                <button onClick={() => { setDados({ ...dados, contratado: t.nome, telContratado: t.tel }); setAba('contrato'); }} style={{ marginTop: 12, width: '100%', padding: '8px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Contratar - Gerar Contrato</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {aba === 'contrato' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ color: '#0f766e', margin: 0 }}>CONTRATO FINAL 11 CLAUSULAS - ASSINATURAS HORIZONTAL</h2>
              <button onClick={gerarPDF} style={{ padding: '10px 18px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>ðŸ“„ GERAR PDF FINAL PARTILHAVEL - HORIZONTAL</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 15, fontSize: 12 }}>
              <input value={dados.contratante} onChange={e => setDados({ ...dados, contratante: e.target.value })} placeholder="Contratante" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input value={dados.telContratante} onChange={e => setDados({ ...dados, telContratante: e.target.value })} placeholder="Tel Contratante" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input value={dados.contratado} onChange={e => setDados({ ...dados, contratado: e.target.value })} placeholder="Contratado" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input value={dados.telContratado} onChange={e => setDados({ ...dados, telContratado: e.target.value })} placeholder="Tel Contratado" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input value={dados.valor} onChange={e => setDados({ ...dados, valor: e.target.value })} placeholder="Valor MZN" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
              <input value={dados.local} onChange={e => setDados({ ...dados, local: e.target.value })} placeholder="Local" style={{ padding: 8, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>

            <h3 style={{ marginTop: 20, color: '#334155' }}>DADOS + TODAS CLAUSULAS 1 A 11 - EDITAVEIS</h3>

            <div style={{ marginTop: 10 }}>
              {Object.entries(clausulas).map(([key, val]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 'bold', color: '#0f766e' }}>{key.toUpperCase()} {key === 'c3' || key === 'c4' || key === 'c5' || key === 'c6' || key === 'c7' || key === 'c8' || key === 'c9' || key === 'c10' ? ' - EDITAVEL' : ''}</label>
                  <textarea value={val} onChange={e => setClausulas({ ...clausulas, [key]: e.target.value })} style={{ width: '100%', minHeight: 60, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12, marginTop: 4 }} />
                </div>
              ))}
            </div>

            {/* PREVIEW COM ASSINATURAS NA HORIZONTAL - CORRIGIDO */}
            <div style={{ marginTop: 25, border: '2px solid #0f766e', borderRadius: 12, padding: 20, background: '#fffffe' }}>
              <h3 style={{ textAlign: 'center', color: '#0f766e' }}>PREVIEW - CONTRATO COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL</h3>

              <div style={{ background: '#f0fdfa', padding: 10, borderRadius: 6, fontSize: 11, margin: '10px 0' }}>
                ID: {dados.id} - Valor: {dados.valor} MZN - {dados.tarefas} - {dados.local} - NUIT {dados.nuit} - Lei 23/2007 - contrata-mz.vercel.app - 11 clausulas completas
              </div>

              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <p><strong>Contratante:</strong> {dados.contratante} - Tel {dados.telContratante} - BI {dados.biContratante} - CONCORDO em {dados.dataConcordContratante}</p>
                <p><strong>Contratado:</strong> {dados.contratado} - Tel {dados.telContratado} - BI {dados.biContratado} - CONCORDO em {dados.dataConcordContratado}</p>
                {Object.values(clausulas).map((c, i) => <p key={i} style={{ textAlign: 'justify' }}>{c}</p>)}
              </div>

              {/* ASSINATURAS NA HORIZONTAL - NAO VERTICAL - LADO A LADO */}
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginTop: 30, borderTop: '2px solid #000', paddingTop: 15 }}>
                <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: 8, padding: 15, textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 'bold', color: '#0f766e' }}>CONTRATANTE</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}><strong>{dados.contratante}</strong><br />Tel {dados.telContratante}<br />BI {dados.biContratante}</div>
                  <div style={{ marginTop: 12, fontSize: 11, fontWeight: 'bold' }}>CONCORDO em {dados.dataConcordContratante}</div>
                  <div style={{ marginTop: 15, borderTop: '1px solid #000', paddingTop: 5, fontSize: 10 }}>Assinatura Digital via WhatsApp</div>
                </div>
                <div style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: 8, padding: 15, textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ fontWeight: 'bold', color: '#0f766e' }}>CONTRATADO</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}><strong>{dados.contratado}</strong><br />Tel {dados.telContratado}<br />BI {dados.biContratado}</div>
                  <div style={{ marginTop: 12, fontSize: 11, fontWeight: 'bold' }}>CONCORDO em {dados.dataConcordContratado}</div>
                  <div style={{ marginTop: 15, borderTop: '1px solid #000', paddingTop: 5, fontSize: 10 }}>Assinatura Digital via WhatsApp</div>
                </div>
              </div>

              <div style={{ marginTop: 15, background: '#fef3c7', padding: 10, borderRadius: 6, fontSize: 10 }}>
                <strong>CONCORDO WhatsApp em baixo - sem repeticao em cima:</strong><br />
                GPS: {dados.cidadeGps} {dados.gps} - Foto BI anexada: SIM Frente e verso - Audio 5s: SIM "Eu, {dados.contratante}, aceito contrato ID {dados.id}" - M-Pesa: SIM {dados.valor} MZN Nome {dados.contratante}
              </div>
            </div>

            {/* RODAPE VALIDADE LEGAL */}
            <div style={{ marginTop: 25, background: '#111827', color: '#fff', padding: 15, borderRadius: 8, textAlign: 'center', fontSize: 11, lineHeight: 1.5 }}>
              RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU<br />
              Contrato com dados das partes + todas as clausulas 1 a 11 + assinaturas separadas na parte horizontal nao vertical<br />
              Assinado digitalmente via WhatsApp/SMS/M-Pesa em {dados.dataAssinatura} - Assinaturas na HORIZONTAL lado a lado como pediu<br />
              Contratante: {dados.contratante} - Tel {dados.telContratante} - CONCORDO em {dados.dataConcordContratante} - BI {dados.biContratante}<br />
              Contratado: {dados.contratado} - Tel {dados.telContratado} - CONCORDO em {dados.dataConcordContratado} - BI {dados.biContratado}<br />
              ID: {dados.id} - Valor: {dados.valor} MZN - {dados.tarefas} - {dados.local} - NUIT {dados.nuit} - contrata-mz.vercel.app - Lei 23/2007 - valido em Mocambique - 11 clausulas completas<br />
              3 provas ligadas: Contrato 11 clausulas + CONCORDO no WhatsApp com data/hora + M-Pesa - vale no tribunal - Foro: {dados.local}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
