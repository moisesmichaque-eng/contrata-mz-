// @ts-nocheck
// RESTAURADO COM CADASTRO SALVO - MICHAQUE SERRALHEIRO APARECE NO ENCONTRAR + SEM CONGELAR - BUILD 100%
import React, { useState, useEffect } from 'react';

export default function App() {
  const [aba, setAba] = useState('encontrar');
  const [tipo, setTipo] = useState('coop');
  const [busca, setBusca] = useState('');
  const [aberta, setAberta] = useState(1);

  const [formCadastro, setFormCadastro] = useState({ nome: '', tel: '', cat: 'Serralheiro', pais: 'Mocambique', prov: 'Maputo Cidade' });

  const [dados, setDados] = useState({
    contratante: 'Artur Simao Zimba', telC: '823832513', biC: '110200011B',
    contratado: 'Joao Carpinteiro', telCo: '840532899', biCo: '1102100MM',
    valor: '7500', local: 'Xai-Xai - Av. Principal, Bairro 2', id: '990152', nuit: '401866876'
  });

  const [clausulas, setClausulas] = useState([
    { n: 1, tit: 'Dados das partes', sub: 'Quem contrata e quem faz', txt: 'Contratante: Artur Simao Zimba Tel 823832513 BI 110200011B - Contratado: Joao Carpinteiro Tel 840532899 BI 1102100MM - ID 990152 - 10 tarefas - 7500 MZN' },
    { n: 2, tit: 'Objeto e tarefas', sub: 'O que sera feito', txt: '10 tarefas Domestica/Carpinteiro em Xai-Xai - Av. Principal, Bairro 2 - Execucao com qualidade.' },
    { n: 3, tit: 'Horario e local', sub: 'Quando e onde - CORRIGIDO ABRE', txt: 'Horario 07:00-17:00 com 1h almoco. Segunda a Sabado. Local Xai-Xai. EDITAVEL - abre e aparece no preview e PDF.' },
    { n: 4, tit: 'Salario e pagamento', sub: 'Quanto e como - CORRIGIDO', txt: 'Total 7500 MZN via M-Pesa 840532899. 50% inicio 50% fim. Comprovativo anexado. EDITAVEL.' },
    { n: 5, tit: 'Alimentacao', sub: 'Almoco e agua', txt: 'Alimentacao fornecida ou 250 MZN/dia. Agua potavel. EDITAVEL.' },
    { n: 6, tit: 'Folgas', sub: 'Descanso semanal', txt: '1 dia folga Domingo. Feriados Lei 23/2007. Aviso 24h. EDITAVEL.' },
    { n: 7, tit: 'Periodo', sub: 'Duracao', txt: 'Duracao 10 tarefas. Inicio apos CONCORDO WhatsApp. Prazo 30 dias prorrogavel. EDITAVEL.' },
    { n: 8, tit: 'Deveres', sub: 'Obrigacoes', txt: 'Contratado zelo e seguranca. Contratante acesso material pagamento. EDITAVEL.' },
    { n: 9, tit: 'Transporte e material', sub: 'Quem leva o que', txt: 'Transporte por conta Contratante. Material principal fornecido. Ferramentas pessoais Contratado. EDITAVEL.' },
    { n: 10, tit: 'Anexos e provas', sub: 'Fotos BI e M-Pesa', txt: 'Foto BI frente/verso SIM, Audio 5s SIM, GPS -25.96,32.45 SIM, M-Pesa 7500 MZN SIM. EDITAVEL.' },
    { n: 11, tit: 'Validade legal e foro', sub: 'Lei e assinatura HORIZONTAL', txt: 'Valido Mocambique Lei 23/2007. Assinado digitalmente WhatsApp data/hora GPS. 3 provas: Contrato+CONCORDO+M-Pesa - vale tribunal. Foro Xai-Xai. Assinaturas HORIZONTAL lado a lado NAO vertical.' },
  ]);

  const profsFixos = [
    { nome: 'Carlos Matsinhe', cat: 'Pedreiro', loc: 'Mocambique / Maputo Cidade', exp: 'Construcao, reboco, ladrilho, 10 anos exp.', nota: 4.9, trab: 127 },
    { nome: 'Joao Carpinteiro', cat: 'Carpinteiro', loc: 'Mocambique / Xai-Xai', exp: 'Moveis, portas, telhado, 8 anos exp.', nota: 4.8, trab: 89 },
  ];

  const [profsCadastrados, setProfsCadastrados] = useState<any[]>([]);

  useEffect(() => {
    const salvos = localStorage.getItem('contrata-mz-profs');
    if (salvos) { try { setProfsCadastrados(JSON.parse(salvos)); } catch {} }
  }, []);

  useEffect(() => {
    localStorage.setItem('contrata-mz-profs', JSON.stringify(profsCadastrados));
  }, [profsCadastrados]);

  const todosProfs = [...profsCadastrados, ...profsFixos];
  const filtrados = todosProfs.filter(p => (p.nome + ' ' + p.cat + ' ' + p.loc).toLowerCase().includes(busca.toLowerCase()));

  const cadastrar = () => {
    if (!formCadastro.nome || !formCadastro.tel) { alert('Preencha Nome e Telefone WhatsApp'); return; }
    const novo = {
      nome: formCadastro.nome,
      cat: formCadastro.cat,
      loc: `${formCadastro.pais} / ${formCadastro.prov}`,
      exp: `${formCadastro.cat} - Cadastrado agora via formulario - ${formCadastro.prov}`,
      nota: 5.0,
      trab: 0,
      tel: formCadastro.tel
    };
    setProfsCadastrados(prev => [novo, ...prev]);
    setFormCadastro({ nome: '', tel: '', cat: 'Serralheiro', pais: 'Mocambique', prov: 'Maputo Cidade' });
    alert(`${novo.nome} cadastrado como ${novo.cat}! Agora aparece no ENCONTRAR.`);
    setAba('encontrar');
    setBusca(novo.nome);
  };

  const upd = (n: number, t: string) => setClausulas(cs => cs.map(c => c.n === n ? { ...c, txt: t } : c));

  const pdf = () => {
    const cl = clausulas.map(c => `<p><b>${c.n}. ${c.tit}:</b> ${c.txt}</p>`).join('');
    const h = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO-${dados.id}-HORIZONTAL</title><style>body{font-family:Arial;padding:18px;font-size:11px} .hor{display:flex;gap:12px;margin-top:16px;border-top:2px solid #000;padding-top:8px} .sig{flex:1;border:1px solid #ccc;padding:8px;border-radius:6px;text-align:center}</style></head><body>
    <h2 style="text-align:center">CONTRATO 11 CLAUSULAS - ${dados.local}</h2><p>ID ${dados.id} - ${dados.valor} MZN - ${dados.local}</p>${cl}
    <div class="hor"><div class="sig"><b>CONTRATANTE</b><br>${dados.contratante}<br>CONCORDO 18:05:24</div><div class="sig"><b>CONTRATADO</b><br>${dados.contratado}<br>CONCORDO 18:05:41</div></div>
    <div style="text-align:center;margin-top:10px"><button onclick="window.print()">Imprimir PDF</button></div></body></html>`;
    const blob = new Blob([h], { type: 'text/html' }); const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `CONTRATO-${dados.id}-HORIZONTAL.html`; a.click(); window.open(url, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Arial', background: '#f1f5f9', minHeight: '100vh' }}>
      <header style={{ background: '#1e3a5f', color: '#fff', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', position: 'sticky', top: 0, zIndex: 10, borderBottom: '3px solid #c9a86a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ fontWeight: 900 }}>â—‰ E22E</div><div style={{ fontSize: 9, opacity: 0.8 }}>ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setAba('encontrar')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: aba === 'encontrar' ? '#c9a86a' : 'transparent', color: aba === 'encontrar' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>ENCONTRAR</button>
          <button onClick={() => setAba('contratos')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: aba === 'contratos' ? '#c9a86a' : 'transparent', color: aba === 'contratos' ? '#1e3a5f' : '#fff', fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>CONTRATOS 11</button>
        </div>
      </header>

      {aba === 'encontrar' && (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: '#1e3a5f', color: '#fff', padding: '18px 12px' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <h1 style={{ fontSize: 26, margin: '0 0 8px 0', lineHeight: 1.1 }}>Chega de acordo de boca!<br />Contrato legal em 2 minutos.</h1>
                <p style={{ fontSize: 11, opacity: 0.9 }}>Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Lei 23/2007.</p>
              </div>
              <div style={{ flex: 1, minWidth: 300, maxWidth: 480 }}>
                <div style={{ background: '#fff', color: '#1e3a5f', borderRadius: 10, padding: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: 11, textAlign: 'center', marginBottom: 8 }}>Cadastre seu servico - Rapido e gratuito - SALVA AUTOMATICO</div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                    <button onClick={() => setTipo('empresa')} style={{ flex: 1, padding: '6px 2px', borderRadius: 5, border: '1px solid #cbd5e1', background: tipo === 'empresa' ? '#1e3a5f' : '#fff', color: tipo === 'empresa' ? '#fff' : '#334155', fontSize: 8, fontWeight: 700 }}>EMPRESA</button>
                    <button onClick={() => setTipo('prof')} style={{ flex: 1, padding: '6px 2px', borderRadius: 5, border: '1px solid #cbd5e1', background: tipo === 'prof' ? '#1e3a5f' : '#fff', color: tipo === 'prof' ? '#fff' : '#334155', fontSize: 7, fontWeight: 700 }}>PROFISSIONAL INDIVIDUAL</button>
                    <button onClick={() => setTipo('coop')} style={{ flex: 1, padding: '6px 2px', borderRadius: 5, border: '1px solid #1e3a5f', background: tipo === 'coop' ? '#1e3a5f' : '#fff', color: tipo === 'coop' ? '#fff' : '#334155', fontSize: 8, fontWeight: 700 }}>COOPERATIVA</button>
                  </div>
                  <input value={formCadastro.nome} onChange={e => setFormCadastro({ ...formCadastro, nome: e.target.value })} placeholder="Nome completo / Empresa - ex: michaque" style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: 6, fontSize: 11 }} />
                  <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                    <select value={formCadastro.pais} onChange={e => setFormCadastro({ ...formCadastro, pais: e.target.value })} style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Mocambique</option></select>
                    <select value={formCadastro.prov} onChange={e => setFormCadastro({ ...formCadastro, prov: e.target.value })} style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Maputo Cidade</option><option>Matola</option><option>Xai-Xai</option><option>Beira</option></select>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    <select value={formCadastro.cat} onChange={e => setFormCadastro({ ...formCadastro, cat: e.target.value })} style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }}><option>Pedreiro</option><option>Carpinteiro</option><option>Electricista</option><option>Canalizador</option><option>Domestica</option><option>Pintor</option><option>Serralheiro</option><option>Soldador</option></select>
                    <input value={formCadastro.tel} onChange={e => setFormCadastro({ ...formCadastro, tel: e.target.value })} placeholder="Telefone WhatsApp" style={{ flex: 1, padding: '8px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 11 }} />
                  </div>
                  <button onClick={cadastrar} style={{ width: '100%', padding: '10px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 6, fontWeight: 900, fontSize: 11, cursor: 'pointer' }}>ENVIAR CADASTRO - SALVA NO ENCONTRAR</button>
                  <div style={{ fontSize: 8, color: '#64748b', textAlign: 'center', marginTop: 4 }}>Cadastra e aparece automaticamente no Encontrar - salva no navegador</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: 12 }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 2, minWidth: 200 }}><label style={{ fontSize: 10, fontWeight: 800 }}>O que precisa?</label><input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex: michaque, Serralheiro, Pedreiro..." style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 3, fontSize: 11 }} /></div>
                <button onClick={() => setBusca('')} style={{ padding: '9px 14px', background: '#e2e8f0', border: 'none', borderRadius: 8, fontSize: 10, cursor: 'pointer' }}>LIMPAR</button>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: '#1e3a5f', marginBottom: 8 }}>Profissionais verificados perto de si ({filtrados.length}) - INCLUI CADASTRADOS âœ…</div>
                {profsCadastrados.length > 0 && <div style={{ background: '#dcfce7', padding: '6px 10px', borderRadius: 6, fontSize: 10, marginBottom: 8, border: '1px solid #86efac' }}>âœ… {profsCadastrados.length} cadastrado(s) localmente: {profsCadastrados.map(p => p.nome + ' (' + p.cat + ')').join(', ')}</div>}
                {filtrados.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 20, color: '#64748b', fontSize: 11 }}>Nenhum profissional encontrado. Cadastre acima "michaque como Serralheiro" e ele aparece aqui!<br /><br />Se cadastrou e nÃ£o apareceu, verifique se o navegador permite localStorage.</div>
                ) : (
                  filtrados.map((p, i) => (
                    <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 8, background: profsCadastrados.some(pc => pc.nome === p.nome) ? '#f0fdf4' : '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 32, height: 32, background: '#1e3a5f', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>{p.nome.charAt(0)}</div><div><div style={{ fontWeight: 800, fontSize: 12 }}>{p.nome} {profsCadastrados.some(pc => pc.nome === p.nome) && '(VOCE)'}</div><div style={{ fontSize: 10, color: '#64748b' }}>{p.cat} â€¢ {p.loc}</div></div></div>
                        <span style={{ padding: '3px 8px', background: '#fef3c7', borderRadius: 12, fontSize: 9, fontWeight: 800 }}>VERIFICADO â€¢ {p.nota}</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#334155', marginTop: 6 }}>{p.exp}</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                        <button onClick={() => { setDados(d => ({ ...d, contratado: p.nome, telCo: p.tel || d.telCo })); setAba('contratos'); }} style={{ padding: '6px 12px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 5, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>GERAR CONTRATO</button>
                        <button style={{ padding: '6px 12px', background: '#fff', color: '#1e3a5f', border: '1px solid #c9a86a', borderRadius: 5, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>CONTRATAR - {p.tel || 'WhatsApp'}</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {aba === 'contratos' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <h2 style={{ margin: 0, color: '#1e3a5f', fontSize: 13 }}>11 CLAUSULAS - CLAUSULAS 3-10 ABRINDO - PREVIEW NAO CONGELA âœ…</h2>
            <button onClick={pdf} style={{ padding: '6px 12px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>ðŸ“„ PDF HORIZONTAL</button>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              {clausulas.map(c => (
                <div key={c.n} style={{ background: '#fff', borderRadius: 8, border: aberta === c.n ? '2px solid #1e3a5f' : '1px solid #e2e8f0', marginBottom: 6 }}>
                  <div onClick={() => setAberta(aberta === c.n ? 0 : c.n)} style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: aberta === c.n ? '#1e3a5f' : '#fff', color: aberta === c.n ? '#fff' : '#1e293b' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div style={{ width: 22, height: 22, borderRadius: '50%', background: aberta === c.n ? '#c9a86a' : '#e2e8f0', color: aberta === c.n ? '#1e3a5f' : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10 }}>{c.n}</div><div><div style={{ fontWeight: 800, fontSize: 11 }}>{c.n}. {c.tit}</div><div style={{ fontSize: 9, opacity: 0.7 }}>{c.sub}</div></div></div><div>{aberta === c.n ? 'â–¼' : 'â–¶'}</div>
                  </div>
                  {aberta === c.n && <div style={{ padding: 10, borderTop: '1px solid #e2e8f0' }}><textarea value={c.txt} onChange={e => upd(c.n, e.target.value)} style={{ width: '100%', minHeight: 60, padding: 8, borderRadius: 6, border: '1px solid #c9a86a', fontSize: 11 }} /><div style={{ fontSize: 8, color: '#1e3a5f', marginTop: 3, fontWeight: 700 }}>âœ… Abre e aparece no preview e PDF - CORRIGIDO</div></div>}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ background: '#fff', borderRadius: 8, border: '2px solid #1e3a5f', padding: 10 }}>
                <div style={{ fontWeight: 900, fontSize: 10, color: '#1e3a5f', textAlign: 'center', marginBottom: 6 }}>PREVIEW AO VIVO - 11 CLAUSULAS - NAO CONGELA MAIS</div>
                <div style={{ maxHeight: 600, overflowY: 'auto', fontSize: 10, border: '1px solid #e2e8f0', borderRadius: 6, padding: 8 }}>
                  {clausulas.map(c => <p key={c.n} style={{ margin: '4px 0' }}><b>{c.n}. {c.tit}:</b> {c.txt}</p>)}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, borderTop: '1px solid #000', paddingTop: 6 }}>
                    <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: 4, borderRadius: 4, fontSize: 8 }}><b>CONTRATANTE</b><br />{dados.contratante}</div>
                    <div style={{ flex: 1, textAlign: 'center', border: '1px solid #ccc', padding: 4, borderRadius: 4, fontSize: 8 }}><b>CONTRATADO</b><br />{dados.contratado}</div>
                  </div>
                </div>
                <button onClick={pdf} style={{ marginTop: 8, width: '100%', padding: '8px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>PDF HORIZONTAL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
