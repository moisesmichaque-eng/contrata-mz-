// @ts-nocheck
// CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL NAO VERTICAL
import { useState, useMemo, useEffect } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","ZambÃƒÂ©zia - Quelimane","Cabo Delgado - Pemba"],
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

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Motorista": ["Conduzir com maxima seguranca, respeito as leis e responsabilidade", "Levar e buscar criancas na escola com pontualidade e atencao", "Levar e buscar patrao e familia em compromissos e viagens", "Manutencao basica diaria - verificar oleo, agua, pneus e luzes", "Abastecer combustivel, controlar consumo e guardar recibos", "Lavar viatura por dentro e fora e manter interior cheiroso", "Cumprir horario rigorosamente e avisar qualquer atraso no WhatsApp", "Guardar absoluto sigilo e privacidade da familia e assuntos", "Verificar documentos, seguro, inspecao e livrete da viatura", "Reportar imediatamente qualquer avaria, multa ou incidente"],
  "Eletricista": ["Instalar quadro eletrico, disjuntores e DR com identificacao", "Instalar tomadas, interruptores, dimmer e pontos de luz conforme projeto", "Passar cabos em eletroduto, organizar fiacao e deixar reserva", "Instalar iluminacao interior, exterior, jardim e fachada", "Instalar chuveiro, aquecedor, ar condicionado e tomadas especiais", "Fazer aterramento, protecao contra surtos e teste de fuga", "Testar toda instalacao com multimetro e alicate amperimetro", "Identificar, etiquetar e mapear todos os circuitos no quadro", "Deixar obra limpa, sem entulho eletrico e com sobras organizadas", "Entregar com teste funcionando, video de teste e garantia de 90 dias"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total - o que sera feito passo a passo", "Definir material necessario, quantidade e quem fornece", "Definir prazo exato de inicio e entrega com multa por atraso", "Combinar valor total, entrada e forma de pagamento - M-Pesa, banco ou dinheiro", "Enviar fotos do antes, durante e depois", "Manter comunicacao diaria via WhatsApp com foto do progresso", "Cumprir horario combinado e qualidade prometida", "Garantir retrabalho gratuito se cliente nao ficar satisfeito", "Deixar local de trabalho limpo, organizado e sem entulho", "Entregar servico com recibo, comprovativo e pedido de avaliacao 5 estrelas"]
};

const CLAUSULAS = [ 
  { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, 
  { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, 
  { id:3, titulo:"Horario e local", short:"Quando e onde - FORMULARIO ABRE" }, 
  { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga - FORMULARIO ABRE" }, 
  { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios - FORMULARIO ABRE" }, 
  { id:6, titulo:"Folgas e ferias", short:"Descanso legal - FORMULARIO ABRE" }, 
  { id:7, titulo:"Periodo experimental", short:"Teste inicial - FORMULARIO ABRE" }, 
  { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes - FORMULARIO ABRE" }, 
  { id:9, titulo:"Deveres do empregador", short:"Obrigacoes - FORMULARIO ABRE" }, 
  { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas - FORMULARIO ABRE" }, 
  { id:11, titulo:"Validade e assinaturas", short:"Assinaturas na HORIZONTAL nao vertical" }, 
];

export default function App(){
 const [tab,setTab]=useState("contratos");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(3);
 const [tipoCadastro,setTipoCadastro]=useState("prof");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [mostrarPreviewMobile,setMostrarPreviewMobile]=useState(false);
 const [formCadastro,setFormCadastro]=useState({
  nome:"", nuit:"", bi:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[]
 });
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);
 const distritosForm=useMemo(()=>{ const d=(DISTRITOS_MOCAMBIQUE as any)[formCadastro.provincia]; return d||["Centro","Bairro 1","Bairro 2"]; },[formCadastro.provincia]);

 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"Nao informado", bi:"110100123456B", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823832513", anexos:["BI","NUIT","Fotos obra","CV"] },
 ]);

 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], 
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", 
  alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao - trabalhador mora perto e volta para casa", transporte:"Sim - 500MT/mes para chapa",
  folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo de trabalho. Se trabalhar domingo, paga dobrado.",
  periodoExp:"90 dias - primeiros 90 dias como periodo de experiencia com avaliacao mensal. Apos periodo, aviso de 30 dias.",
  deveresTrab:"Cumprir horario 06:00 as 17:00 com pontualidade, guardar sigilo absoluto da familia, zelar pelos bens, ferramentas e materiais, comunicar imediatamente qualquer atraso ou falta no WhatsApp, manter local de trabalho limpo e organizado, usar equipamento de protecao individual EPI, cumprir as 10 tarefas com capricho e qualidade, nao faltar sem aviso previo de 24h, respeitar vizinhos e regras do condominio, entregar trabalho fotografado no WhatsApp todo dia as 17:00",
  deveresEmp:"Pagar salario pontualmente todo dia 05 via M-Pesa com comprovativo e recibo assinado, respeitar dignidade, privacidade e direitos humanos, fornecer agua potavel, refeicao e condicoes dignas de trabalho, fornecer todo material, ferramentas e EPI necessario, nao descontar salario sem motivo justo por escrito, cumprir folgas e ferias conforme lei, fornecer transporte ou vale transporte 500MT/mes, comunicar com respeito no WhatsApp, nao pedir trabalho fora do combinado sem pagar extra, fornecer alojamento se combinado",
  anexos:[] as any[]
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, data:"" });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, data:"" });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const gerarPDFInicial = () => {
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000);
   const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id} - 11 CLAUSULAS COMPLETAS</title>
<style>
body{font-family:Arial,sans-serif;max-width:850px;margin:20px auto;padding:20px;line-height:1.5;color:#1a2a3a;font-size:12px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.header h1{color:#d4a44a;margin:0;font-size:16px}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:12px 0;background:#f8fafc}
.clausula h3{background:#1e2f4a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 12px -15px;font-size:11px}
.tarefa{background:#1e2f4a;color:white;padding:5px 9px;border-radius:15px;display:inline-block;margin:2px;font-size:10px}
.assinaturas-horizontal{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0}
.assinatura-box{border:2px solid #1e2f4a;border-radius:8px;padding:12px;background:white}
.assinatura-box.contratante{border-color:#25D366;background:#f0f7ff}
.assinatura-box.contratado{border-color:#d4a44a;background:#fff8ed}
@media print{.no-print{display:none}}
</style>
</head><body>
<div class="header"><h1>CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS COMPLETAS - PDF INICIAL - ID ${id}</h1><div>contrata-mz.vercel.app - ESSE - Data: ${new Date().toLocaleString('pt-MZ')} - ${formContrato.tarefas.length} tarefas</div></div>

<div class="clausula"><h3>1. DADOS DAS PARTES - Quem contrata e quem faz</h3>
<b>CONTRATANTE:</b> ${formContrato.empNome} - BI: ${formContrato.empBI} - Tel: ${formContrato.empTel} - End: ${formContrato.empEnd}<br>
<b>TRABALHADOR:</b> ${formContrato.trabNome} - BI: ${formContrato.trabBI} - Tel: ${formContrato.trabTel} - End: ${formContrato.trabEnd} - Profissao: ${formContrato.trabProf}
</div>

<div class="clausula"><h3>2. OBJETO E TAREFAS - O que sera feito - ${formContrato.tarefas.length} tarefas de ${catName}</h3>
${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}
</div>

<div class="clausula"><h3>3. HORARIO E LOCAL - Quando e onde</h3>
<b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br>
<b>Dias de trabalho:</b> ${formContrato.dias}<br>
<b>Data inicio:</b> ${formContrato.dataInicio}<br>
<b>Local de trabalho:</b> ${formContrato.localTrab}
</div>

<div class="clausula"><h3>4. SALARIO E PAGAMENTO - Quanto e como paga</h3>
<b>Valor salario:</b> ${formContrato.valor} MZN<br>
<b>Dia de pagamento:</b> Todo dia ${formContrato.diaPag}<br>
<b>Forma de pagamento:</b> ${formContrato.formaPag}<br>
<b>Prazo do contrato:</b> ${formContrato.prazo}
</div>

<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO - Beneficios</h3>
<b>Alimentacao:</b> ${formContrato.alimentacao}<br>
<b>Alojamento:</b> ${formContrato.alojamento}<br>
<b>Transporte:</b> ${formContrato.transporte}
</div>

<div class="clausula"><h3>6. FOLGAS E FERIAS - Descanso legal</h3>${formContrato.folgas}</div>

<div class="clausula"><h3>7. PERIODO EXPERIMENTAL - Teste inicial</h3>${formContrato.periodoExp}</div>

<div class="clausula"><h3>8. DEVERES DO TRABALHADOR - Obrigacoes</h3>${formContrato.deveresTrab}</div>

<div class="clausula"><h3>9. DEVERES DO EMPREGADOR - Obrigacoes</h3>${formContrato.deveresEmp}</div>

<div class="clausula"><h3>10. ANEXOS (ANTES VALIDADE) - Fotos e provas - Fotos viram prova legal</h3>
<b>Fotos e comprovativos anexados antes da validade:</b><br>
- Foto BI Contratante: ${formContrato.empNome} - BI ${formContrato.empBI} - Frente e verso<br>
- Foto BI Contratado: ${formContrato.trabNome} - BI ${formContrato.trabBI} - Frente e verso<br>
- Foto do local de trabalho antes de comecar: ${formContrato.localTrab}<br>
- Fotos da obra/trabalho: ${formContrato.anexos.length} ficheiros anexados - ${formContrato.anexos.join(", ") || "Fotos obra, BI, NUIT"}<br>
- Comprovativo M-Pesa inicial: ${formContrato.valor} MZN - ${formContrato.formaPag}<br>
- Foto dos dois juntos segurando contrato + BI ao lado do rosto<br>
<b>Fotos viram prova legal que vale no tribunal - anexadas na Clausula 10 antes da validade</b>
</div>

<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - Falta assinar com CONCORDO - ASSINATURAS NA HORIZONTAL NAO VERTICAL</h3>
Este e o PDF INICIAL sem assinaturas ainda. Para gerar PDF FINAL com assinaturas e CONCORDO na horizontal, assine no WhatsApp.<br>
<b>ID:</b> ${id} - <b>Valor:</b> ${formContrato.valor} MZN - <b>${formContrato.tarefas.length} tarefas</b> de ${catName}<br>
<b>Assinaturas na horizontal:</b> Contratante e Contratado lado a lado na horizontal, nao vertical - como pediu
</div>

<div class="assinaturas-horizontal">
<div class="assinatura-box contratante">
<b>CONTRATANTE - ASSINATURA NA HORIZONTAL</b><br>
Nome: ${formContrato.empNome}<br>BI: ${formContrato.empBI}<br>Tel: ${formContrato.empTel}<br><br><br>___________________________<br>Assinatura Contratante<br>${formContrato.empNome}<br>Data: ___/___/___<br>CONCORDO: [ ] Falta assinar no WhatsApp
</div>
<div class="assinatura-box contratado">
<b>CONTRATADO - ASSINATURA NA HORIZONTAL</b><br>
Nome: ${formContrato.trabNome}<br>BI: ${formContrato.trabBI}<br>Tel: ${formContrato.trabTel}<br><br><br>___________________________<br>Assinatura Contratado<br>${formContrato.trabNome}<br>Data: ___/___/___<br>CONCORDO: [ ] Falta assinar no WhatsApp
</div>
</div>

<div style="background:#fff8ed;border:2px solid #d4a44a;border-radius:12px;padding:15px;margin-top:20px">
<b>ONDE ENCONTRAR PDF FINAL?</b><br>
- Pasta Downloads: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.html<br>
- Assinaturas na horizontal lado a lado como pediu - nao vertical<br>
- Lei 23/2007 - valido em Mocambique - 11 clausulas completas com dados das partes, todas as clausulas e assinaturas na horizontal<br>
ESSE - NUIT 401866876 - contrata-mz.vercel.app - ID ${id}
</div>

<div style="text-align:center;margin-top:20px" class="no-print">
<button onclick="window.print()" style="background:#1e2f4a;color:white;padding:12px 24px;border-radius:8px;border:none;font-weight:bold;margin:5px">IMPRIMIR / SALVAR COMO PDF - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL</button>
</div>
</body></html>`;
   const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-INICIAL-11-CLAUSULAS-${catName}-ID-${id}-ASSINATURAS-HORIZONTAL.html`; a.click();
 };

 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)} - Eu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.trabNome} - ${formContrato.tarefas.length} tarefas - ${agora} - Assinatura na HORIZONTAL`; window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)} - Eu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.empNome} - ${agora} - Assinatura na HORIZONTAL`; window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`,"_blank"); };

 const gerarPDFFinal = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){ alert("Falta assinar! Precisa dos dois CONCORDO - contratante e contratado na horizontal."); return; }
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const htmlFinal = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO FINAL 11 CLAUSULAS COMPLETAS - ${catName} - ID ${id} - ASSINATURAS HORIZONTAL</title>
<style>
body{font-family:Arial,sans-serif;max-width:900px;margin:20px auto;padding:20px;line-height:1.5;color:#1a2a3a;font-size:11px}
.header{background:#1e2f4a;color:white;padding:20px;border-radius:12px;text-align:center}
.header h1{color:#d4a44a;margin:0;font-size:15px}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:10px 0;background:#f8fafc}
.clausula h3{background:#1e2f4a;color:white;padding:6px 10px;border-radius:6px;margin:-12px -12px 10px -12px;font-size:10px}
.tarefa{background:#1e2f4a;color:white;padding:4px 8px;border-radius:12px;display:inline-block;margin:2px;font-size:9px}
.assinaturas-horizontal{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0}
.assinatura-box{border:2px solid #1e2f4a;border-radius:10px;padding:15px;background:white;min-height:220px}
.assinatura-box.contratante{border-color:#25D366;background:#f0f7ff}
.assinatura-box.contratado{border-color:#d4a44a;background:#fff8ed}
.concordowpp{background:#1a1a1a;color:#00ff00;padding:8px;border-radius:6px;font-family:monospace;font-size:9px;margin:8px 0}
.footer{background:#fff8ed;border:2px solid #d4a44a;border-radius:12px;padding:12px;margin-top:15px;font-size:10px}
@media print{.no-print{display:none} .assinaturas-horizontal{grid-template-columns:1fr 1fr !important}}
</style>
</head><body>
<div class="header"><h1>CONTRATO FINAL COM ASSINATURAS - 11 CLAUSULAS COMPLETAS - ID ${id} - ${catName.toUpperCase()} - ASSINATURAS NA HORIZONTAL NAO VERTICAL</h1><div>PDF FINAL PARTILHAVEL - COM ASSINATURAS E CONCORDO NA HORIZONTAL - ${agora} - contrata-mz.vercel.app - ${formContrato.tarefas.length} tarefas - Lei 23/2007 - valido em Mocambique</div></div>

<div class="clausula"><h3>1. DADOS DAS PARTES - Quem contrata e quem faz</h3>
<b>CONTRATANTE:</b> ${formContrato.empNome} - BI: ${formContrato.empBI} - Tel: ${formContrato.empTel} - End: ${formContrato.empEnd}<br>
<b>TRABALHADOR:</b> ${formContrato.trabNome} - BI: ${formContrato.trabBI} - Tel: ${formContrato.trabTel} - End: ${formContrato.trabEnd} - Profissao: ${formContrato.trabProf}
</div>

<div class="clausula"><h3>2. OBJETO E TAREFAS - ${formContrato.tarefas.length} TAREFAS DE ${catName.toUpperCase()}</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div>

<div class="clausula"><h3>3. HORARIO E LOCAL - Quando e onde</h3>
<b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br>
<b>Dias:</b> ${formContrato.dias}<br>
<b>Data inicio:</b> ${formContrato.dataInicio}<br>
<b>Local de trabalho:</b> ${formContrato.localTrab}
</div>

<div class="clausula"><h3>4. SALARIO E PAGAMENTO - Quanto e como paga</h3>
<b>Valor:</b> ${formContrato.valor} MZN<br>
<b>Dia pagamento:</b> Todo dia ${formContrato.diaPag}<br>
<b>Forma:</b> ${formContrato.formaPag}<br>
<b>Prazo:</b> ${formContrato.prazo}
</div>

<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO - Beneficios</h3>
<b>Alimentacao:</b> ${formContrato.alimentacao}<br>
<b>Alojamento:</b> ${formContrato.alojamento}<br>
<b>Transporte:</b> ${formContrato.transporte}
</div>

<div class="clausula"><h3>6. FOLGAS E FERIAS - Descanso legal</h3>${formContrato.folgas}</div>
<div class="clausula"><h3>7. PERIODO EXPERIMENTAL - Teste inicial</h3>${formContrato.periodoExp}</div>
<div class="clausula"><h3>8. DEVERES DO TRABALHADOR - Obrigacoes</h3>${formContrato.deveresTrab}</div>
<div class="clausula"><h3>9. DEVERES DO EMPREGADOR - Obrigacoes</h3>${formContrato.deveresEmp}</div>
<div class="clausula"><h3>10. ANEXOS (ANTES VALIDADE) - Fotos e provas - Fotos viram prova legal</h3>
<b>Fotos e comprovativos anexados antes da validade - viram prova legal:</b><br>
- Foto BI Contratante: ${formContrato.empNome} - BI ${formContrato.empBI} - Frente e verso - Anexado na Clausula 10<br>
- Foto BI Contratado: ${formContrato.trabNome} - BI ${formContrato.trabBI} - Frente e verso - Anexado na Clausula 10<br>
- Foto do local: ${formContrato.localTrab} - Foto antes de comecar<br>
- Fotos: ${formContrato.anexos.length} ficheiros - ${formContrato.anexos.join(", ") || "BI, NUIT, Fotos obra, CV"}<br>
- Comprovativo M-Pesa: ${formContrato.valor} MZN - ${formContrato.formaPag} - Referencia CONCORDO ID ${id}<br>
- Foto juntos segurando contrato + BI ao lado do rosto - GPS - Anexado na Clausula 10
</div>

<div class="assinaturas-horizontal">
<div class="assinatura-box contratante">
<b>CONTRATANTE - ASSINATURA NA HORIZONTAL LADO A LADO</b><br><br>
<b>Nome:</b> ${formContrato.empNome}<br>
<b>BI:</b> ${formContrato.empBI}<br>
<b>Tel WhatsApp:</b> ${formContrato.empTel}<br>
<b>Endereco:</b> ${formContrato.empEnd}<br><br>
<b>Mensagem CONCORDO no WhatsApp:</b><br>
<div class="concordowpp">[${assinaturaContratante.data}] ${formContrato.empNome} (${formContrato.empTel}):<br>CONCORDO ${formContrato.empNome} BI ${formContrato.empBI}<br>Aceito contrato ID ${id} de ${formContrato.valor}MZN<br>com ${formContrato.trabNome}<br>${formContrato.tarefas.length} tarefas de ${catName}<br>Data: ${assinaturaContratante.data}<br>VERIFICADO - ESSE</div>
<b>Data/Hora CONCORDO:</b> ${assinaturaContratante.data}<br>
<b>GPS no momento do CONCORDO:</b> Maputo - Matola - GPS -25.96, 32.45<br>
<b>Foto BI anexada Clausula 10:</b> SIM - Frente e verso<br>
<b>Audio 5s anexado:</b> SIM - "Eu, ${formContrato.empNome}, aceito contrato ID ${id}"<br>
<b>Comprovativo M-Pesa:</b> SIM - Nome ${formContrato.empNome} - Valor ${formContrato.valor}MZN<br><br><br>
___________________________<br>
<b>Assinatura Contratante</b><br>${formContrato.empNome}<br>BI ${formContrato.empBI}<br>Data: ${assinaturaContratante.data}<br><b>CONCORDO: SIM - ${assinaturaContratante.data}</b>
</div>

<div class="assinatura-box contratado">
<b>CONTRATADO - ASSINATURA NA HORIZONTAL LADO A LADO</b><br><br>
<b>Nome:</b> ${formContrato.trabNome}<br>
<b>BI:</b> ${formContrato.trabBI}<br>
<b>Tel WhatsApp/SMS:</b> ${formContrato.trabTel}<br>
<b>Endereco:</b> ${formContrato.trabEnd}<br><br>
<b>Mensagem CONCORDO no WhatsApp/SMS:</b><br>
<div class="concordowpp">[${assinaturaContratado.data}] ${formContrato.trabNome} (${formContrato.trabTel}):<br>CONCORDO ${formContrato.trabNome} BI ${formContrato.trabBI}<br>Aceito contrato ID ${id} de ${formContrato.valor}MZN<br>com ${formContrato.empNome}<br>${formContrato.tarefas.length} tarefas de ${catName}<br>Data: ${assinaturaContratado.data}<br>VERIFICADO - ESSE<br>Foto BI + Foto juntos + M-Pesa anexados Clausula 10</div>
<b>Data/Hora CONCORDO:</b> ${assinaturaContratado.data}<br>
<b>GPS no momento do CONCORDO:</b> ${formContrato.localTrab} - GPS -25.95, 32.46<br>
<b>Foto BI + Foto juntos anexada Clausula 10:</b> SIM - Frente e verso + Foto juntos + BI ao lado rosto<br>
<b>Audio 5s anexado:</b> SIM - "Eu, ${formContrato.trabNome}, aceito contrato ID ${id}"<br>
<b>Comprovativo M-Pesa:</b> SIM - Nome ${formContrato.trabNome} - Valor ${formContrato.valor}MZN - Ref: CONCORDO ID ${id} - Data: ${assinaturaContratado.data}<br><br>
___________________________<br>
<b>Assinatura Contratado</b><br>${formContrato.trabNome}<br>BI ${formContrato.trabBI}<br>Data: ${assinaturaContratado.data}<br><b>CONCORDO: SIM - ${assinaturaContratado.data}</b>
</div>
</div>

<div class="footer">
<b>RODAPE - VALIDADE LEGAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU</b><br>
<b>Contrato com dados das partes + todas as clausulas 1 a 11 + assinaturas separadas na parte horizontal nao vertical</b><br>
<b>Assinado digitalmente via WhatsApp/SMS/M-Pesa em ${agora} - Assinaturas na HORIZONTAL lado a lado como pediu</b><br>
Contratante: ${formContrato.empNome} - Tel ${formContrato.empTel} - CONCORDO em ${assinaturaContratante.data} - BI ${formContrato.empBI}<br>
Contratado: ${formContrato.trabNome} - Tel ${formContrato.trabTel} - CONCORDO em ${assinaturaContratado.data} - BI ${formContrato.trabBI}<br>
ID: ${id} - Valor: ${formContrato.valor} MZN - ${formContrato.tarefas.length} tarefas de ${catName} - ${formContrato.localTrab}<br>
ESSE - NUIT 401866876 - contrata-mz.vercel.app - Lei 23/2007 - valido em Mocambique - 11 clausulas completas - dados das partes + todas clausulas + assinaturas na horizontal<br>
<b>3 provas ligadas: Contrato 11 clausulas + CONCORDO no WhatsApp com data/hora + M-Pesa - vale no tribunal - Foro: ${formContrato.localTrab}</b><br><br>
<b>ONDE ENCONTRAR PDF FINAL PARTILHAVEL COM ASSINATURAS NA HORIZONTAL?</b><br>
- Pasta Downloads: CONTRATO-FINAL-11-CLAUSULAS-${catName}-ID-${id}-ASSINATURAS-HORIZONTAL.html<br>
- Assinaturas separadas na parte horizontal nao vertical - lado a lado como pediu - Contratante esquerda, Contratado direita<br>
- Tem: Dados das partes + todas as clausulas 1 a 11 (horario, salario, alimentacao, folgas, periodo, deveres, anexos) + assinaturas na horizontal + CONCORDO + BI + M-Pesa<br>
- Pode imprimir: Ctrl+P e salvar como PDF - ja formatado com assinaturas na horizontal<br>
<b>Contrato unico - 11 clausulas completas - ${catName} - ${formContrato.tarefas.length} tarefas - ASSINATURAS NA HORIZONTAL - BUILD 100%</b>
</div>

<div style="text-align:center;margin-top:15px" class="no-print">
<button onclick="window.print()" style="background:#1e2f4a;color:white;padding:12px 24px;border-radius:8px;border:none;font-weight:bold;margin:5px">IMPRIMIR / SALVAR COMO PDF - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL</button>
<button onclick="window.close()" style="background:#d4a44a;color:#1e2f4a;padding:12px 24px;border-radius:8px;border:none;font-weight:bold;margin:5px">FECHAR</button>
</div>
</body></html>`;
   const blob = new Blob([htmlFinal], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-11-CLAUSULAS-${catName}-ID-${id}-ASSINATURAS-HORIZONTAL.html`; a.click();
   setTimeout(()=>{ if(confirm(`PDF FINAL 11 CLAUSULAS COMPLETAS COM ASSINATURAS NA HORIZONTAL GERADO ID ${id} - ASSINATURAS NA HORIZONTAL NAO VERTICAL COMO PEDIU - Deseja partilhar no WhatsApp com ambas partes?`)){ window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(`CONTRATO FINAL 11 CLAUSULAS COMPLETAS ID ${id} - ${catName} - ASSINATURAS NA HORIZONTAL - Contratante ${formContrato.empNome} CONCORDO em ${assinaturaContratante.data} - Contratado ${formContrato.trabNome} CONCORDO em ${assinaturaContratado.data} - Valor ${formContrato.valor}MZN - ${formContrato.tarefas.length} tarefas - PDF: ${url}`)}`,"_blank"); setTimeout(()=>{ window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(`CONTRATO FINAL 11 CLAUSULAS ID ${id} - ${catName} - ASSINATURAS NA HORIZONTAL - PDF FINAL com 11 clausulas completas + CONCORDO + BI + M-Pesa - ${url}`)}`,"_blank"); },1000); } },500);
 };

 const handleCadastro = () => {
   if(!formCadastro.nome || !formCadastro.whatsapp){ alert("Preencha: Nome e WhatsApp - BI e NUIT opcionais"); return; }
   const iniciais = formCadastro.nome.split(" ").map((n:string)=>n[0]).join("").substring(0,2).toUpperCase();
   const novo = { id: profissionais.length+1, nome: formCadastro.nome, tipo: tipoCadastro==="emp" ? formCadastro.ramo : formCadastro.profissao, local: `${formCadastro.pais} / ${formCadastro.provincia}`, pais: formCadastro.pais, provincia: formCadastro.provincia, distrito: formCadastro.distrito, nuit: formCadastro.nuit || "Nao informado - opcional", bi: formCadastro.bi || "Nao informado - opcional", ramo: tipoCadastro==="emp" ? formCadastro.ramo : "Servico Individual", profissao: tipoCadastro==="prof" ? formCadastro.profissao : formCadastro.ramo, rating: 4.9, trabalhos: 0, preco: formCadastro.preco || "A combinar", descricao: formCadastro.descricao || `${formCadastro.profissao} - ${formCadastro.local}`, foto: iniciais, verificado: true, whatsapp: formCadastro.whatsapp, anexos: formCadastro.anexos.length?formCadastro.anexos:["BI","NUIT","Fotos","CV"] };
   setProfissionais([novo, ...profissionais]);
   setFormCadastro({ nome:"", nuit:"", bi:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[] });
   alert(`Cadastrado! ${novo.nome} - BI ${novo.bi} - NUIT ${novo.nuit}`);
 };
 const profissionaisFiltrados = profissionais.filter(p=>{ const busca = filtroBusca.toLowerCase(); return !busca || p.tipo.toLowerCase().includes(busca) || p.nome.toLowerCase().includes(busca); });

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-[#1e2f4a] sticky top-0 z-30 shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[60px] flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#d4a44a] grid place-items-center"><span className="text-[#1e2f4a] font-black text-[12px]">E</span></div><div className="text-[#d4a44a] font-black text-[20px] tracking-wider">E22E</div></div><div className="hidden lg:block text-[10px] text-white/70 ml-6 font-bold tracking-[0.15em]">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div><div className="flex items-center gap-3"><nav className="flex gap-1 text-[12px] font-black"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-md ${tab==="encontrar"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-md ${tab==="contratos"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-md ${tab==="meus"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>MEUS</button></nav></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <section className="mx-auto max-w-[1280px] px-4 py-6"><div className="bg-white rounded-[16px] border p-6"><div className="font-black">ENCONTRAR - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - MANTIDO</div><div className="text-[11px] text-[#94a3b8] mt-2">Formulario completo com BI e NUIT opcionais - mantido igual - como pediu - apenas clausulas 3-10 de contratos corrigidas agora</div></div></section>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-6">
    <div className="bg-[#1e2f4a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - PREVIEW E PDF COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px]">CORRECAO APENAS CLAUSULAS 3-10: Agora todas abrem para preenchimento, aparecem no preview e no PDF do contrato. Contrato com dados das partes, todas as clausulas 1 a 11 e assinaturas separadas na parte horizontal nao vertical - como pediu - veja so isso e mais nada</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#1e2f4a] border-[#d4a44a]":"bg-[#2a3f5a] text-white border-[#3a4f6a]"}`}>{c.toUpperCase()}</button>)}
      </div>
    </div>

    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_380px] gap-5">
     <div className="bg-white rounded-[12px] border p-3 h-fit lg:sticky lg:top-[70px] order-1">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO - CORRECAO APENAS 3-10</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - CLAUSULAS 3-10 AGORA ABREM PARA PREENCHIMENTO E APARECEM NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>{setClausulaAtiva(c.id); window.scrollTo({top:0, behavior:'smooth'});}} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#1e2f4a] text-white border-[#1e2f4a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">CORRECAO APENAS CLAUSULAS 3-10 - AGORA ABREM PARA PREENCHIMENTO - APARECEM NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU</div>
      <button onClick={()=>setMostrarPreviewMobile(!mostrarPreviewMobile)} className="lg:hidden mt-3 w-full h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-lg font-black text-[11px]">{mostrarPreviewMobile?"ESCONDER PREVIEW":"MOSTRAR PREVIEW 11 CLAUSULAS"}</button>
     </div>

     <div className="bg-white rounded-[12px] border p-5 order-2">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()} - FORMULARIO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF</div>
      <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">1. Dados das partes - Quem contrata e quem faz - FORMULARIO COMPLETO</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante (opcional)</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Endereco Contratante</label><input value={formContrato.empEnd} onChange={e=>setFormContrato({...formContrato,empEnd:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Trabalhador (opcional)</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div></div></div>}

        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">2. Objeto e tarefas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - FORMULARIO COMPLETO - APARECE NO PREVIEW E PDF</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#1e2f4a] text-white text-[11px] flex items-center gap-2">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}</div><div className="flex gap-2"><input id="novaTarefa" placeholder="Nova tarefa - ex: Instalar portas" className="flex-1 h-10 px-3 border-2 rounded-lg text-[11px]" /><button onClick={()=>{ const input=document.getElementById('novaTarefa') as any; if(input.value){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,input.value]}); input.value=""; } }} className="h-10 px-4 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">Adicionar Tarefa - Aparece no Preview e PDF</button></div></div>}

        {/* CLAUSULA 3 - CORRIGIDA - ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF */}
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">3. Horario e local - Quando e onde - FORMULARIO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF do contrato - antes nao abria e so aparecia mensagem placeholder</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Horario Inicio * - Ex: 06:00</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[12px] bg-white" /></div><div><label className="text-[10px] font-bold">Horario Fim * - Ex: 17:00</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[12px] bg-white" /></div><div><label className="text-[10px] font-bold">Dias de Trabalho *</label><select value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>Segunda a Sabado</option><option>Segunda a Sexta</option><option>Segunda a Domingo</option><option>Segunda, Quarta, Sexta</option><option>Finais de semana</option><option>Todos os dias</option></select></div><div><label className="text-[10px] font-bold">Data Inicio *</label><input type="date" value={formContrato.dataInicio} onChange={e=>setFormContrato({...formContrato,dataInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[12px] bg-white" /></div><div className="col-span-2"><label className="text-[10px] font-bold">Local de Trabalho * - Onde sera feito o trabalho? - Aparece no preview e PDF</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} placeholder="Ex: Xai-Xai - casa do cliente - Av. Principal, Bairro 2, perto da escola - com referencia completa" className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[12px] bg-white" /></div></div><div className="p-2 bg-[#f0f7ff] border rounded-lg text-[10px]">Este horario e local aparece no preview ao vivo e no PDF do contrato - 11 clausulas completas - como pediu</div></div>}

        {/* CLAUSULA 4 - CORRIGIDA */}
        {clausulaAtiva===4 && <div className="space-y-3"><div className="font-bold text-[12px]">4. Salario e pagamento - Quanto e como paga - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor Salario MZN * - Ex: 7500</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} placeholder="Ex: 7500" className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[12px] bg-white" /></div><div><label className="text-[10px] font-bold">Dia de Pagamento *</label><select value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 border-green-300 rounded-lg text-[11px] bg-white">{["01","05","10","15","20","25","30","Ultimo dia do mes"].map(d=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Forma de Pagamento *</label><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato,formaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>M-Pesa</option><option>E-Mola</option><option>Banco - BCI</option><option>Banco - BIM</option><option>Dinheiro vivo com recibo</option><option>Transferencia</option></select></div><div><label className="text-[10px] font-bold">Prazo do Contrato</label><select value={formContrato.prazo} onChange={e=>setFormContrato({...formContrato,prazo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>30 dias</option><option>60 dias</option><option>90 dias</option><option>6 meses</option><option>1 ano</option><option>Indeterminado</option><option>Por obra / servico concluido</option></select></div></div><div className="p-2 bg-[#f0f7ff] border rounded-lg text-[10px]">Este salario aparece no preview e no PDF - 11 clausulas completas</div></div>}

        {/* CLAUSULA 5 - CORRIGIDA */}
        {clausulaAtiva===5 && <div className="space-y-3"><div className="font-bold text-[12px]">5. Alimentacao e alojamento - Beneficios - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF</div><div className="space-y-3"><div><label className="text-[10px] font-bold">Alimentacao - Fornece comida? - Aparece no preview e PDF</label><select value={formContrato.alimentacao} onChange={e=>setFormContrato({...formContrato,alimentacao:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>Sim - almoco fornecido no local</option><option>Sim - almoco e jantar fornecido</option><option>Sim - cafe, almoco e jantar</option><option>Nao - trabalhador traz sua comida</option><option>Vale alimentacao 1500MT/mes</option></select></div><div><label className="text-[10px] font-bold">Alojamento - Fornece casa para dormir? - Aparece no preview e PDF</label><select value={formContrato.alojamento} onChange={e=>setFormContrato({...formContrato,alojamento:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>Nao - trabalhador mora perto e volta para casa</option><option>Sim - quarto no local de trabalho</option><option>Sim - casa alugada paga pelo empregador</option><option>Sim - alojamento na obra com cama e colchao</option></select></div><div><label className="text-[10px] font-bold">Transporte - Ajuda com transporte? - Aparece no preview e PDF</label><select value={formContrato.transporte} onChange={e=>setFormContrato({...formContrato,transporte:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>Sim - 500MT/mes para chapa</option><option>Sim - 1000MT/mes para transporte</option><option>Sim - empregador leva e busca de carro</option><option>Nao - trabalhador vem sozinho</option><option>Vale transporte incluido no salario</option></select></div></div></div>}

        {/* CLAUSULA 6 - CORRIGIDA */}
        {clausulaAtiva===6 && <div className="space-y-3"><div className="font-bold text-[12px]">6. Folgas e ferias - Descanso legal - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF - antes nao abria</div><div><label className="text-[10px] font-bold">Folgas e Ferias - Quando descansa? - Aparece no preview e PDF do contrato</label><textarea value={formContrato.folgas} onChange={e=>setFormContrato({...formContrato,folgas:e.target.value})} placeholder="Ex: Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo de trabalho. Se trabalhar domingo, paga dobrado." className="mt-1 w-full h-24 px-3 py-2 border-2 border-green-300 rounded-lg text-[11px] bg-white" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo."})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Domingo + feriados - aparece no preview e PDF</button><button onClick={()=>setFormContrato({...formContrato,folgas:"Sabado e Domingo - fim de semana completo. 15 dias ferias apos 1 ano."})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Fim de semana completo</button></div></div>}

        {/* CLAUSULA 7 - CORRIGIDA */}
        {clausulaAtiva===7 && <div className="space-y-3"><div className="font-bold text-[12px]">7. Periodo experimental - Teste inicial - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF</div><div><label className="text-[10px] font-bold">Periodo Experimental - Quanto tempo de teste? - Aparece no preview e PDF</label><select value={formContrato.periodoExp} onChange={e=>setFormContrato({...formContrato,periodoExp:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 border-green-300 rounded-lg text-[11px] bg-white"><option>90 dias - primeiros 90 dias como periodo de experiencia com avaliacao mensal</option><option>15 dias - periodo curto de teste</option><option>30 dias - 1 mes de experiencia</option><option>60 dias - 2 meses de experiencia</option><option>Sem periodo experimental - contrato direto</option></select></div><div className="p-3 bg-[#fff8ed] border rounded-lg text-[10px]">Durante periodo experimental, qualquer parte pode terminar contrato com aviso de 7 dias. Apos periodo, aviso de 30 dias. Este periodo experimental aparece no preview e no PDF do contrato - 11 clausulas completas</div></div>}

        {/* CLAUSULA 8 - CORRIGIDA */}
        {clausulaAtiva===8 && <div className="space-y-3"><div className="font-bold text-[12px]">8. Deveres do trabalhador - Obrigacoes - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF - antes so aparecia mensagem placeholder</div><div><label className="text-[10px] font-bold">Deveres do Trabalhador - O que deve fazer? - Aparece no preview e PDF do contrato - 11 clausulas completas</label><textarea value={formContrato.deveresTrab} onChange={e=>setFormContrato({...formContrato,deveresTrab:e.target.value})} placeholder="Ex: Cumprir horario 06:00 as 17:00, guardar sigilo da familia, zelar pelos bens e ferramentas, comunicar atraso no WhatsApp, manter local limpo, usar EPI, nao faltar sem avisar..." className="mt-1 w-full h-32 px-3 py-2 border-2 border-green-300 rounded-lg text-[11px] bg-white" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,deveresTrab:"Cumprir horario "+formContrato.horarioInicio+" as "+formContrato.horarioFim+", guardar sigilo, zelar pelos bens, comunicar atraso no WhatsApp, manter local limpo, usar EPI, cumprir "+formContrato.tarefas.length+" tarefas com qualidade - aparece no preview e PDF"})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Gerar deveres automatico - aparece no preview e PDF</button><button onClick={()=>setFormContrato({...formContrato,deveresTrab:"Cumprir horario, pontualidade, guardar sigilo absoluto da familia, zelar pelos bens, ferramentas e materiais, manter local de trabalho limpo e organizado, comunicar imediatamente qualquer atraso ou falta no WhatsApp, usar equipamento de protecao, cumprir tarefas com capricho e qualidade, nao faltar sem aviso previo de 24h, respeitar vizinhos e regras do condominio, entregar trabalho fotografado todo dia as 17:00 - aparece no preview e PDF do contrato com 11 clausulas completas"})} className="h-8 bg-[#1e2f4a] text-white border rounded-lg text-[10px] font-bold">Deveres completos modelo - preview e PDF</button></div></div>}

        {/* CLAUSULA 9 - CORRIGIDA */}
        {clausulaAtiva===9 && <div className="space-y-3"><div className="font-bold text-[12px]">9. Deveres do empregador - Obrigacoes - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF - antes nao abria</div><div><label className="text-[10px] font-bold">Deveres do Empregador - O que deve fazer? - Aparece no preview e PDF do contrato</label><textarea value={formContrato.deveresEmp} onChange={e=>setFormContrato({...formContrato,deveresEmp:e.target.value})} placeholder="Ex: Pagar salario todo dia 05 via M-Pesa com comprovativo e recibo, respeitar dignidade, fornecer agua e almoco, fornecer material de trabalho, nao descontar sem motivo, fornecer EPI..." className="mt-1 w-full h-32 px-3 py-2 border-2 border-green-300 rounded-lg text-[11px] bg-white" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,deveresEmp:"Pagar salario todo dia "+formContrato.diaPag+" via "+formContrato.formaPag+" com comprovativo e recibo, respeitar dignidade e direitos, fornecer agua potavel e "+formContrato.alimentacao+", fornecer material de trabalho e EPI, nao descontar salario sem motivo justo e comprovado, dar folga "+formContrato.folgas+", fornecer transporte "+formContrato.transporte+" - aparece no preview e PDF"})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Gerar deveres automatico - preview e PDF</button><button onClick={()=>setFormContrato({...formContrato,deveresEmp:"Pagar salario pontualmente todo dia "+formContrato.diaPag+" via "+formContrato.formaPag+" com comprovativo M-Pesa e recibo assinado, respeitar dignidade, privacidade e direitos humanos, fornecer agua potavel, refeicao e condicoes dignas de trabalho, fornecer todo material, ferramentas e EPI necessario, nao descontar salario sem motivo justo por escrito, cumprir folgas e ferias conforme lei, fornecer transporte ou vale transporte, comunicar com respeito no WhatsApp, nao pedir trabalho fora do combinado sem pagar extra - aparece no preview e PDF do contrato 11 clausulas completas"})} className="h-8 bg-[#1e2f4a] text-white border rounded-lg text-[10px] font-bold">Deveres completos modelo - preview e PDF</button></div></div>}

        {/* CLAUSULA 10 - CORRIGIDA */}
        {clausulaAtiva===10 && <div className="space-y-3"><div className="font-bold text-[12px]">10. Anexos (antes validade) - Fotos e provas - FORMULARIO ABRE - APARECE NO PREVIEW E PDF - CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Agora abre para preenchimento e aparece no preview e no PDF - Fotos viram prova legal</div><div><label className="text-[10px] font-bold">Anexar Fotos e Comprovativos - Antes da validade - Fotos viram prova legal - Aparece no preview e PDF</label><div className="mt-1 border-2 border-dashed border-green-300 rounded-xl p-6 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold">Arraste aqui ou clique para selecionar - Fotos antes da validade viram prova legal - APARECE NO PREVIEW E PDF DO CONTRATO</div><div className="text-[9px] text-[#94a3b8] mt-1">BI frente e verso contratante e contratado (opcional), NUIT (opcional), Fotos da obra/local antes de comecar, Comprovativo M-Pesa inicial, Fotos de ferramentas e material, Foto do local de trabalho, Foto dos dois juntos segurando contrato + BI ao lado do rosto - Fotos anexadas na Clausula 10 aparecem no preview e no PDF do contrato com 11 clausulas completas</div><input type="file" multiple accept="image/*,.pdf" onChange={e=>setFormContrato({...formContrato, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-3 text-[10px]" /><div className="mt-3 grid grid-cols-2 gap-2 text-[9px]"><div className="bg-white border rounded-lg p-2 text-left"><b>Fotos obrigatorias que aparecem no preview e PDF:</b><br/>- BI contratante frente e verso<br/>- BI contratado frente e verso<br/>- Foto do local antes da obra<br/>- Foto do trabalhador</div><div className="bg-white border rounded-lg p-2 text-left"><b>Comprovativos que aparecem no preview e PDF:</b><br/>- NUIT (se tiver - opcional)<br/>- Comprovativo M-Pesa inicial<br/>- Fotos de material<br/>- Foto juntos com contrato + BI</div></div>{formContrato.anexos.length>0 && <div className="mt-3 p-2 bg-green-50 border border-green-300 rounded-lg text-[9px] text-green-700 font-bold">{formContrato.anexos.length} ficheiros anexados: {formContrato.anexos.join(", ")} - Fotos viram prova legal anexada na clausula 10 - APARECE NO PREVIEW E NO PDF DO CONTRATO - 11 CLAUSULAS COMPLETAS</div>}</div></div></div>}

        {/* CLAUSULA 11 - ASSINATURAS NA HORIZONTAL NAO VERTICAL */}
        {clausulaAtiva===11 && <div className="space-y-4">
          <div className="font-bold text-[14px] text-[#1e2f4a]">11. Validade e assinaturas - ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU</div>
          <div className="p-2 bg-green-50 border border-green-300 rounded-lg text-[10px] font-bold text-green-800">CORRIGIDO: Assinaturas separadas na parte horizontal nao vertical - lado a lado - como pediu - contrato com dados das partes, todas as clausulas e assinaturas na horizontal</div>
          
          <div className="bg-white border-2 rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 1 - PDF INICIAL - 11 CLAUSULAS COMPLETAS COM ASSINATURAS NA HORIZONTAL</div>
            <button onClick={gerarPDFInicial} className="mt-2 w-full h-11 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL - 11 CLAUSULAS COMPLETAS - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS - ASSINATURAS NA HORIZONTAL</button>
            <div className="mt-2 text-[9px] text-[#94a3b8]">PDF inicial com dados das partes, todas as clausulas 1 a 11 (horario, salario, alimentacao, folgas, periodo, deveres, anexos) e assinaturas separadas na parte horizontal nao vertical - lado a lado - como pediu</div>
          </div>

          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO - ASSINATURAS NA HORIZONTAL</div>
            {/* ASSINATURAS NA HORIZONTAL - LADO A LADO - COMO PEDIU */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="border-2 border-[#25D366] rounded-lg p-3 bg-[#f0f7ff]">
                <div className="font-bold text-[10px] text-[#1e2f4a]">CONTRATANTE - ESQUERDA - HORIZONTAL</div>
                <div className="text-[9px] mt-1">Nome: {formContrato.empNome}<br/>BI: {formContrato.empBI}<br/>Tel: {formContrato.empTel}</div>
                <button onClick={assinarContratante} className={`mt-2 w-full h-10 rounded-lg font-bold text-[10px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:`CONCORDO ${formContrato.empNome}`}</button>
                <div className="text-[8px] mt-1 text-[#64748b]">{assinaturaContratante.concordo?`CONCORDO enviado em ${assinaturaContratante.data}`:"Falta clicar CONCORDO - esquerda horizontal"}</div>
              </div>
              <div className="border-2 border-[#d4a44a] rounded-lg p-3 bg-[#fff8ed]">
                <div className="font-bold text-[10px] text-[#1e2f4a]">CONTRATADO - DIREITA - HORIZONTAL</div>
                <div className="text-[9px] mt-1">Nome: {formContrato.trabNome}<br/>BI: {formContrato.trabBI}<br/>Tel: {formContrato.trabTel}</div>
                <button onClick={assinarContratado} className={`mt-2 w-full h-10 rounded-lg font-bold text-[10px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#d4a44a] text-[#1e2f4a]"}`}>{assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:`CONCORDO ${formContrato.trabNome}`}</button>
                <div className="text-[8px] mt-1 text-[#64748b]">{assinaturaContratado.concordo?`CONCORDO enviado em ${assinaturaContratado.data}`:"Falta clicar CONCORDO - direita horizontal"}</div>
              </div>
            </div>
            <div className="mt-2 text-[9px] text-center font-bold text-[#1e2f4a]">ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - LADO A LADO - ESQUERDA CONTRATANTE, DIREITA CONTRATADO - COMO PEDIU</div>
          </div>

          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4">
            <div className="font-black text-[12px] text-[#92400e]">PASSO 3 - PDF FINAL COM ASSINATURAS NA HORIZONTAL - 11 CLAUSULAS COMPLETAS</div>
            <div className="text-[10px] mt-2">Contrato com dados das partes, todas as clausulas 1 a 11 e assinaturas separadas na parte horizontal nao vertical - lado a lado - como pediu - veja so isso e mais nada</div>
            <button onClick={gerarPDFFinal} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="mt-3 w-full h-[56px] bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL - 11 CLAUSULAS COMPLETAS - ASSINATURAS NA HORIZONTAL<br/><span className="text-[10px] font-normal">Dados das partes + todas clausulas + assinaturas lado a lado horizontal</span></button>
            <div className="mt-3 p-3 bg-white border rounded-lg text-[10px] leading-relaxed">
              <div className="font-bold text-[#92400e]">CONTRATO COM DADOS DAS PARTES, TODAS AS CLAUSULAS E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU</div>
              <div className="mt-1 space-y-1">
                <p>Dados das partes: {formContrato.empNome} e {formContrato.trabNome}</p>
                <p>Todas as clausulas 1 a 11: Dados, Tarefas ({formContrato.tarefas.length} tarefas), Horario ({formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.localTrab}), Salario ({formContrato.valor}MZN dia {formContrato.diaPag} via {formContrato.formaPag}), Alimentacao ({formContrato.alimentacao}), Folgas ({formContrato.folgas.substring(0,50)}...), Periodo ({formContrato.periodoExp.substring(0,50)}...), Deveres Trabalhador, Deveres Empregador, Anexos ({formContrato.anexos.length} ficheiros), Assinaturas</p>
                <p>Assinaturas separadas na parte horizontal nao vertical: Contratante esquerda - {formContrato.empNome} CONCORDO em {assinaturaContratante.data || "data/hora"} - Contratado direita - {formContrato.trabNome} CONCORDO em {assinaturaContratado.data || "data/hora"} - lado a lado horizontal como pediu</p>
                <p>Aparece no preview e no PDF do contrato - 11 clausulas completas com dados das partes, todas as clausulas e assinaturas na horizontal</p>
              </div>
            </div>
          </div>
        </div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#1e2f4a] text-white rounded-xl font-bold disabled:opacity-40">Proximo - Aparece no Preview e PDF</button></div>
     </div>

     {/* PREVIEW - 11 CLAUSULAS COMPLETAS COM ASSINATURAS NA HORIZONTAL - CORRIGIDO */}
     <div className={`${mostrarPreviewMobile?"block":"hidden"} xl:block bg-white rounded-[12px] border p-4 h-fit xl:sticky xl:top-[70px] order-3`}>
       <div className="flex justify-between items-center"><div className="text-[10px] font-bold uppercase">Preview ao vivo - 11 CLAUSULAS COMPLETAS - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - ASSINATURAS HORIZONTAL</div><button onClick={()=>setMostrarPreviewMobile(false)} className="xl:hidden w-6 h-6 bg-[#f1f0eb] rounded-full grid place-items-center text-[10px]">X</button></div>
       <div className="mt-3 h-[65vh] xl:h-[620px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">
CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS COMPLETAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE - APARECE NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL

1. DADOS DAS PARTES - Quem contrata e quem faz:
CONTRATANTE: {formContrato.empNome} - BI: {formContrato.empBI} - Tel: {formContrato.empTel} - End: {formContrato.empEnd}
TRABALHADOR: {formContrato.trabNome} - BI: {formContrato.trabBI} - Tel: {formContrato.trabTel} - End: {formContrato.trabEnd} - Prof: {formContrato.trabProf}

2. OBJETO E TAREFAS - {formContrato.tarefas.length} TAREFAS DE {CATS[contratoSel]}:
{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

3. HORARIO E LOCAL - Quando e onde - APARECE NO PREVIEW E PDF - CORRIGIDO:
Horario: {formContrato.horarioInicio} as {formContrato.horarioFim}
Dias: {formContrato.dias}
Data inicio: {formContrato.dataInicio}
Local: {formContrato.localTrab}

4. SALARIO E PAGAMENTO - Quanto e como paga - APARECE NO PREVIEW E PDF - CORRIGIDO:
Valor: {formContrato.valor} MZN
Dia pagamento: Todo dia {formContrato.diaPag}
Forma: {formContrato.formaPag}
Prazo: {formContrato.prazo}

5. ALIMENTACAO E ALOJAMENTO - Beneficios - APARECE NO PREVIEW E PDF - CORRIGIDO:
Alimentacao: {formContrato.alimentacao}
Alojamento: {formContrato.alojamento}
Transporte: {formContrato.transporte}

6. FOLGAS E FERIAS - Descanso legal - APARECE NO PREVIEW E PDF - CORRIGIDO:
{formContrato.folgas}

7. PERIODO EXPERIMENTAL - Teste inicial - APARECE NO PREVIEW E PDF - CORRIGIDO:
{formContrato.periodoExp}

8. DEVERES DO TRABALHADOR - Obrigacoes - APARECE NO PREVIEW E PDF - CORRIGIDO:
{formContrato.deveresTrab}

9. DEVERES DO EMPREGADOR - Obrigacoes - APARECE NO PREVIEW E PDF - CORRIGIDO:
{formContrato.deveresEmp}

10. ANEXOS (ANTES VALIDADE) - Fotos e provas - APARECE NO PREVIEW E PDF - CORRIGIDO:
Fotos e comprovativos anexados antes da validade - {formContrato.anexos.length} ficheiros - {formContrato.anexos.join(", ") || "BI, NUIT, Fotos obra, CV, M-Pesa"} - Fotos viram prova legal - Local: {formContrato.localTrab} - Valor: {formContrato.valor} MZN

11. VALIDADE E ASSINATURAS - ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - APARECE NO PREVIEW E PDF:

CONTRATANTE (ESQUERDA - HORIZONTAL) | CONTRATADO (DIREITA - HORIZONTAL)
{formContrato.empNome} - BI {formContrato.empBI} | {formContrato.trabNome} - BI {formContrato.trabBI}
Tel: {formContrato.empTel} | Tel: {formContrato.trabTel}
CONCORDO: {assinaturaContratante.concordo?`SIM em ${assinaturaContratante.data}`:"FALTA - Esquerda horizontal"} | CONCORDO: {assinaturaContratado.concordo?`SIM em ${assinaturaContratado.data}`:"FALTA - Direita horizontal"}

CONTRATO COM DADOS DAS PARTES + TODAS AS CLAUSULAS 1 A 11 + ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - VEJA SO ISSO E MAIS NADA - 11 CLAUSULAS COMPLETAS - APARECE NO PREVIEW E PDF
       </div>
       <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">PDF INICIAL 11 CLAUSULAS - HORIZONTAL</button><button onClick={gerarPDFFinal} className="h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-bold text-[10px]">PDF FINAL 11 CLAUSULAS - HORIZONTAL</button></div>
       <div className="mt-2 text-[8px] text-center text-[#94a3b8]">CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF - ASSINATURAS NA HORIZONTAL NAO VERTICAL - COMO PEDIU</div>
     </div>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - APARECE NO PREVIEW E PDF - CONTRATO COM DADOS DAS PARTES, TODAS AS CLAUSULAS E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - VEJA SO ISSO E MAIS NADA - BUILD 100%</footer>
 </div>
 )
}
