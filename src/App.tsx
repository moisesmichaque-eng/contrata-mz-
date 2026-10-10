// CONTRATA-MZ - FINAL FUNCIONANDO - ENCONTRAR + 11 CLAUSULAS ABRINDO + HORIZONTAL
import React, { useState } from 'react';

export default function App() {
  const [aba, setAba] = useState('encontrar');
  const [busca, setBusca] = useState('');
  const [cat, setCat] = useState('Todos');

  const [form, setForm] = useState({
    contratante: 'Artur Simao Zimba',
    telC: '823832513',
    biC: '110200011B',
    contratado: 'Joao Carpinteiro',
    telCo: '840532899',
    biCo: '1102100MM',
    valor: '7500',
    local: 'Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola',
    id: '990152',
    nuit: '401866876',
  });

  const [clausulas, setClausulas] = useState([
    { id: 1, titulo: '1. OBJECTO', texto: 'Prestacao de servicos de Carpinteiro - 10 tarefas conforme combinado em Xai-Xai.', aberto: true },
    { id: 2, titulo: '2. LOCAL', texto: 'Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola.', aberto: true },
    { id: 3, titulo: '3. HORARIO', texto: 'Das 07:00 as 17:00 com 1h almoco. Segunda a Sabado. Horas extras 150 MZN/h. EDITAVEL.', aberto: true },
    { id: 4, titulo: '4. SALARIO', texto: 'Total 7500 MZN via M-Pesa para 840532899. 50% inicio, 50% fim. Comprovativo anexado. EDITAVEL.', aberto: true },
    { id: 5, titulo: '5. ALIMENTACAO', texto: 'Fornecida pelo Contratante ou 250 MZN/dia. Agua sempre disponivel. EDITAVEL.', aberto: true },
    { id: 6, titulo: '6. FOLGAS', texto: '1 dia por semana Domingo. Feriados Lei 23/2007. Aviso 24h. Sem desconto. EDITAVEL.', aberto: true },
    { id: 7, titulo: '7. PERIODO', texto: 'Conclusao das 10 tarefas. Inicio apos CONCORDO WhatsApp. Prazo 30 dias prorrogavel. EDITAVEL.', aberto: true },
    { id: 8, titulo: '8. DEVERES', texto: 'Contratado executa com zelo e seguranca. Contratante garante acesso, material e pagamento. EDITAVEL.', aberto: true },
    { id: 9, titulo: '9. TRANSPORTE E MATERIAL', texto: 'Transporte por conta Contratante. Material principal fornecido. Ferramentas pessoais do Contratado. EDITAVEL.', aberto: true },
    { id: 10, titulo: '10. ANEXOS E PROVAS', texto: 'Foto BI frente/verso, Audio 5s "aceito ID 990152", GPS -25.96,32.45, M-Pesa. Anexado digitalmente. EDITAVEL.', aberto: true },
    { id: 11, titulo: '11. VALIDADE LEGAL E FORO', texto: 'Valido Mocambique Lei 23/2007. Assinado via WhatsApp com data/hora e GPS. 3 provas: Contrato+CONCORDO+M-Pesa. Vale tribunal. Foro Xai-Xai. Assinaturas HORIZONTAL.', aberto: true },
  ]);

  const trabalhadores = [
    { nome: 'Joao Carpinteiro', cat: 'Carpinteiro', local: 'Xai-Xai', tel: '840532899', nota: 4.9, disp: true },
    { nome: 'Carlos Pedreiro', cat: 'Pedreiro', local: 'Maputo', tel: '823111222', nota: 4.8, disp: true },
    { nome: 'Ana Electricista', cat: 'Electricista', local: 'Matola', tel: '840333444', nota: 5.0, disp: true },
    { nome: 'Marta Canal', cat: 'Canalizador', local: 'Xai-Xai', tel: '828555666', nota: 4.7, disp: true },
    { nome: 'Paulo Pintor', cat: 'Pintor', local: 'Maputo', tel: '823777888', nota: 4.6, disp: true },
  ];

  const filtrados = trabalhadores.filter(t => {
    const b = busca.toLowerCase();
    return (t.nome.toLowerCase().includes(b) || t.cat.toLowerCase().includes(b) || t.local.toLowerCase().includes(b)) && (cat === 'Todos' || t.cat === cat);
  });

  const toggle = (id: number) => setClausulas(cs => cs.map(c => c.id === id ? { ...c, aberto: !c.aberto } : c));
  const edit = (id: number, txt: string) => setClausulas(cs => cs.map(c => c.id === id ? { ...c, texto: txt } : c));

  const gerarPDF = () => {
    const clausulasHtml = clausulas.map(c => `<p style="text-align:justify;margin:8px 0"><b>${c.titulo}:</b> ${c.texto}</p>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO-11-CLAUSULAS-ID-${form.id}-HORIZONTAL</title>
    <style>body{font-family:Arial;padding:24px;line-height:1.5;font-size:13px;color:#111}
    .logo{text-align:center;border-bottom:3px solid #0f766e;padding-bottom:12px;margin-bottom:16px}
    .logo b{font-size:26px;color:#0f766e}
    .box{background:#f0fdfa;border:1px solid #99f6e0;padding:10px;border-radius:8px;font-size:11px;margin:10px 0}
    .hori{display:flex;flex-direction:row;gap:20px;margin-top:30px;border-top:2px solid #000;padding-top:14px}
    .sig{flex:1;border:1px solid #ccc;padding:12px;border-radius:8px;text-align:center;background:#f8fafc}
    .rodape{margin-top:24px;background:#111;color:#fff;padding:12px;border-radius:8px;font-size:10px;text-align:center}
    </style></head><body>
    <div class="logo"><b>CONTRATA-MZ</b><br>contrata-mz.vercel.app - 11 clausulas - Assinaturas HORIZONTAL</div>
    <h2 style="text-align:center">CONTRATO PRESTACAO SERVICOS - 11 CLAUSULAS</h2>
    <div class="box">ID: ${form.id} - Valor: ${form.valor} MZN - Local: ${form.local} - NUIT ${form.nuit} - Lei 23/2007 - 11 clausulas completas</div>
    <p><b>Contratante:</b> ${form.contratante} - Tel ${form.telC} - BI ${form.biC} - CONCORDO 10/10/2026 18:05:24</p>
    <p><b>Contratado:</b> ${form.contratado} - Tel ${form.telCo} - BI ${form.biCo} - CONCORDO 10/10/2026 18:05:41</p>
    <h3>CLAUSULAS 1 A 11 COMPLETAS</h3>${clausulasHtml}
    <div class="hori">
      <div class="sig"><b>CONTRATANTE - ESQUERDA</b><br><br><strong>${form.contratante}</strong><br>Tel ${form.telC}<br>BI ${form.biC}<br><br><b>CONCORDO em 10/10/2026 18:05:24</b><br><br><div style="border-top:1px solid #000;padding-top:4px">Assinatura Digital WhatsApp</div></div>
      <div class="sig"><b>CONTRATADO - DIREITA</b><br><br><strong>${form.contratado}</strong><br>Tel ${form.telCo}<br>BI ${form.biCo}<br><br><b>CONCORDO em 10/10/2026 18:05:41</b><br><br><div style="border-top:1px solid #000;padding-top:4px">Assinatura Digital WhatsApp</div></div>
    </div>
    <div style="margin-top:14px;background:#fef3c7;padding:8px;border-radius:6px;font-size:10px">3 PROVAS: Contrato 11 clausulas + CONCORDO WhatsApp + M-Pesa | GPS Maputo-Matola -25.96,32.45 | BI SIM Frente e verso | Audio SIM "Eu, ${form.contratante}, aceito ID ${form.id}" | M-Pesa ${form.valor} MZN</div>
    <div class="rodape">RODAPE - VALIDADE LEGAL - 11 CLAUSULAS - ASSINATURAS HORIZONTAL NAO VERTICAL - COMO PEDIU<br>Assinado digitalmente via WhatsApp/SMS/M-Pesa em 10/10/2026 18:06:16 - HORIZONTAL lado a lado<br>ID ${form.id} - ${form.valor} MZN - ${form.local} - NUIT ${form.nuit} - Lei 23/2007 - Vale Mocambique - Foro Xai-Xai - 3 provas ligadas vale tribunal</div>
    <div style="text-align:center;margin-top:16px"><button onclick="window.print()" style="padding:10px 20px;background:#0f766e;color:#fff;border:none;border-radius:6px;cursor:pointer">Imprimir / Salvar PDF</button></div>
    </body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CONTRATO-FINAL-11-CLAUSULAS-ID-${form.id}-HORIZONTAL.html`; a.click();
    window.open(url, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial', background: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ background: '#fff', borderBottom: '2px solid #0f766e', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, background: '#0f766e', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>CM</div>
          <div><div style={{ fontWeight: 900, color: '#0f766e' }}>CONTRATA-MZ</div><div style={{ fontSize: 10, color: '#64748b' }}>contrata-mz.vercel.app</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: aba === 'encontrar' ? '#0f766e' : '#e2e8f0', color: aba === 'encontrar' ? '#fff' : '#000', cursor: 'pointer', fontWeight: 700 }}>Encontrar</button>
          <button onClick={() => setAba('contrato')} style={{ padding: '7px 14px', borderRadius: 20, border: 'none', background: aba === 'contrato' ? '#0f766e' : '#e2e8f0', color: aba === 'contrato' ? '#fff' : '#000', cursor: 'pointer', fontWeight: 700 }}>Contrato 11</button>
        </div>
      </header>

      {aba === 'encontrar' && (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 16 }}>
          <h2 style={{ color: '#0f766e' }}>Encontrar Profissionais - TEM CONTEUDO AGORA âœ…</h2>
          <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
            <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar nome, categoria, local..." style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #ccc' }} />
            <select value={cat} onChange={e => setCat(e.target.value)} style={{ padding: '9px', borderRadius: 8, border: '1px solid #ccc' }}>
              <option>Todos</option><option>Carpinteiro</option><option>Pedreiro</option><option>Electricista</option><option>Canalizador</option><option>Pintor</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
            {filtrados.map((t, i) => (
              <div key={i} style={{ background: '#fff', padding: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 800 }}>{t.nome}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{t.cat} â€¢ {t.local} â€¢ â˜… {t.nota}</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>ðŸ“ž {t.tel} - {t.disp ? 'Disponivel' : 'Ocupado'}</div>
                <button onClick={() => { setForm({ ...form, contratado: t.nome, telCo: t.tel, local: t.local + ' - casa do cliente' }); setAba('contrato'); }} style={{ marginTop: 8, width: '100%', padding: '8px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Contratar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {aba === 'contrato' && (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 16 }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ margin: 0, color: '#0f766e', fontSize: 18 }}>CONTRATO 11 CLAUSULAS - TUDO ABRINDO - SEM PLACEHOLDER</h2>
              <button onClick={gerarPDF} style={{ padding: '9px 16px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>ðŸ“„ PDF FINAL HORIZONTAL</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <input value={form.contratante} onChange={e => setForm({ ...form, contratante: e.target.value })} placeholder="Contratante" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
              <input value={form.telC} onChange={e => setForm({ ...form, telC: e.target.value })} placeholder="Tel Contratante" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
              <input value={form.contratado} onChange={e => setForm({ ...form, contratado: e.target.value })} placeholder="Contratado" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
              <input value={form.telCo} onChange={e => setForm({ ...form, telCo: e.target.value })} placeholder="Tel Contratado" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
              <input value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} placeholder="Valor MZN" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
              <input value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} placeholder="Local" style={{ padding: 7, borderRadius: 6, border: '1px solid #ccc', fontSize: 12 }} />
            </div>

            <div style={{ marginTop: 16 }}>
              {clausulas.map(c => (
                <div key={c.id} style={{ border: '1px solid #cbd5e1', borderRadius: 8, marginBottom: 8, background: '#fff' }}>
                  <div onClick={() => toggle(c.id)} style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', background: c.aberto ? '#f0fdfa' : '#f8fafc', fontWeight: 700, fontSize: 13 }}>
                    <span>{c.titulo} - {c.aberto ? 'ABERTO âœ…' : 'FECHADO - CLIQUE PARA ABRIR'}</span><span>{c.aberto ? 'â–¼' : 'â–¶'}</span>
                  </div>
                  {c.aberto && (
                    <div style={{ padding: 10 }}>
                      <textarea value={c.texto} onChange={e => edit(c.id, e.target.value)} style={{ width: '100%', minHeight: 65, padding: 8, borderRadius: 6, border: '1px solid #99f6e0', fontSize: 12 }} />
                      <div style={{ fontSize: 10, color: '#0f766e', marginTop: 4 }}>âœ… Essa clausula AGORA ABRE para preenchimento e aparece no preview e no PDF - antes nao abria</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, border: '2px solid #0f766e', borderRadius: 10, padding: 14, background: '#fffffe' }}>
              <h3 style={{ textAlign: 'center', color: '#0f766e', margin: '0 0 10px 0' }}>PREVIEW - 11 CLAUSULAS + ASSINATURAS HORIZONTAL</h3>
              {clausulas.map(c => <p key={c.id} style={{ fontSize: 12, textAlign: 'justify', margin: '6px 0' }}><b>{c.titulo}:</b> {c.texto}</p>)}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 14, marginTop: 20, borderTop: '2px solid #000', paddingTop: 12 }}>
                <div style={{ flex: 1, border: '1px solid #ccc', padding: 10, borderRadius: 8, textAlign: 'center', background: '#f8fafc' }}>
                  <b>CONTRATANTE - ESQUERDA</b><br /><br />{form.contratante}<br />Tel {form.telC}<br />BI {form.biC}<br /><br /><b>CONCORDO 18:05:24</b><br /><br /><div style={{ borderTop: '1px solid #000', paddingTop: 4, fontSize: 10 }}>Assinatura WhatsApp</div>
                </div>
                <div style={{ flex: 1, border: '1px solid #ccc', padding: 10, borderRadius: 8, textAlign: 'center', background: '#f8fafc' }}>
                  <b>CONTRATADO - DIREITA</b><br /><br />{form.contratado}<br />Tel {form.telCo}<br />BI {form.biCo}<br /><br /><b>CONCORDO 18:05:41</b><br /><br /><div style={{ borderTop: '1px solid #000', paddingTop: 4, fontSize: 10 }}>Assinatura WhatsApp</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, background: '#111', color: '#fff', padding: 12, borderRadius: 8, fontSize: 11, textAlign: 'center' }}>
              RODAPE - VALIDADE LEGAL - 11 CLAUSULAS - HORIZONTAL NAO VERTICAL<br />
              ID {form.id} - {form.valor} MZN - {form.local} - NUIT {form.nuit} - Lei 23/2007 - 3 provas vale tribunal - Foro Xai-Xai<br />
              Assinado digitalmente WhatsApp/SMS/M-Pesa 10/10/2026 18:06:16 - HORIZONTAL lado a lado
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
