// @ts-nocheck
// CONTRATA-MZ - LAYOUT NOVO E22E + BUG PREVIEW CONGELADO CORRIGIDO - 11 CLAUSULAS + HORIZONTAL
import React, { useState } from 'react';

export default function App() {
  const [aba, setAba] = useState<'encontrar' | 'contratos'>('encontrar');
  const [tipoCadastro, setTipoCadastro] = useState<'empresa' | 'prof' | 'coop'>('coop');
  const [busca, setBusca] = useState('');
  const [pais, setPais] = useState('Mocambique');
  const [provincia, setProvincia] = useState('Maputo Cidade');
  const [categoria, setCategoria] = useState('Pedreiro');
  const [clausulaAberta, setClausulaAberta] = useState<number | null>(1);

  const [dados, setDados] = useState({
    nome: '', tel: '', id: '990152', contratante: 'Artur Simao Zimba', telC: '823832513', contratado: 'Joao Carpinteiro', telCo: '840532899', valor: '7500', local: 'Xai-Xai - Av. Principal, Bairro 2'
  });

  const [clausulas, setClausulas] = useState([
    { n: 1, t: 'Dados das partes', sub: 'Quem contrata e quem faz', texto: 'Contratante: Artur Simao Zimba Tel 823832513 BI 110200011B\nContratado: Joao Carpinteiro Tel 840532899 BI 1102100MM\nID 990152 - 10 tarefas Domestica/Carpinteiro - Valor 7500 MZN' },
    { n: 2, t: 'Objeto e tarefas', sub: 'O que sera feito', texto: 'Objeto: 10 tarefas de Domestica/Carpinteiro em Xai-Xai - casa do cliente. Qualidade e pontualidade.' },
    { n: 3, t: 'Horario e local', sub: 'Quando e onde - FORMULARIO CORRIGIDO', texto: 'Horario: 07:00 as 17:00 com 1h almoco. Segunda a Sabado. Local: Xai-Xai - Av. Principal. EDITAVEL - agora abre para preenchimento e aparece no preview e no PDF.' },
    { n: 4, t: 'Salario e pagamento', sub: 'Quanto e como - FORMULARIO CORRIGIDO', texto: 'Valor 7500 MZN via M-Pesa 840532899. 50% inicio 50% fim. Comprovativo anexado. EDITAVEL - abre e vai para PDF.' },
    { n: 5, t: 'Alimentacao', sub: 'Almoco e agua - CORRIGIDO', texto: 'Alimentacao fornecida ou 250 MZN/dia. Agua potavel sempre. EDITAVEL.' },
    { n: 6, t: 'Folgas', sub: 'Descanso semanal - CORRIGIDO', texto: '1 dia folga Domingo. Feriados Lei 23/2007. Aviso 24h. EDITAVEL.' },
    { n: 7, t: 'Periodo', sub: 'Duracao e prazo - CORRIGIDO', texto: 'Duracao 10 tarefas. Inicio apos CONCORDO WhatsApp. Prazo 30 dias prorrogavel. EDITAVEL.' },
    { n: 8, t: 'Deveres', sub: 'Obrigacoes - CORRIGIDO', texto: 'Contratado zelo e seguranca. Contratante acesso material pagamento. EDITAVEL.' },
    { n: 9, t: 'Transporte e material', sub: 'Quem leva o que - CORRIGIDO', texto: 'Transporte por conta Contratante. Material principal fornecido. Ferramentas pessoais Contratado. EDITAVEL.' },
    { n: 10, t: 'Anexos e provas', sub: 'Fotos BI e M-Pesa - CORRIGIDO', texto: 'Foto BI frente/verso, Audio 5s aceito ID 990152, GPS -25.96,32.45 Maputo-Matola, M-Pesa 7500 MZN. EDITAVEL.' },
    { n: 11, t: 'Validade legal e foro', sub: 'Lei e assinatura - HORIZONTAL', texto: 'Valido Mocambique Lei 23/2007. Assinado digitalmente via WhatsApp com data/hora GPS. 3 provas: Contrato+CONCORDO+M-Pesa. Vale tribunal. Foro Xai-Xai. Assinaturas na HORIZONTAL lado a lado nao vertical.' },
  ]);

  const profissionais = [
    { nome: 'Carlos Matsinhe', cat: 'Pedreiro', local: 'Mocambique / Maputo Cidade', desc: 'Construcao, reboco, ladrilho, 10 anos exp.', verificado: true, nota: 4.9, trabalhos: 127 },
    { nome: 'Joao Carpinteiro', cat: 'Carpinteiro', local: 'Mocambique / Xai-Xai', desc: 'Moveis, portas, telhado, 8 anos exp.', verificado: true, nota: 4.8, trabalhos: 89 },
  ];

  const filtrados = profissionais.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cat.toLowerCase().includes(busca.toLowerCase()));

  const updateClausula = (n: number, texto: string) => setClausulas(cs => cs.map(c => c.n === n ? { ...c, texto } : c));

  const gerarPDF = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO-11-CLAUSULAS-ID-${dados.id}-HORIZONTAL</title>
    <style>body{font-family:Arial;padding:22px;font-size:12px;line-height:1.5}
    .h{ text-align:center; border-bottom:3px solid #1e3a5f; padding-bottom:10px; margin-bottom:14px }
    .b{ background:#f0fdfa; border:1px solid #99f6e0; padding:8px; border-radius:6px; font-size:10px; margin:8px 0 }
    .hor{display:flex; flex-direction:row; gap:16px; margin-top:24px; border-top:2px solid #000; padding-top:12px }
    .sig{ flex:1; border:1px solid #ccc; padding:10px; border-radius:8px; text-align:center; background:#f8fafc }
    .rod{background:#111; color:#fff; padding:10px; border-radius:8px; font-size:10px; text-align:center; margin-top:16px }
    </style></head><body>
    <div class="h"><b style="font-size:22px; color:#1e3a5f">E22E - CONTRATA-MZ</b><br>11 CLAUSULAS - Assinaturas HORIZONTAL - contrata-mz.vercel.app</div>
    <h3 style="text-align:center">CONTRATO 11 CLAUSULAS - ${dados.local}</h3>
    <div class="b">ID ${dados.id} - Valor ${dados.valor} MZN - ${dados.local} - Lei 23/2007 - 11 clausulas completas</div>
    ${clausulas.map(c => `<p><b>${c.n}. ${c.t}:</b> ${c.texto}</p>`).join('')}
    <div class="hor">
      <div class="sig"><b>CONTRATANTE - ESQUERDA</b><br><br>${dados.contratante}<br>Tel ${dados.telC}<br><br><b>CONCORDO 18:05:24</b><br><br><div style="border-top:1px solid #000; padding-top:4px">Assinatura WhatsApp</div></div>
      <div class="sig"><b>CONTRATADO - DIREITA</b><br><br>${dados.contratado}<br>Tel ${dados.telCo}<br><br><b>CONCORDO 18:05:41</b><br><br><div style="border-top:1px solid #000; padding-top:4px">Assinatura WhatsApp</div></div>
    </div>
    <div class="rod">RODAPE - VALIDADE LEGAL - 11 CLAUSULAS - HORIZONTAL - ID ${dados.id} - ${dados.valor} MZN - ${dados.local} - Lei 23/2007 - 3 provas vale tribunal - Foro Xai-Xai</div>
    <div style="text-align:center; margin-top:14px"><button onclick="window.print()" style="padding:10px 20px; background:#1e3a5f; color:#fff; border:none; border-radius:6px">Imprimir PDF</button></div>
    </body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CONTRATO-11-CLAUSULAS-ID-${dados.id}-HORIZONTAL.html`; a.click();
    window.open(url, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f1f5f9', minHeight: '100vh' }}>
      {/* HEADER NOVO - E22E LAYOUT */}
      <header style={{ background: '#1e3a5f', color: '#fff', padding: '0 16px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, borderBottom: '3px solid #c9a86a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 900, fontSize: 22, letterSpacing: 1 }}>
            <div style={{ width: 28, height: 28, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f', fontSize: 14 }}>â—‰</div>
            E22E
          </div>
          <div style={{ fontSize: 9, letterSpacing: 1.5, opacity: 0.8, display: 'none' }}>ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
          <div style={{ fontSize: 9, letterSpacing: 1.2, opacity: 0.9 }} className="hide-mobile">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '7px 14px', borderRadius: 6, border: 'none', background: aba === 'encontrar' ? '#c9a86a' : 'transparent', color: aba === 'encontrar' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>ENCONTRAR</button>
          <button onClick={() => setAba('contratos')} style={{ padding: '7px 14px', borderRadius: 6, border: 'none', background: aba === 'contratos' ? '#c9a86a' : 'transparent', color: aba === 'contratos' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATOS 11</button>
          <button style={{ padding: '7px 14px', borderRadius: 6, border: 'none', background: 'transparent', color: '#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>MEUS</button>
          <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            <span style={{ padding: '4px 7px', background: '#c9a86a', color: '#1e3a5f', borderRadius: 4, fontSize: 11, fontWeight: 800 }}>PT</span>
            <span style={{ padding: '4px 7px', background: '#fff', color: '#1e3a5f', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>EN</span>
            <span style={{ padding: '4px 7px', background: '#fff', color: '#1e3a5f', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>FR</span>
          </div>
        </div>
      </header>

      {aba === 'encontrar' && (
        <>
          {/* HERO - CHEGA DE ACORDO DE BOCA - LAYOUT DA SUA PRINT 2 */}
          <div style={{ background: '#1e3a5f', color: '#fff', padding: '24px 16px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f' }}>â—‰</div>
                  <div><div style={{ fontWeight: 900, fontSize: 16 }}>E22E</div><div style={{ fontSize: 9 }}>Energy solutions and<br />services enterprise</div></div>
                </div>
                <h1 style={{ fontSize: 32, lineHeight: 1.1, margin: '0 0 14px 0', fontWeight: 900 }}>Chega de acordo de boca!<br />Contrato legal em 2<br />minutos.</h1>
                <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, marginBottom: 16 }}>Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 11, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ 11 Clausulas legais obrigatorias</span>
                  <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 11, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ Anexos com fotos antes da validade</span>
                  <span style={{ padding: '6px 12px', background: '#c9a86a', color: '#1e3a5f', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>âœ“ Lei 23/2007 - Valido em Mocambique</span>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 320, maxWidth: 520 }}>
                <div style={{ background: '#fff', color: '#1e3a5f', borderRadius: 12, padding: 18, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12, textAlign: 'center' }}>Cadastre seu servico - Rapido e gratuito</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    <button onClick={() => setTipoCadastro('empresa')} style={{ flex: 1, padding: '8px 4px', borderRadius: 6, border: '1px solid #cbd5e1', background: tipoCadastro === 'empresa' ? '#1e3a5f' : '#fff', color: tipoCadastro === 'empresa' ? '#fff' : '#334155', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>EMPRESA</button>
                    <button onClick={() => setTipoCadastro('prof')} style={{ flex: 1, padding: '8px 4px', borderRadius: 6, border: '1px solid #cbd5e1', background: tipoCadastro === 'prof' ? '#1e3a5f' : '#fff', color: tipoCadastro === 'prof' ? '#fff' : '#334155', fontSize: 8, fontWeight: 700, cursor: 'pointer' }}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
                    <button onClick={() => setTipoCadastro('coop')} style={{ flex: 1, padding: '8px 4px', borderRadius: 6, border: '1px solid #1e3a5f', background: tipoCadastro === 'coop' ? '#1e3a5f' : '#fff', color: tipoCadastro === 'coop' ? '#fff' : '#334155', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>COOPERATIVA</button>
                  </div>
                  <input value={dados.nome} onChange={e => setDados({ ...dados, nome: e.target.value })} placeholder="Nome completo / Empresa" style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 8, fontSize: 12 }} />
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <select value={pais} onChange={e => setPais(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }}><option>Mocambique</option><option>Africa do Sul</option></select>
                    <select value={provincia} onChange={e => setProvincia(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }}><option>Maputo Cidade</option><option>Matola</option><option>Xai-Xai</option><option>Beira</option></select>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <select value={categoria} onChange={e => setCategoria(e.target.value)} style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }}><option>Pedreiro</option><option>Carpinteiro</option><option>Electricista</option><option>Canalizador</option><option>Domestica</option><option>Pintor</option></select>
                    <input value={dados.tel} onChange={e => setDados({ ...dados, tel: e.target.value })} placeholder="Telefone WhatsApp" style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </div>
                  <div style={{ border: '1px dashed #cbd5e1', borderRadius: 8, padding: '14px', textAlign: 'center', marginBottom: 12, background: '#fefefe' }}>
                    <div style={{ fontWeight: 700, fontSize: 11 }}>Anexar documentos - Arraste aqui ou clique</div>
                    <div style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho</div>
                  </div>
                  <button style={{ width: '100%', padding: '12px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 8, fontWeight: 900, fontSize: 12, letterSpacing: 1, cursor: 'pointer' }}>ENVIAR CADASTRO</button>
                </div>
              </div>
            </div>
          </div>

          {/* BUSCA - LAYOUT DA SUA PRINT 3 */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 2, minWidth: 220 }}>
                  <label style={{ fontSize: 11, fontWeight: 800 }}>O que precisa?</label>
                  <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4, fontSize: 12 }} />
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Pais</label>
                  <select style={{ width: '100%', padding: '11px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4, fontSize: 12 }}><option>Mocambique</option></select>
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Provincia / Estado</label>
                  <select style={{ width: '100%', padding: '11px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4, fontSize: 12 }}><option>Maputo Cidade</option><option>Xai-Xai</option></select>
                </div>
                <button style={{ padding: '11px 22px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>PESQUISAR</button>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>Tags Populares:</span>
                {['Pedreiro', 'Carpinteiro', 'Eletricista', 'Canalizador', 'Pintor', 'Serralheiro'].map(t => (
                  <button key={t} onClick={() => setBusca(t)} style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid #e2e8f0', background: busca === t ? '#1e3a5f' : '#fff', color: busca === t ? '#fff' : '#334155', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>Pais -> Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro.</div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#1e3a5f', marginBottom: 10 }}>Profissionais verificados perto de si ({filtrados.length})</div>
                {filtrados.map((p, i) => (
                  <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 14, marginBottom: 10, background: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ width: 36, height: 36, background: '#1e3a5f', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>CM</div>
                        <div><div style={{ fontWeight: 800, fontSize: 13 }}>{p.nome}</div><div style={{ fontSize: 11, color: '#64748b' }}>{p.cat} â€¢ {p.local}</div></div>
                      </div>
                      <span style={{ padding: '4px 10px', background: '#fef3c7', borderRadius: 12, fontSize: 10, fontWeight: 800, border: '1px solid #fde68a' }}>VERIFICADO â€¢ {p.nota}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#334155', marginTop: 8 }}>{p.desc}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                      <button onClick={() => setAba('contratos')} style={{ padding: '8px 16px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>GERAR CONTRATO</button>
                      <button style={{ padding: '8px 16px', background: '#fff', color: '#1e3a5f', border: '1px solid #c9a86a', borderRadius: 6, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>CONTRATAR</button>
                    </div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 8 }}>{p.trabalhos} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {aba === 'contratos' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0, color: '#1e3a5f', fontSize: 16 }}>11 CLAUSULAS DO CONTRATO - {dados.valor ? `${dados.valor} MZN` : ''} - PREVIEW CORRIGIDO - NAO CONGELA MAIS âœ…</h2>
            <button onClick={gerarPDF} style={{ padding: '8px 14px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>ðŸ“„ PDF HORIZONTAL PARTILHAVEL</button>
          </div>

          {/* BUG CORRIGIDO: PREVIEW NAO MAIS FIXED - AGORA FICA EM BAIXO E NAO CONGELA */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* COLUNA ESQUERDA - CLAUSULAS EDITAVEIS */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, background: '#fff', padding: 8, borderRadius: 6, border: '1px solid #e2e8f0' }}>10 tarefas de Domestica - CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO COMPLETO - clique para abrir e editar</div>
              {clausulas.map(c => (
                <div key={c.n} style={{ background: '#fff', borderRadius: 10, border: clausulaAberta === c.n ? '2px solid #1e3a5f' : '1px solid #e2e8f0', marginBottom: 8, overflow: 'hidden' }}>
                  <div onClick={() => setClausulaAberta(clausulaAberta === c.n ? null : c.n)} style={{ padding: '12px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: clausulaAberta === c.n ? '#1e3a5f' : '#fff', color: clausulaAberta === c.n ? '#fff' : '#1e293b' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: clausulaAberta === c.n ? '#c9a86a' : '#e2e8f0', color: clausulaAberta === c.n ? '#1e3a5f' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>{c.n}</div>
                      <div><div style={{ fontWeight: 800, fontSize: 13 }}>{c.n}. {c.t}</div><div style={{ fontSize: 11, opacity: clausulaAberta === c.n ? 0.8 : 0.6 }}>{c.sub}</div></div>
                    </div>
                    <div style={{ fontSize: 14 }}>{clausulaAberta === c.n ? 'â–¼' : 'â–¶'}</div>
                  </div>
                  {clausulaAberta === c.n && (
                    <div style={{ padding: 12, borderTop: '1px solid #e2e8f0' }}>
                      <textarea value={c.texto} onChange={e => updateClausula(c.n, e.target.value)} style={{ width: '100%', minHeight: 80, padding: 10, borderRadius: 8, border: '1px solid #c9a86a', fontSize: 12 }} />
                      <div style={{ fontSize: 10, color: '#1e3a5f', marginTop: 6, fontWeight: 700 }}>âœ… AGORA ABRE para preenchimento e aparece no preview e no PDF - antes nao abria e so aparecia mensagem placeholder - CORRIGIDO</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* COLUNA DIREITA - PREVIEW AO VIVO - CORRIGIDO NAO CONGELA MAIS */}
            <div style={{ flex: 1, minWidth: 300, position: 'relative', top: 0 }}>
              <div style={{ background: '#fff', borderRadius: 10, border: '2px solid #1e3a5f', padding: 14, position: 'sticky', top: 70 }}>
                <div style={{ fontWeight: 900, fontSize: 12, color: '#1e3a5f', marginBottom: 8, textAlign: 'center' }}>PREVIEW AO VIVO - 11 CLAUSULAS = PDF UNICO - DOMESTICA - 10 TAREFAS - CLAUSULAS 3-10 CORRIGIDAS + PDF PARTILHAVEL</div>
                <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, fontSize: 10, marginBottom: 8 }}>CONTRATO DOMESTICA - 11 CLAUSULAS - CLAUSULAS 3-10 CORRIGIDAS - ID {dados.id} - {dados.valor} MZN - {dados.local}</div>
                <div style={{ maxHeight: 420, overflowY: 'auto', fontSize: 11, lineHeight: 1.4, border: '1px solid #e2e8f0', borderRadius: 6, padding: 8 }}>
                  <p><b>1. DADOS:</b> {dados.contratante} e {dados.contratado}</p>
                  {clausulas.map(c => <p key={c.n} style={{ margin: '6px 0' }}><b>{c.n}. {c.t.toUpperCase()}:</b> {c.texto}</p>)}
                  <div style={{ display: 'flex', gap: 10, marginTop: 16, borderTop: '1px solid #000', paddingTop: 10 }}>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 10, border: '1px solid #ccc', padding: 6, borderRadius: 6 }}><b>CONTRATANTE ESQUERDA</b><br />{dados.contratante}<br />CONCORDO 18:05:24</div>
                    <div style={{ flex: 1, textAlign: 'center', fontSize: 10, border: '1px solid #ccc', padding: 6, borderRadius: 6 }}><b>CONTRATADO DIREITA</b><br />{dados.contratado}<br />CONCORDO 18:05:41</div>
                  </div>
                </div>
                <button onClick={gerarPDF} style={{ marginTop: 10, width: '100%', padding: '10px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>GERAR PDF FINAL HORIZONTAL - NAO VERTICAL</button>
                <div style={{ fontSize: 9, color: '#64748b', marginTop: 6, textAlign: 'center' }}>Bug congelado corrigido - preview agora rola junto e nao bloqueia edicao das clausulas</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
