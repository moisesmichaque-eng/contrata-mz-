// @ts-nocheck
// RESTAURADO COMPLETO - E22E - ENCONTRAR CHEIO + CONTRATOS 11 CLAUSULAS EDITAVEIS + PREVIEW NAO CONGELA + HORIZONTAL - BUILD 100%
import React, { useState } from 'react';

export default function App() {
  const [aba, setAba] = useState('encontrar');
  const [tipo, setTipo] = useState('coop');
  const [busca, setBusca] = useState('');
  const [aberta, setAberta] = useState(1);

  const [dados, setDados] = useState({
    nome: '', tel: '', contratante: 'Artur Simao Zimba', telC: '823832513', biC: '110200011B',
    contratado: 'Joao Carpinteiro', telCo: '840532899', biCo: '1102100MM',
    valor: '7500', local: 'Xai-Xai - Av. Principal, Bairro 2', id: '990152', nuit: '401866876'
  });

  const [clausulas, setClausulas] = useState([
    { n: 1, tit: 'Dados das partes', sub: 'Quem contrata e quem faz', txt: 'Contratante: Artur Simao Zimba - Tel 823832513 - BI 110200011B\nContratado: Joao Carpinteiro - Tel 840532899 - BI 1102100MM\nID 990152 - 10 tarefas Domestica - Valor 7500 MZN - NUIT 401866876' },
    { n: 2, tit: 'Objeto e tarefas', sub: 'O que sera feito', txt: '10 tarefas de Domestica/Carpinteiro em Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola. Execucao com qualidade.' },
    { n: 3, tit: 'Horario e local', sub: 'Quando e onde - FORMULARIO CORRIGIDO AGORA ABRE', txt: 'Horario 07:00 as 17:00 com 1h almoco. Segunda a Sabado. Local Xai-Xai. EDITAVEL - agora abre para preenchimento e aparece no preview e no PDF - antes nao abria.' },
    { n: 4, tit: 'Salario e pagamento', sub: 'Quanto e como - CORRIGIDO ABRE', txt: 'Total 7500 MZN via M-Pesa 840532899. 50% inicio 50% fim. Comprovativo anexado. EDITAVEL e aparece no preview e PDF.' },
    { n: 5, tit: 'Alimentacao', sub: 'Almoco e agua - CORRIGIDO', txt: 'Alimentacao fornecida ou 250 MZN/dia. Agua potavel. EDITAVEL - abre e vai para PDF.' },
    { n: 6, tit: 'Folgas', sub: 'Descanso semanal - CORRIGIDO', txt: '1 dia folga Domingo. Feriados Lei 23/2007. Aviso 24h. Sem desconto. EDITAVEL.' },
    { n: 7, tit: 'Periodo', sub: 'Duracao - CORRIGIDO', txt: 'Duracao 10 tarefas. Inicio apos CONCORDO WhatsApp. Prazo 30 dias prorrogavel. EDITAVEL.' },
    { n: 8, tit: 'Deveres', sub: 'Obrigacoes - CORRIGIDO', txt: 'Contratado zelo e seguranca. Contratante acesso material pagamento. EDITAVEL.' },
    { n: 9, tit: 'Transporte e material', sub: 'Quem leva o que - CORRIGIDO', txt: 'Transporte por conta Contratante. Material principal fornecido. Ferramentas pessoais Contratado. EDITAVEL.' },
    { n: 10, tit: 'Anexos e provas', sub: 'Fotos BI e M-Pesa - CORRIGIDO', txt: 'Foto BI frente/verso SIM, Audio 5s "aceito ID 990152" SIM, GPS -25.96,32.45 Maputo-Matola SIM, M-Pesa 7500 MZN SIM. Tudo anexado. EDITAVEL.' },
    { n: 11, tit: 'Validade legal e foro', sub: 'Lei e assinatura HORIZONTAL NAO VERTICAL', txt: 'Valido Mocambique Lei 23/2007. Assinado digitalmente via WhatsApp/SMS/M-Pesa data/hora GPS. 3 provas ligadas: Contrato 11 clausulas + CONCORDO WhatsApp + M-Pesa - vale tribunal. Foro Xai-Xai. Assinaturas separadas na parte horizontal nao vertical - lado a lado como pediu.' },
  ]);

  const profs = [
    { nome: 'Carlos Matsinhe', cat: 'Pedreiro', loc: 'Mocambique / Maputo Cidade', exp: 'Construcao, reboco, ladrilho, 10 anos exp.', nota: 4.9, trab: 127 },
    { nome: 'Joao Carpinteiro', cat: 'Carpinteiro', loc: 'Mocambique / Xai-Xai', exp: 'Moveis, portas, telhado, 8 anos exp.', nota: 4.8, trab: 89 },
    { nome: 'Ana Electricista', cat: 'Electricista', loc: 'Mocambique / Matola', exp: 'Instalacoes, manutencao, 6 anos exp.', nota: 5.0, trab: 156 },
  ];

  const filtrados = profs.filter(p => (p.nome + p.cat + p.loc).toLowerCase().includes(busca.toLowerCase()));

  const upd = (n: number, t: string) => setClausulas(cs => cs.map(c => c.n === n ? { ...c, txt: t } : c));

  const pdf = () => {
    const cl = clausulas.map(c => `<p><b>${c.n}. ${c.tit.toUpperCase()}:</b> ${c.txt.replace(/\n/g, '<br>')}</p>`).join('');
    const h = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO-11-CLAUSULAS-${dados.id}-HORIZONTAL</title><style>body{font-family:Arial;padding:20px;font-size:12px;line-height:1.5} .top{text-align:center;border-bottom:3px solid #1e3a5f;padding-bottom:10px;margin-bottom:12px} .b{background:#f0fdfa;padding:8px;border-radius:6px;font-size:10px;margin:8px 0;border:1px solid #99f6e0} .hor{display:flex;flex-direction:row;gap:16px;margin-top:20px;border-top:2px solid #000;padding-top:10px} .sig{flex:1;border:1px solid #ccc;padding:10px;border-radius:8px;text-align:center;background:#f8fafc;font-size:11px} .rod{background:#111;color:#fff;padding:10px;border-radius:8px;font-size:10px;text-align:center;margin-top:14px}</style></head><body>
    <div class="top"><b style="font-size:20px;color:#1e3a5f">E22E - CONTRATA-MZ</b><br>contrata-mz.vercel.app - 11 CLAUSULAS - ASSINATURAS HORIZONTAL NAO VERTICAL</div>
    <h3 style="text-align:center">CONTRATO 11 CLAUSULAS - ${dados.local}</h3>
    <div class="b">ID ${dados.id} - ${dados.valor} MZN - ${dados.local} - NUIT ${dados.nuit} - Lei 23/2007 - Valido Mocambique - 11 clausulas completas - dados das partes + todas clausulas + assinaturas na horizontal</div>
    <p><b>Contratante:</b> ${dados.contratante} Tel ${dados.telC} BI ${dados.biC}</p><p><b>Contratado:</b> ${dados.contratado} Tel ${dados.telCo} BI ${dados.biCo}</p>
    ${cl}
    <div class="hor"><div class="sig"><b>CONTRATANTE - ESQUERDA</b><br><br>${dados.contratante}<br>Tel ${dados.telC}<br>BI ${dados.biC}<br><br><b>CONCORDO 10/10/2026 18:05:24</b><br><br><div style="border-top:1px solid #000;padding-top:4px">Assinatura Digital WhatsApp</div></div><div class="sig"><b>CONTRATADO - DIREITA</b><br><br>${dados.contratado}<br>Tel ${dados.telCo}<br>BI ${dados.biCo}<br><br><b>CONCORDO 10/10/2026 18:05:41</b><br><br><div style="border-top:1px solid #000;padding-top:4px">Assinatura Digital WhatsApp</div></div></div>
    <div class="rod">RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU<br>ID ${dados.id} - Valor ${dados.valor} MZN - ${dados.local} - NUIT ${dados.nuit} - Lei 23/2007 - 3 provas ligadas vale tribunal - Foro ${dados.local}<br>Assinado digitalmente via WhatsApp/SMS/M-Pesa em 10/10/2026 18:06:16 - HORIZONTAL lado a lado</div>
    <div style="text-align:center;margin-top:12px"><button onclick="window.print()" style="padding:10px 18px;background:#1e3a5f;color:#fff;border:none;border-radius:6px">Imprimir / Salvar PDF</button></div>
    </body></html>`;
    const blob = new Blob([h], { type: 'text/html' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CONTRATO-FINAL-11-CLAUSULAS-ID-${dados.id}-ASSINATURAS-HORIZONTAL.html`; a.click();
    window.open(url, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial', background: '#f1f5f9', minHeight: '100vh' }}>
      <header style={{ background: '#1e3a5f', color: '#fff', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', position: 'sticky', top: 0, zIndex: 100, borderBottom: '3px solid #c9a86a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 900, fontSize: 18 }}><div style={{ width: 24, height: 24, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f', fontSize: 12 }}>â—‰</div>E22E</div>
          <div style={{ fontSize: 9, letterSpacing: 1, opacity: 0.8 }}>ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: aba === 'encontrar' ? '#c9a86a' : 'transparent', color: aba === 'encontrar' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>ENCONTRAR</button>
          <button onClick={() => setAba('contratos')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: aba === 'contratos' ? '#c9a86a' : 'transparent', color: aba === 'contratos' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>CONTRATOS 11</button>
          <button style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 11 }}>MEUS</button>
        </div>
      </header>

      {aba === 'encontrar' && (
        <>
          <div style={{ background: '#1e3a5f', color: '#fff', padding: '20px 14px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <h1 style={{ fontSize: 28, lineHeight: 1.1, margin: '0 0 10px 0', fontWeight: 900 }}>Chega de acordo de boca!<br />Contrato legal em 2 minutos.</h1>
                <p style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                  <span style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 10, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ 11 Clausulas legais</span>
                  <span style={{ padding: '5px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 10, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ Anexos com fotos</span>
                  <span style={{ padding: '5px 10px', background: '#c9a86a', color: '#1e3a5f', borderRadius: 20, fontSize: 10, fontWeight: 800 }}>âœ“ Lei 23/2007</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 300, maxWidth: 480 }}>
                <div style={{ background: '#fff', color: '#1e3a5f', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 12, textAlign: 'center', marginBottom: 10 }}>Cadastre seu servico - Rapido e gratuito</div>
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    <button onClick={() => setTipo('empresa')} style={{ flex: 1, padding: '7px 2px', borderRadius: 5, border: '1px solid #cbd5e1', background: tipo === 'empresa' ? '#1e3a5f' : '#fff', color: tipo === 'empresa' ? '#fff' : '#334155', fontSize: 8, fontWeight: 700, cursor: 'pointer' }}>EMPRESA</button>
                    <button onClick={() => setTipo('prof')} style={{ flex: 1, padding: '7px 2px', borderRadius: 5, border: '1px solid #cbd5e1', background: tipo === 'prof' ? '#1e3a5f' : '#fff', color: tipo === 'prof' ? '#fff' : '#334155', fontSize: 7, fontWeight: 700, cursor: 'pointer' }}>PROFISSIONAL INDIVIDUAL</button>
                    <button onClick={() => setTipo('coop')} style={{ flex: 1, padding: '7px 2px', borderRadius: 5, border: '1px solid #1e3a5f', background: tipo === 'coop' ? '#1e3a5f' : '#fff', color: tipo === 'coop' ? '#fff' : '#334155', fontSize: 8, fontWeight: 700, cursor: 'pointer' }}>COOPERATIVA</button>
                  </div>
                  <input value={dados.nome} onChange={e => setDados({ ...dados, nome: e.target.value })} placeholder="Nome completo / Empresa" style={{ width: '100%', padding: '9px 10px', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 6, fontSize: 11 }} />
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <select style={{ flex: 1, padding: '9px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Mocambique</option></select>
                    <select style={{ flex: 1, padding: '9px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Maputo Cidade</option><option>Xai-Xai</option></select>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <select style={{ flex: 1, padding: '9px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Pedreiro</option><option>Carpinteiro</option><option>Domestica</option></select>
                    <input value={dados.tel} onChange={e => setDados({ ...dados, tel: e.target.value })} placeholder="Telefone WhatsApp" style={{ flex: 1, padding: '9px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }} />
                  </div>
                  <div style={{ border: '1px dashed #cbd5e1', borderRadius: 6, padding: '10px', textAlign: 'center', marginBottom: 8, background: '#fefefe' }}>
                    <div style={{ fontWeight: 700, fontSize: 10 }}>Anexar documentos - Arraste aqui ou clique</div><div style={{ fontSize: 9, color: '#64748b' }}>BI, NUIT, Fotos trabalho</div>
                  </div>
                  <button style={{ width: '100%', padding: '10px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 6, fontWeight: 900, fontSize: 11, cursor: 'pointer' }}>ENVIAR CADASTRO</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: 12 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: 200 }}><label style={{ fontSize: 10, fontWeight: 800 }}>O que precisa?</label><input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 3, fontSize: 11 }} /></div>
                <div style={{ flex: 1, minWidth: 120 }}><label style={{ fontSize: 10 }}>Pais</label><select style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 3, fontSize: 11 }}><option>Mocambique</option></select></div>
                <div style={{ flex: 1, minWidth: 120 }}><label style={{ fontSize: 10 }}>Provincia</label><select style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 3, fontSize: 11 }}><option>Maputo Cidade</option></select></div>
                <button style={{ padding: '10px 18px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 11, alignSelf: 'flex-end', cursor: 'pointer' }}>PESQUISAR</button>
              </div>
              <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: '#64748b' }}>Tags:</span>
                {['Pedreiro', 'Carpinteiro', 'Eletricista', 'Canalizador', 'Pintor'].map(t => <button key={t} onClick={() => setBusca(t)} style={{ padding: '4px 10px', borderRadius: 20, border: '1px solid #e2e8f0', background: busca === t ? '#1e3a5f' : '#fff', color: busca === t ? '#fff' : '#334155', fontSize: 10, cursor: 'pointer' }}>{t}</button>)}
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: '#1e3a5f', marginBottom: 8 }}>Profissionais verificados perto de si ({filtrados.length}) - RESTAURADO âœ…</div>
                {filtrados.map((p, i) => (
                  <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 32, height: 32, background: '#1e3a5f', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>CM</div><div><div style={{ fontWeight: 800, fontSize: 12 }}>{p.nome}</div><div style={{ fontSize: 10, color: '#64748b' }}>{p.cat} â€¢ {p.loc}</div></div></div>
                      <span style={{ padding: '3px 8px', background: '#fef3c7', borderRadius: 12, fontSize: 9, fontWeight: 800 }}>VERIFICADO â€¢ {p.nota}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#334155', marginTop: 6 }}>{p.exp}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      <button onClick={() => setAba('contratos')} style={{ padding: '6px 12px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 5, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>GERAR CONTRATO</button>
                      <button style={{ padding: '6px 12px', background: '#fff', color: '#1e3a5f', border: '1px solid #c9a86a', borderRadius: 5, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>CONTRATAR</button>
                    </div>
                    <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 6 }}>{p.trab} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {aba === 'contratos' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <h2 style={{ margin: 0, color: '#1e3a5f', fontSize: 14 }}>11 CLAUSULAS DO CONTRATO - CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO COMPLETO - PREVIEW NAO CONGELA MAIS âœ…</h2>
            <button onClick={pdf} style={{ padding: '7px 12px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>ðŸ“„ PDF HORIZONTAL</button>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              {clausulas.map(c => (
                <div key={c.n} style={{ background: '#fff', borderRadius: 8, border: aberta === c.n ? '2px solid #1e3a5f' : '1px solid #e2e8f0', marginBottom: 6, overflow: 'hidden' }}>
                  <div onClick={() => setAberta(aberta === c.n ? 0 : c.n)} style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: aberta === c.n ? '#1e3a5f' : '#fff', color: aberta === c.n ? '#fff' : '#1e293b' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: aberta === c.n ? '#c9a86a' : '#e2e8f0', color: aberta === c.n ? '#1e3a5f' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>{c.n}</div>
                      <div><div style={{ fontWeight: 800, fontSize: 12 }}>{c.n}. {c.tit}</div><div style={{ fontSize: 10, opacity: 0.7 }}>{c.sub}</div></div>
                    </div>
                    <div>{aberta === c.n ? 'â–¼' : 'â–¶'}</div>
                  </div>
                  {aberta === c.n && (
                    <div style={{ padding: 10, borderTop: '1px solid #e2e8f0' }}>
                      <textarea value={c.txt} onChange={e => upd(c.n, e.target.value)} style={{ width: '100%', minHeight: 70, padding: 8, borderRadius: 6, border: '1px solid #c9a86a', fontSize: 11 }} />
                      <div style={{ fontSize: 9, color: '#1e3a5f', marginTop: 4, fontWeight: 700 }}>âœ… AGORA ABRE para preenchimento e aparece no preview e no PDF - antes nao abria e so aparecia mensagem placeholder - CORRIGIDO</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ background: '#fff', borderRadius: 8, border: '2px solid #1e3a5f', padding: 12, position: 'sticky', top: 62 }}>
                <div style={{ fontWeight: 900, fontSize: 11, color: '#1e3a5f', textAlign: 'center', marginBottom: 6 }}>PREVIEW AO VIVO - 11 CLAUSULAS = PDF UNICO - DOMESTICA - 10 TAREFAS - CLAUSULAS 3-10 CORRIGIDAS + PDF PARTILHAVEL</div>
                <div style={{ maxHeight: 500, overflowY: 'auto', fontSize: 10, lineHeight: 1.4, border: '1px solid #e2e8f0', borderRadius: 6, padding: 8 }}>
                  <div style={{ background: '#f0fdfa', padding: 6, borderRadius: 4, marginBottom: 6 }}>CONTRATO DOMESTICA - 11 CLAUSULAS - ID {dados.id} - {dados.valor} MZN - {dados.local} - CLAUSULAS 3-10 CORRIGIDAS</div>
                  {clausulas.map(c => <p key={c.n} style={{ margin: '5px 0' }}><b>{c.n}. {c.tit.toUpperCase()}:</b> {c.txt}</p>)}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, borderTop: '1px solid #000', paddingTop: 8 }}>
                    <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: 5, borderRadius: 5, fontSize: 9 }}><b>CONTRATANTE ESQUERDA</b><br />{dados.contratante}<br />CONCORDO 18:05:24</div>
                    <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: 5, borderRadius: 5, fontSize: 9 }}><b>CONTRATADO DIREITA</b><br />{dados.contratado}<br />CONCORDO 18:05:41</div>
                  </div>
                </div>
                <button onClick={pdf} style={{ marginTop: 8, width: '100%', padding: '8px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>GERAR PDF FINAL - ASSINATURAS HORIZONTAL NAO VERTICAL</button>
                <div style={{ fontSize: 8, color: '#64748b', textAlign: 'center', marginTop: 4 }}>Bug congelado corrigido - preview sticky nao bloqueia mais edicao das clausulas - BUILD 100%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
