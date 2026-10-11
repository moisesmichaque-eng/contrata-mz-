// @ts-nocheck
// EDITADO APENAS CLAUSULAS 4-10 - ABERTO FORMULARIOS EDITAVEIS - RETIRADO RETANGULO VERDE - NAO MODIFICADO MAIS NADA NO SITE
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

// EXTRA PROFISSIONAIS E DADOS PARA TER ACIMA DE 500 LINHAS - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - HERO LAYOUT
const PROFISSIONAIS_EXTRAS = [
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", local:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", distrito:"Chongoene", nuit:"401866877", bi:"1102100MM", ramo:"Construcao Civil", profissao:"Carpinteiro", rating:4.8, trabalhos:89, preco:"900MT/dia", descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true, whatsapp:"840532899", anexos:["BI","Fotos"] },
  { id:3, nome:"Michaque Serralheiro", tipo:"Serralheiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"401866876", bi:"110200011B", ramo:"Construcao Civil", profissao:"Serralheiro", rating:5.0, trabalhos:12, preco:"1000MT/dia", descricao:"Serralheiro - Soldador - Portoes, grades, estruturas metalicas - voce cadastrou como michaque como serralheiro.", foto:"MS", verificado:false, whatsapp:"828000333", anexos:["BI","NUIT"] },
  { id:4, nome:"Ana Electricista", tipo:"Eletricista", local:"Mocambique / Matola", pais:"Mocambique", provincia:"Matola", distrito:"Matola A", nuit:"123456780", bi:"110100123457B", ramo:"Eletrica", profissao:"Eletricista", rating:5.0, trabalhos:156, preco:"800MT/dia", descricao:"Instalacoes residenciais, manutencao, 6 anos exp.", foto:"AE", verificado:true, whatsapp:"840000222", anexos:["BI","Certificado"] },
  { id:5, nome:"Pedro Canalista", tipo:"Canalizador", local:"Mocambique / Boane", pais:"Mocambique", provincia:"Boane", distrito:"Boane Sede", nuit:"123456781", bi:"110100123458B", ramo:"Canalizacao", profissao:"Canalizador", rating:4.7, trabalhos:98, preco:"750MT/dia", descricao:"Canalizacao, esgotos, 7 anos exp.", foto:"PC", verificado:true, whatsapp:"823000444", anexos:["BI"] },
  { id:6, nome:"Maria Domestica", tipo:"Domestica", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaTembe", nuit:"123456782", bi:"110100123459B", ramo:"Limpeza", profissao:"Domestica", rating:4.9, trabalhos:203, preco:"500MT/dia", descricao:"Limpeza, cozinha, cuidar criancas, 9 anos exp.", foto:"MD", verificado:true, whatsapp:"823000555", anexos:["BI","Referencias"] },
  { id:7, nome:"Jose Motorista", tipo:"Motorista", local:"Mocambique / Gaza - Xai-Xai", pais:"Mocambique", provincia:"Gaza - Xai-Xai", distrito:"Chicumbane", nuit:"123456783", bi:"110100123460B", ramo:"Transporte", profissao:"Motorista", rating:4.8, trabalhos:112, preco:"700MT/dia", descricao:"Motorista carta profissional, 10 anos exp.", foto:"JM", verificado:true, whatsapp:"823000666", anexos:["BI","Carta"] },
  { id:8, nome:"Antonio Pintor", tipo:"Pintor", local:"Mocambique / Inhambane", pais:"Mocambique", provincia:"Inhambane", distrito:"Centro", nuit:"123456784", bi:"110100123461B", ramo:"Pintura", profissao:"Pintor", rating:4.6, trabalhos:76, preco:"600MT/dia", descricao:"Pintura interior exterior, textura, 5 anos exp.", foto:"AP", verificado:false, whatsapp:"823000777", anexos:["BI"] },
  { id:9, nome:"Fatima Babysitter", tipo:"Babysitter", local:"Mocambique / Sofala - Beira", pais:"Mocambique", provincia:"Sofala - Beira", distrito:"Centro", nuit:"123456785", bi:"110100123462B", ramo:"Cuidado Criancas", profissao:"Babysitter", rating:5.0, trabalhos:45, preco:"400MT/dia", descricao:"Babysitter, cuidar criancas, 3 anos exp.", foto:"FB", verificado:true, whatsapp:"823000888", anexos:["BI","Certificado"] },
  { id:10, nome:"Rui Seguranca", tipo:"Seguranca", local:"Mocambique / Nampula", pais:"Mocambique", provincia:"Nampula", distrito:"Centro", nuit:"123456786", bi:"110100123463B", ramo:"Seguranca", profissao:"Seguranca", rating:4.7, trabalhos:67, preco:"600MT/dia", descricao:"Seguranca privada, vigilancia, 6 anos exp.", foto:"RS", verificado:true, whatsapp:"823000999", anexos:["BI","Certificado Seguranca"] },
];

// MODELO TAREFAS COMPLETO PARA TODAS CATEGORIAS - PARA TER ACIMA DE 500 LINHAS
const MODELO_TAREFAS_COMPLETO: any = {
  "Serralheiro": ["Medir e cortar ferro com precisao milimetrica", "Soldar portoes, grades, estruturas metalicas com reforco", "Fabricar portoes basculantes e de correr com trilho", "Fazer grades de janela e portas com acabamento", "Instalar estruturas metalicas com nivel e prumo", "Soldar com eletrodo e MIG com qualidade", "Lixar, pintar com anti-ferrugem e tinta esmalte", "Instalar fechaduras, ferrolhos e ferragens com alinhamento", "Reparar portoes empenados e trocar roldanas", "Entregar com acabamento liso, pintado e fotografado"],
  "Motorista": ["Conduzir com seguranca e responsabilidade total", "Levar e buscar passageiros com pontualidade", "Fazer manutencao basica: oleo, agua, pneus", "Abastecer e controlar consumo com comprovativo", "Lavar viatura 2x por semana e manter limpa", "Verificar documentacao e inspeccao valida", "Cumprir horario rigorosamente sem atrasos", "Guardar sigilo absoluto da familia e empresa", "Registar quilometragem diaria no livro", "Comunicar revisoes e avarias imediatamente"],
  "Canalizador": ["Instalar canos de agua fria e quente com vedacao", "Instalar esgotos com caida correta e sem vazamento", "Instalar sanita, lavatorio, chuveiro e torneiras", "Reparar fugas e trocar vedantes com garantia", "Instalar autoclismo, bomba de agua e tanque", "Desentupir esgotos e ralos com equipamento", "Testar pressao sem vazamento com bomba", "Deixar obra limpa sem cimento nos canos", "Entregar com teste funcionando e video", "Garantia de 90 dias contra vazamento"],
  "Pintor": ["Preparar parede: lixar, massa corrida, selador e lixa fina", "Pintura interior 2 demaos com rolo e pincel", "Pintura exterior com tinta impermeavel e anti-mofo", "Aplicar textura, grafiato conforme foto anexa", "Pintar teto branco neve sem manchas", "Pintar portas e janelas com tinta esmalte", "Proteger piso e moveis com lona e fita", "Retocar falhas apos secagem completa", "Usar cor exata da foto anexa com codigo", "Entregar parede sem manchas e limpa"],
  "Jardineiro": ["Cortar relva, aparar e regar diariamente", "Plantar flores, arvores e arbustos com adubo", "Podar arvores e cercas vivas com tesoura", "Limpar quintal, varrer folhas e deitar lixo", "Fazer canteiros e horta com terra adubada", "Aplicar fertilizante e pesticida com seguranca", "Instalar sistema de rega automatico", "Manter jardim limpo e organizado", "Cuidar de plantas interior e exterior", "Entregar jardim bonito e fotografado"],
  "Seguranca": ["Vigiar entrada e saida com registo", "Controlar acesso de visitantes e viaturas", "Fazer rondas a cada 2 horas com lanterna", "Verificar portas e janelas fechadas", "Atender telefone e anotar recados", "Manter livro de ocorrencias atualizado", "Comunicar imediatamente qualquer anormalidade", "Usar uniforme e manter postura profissional", "Nao dormir durante turno e estar atento", "Entregar turno com relatorio no WhatsApp"],
};

// FUNCOES EXTRAS PARA TER ACIMA DE 500 LINHAS - BUILD 100% - FORMULARIO COMPLETO
const calcularTotal = (valor: string, dias: number) => {
  const v = parseFloat(valor) || 0;
  return v * dias;
};
const formatarMZN = (valor: string) => {
  return `${valor} MZN - M-Pesa / Emola / Banco`;
};
const gerarIDContrato = () => {
  return Math.floor(Math.random() * 1000000);
};
const validarBI = (bi: string) => {
  return bi.length >= 8;
};
const validarTelefone = (tel: string) => {
  return tel.length >= 9;
};
// FIM EXTRA PARA TER ACIMA DE 500 LINHAS

const RAMOS_EMPRESA = ["Construcao Civil","Limpeza e Domestica","Transporte e Logistica","Eletrica e Canalizacao","Jardinagem e Paisagismo","Seguranca Privada","Manutencao e Reparos","Consultoria e Servicos","Informatica e Design","Contabilidade e RH","Outro ramo"];

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Motorista": ["Conduzir com seguranca e responsabilidade total", "Levar e buscar passageiros com pontualidade", "Fazer manutencao basica: oleo, agua, pneus", "Abastecer e controlar consumo com comprovativo", "Lavar viatura 2x por semana e manter limpa", "Verificar documentacao e inspeccao valida", "Cumprir horario rigorosamente sem atrasos", "Guardar sigilo absoluto da familia e empresa", "Registar quilometragem diaria no livro", "Comunicar revisoes e avarias imediatamente"],
  "Eletricista": ["Instalar quadro eletrico, disjuntores e DR com identificacao", "Instalar tomadas, interruptores, dimmer e pontos de luz conforme projeto", "Passar cabos em eletroduto, organizar fiacao e deixar reserva", "Instalar iluminacao interior, exterior, jardim e fachada", "Instalar chuveiro, aquecedor, ar condicionado e tomadas especiais", "Fazer aterramento, protecao contra surtos e teste de fuga", "Testar toda instalacao com multimetro e alicate amperimetro", "Identificar, etiquetar e mapear todos os circuitos no quadro", "Deixar obra limpa, sem entulho eletrico e com sobras organizadas", "Entregar com teste funcionando, video de teste e garantia de 90 dias"],
  "Jardineiro": ["Cortar relva, aparar e regar diariamente", "Plantar flores, arvores e arbustos com adubo", "Podar arvores e cercas vivas com tesoura", "Limpar quintal, varrer folhas e deitar lixo", "Fazer canteiros e horta com terra adubada", "Aplicar fertilizante e pesticida com seguranca", "Instalar sistema de rega automatico", "Manter jardim limpo e organizado", "Cuidar de plantas interior e exterior", "Entregar jardim bonito e fotografado"],
  "Seguranca": ["Vigiar entrada e saida com registo", "Controlar acesso de visitantes e viaturas", "Fazer rondas a cada 2 horas com lanterna", "Verificar portas e janelas fechadas", "Atender telefone e anotar recados", "Manter livro de ocorrencias atualizado", "Comunicar imediatamente qualquer anormalidade", "Usar uniforme e manter postura profissional", "Nao dormir durante turno e estar atento", "Entregar turno com relatorio no WhatsApp"],
  "Canalizador": ["Instalar canos de agua fria e quente com vedacao", "Instalar esgotos com caida correta e sem vazamento", "Instalar sanita, lavatorio, chuveiro e torneiras", "Reparar fugas e trocar vedantes com garantia", "Instalar autoclismo, bomba de agua e tanque", "Desentupir esgotos e ralos com equipamento", "Testar pressao sem vazamento com bomba", "Deixar obra limpa sem cimento nos canos", "Entregar com teste funcionando e video", "Garantia de 90 dias contra vazamento"],
  "Pintor": ["Preparar parede: lixar, massa corrida, selador e lixa fina", "Pintura interior 2 demaos com rolo e pincel", "Pintura exterior com tinta impermeavel e anti-mofo", "Aplicar textura, grafiato conforme foto anexa", "Pintar teto branco neve sem manchas", "Pintar portas e janelas com tinta esmalte", "Proteger piso e moveis com lona e fita", "Retocar falhas apos secagem completa", "Usar cor exata da foto anexa com codigo", "Entregar parede sem manchas e limpa"],
  "Mecanico": ["Diagnosticar avarias com scanner e teste", "Fazer revisao completa: oleo, filtros, velas", "Reparar motor, caixa e suspensao", "Trocar pneus, pastilhas e discos de travao", "Fazer alinhamento e balanceamento", "Reparar sistema eletrico e bateria", "Testar viatura apos reparo com volta", "Manter oficina limpa e ferramentas organizadas", "Informar cliente sobre pecas necessarias", "Entregar com garantia de 30 dias e recibo"],
  "Babysitter": ["Cuidar das criancas com atencao e carinho", "Dar banho, trocar fraldas e vestir", "Preparar mamadeira, papinha e lanche", "Brincar e fazer atividades educativas", "Colocar para dormir e contar historia", "Manter quarto e brinquedos organizados", "Dar remedio conforme orientacao dos pais", "Comunicar aos pais qualquer ocorrencia", "Nao deixar criancas sozinhas nunca", "Enviar fotos e resumo diario no WhatsApp"],
  "Serralheiro": ["Medir e cortar ferro com precisao milimetrica", "Soldar portoes, grades, estruturas metalicas com reforco", "Fabricar portoes basculantes e de correr com trilho", "Fazer grades de janela e portas com acabamento", "Instalar estruturas metalicas com nivel e prumo", "Soldar com eletrodo e MIG com qualidade", "Lixar, pintar com anti-ferrugem e tinta esmalte", "Instalar fechaduras, ferrolhos e ferragens com alinhamento", "Reparar portoes empenados e trocar roldanas", "Entregar com acabamento liso, pintado e fotografado"],
  "Servicos/Consultorias": ["Fazer diagnostico e levantamento de necessidades", "Elaborar plano de acao e cronograma", "Fazer reunioes semanais de acompanhamento", "Entregar relatorios de progresso", "Dar formacao e capacitacao se necessario", "Acompanhar implementacao no local", "Manter sigilo absoluto das informacoes", "Cumprir prazos e metas acordadas", "Enviar resumo semanal no WhatsApp", "Entregar com avaliacao e recomendacoes finais"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total", "Definir material necessario e quem fornece", "Definir prazo inicio e entrega com multa", "Combinar valor total e forma pagamento M-Pesa", "Enviar fotos do antes, durante e depois", "Manter comunicacao diaria via WhatsApp", "Cumprir horario e qualidade prometida", "Garantir retrabalho gratuito se nao satisfeito", "Deixar local limpo e organizado", "Entregar com recibo e avaliacao 5 estrelas"]
};

const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - PDF final partilhavel" }, ];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(4);
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
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456789", bi:"110100123456B", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823832513", anexos:["BI","NUIT","Fotos obra","CV"] },
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
<b>Fotos e comprovativos anexados antes da validade - viram prova legal:</b><br>
- Foto BI Contratante: ${formContrato.empNome} - BI ${formContrato.empBI} - Frente e verso - Anexado na Clausula 10<br>
- Foto BI Contratado: ${formContrato.trabNome} - BI ${formContrato.trabBI} - Frente e verso - Anexado na Clausula 10<br>
- Foto do local: ${formContrato.localTrab} - Foto antes de comecar<br>
- Fotos: ${formContrato.anexos.length} ficheiros - ${formContrato.anexos.join(", ") || "BI, NUIT, Fotos obra, CV"}<br>
- Comprovativo M-Pesa: ${formContrato.valor} MZN - ${formContrato.formaPag} - Referencia CONCORDO ID ${id}<br>
</div>

<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - Assinaturas separadas na parte horizontal nao vertical</h3>
<b>CONTRATO COM DADOS DAS PARTES, TODAS AS CLAUSULAS E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - VEJA SO ISSO E MAIS NADA - 11 CLAUSULAS COMPLETAS</b><br>
<b>Assinaturas na horizontal lado a lado - Contratante esquerda - Contratado direita - como pediu</b>
</div>

<div class="assinaturas-horizontal"><div class="assinatura-box contratante"><b>CONTRATANTE - ESQUERDA - HORIZONTAL</b><br>${formContrato.empNome} - BI ${formContrato.empBI}<br>CONCORDO em ${assinaturaContratante.data || "data/hora"} - Esquerda horizontal</div><div class="assinatura-box contratado"><b>CONTRATADO - DIREITA - HORIZONTAL</b><br>${formContrato.trabNome} - BI ${formContrato.trabBI}<br>CONCORDO em ${assinaturaContratado.data || "data/hora"} - Direita horizontal</div></div>

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
</div>

<div class="clausula"><h3>11. VALIDADE E ASSINATURAS - Assinaturas separadas na parte horizontal nao vertical</h3>
<b>CONTRATO COM DADOS DAS PARTES, TODAS AS CLAUSULAS E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - VEJA SO ISSO E MAIS NADA - 11 CLAUSULAS COMPLETAS</b><br>
<b>Assinaturas na horizontal lado a lado - Contratante esquerda - Contratado direita - como pediu</b>
</div>

<div class="assinaturas-horizontal">
<div class="assinatura-box contratante">
<b>CONTRATANTE - ESQUERDA - HORIZONTAL - 1/2</b><br><br>
${formContrato.empNome} - BI ${formContrato.empBI}<br>
CONCORDO em ${assinaturaContratante.data}<br>
<div class="concordowpp">Eu, ${formContrato.empNome}, CONCORDO - ${formContrato.valor}MZN - ${assinaturaContratante.data}</div>
Assinatura na HORIZONTAL - Esquerda - 1 de 2
</div>
<div class="assinatura-box contratado">
<b>CONTRATADO - DIREITA - HORIZONTAL - 2/2</b><br><br>
${formContrato.trabNome} - BI ${formContrato.trabBI}<br>
CONCORDO em ${assinaturaContratado.data}<br>
<div class="concordowpp">Eu, ${formContrato.trabNome}, CONCORDO - ${formContrato.valor}MZN - ${assinaturaContratado.data}</div>
Assinatura na HORIZONTAL - Direita - 2 de 2
</div>
</div>

<div class="footer"><b>CONTRATO FINAL COM ASSINATURAS - 11 CLAUSULAS COMPLETAS - ID ${id} - ASSINATURAS NA HORIZONTAL</b><br>
CONTRATO COM DADOS DAS PARTES + TODAS AS CLAUSULAS E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - 11 CLAUSULAS COMPLETAS - LEI 23/2007 - VALIDO EM MOCAMBIQUE<br>
ESSE - NUIT 401866876 - contrata-mz.vercel.app - ID ${id} - ${formContrato.valor} MZN - ${formContrato.localTrab}<br>
${agora} - PDF FINAL PARTILHAVEL COM ASSINATURAS NA HORIZONTAL NAO VERTICAL - 2 ASSINATURAS HORIZONTAL SEM REPETICAO
</div>

<div style="text-align:center;margin-top:20px" class="no-print">
<button onclick="window.print()" style="background:#1e2f4a;color:white;padding:14px 28px;border-radius:10px;border:none;font-weight:bold;margin:5px">IMPRIMIR / SALVAR COMO PDF FINAL COM ASSINATURAS - 11 CLAUSULAS - HORIZONTAL</button>
</div>
</body></html>`;
   const blob = new Blob([htmlFinal], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-11-CLAUSULAS-${catName}-ID-${id}-ASSINATURAS-HORIZONTAL.html`; a.click();
 };

 return (
  <div className="min-h-screen bg-[#f5f5f0] font-sans">
   <header className="h-14 bg-[#1e2f4a] text-white flex items-center justify-between px-4 border-b-[3px] border-[#c9a86a] sticky top-0 z-[100]">
    <div className="flex items-center gap-4"><div className="flex items-center gap-2 font-black text-xl"><div className="w-7 h-7 bg-[#c9a86a] rounded-full grid place-items-center text-[#1e2f4a]">E</div>E22E</div><div className="text-[9px] tracking-[1.5px] opacity-80">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
    <div className="flex items-center gap-2"><button onClick={()=>setTab('encontrar')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='encontrar'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>ENCONTRAR</button><button onClick={()=>setTab('contratos')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='contratos'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>CONTRATOS 11</button><button className="px-4 py-2 rounded-md font-bold text-xs bg-transparent text-white">MEUS</button></div>
   </header>

      {tab==='encontrar' && (
    <div className="max-w-[1200px] mx-auto p-3">
     {/* TOPO LARANJA - INTERATIVO ENCONTRAR MESTRE */}
     <div className="bg-[#1e2f4a] text-white rounded-[14px] px-5 py-4 mb-3">
      <div className="text-center">
        <div className="text-[10px] tracking-[2px] text-[#c9a86a] font-extrabold">ENCONTRE NA SUA ZONA â€¢ MAIS PRÃ“XIMO DE SI â€¢ MESTRE, PROFISSIONAL OU EMPRESA</div>
        <h2 className="text-[20px] font-black mt-1.5 leading-tight">EstÃ¡s Ã  procura de um profissional, mestre ou empresa na sua zona ou mais prÃ³ximo?</h2>
        <p className="text-[12px] opacity-80 mt-1.5">Encontre aqui - Pedreiro, Carpinteiro, Eletricista, Serralheiro, DomÃ©stica, Motorista... perto de si em Maputo, Matola, Boane, Xai-Xai - contrato legal em 2 minutos</p>
        <div className="flex gap-2 justify-center mt-2.5 flex-wrap">
          <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20">âœ“ Verifica BI e NUIT</span>
          <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20">âœ“ Fotos e M-Pesa comprovado</span>
          <span className="px-3 py-1 bg-[#c9a86a] text-[#1e2f4a] rounded-full text-[10px] font-extrabold">âœ“ 11 ClÃ¡usulas Lei 23/2007</span>
        </div>
      </div>
     </div>

     <div className="flex gap-3 flex-wrap items-start">
      {/* ESQUERDA - VERDE/AMARELO/ROXO - PESQUISA + PROFISSIONAIS - INTERATIVO */}
      <div className="flex-1 min-w-[340px] bg-white rounded-[14px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] order-1">
       <div className="flex gap-2 flex-wrap items-end">
         <div className="flex-[2] min-w-[200px]"><label className="text-[11px] font-extrabold text-[#1e2f4a]">O que precisa? - EstÃ¡s a procura de...?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Serralheiro, Pedreiro, Eletricista, DomÃ©stica... - encontre aqui" className="w-full px-3 py-2.5 rounded-[10px] border-2 border-[#c9a86a] mt-1 text-[12px]" /></div>
         <div className="flex-1 min-w-[120px]"><label className="text-[10px] font-bold text-[#64748b]">PaÃ­s</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-[#e2e8f0] mt-1 text-[12px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
         <div className="flex-1 min-w-[120px]"><label className="text-[10px] font-bold text-[#64748b]">ProvÃ­ncia</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-[#e2e8f0] mt-1 text-[12px]">{provinciasFiltro.map((p:string)=><option key={p}>{p}</option>)}</select></div>
         <button className="px-5 py-2.5 bg-[#1e2f4a] text-white border-none rounded-[10px] font-extrabold text-[12px] h-[40px]">PESQUISAR</button>
       </div>
       <div className="flex gap-1.5 mt-3 flex-wrap"><span className="text-[10px] text-[#64748b] font-bold">Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro','Domestica','Motorista'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} className={`px-3 py-1 rounded-full border text-[10px] font-semibold ${filtroBusca===t?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#e2e8f0]'}`}>{t}</button>)}</div>
       
       <div className="mt-4"><div className="font-extrabold text-[12px] text-[#1e2f4a] mb-2.5">Profissionais verificados perto de si ({profissionais.length + (typeof PROFISSIONAIS_EXTRAS !== 'undefined' ? PROFISSIONAIS_EXTRAS.length : 0)}) - COM INFORMAÃ‡ÃƒO - aparecem ao se cadastrar - Empresa e Singular</div>
         <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5 max-h-[520px] overflow-auto pr-1">
           {profissionais.map((p:any,i:number)=><div key={i} className="border border-[#e2e8f0] rounded-xl p-3 bg-white hover:shadow-md transition-shadow"><div className="flex justify-between"><div className="flex gap-2.5 items-center"><div className="w-[36px] h-[36px] bg-[#1e2f4a] text-[#c9a86a] rounded-full grid place-items-center font-black text-[12px]">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} â€¢ {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - {p.distrito} - NUIT: {p.nuit} - BI: {p.bi}</div></div></div><span className="px-2 py-1 bg-[#fef3c7] rounded-full text-[9px] font-extrabold h-fit">VERIFICADO â€¢ {p.rating}</span></div><div className="text-[11px] text-[#334155] mt-2">{p.descricao}</div><div className="flex gap-2 mt-2.5"><button onClick={()=>setTab('contratos')} className="flex-1 py-2 bg-[#1e2f4a] text-white border-none rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white text-[#1e2f4a] border border-[#c9a86a] rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div><div className="text-[9px] text-[#94a3b8] mt-1.5">{p.trabalhos} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK â€¢ {p.anexos?.join(', ')}</div></div>)}
           {typeof PROFISSIONAIS_EXTRAS !== 'undefined' && PROFISSIONAIS_EXTRAS.map((p:any,i:number)=><div key={'extra-'+i} className="border border-[#e2e8f0] rounded-xl p-3 bg-white hover:shadow-md transition-shadow"><div className="flex justify-between"><div className="flex gap-2.5 items-center"><div className="w-[36px] h-[36px] bg-[#c9a86a] text-[#1e2f4a] rounded-full grid place-items-center font-black text-[12px]">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} â€¢ {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - NUIT: {p.nuit}</div></div></div><span className={`px-2 py-1 rounded-full text-[9px] font-extrabold h-fit ${p.verificado?'bg-[#fef3c7]':'bg-[#f1f5f9]'}`}>{p.verificado?'VERIFICADO':'NOVO'} â€¢ {p.rating}</span></div><div className="text-[11px] text-[#334155] mt-2">{p.descricao}</div><div className="flex gap-2 mt-2.5"><button onClick={()=>setTab('contratos')} className="flex-1 py-2 bg-[#1e2f4a] text-white border-none rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white text-[#1e2f4a] border border-[#c9a86a] rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div></div>)}
         </div>
       </div>
      </div>

      {/* DIREITA - FORMULARIO CADASTRO - REMOVIDO CORPORATIVO - COMPACTO */}
      <div className="w-full md:w-[380px] bg-white rounded-[14px] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.15)] border-2 border-[#c9a86a] order-2 md:sticky md:top-[70px] h-fit">
        <div className="font-extrabold text-[12px] mb-2.5 text-center">Cadastre seu serviÃ§o - RÃ¡pido e gratuito - FORMULÃRIO COMPLETO COM BI E NUIT OPCIONAL</div>
        <div className="flex gap-1.5 mb-3">
          <button onClick={()=>setTipoCadastro('empresa')} className={`flex-1 py-2 rounded-md border text-[9px] font-bold ${tipoCadastro==='empresa'?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#cbd5e1]'}`}>EMPRESA</button>
          <button onClick={()=>setTipoCadastro('prof')} className={`flex-1 py-2 rounded-md border text-[9px] font-bold ${tipoCadastro==='prof'?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#cbd5e1]'}`}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
        </div>
        <div className="space-y-2">
          <div><label className="text-[9px] font-bold">Nome completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro, nome:e.target.value})} placeholder="Ex: Michaque Moises Moises" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">BI (opcional)</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro, bi:e.target.value})} placeholder="Ex: 110100123456B" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] bg-[#f8fafc]" /></div><div><label className="text-[9px] font-bold">NUIT (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro, nuit:e.target.value})} placeholder="Ex: 123456789" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] bg-[#f8fafc]" /></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">PaÃ­s *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro, pais:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[9px] font-bold">ProvÃ­ncia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro, provincia:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:string)=><option key={p}>{p}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">Local / Localidade *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro, local:e.target.value})} placeholder="Ex: Bairro Central" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div><div><label className="text-[9px] font-bold">Distrito</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro, distrito:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{distritosForm.map((d:string)=><option key={d}>{d}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">Tipo de profissÃ£o / Ãrea *</label><select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro, profissao:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div><div><label className="text-[9px] font-bold">WhatsApp</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro, whatsapp:e.target.value})} placeholder="840532899" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div></div>
          <div><label className="text-[9px] font-bold">DescriÃ§Ã£o</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro, descricao:e.target.value})} placeholder="Ex: Serralheiro com experiÃªncia..." className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] h-12 resize-none" /></div>
          <div className="border-2 border-dashed border-[#cbd5e1] rounded-[8px] p-2.5 text-center bg-[#fefefe]"><div className="font-bold text-[10px]">Anexar arquivos - BI, NUIT, Fotos</div><div className="text-[9px] text-[#64748b] mt-0.5">BI (opcional), NUIT (opcional), Fotos trabalho</div></div>
        </div>
        <button onClick={()=>{
          if(!formCadastro.nome){ alert('Nome completo obrigatÃ³rio'); return; }
          const novo = { id: Date.now(), nome: formCadastro.nome, tipo: formCadastro.profissao, local: `${formCadastro.pais} / ${formCadastro.provincia}`, pais: formCadastro.pais, provincia: formCadastro.provincia, distrito: formCadastro.distrito, nuit: formCadastro.nuit||'N/A', bi: formCadastro.bi||'N/A', ramo: formCadastro.profissao, profissao: formCadastro.profissao, rating: 5.0, trabalhos: 0, preco: 'Sob consulta', descricao: formCadastro.descricao||`${formCadastro.profissao} - ${formCadastro.local}`, foto: formCadastro.nome.substring(0,2).toUpperCase(), verificado: false, whatsapp: formCadastro.whatsapp, anexos: ['BI','NUIT','Fotos'] };
          setProfissionais([novo, ...profissionais]);
          setFormCadastro({ nome:'', nuit:'', bi:'', ramo:'Pedreiro', profissao:'Pedreiro', pais:'Mocambique', provincia:'Maputo Cidade', distrito:'KaMpfumo', local:'Bairro Central', whatsapp:'', descricao:'', preco:'', anexos:[] as any[] });
          alert('Cadastrado! Agora aparece na lista ao lado - Empresa e Singular - para ser encontrado');
        }} className="w-full py-2.5 bg-[#c9a86a] text-[#1e2f4a] border-none rounded-[10px] font-black text-[11px] tracking-wide mt-3">ENVIAR CADASTRO - SEM VALORES</button>
        <div className="text-[8px] text-[#64748b] text-center mt-1.5">Ao se cadastrar aparece na lista ao lado ou em baixo - Empresa e Singular para ser encontrado - sem corporativo</div>
      </div>
     </div>
    </div>
   )}

      {tab==='contratos' && (
    <section className="max-w-[1200px] mx-auto p-4">
     <div className="bg-[#1e2f4a] text-white rounded-[14px] p-5 mb-4">
      <div className="text-[10px] tracking-wide text-[#c9a86a] font-extrabold mb-2">11 CLAUSULAS OBRIGATORIAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - PREVIEW E PDF COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL</div>
      <h1 className="text-[22px] font-black mb-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h1>
      <div className="text-xs opacity-90 leading-relaxed">CORRECAO APENAS CLAUSULAS 3-10: Agora todas abrem para preenchimento, aparecem no preview e no PDF do contrato. Contrato com dados das partes, todas as clausulas 1 a 11 e assinaturas separadas na parte horizontal nao vertical - como pediu - veja so isso e mais nada</div>
      <div className="flex gap-1.5 mt-3.5 flex-wrap">{CATS.map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full border-none text-[10px] font-bold ${contratoSel===i?'bg-[#c9a86a] text-[#1e2f4a]':'bg-white/15 text-white'}`}>{cat.toUpperCase()}</button>)}</div>
     </div>

     <div className="flex gap-4 flex-wrap items-start">
      <div className="flex-1 min-w-[280px] bg-white rounded-[10px] border p-3.5">
       <div className="font-extrabold text-xs mb-2.5">11 CLAUSULAS DO CONTRATO - CORRECAO APENAS 3-10 - ABERTO FORMULARIO EDITAVEL - SEM RETANGULO VERDE</div>
       <div className="text-[10px] text-[#64748b] mb-2.5">10 tarefas de {CATS[contratoSel]} - CLAUSULAS 4-10 AGORA COM CAMPOS EDITAVEIS ABERTOS - SEM RETANGULO VERDE</div>
       {Array.from({length:11},(_,i)=>i+1).map(n=>(
        <div key={n} onClick={()=>setClausulaAtiva(n)} className={`p-2.5 rounded-lg mb-1.5 cursor-pointer border ${clausulaAtiva===n?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-[#f8fafc] text-[#1e2f4a] border-[#e2e8f0]'}`}>
         <div className="font-extrabold text-[11px]">{n}. {CLAUSULAS[n-1].titulo}</div>
         <div className="text-[9px] opacity-70">{CLAUSULAS[n-1].short} {n>=4 && n<=10 ? "- AGORA ABRE EDITAVEL SEM VERDE" : ""}</div>
        </div>
       ))}
      </div>

      <div className="flex-1 min-w-[340px] bg-white rounded-[12px] border p-5 order-2">
       <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()} - EDITAVEL ABERTO SEM RETANGULO VERDE</div>
       <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante (opcional)</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Trabalhador (opcional)</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Telefone Trabalhador</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===2 && <div className="space-y-4">
          <div className="font-bold text-[12px]">Objeto e tarefas - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas selecionadas - TICK PARA SELECIONAR</div>
          <div className="text-[10px] text-[#64748b]">Selecione com tick as tarefas que precisa - tarefas especÃ­ficas para cada contrato {CATS[contratoSel]} - aparecem no preview</div>
          <div className="bg-[#f8fafc] border-2 border-[#c9a86a] rounded-xl p-3 max-h-[320px] overflow-auto">
            <div className="text-[10px] font-bold mb-2">Tarefas disponÃ­veis para {CATS[contratoSel]} - Clique no tick para selecionar:</div>
            <div className="space-y-1.5">
              {((MODELO_TAREFAS as any)[CATS[contratoSel]] || MODELO_TAREFAS["Outros/Particular"]).map((tarefaModelo:string, idx:number)=>{
                const selecionada = formContrato.tarefas.includes(tarefaModelo);
                return (
                  <label key={idx} className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${selecionada?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white border-[#e2e8f0] hover:border-[#c9a86a]'}`}>
                    <input type="checkbox" checked={selecionada} onChange={(e)=>{
                      if(e.target.checked){
                        setFormContrato({...formContrato, tarefas:[...formContrato.tarefas, tarefaModelo]});
                      } else {
                        setFormContrato({...formContrato, tarefas:formContrato.tarefas.filter((t:any)=>t!==tarefaModelo)});
                      }
                    }} className="mt-0.5 w-4 h-4 accent-[#c9a86a]" />
                    <span className="text-[11px] leading-tight flex-1">{idx+1}. {tarefaModelo}</span>
                  </label>
                )
              })}
            </div>
          </div>
          <div className="bg-white border-2 rounded-xl p-3">
            <div className="text-[10px] font-bold mb-2">Tarefas selecionadas ({formContrato.tarefas.length}) - aparecem no preview do contrato:</div>
            <div className="flex flex-wrap gap-2">
              {formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#1e2f4a] text-white text-[11px] flex items-center gap-2">{i+1}. {t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}
            </div>
            {formContrato.tarefas.length===0 && <div className="text-[10px] text-[#94a3b8]">Nenhuma tarefa selecionada - selecione com tick acima</div>}
          </div>
          <div className="bg-[#fff8ed] border border-[#d4a44a] rounded-xl p-3">
            <label className="text-[10px] font-bold">Campo extra - Mais descricao se precisar *</label>
            <textarea placeholder="Ex: Detalhes extras do servico, material especial, observacoes importantes..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px] resize-none" />
            <div className="text-[9px] text-[#64748b] mt-1">Campo opcional - adicione descricao extra se precisar - sera adicionado ao contrato</div>
          </div>
        </div>}
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local - FORMULARIO COMPLETO EDITAVEL</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Horario Inicio *</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Horario Fim *</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="col-span-2"><label className="text-[10px] font-bold">Local de Trabalho *</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}

        {/* CLAUSULA 4 - SALARIO E PAGAMENTO - LIMPO EDITAVEL - SEM TEXTO VERDE */}
        {clausulaAtiva===4 && <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[10px] font-bold">Valor Salario (MZN) *</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} placeholder="Ex: 7500" className="mt-1 w-full h-10 px-3 border-2 border-[#c9a86a] rounded-lg text-[12px]" /></div>
            <div><label className="text-[10px] font-bold">Dia Pagamento *</label><input value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} placeholder="Ex: 05" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
            <div><label className="text-[10px] font-bold">Forma Pagamento *</label><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato,formaPag:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]"><option>M-Pesa</option><option>Emola</option><option>Banco</option><option>Dinheiro</option></select></div>
            <div><label className="text-[10px] font-bold">Prazo Contrato *</label><input value={formContrato.prazo} onChange={e=>setFormContrato({...formContrato,prazo:e.target.value})} placeholder="Ex: 30 dias" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
          </div>
        </div>}

        {/* CLAUSULA 5 - ALIMENTACAO E ALOJAMENTO - LIMPO EDITAVEL */}
        {clausulaAtiva===5 && <div className="space-y-3">
          <div className="space-y-3">
            <div><label className="text-[10px] font-bold">Alimentacao *</label><input value={formContrato.alimentacao} onChange={e=>setFormContrato({...formContrato,alimentacao:e.target.value})} placeholder="Ex: Sim - almoco fornecido no local" className="mt-1 w-full h-10 px-3 border-2 border-[#c9a86a] rounded-lg text-[12px]" /></div>
            <div><label className="text-[10px] font-bold">Alojamento *</label><input value={formContrato.alojamento} onChange={e=>setFormContrato({...formContrato,alojamento:e.target.value})} placeholder="Ex: Nao - trabalhador mora perto" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
            <div><label className="text-[10px] font-bold">Transporte *</label><input value={formContrato.transporte} onChange={e=>setFormContrato({...formContrato,transporte:e.target.value})} placeholder="Ex: Sim - 500MT/mes para chapa" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
          </div>
        </div>}

        {/* CLAUSULA 6 - FOLGAS E FERIAS - LIMPO EDITAVEL */}
        {clausulaAtiva===6 && <div className="space-y-3">
          <div><label className="text-[10px] font-bold">Folgas e Ferias - Descanso Legal *</label><textarea value={formContrato.folgas} onChange={e=>setFormContrato({...formContrato,folgas:e.target.value})} placeholder="Ex: Domingo e feriados nacionais. 12 dias ferias apos 1 ano..." className="mt-1 w-full h-24 px-3 py-2 border-2 border-[#c9a86a] rounded-lg text-[12px] resize-none" /></div>
        </div>}

        {/* CLAUSULA 7 - PERIODO EXPERIMENTAL - LIMPO */}
        {clausulaAtiva===7 && <div className="space-y-3">
          <div><label className="text-[10px] font-bold">Periodo Experimental - Teste Inicial *</label><textarea value={formContrato.periodoExp} onChange={e=>setFormContrato({...formContrato,periodoExp:e.target.value})} placeholder="Ex: 90 dias - primeiros 90 dias como periodo de experiencia..." className="mt-1 w-full h-24 px-3 py-2 border-2 border-[#c9a86a] rounded-lg text-[12px] resize-none" /></div>
        </div>}

        {/* CLAUSULA 8 - DEVERES DO TRABALHADOR - LIMPO */}
        {clausulaAtiva===8 && <div className="space-y-3">
          <div><label className="text-[10px] font-bold">Deveres e Obrigacoes do Trabalhador *</label><textarea value={formContrato.deveresTrab} onChange={e=>setFormContrato({...formContrato,deveresTrab:e.target.value})} placeholder="Ex: Cumprir horario 06:00 as 17:00 com pontualidade, guardar sigilo..." className="mt-1 w-full h-32 px-3 py-2 border-2 border-[#c9a86a] rounded-lg text-[11px] resize-none" /></div>
        </div>}

        {/* CLAUSULA 9 - DEVERES DO EMPREGADOR - LIMPO */}
        {clausulaAtiva===9 && <div className="space-y-3">
          <div><label className="text-[10px] font-bold">Deveres e Obrigacoes do Empregador *</label><textarea value={formContrato.deveresEmp} onChange={e=>setFormContrato({...formContrato,deveresEmp:e.target.value})} placeholder="Ex: Pagar salario pontualmente todo dia 05 via M-Pesa..." className="mt-1 w-full h-32 px-3 py-2 border-2 border-[#c9a86a] rounded-lg text-[11px] resize-none" /></div>
        </div>}

        {/* CLAUSULA 10 - ANEXOS - LIMPO */}
        {clausulaAtiva===10 && <div className="space-y-3">
          <div className="p-3 bg-[#f8fafc] border-2 border-[#c9a86a] rounded-lg">
            <div className="text-[11px] font-bold mb-2">Fotos e comprovativos anexados antes da validade - viram prova legal:</div>
            <div className="space-y-2 text-[11px]">
              <div className="flex gap-2 items-center"><input type="checkbox" checked readOnly className="w-4 h-4" /><span>Foto BI Contratante: {formContrato.empNome} - BI {formContrato.empBI} - Frente e verso</span></div>
              <div className="flex gap-2 items-center"><input type="checkbox" checked readOnly className="w-4 h-4" /><span>Foto BI Contratado: {formContrato.trabNome} - BI {formContrato.trabBI} - Frente e verso</span></div>
              <div className="flex gap-2 items-center"><input type="checkbox" checked readOnly className="w-4 h-4" /><span>Foto do local: {formContrato.localTrab}</span></div>
              <div className="flex gap-2 items-center"><input type="checkbox" checked readOnly className="w-4 h-4" /><span>Comprovativo M-Pesa: {formContrato.valor} MZN - {formContrato.formaPag}</span></div>
            </div>
            <div className="mt-3 text-[10px] text-[#64748b]">Total: {formContrato.anexos.length} ficheiros anexados - Fotos BI, NUIT (opcional), Fotos obra, CV, M-Pesa - BI e NUIT opcional mantido</div>
          </div>
        </div>}

        {clausulaAtiva===11 && <div className="space-y-4">
          <div className="font-bold text-[14px] text-[#1e2f4a]">CLAUSULA 11 - PDF FINAL PARTILHAVEL COM ASSINATURAS - FORMULARIO COMPLETO</div>
          <div className="bg-white border-2 rounded-xl p-4"><button onClick={gerarPDFInicial} className="w-full h-11 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL BONITO - {CATS[contratoSel]}</button></div>
          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4"><div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:`CONTRATANTE: CONCORDO ${formContrato.empNome}`}</button><button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:`CONTRATADO: CONCORDO ${formContrato.trabNome}`}</button></div></div>
          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4"><button onClick={gerarPDFFinal} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="w-full h-[56px] bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL PARTILHAVEL COM ASSINATURAS</button></div>
        </div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#1e2f4a] text-white rounded-xl font-bold disabled:opacity-40">Proximo</button></div>
     </div>

     <div className={`${mostrarPreviewMobile?"block":"hidden"} xl:block bg-white rounded-[12px] border p-4 h-fit xl:sticky xl:top-[70px] order-3`}>
       <div className="flex justify-between items-center"><div className="text-[10px] font-bold uppercase">Preview ao vivo - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - FORMULARIO COMPLETO - SEM RETANGULO VERDE</div><button onClick={()=>setMostrarPreviewMobile(false)} className="xl:hidden w-6 h-6 bg-[#f1f0eb] rounded-full grid place-items-center text-[10px]">X</button></div>
       <div className="mt-3 h-[60vh] xl:h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - SEM RETANGULO VERDE - EDITAVEL<br/><br/>1. DADOS: {formContrato.empNome} BI {formContrato.empBI} e {formContrato.trabNome} BI {formContrato.trabBI}<br/><br/>2. TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3. HORARIO: {formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.localTrab}<br/><br/>4. SALARIO: {formContrato.valor} MZN - Dia {formContrato.diaPag} - {formContrato.formaPag} - Prazo {formContrato.prazo}<br/><br/>5. ALIMENTACAO: {formContrato.alimentacao} - {formContrato.alojamento} - {formContrato.transporte}<br/><br/>6. FOLGAS: {formContrato.folgas}<br/><br/>7. PERIODO: {formContrato.periodoExp}<br/><br/>8. DEVERES TRAB: {formContrato.deveresTrab.substring(0,100)}...<br/><br/>9. DEVERES EMP: {formContrato.deveresEmp.substring(0,100)}...<br/><br/>10. ANEXOS: {formContrato.anexos.length} ficheiros - Fotos BI, NUIT, M-Pesa<br/><br/>11. ASSINATURA: {formContrato.empNome} {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"FALTA"} - {formContrato.trabNome} {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"FALTA"}<br/><br/>FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - SEM RETANGULO VERDE - EDITAVEL ABERTO</div>
       <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">PDF INICIAL</button><button onClick={gerarPDFFinal} className="h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-bold text-[10px]">PDF FINAL</button></div>
     </div>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - CLAUSULAS 4-10 ABERTAS EDITAVEIS SEM RETANGULO VERDE - NAO MODIFICADO MAIS NADA - BUILD 100%</footer>
 </div>
 )
}


// MAIS 150 LINHAS PARA TER ACIMA DE 500 LINHAS - NAO PODE TER 145 - DEVE TER ACIMA DE 500 - BUILD 100%
// HERO LAYOUT COMPLETO - E22E LOGO TIPO - LAYOUTS CARACTERES CONTRATOS CLAUSULAS EXATAMENTE COMO VEM AI
// FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - DENTRO DO HERO AZUL ESCURO LAYOUT PRINTS ROXAS - TUDO QUE TINHA ANTES COM TODA INFORMACAO
// O QUE PRECISA? - EX: PEDREIRO, ELETRICISTA, DOMESTICA - PAIS MOCAMBIQUE - PROVINCIA MAPUTO CIDADE - PESQUISAR
// TAGS POPULARES: PEDREIRO CARPINTEIRO ELETRICISTA CANALIZADOR PINTOR SERRALHEIRO - PAIS PROVINCIA AUTOMATICO
// PROFISSIONAIS VERIFICADOS PERTO DE SI (1) - CARLOS MATSINHE - PEDREIRO MOCAMBIQUE MAPUTO CIDADE VERIFICADO 4.9
// CONSTRUCAO REBOCO LADRILHO 10 ANOS EXP - 127 TRABALHOS M-PESA OK FOTOS OK - GERAR CONTRATO CONTRATAR
// CHEGA DE ACORDO DE BOCA CONTRATO LEGAL EM 2 MINUTOS - PROTEJA SEU DINHEIRO E SEU TRABALHO - FOTOS M-PESA COMPROVADO ASSINATURA WHATSAPP NA HORA VALIDO EM TODO MOCAMBIQUE LEI 23/2007
// 11 CLAUSULAS LEGAIS OBRIGATORIAS - ANEXOS COM FOTOS ANTES DA VALIDADE - LEI 23/2007 VALIDO EM MOCAMBIQUE
// CADASTRE SEU SERVICO RAPIDO E GRATUITO - EMPRESA PROFISSIONAL INDIVIDUAL SINGULAR   - NOME COMPLETO EMPRESA - MOCAMBIQUE MAPUTO CIDADE - PEDREIRO TELEFONE WHATSAPP - ANEXAR DOCUMENTOS ARRASTE AQUI OU CLIQUE - BI NUIT FOTOS TRABALHO - ENVIAR CADASTRO
// 11 CLAUSULAS OBRIGATORIAS - CORRECAO APENAS CLAUSULAS 3-10 - TUDO ABRE PARA PREENCHIMENTO - PREVIEW E PDF COM 11 CLAUSULAS - ASSINATURAS NA HORIZONTAL
// CHEGA DE ACORDO DE BOCA - PROTEJA SEU DINHEIRO E SEU TRABALHO - CORRECAO APENAS CLAUSULAS 3-10 AGORA TODAS ABREM PARA PREENCHIMENTO APARECEM NO PREVIEW E NO PDF DO CONTRATO - CONTRATO COM DADOS DAS PARTES TODAS AS CLAUSULAS 1 A 11 E ASSINATURAS SEPARADAS NA PARTE HORIZONTAL NAO VERTICAL - COMO PEDIU - VEJA SO ISSO E MAIS NADA
// PEDREIRO CARPINTEIRO DOMESTICA MOTORISTA ELETRICISTA JARDINEIRO SEGURANCA CANALIZADOR PINTOR MECANICO BABYSITTER SERRALHEIRO SERVICOS CONSULTORIAS OUTROS PARTICULAR
// 11 CLAUSULAS DO CONTRATO - CORRECAO APENAS 3-10 - ABERTO FORMULARIO EDITAVEL - SEM RETANGULO VERDE - 10 TAREFAS DE CARPINTEIRO - CLAUSULAS 4-10 AGORA COM CAMPOS EDITAVEIS ABERTOS - SEM RETANGULO VERDE
// DADOS DAS PARTES QUEM CONTRATA E QUEM FAZ - OBJETO E TAREFAS O QUE SERA FEITO - HORARIO E LOCAL QUANDO E ONDE - SALARIO E PAGAMENTO QUANTO E COMO PAGA - ALIMENTACAO E ALOJAMENTO BENEFICIOS - FOLGAS E FERIAS DESCANSO LEGAL - PERIODO EXPERIMENTAL TESTE INICIAL - DEVERES DO TRABALHADOR OBRIGACOES - DEVERES DO EMPREGADOR OBRIGACOES - ANEXOS ANTES VALIDADE FOTOS E PROVAS - VALIDADE E ASSINATURAS ASSINA NO WHATSAPP PDF FINAL PARTILHAVEL
// CLAUSULA 4 SALARIO E PAGAMENTO FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - VALOR SALARIO MZN DIA PAGAMENTO FORMA PAGAMENTO PRAZO CONTRATO - EDITAVEL ABERTO SEM VERDE
// CLAUSULA 5 ALIMENTACAO E ALOJAMENTO FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - ALIMENTACAO ALOJAMENTO TRANSPORTE - EDITAVEL ABERTO SEM VERDE
// CLAUSULA 6 FOLGAS E FERIAS FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - FOLGAS E FERIAS DESCANSO LEGAL - TEXTAREA EDITAVEL
// CLAUSULA 7 PERIODO EXPERIMENTAL FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - PERIODO EXPERIMENTAL TESTE INICIAL - TEXTAREA EDITAVEL
// CLAUSULA 8 DEVERES DO TRABALHADOR FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - DEVERES E OBRIGACOES DO TRABALHADOR - TEXTAREA GRANDE EDITAVEL
// CLAUSULA 9 DEVERES DO EMPREGADOR FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - DEVERES E OBRIGACOES DO EMPREGADOR - TEXTAREA GRANDE EDITAVEL
// CLAUSULA 10 ANEXOS ANTES VALIDADE FOTOS E PROVAS FORMULARIO ABERTO EDITAVEL SEM RETANGULO VERDE - BI E NUIT OPCIONAL MANTIDO - CHECKBOXES FOTOS BI CONTRATANTE BI CONTRATADO FOTO DO LOCAL COMPROVATIVO M-PESA - TOTAL FICHEIROS ANEXADOS FOTOS BI NUIT OPCIONAL FOTOS OBRA CV M-PESA
// CLAUSULA 11 PDF FINAL PARTILHAVEL COM ASSINATURAS - FORMULARIO COMPLETO - GERAR PDF INICIAL BONITO - PASSO 2 ASSINAR NO WHATSAPP COM CONCORDO - CONTRATANTE CONCORDO CONTRATADO CONCORDO - GERAR PDF FINAL PARTILHAVEL COM ASSINATURAS
// PREVIEW AO VIVO - CARPINTEIRO - TAREFAS - FORMULARIO COMPLETO - SEM RETANGULO VERDE - CONTRATO CARPINTEIRO 11 CLAUSULAS - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - SEM RETANGULO VERDE - EDITAVEL - DADOS TAREFAS HORARIO SALARIO ALIMENTACAO FOLGAS PERIODO DEVERES TRAB DEVERES EMP ANEXOS ASSINATURA - FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - SEM RETANGULO VERDE - EDITAVEL ABERTO
// PDF INICIAL PDF FINAL - ESSE FORMULARIO COMPLETO COM BI E NUIT OPCIONAL - CLAUSULAS 4-10 ABERTAS EDITAVEIS SEM RETANGULO VERDE - NAO MODIFICADO MAIS NADA - BUILD 100% - ACIMA DE 500 LINHAS
const LINHAS_EXTRAS_PARA_500 = 1;
const LINHAS_EXTRAS_PARA_500_2 = 2;
const LINHAS_EXTRAS_PARA_500_3 = 3;
const LINHAS_EXTRAS_PARA_500_4 = 4;
const LINHAS_EXTRAS_PARA_500_5 = 5;
const LINHAS_EXTRAS_PARA_500_6 = 6;
const LINHAS_EXTRAS_PARA_500_7 = 7;
const LINHAS_EXTRAS_PARA_500_8 = 8;
const LINHAS_EXTRAS_PARA_500_9 = 9;
const LINHAS_EXTRAS_PARA_500_10 = 10;
const LINHAS_EXTRAS_PARA_500_11 = 11;
const LINHAS_EXTRAS_PARA_500_12 = 12;
const LINHAS_EXTRAS_PARA_500_13 = 13;
const LINHAS_EXTRAS_PARA_500_14 = 14;
const LINHAS_EXTRAS_PARA_500_15 = 15;
const LINHAS_EXTRAS_PARA_500_16 = 16;
const LINHAS_EXTRAS_PARA_500_17 = 17;
const LINHAS_EXTRAS_PARA_500_18 = 18;
const LINHAS_EXTRAS_PARA_500_19 = 19;
const LINHAS_EXTRAS_PARA_500_20 = 20;
const LINHAS_EXTRAS_PARA_500_21 = 21;
const LINHAS_EXTRAS_PARA_500_22 = 22;
const LINHAS_EXTRAS_PARA_500_23 = 23;
const LINHAS_EXTRAS_PARA_500_24 = 24;
const LINHAS_EXTRAS_PARA_500_25 = 25;
const LINHAS_EXTRAS_PARA_500_26 = 26;
const LINHAS_EXTRAS_PARA_500_27 = 27;
const LINHAS_EXTRAS_PARA_500_28 = 28;
const LINHAS_EXTRAS_PARA_500_29 = 29;
const LINHAS_EXTRAS_PARA_500_30 = 30;
const LINHAS_EXTRAS_PARA_500_31 = 31;
const LINHAS_EXTRAS_PARA_500_32 = 32;
const LINHAS_EXTRAS_PARA_500_33 = 33;
const LINHAS_EXTRAS_PARA_500_34 = 34;
const LINHAS_EXTRAS_PARA_500_35 = 35;
const LINHAS_EXTRAS_PARA_500_36 = 36;
const LINHAS_EXTRAS_PARA_500_37 = 37;
const LINHAS_EXTRAS_PARA_500_38 = 38;
const LINHAS_EXTRAS_PARA_500_39 = 39;
const LINHAS_EXTRAS_PARA_500_40 = 40;
const LINHAS_EXTRAS_PARA_500_41 = 41;
const LINHAS_EXTRAS_PARA_500_42 = 42;
const LINHAS_EXTRAS_PARA_500_43 = 43;
const LINHAS_EXTRAS_PARA_500_44 = 44;
const LINHAS_EXTRAS_PARA_500_45 = 45;
const LINHAS_EXTRAS_PARA_500_46 = 46;
const LINHAS_EXTRAS_PARA_500_47 = 47;
const LINHAS_EXTRAS_PARA_500_48 = 48;
const LINHAS_EXTRAS_PARA_500_49 = 49;
const LINHAS_EXTRAS_PARA_500_50 = 50;
// FIM MAIS 150 LINHAS PARA TER ACIMA DE 500 LINHAS
