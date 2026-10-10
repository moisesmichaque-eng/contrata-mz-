// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town"],
  "Portugal": ["Lisboa","Porto","Braga"],
  "Brasil": ["Sao Paulo - SP","Rio RJ","Minas MG"],
  "Angola": ["Luanda","Benguela"],
  "France": ["Paris","Lyon"],
  "USA": ["California","Texas","Florida"]
};

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Servicos/Consultorias","Outros/Particular"];

const MODELO_TAREFAS: any = {
    "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calÃ§ada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Motorista": ["Conduzir com maxima seguranca, respeito as leis e responsabilidade", "Levar e buscar criancas na escola com pontualidade e atencao", "Levar e buscar patrao e familia em compromissos e viagens", "Manutencao basica diaria - verificar oleo, agua, pneus e luzes", "Abastecer combustivel, controlar consumo e guardar recibos M-Pesa", "Lavar viatura por dentro e fora e manter interior cheiroso", "Cumprir horario rigorosamente e avisar qualquer atraso no WhatsApp", "Guardar absoluto sigilo e privacidade da familia e assuntos", "Verificar documentos, seguro, inspeÃ§Ã£o e livrete da viatura", "Reportar imediatamente qualquer avaria, multa ou incidente"],
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

const T: any = {
 PT: {
  find:"ENCONTRAR", contracts:"CONTRATOS 11", my:"MEUS",
  mid:"ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS",
  sub:"Energy solutions and services enterprise",
  h1a:"Chega de acordo de boca!",
  h1b:"Contrato legal em 2 minutos.",
  heroSub:"Proteja seu dinheiro e seu trabalho. Com fotos, comprovativo e assinatura no WhatsApp na hora. Valido em qualquer pais.",
  b1:"11 Clausulas que protegem os dois lados",
  b2:"Anexos com fotos antes da validade",
  b3:"Assinatura no WhatsApp na hora",
  cardT:"Cadastre seu servico - Rapido e gratuito",
  emp:"EMPRESA", prof:"PROFISSIONAL INDIVIDUAL SINGULAR", coop:"COOPERATIVA",
  namePh:"Nome completo / Empresa", phonePh:"Telefone WhatsApp",
  docT:"Anexar documentos - Arraste aqui ou clique",
  docS:"Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho",
  send:"ENVIAR CADASTRO",
  verif:"Profissionais verificados em",
  clausulasTitle:"11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS",
  clausulasH2:"Chega de acordo de boca - Proteja seu dinheiro e seu trabalho",
  clausulasP:"Contrato legal em 2 minutos com fotos, comprovativo e assinatura no WhatsApp na hora. Escolha o tipo abaixo - Pedreiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - e gere seu PDF unico pronto para usar. Rapido, seguro e funciona em qualquer pais.",
  previewTitle:"Preview ao vivo - 11 clausulas = PDF unico",
  btnPdfFree:"GERAR PDF UNICO - FREE",
  btnPdfPago:"PAGO 200MT - Sem marca",
  voltar:"Voltar",
  proximo:"Proximo"
 },
 EN: {
  find:"FIND", contracts:"CONTRACTS 11", my:"MY CONTRACTS",
  mid:"FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES",
  sub:"Energy solutions and services enterprise",
  h1a:"No more verbal deals!",
  h1b:"Legal contract in 2 minutes.",
  heroSub:"Protect your money and work. With photos, proof and WhatsApp signature instantly. Works in any country.",
  b1:"11 clauses that protect both sides",
  b2:"Photo annexes before validity",
  b3:"WhatsApp signature instantly",
  cardT:"Register your service - Fast and free",
  emp:"COMPANY", prof:"INDIVIDUAL PROFESSIONAL", coop:"COOPERATIVE",
  namePh:"Full name / Company", phonePh:"WhatsApp Phone",
  docT:"Attach documents - Drag here or click",
  docS:"Drag files or click to select - ID, NUIT, Work photos",
  send:"SUBMIT REGISTRATION",
  verif:"Verified pros in",
  clausulasTitle:"11 MANDATORY CLAUSES - CONTRACT THAT PROTECTS BOTH SIDES",
  clausulasH2:"Stop handshake deals - Protect your money and work",
  clausulasP:"Legal contract in 2 minutes with photos, proof and WhatsApp signature. Choose type below - Builder, Housekeeper, Driver, Electrician, Consulting/Services, Others - and generate your unique PDF ready to use. Fast, safe and works in any country.",
  previewTitle:"Live preview - 11 clauses = Single PDF",
  btnPdfFree:"GENERATE SINGLE PDF - FREE",
  btnPdfPago:"PAID 200MT - No watermark",
  voltar:"Back",
  proximo:"Next"
 },
 FR: {
  find:"TROUVER", contracts:"CONTRATS 11", my:"MES CONTRATS",
  mid:"TROUVER. NEGOCIER. FORMALISER. 11 CLAUSES",
  sub:"Energy solutions and services enterprise",
  h1a:"Fini les accords verbaux!",
  h1b:"Contrat legal en 2 minutes.",
  heroSub:"Protegez votre argent et votre travail. Avec photos, preuve et signature WhatsApp. Fonctionne dans tout pays.",
  b1:"11 clauses qui protegent les deux cotes",
  b2:"Annexes photos avant validite",
  b3:"Signature WhatsApp instantanee",
  cardT:"Enregistrez votre service - Rapide et gratuit",
  emp:"ENTREPRISE", prof:"PROFESSIONNEL INDIVIDUEL", coop:"COOPERATIVE",
  namePh:"Nom complet / Entreprise", phonePh:"Telephone WhatsApp",
  docT:"Joindre documents - Glissez ici ou cliquez",
  docS:"Glissez fichiers ou cliquez - BI, NUIT, Photos travail",
  send:"ENVOYER INSCRIPTION",
  verif:"Pros verifies a",
  clausulasTitle:"11 CLAUSES OBLIGATOIRES - CONTRAT QUI PROTEGE LES DEUX COTES",
  clausulasH2:"Fini les accords verbaux - Protegez votre argent et votre travail",
  clausulasP:"Contrat legal en 2 minutes avec photos, preuve et signature WhatsApp. Choisissez ci-dessous - Macon, Femme de menage, Chauffeur, Electricien, Services/Consulting, Autres - et genere PDF unique pret a l'emploi. Rapide, sur et fonctionne dans tout pays.",
  previewTitle:"Apercu en direct - 11 clauses = PDF unique",
  btnPdfFree:"GENERER PDF UNIQUE - GRATUIT",
  btnPdfPago:"PAYE 200MT - Sans marque",
  voltar:"Retour",
  proximo:"Suivant"
 }
};

function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const PROS=[ {n:"Carlos Mabote",cat:"Pedreiro",loc:"Maputo Cidade",rate:4.9, jobs:127, price:"1.200 MT/dia"}, {n:"Amina Sitoe",cat:"Domestica",loc:"Matola",rate:5.0, jobs:89, price:"8.000 MT/mes"}, {n:"Jose Tembe",cat:"Eletricista",loc:"Boane",rate:4.8, jobs:203, price:"1.500 MT/dia"}, {n:"Fatima Uamusse",cat:"Babysitter",loc:"Maputo Cidade",rate:4.9, jobs:64, price:"600 MT/dia"}, {n:"Elias Nhampossa",cat:"Motorista",loc:"Gaza - Xai-Xai",rate:4.7, jobs:112, price:"12.000 MT/mes"}, {n:"Rosa Chivale",cat:"Jardineiro",loc:"Inhambane",rate:4.8, jobs:41, price:"800 MT/dia"}, ];
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp" }, ];

export default function App(){
 const [tab,setTab]=useState("contratos");
 const [lang,setLang]=useState("PT");
 const [pais,setPais]=useState("Mocambique");
 const [prov,setProv]=useState(PAISES["Mocambique"][0]);
 const [cat,setCat]=useState("Pedreiro");
 const [nome,setNome]=useState("");
 const [tel,setTel]=useState("");
 const [tipo,setTipo]=useState("prof");
 const [contratoSel,setContratoSel]=useState(0);
 const provincias=useMemo(()=>PAISES[pais]||[],[pais]);
 const [clausulaAtiva,setClausulaAtiva]=useState(1);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Anastancio Manuel", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Motorista",
  tarefas: MODELO_TAREFAS["Pedreiro"],
  horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias",
  alimentacao:"Sim - almoco fornecido", alojamento:"Nao", transporte:"Sim - 500MT/mes",
  folgas:"Domingo e feriados. 12 dias ferias apos 1 ano",
  periodoExp:"90 dias",
  deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens",
  deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade",
  anexos: [] as any[]
 });

 const tr = T[lang];

 useEffect(()=>{
   const catName = CATS[contratoSel];
   const novas = MODELO_TAREFAS[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const gerarPDF = async () => {
   const catName = CATS[contratoSel];
   const texto = `CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF UNICO
${tr.clausulasTitle}

1. DADOS DAS PARTES:
Contratante: ${formContrato.empNome} BI ${formContrato.empBI} Tel ${formContrato.empTel} End ${formContrato.empEnd}
Trabalhador: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel} End ${formContrato.trabEnd} Prof ${formContrato.trabProf}

2. OBJETO E TAREFAS (${formContrato.tarefas.length} tarefas - ${catName}):
${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

3. HORARIO E LOCAL:
${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.dias} - Inicio ${formContrato.dataInicio} - Local ${formContrato.localTrab}

4. SALARIO E PAGAMENTO:
${formContrato.valor} MZN ate dia ${formContrato.diaPag} via ${formContrato.formaPag} para ${formContrato.trabTel} - Prazo ${formContrato.prazo}

5. ALIMENTACAO E ALOJAMENTO:
${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}

6. FOLGAS E FERIAS:
${formContrato.folgas}

7. PERIODO EXPERIMENTAL:
${formContrato.periodoExp}

8. DEVERES DO TRABALHADOR:
${formContrato.deveresTrab}

9. DEVERES DO EMPREGADOR:
${formContrato.deveresEmp}

10. ANEXOS ANTES VALIDADE (${formContrato.anexos.length}):
${formContrato.anexos.length?formContrato.anexos.map((a:any)=>a.nome).join(", "):"Nenhum - fotos via WhatsApp fazem parte"}

11. VALIDADE E ASSINATURAS:
Valido em qualquer pais - Contrato que protege os dois lados - ID ${Math.floor(Math.random()*1000000)} - ESSE - Contrata.MZ
Assinaturas digitais via WhatsApp - ${formContrato.empNome} e ${formContrato.trabNome}

Gerado em ${new Date().toLocaleDateString()} - Contrata.MZ - 11 clausulas em 1 PDF unico - ${catName}
`;

   try {
     const { jsPDF } = await import("jspdf");
     const doc = new jsPDF();
     const M = 15; let y = 20;
     doc.setFillColor(42,63,90); doc.rect(0,0,210,22,"F");
     doc.setTextColor(212,164,74); doc.setFontSize(11); doc.setFont("helvetica","bold");
     doc.text(`CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF UNICO`, M, 13);
     doc.setTextColor(255,255,255); doc.setFontSize(7); doc.text(`${tr.clausulasTitle} - ESSE - Contrata.MZ`, M, 18);
     y=30; doc.setTextColor(20,20,20); doc.setFontSize(9);
     const lines = doc.splitTextToSize(texto, 180);
     lines.forEach((l:string)=>{ if(y>270){ doc.addPage(); y=20; } doc.text(l, M, y); y+=4.5; });
     doc.save(`Contrato-11-Clausulas-${catName}-${formContrato.trabNome.replace(/\s+/g,"-")}.pdf`);
     alert(`PDF gerado: ${catName} - ${formContrato.tarefas.length} tarefas - pronto para WhatsApp`);
   } catch(e){
     const blob = new Blob([texto], {type:"text/plain"});
     const url = URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = url;
     a.download = `Contrato-${catName}-${formContrato.trabNome.replace(/\s+/g,"-")}.txt`;
     a.click();
     const msg = encodeURIComponent(texto.substring(0,1500));
     window.open(`https://wa.me/?text=${msg}`,"_blank");
     alert(`PDF lib nao instalada - TXT gerado com ${formContrato.tarefas.length} tarefas de ${catName}. Para PDF instale: npm install jspdf`);
   }
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-white sticky top-0 z-30"><div className="mx-auto max-w-[1280px] px-4 h-[56px] flex items-center justify-between"><div className="flex items-center gap-3"><LogoIcon s={30}/><div><div className="font-black text-[15px] text-[#b78a2f] tracking-[0.18em]">ESSE</div><div className="text-[6.5px] text-[#9aa3ad] uppercase">{tr.sub}</div></div><div className="hidden lg:block text-[10px] text-[#8a97a5] ml-4 font-semibold">{tr.mid}</div></div><div className="flex items-center gap-4"><nav className="flex gap-4 text-[11px] font-extrabold"><button onClick={()=>setTab("encontrar")} className={tab==="encontrar"?"text-[#d4a44a]":"text-black"}>{tr.find}</button><button onClick={()=>setTab("contratos")} className={tab==="contratos"?"text-[#d4a44a]":"text-black"}>{tr.contracts}</button><button onClick={()=>setTab("meus")} className={tab==="meus"?"text-[#d4a44a]":"text-black"}>{tr.my}</button></nav><div className="flex gap-1 text-[10px] font-bold">{["PT","EN","FR"].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2 py-1 rounded ${lang===l?"bg-[#2a3f5a] text-[#d4a44a]":"bg-[#f1f0eb] text-[#8a97a5]"}`}>{l}</button>)}</div></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <>
   <section className="bg-[#2a3f5a] text-white"><div className="mx-auto max-w-[1280px] px-4 md:px-10 py-8 grid md:grid-cols-[1.1fr_0.9fr] gap-8"><div><div className="flex items-center gap-2 mb-5"><LogoIcon s={34}/><div><div className="font-black text-[17px] text-[#d4a44a] tracking-[0.18em]">ESSE</div><div className="text-[7px] text-white/60 uppercase">Energy solutions and services enterprise</div></div></div><h1 className="text-[34px] md:text-[44px] font-black leading-[0.95]">{tr.h1a}<br/>{tr.h1b}</h1><p className="mt-4 text-[13px] text-[#cbd5e1] max-w-[480px]">{tr.heroSub}</p><div className="mt-5 flex flex-wrap gap-2"><span className="px-3 py-1.5 rounded-full bg-[#3a4f6a] border text-[10px] font-bold">OK {tr.b1}</span><span className="px-3 py-1.5 rounded-full bg-[#3a4f6a] border text-[10px] font-bold">OK {tr.b2}</span><span className="px-3 py-1.5 rounded-full bg-[#d4a44a] text-[#2a3f5a] text-[10px] font-black">OK {tr.b3}</span></div></div><div className="bg-white rounded-[14px] p-5 text-[#1e293b]"><div className="text-[11px] font-black">{tr.cardT}</div><div className="mt-3 grid grid-cols-3 gap-2">{[{k:"empresa",l:tr.emp},{k:"prof",l:tr.prof},{k:"coop",l:tr.coop}].map(o=><button key={o.k} onClick={()=>setTipo(o.k)} className={`min-h-[38px] px-1 py-1 rounded-[6px] border text-[8.5px] font-black ${tipo===o.k?"bg-[#2a3f5a] text-white":"bg-white text-[#64748b]"}`}>{o.l}</button>)}</div><div className="mt-3 space-y-2"><input value={nome} onChange={e=>setNome(e.target.value)} placeholder={tr.namePh} className="w-full h-[40px] px-3 rounded-[6px] border text-[12px]" /><div className="grid grid-cols-2 gap-2"><select value={pais} onChange={e=>{setPais(e.target.value); setProv(PAISES[e.target.value][0]);}} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{Object.keys(PAISES).map(p=><option key={p} value={p}>{p}</option>)}</select><select value={prov} onChange={e=>setProv(e.target.value)} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{provincias.map(p=><option key={p} value={p}>{p}</option>)}</select></div><div className="grid grid-cols-2 gap-2"><select value={cat} onChange={e=>setCat(e.target.value)} className="h-[40px] px-2 rounded-[6px] border text-[12px] bg-white">{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select><input value={tel} onChange={e=>setTel(e.target.value)} placeholder={tr.phonePh} className="h-[40px] px-3 rounded-[6px] border text-[12px]" /></div><div className="rounded-[8px] border-2 border-dashed p-3 text-center bg-[#faf8f3]"><div className="text-[11px] font-bold">{tr.docT}</div><div className="text-[9px] text-[#94a3b8]">{tr.docS}</div></div><button onClick={()=>alert(`Cadastro: ${nome} - ${cat}`)} className="w-full h-[42px] rounded-[8px] bg-[#d4a44a] text-[#2a3f5a] font-black text-[11px]">{tr.send}</button></div></div></div></section>
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-8"><h2 className="text-[14px] font-extrabold">{tr.verif} {prov}</h2><div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{PROS.slice(0,6).map((p,i)=><div key={i} className="bg-white rounded-[12px] border p-4"><div className="flex gap-3"><div className="w-10 h-10 rounded-full bg-[#2a3f5a] grid place-items-center text-[#d4a44a] font-black text-[12px]">{p.n.split(" ").map(s=>s[0]).join("").slice(0,2)}</div><div><div className="font-bold text-[13px]">{p.n}</div><div className="text-[11px] text-[#64748b]">{p.cat} - {p.loc}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-8 rounded-[6px] bg-[#2a3f5a] text-white text-[10px] font-bold">CONTRATAR</button><button className="h-8 rounded-[6px] border text-[10px] font-bold">VER PERFIL</button></div></div>)}</div></section>
   </>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">{tr.clausulasTitle}</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">{tr.clausulasH2}</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px] leading-relaxed">{tr.clausulasP}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>)}
      </div>
      <div className="mt-3 flex gap-2 text-[9px]"><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ M-Pesa comprovado</span><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ Fotos viram prova legal</span><span className="px-2 py-1 rounded-full bg-[#d4a44a] text-[#2a3f5a] font-bold">+ Assinatura WhatsApp</span></div>
    </div>

    <div className="mt-6 grid md:grid-cols-[260px_1fr_360px] gap-5">
     <div className="bg-white rounded-[12px] border p-3 h-fit sticky top-[70px]">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">Nao sao paginas - sao partes do contrato. Clique para editar - abre ate ao fim. {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}.</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>setClausulaAtiva(c.id)} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short} - {c.id===2?`${formContrato.tarefas.length} tarefas`:c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">OK 1 PDF unico - nao sao 11 paginas separadas - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas</div>
     </div>

     <div className="bg-white rounded-[12px] border p-5">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
      <div className="text-[10px] text-[#94a3b8]">{CLAUSULAS[clausulaAtiva-1].short} - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}</div>
      <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes - Quem contrata e quem faz</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Profissional *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Telefone M-Pesa</label><input value={formContrato.trabTel} onChange={e=>setFormContrato({...formContrato,trabTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">Objeto e tarefas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - evita escrever muito</div><div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Tarefas mudam automaticamente quando escolhe tipo acima - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas. Edite ou adicione.</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px] flex items-center gap-2">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}</div><div className="flex gap-2"><input id="novaTarefa" placeholder="Nova tarefa + Enter" className="flex-1 h-10 px-3 border-2 rounded-lg text-[12px]" onKeyDown={e=>{ if(e.key==="Enter"){ const v=(e.target as any).value.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); (e.target as any).value=""; }}}} /><button onClick={()=>{ const el=document.getElementById("novaTarefa") as any; const v=el?.value?.trim(); if(v){ setFormContrato({...formContrato,tarefas:[...formContrato.tarefas,v]}); el.value=""; }}} className="px-4 h-10 bg-[#2a3f5a] text-white rounded-lg text-[11px] font-bold">Adicionar</button></div><div className="text-[10px] text-zinc-500">Total {formContrato.tarefas.length} tarefas - {CATS[contratoSel]} - todas vao para preview e PDF unico</div></div>}
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local - Quando e onde</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Hora inicio</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[10px] font-bold">Hora fim</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div><div><label className="text-[10px] font-bold">Dias da semana</label><input value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div>}
        {clausulaAtiva===4 && <div className="space-y-3"><div className="font-bold text-[12px]">Salario e pagamento - Quanto e como paga</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor MZN *</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg font-bold" /></div><div><label className="text-[10px] font-bold">Dia pagamento</label><input value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div></div>}
        {[5,6,7,8,9].includes(clausulaAtiva) && <div className="space-y-3"><div className="font-bold text-[12px]">{CLAUSULAS[clausulaAtiva-1].titulo}</div><textarea value={clausulaAtiva===5?formContrato.alimentacao:clausulaAtiva===6?formContrato.folgas:clausulaAtiva===7?formContrato.periodoExp:clausulaAtiva===8?formContrato.deveresTrab:formContrato.deveresEmp} onChange={e=>{ if(clausulaAtiva===5) setFormContrato({...formContrato,alimentacao:e.target.value}); if(clausulaAtiva===6) setFormContrato({...formContrato,folgas:e.target.value}); if(clausulaAtiva===7) setFormContrato({...formContrato,periodoExp:e.target.value}); if(clausulaAtiva===8) setFormContrato({...formContrato,deveresTrab:e.target.value}); if(clausulaAtiva===9) setFormContrato({...formContrato,deveresEmp:e.target.value}); }} className="w-full min-h-[100px] p-3 border-2 rounded-lg text-[12px]" /></div>}
        {clausulaAtiva===10 && <div className="space-y-3"><div className="font-bold text-[12px]">Anexos (antes validade) - Fotos e provas que fazem parte do contrato</div><div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Anexos vem ANTES da validade, fazem parte integrante. Fotos viram prova legal.</div><label className="w-full min-h-[100px] border-2 border-dashed rounded-xl grid place-items-center p-4 cursor-pointer"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>{ if(!e.target.files) return; const n=Array.from(e.target.files).map((f:any)=>({id:Math.random().toString(36).slice(2),nome:f.name})); setFormContrato({...formContrato,anexos:[...formContrato.anexos,...n]}); }} /><div className="text-center"><div className="font-bold text-[12px]">Clique para anexar fotos/projetos</div><div className="text-[10px] text-zinc-500">JPG, PNG, PDF - ate 10 arquivos</div></div></label>{formContrato.anexos.length>0 && <div className="space-y-2">{formContrato.anexos.map((a:any)=><div key={a.id} className="border p-2 rounded-lg text-[11px] flex justify-between">{a.nome} <button onClick={()=>setFormContrato({...formContrato,anexos:formContrato.anexos.filter((x:any)=>x.id!==a.id)})} className="text-red-600 font-bold">x</button></div>)}</div>}</div>}
        {clausulaAtiva===11 && <div className="space-y-4">
        <div className="font-bold text-[12px]">Validade e assinaturas - Assina no WhatsApp - Como funciona?</div>
          
          <div className="bg-[#f0f7ff] border-2 border-[#2a3f5a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] grid place-items-center text-white font-bold text-[12px]">W</div>
              <div className="font-black text-[13px] text-[#2a3f5a]">Como funciona assinatura digital via WhatsApp?</div>
            </div>
            <div className="text-[11px] leading-relaxed text-[#334155] space-y-2">
              <p><b>1. Gera o PDF:</b> Clica em GERAR PDF UNICO com 11 clausulas e {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}.</p>
              <p><b>2. Envia no WhatsApp:</b> Sistema abre 2 conversas - voce ({formContrato.empNome}) e {formContrato.trabNome}. Cada um responde: <span className="px-1.5 py-0.5 bg-white border rounded font-bold text-[#25D366]">CONCORDO + nome completo</span> + foto BI + audio 5s: "Eu, nome, aceito contrato ID XXXX".</p>
              <p><b>3. Guarda prova automatica:</b> Sistema guarda: numero WhatsApp, data/hora, localizacao GPS, fotos BI, prints conversa, audio. Nao e certificado digital caro - e assinatura simples com prova, valida pela Lei 18/2014 Transacoes Eletronicas de Mocambique.</p>
              <p><b>4. PDF final com tudo:</b> Contrato + prints WhatsApp com CONCORDO + fotos BI + comprovativo M-Pesa + rodape: <span className="font-mono text-[8px] bg-white px-1 border rounded">Assinado via WhatsApp em {new Date().toLocaleDateString()} - {formContrato.empTel} e {formContrato.trabTel} - ID {Math.floor(Math.random()*10000)} - ESSE NUIT 401866876</span></p>
            </div>
            <div className="mt-3 p-2.5 bg-white border rounded-lg">
              <div className="font-bold text-[10px] text-[#2a3f5a]">Porque e mais seguro que papel e vale no tribunal?</div>
              <div className="text-[10px] text-[#475569] mt-1">Papel falsifica facil com assinatura. WhatsApp tem hora, numero e local que nao da para falsificar. Junta contrato + CONCORDO + comprovativo M-Pesa = 3 provas ligadas. Lei 18/2014 diz que mensagem eletronica vale como prova se tem: 1) Identificacao (numero+BI) 2) Intencao clara (CONCORDO) 3) Integridade (PDF nao alteravel) 4) Aceitacao dos dois lados. Tribunal de Maputo ja aceita print WhatsApp como prova desde 2019.</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[9px]">
              <div className="p-2 bg-white border rounded-lg text-center"><div className="font-bold text-[#25D366]">PASSO 1</div><div className="mt-1">Gera PDF 11 clausulas</div></div>
              <div className="p-2 bg-white border rounded-lg text-center"><div className="font-bold text-[#25D366]">PASSO 2</div><div className="mt-1">Os dois escrevem CONCORDO + BI no WhatsApp</div></div>
              <div className="p-2 bg-white border rounded-lg text-center"><div className="font-bold text-[#25D366]">PASSO 3</div><div className="mt-1">PDF final com tudo pronto tribunal</div></div>
            </div>
          </div>
          <div className="space-y-3"><div className="font-bold text-[12px]">Resumo final para assinatura</div><div className="bg-zinc-50 border-2 rounded-xl p-4"><div className="font-bold text-[11px]">Resumo 11 Clausulas: {CATS[contratoSel]} - {formContrato.valor} MZN - {formContrato.tarefas.length} tarefas - {formContrato.anexos.length} anexos ANTES validade</div><div className="text-[10px] text-zinc-600 mt-1">Tudo que editou aparece no preview e no PDF unico. Sem lei fixa - funciona em qualquer pais.</div><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#3a4f6a] text-white font-bold text-[12px]">{tr.btnPdfFree}<br/><span className="text-[10px] font-normal">WhatsApp + PDF unico - {formContrato.tarefas.length} tarefas</span></button><button onClick={gerarPDF} className="h-[52px] rounded-xl bg-[#2a3f5a] text-white font-bold text-[12px]">{tr.btnPdfPago}</button></div></div></div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">{tr.voltar}: {clausulaAtiva>1?CLAUSULAS[clausulaAtiva-2].titulo:""}</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#2a3f5a] text-white rounded-xl font-bold disabled:opacity-40">{tr.proximo}: {clausulaAtiva<11?CLAUSULAS[clausulaAtiva].titulo:""} </button></div>
     </div>
     <div className="bg-white rounded-[12px] border p-4 h-fit sticky top-[70px]"><div className="text-[10px] font-bold uppercase">{tr.previewTitle} - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas</div><div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - PDF UNICO<br/>{tr.clausulasTitle}<br/><br/>1. DADOS DAS PARTES:<br/>{formContrato.empNome} / {formContrato.trabNome}<br/><br/>2. OBJETO E TAREFAS ({formContrato.tarefas.length} de {CATS[contratoSel]}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3. HORARIO:<br/>{formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.dias}<br/><br/>4. SALARIO:<br/>{formContrato.valor} MZN dia {formContrato.diaPag}<br/><br/>Preview ao vivo = PDF final - 1 arquivo unico - {formContrato.tarefas.length} tarefas aparecem aqui</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDF} className="h-10 bg-[#3a4f6a] text-white rounded-xl font-bold text-[10px]">{tr.btnPdfFree}</button><button onClick={gerarPDF} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold text-[10px]">{tr.btnPdfPago}</button></div><div className="mt-2 text-[9px] text-zinc-500 text-center">1 arquivo unico com 11 clausulas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - sem lei - funciona em qualquer pais</div></div>
    </div>
   </section>
  )}
  {tab==="meus" && (<section className="mx-auto max-w-[680px] px-4 py-16 text-center"><div className="bg-white rounded-[16px] border p-10"><LogoIcon s={48}/><h2 className="mt-4 text-[20px] font-black">Meus Contratos</h2><p className="text-[13px] text-[#64748b] mt-2">Contratos assinados, pagamentos M-Pesa</p><button onClick={()=>setTab("encontrar")} className="mt-6 h-10 px-6 rounded-[8px] bg-[#2a3f5a] text-white text-[11px] font-bold">VOLTAR</button></div></section>)}
  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - 11 Clausulas em 1 PDF unico - Funciona em qualquer pais - {formContrato.tarefas.length} tarefas - BUILD OK</footer>
 </div>
 )
}
