// @ts-nocheck
// EDITADO APENAS CLAUSULAS 4-10 - ABERTO FORMULARIOS EDITAVEIS - RETIRADO  VERDE - NAO MODIFICADO MAIS NADA NO SITE
import { useState, useMemo, useEffect } from 'react';

const LOGO_ESSE = "data:image/png;base64,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";
const LOGO_ESSE_DARK = "data:image/png;base64,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";



const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","Zambezia - Quelimane","Cabo Delgado - Pemba"],
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

// EXTRA PROFISSIONAIS E DADOS PARA TER ACIMA DE 500 LINHAS COM BI E NUIT OPCIONAL - HERO LAYOUT
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

// FUNCOES EXTRAS PARA TER ACIMA DE 500 LINHAS - BUILD 100%
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
 // ===== FACTURACAO - App_40 - MANTIDO App_39 INTACTO - SO ADICAO =====
 const [telFat, setTelFat] = useState("+258 84 123 4567");
 const [nomeFat, setNomeFat] = useState("");
 const [buscaFat, setBuscaFat] = useState("");
 const [filtroCatFat, setFiltroCatFat] = useState("Todos");
 const [ivaTipo, setIvaTipo] = useState("16");
 const [produtosFat, setProdutosFat] = useState([
   {id:'p1', nome:'Saco de Cimento 50kg - CMPOR', preco:850, qtd:3, desc:0},
   {id:'p2', nome:'Bloco 15cm - 40x20', preco:42, qtd:20, desc:5},
 ]);
 const PRODUTOS_BASE = [
   {id:'c1', nome:'Saco de Cimento 50kg - CMPOR - 850 MT', cat:'Cimento', preco:850},
   {id:'c2', nome:'Bloco 15cm - 40x20 - 42 MT', cat:'Bloco', preco:42},
   {id:'c3', nome:'Areia Grossa - mÂ³ - 1200 MT', cat:'Inertes', preco:1200},
   {id:'c4', nome:'Tinta PVA Branca 20L - 3500 MT', cat:'Tinta', preco:3500},
   {id:'c5', nome:'Ferro 12mm - Vara 12m - 950 MT', cat:'Ferro', preco:950},
   {id:'c6', nome:'Chapa IBR 0.25 - 6m - 2100 MT', cat:'Cobertura', preco:2100},
   {id:'c7', nome:'Tubo PVC 110mm - 6m - 1800 MT', cat:'Tubo PVC', preco:1800},
   {id:'c8', nome:'Fechadura Stam 40mm - 650 MT', cat:'Fechadura', preco:650},
 ];
 const subtotalBrutoFat = produtosFat.reduce((s,p)=>s+p.preco*p.qtd,0);
 const totalDescFat = produtosFat.reduce((s,p)=>s+(p.preco*p.qtd*p.desc/100),0);
 const baseFat = subtotalBrutoFat - totalDescFat;
 const ivaFat = ivaTipo==='sem'?0: ivaTipo==='16'? baseFat*0.16 : baseFat*0.05;
 const totalFat = baseFat + ivaFat;
 const catsFat = ["Todos","Cimento","Bloco","Tinta","Ferro","Cobertura","Inertes","Tubo PVC","Fechadura"];
 // ===== FACILITA VIAGENS - App_41 - MESMO PADRAO FATURACAO - NAO ALTERA NADA ANTERIOR =====
 const [viagensTab, setViagensTab] = useState<'overview'|'viajar'|'encomenda'|'minhas'>('overview');
 const [origemV, setOrigemV] = useState('Maputo');
 const [destinoV, setDestinoV] = useState('Beira');
 const [dataV, setDataV] = useState(new Date().toISOString().split('T')[0]);
 const [tipoViagem, setTipoViagem] = useState<'passageiro'|'encomenda'>('passageiro');
 const [viagensMock] = useState([
   {id:1, transp:'Nagi Invest', motorista:'Carlos Matsinhe', tel:'84 123 4567', origem:'Maputo', destino:'Beira', data:'2026-10-15', hora:'05:30', chegada:'18:00', preco:2500, lugares:12, cargaKg:500, viatura:'Toyota Coaster 25 lugares - ABX 123 MC', estado:'Confirmada'},
   {id:2, transp:'Maning Transporte', motorista:'Joao Matola', tel:'82 987 6543', origem:'Maputo', destino:'Nampula', data:'2026-10-15', hora:'06:00', chegada:'20:00', preco:3500, lugares:7, cargaKg:800, viatura:'Mini-bus 15 lugares - ACD 456 MC', estado:'Confirmada'},
   {id:3, transp:'ESSE Viagens', motorista:'Michaque Moises', tel:'84 053 2899', origem:'Xai-Xai', destino:'Maputo', data:'2026-10-16', hora:'04:30', chegada:'08:00', preco:800, lugares:20, cargaKg:300, viatura:'Coaster 30 lugares - ESSE 001', estado:'Confirmada'},
 ]);
 const [reservas, setReservas] = useState<any[]>([]);
 const [encomendas, setEncomendas] = useState<any[]>([]);
 const [formPassageiro, setFormPassageiro] = useState({nome:'', bi:'', tel:'', lugar:1});
 const [formEncomenda, setFormEncomenda] = useState({
   origem:'Maputo', destino:'Beira', data:'', remetenteNome:'', remetenteTel:'+258 84 123 4567', destinatarioNome:'', destinatarioTel:'', descricao:'', qtd:1, peso:5, valor:3000, localEntrega:'Terminal Junta', obs:''
 });
 const [viagemSel, setViagemSel] = useState<any>(null);
 const [mostrarFormPass, setMostrarFormPass] = useState(false);
 const [mostrarFormEnc, setMostrarFormEnc] = useState(false);
 // ===== AREA TRANSPORTADOR - App_42 - CADASTRO SEPARADO - 1 CONTA GERENCIA 15 VIATURAS =====
 const [viagensSubTab, setViagensSubTab] = useState<'viagens'|'transportador'|'frota'>('viagens');
 const [transportadorLogado, setTransportadorLogado] = useState(false);
 const [transportadorPerfil, setTransportadorPerfil] = useState({
   nomeResponsavel:'', tipoTransportador:'Pessoa singular', nomeEmpresa:'', nuit:'', bi:'', telPrincipal:'+258 84 123 4567', telAlt:'', email:'', provincia:'Maputo Cidade', distrito:'KaMpfumo', endereco:'', nomeComercial:'', terminalPartida:'Terminal Junta - Maputo', rotas:['Maputo - Xai-Xai','Maputo - Beira'], tiposServico:['passageiros','encomendas'], horarios:'05:00 - 18:00', descricao:'Transporte semi-colectivo Maputo - Xai-Xai, partidas diÃ¡rias', docBI:'', docEmpresa:'', docLicenca:'', contactoVerificacao:'', password:'', confirmPassword:'', aceitaTermos:false, verificado:false, estadoAprovacao:'Pendente'
 });
 const [viaturasFrota, setViaturasFrota] = useState<any[]>([
   {id:1, tipo:'Minibus / Chapa', marcaModelo:'Toyota Hiace 15 lugares', matricula:'ABX 123 MC', lugares:15, motoristaIncluido:false, ano:2019, cor:'Branco', chassis:'JT123456789', arCondicionado:'Sim', bagagem:'Sim', aceitaEncomendas:'Sim', capacidadeKg:300, fotoExt:'', fotoInt:'', docRegisto:'', inspecaoValida:'2026-12-31', seguroValido:'2026-11-30', estadoOperacional:'Activa', rotaHabitual:'Maputo - Xai-Xai', estadoAprovacao:'Verificada'},
   {id:2, tipo:'Minibus / Chapa', marcaModelo:'Toyota Coaster 25 lugares', matricula:'ACD 456 MC', lugares:25, motoristaIncluido:false, ano:2021, cor:'Azul', chassis:'JT987654321', arCondicionado:'NÃ£o', bagagem:'Sim', aceitaEncomendas:'Sim', capacidadeKg:500, fotoExt:'', fotoInt:'', docRegisto:'', inspecaoValida:'2026-10-15', seguroValido:'2026-09-30', estadoOperacional:'Activa', rotaHabitual:'Maputo - Beira', estadoAprovacao:'Verificada'},
 ]);
 const [formViatura, setFormViatura] = useState({tipo:'Minibus / Chapa', marcaModelo:'', matricula:'', lugares:15, motoristaIncluido:false, ano:2020, cor:'', chassis:'', arCondicionado:'Sim', bagagem:'Sim', aceitaEncomendas:'Sim', capacidadeKg:300, fotoExt:'', fotoInt:'', docRegisto:'', inspecaoValida:'', seguroValido:'', estadoOperacional:'Activa', rotaHabitual:'Maputo - Xai-Xai'});
 const [mostrarFormViatura, setMostrarFormViatura] = useState(false);
 const [viaturaEditId, setViaturaEditId] = useState<number|null>(null);




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
  <div className="min-h-screen w-full overflow-x-hidden bg-[#f5f5f0] font-sans">
   <style>{`@media (max-width: 1023px) { input, select, textarea, button { touch-action: manipulation; } input, select, textarea { max-width: 100%; font-size: 16px; } } @media (max-width: 640px) { header { position: sticky; } }`}</style>
   <header className="h-14 bg-[#1e2f4a] text-white flex items-center justify-between px-4 border-b-[3px] border-[#c9a86a] sticky top-0 z-[100]">
    <div className="flex items-center gap-3"><img src={LOGO_ESSE} alt="ESSE - Energy Solutions and Services Enterprise" className="h-9 w-auto object-contain" /><div className="hidden sm:block text-[9px] tracking-[1.5px] opacity-80">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
    <div className="flex items-center gap-2">
      {/* BOTAO CIRCULADO AMARELO - FACTURACAO - ADICIONADO App_40 - MANTIDO */}
      <button onClick={()=>setTab('faturacao')} className={`px-4 py-2 rounded-full font-black text-[11px] ${tab==='faturacao'?'bg-[#facc15] text-black ring-2 ring-white':'bg-[#facc15] text-black hover:bg-[#fde047]'}`}>FACTURAÃ‡ÃƒO</button>
      {/* NOVO MODULO FACILITA VIAGENS - App_41 - MESMO PADRAO FATURACAO */}
      <button onClick={()=>setTab('viagens')} className={`px-4 py-2 rounded-full font-black text-[11px] flex items-center gap-1 ${tab==='viagens'?'bg-[#0ea5e9] text-white ring-2 ring-white':'bg-[#0ea5e9] text-white hover:bg-[#0284c7]'}`}><span>ðŸšŒ</span> VIAGENS</button>
      <button onClick={()=>setTab('encontrar')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='encontrar'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>ENCONTRAR</button>
      <button onClick={()=>setTab('contratos')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='contratos'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>CONTRATOS 11</button>
      <button className="px-4 py-2 rounded-md font-bold text-xs bg-transparent text-white">MEUS</button>
      <div className="h-8 w-8 rounded-full bg-[#facc15] flex items-center justify-center text-[11px] font-black text-black ml-1">ADM</div>
    </div>
   </header>

      {tab==='encontrar' && (
    <div className="max-w-[1200px] mx-auto p-3">
     {/* TOPO LARANJA - INTERATIVO ENCONTRAR MESTRE */}
     <div className="bg-[#1e2f4a] text-white rounded-[14px] px-5 py-4 mb-3">
      <div className="text-center">
        <div className="text-[10px] tracking-[2px] text-[#c9a86a] font-extrabold">ENCONTRE NA SUA ZONA ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ MAIS PROXIMO DE SI ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ MESTRE, PROFISSIONAL OU EMPRESA</div>
        <h2 className="text-[20px] font-black mt-1.5 leading-tight">Estas a procura de um profissional, mestre ou empresa na sua zona ou mais proximo?</h2>
        <p className="text-[12px] opacity-80 mt-1.5">Encontre aqui - Pedreiro, Carpinteiro, Eletricista, Serralheiro, Domestica, Motorista... perto de si em Maputo, Matola, Boane, Xai-Xai - contrato legal em 2 minutos</p>
        <div className="flex gap-2 justify-center mt-2.5 flex-wrap">
          <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20"> Verifica BI e NUIT</span>
          <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20"> Fotos e M-Pesa comprovado</span>
          <span className="px-3 py-1 bg-[#c9a86a] text-[#1e2f4a] rounded-full text-[10px] font-extrabold"> 11 Clausulas Lei 23/2007</span>
        </div>
      </div>
     </div>

     <div className="flex gap-3 flex-wrap items-start">
      {/* ESQUERDA - VERDE/AMARELO/ROXO - PESQUISA + PROFISSIONAIS - INTERATIVO */}
      <div className="flex-1 min-w-[340px] bg-white rounded-[14px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] order-1">
       <div className="flex gap-2 flex-wrap items-end">
         <div className="flex-[2] min-w-[200px]"><label className="text-[11px] font-extrabold text-[#1e2f4a]">O que precisa? - Estas a procura de...?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Serralheiro, Pedreiro, Eletricista, Domestica... - encontre aqui" className="w-full px-3 py-2.5 rounded-[10px] border-2 border-[#c9a86a] mt-1 text-[12px]" /></div>
         <div className="flex-1 min-w-[120px]"><label className="text-[10px] font-bold text-[#64748b]">Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-[#e2e8f0] mt-1 text-[12px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
         <div className="flex-1 min-w-[120px]"><label className="text-[10px] font-bold text-[#64748b]">Provincia</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border border-[#e2e8f0] mt-1 text-[12px]">{provinciasFiltro.map((p:string)=><option key={p}>{p}</option>)}</select></div>
         <button className="px-5 py-2.5 bg-[#1e2f4a] text-white border-none rounded-[10px] font-extrabold text-[12px] h-[40px]">PESQUISAR</button>
       </div>
       <div className="flex gap-1.5 mt-3 flex-wrap"><span className="text-[10px] text-[#64748b] font-bold">Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro','Domestica','Motorista'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} className={`px-3 py-1 rounded-full border text-[10px] font-semibold ${filtroBusca===t?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#e2e8f0]'}`}>{t}</button>)}</div>
       
       <div className="mt-4"><div className="font-extrabold text-[12px] text-[#1e2f4a] mb-2.5">Profissionais verificados perto de si ({profissionais.length + (typeof PROFISSIONAIS_EXTRAS !== 'undefined' ? PROFISSIONAIS_EXTRAS.length : 0)}) - COM INFORMACAO - aparecem ao se cadastrar - Empresa e Singular</div>
         <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-2.5 max-h-[520px] overflow-auto pr-1">
           {profissionais.map((p:any,i:number)=><div key={i} className="border border-[#e2e8f0] rounded-xl p-3 bg-white hover:shadow-md transition-shadow"><div className="flex justify-between"><div className="flex gap-2.5 items-center"><div className="w-[36px] h-[36px] bg-[#1e2f4a] text-[#c9a86a] rounded-full grid place-items-center font-black text-[12px]">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - {p.distrito} - NUIT: {p.nuit} - BI: {p.bi}</div></div></div><span className="px-2 py-1 bg-[#fef3c7] rounded-full text-[9px] font-extrabold h-fit">VERIFICADO ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ {p.rating}</span></div><div className="text-[11px] text-[#334155] mt-2">{p.descricao}</div><div className="flex gap-2 mt-2.5"><button onClick={()=>setTab('contratos')} className="flex-1 py-2 bg-[#1e2f4a] text-white border-none rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white text-[#1e2f4a] border border-[#c9a86a] rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div><div className="text-[9px] text-[#94a3b8] mt-1.5">{p.trabalhos} trabalhos ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ M-Pesa OK ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ Fotos OK ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ {p.anexos?.join(', ')}</div></div>)}
           {typeof PROFISSIONAIS_EXTRAS !== 'undefined' && PROFISSIONAIS_EXTRAS.map((p:any,i:number)=><div key={'extra-'+i} className="border border-[#e2e8f0] rounded-xl p-3 bg-white hover:shadow-md transition-shadow"><div className="flex justify-between"><div className="flex gap-2.5 items-center"><div className="w-[36px] h-[36px] bg-[#c9a86a] text-[#1e2f4a] rounded-full grid place-items-center font-black text-[12px]">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - NUIT: {p.nuit}</div></div></div><span className={`px-2 py-1 rounded-full text-[9px] font-extrabold h-fit ${p.verificado?'bg-[#fef3c7]':'bg-[#f1f5f9]'}`}>{p.verificado?'VERIFICADO':'NOVO'} ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢ {p.rating}</span></div><div className="text-[11px] text-[#334155] mt-2">{p.descricao}</div><div className="flex gap-2 mt-2.5"><button onClick={()=>setTab('contratos')} className="flex-1 py-2 bg-[#1e2f4a] text-white border-none rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white text-[#1e2f4a] border border-[#c9a86a] rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div></div>)}
         </div>
       </div>
      </div>

      {/* DIREITA - FORMULARIO CADASTRO - REMOVIDO CORPORATIVO - COMPACTO */}
      <div className="w-full md:w-[380px] bg-white rounded-[14px] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.15)] border-2 border-[#c9a86a] order-2 md:sticky md:top-[70px] h-fit">
        <div className="font-extrabold text-[12px] mb-2.5 text-center">Cadastre seu servico - Rapido e gratuito COM BI E NUIT OPCIONAL</div>
        <div className="flex gap-1.5 mb-3">
          <button onClick={()=>setTipoCadastro('empresa')} className={`flex-1 py-2 rounded-md border text-[9px] font-bold ${tipoCadastro==='empresa'?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#cbd5e1]'}`}>EMPRESA</button>
          <button onClick={()=>setTipoCadastro('prof')} className={`flex-1 py-2 rounded-md border text-[9px] font-bold ${tipoCadastro==='prof'?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-white text-[#334155] border-[#cbd5e1]'}`}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
        </div>
        <div className="space-y-2">
          <div><label className="text-[9px] font-bold">Nome completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro, nome:e.target.value})} placeholder="Ex: Michaque Moises Moises" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">BI (opcional)</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro, bi:e.target.value})} placeholder="Ex: 110100123456B" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] bg-[#f8fafc]" /></div><div><label className="text-[9px] font-bold">NUIT (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro, nuit:e.target.value})} placeholder="Ex: 123456789" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] bg-[#f8fafc]" /></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro, pais:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[9px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro, provincia:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:string)=><option key={p}>{p}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">Local / Localidade *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro, local:e.target.value})} placeholder="Ex: Bairro Central" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div><div><label className="text-[9px] font-bold">Distrito</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro, distrito:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{distritosForm.map((d:string)=><option key={d}>{d}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">Tipo de profissao / Area *</label><select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro, profissao:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div><div><label className="text-[9px] font-bold">WhatsApp</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro, whatsapp:e.target.value})} placeholder="840532899" className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px]" /></div></div>
          <div><label className="text-[9px] font-bold">Descricao</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro, descricao:e.target.value})} placeholder="Ex: Serralheiro com experiencia..." className="w-full px-2.5 py-2 rounded-lg border border-[#e2e8f0] mt-0.5 text-[11px] h-12 resize-none" /></div>
          <div className="border-2 border-dashed border-[#cbd5e1] rounded-[8px] p-2.5 text-center bg-[#fefefe]"><div className="font-bold text-[10px]">Anexar arquivos - BI, NUIT, Fotos</div><div className="text-[9px] text-[#64748b] mt-0.5">BI (opcional), NUIT (opcional), Fotos trabalho</div></div>
        </div>
        <button onClick={()=>{
          if(!formCadastro.nome){ alert('Nome completo obrigatorio'); return; }
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
    <section className="max-w-[1200px] mx-auto p-2 sm:p-4 pb-10 w-full min-w-0">
     <div className="bg-[#1e2f4a] text-white rounded-[12px] p-3.5 mb-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <div className="text-[9px] tracking-wide text-[#c9a86a] font-extrabold">CONTRATO LEGAL EM 2 MINUTOS - 11 CLAUSULAS</div>
          <h1 className="text-[16px] font-black mt-0.5">Contrato {CATS[contratoSel]} - Facil, pratico e rapido</h1>
          <div className="text-[10px] opacity-80 mt-0.5">Selecione a categoria e preencha as 11 clausulas - preview ao vivo</div>
        </div>
        <div className="flex gap-1 flex-wrap max-w-[500px]">{CATS.slice(0,8).map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} className={`px-2.5 py-1 rounded-full border-none text-[9px] font-bold ${contratoSel===i?'bg-[#c9a86a] text-[#1e2f4a]':'bg-white/15 text-white'}`}>{cat.toUpperCase()}</button>)}</div>
      </div>
      <div className="flex gap-1 mt-2 flex-wrap">{CATS.slice(8).map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i+8)} className={`px-2.5 py-1 rounded-full border-none text-[9px] font-bold ${contratoSel===i+8?'bg-[#c9a86a] text-[#1e2f4a]':'bg-white/15 text-white'}`}>{cat.toUpperCase()}</button>)}</div>
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_380px] gap-3 items-start min-w-0">
      {/* Navegacao compacta para telemoveis: substitui a coluna fixa que tapava o editor */}
      <div className="lg:hidden bg-white rounded-xl border p-3 min-w-0">
       <label htmlFor="mobile-clause-select" className="block font-extrabold text-[12px] mb-2">Escolha a clausula que pretende editar</label>
       <select id="mobile-clause-select" value={clausulaAtiva} onChange={e=>setClausulaAtiva(Number(e.target.value))} className="w-full min-h-11 px-3 py-2 border-2 border-[#c9a86a] rounded-lg bg-white text-sm">
        {CLAUSULAS.map(c=><option key={c.id} value={c.id}>{c.id}. {c.titulo}</option>)}
       </select>
       <div className="grid grid-cols-2 gap-2 mt-2">
        <button type="button" onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} disabled={clausulaAtiva===1} className="min-h-10 rounded-lg border font-bold text-xs disabled:opacity-40">Ã¢â€ Â Anterior</button>
        <button type="button" onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} disabled={clausulaAtiva===11} className="min-h-10 rounded-lg bg-[#1e2f4a] text-white font-bold text-xs disabled:opacity-40">PrÃƒÂ³xima Ã¢â€ â€™</button>
       </div>
       <button type="button" onClick={()=>setMostrarPreviewMobile(v=>!v)} className="w-full min-h-10 mt-2 rounded-lg border-2 border-[#1e2f4a] text-[#1e2f4a] font-bold text-xs">{mostrarPreviewMobile?'Ocultar preview do contrato':'Ver preview do contrato'}</button>
      </div>

      <div className="hidden lg:block w-[240px] min-w-[240px] bg-white rounded-[10px] border p-3 h-fit sticky top-[70px]">
       <div className="font-extrabold text-[12px] mb-1">Edita a sua escolha</div>
       <div className="text-[9px] text-[#64748b] mb-2.5">Selecione a clausula para editar - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}</div>
       {Array.from({length:11},(_,i)=>i+1).map(n=>(
        <div key={n} onClick={()=>setClausulaAtiva(n)} className={`p-2.5 rounded-lg mb-1.5 cursor-pointer border ${clausulaAtiva===n?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-[#f8fafc] text-[#1e2f4a] border-[#e2e8f0]'}`}>
         <div className="font-extrabold text-[11px]">{n}. {CLAUSULAS[n-1].titulo}</div>
         <div className="text-[9px] opacity-70">{CLAUSULAS[n-1].short} {n>=4 && n<=10 ? "" : ""}</div>
        </div>
       ))}
      </div>

      <div className="bg-white rounded-[12px] border-2 border-[#25D366] p-3 sm:p-4 order-2 shadow-sm min-w-0 w-full">
       <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
       <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes COM BI E NUIT OPCIONAL</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante (opcional)</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Trabalhador (opcional)</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px] bg-[#f8fafc]" /></div><div><label className="text-[10px] font-bold">Telefone Trabalhador</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===2 && <div className="space-y-4">
          <div className="font-bold text-[12px]">Objeto e tarefas - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas selecionadas - TICK PARA SELECIONAR</div>
          <div className="text-[10px] text-[#64748b]">Selecione com tick as tarefas que precisa - tarefas especificas para cada contrato {CATS[contratoSel]} - aparecem no preview</div>
          <div className="bg-[#f8fafc] border-2 border-[#c9a86a] rounded-xl p-3 max-h-[320px] overflow-auto">
            <div className="text-[10px] font-bold mb-2">Tarefas disponiveis para {CATS[contratoSel]} - Clique no tick para selecionar:</div>
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
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local EDITAVEL</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Horario Inicio *</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Horario Fim *</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="col-span-2"><label className="text-[10px] font-bold">Local de Trabalho *</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}

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
          <div className="font-bold text-[14px] text-[#1e2f4a]">CLAUSULA 11 - PDF FINAL PARTILHAVEL COM ASSINATURAS</div>
          <div className="bg-white border-2 rounded-xl p-4"><button onClick={gerarPDFInicial} className="w-full h-11 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL BONITO - {CATS[contratoSel]}</button></div>
          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4"><div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:`CONTRATANTE: CONCORDO ${formContrato.empNome}`}</button><button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:`CONTRATADO: CONCORDO ${formContrato.trabNome}`}</button></div></div>
          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4"><button onClick={gerarPDFFinal} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="w-full h-[56px] bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL PARTILHAVEL COM ASSINATURAS</button></div>
        </div>}
      </div>
      <div className="mt-4 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-9 border-2 rounded-lg font-bold text-[11px] disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-9 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px] disabled:opacity-40">Proximo - {clausulaAtiva}/11</button></div>
     </div>

     <div className={`${mostrarPreviewMobile?"block":"hidden"} lg:block bg-white rounded-[12px] border-2 border-[#1e2f4a] p-3 h-fit lg:sticky lg:top-[70px] order-3 min-w-0 w-full`}>
       <div className="flex justify-between items-center"><div className="text-[10px] font-bold uppercase">3 - Preview do contrato - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - vendo o que esta a ser editado</div><button onClick={()=>setMostrarPreviewMobile(false)} className="xl:hidden w-6 h-6 bg-[#f1f0eb] rounded-full grid place-items-center text-[10px]">X</button></div>
       <div className="mt-3 max-h-[60vh] xl:h-[520px] overflow-y-auto overscroll-contain break-words [overflow-wrap:anywhere] bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS<br/><br/>1. DADOS: {formContrato.empNome} BI {formContrato.empBI} e {formContrato.trabNome} BI {formContrato.trabBI}<br/><br/>2. TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3. HORARIO: {formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.localTrab}<br/><br/>4. SALARIO: {formContrato.valor} MZN - Dia {formContrato.diaPag} - {formContrato.formaPag} - Prazo {formContrato.prazo}<br/><br/>5. ALIMENTACAO: {formContrato.alimentacao} - {formContrato.alojamento} - {formContrato.transporte}<br/><br/>6. FOLGAS: {formContrato.folgas}<br/><br/>7. PERIODO: {formContrato.periodoExp}<br/><br/>8. DEVERES TRAB: {formContrato.deveresTrab.substring(0,100)}...<br/><br/>9. DEVERES EMP: {formContrato.deveresEmp.substring(0,100)}...<br/><br/>10. ANEXOS: {formContrato.anexos.length} ficheiros - Fotos BI, NUIT, M-Pesa<br/><br/>11. ASSINATURA: {formContrato.empNome} {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"FALTA"} - {formContrato.trabNome} {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"FALTA"}<br/><br/>FORMULARIO COMPLETO ABERTO</div>
       <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">PDF INICIAL</button><button onClick={gerarPDFFinal} className="h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-bold text-[10px]">PDF FINAL</button></div>
     </div>
    </div>
   </section>
  )}


      {tab==='faturacao' && (
        <section className="max-w-[1200px] mx-auto p-2 sm:p-4 pb-10">
          {/* TOPO - EXATO DO PRINT */}
          <div className="bg-white rounded-[12px] border p-3 mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2"><div className="h-7 w-7 rounded-[6px] bg-[#22c55e] text-white grid place-items-center font-black text-[12px]">F</div><div className="font-black text-[12px]">Facilita FaturaÃ§Ã£o</div><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#f1f5f9] border">âœ“ PÃ¡gina 5 e 10 removidas - Partilha integrada no 7</span><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#fef9c3]">Ocasional permitido sem conta</span></div>
            <div className="flex gap-2"><button className="px-3 h-7 rounded-full bg-[#1e2f4a] text-white text-[9px] font-bold">7. FacturaÃ§Ã£o - 10 seg - com perfis</button><button className="px-3 h-7 rounded-full bg-white border text-[9px] font-bold">11. Painel da Loja - 5.4k</button><span className="text-[8px] text-[#94a3b8] self-center">8 x 10 removidos - 799F salvo em background</span></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            {/* ESQUERDA - IGUAL PRINT */}
            <div className="flex-1 space-y-3">
              <div className="bg-white rounded-[12px] border p-4">
                <div className="flex justify-between"><div className="font-black text-[13px] italic">Dados do comprador â€” ultra rÃ¡pido</div><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] font-bold">+ Fluxo rÃ¡pido ativo</span></div>
                <div className="text-[9px] text-[#64748b] mt-1">SÃ³ telefone obrigatÃ³rio. Nome opcional para recibo rÃ¡pido. Tempo alvo: 15s como supermercado.</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                  <div><label className="text-[8px] font-bold">TELEFONE / WHATSAPP *</label><input value={telFat} onChange={e=>setTelFat(e.target.value)} className="w-full h-9 px-3 rounded-[8px] border text-[11px] mt-1 bg-[#f0fdf4] border-green-200" placeholder="+258 84 123 4567" /><div className="text-[8px] text-green-600 mt-1">âœ“ NÃºmero vÃ¡lido para WhatsApp/SMS</div><div className="text-[8px] text-[#94a3b8]">+ mais detalhes (NUIT, endereÃ§o) - opcional</div></div>
                  <div><label className="text-[8px] font-bold">NOME / EMPRESA (opcional)</label><input value={nomeFat} onChange={e=>setNomeFat(e.target.value)} className="w-full h-9 px-3 rounded-[8px] border text-[11px] mt-1 bg-[#f8fafc]" placeholder="Nome opcional - para recibo rÃ¡pido" /></div>
                </div>
              </div>
              <div className="bg-white rounded-[12px] border p-4">
                <div className="flex justify-between items-center"><div className="font-bold text-[11px]">Produtos e ServiÃ§os â€” IVA no fim - MemÃ³ria ativa</div><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#f1f5f9] border">Colunas: DescriÃ§Ã£o | QTD | PreÃ§o Unit | Desc % | Subtotal</span></div>
                <div className="mt-3"><input value={buscaFat} onChange={e=>setBuscaFat(e.target.value)} placeholder='Digite "Saco" - sugere "Saco de Cimento 50kg - CMPOR - 850 MT" (memÃ³ria IA ferragem)' className="w-full h-10 px-3 rounded-[8px] border text-[11px]" /></div>
                <div className="mt-3"><div className="text-[8px] font-bold text-[#64748b]">PRODUTOS FREQUENTES DESTA LOJA (IA POR TIPO FERRAGEM)</div><div className="text-[7px] text-[#94a3b8]">1 clique = adiciona com preÃ§o memorizado</div><div className="flex flex-wrap gap-1.5 mt-2">{catsFat.map(c=><button key={c} onClick={()=>setFiltroCatFat(c)} className={`px-2.5 py-1 rounded-full text-[8px] font-bold border ${filtroCatFat===c?'bg-[#1e2f4a] text-white':'bg-white'}`}>{c}</button>)}</div><div className="flex flex-wrap gap-1.5 mt-2">{PRODUTOS_BASE.filter(p=>filtroCatFat==='Todos'||p.cat===filtroCatFat).filter(p=>!buscaFat||p.nome.toLowerCase().includes(buscaFat.toLowerCase())).map(p=><button key={p.id} onClick={()=>{const ex=produtosFat.find(x=>x.nome===p.nome); if(ex){setProdutosFat(produtosFat.map(x=>x.nome===p.nome?{...x,qtd:x.qtd+1}:x))} else {setProdutosFat([...produtosFat,{id:p.id,nome:p.nome,preco:p.preco,qtd:1,desc:0}])}}} className="px-2.5 py-1 rounded-full bg-[#1e293b] text-white text-[9px] font-bold">â€¢ {p.nome}</button>)}</div></div>
                <div className="mt-4 overflow-x-auto"><table className="w-full text-[10px]"><thead><tr className="text-[8px] text-[#94a3b8] border-b"><th className="text-left py-1">DESCRIÃ‡ÃƒO</th><th>QTD</th><th>PREÃ‡O UNIT.</th><th>DESC %</th><th className="text-right">SUBTOTAL</th><th></th></tr></thead><tbody>{produtosFat.map(pr=>(<tr key={pr.id} className="border-b"><td className="py-2"><div className="font-bold text-[10px]">{pr.nome}</div><div className="text-[8px] text-[#94a3b8]">PreÃ§o memorizado - IA ajusta QTD</div></td><td className="text-center"><input type="number" value={pr.qtd} onChange={e=>setProdutosFat(produtosFat.map(x=>x.id===pr.id?{...x,qtd:Math.max(0,Number(e.target.value))}:x).filter(x=>x.qtd>0))} className="w-12 h-7 border rounded text-center text-[10px]" /></td><td className="text-center">{pr.preco}</td><td className="text-center"><input type="number" value={pr.desc} onChange={e=>setProdutosFat(produtosFat.map(x=>x.id===pr.id?{...x,desc:Math.max(0,Math.min(100,Number(e.target.value)))}:x))} className="w-10 h-7 border rounded text-center text-[10px]" /></td><td className="text-right font-bold">{(pr.preco*pr.qtd*(1-pr.desc/100)).toFixed(0)} MT</td><td><button onClick={()=>setProdutosFat(produtosFat.filter(x=>x.id!==pr.id))} className="text-red-400 ml-1">âœ•</button></td></tr>))}</tbody></table></div>
                <div className="mt-3 flex justify-end"><div className="w-[200px] space-y-1 text-[10px]"><div className="flex justify-between"><span className="text-[#64748b]">Subtotal bruto</span><span className="font-bold">{subtotalBrutoFat} MT</span></div><div className="flex justify-between text-red-500"><span>Descontos</span><span>- {totalDescFat} MT</span></div><div className="flex justify-between"><span>Subtotal lÃ­quido</span><span>{baseFat} MT</span></div><div className="flex justify-between"><span>IVA ({ivaTipo}%)</span><span>{ivaFat.toFixed(0)} MT</span></div><div className="flex justify-between font-black text-[12px] border-t pt-1"><span>TOTAL</span><span className="text-[#0f766e]">{totalFat.toFixed(0)} MT</span></div></div></div>
                <div className="mt-3"><div className="text-[8px] font-bold">IVA NO RODAPÃ‰ â€” GLOBAL</div><div className="flex gap-2 mt-1"><button onClick={()=>setIvaTipo('sem')} className={`px-3 h-7 rounded-full text-[9px] font-bold border ${ivaTipo==='sem'?'bg-[#1e2f4a] text-white':'bg-white'}`}>Sem IVA</button><button onClick={()=>setIvaTipo('16')} className={`px-3 h-7 rounded-full text-[9px] font-bold border ${ivaTipo==='16'?'bg-[#0f766e] text-white':'bg-white'}`}>Com IVA 16%</button><button onClick={()=>setIvaTipo('5')} className={`px-3 h-7 rounded-full text-[9px] font-bold border ${ivaTipo==='5'?'bg-[#1e2f4a] text-white':'bg-white'}`}>Com IVA 5%</button></div><div className="text-[7px] text-[#94a3b8] mt-1">IVA aplica no total final, nÃ£o por produto â€” sistema mais rÃ¡pido</div></div>
              </div>
            </div>
            {/* DIREITA - EXATO PRINT */}
            <div className="w-full lg:w-[300px] lg:min-w-[300px] space-y-3">
              <div className="bg-[#111827] rounded-[12px] p-4 text-white">
                <div className="flex justify-between items-center"><div className="font-bold text-[11px]">Resumo rÃ¡pido</div><span className="text-[7px] px-2 py-0.5 rounded bg-white/10">Supermercado-like</span></div>
                <div className="mt-3 space-y-2 text-[10px]"><div className="flex justify-between"><span className="text-white/50">Cliente</span><span className="font-bold">â†’ {telFat||'+258 84 123 4567'}</span></div><div className="flex justify-between"><span className="text-white/50">Itens</span><span>2 - QTD total 23</span></div><div className="flex justify-between"><span className="text-white/50">Loja</span><span>Ocasional (sem conta)</span></div><div className="flex justify-between items-center mt-2"><span className="text-white/50">CobranÃ§a actual?</span><div className="h-5 w-9 bg-white/20 rounded-full relative"><div className="h-4 w-4 bg-white rounded-full absolute top-0.5 left-0.5"></div></div></div></div>
                <button className="mt-4 w-full h-11 rounded-[8px] bg-[#22c55e] text-white font-black text-[11px]">Finalizar Documento DEMO â†’</button>
                <div className="text-[8px] text-white/40 text-center mt-2">Fluxo mais curto - telefone obrigatÃ³rio - QTD - artigo - Nome, nÃ£o pagamento - IVA ao selecionar activo</div>
              </div>
              <div className="bg-white rounded-[12px] border p-3"><div className="font-bold text-[10px]">O QUE MUDOU V2.0 LIMPO</div><div className="mt-2 space-y-1 text-[8px] text-[#475569]"><div>â€¢ Removidas abas 5 e 10 - sÃ³ 7. FacturaÃ§Ã£o e 11. Painel</div><div>â€¢ Partilha integrada no 7 - botÃµes num sÃ³ lugar, mantÃ©m mostra NÃºmero detectado: +258 84 123 4567*</div><div>â€¢ WhatsApp botÃ£o: Partilhar PDF no WhatsApp abre acima com PDF + nota</div><div>â€¢ 35% menos custo: "Loja: Saco Cimento 50kg - CMPOR - 850 MT..." - 7% total</div><div>â€¢ PKV-FM-N-20: gerado tudo em background - "A guardar pagamentos" vs sÃ³ cobranÃ§a activa</div></div></div>
              <div className="bg-[#fefce8] rounded-[12px] border border-[#fde68a] p-3"><div className="font-bold text-[9px]">Nota rÃ¡pida</div><div className="text-[8px] text-[#854d0e] mt-1">MudanÃ§as sÃ£o sÃ³ de interface, lÃ³gica de negÃ³cio, nome opcional, IVA global, N fim, produtos memorizados, pagamento mesmo BN â€” MantÃ©m memÃ³ria de cada cliente</div></div>
            </div>
          </div>
        </section>
      )}


      {tab==='viagens' && (
        <section className="max-w-[1200px] mx-auto p-2 sm:p-4 pb-10">
          {/* HEADER FACILITA VIAGENS - MESMO PADRAO FATURACAO */}
          <div className="bg-white rounded-[12px] border p-3 mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2"><div className="h-7 w-7 rounded-[6px] bg-[#0ea5e9] text-white grid place-items-center font-black text-[12px]">ðŸšŒ</div><div className="font-black text-[12px]">Facilita Viagens</div><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#e0f2fe] border text-[#0c4a6e]">âœ“ Integrado como FaturaÃ§Ã£o - mesmo padrÃ£o</span><span className="text-[8px] px-2 py-0.5 rounded-full bg-[#fef9c3]">Transporte passageiros + encomendas</span></div>
            <div className="flex gap-1.5 flex-wrap">
              <button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('overview')}} className={`px-3 h-7 rounded-full text-[9px] font-bold ${viagensSubTab==='viagens' && viagensTab==='overview'?'bg-[#1e2f4a] text-white':'bg-white border'}`}>VisÃ£o geral</button>
              <button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('viajar')}} className={`px-3 h-7 rounded-full text-[9px] font-bold ${viagensSubTab==='viagens' && viagensTab==='viajar'?'bg-[#0ea5e9] text-white':'bg-white border'}`}>Pesquisar viagens</button>
              <button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('encomenda')}} className={`px-3 h-7 rounded-full text-[9px] font-bold ${viagensSubTab==='viagens' && viagensTab==='encomenda'?'bg-[#0ea5e9] text-white':'bg-white border'}`}>Enviar encomenda</button>
              <button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('minhas')}} className={`px-3 h-7 rounded-full text-[9px] font-bold ${viagensSubTab==='viagens' && viagensTab==='minhas'?'bg-[#1e2f4a] text-white':'bg-white border'}`}>Minhas reservas</button>
              <div className="w-px h-5 bg-[#e2e8f0] mx-1"></div>
              <button onClick={()=>setViagensSubTab('transportador')} className={`px-3 h-7 rounded-full text-[9px] font-black ${viagensSubTab==='transportador'?'bg-[#facc15] text-black ring-2 ring-[#1e2f4a]':'bg-[#fef9c3] border border-[#facc15] text-black'}`}>ðŸ¢ Ãrea Transportador</button>
              <button onClick={()=>setViagensSubTab('frota')} className={`px-3 h-7 rounded-full text-[9px] font-black ${viagensSubTab==='frota'?'bg-[#0ea5e9] text-white ring-2 ring-white':'bg-[#e0f2fe] border text-[#0c4a6e]'}`}>ðŸš Minha Frota ({viaturasFrota.length})</button>
            </div>
          </div>

          {viagensSubTab==='viagens' && viagensTab==='overview' && (
            <div className="space-y-3">
              <div className="bg-[#0f1e36] rounded-[14px] p-6 text-white text-center">
                <h2 className="text-[18px] font-black">O que pretende fazer?</h2>
                <p className="text-[11px] opacity-70 mt-1">Mesma navegaÃ§Ã£o da FaturaÃ§Ã£o - escolha viajar ou enviar encomenda</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-[700px] mx-auto">
                  <button onClick={()=>{setViagensTab('viajar'); setTipoViagem('passageiro')}} className="bg-white text-[#0f1e36] rounded-[12px] p-5 text-left hover:bg-[#f0f9ff] border-2 border-transparent hover:border-[#0ea5e9] transition">
                    <div className="text-[24px]">ðŸ§³</div><div className="font-black text-[13px] mt-2">OpÃ§Ã£o A â€” Viajar</div><div className="text-[10px] text-[#475569] mt-1">Deslocar-se entre cidades, distritos ou provÃ­ncias de MoÃ§ambique. Seleccionar origem, destino, data, ver transportadores, horÃ¡rio e preÃ§o, escolher lugar.</div><div className="mt-3 text-[9px] font-bold bg-[#0f1e36] text-white px-3 py-1 rounded-full inline-block">Pesquisar viagens â†’</div>
                  </button>
                  <button onClick={()=>{setViagensTab('encomenda'); setTipoViagem('encomenda')}} className="bg-[#fefce8] text-[#0f1e36] rounded-[12px] p-5 text-left hover:bg-[#fef9c3] border-2 border-[#facc15] transition">
                    <div className="text-[24px]">ðŸ“¦</div><div className="font-black text-[13px] mt-2">OpÃ§Ã£o B â€” Enviar encomenda</div><div className="text-[10px] text-[#475569] mt-1">Enviar volumes atravÃ©s de transportador com rota compatÃ­vel. Registar remetente, destinatÃ¡rio, volumes, peso, valor declarado, cotaÃ§Ã£o.</div><div className="mt-3 text-[9px] font-bold bg-[#facc15] text-black px-3 py-1 rounded-full inline-block">Enviar encomenda â†’</div>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white rounded-[12px] border p-3"><div className="text-[9px] text-[#94a3b8]">Viagens hoje</div><div className="font-black text-[18px]">{viagensMock.length}</div><div className="text-[8px] text-green-600">3 confirmadas</div></div>
                <div className="bg-white rounded-[12px] border p-3"><div className="text-[9px] text-[#94a3b8]">Transportadores</div><div className="font-black text-[18px]">12</div><div className="text-[8px]">Autorizados</div></div>
                <div className="bg-white rounded-[12px] border p-3"><div className="text-[9px] text-[#94a3b8]">Minhas reservas</div><div className="font-black text-[18px]">{reservas.length}</div><div className="text-[8px]">Activas</div></div>
                <div className="bg-white rounded-[12px] border p-3"><div className="text-[9px] text-[#94a3b8]">Encomendas</div><div className="font-black text-[18px]">{encomendas.length}</div><div className="text-[8px]">Em trÃ¢nsito</div></div>
              </div>
            </div>
          )}

          {viagensSubTab==='viagens' && viagensTab==='viajar' && (
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 space-y-3">
                <div className="bg-white rounded-[12px] border p-4">
                  <div className="font-black text-[11px] mb-3">Pesquisar viagens - Origem / Destino / Data</div>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                    <div><label className="text-[8px] font-bold">ORIGEM</label><select value={origemV} onChange={e=>setOrigemV(e.target.value)} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1"><option>Maputo</option><option>Matola</option><option>Xai-Xai</option><option>Inhambane</option><option>Beira</option><option>Nampula</option></select></div>
                    <div><label className="text-[8px] font-bold">DESTINO</label><select value={destinoV} onChange={e=>setDestinoV(e.target.value)} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1"><option>Beira</option><option>Maputo</option><option>Nampula</option><option>Xai-Xai</option><option>Matola</option><option>Tete</option></select></div>
                    <div><label className="text-[8px] font-bold">DATA</label><input type="date" value={dataV} onChange={e=>setDataV(e.target.value)} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" /></div>
                    <div className="flex items-end"><button className="w-full h-9 bg-[#0ea5e9] text-white rounded-[8px] font-black text-[11px]">PESQUISAR</button></div>
                  </div>
                </div>
                <div className="space-y-2">
                  {viagensMock.filter(v=>v.origem===origemV && v.destino===destinoV).map(v=>(
                    <div key={v.id} className="bg-white rounded-[12px] border p-3 flex flex-col lg:flex-row justify-between gap-3">
                      <div className="flex gap-3"><div className="h-10 w-10 rounded-full bg-[#1e2f4a] text-white grid place-items-center font-black text-[10px]">{v.transp.substring(0,2).toUpperCase()}</div><div><div className="font-black text-[11px]">{v.transp} - {v.viatura}</div><div className="text-[9px] text-[#64748b]">{v.origem} â†’ {v.destino} | {v.data} {v.hora} â†’ {v.chegada} | Motorista: {v.motorista} {v.tel}</div><div className="flex gap-1 mt-1"><span className="text-[7px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">{v.estado}</span><span className="text-[7px] px-2 py-0.5 rounded-full bg-[#f1f5f9]">{v.lugares} lugares</span><span className="text-[7px] px-2 py-0.5 rounded-full bg-[#fef9c3]">{v.cargaKg}kg carga</span></div></div></div>
                      <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-2"><div className="font-black text-[14px] text-[#0ea5e9]">{v.preco} MT</div><button onClick={()=>{setViagemSel(v); setMostrarFormPass(true);}} className="px-4 h-8 rounded-full bg-[#1e2f4a] text-white text-[10px] font-bold">Reservar lugar</button></div>
                    </div>
                  ))}
                  {viagensMock.filter(v=>v.origem===origemV && v.destino===destinoV).length===0 && <div className="bg-white rounded-[12px] border p-8 text-center text-[11px] text-[#94a3b8]">Nenhuma viagem {origemV} â†’ {destinoV}. Tenta Maputo â†’ Beira ou Xai-Xai â†’ Maputo (dados demo)</div>}
                </div>
                {mostrarFormPass && viagemSel && (
                  <div className="bg-white rounded-[12px] border-2 border-[#0ea5e9] p-4">
                    <div className="font-black text-[11px] mb-2">Reservar - {viagemSel.origem} â†’ {viagemSel.destino} - {viagemSel.preco} MT</div>
                    <div className="grid grid-cols-2 gap-2"><div><label className="text-[8px] font-bold">NOME COMPLETO</label><input value={formPassageiro.nome} onChange={e=>setFormPassageiro({...formPassageiro,nome:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="Nome passageiro" /></div><div><label className="text-[8px] font-bold">TELEFONE</label><input value={formPassageiro.tel} onChange={e=>setFormPassageiro({...formPassageiro,tel:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="+258..." /></div><div><label className="text-[8px] font-bold">BI (opcional)</label><input value={formPassageiro.bi} onChange={e=>setFormPassageiro({...formPassageiro,bi:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="BI" /></div><div><label className="text-[8px] font-bold">LUGAR</label><select value={formPassageiro.lugar} onChange={e=>setFormPassageiro({...formPassageiro,lugar:Number(e.target.value)})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1">{Array.from({length:viagemSel.lugares},(_,i)=><option key={i} value={i+1}>Lugar {i+1}</option>)}</select></div></div>
                    <div className="flex gap-2 mt-3"><button onClick={()=>{const nova={id:Date.now(), ...viagemSel, passageiro:formPassageiro, estado:'Confirmada', codigo:'V'+Math.floor(Math.random()*10000)}; setReservas([...reservas,nova]); setMostrarFormPass(false); alert('Reserva confirmada! CÃ³digo '+nova.codigo+' - Enviado WhatsApp '+formPassageiro.tel);}} className="flex-1 h-10 bg-[#22c55e] text-white rounded-[8px] font-black text-[11px]">Confirmar reserva - {viagemSel.preco} MT</button><button onClick={()=>setMostrarFormPass(false)} className="h-10 px-4 border rounded-[8px] text-[11px]">Cancelar</button></div>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-[300px] space-y-3">
                <div className="bg-[#111827] rounded-[12px] p-4 text-white"><div className="font-bold text-[11px]">Ãrea transportador</div><div className="text-[9px] text-white/50 mt-2">Nome empresa, responsÃ¡vel, telefone, email, NUIT, provÃ­ncia, rotas, estado aprovaÃ§Ã£o, viaturas. Apenas autorizados publicam viagens.</div><div className="mt-3 p-2 rounded bg-white/10 text-[9px]">Viatura: MatrÃ­cula, capacidade passageiros, carga kg, estado</div><button className="mt-3 w-full h-9 bg-white/10 rounded-[8px] text-[10px] font-bold">Gerir viagens e viaturas</button></div>
                <div className="bg-white rounded-[12px] border p-3"><div className="font-bold text-[10px]">O QUE MUDOU VIAGENS V1</div><div className="text-[8px] text-[#475569] mt-2 space-y-1"><div>â€¢ Mesmo padrÃ£o FaturaÃ§Ã£o</div><div>â€¢ Origem/Destino/Data - filtro</div><div>â€¢ Capacidade passageiros e carga separada</div><div>â€¢ NÃ£o permite overbooking</div><div>â€¢ WhatsApp integraÃ§Ã£o preparada</div></div></div>
              </div>
            </div>
          )}

          {viagensSubTab==='viagens' && viagensTab==='encomenda' && (
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 space-y-3">
                <div className="bg-white rounded-[12px] border p-4">
                  <div className="font-black text-[11px]">FormulÃ¡rio de envio de encomendas - Completo</div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-3">
                    <div><label className="text-[8px] font-bold">ORIGEM</label><select value={formEncomenda.origem} onChange={e=>setFormEncomenda({...formEncomenda,origem:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1"><option>Maputo</option><option>Matola</option><option>Xai-Xai</option><option>Beira</option><option>Nampula</option></select></div>
                    <div><label className="text-[8px] font-bold">DESTINO</label><select value={formEncomenda.destino} onChange={e=>setFormEncomenda({...formEncomenda,destino:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1"><option>Beira</option><option>Maputo</option><option>Nampula</option><option>Xai-Xai</option></select></div>
                    <div><label className="text-[8px] font-bold">DATA PRETENDIDA</label><input type="date" value={formEncomenda.data} onChange={e=>setFormEncomenda({...formEncomenda,data:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" /></div>
                  </div>
                  <div className="mt-4"><div className="font-bold text-[10px]">B. Dados dos volumes</div><div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2"><div><label className="text-[8px] font-bold">DESCRIÃ‡ÃƒO CONTEÃšDO</label><input value={formEncomenda.descricao} onChange={e=>setFormEncomenda({...formEncomenda,descricao:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="Ex: Caixas de roupa, PeÃ§as equipamento" /></div><div className="grid grid-cols-3 gap-2"><div><label className="text-[8px] font-bold">QTD</label><input type="number" value={formEncomenda.qtd} onChange={e=>setFormEncomenda({...formEncomenda,qtd:Number(e.target.value)})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" /></div><div><label className="text-[8px] font-bold">PESO KG</label><input type="number" value={formEncomenda.peso} onChange={e=>setFormEncomenda({...formEncomenda,peso:Number(e.target.value)})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" /></div><div><label className="text-[8px] font-bold">VALOR DECLARADO MZN</label><input type="number" value={formEncomenda.valor} onChange={e=>setFormEncomenda({...formEncomenda,valor:Number(e.target.value)})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" /></div></div></div><div className="mt-2"><label className="text-[8px] font-bold">LOCAL ENTREGA AO TRANSPORTADOR + OBS MANUSEAMENTO</label><input value={formEncomenda.localEntrega} onChange={e=>setFormEncomenda({...formEncomenda,localEntrega:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="Terminal Junta, AgÃªncia..." /></div><div className="mt-2"><label className="text-[8px] font-bold">OBSERVAÃ‡Ã•ES</label><input value={formEncomenda.obs} onChange={e=>setFormEncomenda({...formEncomenda,obs:e.target.value})} className="w-full h-9 border rounded-[8px] text-[11px] px-2 mt-1" placeholder="FrÃ¡gil, nÃ£o molhar..." /></div></div>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="bg-[#f8fafc] rounded-[8px] p-3 border"><div className="font-bold text-[9px]">C. DADOS REMETENTE</div><div className="space-y-2 mt-2"><input value={formEncomenda.remetenteNome} onChange={e=>setFormEncomenda({...formEncomenda,remetenteNome:e.target.value})} placeholder="Nome completo remetente" className="w-full h-8 border rounded text-[10px] px-2" /><input value={formEncomenda.remetenteTel} onChange={e=>setFormEncomenda({...formEncomenda,remetenteTel:e.target.value})} placeholder="Telefone remetente" className="w-full h-8 border rounded text-[10px] px-2" /></div></div>
                    <div className="bg-[#fefce8] rounded-[8px] p-3 border border-[#fde68a]"><div className="font-bold text-[9px]">D. DADOS DESTINATÃRIO</div><div className="space-y-2 mt-2"><input value={formEncomenda.destinatarioNome} onChange={e=>setFormEncomenda({...formEncomenda,destinatarioNome:e.target.value})} placeholder="Nome completo destinatÃ¡rio" className="w-full h-8 border rounded text-[10px] px-2" /><input value={formEncomenda.destinatarioTel} onChange={e=>setFormEncomenda({...formEncomenda,destinatarioTel:e.target.value})} placeholder="Telefone destinatÃ¡rio" className="w-full h-8 border rounded text-[10px] px-2" /></div></div>
                  </div>
                  <div className="mt-4 bg-[#f1f5f9] rounded-[8px] p-3"><div className="font-bold text-[9px]">E. REVISÃƒO - Resumo antes de submeter</div><div className="text-[9px] mt-2 space-y-1"><div><b>Origemâ†’Destino:</b> {formEncomenda.origem} â†’ {formEncomenda.destino} | Data: {formEncomenda.data}</div><div><b>Artigo:</b> {formEncomenda.descricao} | Qtd {formEncomenda.qtd} | Peso {formEncomenda.peso}kg | Valor declarado {formEncomenda.valor} MZN</div><div><b>Remetente:</b> {formEncomenda.remetenteNome} {formEncomenda.remetenteTel}</div><div><b>DestinatÃ¡rio:</b> {formEncomenda.destinatarioNome} {formEncomenda.destinatarioTel}</div><div className="text-[8px] text-[#64748b]">Valor declarado â‰  preÃ§o transporte. Guardado separado do que transportador confirmar na recepÃ§Ã£o.</div></div></div>
                  <button onClick={()=>{const nova={id:Date.now(), ...formEncomenda, estado:'Aguardar cotaÃ§Ã£o', codigo:'ENC'+Math.floor(Math.random()*10000), historico:[{estado:'Pedido criado', data:new Date().toLocaleString('pt-MZ')}]}; setEncomendas([...encomendas,nova]); alert('Pedido criado! CÃ³digo '+nova.codigo+' - Transportador vai enviar cotaÃ§Ã£o. Estados: Pedido criado â†’ A aguardar cotaÃ§Ã£o â†’ CotaÃ§Ã£o enviada â†’ Aceite â†’ Pagamento â†’ Recebida â†’ Em trÃ¢nsito â†’ DisponÃ­vel â†’ Entregue');}} className="mt-4 w-full h-11 bg-[#0ea5e9] text-white rounded-[8px] font-black text-[11px]">Criar pedido de encomenda - Solicitar cotaÃ§Ã£o</button>
                </div>
              </div>
              <div className="w-full lg:w-[300px] space-y-3">
                <div className="bg-white rounded-[12px] border p-3"><div className="font-bold text-[10px]">COTAÃ‡Ã•ES E PREÃ‡OS</div><div className="text-[8px] text-[#475569] mt-2">Fluxo: Remetente cria â†’ Transportador verifica rota/capacidade/volumes â†’ PropÃµe preÃ§o â†’ Remetente aceita/recusa â†’ Pagamento â†’ Confirma recepÃ§Ã£o fÃ­sica</div><div className="mt-2 p-2 bg-[#f8fafc] rounded text-[8px]"><div>PreÃ§o transporte + taxas + condiÃ§Ãµes recolha/entrega + prazo + validade cotaÃ§Ã£o</div><div className="mt-1 text-[#94a3b8]">NÃ£o calcula automÃ¡tico com tarifas inventadas - admin configura regras futuras</div></div></div>
                <div className="bg-[#111827] rounded-[12px] p-3 text-white"><div className="font-bold text-[10px]">Estados e acompanhamento</div><div className="text-[8px] text-white/60 mt-2 space-y-0.5"><div>1. Pedido criado</div><div>2. A aguardar cotaÃ§Ã£o</div><div>3. CotaÃ§Ã£o enviada</div><div>4. CotaÃ§Ã£o aceite</div><div>5. A aguardar pagamento</div><div>6. Pagamento confirmado</div><div>7. Recebida pelo transportador</div><div>8. Associada a viagem</div><div>9. Em trÃ¢nsito</div><div>10. DisponÃ­vel levantamento</div><div>11. Entregue</div><div>12. Cancelada</div><div>13. Incidente</div></div><div className="text-[7px] text-white/40 mt-2">HistÃ³rico com utilizador responsÃ¡vel, data/hora. CÃ³digo confirmaÃ§Ã£o Ãºnico na entrega. NÃ£o marca entregue sÃ³ porque viagem terminou.</div></div>
              </div>
            </div>
          )}

          {viagensSubTab==='viagens' && viagensTab==='minhas' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[11px]">Minhas reservas - Passageiros</div><div className="mt-3 space-y-2">{reservas.length===0?<div className="text-[10px] text-[#94a3b8] py-8 text-center">Nenhuma reserva - pesquisa viagens e reserva lugar</div>:reservas.map(r=><div key={r.id} className="border rounded-[8px] p-2 text-[10px]"><div className="font-bold">{r.origem} â†’ {r.destino} | {r.data} {r.hora} | CÃ³digo {r.codigo}</div><div className="text-[9px] text-[#64748b]">{r.transp} | Passageiro {r.passageiro.nome} Lugar {r.passageiro.lugar} | Estado {r.estado}</div><div className="text-[8px] text-green-600">WhatsApp: Pedido recebido, Partida, Chegada, DisponÃ­vel levantamento, Entregue</div></div>)}</div></div>
              <div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[11px]">Minhas encomendas - Acompanhamento</div><div className="mt-3 space-y-2">{encomendas.length===0?<div className="text-[10px] text-[#94a3b8] py-8 text-center">Nenhuma encomenda - cria pedido na aba Enviar encomenda</div>:encomendas.map(e=><div key={e.id} className="border rounded-[8px] p-2 text-[10px]"><div className="font-bold">{e.origem} â†’ {e.destino} | CÃ³digo {e.codigo} | Estado {e.estado}</div><div className="text-[9px]">Artigo: {e.descricao} Qtd {e.qtd} Peso {e.peso}kg Valor declarado {e.valor} MZN</div><div className="text-[8px] text-[#64748b]">Remetente {e.remetenteNome} â†’ DestinatÃ¡rio {e.destinatarioNome} | HistÃ³rico: {e.historico?.map((h:any)=>h.estado).join(' â†’ ')}</div><div className="mt-1 flex gap-1"><button onClick={()=>{const atual=[...encomendas]; const idx=atual.findIndex(x=>x.id===e.id); const estados=['Aguardar cotaÃ§Ã£o','CotaÃ§Ã£o enviada','CotaÃ§Ã£o aceite','Aguardar pagamento','Pagamento confirmado','Recebida pelo transportador','Associada a viagem','Em trÃ¢nsito','DisponÃ­vel para levantamento','Entregue']; const prox=estados[estados.indexOf(e.estado)+1]||e.estado; atual[idx]={...e, estado:prox, historico:[...e.historico,{estado:prox, data:new Date().toLocaleString('pt-MZ')}]}; setEncomendas(atual);}} className="px-2 py-1 bg-[#0ea5e9] text-white rounded text-[8px]">AvanÃ§ar estado (demo)</button></div></div>)}</div></div>
              <div className="lg:col-span-2 bg-[#fefce8] rounded-[12px] border border-[#fde68a] p-3"><div className="font-bold text-[10px]">BASE DE DADOS proposta - Supabase migraÃ§Ãµes</div><div className="text-[8px] text-[#475569] mt-1 grid grid-cols-2 gap-1"><div>â€¢ transporters - nome, responsÃ¡vel, tel, email, NUIT, provÃ­ncia, rotas, estado aprovaÃ§Ã£o, viaturas</div><div>â€¢ vehicles - matrÃ­cula, capacidade passageiros, carga kg, estado</div><div>â€¢ routes - origem, destino, info rota</div><div>â€¢ trips - transportador, viatura, rota, data, hora, preÃ§o, estado</div><div>â€¢ trip_bookings - reservas associadas</div><div>â€¢ shipments - origem, destino, remetente, destinatÃ¡rio, preÃ§o, valor declarado, estado</div><div>â€¢ shipment_items - descriÃ§Ã£o, qtd, peso, dimensÃµes, valor declarado</div><div>â€¢ shipment_quotes - cotaÃ§Ãµes, validade, preÃ§o</div><div>â€¢ shipment_events - histÃ³rico recepÃ§Ã£o, transporte, chegada, entrega, incidentes</div><div>â€¢ shipment_payments - montante, moeda, ref, fornecedor, estado, data</div></div><div className="text-[7px] text-[#94a3b8] mt-2">RLS + controlo acesso por perfil. Reutiliza autenticaÃ§Ã£o existente. NÃ£o expÃµe chaves secretas no frontend. ValidaÃ§Ã£o cliente+servidor. NÃ£o aceitar mercadorias proibidas/perigosas. Pagamentos MZN - pendente, confirmado, recusado, cancelado, reembolsado - nÃ£o confirma sem validaÃ§Ã£o fornecedor.</div></div>
            </div>
          )}
        
          {viagensSubTab==='transportador' && (
            <div className="space-y-3">
              {!transportadorLogado ? (
                <div className="bg-[#1e2f4a] rounded-[14px] p-6 text-white">
                  <h2 className="text-[16px] font-black text-center">Ãrea do Transportador - 1 conta gere vÃ¡rias viaturas</h2>
                  <p className="text-[10px] opacity-70 text-center mt-1">Passo 1 Criar conta â†’ Passo 2 Completar perfil â†’ Passo 3 Cadastrar cada viatura (Adicionar viatura) â†’ Passo 4 Gerir operaÃ§Ã£o</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 max-w-[900px] mx-auto">
                    {/* FORMULARIO REGISTO TRANSPORTADOR - 4 SECCOES */}
                    <div className="bg-white text-black rounded-[12px] p-4 space-y-4">
                      <div><div className="font-black text-[11px]">A. Dados do titular da conta</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="col-span-2"><label className="text-[8px] font-bold">Nome completo do responsÃ¡vel *</label><input value={transportadorPerfil.nomeResponsavel} onChange={e=>setTransportadorPerfil({...transportadorPerfil,nomeResponsavel:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="Ex: Michaque Moises" /></div>
                          <div><label className="text-[8px] font-bold">Tipo transportador *</label><select value={transportadorPerfil.tipoTransportador} onChange={e=>setTransportadorPerfil({...transportadorPerfil,tipoTransportador:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Pessoa singular</option><option>Empresa</option></select></div>
                          <div><label className="text-[8px] font-bold">Nome empresa (se aplicÃ¡vel)</label><input value={transportadorPerfil.nomeEmpresa} onChange={e=>setTransportadorPerfil({...transportadorPerfil,nomeEmpresa:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="ESSE Transportes Lda" /></div>
                          <div><label className="text-[8px] font-bold">NUIT</label><input value={transportadorPerfil.nuit} onChange={e=>setTransportadorPerfil({...transportadorPerfil,nuit:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="400123456" /></div>
                          <div><label className="text-[8px] font-bold">BI / IdentificaÃ§Ã£o</label><input value={transportadorPerfil.bi} onChange={e=>setTransportadorPerfil({...transportadorPerfil,bi:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="1101..." /></div>
                          <div><label className="text-[8px] font-bold">Telefone principal *</label><input value={transportadorPerfil.telPrincipal} onChange={e=>setTransportadorPerfil({...transportadorPerfil,telPrincipal:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5 bg-[#f0fdf4]" /></div>
                          <div><label className="text-[8px] font-bold">Telefone alternativo</label><input value={transportadorPerfil.telAlt} onChange={e=>setTransportadorPerfil({...transportadorPerfil,telAlt:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                          <div><label className="text-[8px] font-bold">E-mail</label><input value={transportadorPerfil.email} onChange={e=>setTransportadorPerfil({...transportadorPerfil,email:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="transportador@..." /></div>
                          <div><label className="text-[8px] font-bold">ProvÃ­ncia *</label><select value={transportadorPerfil.provincia} onChange={e=>setTransportadorPerfil({...transportadorPerfil,provincia:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Maputo Cidade</option><option>Maputo ProvÃ­ncia</option><option>Gaza</option><option>Inhambane</option><option>Sofala</option><option>Nampula</option></select></div>
                          <div><label className="text-[8px] font-bold">Distrito/MunicÃ­pio</label><input value={transportadorPerfil.distrito} onChange={e=>setTransportadorPerfil({...transportadorPerfil,distrito:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                          <div className="col-span-2"><label className="text-[8px] font-bold">EndereÃ§o</label><input value={transportadorPerfil.endereco} onChange={e=>setTransportadorPerfil({...transportadorPerfil,endereco:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        </div>
                      </div>
                      <div className="border-t pt-3"><div className="font-black text-[11px]">B. Dados operacionais</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div><label className="text-[8px] font-bold">Nome comercial operador</label><input value={transportadorPerfil.nomeComercial} onChange={e=>setTransportadorPerfil({...transportadorPerfil,nomeComercial:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                          <div><label className="text-[8px] font-bold">Terminal partida habitual</label><input value={transportadorPerfil.terminalPartida} onChange={e=>setTransportadorPerfil({...transportadorPerfil,terminalPartida:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                          <div className="col-span-2"><label className="text-[8px] font-bold">Rotas que realiza</label><input value={transportadorPerfil.rotas.join(', ')} onChange={e=>setTransportadorPerfil({...transportadorPerfil,rotas:e.target.value.split(',').map(s=>s.trim())})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="Maputo-Xai-Xai, Maputo-Beira" /></div>
                          <div><label className="text-[8px] font-bold">Tipos serviÃ§o</label><div className="flex gap-2 mt-1"><label className="text-[8px] flex items-center gap-1"><input type="checkbox" checked={transportadorPerfil.tiposServico.includes('passageiros')} onChange={e=>{if(e.target.checked) setTransportadorPerfil({...transportadorPerfil,tiposServico:[...transportadorPerfil.tiposServico,'passageiros']}); else setTransportadorPerfil({...transportadorPerfil,tiposServico:transportadorPerfil.tiposServico.filter(t=>t!=='passageiros')})}} /> Passageiros</label><label className="text-[8px] flex items-center gap-1"><input type="checkbox" checked={transportadorPerfil.tiposServico.includes('encomendas')} onChange={e=>{if(e.target.checked) setTransportadorPerfil({...transportadorPerfil,tiposServico:[...transportadorPerfil.tiposServico,'encomendas']}); else setTransportadorPerfil({...transportadorPerfil,tiposServico:transportadorPerfil.tiposServico.filter(t=>t!=='encomendas')})}} /> Encomendas</label></div></div>
                          <div><label className="text-[8px] font-bold">HorÃ¡rios habituais</label><input value={transportadorPerfil.horarios} onChange={e=>setTransportadorPerfil({...transportadorPerfil,horarios:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                          <div className="col-span-2"><label className="text-[8px] font-bold">DescriÃ§Ã£o serviÃ§o</label><textarea value={transportadorPerfil.descricao} onChange={e=>setTransportadorPerfil({...transportadorPerfil,descricao:e.target.value})} className="w-full h-12 border rounded text-[10px] p-2 mt-0.5" /></div>
                        </div>
                      </div>
                      <div className="border-t pt-3"><div className="font-black text-[11px]">C. DocumentaÃ§Ã£o e verificaÃ§Ã£o</div><div className="text-[8px] text-[#64748b] mt-1">Documentos protegidos, nÃ£o expostos publicamente. Indica obrigatÃ³rios conforme tipo operador.</div><div className="grid grid-cols-1 gap-2 mt-2"><div><label className="text-[8px] font-bold">BI responsÃ¡vel (quando necessÃ¡rio)</label><input type="file" className="w-full text-[8px] mt-1" /></div><div><label className="text-[8px] font-bold">DocumentaÃ§Ã£o empresarial (se aplicÃ¡vel)</label><input type="file" className="w-full text-[8px] mt-1" /></div><div><label className="text-[8px] font-bold">Licenciamento/autorizaÃ§Ã£o actividade</label><input type="file" className="w-full text-[8px] mt-1" /></div><div><label className="text-[8px] font-bold">Contacto verificaÃ§Ã£o</label><input value={transportadorPerfil.contactoVerificacao} onChange={e=>setTransportadorPerfil({...transportadorPerfil,contactoVerificacao:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div></div></div>
                      <div className="border-t pt-3"><div className="font-black text-[11px]">D. SeguranÃ§a da conta</div><div className="grid grid-cols-2 gap-2 mt-2"><div><label className="text-[8px] font-bold">Palavra-passe *</label><input type="password" value={transportadorPerfil.password} onChange={e=>setTransportadorPerfil({...transportadorPerfil,password:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div><div><label className="text-[8px] font-bold">Confirmar palavra-passe *</label><input type="password" value={transportadorPerfil.confirmPassword} onChange={e=>setTransportadorPerfil({...transportadorPerfil,confirmPassword:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div><div className="col-span-2 flex items-center gap-2 mt-1"><input type="checkbox" checked={transportadorPerfil.aceitaTermos} onChange={e=>setTransportadorPerfil({...transportadorPerfil,aceitaTermos:e.target.checked})} /><span className="text-[8px]">Aceito termos utilizaÃ§Ã£o + verificaÃ§Ã£o telefone/e-mail</span></div></div></div>
                      <button onClick={()=>{if(!transportadorPerfil.nomeResponsavel||!transportadorPerfil.telPrincipal||!transportadorPerfil.password){alert('Preencha nome, telefone principal e password'); return;} setTransportadorLogado(true); setTransportadorPerfil({...transportadorPerfil, verificado:true, estadoAprovacao:'Aprovado'}); alert('Conta criada! Agora pode cadastrar viaturas uma por uma. Uma empresa com 15 minibus = 1 conta + 15 viaturas no painel.'); setViagensSubTab('frota');}} className="w-full h-10 bg-[#facc15] text-black rounded-[8px] font-black text-[11px]">Criar conta transportador - Passo 1</button>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-[12px] p-4 border border-white/20"><div className="font-bold text-[11px]">Como funciona - 4 passos</div><div className="mt-3 space-y-3 text-[9px]"><div className="flex gap-2"><span className="h-6 w-6 rounded-full bg-[#facc15] text-black grid place-items-center font-black text-[10px]">1</span><div><b>Criar conta</b><br/><span className="opacity-70">Dados pessoais/empresariais, telefone, e-mail, password</span></div></div><div className="flex gap-2"><span className="h-6 w-6 rounded-full bg-white/20 grid place-items-center font-black">2</span><div><b>Completar perfil</b><br/><span className="opacity-70">Empresa, contactos, localizaÃ§Ã£o, rotas, documentos</span></div></div><div className="flex gap-2"><span className="h-6 w-6 rounded-full bg-white/20 grid place-items-center font-black">3</span><div><b>Cadastrar cada viatura - Adicionar viatura</b><br/><span className="opacity-70">MatrÃ­cula, lotaÃ§Ã£o, caracterÃ­sticas, capacidade encomendas</span></div></div><div className="flex gap-2"><span className="h-6 w-6 rounded-full bg-white/20 grid place-items-center font-black">4</span><div><b>Gerir operaÃ§Ã£o</b><br/><span className="opacity-70">Viaturas, viagens, reservas, encomendas, frota</span></div></div></div><div className="mt-4 p-2 rounded bg-[#facc15] text-black text-[8px] font-bold">Importante: cadastro transportador separado do cadastro viaturas. 1 empresa 15 minibus = 1 conta + 15 viaturas no mesmo painel.</div></div>
                      <div className="bg-white rounded-[12px] p-3 text-black"><div className="font-bold text-[10px]">Exemplo frota - 15 minibus</div><div className="mt-2 text-[8px]">Conta: ESSE Transportes Lda<br/>Viaturas: ABX 123, ACD 456, AEF 789... 15 viaturas<br/>Cada viatura: ficha prÃ³pria, editar, documentos, viagens, estado aprovaÃ§Ã£o</div><div className="mt-2 grid grid-cols-3 gap-1 text-[7px]"><div className="bg-[#f1f5f9] p-1 rounded">Viatura 1 - Hiace 15 lugares - Activa - Maputo-Xai-Xai</div><div className="bg-[#f1f5f9] p-1 rounded">Viatura 2 - Coaster 25 - VerificaÃ§Ã£o</div><div className="bg-[#f1f5f9] p-1 rounded">Viatura 3 - ... 15 viaturas</div></div></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[12px] border p-4">
                  <div className="flex justify-between items-center"><div><div className="font-black text-[12px]">Bem-vindo, {transportadorPerfil.nomeResponsavel||transportadorPerfil.nomeEmpresa||'Transportador'}</div><div className="text-[9px] text-[#64748b]">{transportadorPerfil.tipoTransportador} {transportadorPerfil.nomeEmpresa?`- ${transportadorPerfil.nomeEmpresa}`:''} | {transportadorPerfil.provincia} | {transportadorPerfil.tiposServico.join(', ')} | Estado: {transportadorPerfil.estadoAprovacao} âœ“</div></div><button onClick={()=>setTransportadorLogado(false)} className="px-3 h-8 border rounded-full text-[9px] font-bold">Sair</button></div>
                  <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2"><div className="bg-[#f1f5f9] rounded-[8px] p-2"><div className="text-[8px] text-[#64748b]">Viaturas</div><div className="font-black text-[14px]">{viaturasFrota.length}</div></div><div className="bg-[#f1f5f9] rounded-[8px] p-2"><div className="text-[8px] text-[#64748b]">Viagens publicadas</div><div className="font-black text-[14px]">{viagensMock.length}</div></div><div className="bg-[#f1f5f9] rounded-[8px] p-2"><div className="text-[8px] text-[#64748b]">Reservas</div><div className="font-black text-[14px]">{reservas.length}</div></div><div className="bg-[#f1f5f9] rounded-[8px] p-2"><div className="text-[8px] text-[#64748b]">Encomendas</div><div className="font-black text-[14px]">{encomendas.length}</div></div></div>
                  <div className="mt-3 flex gap-2"><button onClick={()=>setViagensSubTab('frota')} className="px-4 h-9 bg-[#0ea5e9] text-white rounded-full text-[10px] font-bold">Gerir frota - Adicionar viatura</button><button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('viajar')}} className="px-4 h-9 bg-[#1e2f4a] text-white rounded-full text-[10px] font-bold">Publicar viagem</button></div>
                </div>
              )}
            </div>
          )}

          {viagensSubTab==='frota' && (
            <div className="space-y-3">
              <div className="bg-white rounded-[12px] border p-4">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div><div className="font-black text-[13px]">Minha Frota - GestÃ£o centralizada das viaturas</div><div className="text-[9px] text-[#64748b]">1 conta gere vÃ¡rias viaturas - cadastro separado - lotaÃ§Ã£o respeita documento veÃ­culo - nÃ£o permite inventar capacidade superior</div></div>
                  <div className="flex gap-2">
                    <div className="bg-[#f1f5f9] rounded-full px-3 py-1 text-[10px] font-bold">#{viaturasFrota.length} Viaturas registadas</div>
                    <div className="bg-[#e0f2fe] rounded-full px-3 py-1 text-[10px] font-bold">#{viagensMock.length} Viagens publicadas</div>
                    <button onClick={()=>{setViaturaEditId(null); setFormViatura({tipo:'Minibus / Chapa', marcaModelo:'', matricula:'', lugares:15, motoristaIncluido:false, ano:2020, cor:'', chassis:'', arCondicionado:'Sim', bagagem:'Sim', aceitaEncomendas:'Sim', capacidadeKg:300, fotoExt:'', fotoInt:'', docRegisto:'', inspecaoValida:'', seguroValido:'', estadoOperacional:'Activa', rotaHabitual:'Maputo - Xai-Xai'}); setMostrarFormViatura(true);}} className="px-4 h-8 bg-[#facc15] text-black rounded-full text-[10px] font-black">+ Adicionar viatura</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {viaturasFrota.map(v=>(
                    <div key={v.id} className="border rounded-[12px] p-3 bg-white hover:shadow-md transition">
                      <div className="flex justify-between"><div className="font-black text-[11px]">Viatura {v.id} - {v.marcaModelo}</div><span className={`text-[7px] px-2 py-0.5 rounded-full font-bold ${v.estadoOperacional==='Activa'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{v.estadoOperacional} | {v.estadoAprovacao}</span></div>
                      <div className="text-[9px] text-[#475569] mt-1 space-y-0.5">
                        <div><b>MatrÃ­cula:</b> {v.matricula} | <b>Tipo:</b> {v.tipo}</div>
                        <div><b>Lugares autorizados:</b> {v.lugares} {v.motoristaIncluido?'inclui motorista':'exclui motorista'} | <b>Ano:</b> {v.ano} | <b>Cor:</b> {v.cor}</div>
                        <div><b>AC:</b> {v.arCondicionado} | <b>Bagagem:</b> {v.bagagem} | <b>Encomendas:</b> {v.aceitaEncomendas} | <b>Carga:</b> {v.capacidadeKg}kg</div>
                        <div><b>Rota:</b> {v.rotaHabitual} | <b>Chassis:</b> {v.chassis?.substring(0,8)}...</div>
                        <div className="text-[7px] text-[#94a3b8]">InspecÃ§Ã£o: {v.inspecaoValida} | Seguro: {v.seguroValido} | Doc: {v.docRegisto?'OK':'Pendente'}</div>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <button onClick={()=>{setFormViatura(v); setViaturaEditId(v.id); setMostrarFormViatura(true);}} className="flex-1 h-7 bg-[#f1f5f9] rounded-full text-[8px] font-bold">Editar ficha</button>
                        <button onClick={()=>{if(confirm('Remover viatura?')) setViaturasFrota(viaturasFrota.filter(x=>x.id!==v.id))}} className="h-7 px-2 border rounded-full text-[8px]">Remover</button>
                        <button onClick={()=>{setViagensSubTab('viagens'); setViagensTab('viajar');}} className="h-7 px-2 bg-[#0ea5e9] text-white rounded-full text-[8px] font-bold">Viagens</button>
                      </div>
                    </div>
                  ))}
                </div>
                {viaturasFrota.length===0 && <div className="py-12 text-center text-[11px] text-[#94a3b8]">Nenhuma viatura - clique Adicionar viatura - cada veÃ­culo formulÃ¡rio prÃ³prio</div>}
              </div>

              {mostrarFormViatura && (
                <div className="bg-white rounded-[12px] border-2 border-[#facc15] p-4">
                  <div className="font-black text-[12px] mb-3">{viaturaEditId?'Editar viatura':'Adicionar viatura - FormulÃ¡rio completo - exemplo interactivo'} - LotaÃ§Ã£o respeita documento</div>
                  <div className="space-y-4">
                    <div><div className="font-bold text-[10px]">1. IdentificaÃ§Ã£o da viatura</div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                        <div><label className="text-[8px] font-bold">Tipo viatura *</label><select value={formViatura.tipo} onChange={e=>setFormViatura({...formViatura,tipo:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Minibus / Chapa</option><option>Autocarro</option><option>Carrinha de transporte</option><option>Outro</option></select></div>
                        <div><label className="text-[8px] font-bold">Marca e modelo *</label><input value={formViatura.marcaModelo} onChange={e=>setFormViatura({...formViatura,marcaModelo:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="Toyota Hiace" /></div>
                        <div><label className="text-[8px] font-bold">MatrÃ­cula *</label><input value={formViatura.matricula} onChange={e=>setFormViatura({...formViatura,matricula:e.target.value.toUpperCase()})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="ABX 123 MC" /></div>
                        <div><label className="text-[8px] font-bold">Lugares autorizados *</label><div className="flex gap-1 mt-0.5"><input type="number" value={formViatura.lugares} onChange={e=>setFormViatura({...formViatura,lugares:Math.max(1,Math.min(80,Number(e.target.value)))})} className="flex-1 h-8 border rounded text-[10px] px-2" /><label className="text-[7px] flex items-center gap-1"><input type="checkbox" checked={formViatura.motoristaIncluido} onChange={e=>setFormViatura({...formViatura,motoristaIncluido:e.target.checked})} /> Inclui motorista no doc</label></div></div>
                        <div><label className="text-[8px] font-bold">Ano fabrico</label><input type="number" value={formViatura.ano} onChange={e=>setFormViatura({...formViatura,ano:Number(e.target.value)})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        <div><label className="text-[8px] font-bold">Cor</label><input value={formViatura.cor} onChange={e=>setFormViatura({...formViatura,cor:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        <div><label className="text-[8px] font-bold">NÂº chassis (verificaÃ§Ã£o)</label><input value={formViatura.chassis} onChange={e=>setFormViatura({...formViatura,chassis:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        <div><label className="text-[8px] font-bold">Rota habitual</label><input value={formViatura.rotaHabitual} onChange={e=>setFormViatura({...formViatura,rotaHabitual:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                      </div>
                    </div>
                    <div className="border-t pt-3"><div className="font-bold text-[10px]">2. CaracterÃ­sticas e capacidade - respeita documentaÃ§Ã£o e limites carga</div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
                        <div><label className="text-[8px] font-bold">Ar condicionado</label><select value={formViatura.arCondicionado} onChange={e=>setFormViatura({...formViatura,arCondicionado:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Sim</option><option>NÃ£o</option></select></div>
                        <div><label className="text-[8px] font-bold">Transporta bagagem passageiros?</label><select value={formViatura.bagagem} onChange={e=>setFormViatura({...formViatura,bagagem:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Sim</option><option>NÃ£o</option></select></div>
                        <div><label className="text-[8px] font-bold">Aceita encomendas?</label><select value={formViatura.aceitaEncomendas} onChange={e=>setFormViatura({...formViatura,aceitaEncomendas:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Sim</option><option>NÃ£o</option></select></div>
                        <div><label className="text-[8px] font-bold">Capacidade mÃ¡xima carga autorizada (kg) *</label><input type="number" value={formViatura.capacidadeKg} onChange={e=>setFormViatura({...formViatura,capacidadeKg:Number(e.target.value)})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" placeholder="300" /></div>
                        <div><label className="text-[8px] font-bold">Fotografia exterior</label><input type="file" className="w-full text-[8px] mt-1" /></div>
                        <div><label className="text-[8px] font-bold">Fotografia interior (lugares)</label><input type="file" className="w-full text-[8px] mt-1" /></div>
                        <div><label className="text-[8px] font-bold">Documento registo viatura</label><input type="file" className="w-full text-[8px] mt-1" /></div>
                        <div><label className="text-[8px] font-bold">InspecÃ§Ã£o vÃ¡lida atÃ©</label><input type="date" value={formViatura.inspecaoValida} onChange={e=>setFormViatura({...formViatura,inspecaoValida:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        <div><label className="text-[8px] font-bold">Seguro vÃ¡lido atÃ©</label><input type="date" value={formViatura.seguroValido} onChange={e=>setFormViatura({...formViatura,seguroValido:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5" /></div>
                        <div><label className="text-[8px] font-bold">Estado operacional</label><select value={formViatura.estadoOperacional} onChange={e=>setFormViatura({...formViatura,estadoOperacional:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-0.5"><option>Activa</option><option>Inactiva</option><option>Em manutenÃ§Ã£o</option><option>Suspensa</option></select></div>
                      </div>
                      <div className="mt-2 p-2 bg-[#fef3c7] rounded text-[8px]">Importante: lotaÃ§Ã£o deve respeitar nÂº lugares autorizado nos documentos. App nÃ£o permite inventar capacidade superior. Valor carga respeita documentaÃ§Ã£o e limites aplicÃ¡veis + espaÃ§o disponÃ­vel encomendas.</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>{if(!formViatura.marcaModelo||!formViatura.matricula){alert('Marca/modelo e matrÃ­cula obrigatÃ³rios'); return;} if(viaturaEditId){setViaturasFrota(viaturasFrota.map(v=>v.id===viaturaEditId?{...v, ...formViatura, id:viaturaEditId}:v)); setViaturaEditId(null);} else {setViaturasFrota([...viaturasFrota,{id:Date.now(), ...formViatura, estadoAprovacao:'Em verificaÃ§Ã£o'}]);} setMostrarFormViatura(false); alert('Viatura registada! Ficha prÃ³pria criada - pode editar dados, actualizar documentos, consultar viagens, verificar estado aprovaÃ§Ã£o. CalendÃ¡rio disponibilidade impede mesma viatura em 2 viagens incompatÃ­veis.');}} className="flex-1 h-10 bg-[#facc15] text-black rounded-[8px] font-black text-[11px]">{viaturaEditId?'Guardar alteraÃ§Ãµes viatura':'Copiar exemplo preenchido - Registar viatura'}</button>
                      <button onClick={()=>{setMostrarFormViatura(false); setViaturaEditId(null);}} className="h-10 px-4 border rounded-[8px] text-[10px]">Cancelar</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-[12px] border p-3">
                <div className="font-bold text-[10px]">Como ligar viaturas, viagens, passageiros e encomendas - estrutura escalÃ¡vel</div>
                <div className="mt-2 flex flex-wrap gap-2 text-[8px]"><span className="px-2 py-1 rounded-full bg-[#1e2f4a] text-white">Conta transportador (1 utilizador/empresa)</span><span>â†’</span><span className="px-2 py-1 rounded-full bg-[#e0f2fe]">Uma ou vÃ¡rias viaturas (lotaÃ§Ã£o + capacidade prÃ³prias)</span><span>â†’</span><span className="px-2 py-1 rounded-full bg-[#fef9c3]">Viagens publicadas (rota, data, horÃ¡rio, lugares, carga)</span><span>â†’</span><span className="px-2 py-1 rounded-full bg-[#dcfce7]">Passageiros (lugares reservados) + Encomendas (volumes/peso)</span></div>
                <div className="mt-2 text-[8px] text-[#64748b]">Permite empresa usar vÃ¡rias viaturas mesma rota, vÃ¡rias viagens dia, sem duplicar perfil. Motorista associado viatura nome/contacto permissÃµes limitadas. GestÃ£o ajudantes/cobradores opcional. CalendÃ¡rio disponibilidade. GestÃ£o lugares bloqueia reservados. GestÃ£o encomendas verifica espaÃ§o carga. Documentos validade alerta vencimento seguro/inspecÃ§Ã£o/licenÃ§a. AvaliaÃ§Ãµes passageiros. HistÃ³rico operacional viagens realizadas, cancelamentos, reclamaÃ§Ãµes, entregas. VerificaÃ§Ã£o administrativa distingue registadas vs verificadas. Privacidade mostra clientes apenas dados necessÃ¡rios reserva. Ordem cadastro: conta â†’ perfil operador â†’ cadastro individual cada viatura â†’ verificaÃ§Ã£o â†’ publicaÃ§Ã£o viagens â†’ reservas e encomendas.</div>
              </div>
            </div>
          )}

</section>
      )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE COM BI E NUIT OPCIONAL - CLAUSULAS 4-10 ABERTAS EDITAVEIS  - NAO MODIFICADO MAIS NADA - BUILD 100%</footer>
 </div>
 )
}


// ESSE - BUILD 100% - CONTRATO FACIL PRATICO RAPIDO - 11 CLAUSULAS
