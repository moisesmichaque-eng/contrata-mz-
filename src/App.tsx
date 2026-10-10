import { useState, useRef } from "react";

// LOGO ESSE - SVG LIMPO SEM BASE64 - IGUAL AO SEU PRINT DOURADO FUNDO AZUL
const LogoESSE = ({ size = 40, withText = true }: { size?: number, withText?: boolean }) => (
  <div className="flex items-center gap-2">
    <svg width={size} height={size} viewBox="0 0 100 100" className="rounded-full">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8c36a" />
          <stop offset="50%" stopColor="#d4a44a" />
          <stop offset="100%" stopColor="#b88a35" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gold)" />
      {/* C + gota estilizado como no seu logo */}
      <path d="M 30 20 Q 15 35 20 55 Q 25 75 45 85 Q 70 90 80 70 Q 85 55 75 40 Q 85 55 80 70 Q 75 80 60 82 Q 50 83 48 70 Q 48 62 58 60 Q 68 50 65 35 Q 60 25 50 18 Z" fill="#2a3d55" />
      <path d="M 50 18 Q 30 25 20 50 Q 20 70 35 82 Q 50 90 65 82 Q 75 78 78 70 Q 70 85 50 88 Q 30 88 15 75 Q 5 60 8 40 Q 12 22 30 12 Z" fill="none" stroke="#2a3d55" strokeWidth="0.5" opacity="0.6" />
    </svg>
    {withText && (
      <div className="flex flex-col leading-none">
        <div className="flex gap-1">
          {/* ESSE com 3 barras */}
          <div className="flex flex-col justify-between h-8 w-8">
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
          </div>
          <div className="flex flex-col justify-between h-8 w-7">
            <div className="h-2 bg-[#d4a44a] rounded-r-full rounded-l-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-full -ml-1"></div>
            <div className="h-2 bg-[#d4a44a] rounded-l-sm rounded-r-full"></div>
          </div>
          <div className="flex flex-col justify-between h-8 w-7">
            <div className="h-2 bg-[#d4a44a] rounded-r-full rounded-l-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-full -ml-1"></div>
            <div className="h-2 bg-[#d4a44a] rounded-l-sm rounded-r-full"></div>
          </div>
          <div className="flex flex-col justify-between h-8 w-8">
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
            <div className="h-2 bg-[#d4a44a] rounded-sm"></div>
          </div>
        </div>
        <div className="text-[8px] text-[#d4a44a] tracking-wider mt-1 font-medium">Energy solutions and services enterprise</div>
      </div>
    )}
  </div>
);

const COR_AZUL = "#3a4f6a";
const COR_DOURADO = "#d4a44a";
const semAcento = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
type Pagina = 1|2|3|4|5|6|7|8|9|10|11;
type Tab = "encontrar"|"contratos"|"meus";
type Lang = "pt"|"en"|"fr";
type TipoCadastro = "empresa"|"singular"|"cooperativa";
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";

const TRAD: any = {
  pt: { encontrar:"ENCONTRAR", contratos:"CONTRATOS 11", meus:"MEUS", slogan:"ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS", projeto:"Um projeto da ESSE - DESBLOQUEADO", heroBadge:"AGORA 11 CLAUSULAS DESBLOQUEADAS", heroTitle:"Chega de acordo de boca! Contrato legal em 2 minutos.", heroSub:"Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.", buscar:"Pesquisar", oque:"O que precisa? Ex: Serralheiro, Mecanico, Domestica", onde:"Onde? Matola, Maputo, Boane..." },
  en: { encontrar:"FIND", contratos:"CONTRACTS 11", meus:"MY CONTRACTS", slogan:"FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES", projeto:"A project by ESSE - UNLOCKED", heroBadge:"NOW 11 CLAUSES UNLOCKED", heroTitle:"No more handshake deals! Legal contract in 2 minutes.", heroSub:"Protect your money and work. With photos, M-Pesa proof and WhatsApp signature. Valid in Mozambique Law 23/2007.", buscar:"Search", oque:"What do you need? Ex: Welder, Mechanic", onde:"Where? Matola, Maputo..." },
  fr: { encontrar:"TROUVER", contratos:"CONTRATS 11", meus:"MES CONTRATS", slogan:"TROUVEZ. NEGOCIEZ. FORMALISEZ. 11 CLAUSES", projeto:"Un projet de ESSE - DEBLOQUE", heroBadge:"MAINTENANT 11 CLAUSES DEBLOQUEES", heroTitle:"Fini les accords verbaux! Contrat legal en 2 minutes.", heroSub:"Protegez votre argent et votre travail. Avec photos, preuve M-Pesa et signature WhatsApp.", buscar:"Rechercher", oque:"De quoi avez-vous besoin?", onde:"Ou? Matola, Maputo..." }
};

const PAISES: Record<string, string[]> = {
  "Mocambique": ["Maputo Cidade","Maputo Provincia - Matola","Maputo - Boane","Maputo - Marracuene","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Manica - Chimoio","Tete","Zambezia - Quelimane","Nampula","Cabo Delgado - Pemba","Niassa - Lichinga"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KwaZulu-Natal - Durban","Eastern Cape","Limpopo","Mpumalanga","Free State","North West","Northern Cape"],
  "Portugal": ["Lisboa","Porto","Braga","Coimbra","Faro","Aveiro","Setubal","Madeira","Acores"],
  "Brasil": ["Sao Paulo - SP","Rio de Janeiro - RJ","Minas Gerais - MG","Bahia - BA","Parana - PR","Rio Grande do Sul - RS","Pernambuco - PE","Ceara - CE","Distrito Federal - DF"],
  "Angola": ["Luanda","Benguela","Huila - Lubango","Cabinda","Namibe","Huambo","Lobito","Malanje"],
  "France": ["Ile-de-France - Paris","Provence-Alpes-Cote dAzur","Auvergne-Rhone-Alpes","Occitanie","Nouvelle-Aquitaine","Hauts-de-France","Grand Est","Bretagne"],
  "USA": ["California","Texas","Florida","New York","Illinois","Georgia","Washington","Nevada","Arizona"],
  "India": ["Maharashtra - Mumbai","Delhi","Karnataka - Bangalore","Tamil Nadu - Chennai","Gujarat","West Bengal - Kolkata"]
};

const MODELOS: Record<TipoContrato, { titulo: string, checklist: string[], desc: string }> = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DE TRABALHO DOMESTICO", checklist: ["Limpeza geral da casa todos os comodos","Lavar louca e organizar cozinha","Zelar pela louca e eletrodomesticos - avisar quebras","Arrumar quartos e fazer camas diariamente","Lavar, passar, dobrar e guardar roupa","Organizar despensa e geladeira","Fazer lista de compras e ir ao mercado","Cozinhar cafe, almoco e jantar","Servir refeicoes e organizar mesa","Cuidar das plantas e quintal","Cuidar das criancas quando solicitado","Receber encomendas e recados","Manter banheiros limpos e desinfetados","Passar e guardar roupas de cama e banho"], desc: "Domestico - clausula louca protegida" },
  "Motorista Particular": { titulo: "CONTRATO DE TRABALHO - MOTORISTA PRIVADO", checklist: ["Conduzir empregador e familia com seguranca","Levar e buscar criancas na escola","Levar para consultas, igreja, mercado","Manutencao basica: oleo, pneu, limpeza diaria","Abastecer viatura e controlar consumo","Fazer compras e recados com comprovativo","Lavar viatura 2x por semana","Verificar documentacao e livrete","Cumprir horario rigorosamente","Guardar sigilo absoluto da familia"], desc: "Motorista Privado" },
  "Pedreiro": { titulo: "CONTRATO DE EMPREITADA - PEDREIRO", checklist: ["Alvenaria de blocos e tijolos","Reboco interior e exterior liso","Assentar tijoleira e ceramica com nivel","Fundacoes, pilares e vigas conforme projeto","Fazer cinta e laje","Construir muro e passeio","Aplicar chapisco e emboco","Fazer contrapiso nivelado","Assentar portas e janelas","Fazer drenagem e fossa"], desc: "Pedreiro - anexar foto/projeto" },
  "Carpinteiro": { titulo: "CONTRATO - CARPINTEIRO", checklist: ["Fabricar moveis em madeira macica/MDF","Instalar portas com fechadura e dobradicas","Instalar janelas e batentes","Fabricar e instalar armarios e roupeiros","Medir, cortar e plainar madeira","Aplicar verniz, tinta e acabamento"], desc: "Portas, janelas" },
  "Serralheiro": { titulo: "CONTRATO - SERRALHEIRO", checklist: ["Fabricar portoes de correr e basculante","Fabricar grades e janelas de ferro","Soldar estruturas metalicas com reforco","Instalar portoes com nivel e chumbamento","Fabricar tanque e suporte de agua"], desc: "Soldar, portoes" },
  "Eletricista": { titulo: "CONTRATO - ELETRICISTA", checklist: ["Instalar quadro eletrico com disjuntores","Instalar tomadas e interruptores","Instalar iluminacao e lustres","Passar cabos e fios em tubo","Testar instalacao com multimetro"], desc: "Eletrica com garantia" },
  "Canalizador": { titulo: "CONTRATO - CANALIZADOR", checklist: ["Instalar canos de agua fria e quente","Instalar esgotos com caida correta","Instalar sanita, lavatorio e chuveiro","Reparar fugas e trocar vedantes","Instalar autoclismo e torneiras"], desc: "Canalizacao sem vazamento" },
  "Pintor": { titulo: "CONTRATO - PINTOR", checklist: ["Preparar parede: lixar, massa corrida, selador","Pintura interior 2 demaos","Pintura exterior com tinta impermeavel","Aplicar textura conforme foto anexa","Pintar teto branco neve"], desc: "Pintura com cor foto anexa" },
  "Servicos/Consultoria": { titulo: "CONTRATO DE PRESTACAO DE SERVICOS - CONSULTORIA", checklist: ["Consultoria empresarial e plano de negocios","Servicos administrativos e secretariado","Servicos tecnicos especializados","Assessoria juridica/contabil","Marketing digital e comunicacao"], desc: "Empresas - metas e relatorios" },
  "Outros/Particular": { titulo: "CONTRATO PARTICULAR - OUTROS SERVICOS", checklist: ["Descrever servico detalhadamente no campo abaixo","Definir material fornecido por quem","Definir prazo e penalidade por atraso","Definir garantia do servico","Definir horario e local exato"], desc: "Formulario livre" },
};

const CATEGORIAS_25 = ["Carpintaria","Mecanica Auto","Empreiteiro / Construcao Civil","Eletricista","Serralheiro / Soldador","Canalizacao / Picheleiro","Pintor","Pedreiro","Motorista / Condutor","Domestica / Empregada","Baba / Cuidadora","Jardineiro","Tecnico de Frio / AC","Tecnico Informatica","Alfaiate","Cabeleireiro / Barbeiro","Vidraceiro","Seguranca","Limpeza Profissional","Montador de Moveis","Soldador Industrial","Carpinteiro","Mecanica Industrial","Estofador","Gesseiro"];
const PROFISSIONAIS = [
  { ini:"ML", nome:"Maria Langa", func:"Empregada Domestica", cat:"Domestico", local:"Maputo - Polana", provincia:"Maputo Cidade", pais:"Mocambique", tipo:"singular" as TipoCadastro, nota:"4.9", trab:"23 trabalhos", preco:7500, disp:"Disponivel", tags:["Verificado"], foto:"ML" },
  { ini:"JM", nome:"Joao Manuel Carpintaria", func:"Carpinteiro", cat:"Construcao", local:"Matola - Machava", provincia:"Maputo Provincia - Matola", pais:"Mocambique", tipo:"empresa" as TipoCadastro, nota:"4.8", trab:"34 trabalhos", preco:800, disp:"Disponivel", tags:["Empresa"], foto:"JM" },
  { ini:"PM", nome:"Pedro Massingue Pedreiro", func:"Pedreiro", cat:"Construcao", local:"Maputo - Zimpeto", provincia:"Maputo Cidade", pais:"Mocambique", tipo:"singular" as TipoCadastro, nota:"4.7", trab:"56 trabalhos", preco:700, disp:"Ocupado", tags:["Verificado"], foto:"PM" },
  { ini:"EC", nome:"Esperanca Cossa Eletricista", func:"Eletricista", cat:"Construcao", local:"Maputo - Sommershield", provincia:"Maputo Cidade", pais:"Mocambique", tipo:"singular" as TipoCadastro, nota:"4.9", trab:"41 trabalhos", preco:650, disp:"Disponivel", tags:["Certificado"], foto:"EC" },
  { ini:"CT", nome:"Carlos Tivane Motorista", func:"Motorista", cat:"Domestico", local:"Matola - Liberdade", provincia:"Maputo Provincia - Matola", pais:"Mocambique", tipo:"singular" as TipoCadastro, nota:"4.8", trab:"29 trabalhos", preco:1200, disp:"Disponivel", tags:["Carta C1"], foto:"CT" },
  { ini:"MB", nome:"Mecanica Boane Auto Lda", func:"Mecanica Auto", cat:"Mecanica", local:"Boane - Centro", provincia:"Maputo - Boane", pais:"Mocambique", tipo:"empresa" as TipoCadastro, nota:"4.9", trab:"96 trabalhos", preco:900, disp:"Disponivel", tags:["Empresa"], foto:"MB" },
];

const PAGAMENTOS = { mpesa: { n: "840532899", d: "M-Pesa", c: "bg-[#e4002b]" }, emola: { n: "864341779", d: "e-Mola", c: "bg-[#ff6b00]" }, mkesh: { n: "823832513", d: "mKesh", c: "bg-[#3a4f6a]" }, banco: { n: "000301170814421100321", d: "Standard Bank", c: "bg-[#0033a0]" } };
type Anexo = { id:string, nome:string, tamanho:string, url:string };

export default function App(){
  const [lang,setLang]=useState<Lang>("pt");
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
  const [busca,setBusca]=useState("");
  const [paisSel,setPaisSel]=useState("Mocambique");
  const [provSel,setProvSel]=useState("");
  const [tipoCadastro,setTipoCadastro]=useState<TipoCadastro>("singular");
  const [docAnexosPrestador,setDocAnexosPrestador]=useState<Anexo[]>([]);
  const [formCadastro,setFormCadastro]=useState({ nome:"", nuit:"", bi:"", tel:"", pais:"Mocambique", provincia:"Maputo Provincia - Matola", bairro:"", categoria:"Carpintaria", anos:"", desc:"", preco:"", disp:"" });
  const [form,setForm]=useState({ empNome:"artur simao zimba", empBI:"110200011B", empNuit:"401866876", empTel:"823832513", empBairro:"xai xai", empEndereco:"Av. Principal", trabNome:"anastancio", trabBI:"1102100mmm", trabNuit:"", trabTel:"840532899", trabEndereco:"xai xai - bairro 2", trabProfissao:"Motorista", valor:"7500", diaPagamento:"05", prazo:"30", dataInicio:new Date().toISOString().split('T')[0], local:"xai xai - casa", provincia:"Gaza - Xai-Xai", horarioInicio:"06:00", horarioFim:"17:00", diasSemana:"Segunda a Sabado", alimentacao:"Sim - almoco fornecido", alojamento:"Nao", transporte:"Sim - 500MT mes", folgasDesc:"Domingo e feriados. 12 dias ferias apos 1 ano Lei 23/2007", periodoExp:"90 dias", deveresTrab:"Cumprir horario, guardar sigilo, zelar pelos bens", deveresEmp:"Pagar em dia via M-Pesa com recibo, respeitar dignidade", rescisaoJusta:"Roubo, violencia, falta grave", rescisaoAviso:"30 dias" });
  const formRef = useRef<HTMLDivElement>(null);
  const t = TRAD[lang];
  const todas = [...tarefasSel, ...tarefasExtra.split(",").map(x=>x.trim()).filter(Boolean)];
  const handleFiles=(files:FileList|null)=>{ if(!files) return; const novos:Anexo[]=Array.from(files).slice(0,5).map(f=>({id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024/1024).toFixed(2)+" MB",url:URL.createObjectURL(f)})); setAnexos(p=>[...p,...novos].slice(0,10)); };
  const handleFilesPrestador=(files:FileList|null)=>{ if(!files) return; const novos:Anexo[]=Array.from(files).map(f=>({id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024/1024).toFixed(2)+" MB",url:URL.createObjectURL(f)})); setDocAnexosPrestador(p=>[...p,...novos].slice(0,10)); };
  const scrollParaForm=()=>{ setTimeout(()=>{ formRef.current?.scrollIntoView({behavior:"smooth",block:"start"}); },120); };
  const escolherTipo=(t:TipoContrato)=>{ setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,6)); setPagina(1); if(window.innerWidth<1024) setBibAberta(false); scrollParaForm(); };
  const irPagina=(p:Pagina)=>{ setPagina(p); scrollParaForm(); };
  const profissionaisFiltrados = PROFISSIONAIS.filter(p=>{ const mb = !busca || p.func.toLowerCase().includes(busca.toLowerCase()) || p.nome.toLowerCase().includes(busca.toLowerCase()); const mp = !provSel || p.provincia.includes(provSel) || p.local.includes(provSel); const mpais = !paisSel || p.pais===paisSel; return mb && mp && mpais; });
  const provinciasDoPais = PAISES[paisSel] || PAISES["Mocambique"];

  const gerarPDFCompleto=async()=>{
    const { jsPDF } = await import("jspdf");
    const doc=new jsPDF({unit:"mm",format:"a4"}); const W=doc.internal.pageSize.getWidth(), H=doc.internal.pageSize.getHeight(); const M=15;
    const addCabecalho = (pageNum:number)=>{ doc.setFillColor(58,79,106); doc.rect(0,0,W,22,"F"); doc.setTextColor(212,164,74); doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.text("CONTRATO - "+semAcento(tipo).toUpperCase()+" - 11 CLAUSULAS", M+8, 8); doc.setTextColor(200,210,225); doc.setFontSize(7); doc.text("Lei n 23/2007 - ESSE NUIT 401 866 876", M+8, 13); doc.setTextColor(255,255,255); doc.setFontSize(6); doc.text("Pag "+pageNum, W-M-12, 19, {align:"right"}); };
    const addRodape = ()=>{ const footerY = H-12; doc.setDrawColor(212,164,74); doc.setLineWidth(0.5); doc.line(M, footerY, W-M, footerY); doc.setFillColor(245,247,250); doc.rect(0, footerY+0.5, W, 12, "F"); doc.setTextColor(42,61,85); doc.setFontSize(6.5); doc.setFont("helvetica","bold"); doc.text("ESSE - ENERGY SOLUTIONS & SERVICES", M+14, footerY+4); doc.setFont("helvetica","normal"); doc.setFontSize(5.5); doc.text("NUIT 401 866 876 - M-Pesa 840532899 | e-Mola 864341779 | mKesh 823832513 - Contrata.MZ", M+14, footerY+7.5); };
    let y=28; let pageNum=1; addCabecalho(pageNum); addRodape();
    const check=(h=20)=>{ if(y+h>H-18){ doc.addPage(); pageNum++; y=28; addCabecalho(pageNum); addRodape(); } };
    doc.setTextColor(20,20,20);
    const tituloClausula=(n:number,t:string)=>{ check(14); doc.setFontSize(11); doc.setFont("helvetica","bold"); doc.setFillColor(42,61,85); doc.rect(M,y-5,W-M*2,9,"F"); doc.setTextColor(212,164,74); doc.text(n+". "+semAcento(t.toUpperCase()),M+2,y); y+=9; doc.setTextColor(20,20,20); doc.setFont("helvetica","normal"); doc.setFontSize(10); };
    tituloClausula(1,"PARTES"); const partes = `EMPREGADOR: ${form.empNome}, BI ${form.empBI} NUIT ${form.empNuit} Tel ${form.empTel} End ${form.empEndereco}. PROFISSIONAL: ${form.trabNome} BI ${form.trabBI} Tel ${form.trabTel} End ${form.trabEndereco}.`; doc.splitTextToSize(semAcento(partes), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(2,"OBJECTO"); doc.text("Funcao: "+semAcento(tipo),M,y); y+=5; todas.forEach((t,i)=>{ const txt = (i+1)+". "+semAcento(t); doc.splitTextToSize(txt, W-M*2-5).forEach((l:string)=>{ check(6); doc.text(l, M+2, y); y+=5; }); }); y+=4;
    tituloClausula(3,"HORARIO"); const horario = `Horario: ${form.horarioInicio} as ${form.horarioFim} Dias ${form.diasSemana} Inicio ${form.dataInicio} Local ${form.local}`; doc.splitTextToSize(semAcento(horario), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(4,"SALARIO"); const sal = `Salario ${form.valor} MT dia ${form.diaPagamento} via M-Pesa ${form.trabTel} Prazo ${form.prazo}`; doc.splitTextToSize(semAcento(sal), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(5,"ALIMENTACAO"); doc.splitTextToSize(semAcento(form.alimentacao+" - "+form.alojamento+" - "+form.transporte), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(6,"FOLGAS"); doc.splitTextToSize(semAcento(form.folgasDesc), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(7,"EXPERIMENTAL"); doc.splitTextToSize(semAcento(form.periodoExp), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(8,"DEVERES TRAB"); doc.splitTextToSize(semAcento(form.deveresTrab), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(9,"DEVERES EMP"); doc.splitTextToSize(semAcento(form.deveresEmp), W-M*2).forEach((l:string)=>{ check(6); doc.text(l,M,y); y+=5; }); y+=4;
    tituloClausula(10,"ANEXOS ANTES VALIDADE"); if(anexos.length===0){ doc.text("Nenhum anexo",M,y); y+=5; } else { anexos.forEach((a,i)=>{ check(6); doc.text((i+1)+". "+semAcento(a.nome),M,y); y+=5; }); } y+=4;
    tituloClausula(11,"VALIDADE"); doc.text("Validade Lei 23/2007 - Contrata.MZ - ESSE",M,y); y+=20; doc.setDrawColor(42,61,85); doc.rect(W/2-55,y,110,28); doc.setTextColor(42,61,85); doc.setFontSize(7); doc.text("CARIMBO OFICIAL",W/2-22,y+6); doc.setTextColor(20,20,20); y+=38;
    return doc;
  };
  const gerarPDF=async()=>{ const doc=await gerarPDFCompleto(); doc.save("Contrato-11-Clausulas-"+(form.trabNome||"SemNome").replace(/\s+/g,"-")+".pdf"); };
  const compartilharFree=async()=>{ try{ const doc=await gerarPDFCompleto(); const blob=doc.output("blob"); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="Contrato-"+form.trabNome+".pdf"; document.body.appendChild(a); a.click(); setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); },2000); window.open("https://wa.me/?text=Contrato "+tipo+" - "+form.trabNome,"_blank"); }catch(e){ await gerarPDF(); } };
  const pagar=async()=>{ setProcessando(true); await new Promise(r=>setTimeout(r,1500)); setShowPin(true); setTimeout(()=>{ setShowPin(false); setProcessando(false); setShowPag(false); gerarPDF(); },2000); };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-[1600px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#3a4f6a] p-1.5 rounded-lg"><LogoESSE size={36} withText={false} /></div>
            <div><div className="font-bold text-[14px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">{t.slogan}</div><div className="text-[9px] text-zinc-400 font-bold">{t.projeto}</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-[#3a4f6a] px-3 py-1.5 rounded-lg"><LogoESSE size={28} withText={true} /></div>
            <div className="flex p-1 bg-zinc-100 rounded-lg ml-1"><button onClick={()=>setLang("pt")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="pt"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>PT</button><button onClick={()=>setLang("en")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="en"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>EN</button><button onClick={()=>setLang("fr")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="fr"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>FR</button></div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 pt-4">
        <div className="bg-gradient-to-r from-[#0033a0] via-[#2a3d55] to-[#3a4f6a] text-white rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-xl relative overflow-hidden">
          <div className="relative z-10"><div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">{t.heroBadge}</div><div className="text-[18px] md:text-[22px] font-extrabold mt-2 leading-tight max-w-[700px]">{t.heroTitle}</div><div className="text-[13px] md:text-[14px] text-white/90 mt-2 max-w-[700px] leading-relaxed">{t.heroSub}</div><div className="mt-3 flex flex-wrap gap-2 text-[11px]"><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">1-11 Desbloqueadas</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">15+ Tarefas por tipo</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">Preview = PDF</span><span className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">Anexos antes validade</span></div></div>
          <div className="relative z-10 bg-white text-[#0f172a] rounded-xl p-4 min-w-[300px] shadow-lg"><div className="text-[11px] font-extrabold text-[#0033a0] uppercase tracking-wider">Contrato Completo 11 Clausulas</div><div className="text-[12px] text-[#2a3d55] font-bold mt-1">Sem advogado. Sem complicacao.</div><div className="mt-3 space-y-2 text-[12px]"><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px] font-bold">!</span><span className="font-bold text-[#2a3d55]">Contrato que vale no tribunal</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px]">âœ“</span><span>Recibo M-Pesa automatico</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#2a3d55] text-[#d4a44a] grid place-items-center text-[10px]">âœ“</span><span>Fotos viram prova legal</span></div><div className="flex gap-2 items-center"><span className="w-6 h-6 rounded-full bg-[#d4a44a] text-white grid place-items-center text-[10px]">W</span><span className="font-bold">Envia no WhatsApp na hora</span></div></div><div className="mt-3 p-2 bg-[#fff8ed] border border-[#d4a44a]/30 rounded-lg text-[10px] text-center text-[#2a3d55] font-bold">+ de 1.200 contratos ja gerados em Gaza</div></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex gap-2 p-1 bg-white border rounded-xl w-fit"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="encontrar"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>{t.encontrar}</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="contratos"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>{t.contratos}</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="meus"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>{t.meus}</button></div>
          {tab==="contratos" && (
            <div className="flex p-1 bg-white border-2 rounded-xl w-full lg:w-fit overflow-x-auto gap-1.5">
              <button onClick={()=>irPagina(1)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===1?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>1. Partes</button>
              <button onClick={()=>irPagina(2)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===2?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>2. Objecto ({todas.length})</button>
              <button onClick={()=>irPagina(3)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===3?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>3. Horario</button>
              <button onClick={()=>irPagina(4)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===4?"bg-[#2a3d55] text-white":"bg-zinc-100"}`}>4. Salario</button>
              <button onClick={()=>irPagina(10)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===10?"bg-orange-500 text-white":"bg-zinc-100"}`}>10. Anexos ({anexos.length})</button>
              <button onClick={()=>irPagina(11)} className={`px-3 py-2 rounded-lg text-[11px] font-bold whitespace-nowrap ${pagina===11?"bg-[#3a4f6a] text-white":"bg-zinc-100"}`}>11. Validade</button>
            </div>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] px-4 py-6">
        {tab==="encontrar" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="font-bold text-[16px]">Encontra o mestre certo na tua zona.</div>
              <div className="text-[13px] text-zinc-600 mt-1">Mecanicos, eletricistas, domesticas, motoristas, pedreiros e mais de 25 categorias.</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_200px_220px_120px] gap-3">
                <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder={t.oque} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]" />
                <select value={paisSel} onChange={e=>{setPaisSel(e.target.value); setProvSel(""); setFormCadastro({...formCadastro, pais:e.target.value});}} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]"><option value="">Pais - Todos</option>{Object.keys(PAISES).map(p=><option key={p} value={p}>{p}</option>)}</select>
                <select value={provSel} onChange={e=>setProvSel(e.target.value)} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]"><option value="">Provincia / Estado - {provinciasDoPais.length}</option>{provinciasDoPais.map(p=><option key={p} value={p}>{p}</option>)}</select>
                <button className="h-11 bg-[#3a4f6a] text-white rounded-xl font-bold text-[13px]">{t.buscar}</button>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">Pais -> Provincias aparecem automaticamente. Funciona em todo mundo.</div>
            </div>

            <div className="bg-[#0f172a] text-white rounded-xl p-6">
              <div className="font-bold text-[18px]">Cadastra-te como prestador e seja encontrado hoje</div>
              <div className="text-[12px] text-white/70 mt-1">Carpintaria, mecanica, empreiteiro, mecanico viaturas, eletricista, serralheiro, domestica, motorista...</div>
              <div className="mt-5 bg-white text-zinc-800 rounded-xl p-5">
                <div className="text-[11px] font-bold uppercase">Tipo de cadastro *</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={()=>setTipoCadastro("empresa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="empresa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">EMPRESA</div><div className="text-[11px] text-zinc-600">Carpintaria, Mecanica, Empreiteiro</div></button>
                  <button onClick={()=>setTipoCadastro("singular")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="singular"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">PROFISSIONAL INDIVIDUAL / SINGULAR</div><div className="text-[11px] text-zinc-600">Mecanico, Eletricista, Domestica, Motorista</div></button>
                  <button onClick={()=>setTipoCadastro("cooperativa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="cooperativa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">COOPERATIVA / ASSOCIACAO</div><div className="text-[11px] text-zinc-600">Equipa organizada</div></button>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="text-[11px] font-bold uppercase">Nome *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold uppercase">BI *</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro,bi:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold uppercase">Pais *</label><select value={formCadastro.pais} onChange={e=>{setFormCadastro({...formCadastro,pais:e.target.value}); setPaisSel(e.target.value);}} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold uppercase">Provincia / Estado * - automatico</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{(PAISES[formCadastro.pais]||[]).map(p=><option key={p}>{p}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold uppercase">Telefone / WhatsApp *</label><input value={formCadastro.tel} onChange={e=>setFormCadastro({...formCadastro,tel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold uppercase">Categoria *</label><select value={formCadastro.categoria} onChange={e=>setFormCadastro({...formCadastro,categoria:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{CATEGORIAS_25.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="mt-4">
                  <label className="text-[11px] font-bold uppercase">Anexar documentos - BI, certificado, carta conducao, fotos trabalhos, alvara</label>
                  <label className="mt-2 w-full min-h-[90px] border-2 border-dashed border-[#d4a44a] rounded-xl grid place-items-center p-4 cursor-pointer bg-[#fff8ed]"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>handleFilesPrestador(e.target.files)} /><div className="text-center"><div className="font-bold text-[13px]">Clique para anexar documentos</div><div className="text-[11px] text-zinc-500">JPG, PNG, PDF - max 5MB</div></div></label>
                  {docAnexosPrestador.length>0 && <div className="mt-3 space-y-2">{docAnexosPrestador.map(a=><div key={a.id} className="flex gap-2 items-center border p-2 rounded-xl bg-white"><div className="flex-1 text-[11px] font-bold">{a.nome} - {a.tamanho}</div><button onClick={()=>setDocAnexosPrestador(p=>p.filter(x=>x.id!==a.id))} className="w-7 h-7 bg-red-50 text-red-600 rounded-full">x</button></div>)}</div>}
                </div>
                <button onClick={()=>alert("Cadastrado como "+tipoCadastro.toUpperCase()+" - Pais: "+formCadastro.pais+" Provincia: "+formCadastro.provincia+" Docs: "+docAnexosPrestador.length)} className="mt-5 w-full h-12 bg-[#3a4f6a] text-white rounded-xl font-bold">Cadastrar e aparecer no ENCONTRAR</button>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <div className="font-bold">Profissionais verificados - {profissionaisFiltrados.length} encontrados</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profissionaisFiltrados.map(p=>(
                  <div key={p.ini+p.nome} className="border-2 rounded-xl p-4">
                    <div className="flex gap-3"><div className="w-12 h-12 rounded-full bg-[#3a4f6a] text-white grid place-items-center font-bold">{p.foto}</div><div className="flex-1"><div className="font-bold text-[13px]">{p.nome}</div><div className="text-[11px] text-zinc-600">{p.func} - {p.pais}</div><div className="text-[11px]">â­ {p.nota} ({p.trab}) - {p.local}</div></div></div>
                    <div className="mt-3 grid grid-cols-2 gap-2"><button className="h-8 rounded-lg bg-white border font-bold text-[11px]">Ver Perfil</button><button className="h-8 rounded-lg bg-[#25D366] text-white font-bold text-[11px]">WhatsApp</button></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr_380px] gap-4">
            <div className="bg-white border rounded-xl p-3 h-fit lg:sticky lg:top-[76px]">
              <div className="font-bold text-[13px]">Biblioteca 10+ - 15 tarefas cada</div><div className="text-[11px] text-zinc-500">Escolhido: {tipo} ({MODELOS[tipo].checklist.length})</div>
              <div className="mt-3 space-y-2">{(Object.keys(MODELOS) as TipoContrato[]).map(t=>{const ativo=tipo===t; return <button key={t} onClick={()=>escolherTipo(t)} className={`w-full text-left p-3 rounded-xl border flex gap-2.5 ${ativo?"bg-[#fff8ed] border-[#d4a44a]":"bg-white"}`}><div className="flex-1"><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc}</div></div><div className={`w-5 h-5 rounded-full border-2 grid place-items-center ${ativo?"bg-[#3a4f6a] border-[#3a4f6a] text-white":"border-zinc-300"}`}>{ativo?"âœ“":""}</div></button>})}
              </div>
            </div>
            <div ref={formRef} className="bg-white border rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold text-[13px]">CLAUSULA {pagina} - {tipo}</h3><span className="px-2 py-0.5 rounded-full bg-blue-50 border text-[11px] font-bold">{pagina}/11</span></div>
              <div className="mt-5">
                {pagina===1 && (<div className="space-y-4"><div className="grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold">Nome Contratante</label><input value={form.empNome} onChange={e=>setForm({...form,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[11px] font-bold">Nome Profissional</label><input value={form.trabNome} onChange={e=>setForm({...form,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div><button onClick={()=>irPagina(2)} className="w-full h-11 bg-[#2a3d55] text-white rounded-xl font-bold">Proximo 2</button></div>)}
                {pagina===2 && (<div className="space-y-4"><div className="font-bold">Tarefas - {MODELOS[tipo].checklist.length}</div><div className="flex flex-wrap gap-2">{MODELOS[tipo].checklist.map(t=>{const ativo=tarefasSel.includes(t); return <button key={t} onClick={()=>setTarefasSel(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} className={`px-3 py-2 rounded-full text-[12px] border ${ativo?"bg-[#3a4f6a] text-white":"bg-white"}`}>{t}</button>})}</div><div className="flex gap-2"><button onClick={()=>irPagina(1)} className="flex-1 h-11 border-2 rounded-xl">Voltar</button><button onClick={()=>irPagina(3)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl">Proximo</button></div></div>)}
                {[3,4,5,6,7,8,9].includes(pagina) && (<div><div className="font-bold">Clausula {pagina} editavel</div><div className="mt-3"><label className="text-[11px]">Valor / Descricao</label><input value={form.valor} onChange={e=>setForm({...form,valor:e.target.value})} className="mt-1 w-full h-10 border-2 rounded-lg px-3" /></div><div className="mt-3 flex gap-2"><button onClick={()=>irPagina((pagina-1) as Pagina)} className="flex-1 h-11 border-2 rounded-xl">Voltar</button><button onClick={()=>irPagina((pagina+1) as Pagina)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl">Proximo</button></div></div>)}
                {pagina===10 && (<div><div className="font-bold">Clausula 10 - Anexos antes validade</div><label className="mt-4 w-full min-h-[100px] border-2 border-dashed rounded-xl grid place-items-center p-4 cursor-pointer"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>handleFiles(e.target.files)} /><div>Adicionar fotos/projetos</div></label>{anexos.length>0 && <div className="mt-3">{anexos.map(a=><div key={a.id} className="border p-2 rounded-lg text-[11px]">{a.nome}</div>)}</div>}<div className="mt-3 flex gap-2"><button onClick={()=>irPagina(9)} className="flex-1 h-11 border-2 rounded-xl">Voltar</button><button onClick={()=>irPagina(11)} className="flex-1 h-11 bg-[#3a4f6a] text-white rounded-xl">Proximo 11</button></div></div>)}
                {pagina===11 && (<div><div className="font-bold">Clausula 11 - Validade</div><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={compartilharFree} className="h-12 bg-[#3a4f6a] text-white rounded-xl font-bold">FREE PDF + WhatsApp</button><button onClick={()=>setShowPag(true)} className="h-12 bg-[#2a3d55] text-white rounded-xl font-bold">PAGO 200MT</button></div><button onClick={()=>irPagina(10)} className="mt-3 w-full h-11 border-2 rounded-xl">Voltar 10</button></div>)}
              </div>
            </div>
            <div className="bg-white border rounded-xl p-4 h-fit lg:sticky lg:top-[76px]">
              <div className="text-[11px] font-bold">Preview AO VIVO - 11 Clausulas = PDF</div>
              <div className="mt-3 h-[400px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[11px] font-mono">CONTRATO {tipo.toUpperCase()}<br/>1.PARTES: {form.empNome} / {form.trabNome}<br/>2.OBJECTO: {todas.join(", ")}<br/>4.SALARIO: {form.valor} MT<br/>10.ANEXOS: {anexos.length}<br/>11.VALIDADE: Lei 23/2007</div>
              <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={compartilharFree} className="h-10 bg-[#3a4f6a] text-white rounded-xl font-bold text-[11px]">FREE</button><button onClick={()=>setShowPag(true)} className="h-10 bg-[#2a3d55] text-white rounded-xl font-bold text-[11px]">PAGO 200MT</button></div>
            </div>
          </div>
        )}
        {tab==="meus" && <div className="bg-white border rounded-xl p-6 text-center py-20"><div className="font-bold">MEUS CONTRATOS</div><div className="text-[12px] text-zinc-500 mt-2">Historico 1.200+ contratos em Gaza</div></div>}
      </main>

      {showPag && (<div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"><div className="bg-white rounded-xl w-full max-w-[420px] p-5"><div className="font-bold">Pagamento 200MT</div><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setShowPag(false)} className="h-10 border rounded-xl">FREE</button><button onClick={pagar} className="h-10 bg-[#2a3d55] text-white rounded-xl">Pagar</button></div></div></div>)}
      {showPin && <div className="fixed inset-0 z-[60] bg-black/60 grid place-items-center p-4"><div className="bg-white rounded-xl p-5 text-center"><div className="font-bold">Pedido enviado para {telPag}</div></div></div>}
      <footer className="mt-10 bg-[#0f172a] text-white py-6"><div className="mx-auto max-w-[1600px] px-4 flex items-center gap-3"><div className="bg-white p-1 rounded-lg"><LogoESSE size={36} withText={false} /></div><div><div className="font-bold text-[13px]">ESSE - ENERGY SOLUTIONS & SERVICES - 11 CLAUSULAS DESBLOQUEADAS</div><div className="text-[11px] text-white/60">NUIT 401 866 876 - Xai-Xai - Preview ao vivo = PDF final - Chega de acordo de boca.</div><div className="text-[9px] text-[#d4a44a]">Energy solutions and services enterprise</div></div></div></footer>
    </div>
  );
}
