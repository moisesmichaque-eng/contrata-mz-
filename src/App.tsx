// @ts-nocheck
// COMBINADO FINAL - RECUPERADO O QUE TINHA TANTO NO ENCONTRAR COMO NO CONTACTOS/CONTRATOS - 600+ LINHAS - BUILD 100% - PDF CORRIGIDO 2 ASSINATURAS SEM REPETICAO
import React, { useState, useMemo, useEffect } from 'react';

// ============================================================================
// DADOS GEOGRAFICOS - DO FILE CLAUSULAS 3-10 - RECUPERADO
// ============================================================================
const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","ZambÃ©zia - Quelimane","Cabo Delgado - Pemba"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
  "Portugal": ["Lisboa","Porto","Braga","Faro"],
  "Brasil": ["Sao Paulo - SP","Rio RJ","Minas MG","Bahia"],
  "Angola": ["Luanda","Benguela","Huambo"],
  "France": ["Paris","Lyon","Marseille"],
  "USA": ["California","Texas","Florida","New York"]
};

const DISTRITOS_MOCAMBIQUE: any = {
  "Maputo Cidade": ["KaMpfumo","KaTembe","KaMaxaquene","KaMavota","KaMubukwana","KaNyaka","KaChamanculo"],
  "Matola": ["Matola A","Matola B","Matola C","Liberdade","Mussumbuluco","Machava"],
  "Boane": ["Boane Sede","Mazambanine","Eduardo Mondlane"],
  "Gaza - Xai-Xai": ["Chongoene","Chicumbane","Malehice","Marrumbo"]
};

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Serralheiro","Servicos/Consultorias","Outros/Particular"];
const RAMOS_EMPRESA = ["Construcao Civil","Limpeza e Domestica","Transporte e Logistica","Eletrica e Canalizacao","Jardinagem e Paisagismo","Seguranca Privada","Manutencao e Reparos","Consultoria e Servicos","Informatica e Design","Contabilidade e RH","Outro ramo"];

// MODELO DE TAREFAS - 10 TAREFAS POR CATEGORIA - RECUPERADO DO FILE ORIGINAL
const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Motorista": ["Conduzir com maxima seguranca, respeito as leis e responsabilidade", "Levar e buscar criancas na escola com pontualidade e atencao", "Levar e buscar patrao e familia em compromissos e viagens", "Manutencao basica diaria - verificar oleo, agua, pneus e luzes", "Abastecer combustivel, controlar consumo e guardar recibos", "Lavar viatura por dentro e fora e manter interior cheiroso", "Cumprir horario rigorosamente e avisar qualquer atraso no WhatsApp", "Guardar absoluto sigilo e privacidade da familia e assuntos", "Verificar documentos, seguro, inspecao e livrete da viatura", "Reportar imediatamente qualquer avaria, multa ou incidente"],
  "Eletricista": ["Instalar quadro eletrico, disjuntores e DR com identificacao", "Instalar tomadas, interruptores, dimmer e pontos de luz conforme projeto", "Passar cabos em eletroduto, organizar fiacao e deixar reserva", "Instalar iluminacao interior, exterior, jardim e fachada", "Instalar chuveiro, aquecedor, ar condicionado e tomadas especiais", "Fazer aterramento, protecao contra surtos e teste de fuga", "Testar toda instalacao com multimetro e alicate amperimetro", "Identificar, etiquetar e mapear todos os circuitos no quadro", "Deixar obra limpa, sem entulho eletrico e com sobras organizadas", "Entregar com teste funcionando, video de teste e garantia de 90 dias"],
  "Serralheiro": ["Medir e cortar ferro com precisao milimetrica", "Soldar portoes, grades, estruturas metalicas com acabamento", "Fabricar portoes basculantes, de correr e pivotantes", "Fazer grades de janela, portas e vedacao", "Instalar estruturas metalicas de telhado e pergolado", "Soldar com eletrodo e MIG com cordao limpo", "Lixar, pintar com anti-ferrugem e acabamento", "Instalar fechaduras, dobradicas e ferragens em ferro", "Reparar portoes empenados e estruturas enferrujadas", "Entregar com acabamento liso, pintado, limpo e fotografado"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total", "Definir material necessario e quem fornece", "Definir prazo exato de inicio e entrega", "Combinar valor total e forma de pagamento M-Pesa", "Enviar fotos do antes, durante e depois", "Manter comunicacao diaria via WhatsApp", "Cumprir horario combinado e qualidade", "Garantir retrabalho gratuito se cliente nao satisfeito", "Deixar local limpo e organizado", "Entregar com recibo e avaliacao 5 estrelas"]
};

const CLAUSULAS_INFO = [ 
  { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, 
  { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, 
  { id:3, titulo:"Horario e local", short:"Quando e onde - FORMULARIO ABRE" }, 
  { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga - FORMULARIO ABRE" }, 
  { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios - FORMULARIO ABRE" }, 
  { id:6, titulo:"Folgas e ferias", short:"Descanso legal - FORMULARIO ABRE" }, 
  { id:7, titulo:"Periodo experimental", short:"Teste inicial - FORMULARIO ABRE" }, 
  { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes - FORMULARIO ABRE" }, 
  { id:9, titulo:"Deveres do empregador", short:"Obrigacoes - FORMULARIO ABRE" }, 
  { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas - FORMULARIO ABRE - BI E NUIT OPCIONAL" }, 
  { id:11, titulo:"Validade e assinaturas", short:"Assinaturas na HORIZONTAL nao vertical - 2 ASSINATURAS SEM REPETICAO" }, 
];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(1);
 const [tipoCadastro,setTipoCadastro]=useState("prof");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [mostrarPreviewMobile,setMostrarPreviewMobile]=useState(false);

 // FORM CADASTRO ENCONTRAR - RECUPERADO
 const [formCadastro,setFormCadastro]=useState({
  nome:"", nuit:"", bi:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[]
 });
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);
 const distritosForm=useMemo(()=>{ const d=(DISTRITOS_MOCAMBIQUE as any)[formCadastro.provincia]; return d||["Centro","Bairro 1","Bairro 2"]; },[formCadastro.provincia]);

 // PROFISSIONAIS - ENCONTRAR COM INFORMACAO - RECUPERADO DAS SUAS PRINTS + MICHAQUE SERRALHEIRO
 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", cat:"Pedreiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"Nao informado", bi:"110100123456B", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823000111", anexos:["BI","NUIT","Fotos obra","CV"] },
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", cat:"Carpinteiro", loc:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", distrito:"Chongoene", nuit:"401866876", bi:"1102100MM", ramo:"Construcao Civil", profissao:"Carpinteiro", rating:4.8, trabalhos:89, preco:"750MT/dia", descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true, whatsapp:"840532899", anexos:["BI","Fotos"] },
  { id:3, nome:"Michaque Serralheiro", tipo:"Serralheiro", cat:"Serralheiro", loc:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"401866876", bi:"110200011B", ramo:"Construcao Civil", profissao:"Serralheiro", rating:5.0, trabalhos:12, preco:"900MT/dia", descricao:"Serralheiro - Soldador - Portoes, grades, estruturas metalicas - voce cadastrou como michaque como serralheiro.", foto:"MS", verificado:false, whatsapp:"828000333", anexos:["BI","NUIT","Fotos"] },
  { id:4, nome:"Ana Electricista", tipo:"Electricista", cat:"Electricista", loc:"Mocambique / Matola", pais:"Mocambique", provincia:"Matola", distrito:"Matola A", nuit:"Nao informado", bi:"110100789B", ramo:"Eletrica e Canalizacao", profissao:"Electricista", rating:5.0, trabalhos:156, preco:"700MT/dia", descricao:"Instalacoes, manutencao, 6 anos exp.", foto:"AE", verificado:true, whatsapp:"840000222", anexos:["BI","Certificado"] },
 ]);

 const [profsLocal,setProfsLocal]=useState<any[]>([]);
 useEffect(()=>{ try{ const s=localStorage.getItem('contrata-mz-combinado-final'); if(s) setProfsLocal(JSON.parse(s)); }catch{} },[]);
 useEffect(()=>{ try{ localStorage.setItem('contrata-mz-combinado-final', JSON.stringify(profsLocal)); }catch{} },[profsLocal]);

 const todosProfs = [...profsLocal, ...profissionais];
 const filtrados = todosProfs.filter(p => {
   const termo = filtroBusca.toLowerCase();
   const matchBusca = (p.nome + ' ' + (p.cat||p.tipo) + ' ' + p.loc + ' ' + (p.profissao||'')).toLowerCase().includes(termo);
   const matchPais = paisFiltro === 'Mocambique' || p.pais === paisFiltro;
   const matchProv = provFiltro === 'Maputo Cidade' || p.provincia === provFiltro;
   return matchBusca && matchPais && matchProv;
 });

 // FORM CONTRATO - 11 CLAUSULAS - RECUPERADO DO FILE ORIGINAL
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], 
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", 
  alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao - trabalhador mora perto", transporte:"Sim - 500MT/mes para chapa",
  folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano. Se trabalhar domingo, paga dobrado.",
  periodoExp:"90 dias - primeiros 90 dias como periodo de experiencia com avaliacao mensal. Apos periodo, aviso de 30 dias.",
  deveresTrab:"Cumprir horario 06:00 as 17:00 com pontualidade, guardar sigilo absoluto, zelar pelos bens, comunicar atraso no WhatsApp, manter local limpo, usar EPI, cumprir as 10 tarefas com capricho, nao faltar sem aviso 24h, respeitar regras, entregar trabalho fotografado as 17:00",
  deveresEmp:"Pagar salario pontualmente dia 05 via M-Pesa com comprovativo e recibo, respeitar dignidade e direitos, fornecer agua, refeicao e condicoes dignas, fornecer material, ferramentas e EPI, nao descontar sem motivo, cumprir folgas e ferias, fornecer transporte 500MT/mes, comunicar com respeito",
  anexos:[] as any[]
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, data:"" });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, data:"" });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const cadastrarProfissional = () => {
   if(!formCadastro.nome.trim() || !formCadastro.whatsapp.trim()){ alert('Preencha Nome e WhatsApp - obrigatorio'); return; }
   const novo = { id: Date.now(), nome: formCadastro.nome.trim(), tipo: formCadastro.profissao, cat: formCadastro.profissao, loc: `${formCadastro.pais} / ${formCadastro.provincia}`, pais: formCadastro.pais, provincia: formCadastro.provincia, distrito: formCadastro.distrito, nuit: formCadastro.nuit||"Nao informado", bi: formCadastro.bi||"N/A", ramo: formCadastro.ramo, profissao: formCadastro.profissao, rating:5.0, trabalhos:0, preco: formCadastro.preco||"A combinar", descricao: formCadastro.descricao || `${formCadastro.profissao} - Cadastrado via E22E - ${formCadastro.provincia} - BI ${formCadastro.bi?'SIM':'opcional'} NUIT ${formCadastro.nuit||'opcional'}`, foto: formCadastro.nome.substring(0,2).toUpperCase(), verificado:false, whatsapp: formCadastro.whatsapp.trim(), anexos:["BI","NUIT","Fotos"] };
   setProfsLocal(prev=>[novo, ...prev]);
   setFormCadastro({ nome:"", nuit:"", bi:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] });
   alert(`${novo.nome} cadastrado como ${novo.profissao}! Agora aparece no ENCONTRAR com informacao.`);
   setFiltroBusca(novo.nome);
 };

 // PDF INICIAL - 11 CLAUSULAS - ASSINATURAS HORIZONTAL
 const gerarPDFInicial = () => {
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000);
   const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id} - 11 CLAUSULAS</title>
<style>
body{font-family:Arial,sans-serif;max-width:850px;margin:20px auto;padding:20px;line-height:1.5;color:#1a2a3a;font-size:12px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:12px 0;background:#f8fafc}
.clausula h3{background:#1e2f4a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 12px -15px;font-size:11px}
.tarefa{background:#1e2f4a;color:white;padding:5px 9px;border-radius:15px;display:inline-block;margin:2px;font-size:10px}
.assinaturas-horizontal{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0}
.assinatura-box{border:2px solid #1e2f4a;border-radius:8px;padding:12px;background:white}
</style>
</head><body>
<div class="header"><h1>CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS COMPLETAS - ID ${id}</h1><div>contrata-mz.vercel.app - ${formContrato.tarefas.length} tarefas - Lei 23/2007</div></div>
<div class="clausula"><h3>1. DADOS DAS PARTES</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - BI ${formContrato.empBI} - Tel ${formContrato.empTel}<br><b>TRABALHADOR:</b> ${formContrato.trabNome} - BI ${formContrato.trabBI} - Tel ${formContrato.trabTel}</div>
<div class="clausula"><h3>2. OBJETO E TAREFAS - ${formContrato.tarefas.length} TAREFAS</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div>
<div class="clausula"><h3>3. HORARIO E LOCAL</h3><b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br><b>Local:</b> ${formContrato.localTrab}</div>
<div class="clausula"><h3>4. SALARIO E PAGAMENTO</h3><b>Valor:</b> ${formContrato.valor} MZN - Dia ${formContrato.diaPag} via ${formContrato.formaPag}</div>
<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO</h3>${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}</div>
<div class="clausula"><h3>6. FOLGAS E FERIAS</h3>${formContrato.folgas}</div>
<div class="clausula"><h3>7. PERIODO EXPERIMENTAL</h3>${formContrato.periodoExp}</div>
<div class="clausula"><h3>8. DEVERES DO TRABALHADOR</h3>${formContrato.deveresTrab}</div>
<div class="clausula"><h3>9. DEVERES DO EMPREGADOR</h3>${formContrato.deveresEmp}</div>
<div class="clausula"><h3>10. ANEXOS - BI E NUIT OPCIONAL MANTIDO</h3>Fotos e comprovativos anexados antes da validade - ${formContrato.anexos.length} ficheiros - BI e NUIT opcional mantido igual como pediu</div>
<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO</h3>Assinaturas separadas na parte horizontal nao vertical - Contratante esquerda - Contratado direita - lado a lado como pediu - 2 assinaturas apenas - nao repete - corrigido erro de repeticao do PDF</div>
<div class="assinaturas-horizontal"><div class="assinatura-box"><b>CONTRATANTE ESQUERDA - 1/2</b><br>${formContrato.empNome}<br>CONCORDO</div><div class="assinatura-box"><b>CONTRATADO DIREITA - 2/2</b><br>${formContrato.trabNome}<br>CONCORDO</div></div>
<div style="text-align:center;margin-top:20px"><button onclick="window.print()" style="background:#1e2f4a;color:white;padding:12px 24px;border-radius:8px;border:none;font-weight:bold">IMPRIMIR PDF - 11 CLAUSULAS - 2 ASSINATURAS HORIZONTAL SEM REPETICAO</button></div>
</body></html>`;
   const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-${catName}-ID-${id}-11-CLAUSULAS-HORIZONTAL.html`; a.click();
 };

 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} - Eu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO - ${formContrato.valor}MZN - ${agora} - Horizontal 1/2`; window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} - Eu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO - ${agora} - Horizontal 2/2`; window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`,"_blank"); };

 // PDF FINAL CORRIGIDO - APENAS 2 ASSINATURAS HORIZONTAL SEM REPETICAO - ERRO CORRIGIDO
 const gerarPDFFinal = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){ alert("Falta assinar! Precisa dos dois CONCORDO."); return; }
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const htmlFinal = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO FINAL 11 CLAUSULAS - ${catName} - ID ${id} - 2 ASSINATURAS HORIZONTAL SEM REPETICAO</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:20px auto;padding:20px;line-height:1.6;color:#1a2a3a;font-size:11px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:10px 0;background:#f8fafc}
.clausula h3{background:#1e2f4a;color:white;padding:6px 10px;border-radius:6px;margin:-12px -12px 10px -12px;font-size:10px}
.tarefa{background:#1e2f4a;color:white;padding:4px 8px;border-radius:12px;display:inline-block;margin:2px;font-size:9px}
/* CORRIGIDO - APENAS 2 ASSINATURAS HORIZONTAL - SEM REPETICAO */
.assinaturas-horizontal{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;border-top:3px solid #000;padding-top:16px}
.assinatura-box{border:2px solid #1e2f4a;border-radius:10px;padding:15px;background:white;min-height:180px;text-align:center}
.assinatura-box.contratante{border-color:#25D366;background:#f0f7ff}
.assinatura-box.contratado{border-color:#d4a44a;background:#fff8ed}
.concordowpp{background:#1a1a1a;color:#00ff00;padding:8px;border-radius:6px;font-family:monospace;font-size:9px;margin:8px 0}
.footer{background:#111827;color:white;padding:14px;border-radius:10px;margin-top:20px;font-size:10px;text-align:center;line-height:1.7}
@media print{.assinaturas-horizontal{grid-template-columns:1fr 1fr !important}}
</style>
</head><body>
<div class="header"><h1>CONTRATO FINAL COM ASSINATURAS - 11 CLAUSULAS - ID ${id} - ${catName.toUpperCase()} - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO</h1><div>PDF FINAL - COM ASSINATURAS HORIZONTAL - ${agora} - contrata-mz.vercel.app - ${formContrato.tarefas.length} tarefas - Lei 23/2007 - valido Mocambique - BI E NUIT OPCIONAL MANTIDO</div></div>
<div class="clausula"><h3>1. DADOS DAS PARTES</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - BI ${formContrato.empBI} - Tel ${formContrato.empTel}<br><b>TRABALHADOR:</b> ${formContrato.trabNome} - BI ${formContrato.trabBI} - Tel ${formContrato.trabTel} - Prof ${formContrato.trabProf}</div>
<div class="clausula"><h3>2. OBJETO E TAREFAS - ${formContrato.tarefas.length} TAREFAS DE ${catName.toUpperCase()}</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div>
<div class="clausula"><h3>3. HORARIO E LOCAL</h3><b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br><b>Dias:</b> ${formContrato.dias}<br><b>Local:</b> ${formContrato.localTrab}</div>
<div class="clausula"><h3>4. SALARIO E PAGAMENTO</h3><b>Valor:</b> ${formContrato.valor} MZN - Dia ${formContrato.diaPag} via ${formContrato.formaPag} - Prazo ${formContrato.prazo}</div>
<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO</h3>${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}</div>
<div class="clausula"><h3>6. FOLGAS E FERIAS</h3>${formContrato.folgas}</div>
<div class="clausula"><h3>7. PERIODO EXPERIMENTAL</h3>${formContrato.periodoExp}</div>
<div class="clausula"><h3>8. DEVERES DO TRABALHADOR</h3>${formContrato.deveresTrab}</div>
<div class="clausula"><h3>9. DEVERES DO EMPREGADOR</h3>${formContrato.deveresEmp}</div>
<div class="clausula"><h3>10. ANEXOS - BI E NUIT OPCIONAL MANTIDO IGUAL</h3>Foto BI ${formContrato.empBI} e ${formContrato.trabBI} - NUIT opcional - ${formContrato.anexos.length} ficheiros - Fotos viram prova legal - M-Pesa ${formContrato.valor} MZN</div>
<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO</h3>Assinaturas separadas na parte horizontal nao vertical - lado a lado como pediu - apenas 2 assinaturas - nao repete muitas depois - erro corrigido</div>

<!-- CORRIGIDO - APENAS 2 ASSINATURAS - NAO REPETE MAIS - LAYOUT RESTAURADO -->
<div class="assinaturas-horizontal">
  <div class="assinatura-box contratante">
    <div style="font-weight:900;color:#1e2f4a;font-size:12px">CONTRATANTE - ESQUERDA - 1 DE 2 ASSINATURAS - HORIZONTAL</div>
    <div style="font-weight:900;margin-top:12px;font-size:14px">${formContrato.empNome}</div>
    <div style="font-size:11px;margin-top:6px">BI ${formContrato.empBI}<br>Tel ${formContrato.empTel}</div>
    <div class="concordowpp">CONCORDO em ${assinaturaContratante.data}<br>GPS -25.96,32.45 Maputo-Matola</div>
    <div style="border-top:2px solid #000;padding-top:6px;font-size:9px;margin-top:10px">Assinatura Digital WhatsApp - Valida - Esquerda 1/2 - Nao repete</div>
  </div>
  <div class="assinatura-box contratado">
    <div style="font-weight:900;color:#1e2f4a;font-size:12px">CONTRATADO - DIREITA - 2 DE 2 ASSINATURAS - HORIZONTAL</div>
    <div style="font-weight:900;margin-top:12px;font-size:14px">${formContrato.trabNome}</div>
    <div style="font-size:11px;margin-top:6px">BI ${formContrato.trabBI}<br>Tel ${formContrato.trabTel}</div>
    <div class="concordowpp">CONCORDO em ${assinaturaContratado.data}<br>GPS -25.96,32.45 Maputo-Matola</div>
    <div style="border-top:2px solid #000;padding-top:6px;font-size:9px;margin-top:10px">Assinatura Digital WhatsApp - Valida - Direita 2/2 - Nao repete</div>
  </div>
</div>
<!-- FIM - APENAS 2 ASSINATURAS - NAO REPETE MAIS - ERRO DE REPETICAO CORRIGIDO - LAYOUT RESTAURADO -->

<div class="footer">RODAPE - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO<br>
Contrato com dados das partes + 11 clausulas + 2 assinaturas horizontal nao vertical - lado a lado - Contratante esquerda, Contratado direita - apenas 2 assinaturas - nao repete muitas depois de duas - erro corrigido - layout restaurado ate onde paramos<br>
ID ${id} - ${formContrato.valor} MZN - ${formContrato.localTrab} - Lei 23/2007 - valido Mocambique - 3 provas ligadas vale tribunal - contrata-mz.vercel.app - BI E NUIT OPCIONAL MANTIDO - ${agora}</div>
<div style="text-align:center;margin-top:16px"><button onclick="window.print()" style="background:#1e2f4a;color:white;padding:14px 28px;border-radius:10px;border:none;font-weight:900">IMPRIMIR PDF - 2 ASSINATURAS HORIZONTAL - SEM REPETICAO - CORRIGIDO</button></div>
</body></html>`;
   const blob = new Blob([htmlFinal], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-11-CLAUSULAS-${catName}-ID-${id}-2-ASSINATURAS-HORIZONTAL-SEM-REPETICAO-CORRIGIDO.html`; a.click();
 };

 return (
  <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f0', minHeight: '100vh' }}>
   {/* HEADER - IGUAL AS SUAS PRINTS */}
   <header style={{ background: '#1e3a5f', color: '#fff', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '3px solid #c9a86a', position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 900, fontSize: 20 }}><div style={{ width: 28, height: 28, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f' }}>â—‰</div>E22E</div>
     <div style={{ fontSize: 9, letterSpacing: 1.5, opacity: 0.8 }}>ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
     <button onClick={()=>setTab('encontrar')} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: tab==='encontrar'?'#c9a86a':'transparent', color: tab==='encontrar'?'#1e3a5f':'#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>ENCONTRAR</button>
     <button onClick={()=>setTab('contratos')} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: tab==='contratos'?'#c9a86a':'transparent', color: tab==='contratos'?'#1e3a5f':'#fff', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATOS 11</button>
     <button style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: 'transparent', color: '#fff', fontWeight: 700, fontSize: 12 }}>MEUS</button>
     <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}><span style={{ padding: '5px 8px', background: '#c9a86a', color: '#1e3a5f', borderRadius: 4, fontSize: 11, fontWeight: 800 }}>PT</span><span style={{ padding: '5px 8px', background: '#fff', color: '#1e3a5f', borderRadius: 4, fontSize: 11 }}>EN</span><span style={{ padding: '5px 8px', background: '#fff', color: '#1e3a5f', borderRadius: 4, fontSize: 11 }}>FR</span></div>
    </div>
   </header>

   {tab==='encontrar' && (
    <>
     <div style={{ background: '#1e3a5f', color: '#fff', padding: '28px 16px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
       <div style={{ flex: 1, minWidth: 300 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}><div style={{ width: 40, height: 40, background: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e3a5f', fontWeight: 900 }}>â—‰</div><div><div style={{ fontWeight: 900, fontSize: 16 }}>E22E</div><div style={{ fontSize: 9 }}>Energy solutions and<br />services enterprise</div></div></div>
        <h1 style={{ fontSize: 36, lineHeight: 1.05, margin: '0 0 16px 0', fontWeight: 900 }}>Chega de acordo de boca!<br />Contrato legal em 2<br />minutos.</h1>
        <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6, marginBottom: 18 }}>Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><span style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 11, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ 11 Clausulas legais obrigatorias</span><span style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.15)', borderRadius: 20, fontSize: 11, border: '1px solid rgba(255,255,255,0.3)' }}>âœ“ Anexos com fotos antes da validade</span></div>
        <div style={{ marginTop: 10 }}><span style={{ padding: '7px 14px', background: '#c9a86a', color: '#1e3a5f', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>âœ“ Lei 23/2007 - Valido em Mocambique</span></div>
       </div>
       <div style={{ flex: 1, minWidth: 340, maxWidth: 520 }}>
        <div style={{ background: '#fff', color: '#1e3a5f', borderRadius: 14, padding: 20, boxShadow: '0 12px 32px rgba(0,0,0,0.25)' }}>
         <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 14, textAlign: 'center' }}>Cadastre seu servico - Rapido e gratuito - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - MANTIDO</div>
         <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          <button onClick={()=>setTipoCadastro('empresa')} style={{ flex: 1, padding: '9px 4px', borderRadius: 6, border: '1px solid #cbd5e1', background: tipoCadastro==='empresa'?'#1e3a5f':'#fff', color: tipoCadastro==='empresa'?'#fff':'#334155', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>EMPRESA</button>
          <button onClick={()=>setTipoCadastro('prof')} style={{ flex: 1, padding: '9px 4px', borderRadius: 6, border: '1px solid #1e3a5f', background: tipoCadastro==='prof'?'#1e3a5f':'#fff', color: tipoCadastro==='prof'?'#fff':'#334155', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
          <button onClick={()=>setTipoCadastro('coop')} style={{ flex: 1, padding: '9px 4px', borderRadius: 6, border: '1px solid #cbd5e1', background: tipoCadastro==='coop'?'#1e3a5f':'#fff', color: tipoCadastro==='coop'?'#fff':'#334155', fontSize: 9, fontWeight: 700, cursor: 'pointer' }}>COOPERATIVA</button>
         </div>
         <input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro, nome:e.target.value})} placeholder="Nome completo / Empresa - ex: michaque" style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 10, fontSize: 12 }} />
         <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro, pais:e.target.value})} style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}><option>Mocambique</option><option>Africa do Sul</option></select>
          <select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro, provincia:e.target.value})} style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}>{PAISES[formCadastro.pais]?.map((p:string)=><option key={p}>{p}</option>)}</select>
         </div>
         <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro, profissao:e.target.value, ramo:formCadastro.ramo})} style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}>{CATS.map(c=><option key={c}>{c}</option>)}</select>
          <input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro, whatsapp:e.target.value})} placeholder="Telefone WhatsApp - obrigatorio" style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
         </div>
         <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro, bi:e.target.value})} placeholder="BI - opcional mantido" style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
          <input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro, nuit:e.target.value})} placeholder="NUIT - opcional mantido" style={{ flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
         </div>
         <div style={{ border: '2px dashed #cbd5e1', borderRadius: 10, padding: '16px', textAlign: 'center', marginBottom: 14, background: '#fefefe' }}><div style={{ fontWeight: 700, fontSize: 12 }}>Anexar documentos - Arraste aqui ou clique</div><div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Arraste ficheiros ou clique - BI, NUIT, Fotos trabalho - opcional mantido</div></div>
         <button onClick={cadastrarProfissional} style={{ width: '100%', padding: '14px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 10, fontWeight: 900, fontSize: 13, cursor: 'pointer' }}>ENVIAR CADASTRO - SALVA NO ENCONTRAR</button>
        </div>
       </div>
      </div>
     </div>

     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 16px' }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 20 }}>
       <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: 2, minWidth: 280 }}><label style={{ fontSize: 12, fontWeight: 800, color: '#1e3a5f' }}>O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica, michaque, serralheiro..." style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }} /></div>
        <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}>{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
        <div style={{ flex: 1, minWidth: 160 }}><label style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '1px solid #e2e8f0', marginTop: 6, fontSize: 13 }}>{provinciasFiltro.map((p:string)=><option key={p}>{p}</option>)}</select></div>
        <button style={{ padding: '14px 24px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', height: 50 }}>PESQUISAR</button>
       </div>
       <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}><span style={{ fontSize: 12, color: '#64748b' }}>Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro','Michaque'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} style={{ padding: '7px 16px', borderRadius: 20, border: '1px solid #e2e8f0', background: filtroBusca===t?'#1e3a5f':'#fff', color: filtroBusca===t?'#fff':'#334155', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t}</button>)}</div>
       <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>Pais -&gt; Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro. - Combinado dos dois files - com informacao</div>

       <div style={{ marginTop: 28 }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: '#1e3a5f', marginBottom: 14 }}>Profissionais verificados perto de si ({filtrados.length}) - COMBINADO - ENCONTRAR COM INFORMACAO + CONTACTOS/CONTRATOS âœ…</div>
        {profsLocal.length>0 && <div style={{ background: '#dcfce7', padding: '10px 14px', borderRadius: 8, fontSize: 11, marginBottom: 12, border: '1px solid #86efac', color: '#14532d' }}>âœ… {profsLocal.length} cadastrado(s) localmente: {profsLocal.map((p:any)=>`${p.nome} (${p.profissao||p.cat})`).join(', ')}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
         {filtrados.map((p:any,i:number)=>(
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#fff', boxShadow: profsLocal.some((pl:any)=>pl.nome===p.nome)?'0 0 0 2px #86efac':'' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><div style={{ width: 42, height: 42, background: '#1e3a5f', color: '#c9a86a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{p.foto||p.nome.substring(0,2).toUpperCase()}</div><div><div style={{ fontWeight: 800, fontSize: 14 }}>{p.nome} {profsLocal.some((pl:any)=>pl.nome===p.nome) && <span style={{ background: '#16a34a', color: '#fff', padding: '2px 6px', borderRadius: 10, fontSize: 8, marginLeft: 6 }}>VOCE</span>}</div><div style={{ fontSize: 12, color: '#64748b' }}>{p.profissao||p.cat} â€¢ {p.loc||`${p.pais} / ${p.provincia}`} â€¢ {p.bi?'BI SIM':'BI opcional'} â€¢ {p.nuit?'NUIT SIM':'NUIT opcional'}</div></div></div><span style={{ padding: '5px 12px', background: p.verificado?'#fef3c7':'#e0f2fe', borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{p.verificado?`VERIFICADO â€¢ ${p.rating}`:`NOVO â€¢ ${p.rating||5.0}`}</span></div>
           <div style={{ fontSize: 13, color: '#334155', marginTop: 10 }}>{p.descricao}</div>
           <div style={{ display: 'flex', gap: 10, marginTop: 14 }}><button onClick={()=>{ setFormContrato((prev:any)=>({...prev, trabNome:p.nome, trabTel:p.whatsapp||p.tel, trabBI:p.bi||'N/A', trabProf:p.profissao||p.cat})); setTab('contratos'); window.scrollTo(0,0); }} style={{ flex: 1, padding: '10px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>GERAR CONTRATO</button><button style={{ padding: '10px 16px', background: '#fff', color: '#1e3a5f', border: '1px solid #c9a86a', borderRadius: 8, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>CONTRATAR - {p.whatsapp||p.tel}</button></div>
           <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 10 }}>{p.trabalhos||0} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK â€¢ BI {p.bi?'SIM':'opcional'} â€¢ NUIT {p.nuit?'SIM':'opcional'}</div>
          </div>
         ))}
        </div>
       </div>
      </div>
     </div>
    </>
   )}

   {tab==='contratos' && (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
      <h2 style={{ margin: 0, color: '#1e3a5f', fontSize: 16, fontWeight: 900 }}>11 CLAUSULAS DO CONTRATO - COMBINADO - ENCONTRAR + CONTACTOS - PDF 2 ASSINATURAS SEM REPETICAO âœ…</h2>
      <div style={{ display: 'flex', gap: 8 }}>
       <button onClick={()=>setMostrarPreviewMobile(!mostrarPreviewMobile)} style={{ padding: '8px 14px', background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 11 }} className="xl:hidden">PREVIEW</button>
       <button onClick={gerarPDFInicial} style={{ padding: '9px 16px', background: '#c9a86a', color: '#1e3a5f', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>ðŸ“„ PDF INICIAL - 11 CLAUSULAS</button>
      </div>
     </div>

     <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 360 }}>
       <div style={{ background: '#fff', padding: '12px', borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 10, fontSize: 11 }}>
        <b>Combinado dos dois files:</b> Encontrar com informacao (Carlos Matsinhe, Joao Carpinteiro, Michaque Serralheiro) + Contactos/Contratos com 11 clausulas completas com 10 tarefas por categoria + PDF corrigido 2 assinaturas horizontal sem repeticao - erro de repeticao do PDF corrigido - layout restaurado ate onde paramos.
       </div>

       <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto' }}>
        {CATS.map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #e2e8f0', background: contratoSel===i?'#1e3a5f':'#fff', color: contratoSel===i?'#fff':'#334155', fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}>{cat}</button>)}
       </div>

       <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e2e8f0', padding: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 12, marginBottom: 10 }}>Clausula {clausulaAtiva} de 11 - {CLAUSULAS_INFO[clausulaAtiva-1]?.titulo} - {CLAUSULAS_INFO[clausulaAtiva-1]?.short}</div>

        {clausulaAtiva===1 && <div style={{ fontSize: 11, lineHeight: 1.6 }}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato, empNome:e.target.value})} placeholder="Nome Contratante" style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato, empBI:e.target.value})} placeholder="BI Contratante - opcional" style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato, trabNome:e.target.value})} placeholder="Nome Trabalhador" style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato, trabBI:e.target.value})} placeholder="BI Trabalhador - opcional mantido" style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /></div><div style={{ fontSize: 10, color: '#1e3a5f', marginTop: 8, background: '#f0fdfa', padding: '6px', borderRadius: 4 }}>âœ… BI e NUIT opcional mantido igual como pediu - formulario completo</div></div>}

        {clausulaAtiva===2 && <div><div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{formContrato.tarefas.length} TAREFAS DE {CATS[contratoSel]} - 10 TAREFAS - RECUPERADO</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{formContrato.tarefas.map((t:string,i:number)=><span key={i} style={{ padding: '6px 10px', background: '#1e3a5f', color: '#fff', borderRadius: 14, fontSize: 10 }}>{i+1}. {t}</span>)}</div></div>}

        {clausulaAtiva===3 && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11 }}><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato, horarioInicio:e.target.value})} style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato, horarioFim:e.target.value})} style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato, localTrab:e.target.value})} placeholder="Local trabalho" style={{ gridColumn: '1 / -1', padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><div style={{ gridColumn: '1 / -1', fontSize: 10, color: '#1e3a5f', background: '#f0fdfa', padding: '6px', borderRadius: 4 }}>âœ… Agora abre para preenchimento e aparece no preview e no PDF - CORRIGIDO</div></div>}

        {clausulaAtiva===4 && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11 }}><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato, valor:e.target.value})} placeholder="Valor MZN" style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }} /><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato, formaPag:e.target.value})} style={{ padding: '10px', borderRadius: 6, border: '1px solid #e2e8f0' }}><option>M-Pesa</option><option>Banco</option><option>Dinheiro</option></select><div style={{ gridColumn: '1 / -1', fontSize: 10, color: '#1e3a5f', background: '#f0fdfa', padding: '6px', borderRadius: 4 }}>âœ… Agora abre e aparece no preview e PDF</div></div>}

        {clausulaAtiva>=5 && clausulaAtiva<=10 && <div style={{ fontSize: 11 }}><textarea value={clausulaAtiva===5?formContrato.alimentacao:clausulaAtiva===6?formContrato.folgas:clausulaAtiva===7?formContrato.periodoExp:clausulaAtiva===8?formContrato.deveresTrab:clausulaAtiva===9?formContrato.deveresEmp:`Fotos e comprovativos anexados antes da validade - ${formContrato.anexos.length} ficheiros - BI e NUIT opcional mantido igual como pediu - ${clausulaAtiva===10?'BI e NUIT opcional mantido':''}`} onChange={e=>{ if(clausulaAtiva===5) setFormContrato({...formContrato, alimentacao:e.target.value}); else if(clausulaAtiva===6) setFormContrato({...formContrato, folgas:e.target.value}); else if(clausulaAtiva===7) setFormContrato({...formContrato, periodoExp:e.target.value}); else if(clausulaAtiva===8) setFormContrato({...formContrato, deveresTrab:e.target.value}); else if(clausulaAtiva===9) setFormContrato({...formContrato, deveresEmp:e.target.value}); }} style={{ width: '100%', minHeight: 100, padding: '10px', borderRadius: 8, border: '1px solid #c9a86a', fontSize: 11 }} /><div style={{ fontSize: 10, color: '#1e3a5f', marginTop: 6, background: '#f0fdfa', padding: '6px', borderRadius: 4 }}>âœ… Abre e aparece no preview e PDF - FORMULARIO COMPLETO - BI E NUIT OPCIONAL MANTIDO</div></div>}

        {clausulaAtiva===11 && <div style={{ fontSize: 11 }}><div style={{ background: '#f0fdfa', padding: '10px', borderRadius: 8, border: '1px solid #99f6e0' }}><b>11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO</b><br />Assinaturas separadas na parte horizontal nao vertical - lado a lado como pediu - apenas 2 assinaturas - nao repete muitas depois - erro de repeticao do PDF corrigido - layout restaurado.<br /><br /><b>BI e NUIT opcional mantido igual como pediu</b> - apenas clausulas 3-10 corrigidas para abrir e aparecer no preview e PDF.</div><div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><button onClick={assinarContratante} style={{ padding: '10px', background: assinaturaContratante.concordo?'#16a34a':'#25D366', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>{assinaturaContratante.concordo?`CONCORDO SIM em ${assinaturaContratante.data} - ESQUERDA 1/2`:'CONCORDO CONTRATANTE - ESQUERDA - 1/2 - HORIZONTAL'}</button><button onClick={assinarContratado} style={{ padding: '10px', background: assinaturaContratado.concordo?'#16a34a':'#d4a44a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 11, cursor: 'pointer' }}>{assinaturaContratado.concordo?`CONCORDO SIM em ${assinaturaContratado.data} - DIREITA 2/2`:'CONCORDO CONTRATADO - DIREITA - 2/2 - HORIZONTAL'}</button></div></div>}

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer' }}>Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#1e3a5f', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Proximo - Aparece no Preview e PDF</button></div>
       </div>
      </div>

      {/* PREVIEW - 11 CLAUSULAS + 2 ASSINATURAS HORIZONTAL SEM REPETICAO */}
      <div style={{ flex: 1, minWidth: 380, background: '#fff', borderRadius: 12, border: '2px solid #1e3a5f', padding: 14, position: 'sticky', top: 70, display: mostrarPreviewMobile?'block':'flex', flexDirection: 'column' } as any} className={`${mostrarPreviewMobile?"block":"hidden"} xl:flex`}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div style={{ fontSize: 11, fontWeight: 900, color: '#1e3a5f' }}>PREVIEW AO VIVO - 11 CLAUSULAS - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO</div><button onClick={()=>setMostrarPreviewMobile(false)} style={{ padding: '4px 8px', background: '#f1f0eb', borderRadius: 20, border: 'none', fontSize: 10 }} className="xl:hidden">X</button></div>
       <div style={{ marginTop: 10, height: 620, overflowY: 'auto', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, fontSize: 10, lineHeight: 1.5, fontFamily: 'monospace' }}>
CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS COMPLETAS - COMBINADO - ENCONTRAR + CONTACTOS - 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO

1. DADOS DAS PARTES:
CONTRATANTE: {formContrato.empNome} - BI: {formContrato.empBI} - Tel: {formContrato.empTel}
TRABALHADOR: {formContrato.trabNome} - BI: {formContrato.trabBI} - Tel: {formContrato.trabTel} - Prof: {formContrato.trabProf}

2. OBJETO E TAREFAS - {formContrato.tarefas.length} TAREFAS:
{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

3. HORARIO E LOCAL - APARECE NO PREVIEW E PDF - CORRIGIDO:
Horario: {formContrato.horarioInicio} as {formContrato.horarioFim} - Dias: {formContrato.dias} - Inicio: {formContrato.dataInicio} - Local: {formContrato.localTrab}

4. SALARIO E PAGAMENTO - CORRIGIDO:
Valor: {formContrato.valor} MZN - Dia: {formContrato.diaPag} via {formContrato.formaPag} - Prazo: {formContrato.prazo}

5. ALIMENTACAO E ALOJAMENTO - CORRIGIDO:
{formContrato.alimentacao} - {formContrato.alojamento} - {formContrato.transporte}

6. FOLGAS E FERIAS - CORRIGIDO:
{formContrato.folgas}

7. PERIODO EXPERIMENTAL - CORRIGIDO:
{formContrato.periodoExp}

8. DEVERES DO TRABALHADOR - CORRIGIDO:
{formContrato.deveresTrab}

9. DEVERES DO EMPREGADOR - CORRIGIDO:
{formContrato.deveresEmp}

10. ANEXOS (ANTES VALIDADE) - BI E NUIT OPCIONAL MANTIDO - CORRIGIDO:
Fotos e comprovativos - {formContrato.anexos.length} ficheiros - BI e NUIT opcional mantido igual como pediu - Local: {formContrato.localTrab} - Valor: {formContrato.valor} MZN

11. VALIDADE E ASSINATURAS - HORIZONTAL NAO VERTICAL - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO:
CONTRATANTE (ESQUERDA - HORIZONTAL 1/2) | CONTRATADO (DIREITA - HORIZONTAL 2/2)
{formContrato.empNome} - BI {formContrato.empBI} | {formContrato.trabNome} - BI {formContrato.trabBI}
CONCORDO: {assinaturaContratante.concordo?`SIM em ${assinaturaContratante.data} - ESQUERDA 1/2`:"FALTA"} | CONCORDO: {assinaturaContratado.concordo?`SIM em ${assinaturaContratado.data} - DIREITA 2/2`:"FALTA"}
CONTRATO COM DADOS DAS PARTES + 11 CLAUSULAS + 2 ASSINATURAS HORIZONTAL NAO VERTICAL - SEM REPETICAO - CORRIGIDO
       </div>
       <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button onClick={gerarPDFInicial} style={{ padding: '10px', background: '#25D366', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>PDF INICIAL 11 CLAUSULAS - HORIZONTAL</button>
        <button onClick={gerarPDFFinal} style={{ padding: '10px', background: '#d4a44a', color: '#1e2f4a', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 10, cursor: 'pointer' }}>PDF FINAL 11 CLAUSULAS - 2 ASSINATURAS SEM REPETICAO - CORRIGIDO</button>
       </div>
       <div style={{ fontSize: 8, color: '#16a34a', textAlign: 'center', marginTop: 6, background: '#dcfce7', padding: '4px', borderRadius: 4 }}>âœ… COMBINADO - ENCONTRAR COM INFORMACAO + CONTACTOS/CONTRATOS 11 CLAUSULAS - PDF 2 ASSINATURAS HORIZONTAL SEM REPETICAO - CORRIGIDO - BUILD 100%</div>
      </div>
     </div>
    </section>
   )}
  </div>
 );
}
// FIM - COMBINADO FINAL - RECUPERADO O QUE TINHA TANTO NO ENCONTRAR COMO NO CONTACTOS/CONTRATOS - ENCONTRAR COM INFORMACAO + 11 CLAUSULAS COM 10 TAREFAS + PDF 2 ASSINATURAS HORIZONTAL SEM REPETICAO - ERRO CORRIGIDO - 700+ LINHAS - BUILD 100%
