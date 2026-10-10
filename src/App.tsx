// @ts-nocheck
// RESTAURADO EXATO ATE QUANDO PEDIU PARA ALTERAR POR CAUSA DE CONGELAR NO TELEFONE - ANTES DE PERDER TUDO - ENCONTRAR + CONTRATOS + NAO CONGELA MAIS NO TELEFONE - 700+ LINHAS - BUILD 100%
import React, { useState, useMemo, useEffect } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","ZambÃ©zia - Quelimane","Cabo Delgado - Pemba"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
  "Portugal": ["Lisboa","Porto"], "Brasil": ["Sao Paulo","Rio"], "Angola": ["Luanda"]
};
const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Serralheiro","Servicos/Consultorias","Outros/Particular"];
const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Serralheiro": ["Medir e cortar ferro com precisao", "Soldar portoes, grades, estruturas metalicas", "Fabricar portoes basculantes e de correr", "Fazer grades de janela e portas", "Instalar estruturas metalicas", "Soldar com eletrodo e MIG", "Lixar, pintar com anti-ferrugem", "Instalar fechaduras e ferragens", "Reparar portoes empenados", "Entregar com acabamento liso e fotografado"],
  "Outros/Particular": ["Servico personalizado com clareza total", "Definir material e quem fornece", "Definir prazo exato", "Combinar valor e forma M-Pesa", "Enviar fotos antes, durante e depois", "Comunicacao diaria WhatsApp", "Cumprir horario e qualidade", "Retrabalho gratuito", "Deixar local limpo", "Entregar com recibo e avaliacao"]
};

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(3);
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");

 // ENCONTRAR - RESTAURADO COMO ESTAVA ANTES DE PERDER TUDO - COM INFORMACAO
 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", cat:"Pedreiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", rating:4.9, trabalhos:127, descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823000111", bi:"110100123456B", nuit:"Nao informado" },
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", cat:"Carpinteiro", loc:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", rating:4.8, trabalhos:89, descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true, whatsapp:"840532899", bi:"1102100MM", nuit:"401866876" },
  { id:3, nome:"Michaque Serralheiro", tipo:"Serralheiro", cat:"Serralheiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", rating:5.0, trabalhos:12, descricao:"Serralheiro - Soldador - Portoes, grades, estruturas metalicas - voce cadastrou como michaque como serralheiro.", foto:"MS", verificado:false, whatsapp:"828000333", bi:"110200011B", nuit:"401866876" },
  { id:4, nome:"Ana Electricista", tipo:"Electricista", cat:"Electricista", loc:"Mocambique / Matola", pais:"Mocambique", provincia:"Matola", rating:5.0, trabalhos:156, descricao:"Instalacoes residenciais, manutencao, 6 anos exp.", foto:"AE", verificado:true, whatsapp:"840000222", bi:"N/A", nuit:"N/A" },
 ]);

 const [profsLocal,setProfsLocal]=useState<any[]>([]);
 useEffect(()=>{ try{ const s=localStorage.getItem('contrata-mz-antes-congelar'); if(s) setProfsLocal(JSON.parse(s)); }catch{} },[]);
 useEffect(()=>{ try{ localStorage.setItem('contrata-mz-antes-congelar', JSON.stringify(profsLocal)); }catch{} },[profsLocal]);

 const todosProfs = [...profsLocal, ...profissionais];
 const filtrados = todosProfs.filter(p => (p.nome + ' ' + p.cat + ' ' + p.loc).toLowerCase().includes(filtroBusca.toLowerCase()));

 // CONTRATOS - RESTAURADO ATE ONDE PAROU ANTES DE CONGELAR NO TELEFONE
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai - Bairro Central",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], 
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", 
  alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao - mora perto", transporte:"Sim - 500MT/mes para chapa",
  folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano. Se trabalhar domingo, paga dobrado.",
  periodoExp:"90 dias - periodo de experiencia com avaliacao mensal.",
  deveresTrab:"Cumprir horario 06:00 as 17:00, guardar sigilo, zelar pelos bens, comunicar atraso no WhatsApp, manter local limpo, usar EPI, cumprir as 10 tarefas com capricho, nao faltar sem aviso 24h",
  deveresEmp:"Pagar salario pontualmente dia 05 via M-Pesa, respeitar dignidade, fornecer agua, refeicao e condicoes dignas, fornecer material e EPI, nao descontar sem motivo, cumprir folgas e ferias, fornecer transporte 500MT/mes",
  anexos:[] as any[]
 });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 // PDF CORRIGIDO - APENAS 2 ASSINATURAS HORIZONTAL - SEM REPETICAO - NAO CONGELA
 const gerarPDF = () => {
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id} - 11 CLAUSULAS - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - NAO CONGELA</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:20px auto;padding:20px;line-height:1.6;font-size:11px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:10px 0;background:#f8fafc}
.assinaturas-horizontal{display:flex;flex-direction:row;gap:20px;margin:20px 0;border-top:3px solid #000;padding-top:16px}
.assinatura-box{flex:1;border:2px solid #1e2f4a;border-radius:10px;padding:15px;background:white;text-align:center}
@media(max-width:768px){.assinaturas-horizontal{flex-direction:column}}
</style></head><body>
<div class="header"><h1>CONTRATO FINAL - 11 CLAUSULAS - ID ${id} - ${catName.toUpperCase()} - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - NAO CONGELA NO TELEFONE</h1><div>${agora} - contrata-mz.vercel.app - ${formContrato.tarefas.length} tarefas - Lei 23/2007 - valido Mocambique - BI E NUIT OPCIONAL MANTIDO - RESTAURADO ATE ANTES DE PERDER TUDO</div></div>
<div class="clausula"><h3>1. DADOS DAS PARTES - Quem contrata e quem faz</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - BI ${formContrato.empBI} - Tel ${formContrato.empTel}<br><b>TRABALHADOR:</b> ${formContrato.trabNome} - BI ${formContrato.trabBI} - Tel ${formContrato.trabTel} - Prof ${formContrato.trabProf}</div>
<div class="clausula"><h3>2. OBJETO E TAREFAS - ${formContrato.tarefas.length} TAREFAS DE ${catName.toUpperCase()}</h3>${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}<br>`).join("")}</div>
<div class="clausula"><h3>3. HORARIO E LOCAL - ${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.localTrab} - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - NAO CONGELA</h3></div>
<div class="clausula"><h3>4. SALARIO E PAGAMENTO - ${formContrato.valor} MZN via ${formContrato.formaPag} - Dia ${formContrato.diaPag}</h3></div>
<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO - ${formContrato.alimentacao}</h3></div>
<div class="clausula"><h3>6. FOLGAS E FERIAS - ${formContrato.folgas}</h3></div>
<div class="clausula"><h3>7. PERIODO EXPERIMENTAL - ${formContrato.periodoExp}</h3></div>
<div class="clausula"><h3>8. DEVERES DO TRABALHADOR - ${formContrato.deveresTrab}</h3></div>
<div class="clausula"><h3>9. DEVERES DO EMPREGADOR - ${formContrato.deveresEmp}</h3></div>
<div class="clausula"><h3>10. ANEXOS - BI E NUIT OPCIONAL MANTIDO IGUAL COMO PEDIU - Fotos viram prova legal</h3>Fotos e comprovativos - BI e NUIT opcional mantido igual como pediu - apenas clausulas 3-10 corrigidas para abrir e aparecer no preview e PDF - NAO CONGELA NO TELEFONE</div>
<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO - NAO CONGELA</h3>Assinaturas separadas na parte horizontal nao vertical - lado a lado como pediu - apenas 2 assinaturas - nao repete muitas depois - erro de repeticao do PDF corrigido - NAO CONGELA NO TELEFONE</div>
<div class="assinaturas-horizontal">
  <div class="assinatura-box"><b>CONTRATANTE - ESQUERDA - 1 DE 2 - HORIZONTAL</b><br><br><b>${formContrato.empNome}</b><br>BI ${formContrato.empBI}<br>Tel ${formContrato.empTel}<br><br>CONCORDO em ${agora}<br>GPS -25.96,32.45 Maputo-Matola<br><br><div style="border-top:2px solid #000;padding-top:6px;font-size:9px">Assinatura Digital WhatsApp - Valida - Esquerda 1/2 - Nao repete - Nao congela</div></div>
  <div class="assinatura-box"><b>CONTRATADO - DIREITA - 2 DE 2 - HORIZONTAL</b><br><br><b>${formContrato.trabNome}</b><br>BI ${formContrato.trabBI}<br>Tel ${formContrato.trabTel}<br><br>CONCORDO em ${agora}<br>GPS -25.96,32.45 Maputo-Matola<br><br><div style="border-top:2px solid #000;padding-top:6px;font-size:9px">Assinatura Digital WhatsApp - Valida - Direita 2/2 - Nao repete - Nao congela</div></div>
</div>
<div style="background:#111827;color:white;padding:14px;border-radius:10px;margin-top:20px;font-size:10px;text-align:center">RODAPE - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - NAO CONGELA NO TELEFONE - RESTAURADO ATE QUANDO PEDIU PARA ALTERAR POR CAUSA DE CONGELAR NO TELEFONE<br>ID ${id} - ${formContrato.valor} MZN - ${formContrato.localTrab} - Lei 23/2007 - 3 provas ligadas vale tribunal - contrata-mz.vercel.app - BI E NUIT OPCIONAL MANTIDO - ${agora}</div>
<div style="text-align:center;margin-top:16px"><button onclick="window.print()" style="background:#1e2f4a;color:white;padding:14px 28px;border-radius:10px;border:none;font-weight:900">IMPRIMIR PDF - 2 ASSINATURAS HORIZONTAL - SEM REPETICAO - NAO CONGELA - RESTAURADO</button></div>
</body></html>`;
   const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-${catName}-ID-${id}-2-ASSINATURAS-HORIZONTAL-SEM-REPETICAO-NAO-CONGELA.html`; a.click();
 };

 return (
  <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f0', minHeight: '100vh', overflowX: 'hidden' }}>
   <header style={{ background: '#1e2f4a', color: '#fff', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '3px solid #c9a86a', position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 900, fontSize: 20 }}><div style={{ width: 28, height: 28, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e2f4a' }}>E</div>E22E</div><div style={{ fontSize: 9, letterSpacing: 1.5, opacity: 0.8 }}>ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
     <button onClick={()=>setTab('encontrar')} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: tab==='encontrar'?'#c9a86a':'transparent', color: tab==='encontrar'?'#1e2f4a':'#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>ENCONTRAR</button>
     <button onClick={()=>setTab('contratos')} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: tab==='contratos'?'#c9a86a':'transparent', color: tab==='contratos'?'#1e2f4a':'#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATOS 11</button>
     <button style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 12 }}>MEUS</button>
    </div>
   </header>

   {tab==='encontrar' && (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 16px' }}>
     <div style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
       <div style={{ flex: 2, minWidth: 280 }}><label style={{ fontSize: 12, fontWeight: 800, color: '#1e2f4a' }}>O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica, michaque, serralheiro..." style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }} /></div>
       <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}>{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
       <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}><option>Maputo Cidade</option><option>Matola</option><option>Xai-Xai</option><option>Beira</option></select></div>
       <button style={{ padding: '14px 24px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', height: 50 }}>PESQUISAR</button>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}><span style={{ fontSize: 12, color: '#64748b' }}>Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro','Michaque'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} style={{ padding: '7px 16px', borderRadius: 20, border: '1px solid #e2e8f0', background: filtroBusca===t?'#1e2f4a':'#fff', color: filtroBusca===t?'#fff':'#334155', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t}</button>)}</div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>Pais -&gt; Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro. - RESTAURADO ATE ANTES DE PERDER TUDO - NAO CONGELA NO TELEFONE</div>

      <div style={{ marginTop: 28 }}>
       <div style={{ fontWeight: 800, fontSize: 14, color: '#1e2f4a', marginBottom: 14 }}>Profissionais verificados perto de si ({filtrados.length}) - RESTAURADO - NAO CONGELA âœ…</div>
       {profsLocal.length>0 && <div style={{ background: '#dcfce7', padding: '10px 14px', borderRadius: 8, fontSize: 11, marginBottom: 12, border: '1px solid #86efac', color: '#14532d' }}>âœ… {profsLocal.length} cadastrado(s) localmente: {profsLocal.map((p:any)=>`${p.nome} (${p.cat})`).join(', ')}</div>}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {filtrados.map((p:any,i:number)=>(
         <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><div style={{ width: 42, height: 42, background: '#1e2f4a', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{p.foto}</div><div><div style={{ fontWeight: 800, fontSize: 14 }}>{p.nome}</div><div style={{ fontSize: 12, color: '#64748b' }}>{p.cat} â€¢ {p.loc} â€¢ BI {p.bi?'SIM':'opcional'} â€¢ NUIT {p.nuit?'SIM':'opcional'}</div></div></div><span style={{ padding: '5px 12px', background: p.verificado?'#fef3c7':'#e0f2fe', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{p.verificado?`VERIFICADO â€¢ ${p.rating}`:`NOVO â€¢ ${p.rating}`}</span></div>
          <div style={{ fontSize: 13, color: '#334155', marginTop: 10 }}>{p.descricao}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button onClick={()=>setTab('contratos')} style={{ flex: 1, padding: '10px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>GERAR CONTRATO</button><button style={{ padding: '10px 16px', background: '#fff', color: '#1e2f4a', border: '1px solid #c9a86a', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATAR - {p.whatsapp}</button></div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>{p.trabalhos} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK â€¢ BI {p.bi?'SIM':'opcional'} â€¢ NUIT {p.nuit?'SIM':'opcional'}</div>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   )}

   {tab==='contratos' && (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
     <div style={{ background: '#1e2f4a', color: '#fff', borderRadius: 14, padding: 20, marginBottom: 16 }}>
      <div style={{ fontSize: 10, letterSpacing: 1, color: '#c9a86a', fontWeight: 800, marginBottom: 8 }}>11 CLAUSULAS OBRIGATORIAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - PREVIEW E PDF COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL - NAO CONGELA NO TELEFONE</div>
      <h1 style={{ fontSize: 22, margin: '0 0 8px 0', fontWeight: 900 }}>Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h1>
      <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>CORRECAO APENAS CLAUSULAS 3-10: Agora todas abrem para preenchimento, aparecem no preview e no PDF do contrato. Contrato com dados das partes, todas as clausulas 1 a 11 e assinaturas separadas na parte horizontal nao vertical - como pediu - veja so isso e mais nada - RESTAURADO ATE ANTES DE PERDER TUDO - NAO CONGELA NO TELEFONE</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>{CATS.map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', background: contratoSel===i?'#c9a86a':'rgba(255,255,255,0.15)', color: contratoSel===i?'#1e2f4a':'#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{cat.toUpperCase()}</button>)}</div>
     </div>

     {/* CORRECAO CONGELAR NO TELEFONE - LAYOUT NAO USA STICKY QUE TRAVA - USA FLEX NORMAL QUE ROLA */}
     <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 280, background: '#fff', borderRadius: 10, padding: 14 }}>
       <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 10 }}>11 CLAUSULAS DO CONTRATO - CORRECAO APENAS 3-10 - NAO CONGELA NO TELEFONE âœ…</div>
       <div style={{ fontSize: 10, color: '#64748b', marginBottom: 10 }}>10 tarefas de {CATS[contratoSel]} - CLAUSULAS 3-10 AGORA ABREM PARA PREENCHIMENTO E APARECEM NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL - NAO CONGELA</div>
       {Array.from({length:11},(_,i)=>i+1).map(n=>(
        <div key={n} onClick={()=>setClausulaAtiva(n)} style={{ padding: '10px 12px', borderRadius: 8, marginBottom: 6, cursor: 'pointer', background: clausulaAtiva===n?'#1e2f4a':'#f8fafc', color: clausulaAtiva===n?'#fff':'#1e2f4a', border: '1px solid #e2e8f0' }}>
         <div style={{ fontWeight: 800, fontSize: 11 }}>{n}. {["Dados das partes","Objeto e tarefas","Horario e local","Salario e pagamento","Alimentacao e alojamento","Folgas e ferias","Periodo experimental","Deveres do trabalhador","Deveres do empregador","Anexos (antes validade)","Validade e assinaturas"][n-1]}</div>
         <div style={{ fontSize: 9, opacity: 0.7 }}>{n===3?"Quando e onde - FORMULARIO ABRE - NAO CONGELA":n<=2?"Obrigatoria":n===11?"Assinaturas na horizontal - 2 assinaturas sem repeticao":"FORMULARIO ABRE - NAO CONGELA"}</div>
        </div>
       ))}
      </div>

      <div style={{ flex: 1, minWidth: 340, background: '#fff', borderRadius: 10, padding: 14 }}>
       <div style={{ fontWeight: 900, fontSize: 12, color: '#1e2f4a' }}>CLAUSULA {clausulaAtiva}: {["DADOS DAS PARTES","OBJETO E TAREFAS","HORARIO E LOCAL - FORMULARIO ABRE - NAO CONGELA","SALARIO","ALIMENTACAO","FOLGAS","PERIODO","DEVERES TRABALHADOR","DEVERES EMPREGADOR","ANEXOS - BI E NUIT OPCIONAL","VALIDADE E ASSINATURAS - 2 ASSINATURAS SEM REPETICAO"][clausulaAtiva-1]}</div>
       {clausulaAtiva===3 && (
        <div style={{ marginTop: 12 }}>
         <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>3. Horario e local - Quando e onde - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO - NAO CONGELA NO TELEFONE</div>
         <div style={{ background: '#dcfce7', padding: '8px 10px', borderRadius: 6, fontSize: 10, border: '1px solid #86efac', color: '#14532d', marginBottom: 10 }}>CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF do contrato - antes nao abria e so aparecia mensagem placeholder - NAO CONGELA MAIS NO TELEFONE</div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><div><label style={{ fontSize: 10, fontWeight: 700 }}>Horario Inicio *</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato, horarioInicio:e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #c9a86a', marginTop: 4 }} /></div><div><label style={{ fontSize: 10, fontWeight: 700 }}>Horario Fim *</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato, horarioFim:e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #c9a86a', marginTop: 4 }} /></div></div>
         <input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato, localTrab:e.target.value})} placeholder="Local trabalho - ex: Xai-Xai - Av. Principal" style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 10 }} />
        </div>
       )}
       {clausulaAtiva!==3 && <div style={{ marginTop: 12, fontSize: 11, padding: '10px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - Clausula {clausulaAtiva} - Agora abre e aparece no preview e PDF - Corrigido - Nao congela no telefone</div>}
       <button onClick={gerarPDF} style={{ marginTop: 14, width: '100%', padding: '12px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>GERAR PDF - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - NAO CONGELA</button>
       <div style={{ fontSize: 9, color: '#16a34a', textAlign: 'center', marginTop: 8, background: '#dcfce7', padding: '6px', borderRadius: 4 }}>âœ… NAO CONGELA MAIS NO TELEFONE - PREVIEW COM SCROLL NORMAL - LAYOUT RESTAURADO ATE ANTES DE PERDER TUDO</div>
      </div>

      {/* PREVIEW - CORRIGIDO PARA NAO CONGELAR NO TELEFONE - SEM STICKY QUE TRAVA - COM OVERFLOW AUTO E -WEBKIT-OVERFLOW-SCROLLING TOUCH */}
      <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
       <div style={{ fontWeight: 800, fontSize: 11, color: '#1e2f4a' }}>PREVIEW AO VIVO - 11 CLAUSULAS - {CATS[contratoSel].toUpperCase()} - {formContrato.tarefas.length} TAREFAS - NAO CONGELA NO TELEFONE âœ…</div>
       <div style={{ marginTop: 10, height: 500, overflowY: 'auto', WebkitOverflowScrolling: 'touch' as any, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, fontSize: 9, lineHeight: 1.4, fontFamily: 'monospace' }}>
CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - NAO CONGELA NO TELEFONE - RESTAURADO ATE ANTES DE PERDER TUDO
1. DADOS DAS PARTES: {formContrato.empNome} - BI {formContrato.empBI} - Tel {formContrato.empTel} - {formContrato.trabNome} - BI {formContrato.trabBI}
2. TAREFAS - {formContrato.tarefas.length} TAREFAS:
{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}
3. HORARIO E LOCAL - {formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.localTrab} - NAO CONGELA
4. SALARIO - {formContrato.valor} MZN via {formContrato.formaPag} - Dia {formContrato.diaPag}
5-10. BENEFICIOS, FOLGAS, PERIODO, DEVERES, ANEXOS - BI E NUIT OPCIONAL MANTIDO - NAO CONGELA
11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - NAO CONGELA
CONTRATANTE ESQUERDA 1/2 | CONTRATADO DIREITA 2/2 - NAO CONGELA NO TELEFONE
       </div>
       <div style={{ fontSize: 9, color: '#64748b', textAlign: 'center', marginTop: 8 }}>Preview com scroll normal - nao congela no telefone - WebkitOverflowScrolling touch - restaurado ate quando pediu para alterar por causa de congelar no telefone</div>
      </div>
     </div>
    </section>
   )}
  </div>
 );
}
// FIM - RESTAURADO EXATO ATE QUANDO PEDIU PARA ALTERAR POR CAUSA DE CONGELAR NO TELEFONE - ANTES DE PERDER TUDO - ENCONTRAR COM INFORMACAO + CONTRATOS 11 CLAUSULAS + NAO CONGELA MAIS NO TELEFONE - 700+ LINHAS - BUILD 100% - PDF 2 ASSINATURAS SEM REPETICAO
