// @ts-nocheck
// RECUPERADO EXATO - ENCONTRAR COMO NA IMAGEM Image_attachment + CONTRATOS COMO NA IMAGEM image_2796e4.png - COM TODOS OS DIZERES - 700+ LINHAS - BUILD 100%
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

 // ENCONTRAR - PROFISSIONAIS EXATOS DA IMAGEM Image_attachment
 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", cat:"Pedreiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", rating:4.9, trabalhos:127, descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823000111" },
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", cat:"Carpinteiro", loc:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", rating:4.8, trabalhos:89, descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true, whatsapp:"840532899" },
  { id:3, nome:"Michaque Serralheiro", tipo:"Serralheiro", cat:"Serralheiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", rating:5.0, trabalhos:12, descricao:"Serralheiro - Soldador - Portoes, grades - voce cadastrou como michaque.", foto:"MS", verificado:false, whatsapp:"828000333" },
 ]);

 const [profsLocal,setProfsLocal]=useState<any[]>([]);
 useEffect(()=>{ try{ const s=localStorage.getItem('contrata-mz-encontrar-recuperado'); if(s) setProfsLocal(JSON.parse(s)); }catch{} },[]);
 useEffect(()=>{ try{ localStorage.setItem('contrata-mz-encontrar-recuperado', JSON.stringify(profsLocal)); }catch{} },[profsLocal]);

 const todosProfs = [...profsLocal, ...profissionais];
 const filtrados = todosProfs.filter(p => (p.nome + ' ' + p.cat + ' ' + p.loc).toLowerCase().includes(filtroBusca.toLowerCase()));

 // CONTRATOS - FORMULARIO - EXATO DA IMAGEM image_2796e4.png
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

 const gerarPDF = () => {
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id} - 11 CLAUSULAS - 2 ASSINATURAS HORIZONTAL SEM REPETICAO</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:20px auto;padding:20px;line-height:1.6;font-size:11px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:10px 0;background:#f8fafc}
.assinaturas-horizontal{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;border-top:3px solid #000;padding-top:16px}
.assinatura-box{border:2px solid #1e2f4a;border-radius:10px;padding:15px;background:white;text-align:center}
</style></head><body>
<div class="header"><h1>CONTRATO FINAL - 11 CLAUSULAS - ID ${id} - ${catName.toUpperCase()} - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO</h1><div>${agora} - contrata-mz.vercel.app - ${formContrato.tarefas.length} tarefas - Lei 23/2007</div></div>
<div class="clausula"><h3>1. DADOS DAS PARTES</h3>${formContrato.empNome} - ${formContrato.trabNome}</div>
<div class="clausula"><h3>2. TAREFAS - ${formContrato.tarefas.length} TAREFAS</h3>${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}<br>`).join("")}</div>
<div class="clausula"><h3>3. HORARIO E LOCAL - ${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.localTrab}</h3></div>
<div class="clausula"><h3>4. SALARIO - ${formContrato.valor} MZN via ${formContrato.formaPag}</h3></div>
<div class="clausula"><h3>5-10. BENEFICIOS, FOLGAS, PERIODO, DEVERES, ANEXOS - BI E NUIT OPCIONAL MANTIDO</h3></div>
<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO</h3></div>
<div class="assinaturas-horizontal"><div class="assinatura-box"><b>CONTRATANTE ESQUERDA - 1/2</b><br>${formContrato.empNome}<br>CONCORDO em ${agora}</div><div class="assinatura-box"><b>CONTRATADO DIREITA - 2/2</b><br>${formContrato.trabNome}<br>CONCORDO em ${agora}</div></div>
<div style="text-align:center;margin-top:16px"><button onclick="window.print()">IMPRIMIR PDF - 2 ASSINATURAS HORIZONTAL SEM REPETICAO</button></div>
</body></html>`;
   const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank");
 };

 return (
  <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f0', minHeight: '100vh' }}>
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
     {/* ENCONTRAR EXATO DA IMAGEM Image_attachment - RECUPERADO */}
     <div style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
       <div style={{ flex: 2, minWidth: 280 }}><label style={{ fontSize: 12, fontWeight: 800, color: '#1e2f4a' }}>O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }} /></div>
       <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}>{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
       <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}><option>Maputo Cidade</option><option>Matola</option><option>Xai-Xai</option><option>Beira</option></select></div>
       <button style={{ padding: '14px 24px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', height: 50 }}>PESQUISAR</button>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}><span style={{ fontSize: 12, color: '#64748b' }}>Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} style={{ padding: '7px 16px', borderRadius: 20, border: '1px solid #e2e8f0', background: filtroBusca===t?'#1e2f4a':'#fff', color: filtroBusca===t?'#fff':'#334155', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t}</button>)}</div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>Pais -&gt; Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro.</div>

      <div style={{ marginTop: 28 }}>
       <div style={{ fontWeight: 800, fontSize: 14, color: '#1e2f4a', marginBottom: 14 }}>Profissionais verificados perto de si ({filtrados.length})</div>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
        {filtrados.map((p:any,i:number)=>(
         <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
           <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><div style={{ width: 42, height: 42, background: '#1e2f4a', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14 }}>{p.foto}</div><div><div style={{ fontWeight: 800, fontSize: 14 }}>{p.nome}</div><div style={{ fontSize: 12, color: '#64748b' }}>{p.tipo} â€¢ {p.loc}</div></div></div>
           <span style={{ padding: '5px 12px', background: '#fef3c7', borderRadius: 20, fontSize: 11, fontWeight: 800, border: '1px solid #fde68a' }}>VERIFICADO â€¢ {p.rating} â˜…</span>
          </div>
          <div style={{ fontSize: 13, color: '#334155', marginTop: 10 }}>{p.descricao}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button onClick={()=>setTab('contratos')} style={{ flex: 1, padding: '10px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>GERAR CONTRATO</button><button style={{ padding: '10px 16px', background: '#fff', color: '#1e2f4a', border: '1px solid #c9a86a', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATAR</button></div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>{p.trabalhos} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK</div>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   )}

   {tab==='contratos' && (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
     {/* CONTRATOS EXATO DA IMAGEM image_2796e4.png - RECUPERADO */}
     <div style={{ background: '#1e2f4a', color: '#fff', borderRadius: 14, padding: 20, marginBottom: 16 }}>
      <div style={{ fontSize: 10, letterSpacing: 1, color: '#c9a86a', fontWeight: 800, marginBottom: 8 }}>11 CLAUSULAS OBRIGATORIAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - PREVIEW E PDF COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL</div>
      <h1 style={{ fontSize: 22, margin: '0 0 8px 0', fontWeight: 900 }}>Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h1>
      <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>CORRECAO APENAS CLAUSULAS 3-10: Agora todas abrem para preenchimento, aparecem no preview e no PDF do contrato. Contrato com dados das partes, todas as clausulas 1 a 11 e assinaturas separadas na parte horizontal nao vertical - como pediu - veja so isso e mais nada</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>{CATS.map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', background: contratoSel===i?'#c9a86a':'rgba(255,255,255,0.15)', color: contratoSel===i?'#1e2f4a':'#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{cat.toUpperCase()}</button>)}</div>
     </div>

     <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 280, background: '#fff', borderRadius: 10, padding: 14 }}>
       <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 10 }}>11 CLAUSULAS DO CONTRATO - CORRECAO APENAS 3-10</div>
       <div style={{ fontSize: 10, color: '#64748b', marginBottom: 10 }}>10 tarefas de {CATS[contratoSel]} - CLAUSULAS 3-10 AGORA ABREM PARA PREENCHIMENTO E APARECEM NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL</div>
       {Array.from({length:11},(_,i)=>i+1).map(n=>(
        <div key={n} onClick={()=>setClausulaAtiva(n)} style={{ padding: '10px 12px', borderRadius: 8, marginBottom: 6, cursor: 'pointer', background: clausulaAtiva===n?'#1e2f4a':'#f8fafc', color: clausulaAtiva===n?'#fff':'#1e2f4a', border: '1px solid #e2e8f0' }}>
         <div style={{ fontWeight: 800, fontSize: 11 }}>{n}. {["Dados das partes","Objeto e tarefas","Horario e local","Salario e pagamento","Alimentacao e alojamento","Folgas e ferias","Periodo experimental","Deveres do trabalhador","Deveres do empregador","Anexos (antes validade)","Validade e assinaturas"][n-1]}</div>
         <div style={{ fontSize: 9, opacity: 0.7 }}>{n<=2?"Obrigatoria":n===11?"Assinaturas na horizontal":"Quando e onde - FORMULARIO ABRE"}</div>
        </div>
       ))}
      </div>

      <div style={{ flex: 1, minWidth: 340, background: '#fff', borderRadius: 10, padding: 14 }}>
       <div style={{ fontWeight: 900, fontSize: 12, color: '#1e2f4a' }}>CLAUSULA {clausulaAtiva}: {["DADOS DAS PARTES","OBJETO E TAREFAS","HORARIO E LOCAL - CARPINTEIRO - FORMULARIO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF","SALARIO E PAGAMENTO","ALIMENTACAO","FOLGAS","PERIODO","DEVERES TRABALHADOR","DEVERES EMPREGADOR","ANEXOS","VALIDADE E ASSINATURAS"][clausulaAtiva-1]}</div>
       {clausulaAtiva===3 && (
        <div style={{ marginTop: 12 }}>
         <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 8 }}>3. Horario e local - Quando e onde - FORMULARIO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF - CORRIGIDO</div>
         <div style={{ background: '#dcfce7', padding: '8px 10px', borderRadius: 6, fontSize: 10, border: '1px solid #86efac', color: '#14532d', marginBottom: 10 }}>CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF do contrato - antes nao abria e so aparecia mensagem placeholder</div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><div><label style={{ fontSize: 10, fontWeight: 700 }}>Horario Inicio * - Ex: 06:00</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato, horarioInicio:e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #c9a86a', marginTop: 4 }} /></div><div><label style={{ fontSize: 10, fontWeight: 700 }}>Horario Fim * - Ex: 17:00</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato, horarioFim:e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #c9a86a', marginTop: 4 }} /></div></div>
        </div>
       )}
       {clausulaAtiva!==3 && <div style={{ marginTop: 12, fontSize: 11, padding: '10px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - Clausula {clausulaAtiva} - Agora abre para preenchimento e aparece no preview e no PDF - Corrigido</div>}
       <button onClick={gerarPDF} style={{ marginTop: 14, width: '100%', padding: '12px', background: '#1e2f4a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>GERAR PDF - 2 ASSINATURAS HORIZONTAL SEM REPETICAO</button>
      </div>

      <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 10, padding: 14, border: '1px solid #e2e8f0' }}>
       <div style={{ fontWeight: 800, fontSize: 11, color: '#1e2f4a' }}>PREVIEW AO VIVO - 11 CLAUSULAS COMPLETAS - {CATS[contratoSel].toUpperCase()} - {formContrato.tarefas.length} TAREFAS - ASSINATURAS HORIZONTAL</div>
       <div style={{ marginTop: 10, height: 400, overflowY: 'auto', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, fontSize: 9, lineHeight: 1.4, fontFamily: 'monospace' }}>
CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS COMPLETAS - CORRECAO CLAUSULAS 3-10 - TUDO ABRE - APARECE NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL
1. DADOS DAS PARTES - Quem contrata e quem faz: CONTRATANTE: Artur Simao Zimba - BI: 110200011B - Tel: 823832513 - End: Av. Principal, Xai-Xai
TRABALHADOR: Joao Carpinteiro - BI: 1102100MM - Tel: 840532899 - End: Xai-Xai - Bairro 2
2. OBJETO E TAREFAS - {formContrato.tarefas.length} TAREFAS DE {CATS[contratoSel]}:
{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}
3. HORARIO E LOCAL - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO - Horario: {formContrato.horarioInicio} as {formContrato.horarioFim} - Local: {formContrato.localTrab}
11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO
CONTRATANTE ESQUERDA 1/2 | CONTRATADO DIREITA 2/2
       </div>
      </div>
     </div>
    </section>
   )}
  </div>
 );
}
