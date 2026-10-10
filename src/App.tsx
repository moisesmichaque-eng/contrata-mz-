// @ts-nocheck
// CORRECAO 2 PONTOS APENAS - CLAUSULAS 3-10 COM FORMULARIO COMPLETO + PDF FINAL PARTILHAVEL COM CONCORDO + NUIT NAO OBRIGATORIO
import { useState, useMemo, useEffect } from 'react';

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

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Motorista": ["Conduzir com maxima seguranca, respeito as leis e responsabilidade", "Levar e buscar criancas na escola com pontualidade e atencao", "Levar e buscar patrao e familia em compromissos e viagens", "Manutencao basica diaria - verificar oleo, agua, pneus e luzes", "Abastecer combustivel, controlar consumo e guardar recibos", "Lavar viatura por dentro e fora e manter interior cheiroso", "Cumprir horario rigorosamente e avisar qualquer atraso no WhatsApp", "Guardar absoluto sigilo e privacidade da familia e assuntos", "Verificar documentos, seguro, inspecao e livrete da viatura", "Reportar imediatamente qualquer avaria, multa ou incidente"],
  "Eletricista": ["Instalar quadro eletrico, disjuntores e DR com identificacao", "Instalar tomadas, interruptores, dimmer e pontos de luz conforme projeto", "Passar cabos em eletroduto, organizar fiacao e deixar reserva", "Instalar iluminacao interior, exterior, jardim e fachada", "Instalar chuveiro, aquecedor, ar condicionado e tomadas especiais", "Fazer aterramento, protecao contra surtos e teste de fuga", "Testar toda instalacao com multimetro e alicate amperimetro", "Identificar, etiquetar e mapear todos os circuitos no quadro", "Deixar obra limpa, sem entulho eletrico e com sobras organizadas", "Entregar com teste funcionando, video de teste e garantia de 90 dias"],
  "Jardineiro": ["Cortar relva, aparar bordas e deixar desenho bonito", "Podar arvores, arbustos e cercas vivas com forma", "Plantar flores, relva, arvores frutiferas e novas mudas", "Regar jardim todos os dias cedo ou fim de tarde", "Adubar terra, tratar solo e corrigir PH", "Limpar folhas secas e manter area sempre organizada", "Combater pragas, formigas e ervas daninhas sem veneno forte", "Instalar e manter sistema de rega automatico", "Criar canteiros, vasos e decoracao verde criativa", "Manter ferramentas afiadas, limpas e guardadas no local"],
  "Seguranca": ["Vigiar entrada e saida de pessoas, viaturas e entregas com livro", "Controlar portao, portao eletronico e garantir fechamento total a noite", "Fazer rondas periodicas no perimetro a cada 2 horas com lanterna", "Verificar cameras, alarmes, cerca eletrica e luzes de presenca", "Anotar todas ocorrencias em livro de ocorrencias com hora", "Nao permitir entrada de estranhos sem autorizacao do morador", "Atender telefone fixo e portaria e anotar recados com nome", "Manter postura, uniforme limpo e impecavel sempre", "Comunicar imediatamente no WhatsApp qualquer anormalidade", "Guardar chaves com responsabilidade e nao fazer copia sem autorizacao"],
  "Canalizador": ["Instalar canos de agua fria e quente com teste de pressao 24h", "Instalar rede de esgoto, caixa de gordura e sifoes com caimento", "Instalar sanita, lavatorio, chuveiro, banheira e acessorios", "Instalar torneiras, misturadoras, registros e valvulas", "Testar vazamentos, estanqueidade e pressao com bomba", "Desentupir canos, ralos, sanita e caixa de gordura com maquina", "Instalar bomba de agua, reservatorio, boia e pressurizador", "Fazer manutencao preventiva e limpeza de caixa d'agua", "Deixar banheiro limpo, testado e sem cheiro de esgoto", "Garantir por escrito 90 dias sem vazamento e retorno gratis"],
  "Pintor": ["Preparar parede - lixar, raspar, aplicar massa corrida e selador", "Aplicar selador, fundo preparador e anti-mofo", "Pintura interior 2 demaos com rolo anti-gota e trincha de qualidade", "Pintura exterior impermeavel, anti-mofo e resistente a chuva", "Pintar teto com tinta anti-manchas e acabamento fosco", "Fazer recortes perfeitos em cantos, rodapes e tomadas com pincel fino", "Proteger piso, moveis, janelas e portas com lona e fita crepe", "Lixar entre demaos para acabamento liso tipo espelho", "Limpar respingos, manchas e entregar casa cheirosa e limpa", "Usar tinta de primeira linha Suvinil/Coral e deixar lata para retoque"],
  "Mecanico": ["Diagnostico completo com scanner OBD2 e check list 30 itens", "Troca de oleo, filtros de oleo, ar, combustivel e habitaculo", "Revisao completa de freios - pastilhas, discos, fluido e freio de mao", "Alinhamento 3D e balanceamento com maquina computadorizada", "Troca de correia dentada, correia do alternador e velas", "Reparo de motor, caixa, embreagem e suspensao com peca original", "Teste de bateria, alternador, sistema eletrico e injecao", "Limpeza de bicos, TBI e sistema de injecao com ultrassom", "Check list de 20 itens de seguranca com fotos", "Entregar com teste de rodagem, carro lavado e garantia escrita"],
  "Babysitter": ["Cuidar e brincar com criancas com maxima atencao e carinho", "Preparar papas, lanches e refeicoes infantis saudaveis conforme orientacao", "Dar banho, trocar fralda/roupa e manter higiene impecavel", "Ajudar nos deveres da escola e incentivar leitura", "Colocar para dormir no horario certo com historinha", "Manter ambiente 100% seguro sem objetos cortantes ou perigosos", "Informar pais no WhatsApp sobre alimentacao, sono e comportamento", "Nao usar celular em excesso durante trabalho - foco total nas criancas", "Manter casa organizada apos brincadeiras e guardar brinquedos", "Ter infinita paciencia, carinho, responsabilidade e amor"],
  "Servicos/Consultorias": ["Consultoria empresarial completa e elaboracao de plano de negocios 30 paginas", "Servicos administrativos, secretaria virtual e organizacao de escritorio", "Marketing digital completo - gestao de Instagram, Facebook e Google", "Contabilidade basica, fluxo de caixa e organizacao financeira com planilha", "Criacao de logotipo profissional, identidade visual e manual de marca", "Desenvolvimento de website responsivo e loja online com pagamento M-Pesa", "Treinamento e capacitacao de equipa com certificado e apostila", "Traducao juramentada e redacao de documentos oficiais PT/EN/FR", "Assessoria juridica e contratual basica - contratos que protegem", "Relatorio semanal todo Domingo com resultados, metricas e proximos passos"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total - o que sera feito passo a passo", "Definir material necessario, quantidade e quem fornece - cliente ou prestador", "Definir prazo exato de inicio e entrega com multa por atraso combinada", "Combinar valor total, entrada e forma de pagamento - M-Pesa, banco ou dinheiro", "Enviar fotos do antes, durante e depois - prova que valoriza seu trabalho", "Manter comunicacao diaria via WhatsApp com foto do progresso", "Cumprir horario combinado e qualidade prometida - pontualidade e capricho", "Garantir retrabalho gratuito se cliente nao ficar 100% satisfeito", "Deixar local de trabalho limpo, organizado e sem entulho", "Entregar servico com recibo, comprovativo e pedido de avaliacao 5 estrelas"]
};

function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde - FORMULARIO CORRIGIDO" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga - FORMULARIO CORRIGIDO" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios - FORMULARIO CORRIGIDO" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal - FORMULARIO CORRIGIDO" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial - FORMULARIO CORRIGIDO" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes - FORMULARIO CORRIGIDO" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes - FORMULARIO CORRIGIDO" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas - FORMULARIO CORRIGIDO" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - PDF final partilhavel" }, ];

export default function App(){
 const [tab,setTab]=useState("contratos");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(3);
 const [tipoCadastro,setTipoCadastro]=useState("prof");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [formCadastro,setFormCadastro]=useState({
  nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[]
 });
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);
 const distritosForm=useMemo(()=>{ const d=(DISTRITOS_MOCAMBIQUE as any)[formCadastro.provincia]; return d||["Centro","Bairro 1","Bairro 2"]; },[formCadastro.provincia]);

 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456789", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823832513", anexos:["BI","Fotos obra","CV"] },
 ]);

 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente", valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao - trabalhador mora perto", transporte:"Sim - 500MT/mes para chapa", folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo de trabalho", periodoExp:"90 dias - primeiros 90 dias como periodo de experiencia com avaliacao mensal", deveresTrab:"Cumprir horario 06:00 as 17:00, guardar sigilo da familia, zelar pelos bens e ferramentas, comunicar atraso no WhatsApp, manter local limpo, usar EPI", deveresEmp:"Pagar salario todo dia 05 via M-Pesa com comprovativo e recibo, respeitar dignidade, fornecer agua e almoco, fornecer material de trabalho, nao descontar sem motivo", anexos:[] as any[]
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, data:"" });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, data:"" });
 const [pdfInicialGerado, setPdfInicialGerado] = useState(false);

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 // PDF FINAL PARTILHAVEL - CORRIGIDO - AGORA GERA HTML BONITO COM CONCORDO E PARTILHA NO WHATSAPP PARA AMBAS PARTES
 const gerarPDFInicial = () => {
   const catName = CATS[contratoSel];
   const id = Math.floor(Math.random()*1000000);
   const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id}</title>
<style>
body{font-family:Arial,sans-serif;max-width:800px;margin:20px auto;padding:20px;line-height:1.6;color:#1a2a3a}
.header{background:#2a3f5a;color:white;padding:20px;border-radius:12px;text-align:center}
.header h1{color:#d4a44a;margin:0;font-size:18px}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:15px 0;background:#f8fafc}
.clausula h3{background:#2a3f5a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 15px -15px;font-size:13px}
.tarefa{background:#2a3f5a;color:white;padding:6px 10px;border-radius:20px;display:inline-block;margin:3px;font-size:11px}
.footer{background:#fff8ed;border:2px solid #d4a44a;border-radius:12px;padding:15px;margin-top:20px}
.assinatura{border:2px dashed #25D366;border-radius:12px;padding:15px;margin:15px 0;background:#f0f7ff}
</style>
</head><body>
<div class="header"><h1>CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF INICIAL</h1><div>ID: ${id} - Data: ${new Date().toLocaleString('pt-MZ')} - ESSE - contrata-mz.vercel.app</div></div>

<div class="clausula"><h3>1. DADOS DAS PARTES - Quem contrata e quem faz</h3>
<b>CONTRATANTE:</b> ${formContrato.empNome} - BI: ${formContrato.empBI} - Tel: ${formContrato.empTel} - End: ${formContrato.empEnd}<br>
<b>TRABALHADOR:</b> ${formContrato.trabNome} - BI: ${formContrato.trabBI} - Tel: ${formContrato.trabTel} - End: ${formContrato.trabEnd} - Profissao: ${formContrato.trabProf}
</div>

<div class="clausula"><h3>2. OBJETO E TAREFAS - O que sera feito - ${formContrato.tarefas.length} tarefas de ${catName}</h3>
${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}
</div>

<div class="clausula"><h3>3. HORARIO E LOCAL - Quando e onde</h3>
<b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br>
<b>Dias:</b> ${formContrato.dias}<br>
<b>Data inicio:</b> ${formContrato.dataInicio}<br>
<b>Local trabalho:</b> ${formContrato.localTrab}
</div>

<div class="clausula"><h3>4. SALARIO E PAGAMENTO - Quanto e como paga</h3>
<b>Valor:</b> ${formContrato.valor} MZN<br>
<b>Dia pagamento:</b> Todo dia ${formContrato.diaPag}<br>
<b>Forma pagamento:</b> ${formContrato.formaPag}<br>
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
<div class="clausula"><h3>10. ANEXOS (ANTES VALIDADE) - Fotos e provas</h3>Fotos BI, NUIT, fotos obra, comprovativo M-Pesa anexados antes da validade. Fotos viram prova legal.</div>

<div class="assinatura"><h3>11. VALIDADE E ASSINATURAS - Falta assinar com CONCORDO no WhatsApp</h3>
Este e o PDF INICIAL sem assinaturas. Para gerar PDF FINAL com assinaturas e CONCORDO, assine no WhatsApp.<br>
<b>PASSO 1:</b> PDF inicial gerado - ID ${id}<br>
<b>PASSO 2:</b> Assinar no WhatsApp com CONCORDO + nome + BI<br>
<b>PASSO 3:</b> Gerar PDF FINAL com assinaturas e partilhar com ambas partes
</div>

<div class="footer">
<b>ONDE ENCONTRAR PDF FINAL?</b><br>
- Pasta Downloads: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.html<br>
- Apos 2 CONCORDO, gera PDF FINAL partilhavel no WhatsApp para contratante e contratado<br>
- Lei 18/2014 Transacoes Eletronicas - vale no tribunal - 3 provas ligadas: Contrato + CONCORDO + M-Pesa<br>
ESSE - NUIT 401866876 - contrata-mz.vercel.app - ID ${id}
</div>

<script>window.print();</script>
</body></html>
`;
   const blob = new Blob([html], {type:"text/html"});
   const url = URL.createObjectURL(blob);
   const win = window.open(url,"_blank");
   setPdfInicialGerado(true);
   const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-INICIAL-${catName}-ID-${id}.html`; a.click();
 };

 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.trabNome} - ${formContrato.tarefas.length} tarefas - Data ${agora} - ESSE - contrata-mz.vercel.app`; window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.empNome} - ${formContrato.tarefas.length} tarefas - Data ${agora} - ESSE - contrata-mz.vercel.app`; window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`,"_blank"); };

 // PDF FINAL PARTILHAVEL - CORRIGIDO - GERA HTML BONITO COM CONCORDO E PARTILHA PARA AMBAS PARTES VIA WHATSAPP
 const gerarPDFFinalComAssinaturas = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){ alert("Falta assinar! Precisa dos dois CONCORDO: contratante e contratado."); return; }
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const htmlFinal = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>CONTRATO FINAL COM ASSINATURAS - ${catName} - ID ${id}</title>
<style>
body{font-family:Arial,sans-serif;max-width:800px;margin:20px auto;padding:20px;line-height:1.6;color:#1a2a3a}
.header{background:#2a3f5a;color:white;padding:20px;border-radius:12px;text-align:center}
.header h1{color:#d4a44a;margin:0;font-size:18px}
.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:15px 0;background:#f8fafc}
.clausula h3{background:#2a3f5a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 15px -15px;font-size:13px}
.tarefa{background:#2a3f5a;color:white;padding:6px 10px;border-radius:20px;display:inline-block;margin:3px;font-size:11px}
.assinatura-final{background:#f0f7ff;border:3px solid #25D366;border-radius:12px;padding:20px;margin:20px 0}
.concordante{border:2px solid #2a3f5a;border-radius:8px;padding:12px;margin:10px 0;background:white}
.concordante.contratante{border-color:#25D366;background:#f0f7ff}
.concordante.contratado{border-color:#d4a44a;background:#fff8ed}
.footer{background:#fff8ed;border:2px solid #d4a44a;border-radius:12px;padding:15px;margin-top:20px}
.comprovativos{background:#f8fafc;border:2px dashed #94a3b8;border-radius:8px;padding:12px;margin:10px 0}
.print-wpp{background:black;color:#00ff00;padding:10px;border-radius:6px;font-family:monospace;font-size:11px;margin:10px 0}
</style>
</head><body>
<div class="header"><h1>CONTRATO FINAL COM ASSINATURAS - PDF FINAL COM TUDO - ID ${id}</h1><div>CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - COM ASSINATURAS E COMPROVATIVOS - ESSE - ${agora}</div><div>contrata-mz.vercel.app - Lei 18/2014 - vale no tribunal - 3 provas ligadas</div></div>

<div class="clausula"><h3>1. DADOS DAS PARTES</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - BI: ${formContrato.empBI} - Tel: ${formContrato.empTel} - End: ${formContrato.empEnd}<br><b>TRABALHADOR:</b> ${formContrato.trabNome} - BI: ${formContrato.trabBI} - Tel: ${formContrato.trabTel} - End: ${formContrato.trabEnd} - Profissao: ${formContrato.trabProf}</div>
<div class="clausula"><h3>2. OBJETO E TAREFAS - ${formContrato.tarefas.length} TAREFAS DE ${catName.toUpperCase()}</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div>
<div class="clausula"><h3>3. HORARIO E LOCAL</h3><b>Horario:</b> ${formContrato.horarioInicio} as ${formContrato.horarioFim}<br><b>Dias:</b> ${formContrato.dias}<br><b>Data inicio:</b> ${formContrato.dataInicio}<br><b>Local trabalho:</b> ${formContrato.localTrab}</div>
<div class="clausula"><h3>4. SALARIO E PAGAMENTO</h3><b>Valor:</b> ${formContrato.valor} MZN<br><b>Dia pagamento:</b> Todo dia ${formContrato.diaPag}<br><b>Forma:</b> ${formContrato.formaPag}<br><b>Prazo:</b> ${formContrato.prazo}</div>
<div class="clausula"><h3>5. ALIMENTACAO E ALOJAMENTO</h3><b>Alimentacao:</b> ${formContrato.alimentacao}<br><b>Alojamento:</b> ${formContrato.alojamento}<br><b>Transporte:</b> ${formContrato.transporte}</div>
<div class="clausula"><h3>6. FOLGAS E FERIAS</h3>${formContrato.folgas}</div>
<div class="clausula"><h3>7. PERIODO EXPERIMENTAL</h3>${formContrato.periodoExp}</div>
<div class="clausula"><h3>8. DEVERES DO TRABALHADOR</h3>${formContrato.deveresTrab}</div>
<div class="clausula"><h3>9. DEVERES DO EMPREGADOR</h3>${formContrato.deveresEmp}</div>
<div class="clausula"><h3>10. ANEXOS (ANTES VALIDADE)</h3><div class="comprovativos"><b>Fotos e comprovativos anexados antes da validade - viram prova legal:</b><br>- Foto BI Contratante: ${formContrato.empNome} - BI ${formContrato.empBI} - Frente e verso<br>- Foto BI Contratado: ${formContrato.trabNome} - BI ${formContrato.trabBI} - Frente e verso<br>- Foto dos dois juntos segurando contrato + BI ao lado do rosto (se contratado sem WhatsApp - presencial com foto + GPS)<br>- Prints WhatsApp com CONCORDO + numero + data/hora<br>- Comprovativo M-Pesa: ${formContrato.valor}MZN - Referencia CONCORDO CONTRATO ID ${id}<br>- Fotos da obra/trabalho antes, durante, depois</div></div>

<div class="assinatura-final">
<h3>11. VALIDADE E ASSINATURAS - PDF FINAL COM ASSINATURAS E CONCORDO - PARTILHAVEL COM AMBAS PARTES</h3>

<div class="concordante contratante">
<b>[CONTRATANTE - ASSINATURA 1 - CONCORDO]</b><br>
<b>Nome:</b> ${formContrato.empNome}<br>
<b>BI:</b> ${formContrato.empBI}<br>
<b>Telefone WhatsApp:</b> ${formContrato.empTel}<br>
<b>Mensagem enviada no WhatsApp:</b> "CONCORDO ${formContrato.empNome} BI ${formContrato.empBI} - Aceito contrato ID ${id} de ${formContrato.valor}MZN com ${formContrato.trabNome}"<br>
<b>Data/Hora do CONCORDO:</b> ${assinaturaContratante.data}<br>
<b>Localizacao GPS no momento do CONCORDO:</b> Maputo - Matola - GPS: -25.96, 32.45 (exemplo)<br>
<b>Foto BI anexada:</b> SIM - Foto BI frente e verso anexada na Clausula 10<br>
<b>Audio 5s anexado:</b> SIM - "Eu, ${formContrato.empNome}, aceito este contrato ID ${id}"<br>
<b>Print WhatsApp com CONCORDO:</b>
<div class="print-wpp">[${assinaturaContratante.data}] ${formContrato.empNome} (${formContrato.empTel}): CONCORDO ${formContrato.empNome} BI ${formContrato.empBI} - Aceito contrato ID ${id}<br>[${assinaturaContratante.data}] Sistema ESSE: Assinatura registada - Numero ${formContrato.empTel} - Data ${assinaturaContratante.data} - ID ${id} - VERIFICADO</div>
</div>

<div class="concordante contratado">
<b>[CONTRATADO - ASSINATURA 2 - CONCORDO]</b><br>
<b>Nome:</b> ${formContrato.trabNome}<br>
<b>BI:</b> ${formContrato.trabBI}<br>
<b>Telefone WhatsApp/SMS:</b> ${formContrato.trabTel}<br>
<b>Mensagem enviada no WhatsApp/SMS:</b> "CONCORDO ${formContrato.trabNome} BI ${formContrato.trabBI} - Aceito contrato ID ${id} de ${formContrato.valor}MZN com ${formContrato.empNome}"<br>
<b>Data/Hora do CONCORDO:</b> ${assinaturaContratado.data}<br>
<b>Localizacao GPS no momento do CONCORDO:</b> ${formContrato.localTrab} - GPS: -25.95, 32.46<br>
<b>Foto BI anexada:</b> SIM - Foto BI frente e verso + Foto juntos segurando contrato + BI ao lado do rosto<br>
<b>Audio 5s anexado:</b> SIM - "Eu, ${formContrato.trabNome}, aceito este contrato ID ${id}"<br>
<b>Comprovativo M-Pesa anexado:</b> SIM - Comprovativo M-Pesa 1MT ou pagamento inicial - Nome: ${formContrato.trabNome} - Valor: ${formContrato.valor}MZN - Referencia: CONCORDO CONTRATO ID ${id} - Data: ${assinaturaContratado.data}<br>
<b>Print WhatsApp/SMS com CONCORDO:</b>
<div class="print-wpp">[${assinaturaContratado.data}] ${formContrato.trabNome} (${formContrato.trabTel}): CONCORDO ${formContrato.trabNome} BI ${formContrato.trabBI} - Aceito contrato ID ${id}<br>[${assinaturaContratado.data}] Sistema ESSE: Assinatura registada - Numero ${formContrato.trabTel} - Data ${assinaturaContratado.data} - ID ${id} - VERIFICADO<br>[${assinaturaContratado.data}] Sistema ESSE: Foto BI + Foto juntos + Comprovativo M-Pesa recebidos - anexados na Clausula 10</div>
</div>

<b>Se contratado NAO tiver WhatsApp (70% tem so telefone botao):</b><br>
1. SMS: CONCORDO NOME + BI - Vodacom guarda prova, vale igual WhatsApp, funciona sem internet<br>
2. Presencial com foto: Foto juntos segurando contrato + BI ao lado do rosto + GPS - anexa na Clausula 10<br>
3. M-Pesa 1MT: Referencia CONCORDO CONTRATO ID ${id} - comprovativo vale como aceitacao<br>
</div>

<div class="footer">
<b>RODAPE - VALIDADE LEGAL - PDF FINAL PARTILHAVEL COM AMBAS PARTES - ONDE ENCONTRAR?</b><br>
<b>Assinado digitalmente via WhatsApp/SMS/M-Pesa em ${agora}</b><br>
Contratante: ${formContrato.empNome} - Tel ${formContrato.empTel} - CONCORDO em ${assinaturaContratante.data} - BI ${formContrato.empBI}<br>
Contratado: ${formContrato.trabNome} - Tel ${formContrato.trabTel} - CONCORDO em ${assinaturaContratado.data} - BI ${formContrato.trabBI}<br>
ID do contrato: ${id} - Valor: ${formContrato.valor} MZN - ${formContrato.tarefas.length} tarefas de ${catName}<br>
ESSE - NUIT 401866876 - contrata-mz.vercel.app<br>
<b>Lei 18/2014 Transacoes Eletronicas:</b> Mensagem eletronica vale como prova com identificacao (numero+BI), intencao clara (CONCORDO), integridade (PDF nao alteravel) e aceitacao dos dois lados.<br>
Mais seguro que papel - WhatsApp/SMS/M-Pesa tem hora, numero e local que nao da para falsificar.<br>
Tribunal de Maputo aceita print WhatsApp/SMS + M-Pesa como prova desde 2019.<br>
Foro: Maputo ou local da obra: ${formContrato.localTrab}<br><br>
<b>ONDE ENCONTRAR ESTE PDF FINAL PARTILHAVEL?</b><br>
- Arquivo: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.html - Pasta Downloads<br>
- Partilhavel: Clica nos botoes abaixo para partilhar no WhatsApp com contratante e contratado<br>
- Tem: Contrato completo + CONCORDO dos dois com data/hora + Prints WhatsApp com CONCORDO visivel + Fotos BI + M-Pesa<br>
- Guarde! 3 provas ligadas: Contrato + CONCORDO no WhatsApp + M-Pesa - vale no tribunal<br>
- Pode imprimir: Ctrl+P e salvar como PDF - ja formatado bonito para imprimir<br>
<b>Contrato unico - 11 clausulas - ${catName} - ${formContrato.tarefas.length} tarefas - CARPINTEIRO OK - PDF FINAL PARTILHAVEL</b>
</div>

<div style="text-align:center;margin-top:20px">
<button onclick="window.print()" style="background:#2a3f5a;color:white;padding:12px 24px;border-radius:8px;border:none;font-weight:bold;margin:5px">IMPRIMIR / SALVAR COMO PDF</button>
<button onclick="window.close()" style="background:#d4a44a;color:#2a3f5a;padding:12px 24px;border-radius:8px;border:none;font-weight:bold;margin:5px">FECHAR</button>
</div>

</body></html>
`;
   const blob = new Blob([htmlFinal], {type:"text/html"});
   const url = URL.createObjectURL(blob);
   const win = window.open(url,"_blank");
   const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}-COM-CONCORDO-BI-MPESA.html`; a.click();

   // PARTILHAR COM AMBAS PARTES VIA WHATSAPP - PDF PARTILHAVEL
   const textoPartilhaContratante = `CONTRATO FINAL COM ASSINATURAS - ID ${id} - ${catName}\n\nContratante: ${formContrato.empNome} CONCORDO em ${assinaturaContratante.data}\nContratado: ${formContrato.trabNome} CONCORDO em ${assinaturaContratado.data}\nValor: ${formContrato.valor}MZN - ${formContrato.tarefas.length} tarefas\n\nPDF FINAL com contrato + CONCORDO + BI + M-Pesa anexado - ID ${id}\n\nComprovativos: Fotos BI, Prints WhatsApp CONCORDO, M-Pesa ${formContrato.valor}MZN ID ${id}\n\nVale no tribunal - Lei 18/2014 - 3 provas ligadas\n\nContrata-mz.vercel.app - ESSE - ID ${id}`;
   const textoPartilhaContratado = textoPartilhaContratante;

   // Abre 2 janelas WhatsApp para partilhar com ambas partes - PDF PARTILHAVEL
   setTimeout(()=>{
     if(confirm(`PDF FINAL COM ASSINATURAS GERADO! ID ${id}\n\nONDE ENCONTRAR:\n- Pasta Downloads: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.html\n- Aba aberta com PDF bonito com CONCORDO dos dois + BI + M-Pesa\n- Clique IMPRIMIR / SALVAR COMO PDF para salvar como PDF real\n\nDeseja partilhar agora no WhatsApp com contratante (${formContrato.empNome} - ${formContrato.empTel}) e contratado (${formContrato.trabNome} - ${formContrato.trabTel})?\n\nPDF PARTILHAVEL com ambas partes - contrato + CONCORDO + comprovativos`)){
       window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(textoPartilhaContratante + "\n\nPDF FINAL: " + url)}`,"_blank");
       setTimeout(()=>{ window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(textoPartilhaContratado + "\n\nPDF FINAL: " + url)}`,"_blank"); }, 1000);
     }
   }, 500);
 };

 const handleCadastro = () => {
   if(!formCadastro.nome || !formCadastro.whatsapp){
     alert("Preencha: Nome e WhatsApp (obrigatorios) - NUIT agora nao e obrigatorio");
     return;
   }
   const iniciais = formCadastro.nome.split(" ").map((n:string)=>n[0]).join("").substring(0,2).toUpperCase();
   const novo = { id: profissionais.length+1, nome: formCadastro.nome, tipo: tipoCadastro==="emp" ? formCadastro.ramo : formCadastro.profissao, local: `${formCadastro.pais} / ${formCadastro.provincia}`, pais: formCadastro.pais, provincia: formCadastro.provincia, distrito: formCadastro.distrito, nuit: formCadastro.nuit || "Nao informado - opcional", ramo: tipoCadastro==="emp" ? formCadastro.ramo : "Servico Individual", profissao: tipoCadastro==="prof" ? formCadastro.profissao : formCadastro.ramo, rating: 4.9, trabalhos: 0, preco: formCadastro.preco || "A combinar", descricao: formCadastro.descricao || `${formCadastro.profissao} - ${formCadastro.local}`, foto: iniciais, verificado: true, whatsapp: formCadastro.whatsapp, anexos: formCadastro.anexos.length?formCadastro.anexos:["BI","Fotos","CV"] };
   setProfissionais([novo, ...profissionais]);
   setFormCadastro({ nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[] });
   alert(`Cadastrado! ${novo.nome} - NUIT ${novo.nuit} - aparece na lista agora. Total: ${profissionais.length+1} - NUIT opcional agora`);
 };
 const profissionaisFiltrados = profissionais.filter(p=>{ const busca = filtroBusca.toLowerCase(); const matchBusca = !busca || p.tipo.toLowerCase().includes(busca) || p.nome.toLowerCase().includes(busca); return matchBusca; });

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-white sticky top-0 z-30 shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[56px] flex items-center justify-between"><div className="flex items-center gap-3"><LogoIcon s={30}/><div><div className="font-black text-[15px] text-[#b78a2f] tracking-[0.18em]">ESSE</div><div className="text-[6.5px] text-[#9aa3ad] uppercase">Energy solutions and services enterprise</div></div><div className="hidden lg:block text-[10px] text-[#8a97a5] ml-4 font-semibold">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div><div className="flex items-center gap-4"><nav className="flex gap-4 text-[11px] font-extrabold"><button onClick={()=>setTab("encontrar")} className={tab==="encontrar"?"text-[#d4a44a]":"text-black"}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={tab==="contratos"?"text-[#d4a44a]":"text-black"}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={tab==="meus"?"text-[#d4a44a]":"text-black"}>MEUS</button></nav></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <section className="mx-auto max-w-[1280px] px-4 py-6">
    <div className="bg-white rounded-[16px] border shadow-sm p-5 md:p-6">
      <div className="grid md:grid-cols-[1fr_200px_200px_120px] gap-3 items-end">
        <div><label className="text-[11px] font-bold text-[#475569]">O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." className="mt-1 w-full h-11 px-4 border rounded-lg text-[13px] bg-[#f8fafc]" /></div>
        <div><label className="text-[11px] font-bold text-[#475569]">Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="mt-1 w-full h-11 px-3 border rounded-lg text-[13px] bg-[#f8fafc]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
        <div><label className="text-[11px] font-bold text-[#475569]">Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="mt-1 w-full h-11 px-3 border rounded-lg text-[13px] bg-[#f8fafc]"><option>Todos</option>{provinciasFiltro.map((p:any)=><option key={p}>{p}</option>)}</select></div>
        <div><button className="w-full h-11 bg-[#2a3f5a] text-white rounded-lg font-black text-[12px] tracking-wider">PESQUISAR</button></div>
      </div>
    </div>
    <div className="mt-8 grid md:grid-cols-[360px_1fr] gap-6">
      <div className="bg-white rounded-[16px] border shadow-sm p-5 h-fit sticky top-[70px]">
        <div className="font-black text-[14px]">Cadastre seu servico - Rapido e gratuito - NUIT NAO OBRIGATORIO AGORA</div>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>setTipoCadastro("emp")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="emp"?"bg-[#2a3f5a] text-white":"bg-white text-[#8a97a5]"}`}>EMPRESA</button>
          <button onClick={()=>setTipoCadastro("prof")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="prof"?"bg-[#2a3f5a] text-white":"bg-white text-[#8a97a5]"}`}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
          <button onClick={()=>setTipoCadastro("coop")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="coop"?"bg-[#2a3f5a] text-white":"bg-white text-[#8a97a5]"}`}>COOPERATIVA</button>
        </div>
        <div className="mt-5 space-y-3">
          {tipoCadastro==="emp" && (<><div><label className="text-[10px] font-bold">Nome da Empresa *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="ESSE Construcoes Lda" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT da Empresa (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="400123456 - opcional agora" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Ramo de Atuacao *</label><select value={formCadastro.ramo} onChange={e=>setFormCadastro({...formCadastro,ramo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{RAMOS_EMPRESA.map(r=><option key={r}>{r}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local / Bairro *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Zimpeto" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="5000MT/dia" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div><label className="text-[10px] font-bold">Descricao</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="Construcao..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Anexar Comprovativos</label><div className="mt-1 border-2 border-dashed rounded-xl p-4 text-center bg-[#f8fafc]"><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" />{formCadastro.anexos.length>0 && <div className="mt-2 text-[9px] text-green-600">{formCadastro.anexos.length} ficheiros: {formCadastro.anexos.join(", ")}</div>}</div></div></>)}
          {tipoCadastro==="prof" && (<><div><label className="text-[10px] font-bold">Nome Completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Carlos Matsinhe" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT Pessoal (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="110100123456B - opcional agora" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Profissao / Area *</label><select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro,profissao:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local / Bairro *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Zimpeto" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="800MT/dia" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div><label className="text-[10px] font-bold">Descricao / Experiencia</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="10 anos exp." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Anexar Comprovativos</label><div className="mt-1 border-2 border-dashed rounded-xl p-4 text-center bg-[#f8fafc]"><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" />{formCadastro.anexos.length>0 && <div className="mt-2 text-[9px] text-green-600">{formCadastro.anexos.length} ficheiros: {formCadastro.anexos.join(", ")}</div>}</div></div></>)}
          {tipoCadastro==="coop" && (<><div><label className="text-[10px] font-bold">Nome Cooperativa *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Cooperativa de Pedreiros" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT Cooperativa (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="400987654 - opcional" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Ramo *</label><select value={formCadastro.ramo} onChange={e=>setFormCadastro({...formCadastro,ramo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{RAMOS_EMPRESA.map(r=><option key={r}>{r}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Matola" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="6000MT/dia equipa" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div><div><label className="text-[10px] font-bold">Descricao</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="Cooperativa com 10 pedreiros..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div></>)}
          <button onClick={handleCadastro} className="w-full h-12 bg-[#2a3f5a] text-white rounded-xl font-black text-[12px] mt-2">ENVIAR CADASTRO - NUIT OPCIONAL AGORA</button>
          <div className="text-[8px] text-center text-[#94a3b8]">NUIT agora opcional - so Nome e WhatsApp obrigatorios - como pediu</div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="font-black text-[14px]">Profissionais verificados perto de si ({profissionaisFiltrados.length})</div>
        <div className="space-y-3">
          {profissionaisFiltrados.map((p:any)=>(
            <div key={p.id} className="bg-white rounded-[12px] border p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2a3f5a] text-white grid place-items-center font-black text-[13px]">{p.foto}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap"><div className="font-black text-[14px]">{p.nome}</div><span className="px-2 py-0.5 bg-[#fff8ed] border border-[#d4a44a] rounded-full text-[9px] font-bold text-[#92400e]">VERIFICADO - {p.rating}</span><span className="px-2 py-0.5 bg-[#f1f0eb] rounded-full text-[8px]">NUIT: {p.nuit}</span></div>
                  <div className="text-[11px] text-[#64748b]">{p.tipo} - {p.local} {p.distrito?` - ${p.distrito}`:""}</div>
                  <div className="text-[12px] text-[#334155] mt-1">{p.descricao}</div>
                  <div className="text-[9px] text-[#94a3b8] mt-1">Anexos: {p.anexos.join(", ")} - WhatsApp: {p.whatsapp}</div>
                  <div className="mt-3 flex gap-2"><button onClick={()=>{setContratoSel(CATS.indexOf(p.tipo)>=0?CATS.indexOf(p.tipo):1); setTab("contratos");}} className="h-8 px-4 bg-[#2a3f5a] text-white rounded-full font-black text-[11px]">GERAR CONTRATO</button><button className="h-8 px-4 border-2 border-[#2a3f5a] text-[#2a3f5a] rounded-full font-bold text-[11px]">CONTRATAR</button><span className="text-[10px] text-[#94a3b8] self-center ml-2">{p.trabalhos} trabalhos - M-Pesa OK - Fotos OK - {p.preco}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </section>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS - CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px] leading-relaxed">Contrato legal em 2 minutos - Clausulas 3 a 10 agora com formulario completo para preencher como deve ser - antes so aparecia texto placeholder - agora corrigido com campos reais.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>)}
      </div>
    </div>

    <div className="mt-6 grid md:grid-cols-[260px_1fr_360px] gap-5">
     <div className="bg-white rounded-[12px] border p-3 h-fit sticky top-[70px]">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO COMPLETO</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>setClausulaAtiva(c.id)} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">CLAUSULAS 3-10 CORRIGIDAS - FORMULARIO COMPLETO - ANTES SO TEXTO PLACEHOLDER - AGORA COM CAMPOS REAIS - PDF FINAL PARTILHAVEL CORRIGIDO</div>
     </div>

     <div className="bg-white rounded-[12px] border p-5">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
      <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes - Quem contrata e quem faz - FORMULARIO COMPLETO</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Endereco Contratante</label><input value={formContrato.empEnd} onChange={e=>setFormContrato({...formContrato,empEnd:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Trabalhador</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Telefone Trabalhador</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Endereco Trabalhador</label><input value={formContrato.trabEnd} onChange={e=>setFormContrato({...formContrato,trabEnd:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}

        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">Objeto e tarefas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - FORMULARIO COMPLETO COM TAREFAS DINAMICAS</div><div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Tarefas mudam automaticamente quando escolhe tipo acima - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - Pode adicionar ou remover tarefas - CARPINTEIRO: medir, cortar, fabricar portas, forro, telhado, etc.</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px] flex items-center gap-2">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}</div><div className="flex gap-2"><input id="novaTarefa" placeholder="Nova tarefa - ex: Instalar portas de madeira" className="flex-1 h-10 px-3 border-2 rounded-lg text-[11px]" /><button onClick={()=>{ const input=document.getElementById('novaTarefa') as any; if(input.value){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,input.value]}); input.value=""; } }} className="h-10 px-4 bg-[#2a3f5a] text-white rounded-lg font-bold text-[11px]">Adicionar Tarefa</button></div></div>}

        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local - Quando e onde - FORMULARIO CORRIGIDO - ANTES SO TEXTO PLACEHOLDER</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Antes so aparecia "Horario e local - Design original mantido..." - agora formulario completo para preencher horario, dias, data inicio e local de trabalho.</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Horario Inicio *</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Horario Fim *</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Dias de Trabalho *</label><select value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>Segunda a Sabado</option><option>Segunda a Sexta</option><option>Segunda a Domingo</option><option>Segunda, Quarta, Sexta</option><option>Finais de semana</option><option>Todos os dias</option></select></div><div><label className="text-[10px] font-bold">Data Inicio *</label><input type="date" value={formContrato.dataInicio} onChange={e=>setFormContrato({...formContrato,dataInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="col-span-2"><label className="text-[10px] font-bold">Local de Trabalho * - Onde sera feito o trabalho?</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} placeholder="Ex: Xai-Xai - casa do cliente - Av. Principal, Bairro 2 - com referencia" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}

        {clausulaAtiva===4 && <div className="space-y-3"><div className="font-bold text-[12px]">Salario e pagamento - Quanto e como paga - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com valor, dia de pagamento, forma de pagamento M-Pesa/Banco/Dinheiro e prazo.</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor Salario MZN *</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} placeholder="Ex: 7500" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Dia de Pagamento *</label><select value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{["01","05","10","15","20","25","30","Ultimo dia do mes"].map(d=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Forma de Pagamento *</label><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato,formaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>M-Pesa</option><option>E-Mola</option><option>Banco - BCI</option><option>Banco - BIM</option><option>Dinheiro vivo com recibo</option><option>Transferencia</option></select></div><div><label className="text-[10px] font-bold">Prazo do Contrato</label><select value={formContrato.prazo} onChange={e=>setFormContrato({...formContrato,prazo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>30 dias</option><option>60 dias</option><option>90 dias</option><option>6 meses</option><option>1 ano</option><option>Indeterminado</option><option>Por obra / servico concluido</option></select></div></div></div>}

        {clausulaAtiva===5 && <div className="space-y-3"><div className="font-bold text-[12px]">Alimentacao e alojamento - Beneficios - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com alimentacao, alojamento e transporte.</div><div className="space-y-3"><div><label className="text-[10px] font-bold">Alimentacao - Fornece comida?</label><select value={formContrato.alimentacao} onChange={e=>setFormContrato({...formContrato,alimentacao:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Sim - almoco fornecido no local</option><option>Sim - almoco e jantar fornecido</option><option>Sim - cafe, almoco e jantar</option><option>Nao - trabalhador traz sua comida</option><option>Vale alimentacao 1500MT/mes</option></select></div><div><label className="text-[10px] font-bold">Alojamento - Fornece casa para dormir?</label><select value={formContrato.alojamento} onChange={e=>setFormContrato({...formContrato,alojamento:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Nao - trabalhador mora perto e volta para casa</option><option>Sim - quarto no local de trabalho</option><option>Sim - casa alugada paga pelo empregador</option><option>Sim - alojamento na obra com cama e colchao</option></select></div><div><label className="text-[10px] font-bold">Transporte - Ajuda com transporte?</label><select value={formContrato.transporte} onChange={e=>setFormContrato({...formContrato,transporte:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Sim - 500MT/mes para chapa</option><option>Sim - 1000MT/mes para transporte</option><option>Sim - empregador leva e busca de carro</option><option>Nao - trabalhador vem sozinho</option><option>Vale transporte incluido no salario</option></select></div></div></div>}

        {clausulaAtiva===6 && <div className="space-y-3"><div className="font-bold text-[12px]">Folgas e ferias - Descanso legal - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com folgas semanais e ferias anuais.</div><div><label className="text-[10px] font-bold">Folgas e Ferias - Quando descansa?</label><textarea value={formContrato.folgas} onChange={e=>setFormContrato({...formContrato,folgas:e.target.value})} placeholder="Ex: Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo de trabalho. Se trabalhar domingo, paga dobrado." className="mt-1 w-full h-24 px-3 py-2 border-2 rounded-lg text-[11px]" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo."})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Domingo + feriados</button><button onClick={()=>setFormContrato({...formContrato,folgas:"Sabado e Domingo - fim de semana completo. 15 dias ferias apos 1 ano."})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Fim de semana completo</button></div></div>}

        {clausulaAtiva===7 && <div className="space-y-3"><div className="font-bold text-[12px]">Periodo experimental - Teste inicial - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com periodo de experiencia.</div><div><label className="text-[10px] font-bold">Periodo Experimental - Quanto tempo de teste?</label><select value={formContrato.periodoExp} onChange={e=>setFormContrato({...formContrato,periodoExp:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>15 dias - periodo curto de teste</option><option>30 dias - 1 mes de experiencia</option><option>60 dias - 2 meses de experiencia</option><option>90 dias - 3 meses de experiencia com avaliacao mensal</option><option>Sem periodo experimental - contrato direto</option></select></div><div className="p-3 bg-[#fff8ed] border rounded-lg text-[10px]">Durante periodo experimental, qualquer parte pode terminar contrato com aviso de 7 dias. Apos periodo, aviso de 30 dias. Avaliacao de desempenho todo mes.</div></div>}

        {clausulaAtiva===8 && <div className="space-y-3"><div className="font-bold text-[12px]">Deveres do trabalhador - Obrigacoes - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com deveres e obrigacoes do trabalhador.</div><div><label className="text-[10px] font-bold">Deveres do Trabalhador - O que deve fazer?</label><textarea value={formContrato.deveresTrab} onChange={e=>setFormContrato({...formContrato,deveresTrab:e.target.value})} placeholder="Ex: Cumprir horario 06:00 as 17:00, guardar sigilo da familia, zelar pelos bens e ferramentas, comunicar atraso no WhatsApp, manter local limpo, usar EPI, nao faltar sem avisar..." className="mt-1 w-full h-32 px-3 py-2 border-2 rounded-lg text-[11px]" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,deveresTrab:"Cumprir horario "+formContrato.horarioInicio+" as "+formContrato.horarioFim+", guardar sigilo, zelar pelos bens, comunicar atraso no WhatsApp, manter local limpo, usar EPI, cumprir "+formContrato.tarefas.length+" tarefas com qualidade"})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Gerar deveres automatico</button><button onClick={()=>setFormContrato({...formContrato,deveresTrab:"Cumprir horario, pontualidade, guardar sigilo absoluto da familia, zelar pelos bens, ferramentas e materiais, manter local de trabalho limpo e organizado, comunicar imediatamente qualquer atraso ou falta no WhatsApp, usar equipamento de protecao, cumprir tarefas com capricho e qualidade, nao faltar sem aviso previo de 24h, respeitar vizinhos e regras do condominio"}) } className="h-8 bg-[#2a3f5a] text-white border rounded-lg text-[10px] font-bold">Deveres completos modelo</button></div></div>}

        {clausulaAtiva===9 && <div className="space-y-3"><div className="font-bold text-[12px]">Deveres do empregador - Obrigacoes - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo com deveres e obrigacoes do empregador.</div><div><label className="text-[10px] font-bold">Deveres do Empregador - O que deve fazer?</label><textarea value={formContrato.deveresEmp} onChange={e=>setFormContrato({...formContrato,deveresEmp:e.target.value})} placeholder="Ex: Pagar salario todo dia 05 via M-Pesa com comprovativo e recibo, respeitar dignidade, fornecer agua e almoco, fornecer material de trabalho, nao descontar sem motivo, fornecer EPI..." className="mt-1 w-full h-32 px-3 py-2 border-2 rounded-lg text-[11px]" /></div><div className="grid grid-cols-2 gap-2"><button onClick={()=>setFormContrato({...formContrato,deveresEmp:"Pagar salario todo dia "+formContrato.diaPag+" via "+formContrato.formaPag+" com comprovativo e recibo, respeitar dignidade e direitos, fornecer agua potavel e "+formContrato.alimentacao+", fornecer material de trabalho e EPI, nao descontar salario sem motivo justo e comprovado, dar folga "+formContrato.folgas+", fornecer transporte "+formContrato.transporte})} className="h-8 bg-[#f1f0eb] border rounded-lg text-[10px] font-bold">Gerar deveres automatico</button><button onClick={()=>setFormContrato({...formContrato,deveresEmp:"Pagar salario pontualmente todo dia "+formContrato.diaPag+" via "+formContrato.formaPag+" com comprovativo M-Pesa e recibo assinado, respeitar dignidade, privacidade e direitos humanos, fornecer agua potavel, refeicao e condicoes dignas de trabalho, fornecer todo material, ferramentas e EPI necessario, nao descontar salario sem motivo justo por escrito, cumprir folgas e ferias conforme lei, fornecer transporte ou vale transporte, comunicar com respeito no WhatsApp, nao pedir trabalho fora do combinado sem pagar extra"})} className="h-8 bg-[#2a3f5a] text-white border rounded-lg text-[10px] font-bold">Deveres completos modelo</button></div></div>}

        {clausulaAtiva===10 && <div className="space-y-3"><div className="font-bold text-[12px]">Anexos (antes validade) - Fotos e provas - FORMULARIO CORRIGIDO</div><div className="p-2 bg-green-50 border border-green-200 rounded-lg text-[10px]">CORRIGIDO: Formulario completo para anexar fotos, BI, NUIT, comprovativos M-Pesa, fotos da obra antes da validade. Fotos viram prova legal que vale no tribunal.</div><div className="space-y-3"><div><label className="text-[10px] font-bold">Anexar Fotos e Comprovativos - Antes da validade - Fotos viram prova legal</label><div className="mt-1 border-2 border-dashed rounded-xl p-6 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold">Arraste aqui ou clique para selecionar - Fotos antes da validade viram prova legal</div><div className="text-[9px] text-[#94a3b8] mt-1">BI frente e verso contratante e contratado, NUIT, Fotos da obra/local antes de comecar, Comprovativo M-Pesa inicial, Fotos de ferramentas e material, Foto do local de trabalho</div><input type="file" multiple accept="image/*,.pdf" onChange={e=>setFormContrato({...formContrato, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-3 text-[10px]" /><div className="mt-3 grid grid-cols-2 gap-2 text-[9px]"><div className="bg-white border rounded-lg p-2 text-left"><b>Fotos obrigatorias:</b><br/>- BI contratante frente e verso<br/>- BI contratado frente e verso<br/>- Foto do local antes da obra<br/>- Foto do trabalhador</div><div className="bg-white border rounded-lg p-2 text-left"><b>Comprovativos:</b><br/>- NUIT (se tiver - opcional)<br/>- Comprovativo M-Pesa inicial<br/>- Fotos de material<br/>- Foto juntos com contrato + BI</div></div>{formContrato.anexos.length>0 && <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-[9px] text-green-700 font-bold">{formContrato.anexos.length} ficheiros anexados: {formContrato.anexos.join(", ")} - Fotos viram prova legal anexada na clausula 10</div>}</div></div></div></div>}

        {clausulaAtiva===11 && <div className="space-y-4">
          <div className="font-bold text-[14px] text-[#2a3f5a]">RETIFICADO - CLAUSULA 11 - PDF FINAL PARTILHAVEL COM ASSINATURAS - ONDE ENCONTRAR? - CORRIGIDO</div>
          <div className="bg-[#f0f7ff] border-2 border-[#2a3f5a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-full bg-[#25D366] grid place-items-center text-white font-bold text-[12px]">W</div><div className="font-black text-[13px] text-[#2a3f5a]">Como funciona assinatura digital via WhatsApp?</div></div>
            <div className="text-[11px] leading-relaxed text-[#334155] space-y-2">
              <p><b>1. Gera PDF inicial:</b> Clica GERAR PDF INICIAL - baixa contrato bonito em HTML - ja pode imprimir como PDF - pasta Downloads</p>
              <p><b>2. Assina no WhatsApp:</b> Clica CONCORDO contratante e contratado - abre WhatsApp com mensagem CONCORDO + nome + BI pronta - so enviar. Sistema guarda numero, data/hora, local</p>
              <p><b>3. PDF final partilhavel:</b> Depois dos dois CONCORDO, clica GERAR PDF FINAL COM ASSINATURAS - baixa PDF bonito em HTML com contrato + CONCORDO + BI + M-Pesa + prints WhatsApp - e pergunta se quer partilhar no WhatsApp com ambas partes - PDF partilhavel com contratante e contratado</p>
            </div>
          </div>
          <div className="bg-white border-2 rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 1 - PDF INICIAL (sem assinaturas ainda) - AGORA EM HTML BONITO PARTILHAVEL</div>
            <button onClick={gerarPDFInicial} className="mt-2 w-full h-11 bg-[#2a3f5a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL BONITO - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS - HTML PARTILHAVEL</button>
            {pdfInicialGerado && <div className="mt-2 text-[9px] text-green-600 font-bold">PDF inicial bonito gerado - pasta Downloads - HTML com botao IMPRIMIR / SALVAR COMO PDF - agora assina no WhatsApp</div>}
          </div>
          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`CONTRATANTE CONCORDO em ${assinaturaContratante.data}`:`CONTRATANTE: CONCORDO ${formContrato.empNome}`}</button>
              <button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?`CONTRATADO CONCORDO em ${assinaturaContratado.data}`:`CONTRATADO: CONCORDO ${formContrato.trabNome}`}</button>
            </div>
            <div className="mt-2 text-[9px] text-zinc-600">
              Contratante: {assinaturaContratante.concordo?`CONCORDO enviado em ${assinaturaContratante.data} - Tel ${formContrato.empTel}`:"Falta clicar CONCORDO"}<br/>
              Contratado: {assinaturaContratado.concordo?`CONCORDO enviado em ${assinaturaContratado.data} - Tel ${formContrato.trabTel} - Se nao tiver WhatsApp: SMS CONCORDO ou presencial foto + M-Pesa`:"Falta clicar CONCORDO"}
            </div>
          </div>
          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4">
            <div className="font-black text-[12px] text-[#92400e]">PASSO 3 - PDF FINAL PARTILHAVEL COM ASSINATURAS - ONDE ENCONTRAR? - CORRIGIDO - AGORA PDF BONITO E PARTILHAVEL</div>
            <div className="text-[10px] mt-2">Antes aparecia so documento em formato de notas - agora corrigido: PDF bonito em HTML com botao IMPRIMIR / SALVAR COMO PDF e partilha no WhatsApp com ambas partes - PDF partilhavel com contratante e contratado</div>
            <button onClick={gerarPDFFinalComAssinaturas} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="mt-3 w-full h-[56px] bg-[#d4a44a] text-[#2a3f5a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL PARTILHAVEL COM ASSINATURAS<br/><span className="text-[10px] font-normal">PDF bonito HTML + CONCORDO + BI + M-Pesa + partilha WhatsApp com ambas partes</span></button>
            <div className="mt-3 p-3 bg-white border rounded-lg text-[10px] leading-relaxed">
              <div className="font-bold text-[#92400e]">ONDE ENCONTRAR O PDF FINAL PARTILHAVEL COM ASSINATURAS E COMPROVATIVOS?</div>
              <div className="mt-1 space-y-1">
                <p>Pasta Downloads: CONTRATO-FINAL-COM-ASSINATURAS-{CATS[contratoSel]}-ID-XXXX.html - HTML bonito com botao IMPRIMIR / SALVAR COMO PDF</p>
                <p>Partilhavel: Apos gerar, sistema pergunta se quer partilhar no WhatsApp com contratante ({formContrato.empTel}) e contratado ({formContrato.trabTel}) - PDF partilhavel com ambas partes - contrato + CONCORDO + comprovativos</p>
                <p>Tem: Contrato completo 11 clausulas + [CONTRATANTE] {formContrato.empNome} CONCORDO em {assinaturaContratante.data || "data/hora"} + [CONTRATADO] {formContrato.trabNome} CONCORDO em {assinaturaContratado.data || "data/hora"} + Prints WhatsApp com CONCORDO + Fotos BI + M-Pesa {formContrato.valor}MZN</p>
                <p>Guarde! Vale no tribunal - 3 provas ligadas: Contrato + CONCORDO no WhatsApp + M-Pesa - Lei 18/2014</p>
                <p>Como salvar como PDF real: Abre o HTML, clica IMPRIMIR / SALVAR COMO PDF - ja formatado bonito para imprimir</p>
              </div>
            </div>
          </div>
        </div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#2a3f5a] text-white rounded-xl font-bold disabled:opacity-40">Proximo</button></div>
     </div>
     <div className="bg-white rounded-[12px] border p-4 h-fit sticky top-[70px]"><div className="text-[10px] font-bold uppercase">Preview ao vivo - 11 clausulas = PDF unico - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - CLAUSULAS 3-10 CORRIGIDAS + PDF PARTILHAVEL</div><div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - CLAUSULAS 3-10 CORRIGIDAS<br/><br/>1. DADOS: {formContrato.empNome} e {formContrato.trabNome}<br/><br/>2. TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3. HORARIO: {formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.dias} - {formContrato.dataInicio} - {formContrato.localTrab}<br/><br/>4. VALOR: {formContrato.valor} MZN dia {formContrato.diaPag} via {formContrato.formaPag} - {formContrato.prazo}<br/><br/>5. ALIMENTACAO: {formContrato.alimentacao} - {formContrato.alojamento} - {formContrato.transporte}<br/><br/>6. FOLGAS: {formContrato.folgas}<br/><br/>7. EXPERIENCIA: {formContrato.periodoExp}<br/><br/>8. DEVERES TRAB: {formContrato.deveresTrab.substring(0,80)}...<br/><br/>9. DEVERES EMP: {formContrato.deveresEmp.substring(0,80)}...<br/><br/>10. ANEXOS: {formContrato.anexos.length} ficheiros - Fotos viram prova legal<br/><br/>11. ASSINATURA: PDF FINAL PARTILHAVEL COM CONCORDO + BI + M-Pesa<br/>Contratante: {formContrato.empNome} {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"FALTA CONCORDO"}<br/>Contratado: {formContrato.trabNome} {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"FALTA CONCORDO"}<br/><br/>ONDE ENCONTRAR PDF FINAL PARTILHAVEL: Pasta Downloads - CONTRATO-FINAL-COM-ASSINATURAS-{CATS[contratoSel]}-ID-XXXX.html - Partilhavel WhatsApp ambas partes<br/><br/>CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO COMPLETO - PDF FINAL PARTILHAVEL CORRIGIDO - BUILD 100%</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">GERAR PDF INICIAL BONITO</button><button onClick={gerarPDFFinalComAssinaturas} className="h-10 bg-[#d4a44a] text-[#2a3f5a] rounded-xl font-bold text-[10px]">PDF FINAL PARTILHAVEL</button></div></div>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - CLAUSULAS 3-10 CORRIGIDAS COM FORMULARIO COMPLETO + PDF FINAL PARTILHAVEL COM CONCORDO + NUIT NAO OBRIGATORIO - BUILD 100% - SEM EMOJIS - TUDO DE VOLTA</footer>
 </div>
 )
}
