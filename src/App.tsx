import { useState, useRef } from "react";
const ESSE_LOGO = "data:image/png;base64,[STRIPPED]";
const ESSE_LOGO_FULL = "data:image/png;base64,[STRIPPED]";
const COR_AZUL = "#3a4f6a";
const COR_DOURADO = "#d4a44a";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
type Pagina = 1|2|3|4|5|6|7|8|9|10|11;
type Tab = "encontrar"|"contratos"|"meus";
type TipoCadastro = "empresa"|"singular"|"cooperativa";
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";

const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa todos os comodos","Lavar louca e organizar cozinha","Zelar pela louca e eletrodomesticos - avisar quebras","Arrumar quartos e fazer camas diariamente","Lavar, passar, dobrar e guardar roupa","Organizar despensa e geladeira","Fazer lista de compras e ir ao mercado","Cozinhar cafe, almoco e jantar","Servir refeicoes e organizar mesa","Cuidar das plantas e quintal","Cuidar das criancas quando solicitado","Receber encomendas e recados","Manter banheiros limpos e desinfetados","Passar e guardar roupas de cama e banho","Nao se responsabiliza por quebra de louca antiga salvo negligencia grave - max 25% salario parcelado"], desc: "Domestico - clausula louca protegida" },
  "Motorista Particular": { titulo: "CONTRATO DE TRABALHO - MOTORISTA PRIVADO", checklist: ["Conduzir empregador e familia com seguranca","Levar e buscar criancas na escola","Levar para consultas, igreja, mercado","Manutencao basica: oleo, pneu, limpeza diaria","Abastecer viatura e controlar consumo","Fazer compras e recados com comprovativo","Lavar viatura 2x por semana","Verificar documentacao e livrete","Cumprir horario rigorosamente","Guardar sigilo absoluto da familia","Cuidar dos bens e nao usar viatura sem autorizacao","Registar quilometragem diaria","Avisar revisoes e inspeccao","Disponivel para viagens inter-provinciais"], desc: "Motorista Privado - Lei 23/2007" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos e tijolos","Reboco interior e exterior liso","Assentar tijoleira e ceramica com nivel","Fundacoes, pilares e vigas conforme projeto","Fazer cinta e laje","Construir muro e passeio","Aplicar chapisco e emboco","Fazer contrapiso nivelado","Assentar portas e janelas","Fazer drenagem e fossa","Acabamentos finos e pintura base","Limpeza da obra diaria","Seguir foto/projeto anexo rigorosamente","Garantir prumo, esquadro e nivel","Usar material fornecido sem desperdicio"], desc: "Pedreiro - anexar foto/projeto" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar moveis em madeira macica/MDF","Instalar portas com fechadura e dobradicas","Instalar janelas e batentes","Fabricar e instalar armarios e roupeiros","Medir, cortar e plainar madeira","Aplicar verniz, tinta e acabamento","Fazer prateleiras e bancadas","Reparar moveis existentes","Instalar rodapes e molduras","Fabricar cozinha modulada","Seguir medidas da foto anexa","Entregar sem pregos a vista","Limpar serragem ao final do dia","Garantia de 3 meses contra defeito fabrica"], desc: "Portas, janelas - anexar foto modelo" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes de correr e basculante","Fabricar grades e janelas de ferro","Soldar estruturas metalicas com reforco","Instalar portoes com nivel e chumbamento","Fabricar tanque e suporte de agua","Reparos em ferro e solda","Aplicar zarcao anti-ferrugem e tinta","Fabricar portao pedonal","Instalar fechadura e cadeado","Medir no local antes de fabricar","Seguir modelo da foto anexa","Entrega com pintura acabada","Garantia contra ferrugem 6 meses"], desc: "Soldar, portoes" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico com disjuntores","Instalar tomadas e interruptores em altura padrao","Instalar iluminacao e lustres","Passar cabos e fios em tubo","Testar instalacao com multimetro","Instalar chuveiro e AC com linha propria","Instalar aterramento e para-raios","Fazer manutencao preventiva","Emitir esquema eletrico final","Usar material certificado","Seguir norma de seguranca","Garantia de instalacao 6 meses"], desc: "Eletrica com garantia" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua fria e quente","Instalar esgotos com caida correta","Instalar sanita, lavatorio e chuveiro","Reparar fugas e trocar vedantes","Instalar autoclismo e torneiras","Instalar bomba de agua e tanque","Desentupir esgotos","Testar pressao sem vazamento","Deixar obra limpa sem cimento nos canos","Garantia contra vazamento 3 meses"], desc: "Canalizacao sem vazamento" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede: lixar, massa corrida, selador","Pintura interior 2 demaos","Pintura exterior com tinta impermeavel","Aplicar textura conforme foto anexa","Pintar teto branco neve","Pintar portas e janelas","Proteger piso e moveis com lona","Retocar falhas apos secagem","Usar cor exata da foto anexa - codigo","Limpar respingos diariamente","Entregar parede sem manchas","Garantia de 1 ano contra descascar"], desc: "Pintura com cor foto anexa" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial e plano de negocios","Servicos administrativos e secretariado","Servicos tecnicos especializados","Assessoria juridica/contabil","Marketing digital e comunicacao","Formacao e treinamento de pessoal","Elaborar relatorios mensais","Reunioes semanais presenciais/online","Cumprir metas e prazos acordados","Sigilo de informacoes da empresa","Entregar material em formato digital","Suporte por WhatsApp em horario comercial"], desc: "Empresas - metas e relatorios" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Descrever servico detalhadamente no campo abaixo","Definir material fornecido por quem","Definir prazo e penalidade por atraso","Definir garantia do servico","Definir horario e local exato","Definir forma de pagamento e recibos","Adicionar fotos de referencia obrigatorio","Acordo de alteracoes so por escrito","Limpeza do local apos servico","Sigilo e cuidado com bens do cliente"], desc: "Formulario livre - descreva tudo" },
};

const CATEGORIAS_25 = ["Carpintaria","Mecanica Auto","Mecanica Industrial","Empreiteiro / Construcao Civil","Eletricista","Serralheiro / Soldador","Canalizacao / Picheleiro","Pintor","Pedreiro","Motorista / Condutor","Domestica / Empregada","Baba / Cuidadora","Jardineiro","Tecnico de Frio / AC","Tecnico Informatica","Alfaiate / Costura","Cabeleireiro / Barbeiro","Vidraceiro","Seguranca","Limpeza Profissional","Montador de Moveis","Soldador Industrial","Estofador","Gesseiro","Carpinteiro"];
const PROVINCIAS = ["Matola","Maputo Cidade","Boane","Marracuene","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","ZambÃ©zia","Tete","Cabo Delgado"];

const PROFISSIONAIS = [
  { ini:"ML", nome:"Maria Langa", func:"Empregada Domestica", cat:"Domestico", local:"Maputo - Polana", provincia:"Maputo Cidade", tipo:"singular" as TipoCadastro, nota:"4.9", trab:"23 trabalhos", preco:7500, disp:"Disponivel", tags:["Verificado","Referencias"], foto:"ML", docs:["BI","Referencias"], fotosTrab:["Casa organizada"], desc:"Domestica com referencia, 5 anos experiencia." },
  { ini:"JM", nome:"Joao Manuel Carpintaria", func:"Carpinteiro", cat:"Construcao", local:"Matola - Machava", provincia:"Matola", tipo:"empresa" as TipoCadastro, nota:"4.8", trab:"34 trabalhos", preco:800, disp:"Disponivel", tags:["Empresa","24h"], foto:"JM", docs:["BI","Alvara","Fotos 40 obras"], fotosTrab:["Cozinha mogno","Roupeiro"], desc:"Oficina 12 anos, moveis sob medida." },
  { ini:"PM", nome:"Pedro Massingue Pedreiro", func:"Pedreiro", cat:"Construcao", local:"Maputo - Zimpeto", provincia:"Maputo Cidade", tipo:"singular" as TipoCadastro, nota:"4.7", trab:"56 trabalhos", preco:700, disp:"Ocupado", tags:["Verificado"], foto:"PM", docs:["BI"], fotosTrab:["Muro","Laje"], desc:"Pedreiro profissional." },
  { ini:"EC", nome:"Esperanca Cossa", func:"Eletricista", cat:"Construcao", local:"Maputo - Sommershield", provincia:"Maputo Cidade", tipo:"singular" as TipoCadastro, nota:"4.9", trab:"41 trabalhos", preco:650, disp:"Disponivel", tags:["Certificado","Verificado"], foto:"EC", docs:["BI","Certificado INCM"], fotosTrab:["Quadro geral"], desc:"Eletricista predial." },
  { ini:"CT", nome:"Carlos Tivane Motorista", func:"Motorista", cat:"Domestico", local:"Matola - Liberdade", provincia:"Matola", tipo:"singular" as TipoCadastro, nota:"4.8", trab:"29 trabalhos", preco:1200, disp:"Disponivel", tags:["Carta C1","Verificado"], foto:"CT", docs:["BI","Carta C1","Certificado defensiva"], fotosTrab:["Viatura V8"], desc:"Motorista executivo 15 anos." },
  { ini:"MM", nome:"Mecanica Boane Auto Lda", func:"Mecanica Auto", cat:"Mecanica", local:"Boane - Centro", provincia:"Boane", tipo:"empresa" as TipoCadastro, nota:"4.9", trab:"96 trabalhos", preco:900, disp:"Disponivel", tags:["Empresa","Scanner"], foto:"MB", docs:["Alvara","Fotos oficina"], fotosTrab:["Motor montado"], desc:"Oficina completa com scanner." },
  { ini:"SZ", nome:"Serralheira Zimpeto Industrial", func:"Serralheiro", cat:"Construcao", local:"Zimpeto - Industrial", provincia:"Maputo Cidade", tipo:"empresa" as TipoCadastro, nota:"4.8", trab:"71 trabalhos", preco:700, disp:"Disponivel", tags:["Empresa","Verificado"], foto:"SZ", docs:["Alvara","Portfolio"], fotosTrab:["Portao 4m"], desc:"Portoes deslizantes e grades." },
];

const PAGAMENTOS = {
  mpesa: { n: "840532899", d: "M-Pesa", c: "bg-[#e4002b]" },
  emola: { n: "864341779", d: "e-Mola", c: "bg-[#ff6b00]" },
  mkesh: { n: "823832513", d: "mKesh", c: "bg-[#3a4f6a]" },
  banco: { n: "000301170814421100321", d: "Standard Bank", c: "bg-[#0033a0]" }
};
type Anexo = { id:string, nome:string, tamanho:string, url:string, dataUrl?:string };

export default function App(){
  const [lang,setLang]=useState<"pt"|"en">("pt");
  const [tab,setTab]=useState<Tab>("encontrar");
  const [tipo,setTipo]=useState<TipoContrato>("Motorista Particular");
  const [tarefasSel,setTarefasSel]=useState<string[]>(MODELOS["Motorista Particular"].checklist.slice(0,6));
  const [tarefasExtra,setTarefasExtra]=useState("");
  const [pagina,setPagina]=useState<Pagina>(1);
  const [anexos,setAnexos]=useState<Anexo[]>([]);
  const [showPag,setShowPag]=useState(false);
  const [metodo,setMetodo]=useState<"mpesa"|"emola"|"mkesh"|"banco">("mpesa");
  const [telPag,setTelPag]=useState("");
  const [processando,setProcessando]=useState(false);
  const [showPin,setShowPin]=useState(false);
  const [bibAberta,setBibAberta]=useState(true);
  const [filtroCat,setFiltroCat]=useState("Todas");
  const [busca,setBusca]=useState("");
  const [buscaLocal,setBuscaLocal]=useState("");
  const [tipoCadastro,setTipoCadastro]=useState<TipoCadastro>("singular");
  const [showPerfil,setShowPerfil]=useState(false);
  const [selectedProf,setSelectedProf]=useState<any>(null);
  const [docAnexosPrestador,setDocAnexosPrestador]=useState<Anexo[]>([]);
  const [formCadastro,setFormCadastro]=useState({ nome:"", nuit:"", bi:"", tel:"", provincia:"Matola", bairro:"", categoria:"Carpintaria", anos:"", desc:"", preco:"", disp:"" });

  const [form,setForm]=useState({ 
    empNome:"artur simao zimba", empBI:"110200011B", empNuit:"401866876", empTel:"823832513", empBairro:"xai xai", empEndereco:"Av. Principal, Bairro Patrice",
    trabNome:"anastancio", trabBI:"1102100mmm", trabNuit:"", trabTel:"840532899", trabEndereco:"xai xai - bairro 2", trabProfissao:"Motorista",
    valor:"7500", diaPagamento:"05", prazo:"30", dataInicio:new Date().toISOString().split('T')[0], 
    local:"xai xai - casa", provincia:"Gaza - Xai-Xai",
    horarioInicio:"06:00", horarioFim:"17:00", diasSemana:"Segunda, Terca, Quarta, Quinta, Sexta, Sabado",
    alimentacao:"Sim - almoco fornecido pelo empregador", alojamento:"Nao", transporte:"Sim - 500MT mes",
    folgasDesc:"Domingo e feriados nacionais. Apos 1 ano: 12 dias ferias pagas conforme Lei 23/2007",
    periodoExp:"90 dias",
    deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens, comunicar avarias, nao usar bens sem autorizacao, vestir-se adequadamente",
    deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade, fornecer material de trabalho, garantir seguranca, fornecer alimentacao",
    rescisaoJusta:"Roubo, violencia, falta grave, embriaguez, desobediencia grave",
    rescisaoAviso:"30 dias"
  });

  const formRef = useRef<HTMLDivElement>(null);
  const todas = [...tarefasSel, ...tarefasExtra.split(",").map(t=>t.trim()).filter(Boolean)];
  const profissionaisFiltrados = PROFISSIONAIS.filter(p=>{
    const matchBusca = !busca || p.func.toLowerCase().includes(busca.toLowerCase()) || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cat.toLowerCase().includes(busca.toLowerCase());
    const matchLocal = !buscaLocal || p.provincia.toLowerCase().includes(buscaLocal.toLowerCase()) || p.local.toLowerCase().includes(buscaLocal.toLowerCase());
    const matchCat = filtroCat==="Todas" || p.cat===filtroCat || p.func===filtroCat;
    return matchBusca && matchLocal && matchCat;
  });
  const handleFiles=(files:FileList|null)=>{ if(!files) return; const novos:Anexo[]=Array.from(files).slice(0,5).map(f=>{ const url=f.type.startsWith("image/")?URL.createObjectURL(f):""; return {id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024/1024).toFixed(2)+" MB",url,dataUrl:url}; }); setAnexos(p=>[...p,...novos].slice(0,10)); };
  const handleFilesPrestador=(files:FileList|null)=>{ if(!files) return; const novos:Anexo[]=Array.from(files).map(f=>({id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024/1024).toFixed(2)+" MB",url:URL.createObjectURL(f)})); setDocAnexosPrestador(p=>[...p,...novos].slice(0,10)); };
  const scrollParaForm=()=>{ setTimeout(()=>{ formRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); },120); };
  const escolherTipo=(t:TipoContrato)=>{ setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,6)); setPagina(1); if(typeof window!=="undefined" && window.innerWidth<1024){ setBibAberta(false); } scrollParaForm(); };
  const irPagina=(p:Pagina)=>{ setPagina(p); scrollParaForm(); };

  const gerarPDFCompleto=async()=>{
    const { jsPDF } = await import("jspdf");
    const doc=new jsPDF({unit:"mm",format:"a4"});
    const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(); 
    const M=15;
    const addCabecalho = (pageNum:number)=>{
      doc.setFillColor(42,61,85);
      doc.rect(0,0,W,22,"F");
      try{ doc.addImage(ESSE_LOGO, "PNG", M, 2, 28, 16); }catch{}
      doc.setTextColor(212,164,74);
      doc.setFontSize(11); doc.setFont("helvetica","bold");
      doc.text("CONTRATO - "+semAcento(tipo).toUpperCase()+" - 11 CLAUSULAS", M+32, 8);
      doc.setTextColor(200,210,225);
      doc.setFontSize(7); doc.setFont("helvetica","normal");
      doc.text("Lei n 23/2007 de 1 de Agosto e Decreto n 40/2008 - ESSE NUIT 401 866 876 - 11 CLAUSULAS DESBLOQUEADAS", M+32, 13);
      doc.setTextColor(255,255,255);
      doc.setFontSize(6);
      doc.text("Pag "+pageNum, W-M-12, 19, {align:"right"});
    };
    const addRodape = ()=>{
      const footerY = H-12;
      doc.setDrawColor(212,164,74); doc.setLineWidth(0.5); doc.line(M, footerY, W-M, footerY);
      doc.setFillColor(245,247,250); doc.rect(0, footerY+0.5, W, 12, "F");
      try{ doc.addImage(ESSE_LOGO, "PNG", M, footerY+2, 12, 7); }catch{}
      doc.setTextColor(42,61,85); doc.setFontSize(6.5); doc.setFont("helvetica","bold");
      doc.text("ESSE - ENERGY SOLUTIONS & SERVICES ENTERPRISE LDA", M+14, footerY+4);
      doc.setFont("helvetica","normal"); doc.setFontSize(5.5);
      doc.text("NUIT 401 866 876 - Xai-Xai - M-Pesa 840532899 | e-Mola 864341779 | mKesh 823832513 | Banco 000301170814421100321 - Contrata.MZ", M+14, footerY+7.5);
      doc.setTextColor(100,100,100); doc.setFontSize(5);
      doc.text("Gerado por Contrata.MZ em "+new Date().toLocaleDateString()+" - Valido Lei 23/2007 Art.29 - ID: "+Math.floor(Math.random()*1000000000), W-M, footerY+10, {align:"right"});
    };
    let y=28; let pageNum=1; addCabecalho(pageNum); addRodape();
    const check=(h=20)=>{ if(y+h>H-18){ doc.addPage(); pageNum++; y=28; addCabecalho(pageNum); addRodape(); } };
    doc.setTextColor(20,20,20);
    const tituloClausula=(n:number,t:string)=>{ check(14); doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.setFillColor(42,61,85); doc.rect(M,y-5,W-M*2,9,"F"); doc.setTextColor(212,164,74); doc.text(n+". "+semAcento(t.toUpperCase()),M+2,y); y+=9; doc.setTextColor(20,20,20); doc.setFont("helvetica","normal"); doc.setFontSize(10); }
    tituloClausula(1,"PARTES - QUEM CONTRATA E QUEM FAZ");
    const partes = `EMPREGADOR: ${form.empNome}, BI/NUIT ${form.empBI} / ${form.empNuit}, Tel ${form.empTel}, Endereco: ${form.empEndereco}, ${form.empBairro}, ${form.provincia}. PROFISSIONAL: ${form.trabNome}, Profissao: ${form.trabProfissao}, BI/NUIT ${form.trabBI} / ${form.trabNuit}, Tel ${form.trabTel}, Endereco: ${form.trabEndereco}.`;
    doc.splitTextToSize(semAcento(partes), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(2,"OBJECTO - FUNCAO E TAREFAS");
    doc.text("Funcao contratada: "+semAcento(tipo),M,y); y+=5; doc.text("Tarefas acordadas ("+todas.length+"):",M,y); y+=5;
    todas.forEach((t,i)=>{ const txt = (i+1)+". "+semAcento(t); doc.splitTextToSize(txt, W-M*2-5).forEach((l:string)=>{ check(6); doc.text(l, M+2, y); y+=5; }); }); y+=2; doc.setFontSize(9); doc.setFont("helvetica","italic"); doc.text("Qualquer alteracao de tarefas so por escrito e assinado por ambos.",M,y); y+=6;
    tituloClausula(3,"HORARIO DE TRABALHO E LOCAL - PROVA LEGAL");
    const horario = `Horario: ${form.horarioInicio} as ${form.horarioFim}, Dias: ${form.diasSemana}. Inicio: ${form.dataInicio}. Local de trabalho: ${form.local}, ${form.provincia}. Este horario serve como prova legal perante Inspeccao do Trabalho.`;
    doc.splitTextToSize(semAcento(horario), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(4,"SALARIO, FORMA DE PAGAMENTO E RECIBO M-PESA");
    const salario = `Salario mensal: ${form.valor} MT. Pagamento ate dia ${form.diaPagamento} de cada mes via M-Pesa/e-Mola/mKesh para ${form.trabTel} do trabalhador. Comprovativo de transferencia obrigatorio como recibo. Adiantamentos so com recibo escrito. Prazo do contrato: ${form.prazo} dias/meses. Transporte: ${form.transporte}.`;
    doc.splitTextToSize(semAcento(salario), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(5,"ALIMENTACAO, ALOJAMENTO E TRANSPORTE");
    const alim = `Alimentacao: ${form.alimentacao}. Alojamento: ${form.alojamento}. Transporte: ${form.transporte}.`;
    doc.splitTextToSize(semAcento(alim), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(6,"FOLGAS, FERIADOS E FERIAS");
    doc.splitTextToSize(semAcento(form.folgasDesc), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(7,"PERIODO EXPERIMENTAL");
    const exp = `Periodo experimental: ${form.periodoExp} a contar de ${form.dataInicio}. Durante este periodo aviso previo e de 15 dias para ambas partes conforme Lei 23/2007.`;
    doc.splitTextToSize(semAcento(exp), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(8,"DEVERES DO PROFISSIONAL");
    doc.splitTextToSize(semAcento(form.deveresTrab), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; });
    if(tipo==="Secretario/a Domestico/a"){ y+=2; doc.setFont("helvetica","bold"); doc.text("CLAUSULA LOUCA PROTEGIDA:",M,y); y+=5; doc.setFont("helvetica","normal"); doc.setFontSize(9); const cl = "Trabalhadora zela pela louca, avisa quebras imediatamente, nao paga quebra acidental salvo negligencia grave comprovada - desconto max 25% salario parcelado em 3x."; doc.splitTextToSize(semAcento(cl), W-M*2).forEach((l:string)=>{ check(5); doc.text(l,M,y); y+=4; }); y+=4; doc.setFontSize(10); } else y+=4;
    tituloClausula(9,"DEVERES DO EMPREGADOR");
    doc.splitTextToSize(semAcento(form.deveresEmp), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(10,"ANEXOS - FOTOS, PROJETOS, DOCUMENTOS - FAZ PARTE INTEGRANTE - ANTES DA VALIDADE");
    doc.setFontSize(9); doc.text("Os anexos abaixo foram aceites por ambas partes e fazem parte integrante deste contrato.",M,y); y+=5; doc.setFontSize(10);
    if(anexos.length===0){ doc.text("Nenhum anexo carregado no sistema. Se anexado via WhatsApp passa a fazer parte.",M,y); y+=5; } else { anexos.forEach((a,i)=>{ check(6); doc.text((i+1)+". "+semAcento(a.nome)+" - "+a.tamanho+" - aceite",M,y); y+=5; }); y+=2; }
    tituloClausula(11,"VALIDADE, ASSINATURAS E CARIMBO ESSE");
    doc.text("Validade legal Art. 29 Lei 23/2007. Contrato escrito protege ambos. ID: "+Math.floor(Math.random()*1000000000000)+" - Contrata.MZ - 11 Clausulas Desbloqueadas",M,y); y+=8;
    check(80); try{ doc.addImage(ESSE_LOGO_FULL, "PNG", W/2-55, y, 110, 28); y+=32; }catch{ try{ doc.addImage(ESSE_LOGO, "PNG", W/2-25, y, 50, 22); y+=24; }catch{} } doc.setDrawColor(42,61,85); doc.setLineWidth(0.8); doc.rect(W/2-55,y,110,28); doc.setTextColor(42,61,85); doc.setFontSize(7); doc.setFont("helvetica","bold"); doc.text("CARIMBO OFICIAL - VALIDADE LEGAL",W/2-22,y+6); doc.setFontSize(6); doc.setFont("helvetica","normal"); doc.text("Gerado por Contrata.MZ em "+new Date().toLocaleDateString()+" as "+new Date().toLocaleTimeString(),W/2-30,y+12); doc.text("Projeto ESSE - Xai-Xai - Mocambique",W/2-24,y+16); doc.setTextColor(20,20,20); y+=38; check(50); doc.setFontSize(10); doc.setFont("helvetica","bold"); doc.text("Assinaturas:",M,y); y+=12; const col1=M, col2=W/2+10; doc.line(col1,y,col1+60,y); doc.line(col2,y,col2+60,y); y+=4; doc.setFontSize(9); doc.text(semAcento(form.empNome||"Contratante"),col1,y); doc.text(semAcento(form.trabNome||"Contratado"),col2,y); y+=6; doc.setFontSize(8); doc.text("Contratante",col1,y); doc.text("Contratado - "+semAcento(tipo),col2,y); y+=10;
    return doc;
  };

  const gerarPDF=async()=>{ const doc=await gerarPDFCompleto(); doc.save("Contrato-11-Clausulas-"+(form.trabNome||"SemNome").replace(/\s+/g,"-")+".pdf"); };
  const compartilharFree=async()=>{
    try{
      const doc=await gerarPDFCompleto();
      const nome="Contrato-"+(form.trabNome||"SemNome").replace(/\s+/g,"-")+".pdf";
      const blob=doc.output("blob");
      const file=new File([blob],nome,{type:"application/pdf"});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        try{ await navigator.share({title:nome, text:`Contrato ${tipo} - ${form.trabNome} - ${form.valor} MZN - 11 clausulas - ESSE NUIT 401866876`, files:[file]} as any); return; }catch(e:any){ if(e?.name==="AbortError") return; }
      }
      const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = nome; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); }, 2000);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if(isMobile){ alert("PDF baixado! Agora vai no WhatsApp, clica no clip ðŸ“Ž > Documento > escolhe o arquivo '"+nome+"' na pasta Downloads."); const textoZap = `*CONTRATO ${tipo.toUpperCase()} - ${form.trabNome}*%0AValor: ${form.valor} MZN%0A${todas.length} tarefas - ${anexos.length} fotos anexas%0A%0APDF ja baixado em Downloads - vou anexar agora.%0AGerado Contrata.MZ - ESSE NUIT 401866876`; window.open(`https://wa.me/?text=${textoZap}`,"_blank"); } else { const texto=`CONTRATO ${semAcento(tipo).toUpperCase()} - ${semAcento(form.trabNome)}%0AValor: ${form.valor} MZN%0A${todas.length} clausulas - ${anexos.length} anexos%0AGerado Contrata.MZ - ESSE - 11 clausulas`; window.open(`https://wa.me/?text=${texto}`,"_blank"); }
    }catch(e){ console.error("Erro share", e); await gerarPDF(); window.open(`https://wa.me/?text=Contrato ${encodeURIComponent(tipo)} - erro ao gerar, PDF baixado`,"_blank"); }
  };
  const pagar=async()=>{ if(metodo!=="banco" && !telPag){ alert("Digite numero"); return; } setProcessando(true); await new Promise(r=>setTimeout(r,1500)); if(metodo!=="banco"){ setShowPin(true); setTimeout(()=>{ setShowPin(false); setProcessando(false); setShowPag(false); gerarPDF(); },3000); } else { setProcessando(false); setShowPag(false); gerarPDF(); } };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-[1600px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#3a4f6a] text-white grid place-items-center font-bold">C</div><div><div className="font-bold text-[14px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div><div className="text-[9px] text-zinc-400 font-bold">Um projeto da ESSE - DESBLOQUEADO</div></div></div>
          <div className="flex items-center gap-3"><div className="hidden md:flex flex-col items-end mr-2"><span className="text-[10px] font-bold text-zinc-400 uppercase">Projeto de</span><span className="text-[12px] font-bold">ESSE - Energy Solutions</span><span className="text-[10px] text-zinc-500">NUIT 401 866 876 | Xai-Xai</span></div><img src={ESSE_LOGO} alt="ESSE" className="h-8 w-auto" /><div className="flex p-1 bg-zinc-100 rounded-lg ml-1"><button onClick={()=>setLang("pt")} className={`px-3 py-1 rounded-md text-[12px] font-bold ${lang==="pt"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-3 py-1 rounded-md text-[12px] font-bold ${lang==="en"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>EN</button></div></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 pt-4">
        <div className="bg-gradient-to-r from-[#0033a0] via-[#2a3d55] to-[#3a4f6a] text-white rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10"><div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">AGORA 11 CLAUSULAS DESBLOQUEADAS</div><div className="text-[18px] md:text-[22px] font-extrabold mt-2 leading-tight max-w-[700px]">Chega de acordo de boca! Contrato legal em 2 minutos.</div><div className="text-[13px] md:text-[14px] text-white/90 mt-2 max-w-[700px] leading-relaxed">Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.</div><div className="mt-3 flex flex-wrap gap-2 text-[11px]"><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">1-11 Desbloqueadas</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">15+ Tarefas por tipo</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">Preview = PDF</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">Anexos antes validade</span></div></div>
          <div className="relative z-10 bg-white text-[#0f172a] rounded-xl p-4 min-w-[300px] shadow-lg"><div className="text-[11px] font-extrabold text-[#0033a0] uppercase tracking-wider">Contrato Completo 11 Clausulas</div><div className="text-[12px] text-[#2a3d55] font-bold mt-1">Sem advogado. Sem complicacao.</div><div className="mt-3 space-y-2 text-[12px]"><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px] font-bold">!</span><span className="font-bold text-[#2a3d55]">Contrato que vale no tribunal</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px]">âœ“</span><span>Recibo M-Pesa automatico</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px]">âœ“</span><span>Fotos viram prova legal</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#d4a44a] text-white grid place-items-center text-[10px]">W</span><span className="font-bold">Envia no WhatsApp na hora</span></div></div><div className="mt-3 p-2 bg-[#fff8ed] border border-[#d4a44a]/30 rounded-lg text-[10px] text-center text-[#2a3d55] font-bold">+ de 1.200 contratos ja gerados em Gaza</div></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex gap-2 p-1 bg-white border rounded-xl w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="encontrar"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="contratos"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="meus"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>MEUS</button></div>
          {tab==="contratos" && (
            <div className="flex p-1 bg-white border-2 rounded-xl w-full lg:w-fit overflow-x-auto gap-1.5">
              <button onClick={()=>irPagina(1)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===1?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>1. Partes</button>
              <button onClick={()=>irPagina(2)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===2?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>2. Objecto ({todas.length})</button>
              <button onClick={()=>irPagina(3)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===3?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>3. Horario</button>
              <button onClick={()=>irPagina(4)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===4?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>4. Salario</button>
              <button onClick={()=>irPagina(5)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===5?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>5. Alimentacao</button>
              <button onClick={()=>irPagina(6)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===6?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>6. Folgas</button>
              <button onClick={()=>irPagina(7)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===7?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>7. Experimental</button>
              <button onClick={()=>irPagina(8)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===8?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>8. Deveres Trab</button>
              <button onClick={()=>irPagina(9)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===9?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>9. Deveres Emp</button>
              <button onClick={()=>irPagina(10)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===10?"bg-orange-500 text-white":"bg-zinc-100"}`}>10. Anexos ({anexos.length})</button>
              <button onClick={()=>irPagina(11)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===11?"bg-[#3a4f6a] text-white":"bg-zinc-100"}`}>11. Validade</button>
            </div>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] px-4 py-6">
        {/* ================= ENCONTRAR - NOVO MARKETPLACE - NAO MEXER CONTRATOS ================= */}
        {tab==="encontrar" && (
          <div className="space-y-6">
            {/* Busca */}
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="font-bold text-[16px]">Encontra o mestre certo na tua zona.</div>
              <div className="text-[13px] text-zinc-600 mt-1">Mecanicos, eletricistas, domesticas, motoristas, pedreiros e mais de 25 categorias. Contacto direto, sem intermediario.</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_240px_120px] gap-3">
                <div className="relative"><span className="absolute left-3 top-3 text-zinc-400">ðŸ”</span><input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="O que precisa? Ex: Serralheiro, Mecanico, Domestica" className="w-full h-11 pl-10 pr-3 border-2 rounded-xl text-[13px]" /></div>
                <div className="relative"><span className="absolute left-3 top-3 text-zinc-400">ðŸ“</span><select value={buscaLocal} onChange={e=>setBuscaLocal(e.target.value)} className="w-full h-11 pl-10 pr-3 border-2 rounded-xl text-[13px]"><option value="">Onde? Matola, Maputo, Boane...</option>{PROVINCIAS.map(p=><option key={p} value={p}>{p}</option>)}</select></div>
                <button className="h-11 bg-[#3a4f6a] text-white rounded-xl font-bold text-[13px]">Pesquisar</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 items-center"><span className="text-[11px] text-zinc-500">Populares:</span>{["Eletricista","Mecanica Auto","Domestica","Motorista","Serralheiro","Carpintaria","Empreiteiro"].map(t=><button key={t} onClick={()=>setBusca(t)} className="px-3 py-1 rounded-full bg-zinc-100 border text-[11px] font-bold hover:bg-[#3a4f6a] hover:text-white">{t}</button>)}</div>
            </div>

            {/* Cadastro em cima */}
            <div className="bg-[#0f172a] text-white rounded-xl p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div><div className="text-[18px] font-extrabold">Cadastra-te como prestador</div><div className="text-[18px] font-extrabold text-[#d4a44a]">e seja encontrado hoje</div><div className="text-[12px] text-white/70 mt-2 max-w-[500px]">Mecanico, eletricista, domestica, motorista, pedreiro, serralheiro, carpintaria, mecanica, empreiteiro... Cria perfil gratuito. Publico entra e contacta direto.</div></div>
                <div className="bg-white/10 border border-white/20 rounded-xl p-3 text-[11px] h-fit"><div className="font-bold">ðŸ›¡ï¸ Documentos protegidos</div><div className="text-white/60">Validacao em 2h</div></div>
              </div>

              <div className="mt-6 bg-white text-zinc-800 rounded-xl p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider">Tipo de cadastro * - Escolha o melhor nome</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={()=>setTipoCadastro("empresa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="empresa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white border-zinc-200"}`}><div className="font-bold text-[13px]">ðŸ¢ EMPRESA</div><div className="text-[11px] text-zinc-600 mt-1">Micro, Pequena Empresa - Carpintaria, Mecanica, Empreiteiro</div></button>
                  <button onClick={()=>setTipoCadastro("singular")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="singular"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white border-zinc-200"}`}><div className="font-bold text-[13px]">ðŸ‘¤ PROFISSIONAL INDIVIDUAL / SINGULAR</div><div className="text-[11px] text-zinc-600 mt-1">Freelancer - Mecanico viaturas, Eletricista, Domestica, Motorista autonomo</div></button>
                  <button onClick={()=>setTipoCadastro("cooperativa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="cooperativa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white border-zinc-200"}`}><div className="font-bold text-[13px]">ðŸ‘¥ COOPERATIVA / ASSOCIACAO / EQUIPE</div><div className="text-[11px] text-zinc-600 mt-1">Equipa organizada - Limpeza, Seguranca, Construcao</div></button>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="text-[11px] font-bold uppercase">Nome empresa ou Nome completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="Ex: Joao Mecanica Matola" /></div>
                  <div><label className="text-[11px] font-bold uppercase">NUIT (opcional para singular)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="401..." /></div>
                  <div><label className="text-[11px] font-bold uppercase">BI *</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro,bi:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold uppercase">Telefone / WhatsApp *</label><input value={formCadastro.tel} onChange={e=>setFormCadastro({...formCadastro,tel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="84..." /></div>
                  <div><label className="text-[11px] font-bold uppercase">Provincia / Cidade / Municipio / Distrito *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{PROVINCIAS.map(p=><option key={p}>{p}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold uppercase">Bairro *</label><input value={formCadastro.bairro} onChange={e=>setFormCadastro({...formCadastro,bairro:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="Liberdade" /></div>
                  <div><label className="text-[11px] font-bold uppercase">Categoria principal *</label><select value={formCadastro.categoria} onChange={e=>setFormCadastro({...formCadastro,categoria:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{CATEGORIAS_25.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold uppercase">Anos experiencia</label><input value={formCadastro.anos} onChange={e=>setFormCadastro({...formCadastro,anos:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="5 anos" /></div>
                  <div className="md:col-span-2"><label className="text-[11px] font-bold uppercase">Descricao servicos *</label><textarea value={formCadastro.desc} onChange={e=>setFormCadastro({...formCadastro,desc:e.target.value})} className="mt-1 w-full min-h-[70px] p-3 border-2 rounded-lg text-[13px]" placeholder="Descreve o que faz..." /></div>
                  <div><label className="text-[11px] font-bold uppercase">Preco base / hora ou servico</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="800MT/h" /></div>
                  <div><label className="text-[11px] font-bold uppercase">Disponibilidade</label><input value={formCadastro.disp} onChange={e=>setFormCadastro({...formCadastro,disp:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" placeholder="Seg-Sab 07h-18h" /></div>
                </div>

                <div className="mt-5">
                  <label className="text-[11px] font-bold uppercase">Anexar documentos * - BI, certificado, carta conducao, fotos trabalhos, alvara</label>
                  <label className="mt-2 w-full min-h-[110px] border-2 border-dashed border-[#d4a44a] rounded-xl grid place-items-center p-4 cursor-pointer bg-[#fff8ed] hover:bg-[#fff3d6]">
                    <input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>handleFilesPrestador(e.target.files)} />
                    <div className="text-center"><div className="w-10 h-10 rounded-full bg-[#d4a44a] text-white grid place-items-center mx-auto">+</div><div className="font-bold text-[13px] mt-2">Arraste BI frente e verso, Certificado habilitacoes, Carta conducao, Fotos trabalhos, Alvara</div><div className="text-[11px] text-zinc-500">JPG, PNG, PDF - max 5MB cada</div></div>
                  </label>
                  {docAnexosPrestador.length>0 && <div className="mt-3 space-y-2">{docAnexosPrestador.map(a=><div key={a.id} className="flex gap-2 items-center border p-2 rounded-xl bg-white"><div className="w-10 h-10 bg-blue-100 rounded grid place-items-center text-[9px] font-bold">{a.nome.split(".").pop()?.toUpperCase()}</div><div className="flex-1"><div className="text-[11px] font-bold truncate">{a.nome}</div><div className="text-[10px] text-zinc-500">{a.tamanho}</div></div><button onClick={()=>setDocAnexosPrestador(p=>p.filter(x=>x.id!==a.id))} className="w-7 h-7 bg-red-50 text-red-600 rounded-full">x</button></div>)}</div>}
                </div>

                <button onClick={()=>alert("Cadastrado como "+tipoCadastro.toUpperCase()+"! Agora aparece no ENCONTRAR para publico contactar. Docs: "+docAnexosPrestador.length)} className="mt-5 w-full h-12 bg-[#3a4f6a] text-white rounded-xl font-bold">Cadastrar e aparecer no ENCONTRAR - {tipoCadastro.toUpperCase()}</button>
              </div>
            </div>

            {/* Lista embaixo */}
            <div className="bg-white border rounded-xl p-5">
              <div className="flex justify-between items-center"><div className="font-bold">Profissionais verificados - {profissionaisFiltrados.length} encontrados - 18+ em todo pais</div><div className="flex gap-2">{["Todas","Domestico","Construcao","Mecanica"].map(c=><button key={c} onClick={()=>setFiltroCat(c)} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${filtroCat===c?"bg-[#3a4f6a] text-white":"bg-white"}`}>{c}</button>)}</div></div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profissionaisFiltrados.map(p=>(
                  <div key={p.ini+p.nome} className="border-2 rounded-xl p-4 hover:border-[#d4a44a] transition">
                    <div className="flex gap-3"><div className="w-12 h-12 rounded-full bg-[#3a4f6a] text-white grid place-items-center font-bold">{p.foto}</div><div className="flex-1"><div className="font-bold text-[13px] leading-tight">{p.nome}</div><div className="text-[11px] text-zinc-600">{p.func}</div><div className="flex gap-1 mt-1"><span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${p.tipo==="empresa"?"bg-blue-50 border-blue-200 text-blue-700":p.tipo==="cooperativa"?"bg-purple-50 border-purple-200 text-purple-700":"bg-green-50 border-green-200 text-green-700"}`}>{p.tipo==="empresa"?"EMPRESA":p.tipo==="cooperativa"?"COOPERATIVA":"SINGULAR"}</span>{p.tags.map(t=><span key={t} className="px-2 py-0.5 rounded-full bg-zinc-100 border text-[9px]">{t}</span>)}</div></div></div>
                    <div className="mt-3 text-[11px] text-zinc-600">ðŸ“ {p.local} â€¢ â­ {p.nota} ({p.trab}) â€¢ ðŸ’° a partir {p.preco}MT/h</div>
                    <div className="mt-2 text-[11px]">{p.desc}</div>
                    <div className="mt-3 grid grid-cols-3 gap-2"><button onClick={()=>{setSelectedProf(p); setShowPerfil(true);}} className="h-8 rounded-lg bg-white border font-bold text-[11px]">Ver Perfil</button><button onClick={()=>window.open(`https://wa.me/258${p.func}?text=Ola ${p.nome}`,"_blank")} className="h-8 rounded-lg bg-[#25D366] text-white font-bold text-[11px]">WhatsApp</button><button className="h-8 rounded-lg bg-[#3a4f6a] text-white font-bold text-[11px]">Ligar</button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTRATOS - NAO MEXER - CODIGO ORIGINAL */}
        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr_380px] gap-4">
            <div className="bg-white border rounded-xl p-3 h-fit lg:sticky lg:top-[76px]">
              <div className="flex items-center justify-between"><div><div className="font-bold text-[13px]">Biblioteca 10+ - 15 tarefas cada</div><div className="text-[11px] text-zinc-500">Todas desbloqueadas</div><div className="text-[11px] font-bold mt-1 text-[#2a3d55]">Escolhido: {tipo} ({MODELOS[tipo].checklist.length})</div></div><button onClick={()=>setBibAberta(!bibAberta)} className="lg:hidden px-3 py-1.5 rounded-lg bg-zinc-100 text-[11px] font-bold">{bibAberta?"Fechar X":"Trocar"}</button></div>
              <div className={`${bibAberta?"block":"hidden lg:block"} mt-3 space-y-2`}>
                {(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const ativo=tipo===t; return <button key={t} onClick={()=>escolherTipo(t)} className={`w-full text-left p-3 rounded-xl border flex gap-2.5 ${ativo?"bg-[#fff8ed] border-[#d4a44a]":"bg-white"}`}><div className="w-7 h-7 rounded-full bg-white border grid place-items-center text-[10px] font-bold">{t.slice(0,2).toUpperCase()}</div><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc} - {MODELOS[t].checklist.length} tarefas</div></div><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${ativo?"bg-[#3a4f6a] border-[#3a4f6a] text-white":"border-zinc-300"}`}>{ativo?"âœ“":""}</div></button>})}
              </div>
            </div>

            <div ref={formRef} className="bg-white border rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold text-[13px]">{pagina===1?"CLAUSULA 1: PARTES":pagina===2?"CLAUSULA 2: OBJECTO E TAREFAS - "+todas.length+" TAREFAS":pagina===3?"CLAUSULA 3: HORARIO E LOCAL":pagina===4?"CLAUSULA 4: SALARIO E PAGAMENTO":pagina===5?"CLAUSULA 5: ALIMENTACAO E ALOJAMENTO":pagina===6?"CLAUSULA 6: FOLGAS E FERIAS":pagina===7?"CLAUSULA 7: PERIODO EXPERIMENTAL":pagina===8?"CLAUSULA 8: DEVERES DO TRABALHADOR":pagina===9?"CLAUSULA 9: DEVERES DO EMPREGADOR":pagina===10?"CLAUSULA 10: ANEXOS (ANTES VALIDADE)":"CLAUSULA 11: VALIDADE + PREVIEW FINAL"}</h3><span className="px-2 py-0.5 rounded-full bg-blue-50 border text-[11px] font-bold">{pagina}/11 DESBLOQUEADA</span></div>
              <div className="mt-5">
                {pagina===1 && (<div className="space-y-4">
                  <div className="font-bold text-[13px] text-blue-800">CLAUSULA 1 - PARTES - Quem contrata e quem faz - EDITAVEL</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Nome Contratante *</label><input value={form.empNome} onChange={e=>setForm({...form,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div><div><label className="text-[11px] font-bold uppercase">BI / NUIT Contratante</label><input value={form.empBI} onChange={e=>setForm({...form,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div></div>
                  <div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">NUIT Empresa</label><input value={form.empNuit} onChange={e=>setForm({...form,empNuit:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div><div><label className="text-[11px] font-bold uppercase">Tel Contratante</label><input value={form.empTel} onChange={e=>setForm({...form,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div></div>
                  <div><label className="text-[11px] font-bold uppercase">Endereco Completo Contratante</label><input value={form.empEndereco} onChange={e=>setForm({...form,empEndereco:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div>
                  <div className="h-px bg-zinc-200 my-2"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Nome Profissional *</label><input value={form.trabNome} onChange={e=>setForm({...form,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div><div><label className="text-[11px] font-bold uppercase">Profissao</label><input value={form.trabProfissao} onChange={e=>setForm({...form,trabProfissao:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div></div>
                  <div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">BI Profissional</label><input value={form.trabBI} onChange={e=>setForm({...form,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div><div><label className="text-[11px] font-bold uppercase">Tel Profissional (M-Pesa)</label><input value={form.trabTel} onChange={e=>setForm({...form,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div></div>
                  <div><label className="text-[11px] font-bold uppercase">Endereco Profissional</label><input value={form.trabEndereco} onChange={e=>setForm({...form,trabEndereco:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div>
                  <button onClick={()=>irPagina(2)} className="w-full h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo - Clausula 2 Objecto ({todas.length} tarefas)</button>
                </div>)}
                {pagina===2 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 2 - OBJECTO - {tipo.toUpperCase()} - {MODELOS[tipo].checklist.length} TAREFAS DISPONIVEIS</div><div className="p-2 bg-blue-50 border rounded-lg text-[11px]">Clique nas tarefas para selecionar. Todas selecionadas vao para preview e PDF automaticamente.</div><div className="flex flex-wrap gap-2">{MODELOS[tipo].checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-2 rounded-full text-[12px] border text-left ${ativo?"bg-[#3a4f6a] text-white border-[#3a4f6a]":"bg-white border-zinc-300"}`}>{ativo?"âœ“ ":""} {t}</button>})}</div><div><label className="text-[11px] font-bold uppercase">Acrescentar tarefas extras (separar por virgula) - VAI PARA PDF</label><textarea value={tarefasExtra} onChange={e=>setTarefasExtra(e.target.value)} placeholder="Ex: Fazer manutencao da piscina, lavar carro 1x semana..." className="mt-1 w-full min-h-[80px] p-3 rounded-xl border-2 text-[13px]" /></div><div className="flex gap-2"><button onClick={()=>irPagina(1)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 1</button><button onClick={()=>irPagina(3)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 3.Horario</button></div></div>)}
                {pagina===3 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 3 - HORARIO E LOCAL - EDITAVEL - VAI PARA PDF</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Hora Inicio</label><input type="time" value={form.horarioInicio} onChange={e=>setForm({...form,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div><label className="text-[11px] font-bold uppercase">Hora Fim</label><input type="time" value={form.horarioFim} onChange={e=>setForm({...form,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div></div><div><label className="text-[11px] font-bold uppercase">Dias da semana (editavel)</label><input value={form.diasSemana} onChange={e=>setForm({...form,diasSemana:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[13px]" /></div><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Data Inicio</label><input type="date" value={form.dataInicio} onChange={e=>setForm({...form,dataInicio:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div><label className="text-[11px] font-bold uppercase">Local Trabalho</label><input value={form.local} onChange={e=>setForm({...form,local:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div></div><div><label className="text-[11px] font-bold uppercase">Provincia</label><input value={form.provincia} onChange={e=>setForm({...form,provincia:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div className="flex gap-2"><button onClick={()=>irPagina(2)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 2</button><button onClick={()=>irPagina(4)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 4.Salario</button></div></div>)}
                {pagina===4 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 4 - SALARIO E PAGAMENTO - EDITAVEL</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Valor MZN *</label><input value={form.valor} onChange={e=>setForm({...form,valor:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 font-bold" /></div><div><label className="text-[11px] font-bold uppercase">Dia pagamento</label><input value={form.diaPagamento} onChange={e=>setForm({...form,diaPagamento:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div></div><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Prazo contrato</label><input value={form.prazo} onChange={e=>setForm({...form,prazo:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div><label className="text-[11px] font-bold uppercase">Transporte</label><input value={form.transporte} onChange={e=>setForm({...form,transporte:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div></div><div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[12px]">Pagamento para {form.trabTel} via M-Pesa ate dia {form.diaPagamento} - comprovativo obrigatorio como recibo.</div><div className="flex gap-2"><button onClick={()=>irPagina(3)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 3</button><button onClick={()=>irPagina(5)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 5</button></div></div>)}
                {pagina===5 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 5 - ALIMENTACAO E ALOJAMENTO - EDITAVEL</div><div><label className="text-[11px] font-bold uppercase">Alimentacao (editavel - vai para PDF)</label><textarea value={form.alimentacao} onChange={e=>setForm({...form,alimentacao:e.target.value})} className="mt-1 w-full min-h-[60px] p-3 rounded-xl border-2 text-[13px]" /></div><div><label className="text-[11px] font-bold uppercase">Alojamento</label><input value={form.alojamento} onChange={e=>setForm({...form,alojamento:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div className="flex gap-2"><button onClick={()=>irPagina(4)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 4</button><button onClick={()=>irPagina(6)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 6.Folgas</button></div></div>)}
                {pagina===6 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 6 - FOLGAS E FERIAS - EDITAVEL</div><div><label className="text-[11px] font-bold uppercase">Descricao folgas, feriados, ferias - VAI PARA PDF</label><textarea value={form.folgasDesc} onChange={e=>setForm({...form,folgasDesc:e.target.value})} className="mt-1 w-full min-h-[100px] p-3 rounded-xl border-2 text-[13px]" /></div><div className="flex gap-2"><button onClick={()=>irPagina(5)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 5</button><button onClick={()=>irPagina(7)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 7.Experimental</button></div></div>)}
                {pagina===7 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 7 - PERIODO EXPERIMENTAL - EDITAVEL</div><div><label className="text-[11px] font-bold uppercase">Duracao periodo experimental</label><input value={form.periodoExp} onChange={e=>setForm({...form,periodoExp:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div><div className="p-3 bg-zinc-50 border rounded-xl text-[12px]">A contar de {form.dataInicio}, {form.periodoExp} dias. Aviso previo 15 dias neste periodo conforme Lei 23/2007.</div><div className="flex gap-2"><button onClick={()=>irPagina(6)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 6</button><button onClick={()=>irPagina(8)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 8.Deveres Trab</button></div></div>)}
                {pagina===8 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 8 - DEVERES DO PROFISSIONAL - EDITAVEL</div><div><label className="text-[11px] font-bold uppercase">Deveres do profissional - VAI PARA PDF</label><textarea value={form.deveresTrab} onChange={e=>setForm({...form,deveresTrab:e.target.value})} className="mt-1 w-full min-h-[100px] p-3 rounded-xl border-2 text-[13px]" /></div>{tipo==="Secretario/a Domestico/a" && <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px]"><b>Clausula Louca protegida</b> sera adicionada automaticamente no PDF se tipo domestico.</div>}<div className="flex gap-2"><button onClick={()=>irPagina(7)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 7</button><button onClick={()=>irPagina(9)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 9.Deveres Emp</button></div></div>)}
                {pagina===9 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 9 - DEVERES DO EMPREGADOR E RESCISAO - EDITAVEL</div><div><label className="text-[11px] font-bold uppercase">Deveres do empregador - VAI PARA PDF</label><textarea value={form.deveresEmp} onChange={e=>setForm({...form,deveresEmp:e.target.value})} className="mt-1 w-full min-h-[80px] p-3 rounded-xl border-2 text-[13px]" /></div><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold uppercase">Justa causa</label><input value={form.rescisaoJusta} onChange={e=>setForm({...form,rescisaoJusta:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2 text-[12px]" /></div><div><label className="text-[11px] font-bold uppercase">Aviso sem justa causa</label><input value={form.rescisaoAviso} onChange={e=>setForm({...form,rescisaoAviso:e.target.value})} className="mt-1 w-full h-10 px-3 rounded-lg border-2" /></div></div><div className="flex gap-2"><button onClick={()=>irPagina(8)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 8</button><button onClick={()=>irPagina(10)} className="flex-1 h-11 bg-orange-500 text-white rounded-xl font-bold">Proximo 10.Anexos</button></div></div>)}
                {pagina===10 && (<div className="space-y-4"><div className="border-2 border-dashed border-orange-400 rounded-xl p-5"><div className="font-bold text-[13px]">CLAUSULA 10 - ANEXOS - ANTES DA VALIDADE COMO PEDISTE - EDITAVEL</div><div className="text-[11px] text-zinc-600 mt-1">Anexos vem ANTES da Validade, fazem parte integrante. Fotos viram prova legal.</div><label className="mt-4 w-full min-h-[120px] border-2 border-dashed rounded-xl grid place-items-center p-5 cursor-pointer hover:bg-blue-50"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>handleFiles(e.target.files)} /><div className="text-center"><div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center mx-auto text-[20px]">+</div><div className="font-bold text-[13px] mt-2">Clique para anexar fotos/projetos</div><div className="text-[11px] text-zinc-500">JPG, PNG, PDF - max 5MB cada - ate 10 arquivos</div></div></label>{anexos.length>0 && <div className="mt-3 grid grid-cols-1 gap-2">{anexos.map(a=>(<div key={a.id} className="flex gap-2 items-center border-2 p-2 rounded-xl bg-white"><div className="w-12 h-12 bg-blue-100 rounded-lg overflow-hidden grid place-items-center">{a.url ? <img src={a.url} className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold">{a.nome.split(".").pop()?.toUpperCase()}</span>}</div><div className="flex-1"><div className="text-[11px] font-bold truncate">{a.nome}</div><div className="text-[10px] text-zinc-500">{a.tamanho}</div></div><button onClick={()=>setAnexos(p=>p.filter(x=>x.id!==a.id))} className="w-7 h-7 bg-red-50 text-red-600 rounded-full">x</button></div>))}</div>}</div><div className="flex gap-2"><button onClick={()=>irPagina(9)} className="flex-1 h-11 border-2 rounded-xl font-bold">Voltar 9</button><button onClick={()=>irPagina(11)} className="flex-1 h-11 bg-[#3a4f6a] text-white rounded-xl font-bold">Proximo 11.Validade</button></div></div>)}
                {pagina===11 && (<div className="space-y-4"><div className="font-bold text-[13px]">CLAUSULA 11 - VALIDADE + PREVIEW FINAL + 2 OPCOES</div><div className="bg-zinc-50 border-2 rounded-xl p-4"><div className="font-bold text-[12px]">Resumo 11 Clausulas: {tipo} - {form.valor} MZN - {todas.length} tarefas - {anexos.length} anexos ANTES validade</div><div className="text-[11px] text-zinc-600 mt-1">Validade legal Art.29 Lei 23/2007. Carimbo ESSE no meio. Tudo que editou aparece aqui e no PDF.</div><div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3"><button onClick={compartilharFree} className="h-[60px] rounded-xl bg-[#3a4f6a] text-white font-bold text-[13px] flex flex-col items-center justify-center"><span>FREE Gratis - Testar agora</span><span className="text-[11px] font-normal opacity-90">WhatsApp + PDF completo 11 clausulas</span></button><button onClick={()=>setShowPag(true)} className="h-[60px] rounded-xl bg-[#2a3d55] text-white font-bold text-[13px] flex flex-col items-center justify-center"><span>PAGO 200MT - Contas ESSE</span><span className="text-[11px] font-normal opacity-90">Azul - M-Pesa e-Mola mKesh Banco</span></button></div></div><button onClick={()=>irPagina(10)} className="w-full h-11 border-2 rounded-xl font-bold">Voltar 10.Anexos</button></div>)}
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4 h-fit lg:sticky lg:top-[76px]">
              <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase">Preview AO VIVO - 11 Clausulas = PDF</span><span className="px-2 py-0.5 rounded-full bg-[#fff8ed] border text-[10px] font-bold">{anexos.length} anexos antes validade</span></div>
              <div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[11px] font-mono leading-relaxed">
                CONTRATO {tipo.toUpperCase()} - 11 CLAUSULAS DESBLOQUEADAS<br/>Lei 23/2007 e Decreto 40/2008<br/><br/>1.PARTES:<br/>Contratante: {form.empNome} BI:{form.empBI} NUIT:{form.empNuit}<br/>Tel:{form.empTel} End:{form.empEndereco}<br/>Profissional: {form.trabNome} ({form.trabProfissao})<br/>BI:{form.trabBI} Tel:{form.trabTel}<br/>End:{form.trabEndereco}<br/><br/>2.OBJECTO: {tipo} - {todas.length} TAREFAS:<br/>{todas.map((t,i)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3.HORARIO: {form.horarioInicio} as {form.horarioFim} - {form.diasSemana}<br/>Inicio:{form.dataInicio} Local:{form.local} - {form.provincia}<br/><br/>4.SALARIO: {form.valor} MZN ate dia {form.diaPagamento} via M-Pesa {form.trabTel}<br/>Prazo:{form.prazo} Transporte:{form.transporte}<br/><br/>5.ALIMENTACAO: {form.alimentacao}<br/>ALOJAMENTO: {form.alojamento}<br/><br/>6.FOLGAS: {form.folgasDesc}<br/><br/>7.EXPERIMENTAL: {form.periodoExp} dias desde {form.dataInicio}<br/><br/>8.DEVERES TRAB: {form.deveresTrab}<br/><br/>9.DEVERES EMP: {form.deveresEmp}<br/>RESCISAO: Justa:{form.rescisaoJusta} Aviso:{form.rescisaoAviso}<br/><br/>10.ANEXOS ({anexos.length}) ANTES VALIDADE:<br/>{anexos.length>0? anexos.map(a=>a.nome).join(", ") : "Nenhum - faz parte se anexado via WhatsApp"}<br/><br/>11.VALIDADE: Art.29 Lei 23/2007 ID:{Math.floor(Math.random()*1000)}<br/><br/>ESSE NUIT 401 866 876 Xai-Xai<br/>Gerado Contrata.MZ - 11 clausulas
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={compartilharFree} className="h-10 bg-[#3a4f6a] text-white rounded-xl font-bold text-[11px]">FREE PDF + WhatsApp</button><button onClick={()=>setShowPag(true)} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold text-[11px]">PAGO 200MT</button></div>
              <div className="mt-3 flex items-center gap-2"><img src={ESSE_LOGO} className="h-8 w-auto" /><span className="text-[10px] text-zinc-500">ESSE - NUIT 401 866 876<br/>Xai-Xai - Preview = PDF final</span></div>
            </div>
          </div>
        )}

        {tab==="meus" && (
          <div className="bg-white border rounded-xl p-6 text-center py-20"><div className="font-bold">MEUS CONTRATOS</div><div className="text-[12px] text-zinc-500 mt-2">Historico de contratos gerados - 1.200+ em Gaza</div></div>
        )}
      </main>

      {showPerfil && selectedProf && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={()=>setShowPerfil(false)}>
          <div className="bg-white rounded-xl w-full max-w-[560px] p-5 max-h-[90vh] overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between"><div className="flex gap-3"><div className="w-14 h-14 rounded-full bg-[#3a4f6a] text-white grid place-items-center font-bold">{selectedProf.foto}</div><div><div className="font-bold">{selectedProf.nome}</div><div className="text-[12px] text-zinc-600">{selectedProf.func}</div><div className="text-[11px]">â­ {selectedProf.nota} â€¢ {selectedProf.trab} â€¢ {selectedProf.local}</div></div></div><button onClick={()=>setShowPerfil(false)} className="w-8 h-8 rounded-full bg-zinc-100">âœ•</button></div>
            <div className="mt-4 space-y-3 text-[13px]"><div><b>Sobre:</b> {selectedProf.desc}</div><div><b>Documentos verificados:</b> {selectedProf.docs?.join(", ")}</div><div><b>Fotos trabalhos:</b> {selectedProf.fotosTrab?.join(", ")}</div></div>
            <div className="mt-5 grid grid-cols-2 gap-3"><button onClick={()=>{setShowPerfil(false); setTab("contratos"); setForm({...form,trabNome:selectedProf.nome,trabProfissao:selectedProf.func});}} className="h-11 rounded-xl bg-[#3a4f6a] text-white font-bold">GERAR CONTRATO 11 CLAUSULAS</button><button onClick={()=>window.open(`https://wa.me/258840000000?text=Ola ${selectedProf.nome}`,"_blank")} className="h-11 rounded-xl bg-[#25D366] text-white font-bold">WhatsApp</button></div>
          </div>
        </div>
      )}

      {showPag && (<div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"><div className="bg-white rounded-xl w-full max-w-[420px] p-5 shadow-2xl"><div className="font-bold">Pagamento 200MT - Contas ESSE</div><div className="text-[12px] text-zinc-600 mt-1">M-Pesa 840532899, e-Mola 864341779, mKesh 823832513, Banco 000301170814421100321</div><div className="mt-4 space-y-2">{Object.entries(PAGAMENTOS).map(([k,v]:any)=>{const ativo=metodo===k; return <button key={k} onClick={()=>setMetodo(k as any)} className={`w-full text-left p-3 rounded-xl border-2 flex gap-2 ${ativo?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className={`w-8 h-8 rounded-lg ${v.c} text-white grid place-items-center font-bold text-[11px]`}>{v.d.slice(0,2).toUpperCase()}</div><div><div className="font-bold text-[12px]">{v.d}</div><div className="text-[11px] text-zinc-500">{v.n}</div></div></button>})}</div>{metodo!=="banco" && <div className="mt-3"><label className="text-[11px] font-bold uppercase">Seu numero {(PAGAMENTOS as any)[metodo].d}</label><input value={telPag} onChange={e=>setTelPag(e.target.value)} placeholder="84xxxxxxx" className="w-full h-10 px-3 border-2 rounded-xl mt-1" /></div>}<div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setShowPag(false)} className="h-10 border rounded-xl font-bold">Usar FREE</button><button disabled={processando} onClick={pagar} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold">{processando?"Processando...":"Pagar 200MT"}</button></div></div></div>)}
      {showPin && (<div className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4"><div className="bg-white rounded-xl w-full max-w-[360px] p-5 text-center"><div className="font-bold">Pedido Enviado para {telPag}</div><div className="text-[12px] text-zinc-600 mt-2">Popup PIN no celular {(PAGAMENTOS as any)[metodo].d} - conta {(PAGAMENTOS as any)[metodo].n}</div></div></div>)}
      <footer className="mt-10 bg-[#0f172a] text-white py-6"><div className="mx-auto max-w-[1600px] px-4 flex justify-between items-center"><div className="flex items-center gap-3"><img src={ESSE_LOGO} className="h-10 bg-white rounded-lg p-1" /><div><div className="font-bold text-[13px]">ESSE - ENERGY SOLUTIONS & SERVICES - 11 CLAUSULAS DESBLOQUEADAS</div><div className="text-[11px] text-white/60">NUIT 401 866 876 - Xai-Xai - Preview ao vivo = PDF final - Chega de acordo de boca.</div></div></div></div></footer>
    </div>
  );
}
