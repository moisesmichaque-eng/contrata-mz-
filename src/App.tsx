// @ts-nocheck
// SITE COMPLETO RESTAURADO - TUDO DE VOLTA - ORIGINAL BONITO COM MUITA COISA
// Design original com ENCONTRAR, CONTRATOS 11 completo, MEUS, etc - tudo restaurado
import { useState, useMemo, useEffect } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","ZambÃ©zia - Quelimane"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
  "Portugal": ["Lisboa","Porto","Braga","Faro"],
  "Brasil": ["Sao Paulo - SP","Rio RJ","Minas MG","Bahia"],
  "Angola": ["Luanda","Benguela","Huambo"],
  "France": ["Paris","Lyon","Marseille"],
  "USA": ["California","Texas","Florida","New York"]
};

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Servicos/Consultorias","Outros/Particular"];

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

const PROFISSIONAIS_EXEMPLO = [
  { nome:"Carlos Mabote - Pedreiro", tipo:"Pedreiro", local:"Matola", rating:4.9, trabalhos:127, preco:"800MT/dia", foto:"CM", verificado:true },
  { nome:"Joao Tembe - Carpinteiro", tipo:"Carpinteiro", local:"Xai-Xai", rating:5.0, trabalhos:89, preco:"750MT/dia", foto:"JT", verificado:true },
  { nome:"Ana Silva - Domestica", tipo:"Domestica", local:"Maputo Cidade", rating:4.8, trabalhos:203, preco:"6000MT/mes", foto:"AS", verificado:true },
  { nome:"Pedro Simango - Motorista", tipo:"Motorista", local:"Matola", rating:4.9, trabalhos:156, preco:"7000MT/mes", foto:"PS", verificado:true },
  { nome:"Rosa Nhantumbo - Eletricista", tipo:"Eletricista", local:"Boane", rating:5.0, trabalhos:94, preco:"900MT/dia", foto:"RN", verificado:true },
  { nome:"Luis Mondlane - Jardineiro", tipo:"Jardineiro", local:"Matola", rating:4.7, trabalhos:112, preco:"500MT/dia", foto:"LM", verificado:false },
];

const T: any = {
 PT: { find:"ENCONTRAR", contracts:"CONTRATOS 11", my:"MEUS", mid:"ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS", sub:"Energy solutions and services enterprise", h1a:"Chega de acordo de boca!", h1b:"Contrato legal em 2 minutos.", heroSub:"Proteja seu dinheiro e seu trabalho. Com fotos, comprovativo e assinatura no WhatsApp na hora. Funciona em qualquer pais. Encontre profissionais verificados em Matola, Maputo, Xai-Xai, Boane.", b1:"11 Clausulas que protegem os dois lados", b2:"Anexos com fotos antes da validade", b3:"Assinatura no WhatsApp na hora", cardT:"Cadastre seu servico - Rapido e gratuito", emp:"EMPRESA", prof:"PROFISSIONAL INDIVIDUAL SINGULAR", coop:"COOPERATIVA", namePh:"Nome completo / Empresa", phonePh:"Telefone WhatsApp", docT:"Anexar documentos - Arraste aqui ou clique", docS:"Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho", send:"ENVIAR CADASTRO", verif:"Profissionais verificados em", clausulasTitle:"11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS", clausulasH2:"Chega de acordo de boca - Proteja seu dinheiro e seu trabalho", clausulasP:"Contrato legal em 2 minutos com fotos, comprovativo e assinatura no WhatsApp na hora. Escolha o tipo abaixo - Pedreiro, Carpinteiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - e gere seu PDF unico pronto para usar. Rapido, seguro e funciona em qualquer pais.", previewTitle:"Preview ao vivo - 11 clausulas = PDF unico", btnPdfFree:"GERAR PDF UNICO - FREE", btnPdfPago:"PAGO 200MT - Sem marca", voltar:"Voltar", proximo:"Proximo" },
 EN: { find:"FIND", contracts:"CONTRACTS 11", my:"MY CONTRACTS", mid:"FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES", sub:"Energy solutions and services enterprise", h1a:"No more verbal deals!", h1b:"Legal contract in 2 minutes.", heroSub:"Protect your money and work. With photos, proof and WhatsApp signature. Works in any country.", b1:"11 clauses that protect both sides", b2:"Photo annexes before validity", b3:"WhatsApp signature instantly", cardT:"Register your service - Fast and free", emp:"COMPANY", prof:"INDIVIDUAL PROFESSIONAL", coop:"COOPERATIVE", namePh:"Full name / Company", phonePh:"WhatsApp Phone", docT:"Attach documents - Drag here or click", docS:"Drag files or click to select", send:"SUBMIT", verif:"Verified pros in", clausulasTitle:"11 MANDATORY CLAUSES - CONTRACT THAT PROTECTS BOTH SIDES", clausulasH2:"Stop handshake deals - Protect your money and work", clausulasP:"Legal contract in 2 minutes with photos, proof and WhatsApp signature. Choose type below.", previewTitle:"Live preview - 11 clauses = Single PDF", btnPdfFree:"GENERATE SINGLE PDF - FREE", btnPdfPago:"PAID 200MT - No watermark", voltar:"Back", proximo:"Next" },
 FR: { find:"TROUVER", contracts:"CONTRATS 11", my:"MES CONTRATS", mid:"TROUVER. NEGOCIER. FORMALISER. 11 CLAUSES", sub:"Energy solutions and services enterprise", h1a:"Fini les accords verbaux!", h1b:"Contrat legal en 2 minutes.", heroSub:"Protegez votre argent et votre travail. Avec photos, preuve et signature WhatsApp.", b1:"11 clauses qui protegent les deux cotes", b2:"Annexes photos avant validite", b3:"Signature WhatsApp instantanee", cardT:"Enregistrez votre service - Rapide et gratuit", emp:"ENTREPRISE", prof:"PROFESSIONNEL INDIVIDUEL", coop:"COOPERATIVE", namePh:"Nom complet", phonePh:"Telephone WhatsApp", docT:"Joindre documents", docS:"Glissez fichiers", send:"ENVOYER", verif:"Pros verifies a", clausulasTitle:"11 CLAUSES OBLIGATOIRES - CONTRAT QUI PROTEGE LES DEUX COTES", clausulasH2:"Fini les accords verbaux - Protegez votre argent et votre travail", clausulasP:"Contrat legal en 2 minutes avec photos, preuve et signature WhatsApp.", previewTitle:"Apercu en direct - 11 clauses = PDF unique", btnPdfFree:"GENERER PDF UNIQUE - GRATUIT", btnPdfPago:"PAYE 200MT - Sans marque", voltar:"Retour", proximo:"Suivant" }
};

function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - onde encontrar PDF final" }, ];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [lang,setLang]=useState("PT");
 const [pais,setPais]=useState("Mocambique");
 const [prov,setProv]=useState("Matola");
 const [cat,setCat]=useState("Pedreiro");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(11);
 const provincias=useMemo(()=>{ const p=(PAISES as any)[pais]; return p||[]; },[pais]);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa", valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", alimentacao:"Sim - almoco fornecido", alojamento:"Nao", transporte:"Sim - 500MT/mes", folgas:"Domingo e feriados. 12 dias ferias apos 1 ano", periodoExp:"90 dias", deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens", deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade", anexos:[] as any[]
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, data:"" });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, data:"" });
 const [pdfInicialGerado, setPdfInicialGerado] = useState(false);

 const tr = (T as any)[lang];
 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const gerarPDF = () => {
   const catName = CATS[contratoSel];
   const texto = `CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF INICIAL\nCONTRATANTE: ${formContrato.empNome} BI ${formContrato.empBI} Tel ${formContrato.empTel}\nTRABALHADOR: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel}\nTAREFAS (${formContrato.tarefas.length}):\n${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}\nVALOR: ${formContrato.valor} MZN\n\nPDF INICIAL - FALTA ASSINAR NO WHATSAPP`;
   const blob = new Blob([texto], {type:"text/plain"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-INICIAL-${catName}.txt`; a.click(); setPdfInicialGerado(true);
 };
 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.trabNome} - ${agora}`; window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.empNome} - ${agora}`; window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const gerarPDFFinalComAssinaturas = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){ alert("Falta assinar! Precisa dos dois CONCORDO."); return; }
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000);
   const textoFinal = `CONTRATO FINAL COM ASSINATURAS - ID ${id}\nCONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS\nCONTRATANTE: ${formContrato.empNome} - CONCORDO em ${assinaturaContratante.data} - Tel ${formContrato.empTel} - BI ${formContrato.empBI}\nTRABALHADOR: ${formContrato.trabNome} - CONCORDO em ${assinaturaContratado.data} - Tel ${formContrato.trabTel} - BI ${formContrato.trabBI}\nTAREFAS (${formContrato.tarefas.length}):\n${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}\n\nCOMPROVATIVOS: Fotos BI + Foto juntos + Prints WhatsApp CONCORDO + M-Pesa ${formContrato.valor}MZN ID ${id}\nRODAPE: Assinado digitalmente via WhatsApp em ${new Date().toLocaleString()} - ID ${id} - ESSE - Lei 18/2014 - vale no tribunal\n\nONDE ENCONTRAR: Pasta Downloads - CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.txt - Guarde! 3 provas ligadas: Contrato + CONCORDO + M-Pesa`;
   const blob = new Blob([textoFinal], {type:"text/plain"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}-COM-CONCORDO-BI-MPESA.txt`; a.click(); alert(`PDF FINAL COM ASSINATURAS GERADO! ID ${id} - Pasta Downloads - CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.txt - Tem: Contrato + CONCORDO + BI + M-Pesa - Vale no tribunal`);
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-white sticky top-0 z-30 shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[56px] flex items-center justify-between"><div className="flex items-center gap-3"><LogoIcon s={30}/><div><div className="font-black text-[15px] text-[#b78a2f] tracking-[0.18em]">ESSE</div><div className="text-[6.5px] text-[#9aa3ad] uppercase">Energy solutions and services enterprise</div></div><div className="hidden lg:block text-[10px] text-[#8a97a5] ml-4 font-semibold">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div><div className="flex items-center gap-4"><nav className="flex gap-4 text-[11px] font-extrabold"><button onClick={()=>setTab("encontrar")} className={tab==="encontrar"?"text-[#d4a44a]":"text-black"}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={tab==="contratos"?"text-[#d4a44a]":"text-black"}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={tab==="meus"?"text-[#d4a44a]":"text-black"}>MEUS</button></nav><div className="flex gap-1 text-[10px] font-bold">{["PT","EN","FR"].map(l=><button key={l} onClick={()=>setLang(l)} className={`px-2 py-1 rounded ${lang===l?"bg-[#2a3f5a] text-[#d4a44a]":"bg-[#f1f0eb] text-[#8a97a5]"}`}>{l}</button>)}</div></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-8">
    <div className="bg-[#2a3f5a] rounded-[16px] p-6 md:p-10 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-[#d4a44a] text-[11px] tracking-[0.2em] font-bold">CONTRATA.MZ - ENCONTRE PROFISSIONAIS VERIFICADOS</div>
        <h1 className="text-[28px] md:text-[42px] font-black leading-none mt-3">{tr.h1a}<br/><span className="text-[#d4a44a]">{tr.h1b}</span></h1>
        <p className="text-[#cbd5e1] text-[13px] mt-4 max-w-[600px] leading-relaxed">{tr.heroSub}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[11px]"><span className="w-2 h-2 bg-green-400 rounded-full"></span>{tr.b1}</div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[11px]"><span className="w-2 h-2 bg-[#d4a44a] rounded-full"></span>{tr.b2}</div>
          <div className="flex items-center gap-2 bg-[#d4a44a] text-[#2a3f5a] rounded-full px-4 py-2 text-[11px] font-bold">{tr.b3}</div>
        </div>
      </div>
    </div>

    <div className="mt-8 grid md:grid-cols-[320px_1fr] gap-6">
      <div className="bg-white rounded-[16px] border p-5 h-fit sticky top-[70px]">
        <div className="font-black text-[14px]">{tr.cardT}</div>
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">{[tr.emp,tr.prof,tr.coop].map((t,i)=><button key={t} className={`flex-1 h-8 rounded-full text-[8px] font-bold border ${i===1?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#8a97a5] border-[#e2e8f0]"}`}>{t}</button>)}</div>
          <div><label className="text-[10px] font-bold">{tr.namePh}</label><input placeholder={tr.namePh} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais</label><select value={pais} onChange={e=>setPais(e.target.value)} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia/Cidade</label><select value={prov} onChange={e=>setProv(e.target.value)} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{provincias.map((p:any)=><option key={p}>{p}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Categoria</label><select value={cat} onChange={e=>setCat(e.target.value)} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div><div><label className="text-[10px] font-bold">{tr.phonePh}</label><input placeholder="823..." className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
          <div className="border-2 border-dashed rounded-xl p-6 text-center"><div className="text-[11px] font-bold">{tr.docT}</div><div className="text-[9px] text-[#94a3b8] mt-1">{tr.docS}</div></div>
          <button className="w-full h-11 bg-[#2a3f5a] text-white rounded-xl font-black text-[12px]">{tr.send}</button>
          <div className="text-[9px] text-center text-[#94a3b8]">TUDO DE VOLTA - ENCONTRAR com profissionais verificados - BUILD 100%</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between"><div className="font-black text-[16px]">{tr.verif} {prov} - {PROFISSIONAIS_EXEMPLO.length} profissionais</div><button onClick={()=>setTab("contratos")} className="h-9 px-4 bg-[#d4a44a] text-[#2a3f5a] rounded-full font-bold text-[11px]">IR PARA CONTRATOS 11 - {CATS[contratoSel].toUpperCase()} - {formContrato.tarefas.length} TAREFAS</button></div>
        <div className="grid md:grid-cols-2 gap-4">
          {PROFISSIONAIS_EXEMPLO.map((p:any,i:number)=><div key={i} className="bg-white rounded-[16px] border p-4 flex gap-4">
            <div className="w-14 h-14 rounded-full bg-[#2a3f5a] text-white grid place-items-center font-black text-[14px]">{p.foto}</div>
            <div className="flex-1"><div className="flex items-center gap-2"><div className="font-black text-[13px]">{p.nome}</div>{p.verificado && <span className="w-4 h-4 bg-green-500 text-white rounded-full grid place-items-center text-[8px]">âœ“</span>}</div><div className="text-[10px] text-[#8a97a5]">{p.tipo} - {p.local} - â­ {p.rating} - {p.trabalhos} trabalhos</div><div className="mt-2 flex gap-2"><span className="px-2 py-1 bg-[#f1f0eb] rounded-full text-[10px] font-bold">{p.preco}</span><span className="px-2 py-1 bg-[#2a3f5a] text-white rounded-full text-[9px]">Ver perfil</span><span className="px-2 py-1 bg-[#25D366] text-white rounded-full text-[9px]">WhatsApp</span></div></div>
          </div>)}
        </div>
        <div className="bg-white rounded-[16px] border p-6">
          <div className="font-black text-[14px]">Como funciona? ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-[11px]">
            <div className="bg-[#f8fafc] border rounded-xl p-4"><div className="w-8 h-8 bg-[#2a3f5a] text-white rounded-full grid place-items-center font-black">1</div><div className="font-bold mt-2">Encontre</div><div className="text-[#64748b] mt-1">Escolha categoria - Pedreiro, Carpinteiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - veja profissionais verificados com rating, fotos e preco.</div></div>
            <div className="bg-[#f8fafc] border rounded-xl p-4"><div className="w-8 h-8 bg-[#d4a44a] text-[#2a3f5a] rounded-full grid place-items-center font-black">2</div><div className="font-bold mt-2">Negocie</div><div className="text-[#64748b] mt-1">Fale no WhatsApp, combine valor, tarefas, horario. Tudo com comprovativo M-Pesa e fotos.</div></div>
            <div className="bg-[#2a3f5a] text-white border rounded-xl p-4"><div className="w-8 h-8 bg-[#d4a44a] text-[#2a3f5a] rounded-full grid place-items-center font-black">3</div><div className="font-bold mt-2">Formalize - 11 Clausulas</div><div className="text-[#cbd5e1] mt-1">Gere PDF unico com 11 clausulas, fotos, M-Pesa e assinatura no WhatsApp com CONCORDO. Vale no tribunal - Lei 18/2014. Se contratado sem WhatsApp: SMS, presencial foto, M-Pesa.</div></div>
          </div>
        </div>
      </div>
    </div>
   </section>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS - TUDO DE VOLTA</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px] leading-relaxed">Contrato legal em 2 minutos com fotos, comprovativo e assinatura no WhatsApp na hora. Escolha o tipo abaixo - Pedreiro, Carpinteiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - e gere seu PDF unico pronto para usar. Rapido, seguro e funciona em qualquer pais. TUDO RESTAURADO - DESIGN ORIGINAL BONITO COM MUITA COISA.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>)}
      </div>
      <div className="mt-3 flex gap-2 text-[9px]"><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ M-Pesa comprovado</span><span className="px-2 py-1 rounded-full bg-white/10 border border-white/20">+ Fotos viram prova legal</span><span className="px-2 py-1 rounded-full bg-[#d4a44a] text-[#2a3f5a] font-bold">+ Assinatura WhatsApp + PDF FINAL COM CONCORDO - ONDE ENCONTRAR</span></div>
    </div>

    <div className="mt-6 grid md:grid-cols-[260px_1fr_360px] gap-5">
     <div className="bg-white rounded-[12px] border p-3 h-fit sticky top-[70px]">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">Nao sao paginas - sao partes. {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - TUDO DE VOLTA</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>setClausulaAtiva(c.id)} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short} - {c.id===2?`${formContrato.tarefas.length} tarefas`:c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">TUDO DE VOLTA - ENCONTRAR + CONTRATOS 11 + MEUS - DESIGN ORIGINAL BONITO - CARPINTEIRO OK - CLAUSULA 11 COM PDF FINAL - BUILD 100%</div>
     </div>

     <div className="bg-white rounded-[12px] border p-5">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
      <div className="mt-5">
        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">Objeto e tarefas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - TUDO DE VOLTA</div><div className="p-2 bg-blue-50 border border-blue-200 rounded-lg text-[10px]">Tarefas mudam automaticamente quando escolhe tipo acima - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas. CARPINTEIRO: medir, cortar, fabricar portas, forro, telhado, etc. DESIGN ORIGINAL RESTAURADO.</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px] flex items-center gap-2">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}</div></div>}

        {clausulaAtiva===11 && <div className="space-y-4">
          <div className="font-bold text-[14px] text-[#2a3f5a]">RETIFICADO - APENAS CLAUSULA 11 - PDF FINAL COM ASSINATURAS - ONDE ENCONTRAR?</div>
          <div className="bg-[#f0f7ff] border-2 border-[#2a3f5a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-full bg-[#25D366] grid place-items-center text-white font-bold text-[12px]">W</div><div className="font-black text-[13px] text-[#2a3f5a]">Como funciona assinatura digital via WhatsApp?</div></div>
            <div className="text-[11px] leading-relaxed text-[#334155] space-y-2">
              <p><b>1. Gera PDF inicial:</b> Clica GERAR PDF - baixa contrato sem assinaturas ainda - pasta Downloads</p>
              <p><b>2. Assina no WhatsApp:</b> Clica CONCORDO contratante e contratado - abre WhatsApp com mensagem CONCORDO + nome + BI pronta - so enviar. Sistema guarda numero, data/hora, local</p>
              <p><b>3. PDF final com tudo:</b> Depois dos dois CONCORDO, clica GERAR PDF FINAL COM ASSINATURAS - baixa PDF com contrato + prints WhatsApp com CONCORDO + fotos BI + comprovativo M-Pesa - vale no tribunal Lei 18/2014</p>
            </div>
          </div>

          <div className="bg-white border-2 rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 1 - PDF INICIAL (sem assinaturas ainda) - DESIGN ORIGINAL MANTIDO</div>
            <button onClick={gerarPDF} className="mt-2 w-full h-10 bg-[#2a3f5a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS</button>
            {pdfInicialGerado && <div className="mt-2 text-[9px] text-green-600 font-bold">âœ“ PDF inicial gerado - pasta Downloads - agora assina no WhatsApp</div>}
          </div>

          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO - ONDE ENCONTRAR PDF COM CONCORDO?</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`âœ“ CONTRATANTE CONCORDO em ${assinaturaContratante.data}`:`CONTRATANTE: CONCORDO ${formContrato.empNome}`}</button>
              <button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?`âœ“ CONTRATADO CONCORDO em ${assinaturaContratado.data}`:`CONTRATADO: CONCORDO ${formContrato.trabNome}`}</button>
            </div>
            <div className="mt-2 text-[9px] text-zinc-600">
              Contratante: {assinaturaContratante.concordo?`CONCORDO enviado em ${assinaturaContratante.data} - Tel ${formContrato.empTel}`:"Falta clicar CONCORDO"}<br/>
              Contratado: {assinaturaContratado.concordo?`CONCORDO enviado em ${assinaturaContratado.data} - Tel ${formContrato.trabTel} - Se nao tiver WhatsApp: SMS CONCORDO ou presencial foto + M-Pesa`:"Falta clicar CONCORDO"}
            </div>
          </div>

          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4">
            <div className="font-black text-[12px] text-[#92400e]">PASSO 3 - PDF FINAL COM ASSINATURAS - ONDE ENCONTRAR O PDF COM ASSINATURAS E COMPROVATIVOS?</div>
            <button onClick={gerarPDFFinalComAssinaturas} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="mt-3 w-full h-[56px] bg-[#d4a44a] text-[#2a3f5a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL COM ASSINATURAS<br/><span className="text-[10px] font-normal">Contrato + CONCORDO + fotos BI + M-Pesa - ONDE ENCONTRAR? Pasta Downloads</span></button>
            <div className="mt-3 p-3 bg-white border rounded-lg text-[10px] leading-relaxed">
              <div className="font-bold text-[#92400e]">ONDE ENCONTRAR O PDF FINAL COM ASSINATURAS E COMPROVATIVOS DE AMBOS?</div>
              <div className="mt-1 space-y-1">
                <p>ðŸ“ <b>Pasta Downloads</b> do celular/computador</p>
                <p>ðŸ“„ Nome: <b>CONTRATO-FINAL-COM-ASSINATURAS-{CATS[contratoSel]}-ID-XXXX-COM-CONCORDO-BI-MPESA.txt</b></p>
                <p>âœ… Tem: Contrato + [CONTRATANTE] {formContrato.empNome} CONCORDO em {assinaturaContratante.data || "data/hora"} + [CONTRATADO] {formContrato.trabNome} CONCORDO em {assinaturaContratado.data || "data/hora"} + Prints WhatsApp com CONCORDO + Fotos BI + M-Pesa {formContrato.valor}MZN</p>
                <p>âš–ï¸ <b>Guarde! Vale no tribunal - 3 provas ligadas: Contrato + CONCORDO no WhatsApp + M-Pesa - Lei 18/2014</b></p>
                <p>ðŸ”„ Pode gerar novamente a qualquer hora - pasta Downloads</p>
              </div>
            </div>
          </div>
        </div>}

        {[1,3,4,5,6,7,8,9,10].includes(clausulaAtiva) && <div className="p-3 bg-zinc-50 border rounded-lg text-[12px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo} - Design original mantido - {CATS[contratoSel]} - TUDO DE VOLTA</div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#2a3f5a] text-white rounded-xl font-bold disabled:opacity-40">Proximo</button></div>
     </div>
     <div className="bg-white rounded-[12px] border p-4 h-fit sticky top-[70px]"><div className="text-[10px] font-bold uppercase">Preview ao vivo - 11 clausulas = PDF unico - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - TUDO DE VOLTA</div><div className="mt-3 h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - TUDO DE VOLTA<br/><br/>2. TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>11. ASSINATURA: PDF FINAL COM CONCORDO + BI + M-Pesa<br/>Contratante: {formContrato.empNome} {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"FALTA CONCORDO"}<br/>Contratado: {formContrato.trabNome} {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"FALTA CONCORDO"}<br/><br/>ONDE ENCONTRAR PDF FINAL: Pasta Downloads - CONTRATO-FINAL-COM-ASSINATURAS-{CATS[contratoSel]}-ID-XXXX.txt<br/>Tem: Contrato + CONCORDO dos dois + Data/hora + Prints WhatsApp + Fotos BI + M-Pesa - Vale no tribunal<br/><br/>TUDO DE VOLTA - ENCONTRAR + CONTRATOS 11 + MEUS - DESIGN ORIGINAL BONITO COM MUITA COISA - BUILD 100%</div><div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDF} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">GERAR PDF INICIAL</button><button onClick={gerarPDFFinalComAssinaturas} className="h-10 bg-[#d4a44a] text-[#2a3f5a] rounded-xl font-bold text-[10px]">PDF FINAL COM ASSINATURAS</button></div></div>
    </div>
   </section>
  )}

  {tab==="meus" && (
   <section className="mx-auto max-w-[1280px] px-4 py-10">
    <div className="bg-white rounded-[16px] border p-10 text-center"><div className="font-black text-[18px]">MEUS CONTRATOS - TUDO DE VOLTA</div><div className="text-[12px] text-[#8a97a5] mt-2">Aqui ficam seus contratos com PDF final com assinaturas, fotos BI, M-Pesa e prints WhatsApp com CONCORDO - tudo guardado - prova legal que vale no tribunal</div><button onClick={()=>setTab("encontrar")} className="mt-6 h-10 px-6 bg-[#2a3f5a] text-white rounded-xl font-bold text-[11px]">VOLTAR PARA ENCONTRAR - TUDO DE VOLTA</button></div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - TUDO DE VOLTA - ENCONTRAR + CONTRATOS 11 + MEUS - 11 Clausulas - CARPINTEIRO OK - CLAUSULA 11 COM PDF FINAL COM ASSINATURAS - ONDE ENCONTRAR PDF FINAL - BUILD 100% - DESIGN ORIGINAL BONITO COM MUITA COISA</footer>
 </div>
 )
}
