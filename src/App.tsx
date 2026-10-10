import React, { useState, useMemo, useRef } from 'react';

// LOGO ESSE - SVG inline <2KB, fundo #2a3f5a, circulo #d4a44a com gota azul, ESSE dourado #eabf6a
function LogoESSE({ compact = false, size = 'normal' }: { compact?: boolean; size?: 'normal' | 'large' }) {
  const width = compact ? 170 : size === 'large' ? 380 : 340;
  const height = size === 'large' ? 48 : 44;
  return (
    <svg
      width={width}
      height={height}
      viewBox={compact ? "0 0 190 44" : "0 0 380 44"}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ESSE Energy solutions and services enterprise"
      style={{ display: 'block', maxWidth: '100%' }}
    >
      <rect width={compact ? 190 : 380} height="44" rx="6" fill="#2a3f5a" />
      <g transform="translate(6,4)">
        <circle cx="18" cy="18" r="18" fill="#d4a44a" />
        <path
          d="M18 5 C9 12 6.5 18.5 11 24.5 C13.5 27.5 16.5 28.5 18 28.5 C19.5 28.5 22.5 27.5 25 24.5 C29.5 18.5 27 12 18 5 Z M18 11.5 C21 15 22.2 18.3 20.6 20.8 C19.6 22.2 17.3 22.4 16 20.8 C14.2 18.3 15 15 18 11.5 Z"
          fill="#2a3f5a"
        />
      </g>
      <g transform="translate(50,6)">
        {/* E */}
        <rect x="0" y="0" width="4" height="28" fill="#eabf6a" />
        <rect x="0" y="0" width="16" height="4" fill="#eabf6a" />
        <rect x="0" y="12" width="14" height="4" fill="#eabf6a" />
        <rect x="0" y="24" width="16" height="4" fill="#eabf6a" />
        {/* S stylized 2 curvas */}
        <path d="M26 0 H38 C41 0 44 1.8 44 5.2 C44 9 41 11 37.5 12 L30 14 C25.5 15.2 22 17 22 20.5 C22 24.5 25 28 31 28 H44" fill="none" stroke="#eabf6a" strokeWidth="4" strokeLinecap="square" />
        <rect x="24" y="24" width="20" height="4" fill="#eabf6a" />
        {/* S2 */}
        <path d="M52 0 H64 C67 0 70 1.8 70 5.2 C70 9 67 11 63.5 12 L56 14 C51.5 15.2 48 17 48 20.5 C48 24.5 51 28 57 28 H70" fill="none" stroke="#eabf6a" strokeWidth="4" strokeLinecap="square" />
        <rect x="50" y="24" width="20" height="4" fill="#eabf6a" />
        {/* E */}
        <rect x="78" y="0" width="4" height="28" fill="#eabf6a" />
        <rect x="78" y="0" width="16" height="4" fill="#eabf6a" />
        <rect x="78" y="12" width="14" height="4" fill="#eabf6a" />
        <rect x="78" y="24" width="16" height="4" fill="#eabf6a" />
      </g>
      {!compact && (
        <>
          <text x="156" y="18" fill="#ffffff" fontFamily="Arial, Helvetica, sans-serif" fontSize="9" fontWeight="300" letterSpacing="0.4">Energy solutions and</text>
          <text x="156" y="28" fill="#ffffff" fontFamily="Arial, Helvetica, sans-serif" fontSize="9" fontWeight="300" letterSpacing="0.4">services enterprise</text>
        </>
      )}
    </svg>
  );
}

// TRADUCOES - apenas ASCII sem acentos
const TRAD = {
  pt: {
    encontrar: "ENCONTRAR",
    contratos: "CONTRATOS 11",
    meus: "MEUS",
    slogan: "ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS",
    heroTitle: "Chega de acordo de boca! Contrato legal em 2 minutos.",
    heroSub: "Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.",
    oQue: "O que precisa?",
    pais: "Pais",
    provincia: "Provincia / Estado",
    pesquisar: "PESQUISAR",
    tags: "Tags Populares:",
    cadastroTitulo: "Cadastre seu servico - Rapido e gratuito",
    tipoEmpresa: "EMPRESA",
    tipoIndividual: "PROFISSIONAL INDIVIDUAL SINGULAR",
    tipoCooperativa: "COOPERATIVA",
    nome: "Nome completo / Empresa",
    nuit: "NUIT / BI",
    telefone: "Telefone WhatsApp",
    email: "Email",
    servico: "Servico / Categoria",
    descricao: "Descricao curta do que faz",
    anexar: "Anexar documentos - Arraste aqui ou clique",
    enviar: "ENVIAR CADASTRO",
    verificados: "Profissionais verificados perto de si",
    verificado: "VERIFICADO",
    contratar: "CONTRATAR",
    verContrato: "GERAR CONTRATO",
    filtrar: "Filtrar",
    todosPaises: "Todos paises",
    todasProvincias: "Todas provincias",
    biblioteca: "Biblioteca de contratos - 10 modelos prontos",
    clausulas11: "11 Clausulas legais obrigatorias",
    pag: "Pagina",
    anexos: "Anexos com fotos antes da validade",
    preview: "Preview ao vivo",
    gerarPdf: "GERAR PDF COM CARIMBO ESSE",
    salvar: "SALVAR EM MEUS CONTRATOS",
    tipoContrato: "Tipo de contrato",
    empregador: "Dados do empregador",
    trabalhador: "Dados do trabalhador",
    funcao: "Funcao e local",
    prazo: "Prazo e horario",
    remuneracao: "Remuneracao e M-Pesa",
    obrigacoes: "Obrigacoes",
    validade: "Validade e Lei",
    assinaturas: "Assinaturas WhatsApp",
    final: "Finalizar e PDF",
    nenhum: "Nenhum contrato salvo ainda. Gere um em CONTRATOS 11.",
    meusTitulo: "Meus contratos salvos",
    buscarPlaceholder: "Ex: Pedreiro, Eletricista, Domestica...",
    documentos: "Documentos anexados",
    arraste: "Arraste ficheiros ou clique para selecionar",
    pdfPronto: "PDF pronto para download",
    lei: "Lei 23/2007 - Valido em Mocambique",
  },
  en: {
    encontrar: "FIND",
    contratos: "CONTRACTS 11",
    meus: "MY CONTRACTS",
    slogan: "FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES",
    heroTitle: "No more handshake deals! Legal contract in 2 minutes.",
    heroSub: "Protect your money and work. With photos, M-Pesa proof and WhatsApp signature instantly. Valid in all Mozambique Law 23/2007.",
    oQue: "What do you need?",
    pais: "Country",
    provincia: "Province / State",
    pesquisar: "SEARCH",
    tags: "Popular Tags:",
    cadastroTitulo: "Register your service - Fast and free",
    tipoEmpresa: "COMPANY",
    tipoIndividual: "INDIVIDUAL PROFESSIONAL",
    tipoCooperativa: "COOPERATIVE",
    nome: "Full name / Company",
    nuit: "ID / Tax number",
    telefone: "WhatsApp Phone",
    email: "Email",
    servico: "Service / Category",
    descricao: "Short description",
    anexar: "Attach documents - Drag here or click",
    enviar: "SUBMIT REGISTRATION",
    verificados: "Verified professionals near you",
    verificado: "VERIFIED",
    contratar: "HIRE",
    verContrato: "GENERATE CONTRACT",
    filtrar: "Filter",
    todosPaises: "All countries",
    todasProvincias: "All provinces",
    biblioteca: "Contract library - 10 ready templates",
    clausulas11: "11 mandatory legal clauses",
    pag: "Page",
    anexos: "Attachments with photos before validity",
    preview: "Live preview",
    gerarPdf: "GENERATE PDF WITH ESSE STAMP",
    salvar: "SAVE TO MY CONTRACTS",
    tipoContrato: "Contract type",
    empregador: "Employer data",
    trabalhador: "Worker data",
    funcao: "Role and location",
    prazo: "Term and schedule",
    remuneracao: "Payment and M-Pesa",
    obrigacoes: "Obligations",
    validade: "Validity and Law",
    assinaturas: "WhatsApp signatures",
    final: "Finish and PDF",
    nenhum: "No contracts saved yet. Create one in CONTRACTS 11.",
    meusTitulo: "My saved contracts",
    buscarPlaceholder: "Ex: Mason, Electrician, Housemaid...",
    documentos: "Attached documents",
    arraste: "Drag files or click to select",
    pdfPronto: "PDF ready to download",
    lei: "Law 23/2007 - Valid in Mozambique",
  },
  fr: {
    encontrar: "TROUVER",
    contratos: "CONTRATS 11",
    meus: "MES CONTRATS",
    slogan: "TROUVEZ. NEGOCIEZ. FORMALISEZ. 11 CLAUSES",
    heroTitle: "Fini les accords verbaux! Contrat legal en 2 minutes.",
    heroSub: "Protegez votre argent et votre travail. Avec photos, preuve M-Pesa et signature WhatsApp immediat. Valable au Mozambique Loi 23/2007.",
    oQue: "Que cherchez vous?",
    pais: "Pays",
    provincia: "Province / Etat",
    pesquisar: "RECHERCHER",
    tags: "Tags populaires:",
    cadastroTitulo: "Enregistrez votre service - Rapide et gratuit",
    tipoEmpresa: "ENTREPRISE",
    tipoIndividual: "PROFESSIONNEL INDIVIDUEL",
    tipoCooperativa: "COOPERATIVE",
    nome: "Nom complet / Entreprise",
    nuit: "ID / NUIT",
    telefone: "Telephone WhatsApp",
    email: "Email",
    servico: "Service / Categorie",
    descricao: "Description courte",
    anexar: "Joindre documents - Glissez ici ou cliquez",
    enviar: "ENVOYER INSCRIPTION",
    verificados: "Professionnels verifies pres de vous",
    verificado: "VERIFIE",
    contratar: "EMBAUCHER",
    verContrato: "GENERER CONTRAT",
    filtrar: "Filtrer",
    todosPaises: "Tous pays",
    todasProvincias: "Toutes provinces",
    biblioteca: "Bibliotheque de contrats - 10 modeles prets",
    clausulas11: "11 clauses legales obligatoires",
    pag: "Page",
    anexos: "Pieces jointes avec photos avant validite",
    preview: "Apercu en direct",
    gerarPdf: "GENERER PDF AVEC CACHET ESSE",
    salvar: "ENREGISTRER DANS MES CONTRATS",
    tipoContrato: "Type de contrat",
    empregador: "Donnees employeur",
    trabalhador: "Donnees travailleur",
    funcao: "Fonction et lieu",
    prazo: "Duree et horaire",
    remuneracao: "Remuneration et M-Pesa",
    obrigacoes: "Obligations",
    validade: "Validite et Loi",
    assinaturas: "Signatures WhatsApp",
    final: "Finaliser et PDF",
    nenhum: "Aucun contrat enregistre. Creez en un dans CONTRATS 11.",
    meusTitulo: "Mes contrats enregistres",
    buscarPlaceholder: "Ex: Macon, Electricien, Menage...",
    documentos: "Documents joints",
    arraste: "Glissez fichiers ou cliquez pour choisir",
    pdfPronto: "PDF pret a telecharger",
    lei: "Loi 23/2007 - Valable au Mozambique",
  },
};

const PAISES: Record<string, string[]> = {
  "Mocambique": ["Maputo Cidade", "Matola", "Boane", "Marracuene", "Gaza - Xai-Xai", "Inhambane", "Sofala - Beira", "Manica", "Tete", "Zambezia", "Nampula", "Cabo Delgado", "Niassa"],
  "South Africa": ["Gauteng - Johannesburg", "Western Cape - Cape Town", "KwaZulu-Natal - Durban", "Eastern Cape", "Limpopo"],
  "Portugal": ["Lisboa", "Porto", "Braga", "Coimbra", "Faro"],
  "Brasil": ["Sao Paulo - SP", "Rio de Janeiro - RJ", "Minas Gerais - MG", "Bahia - BA", "Parana - PR"],
  "Angola": ["Luanda", "Benguela", "Huila - Lubango", "Cabinda"],
  "France": ["Ile-de-France - Paris", "Provence-Alpes-Cote dAzur"],
  "USA": ["California", "Texas", "Florida", "New York"],
  "India": ["Maharashtra - Mumbai", "Delhi", "Karnataka - Bangalore"],
};

const CATEGORIAS = ["Pedreiro", "Carpinteiro", "Eletricista", "Canalizador", "Pintor", "Serralheiro", "Motorista", "Domestica", "Secretaria", "Consultoria"];

const PROFISSIONAIS_MOCK = [
  { id: 1, nome: "Carlos Matsinhe", cat: "Pedreiro", pais: "Mocambique", prov: "Maputo Cidade", rating: 4.9, jobs: 127, verif: true, desc: "Construcao, reboco, ladrilho, 10 anos exp." },
  { id: 2, nome: "Amina S.", cat: "Domestica", pais: "Mocambique", prov: "Matola", rating: 5.0, jobs: 89, verif: true, desc: "Limpeza, cozinha, criancas, referencias." },
  { id: 3, nome: "Joao Paulo", cat: "Eletricista", pais: "South Africa", prov: "Gauteng - Johannesburg", rating: 4.8, jobs: 203, verif: true, desc: "Instalacao, manutencao predial e domestica." },
  { id: 4, nome: "Fernanda Costa", cat: "Secretaria", pais: "Brasil", prov: "Sao Paulo - SP", rating: 4.9, jobs: 54, verif: true, desc: "Secretaria executiva, gestao de agenda." },
  { id: 5, nome: "Mamadou L.", cat: "Motorista", pais: "Angola", prov: "Luanda", rating: 4.7, jobs: 112, verif: true, desc: "Motorista particular, carta profissional." },
  { id: 6, nome: "Rui Mendes", cat: "Canalizador", pais: "Portugal", prov: "Lisboa", rating: 4.9, jobs: 76, verif: true, desc: "Canalizacao, aquecimento, reparos urgentes." },
];

const TIPOS_CONTRATO = [
  "Secretaria Domestica",
  "Motorista Particular",
  "Pedreiro",
  "Carpinteiro",
  "Serralheiro",
  "Eletricista",
  "Canalizador",
  "Pintor",
  "Servicos/Consultoria",
  "Outros",
];

type ContractForm = {
  tipo: string;
  empNome: string;
  empDoc: string;
  empTel: string;
  empEnd: string;
  trabNome: string;
  trabDoc: string;
  trabTel: string;
  trabEnd: string;
  funcao: string;
  local: string;
  dataInicio: string;
  dataFim: string;
  horario: string;
  salario: string;
  formaPag: string;
  mpesa: string;
  obrigacoesEmp: string;
  obrigacoesTrab: string;
  anexos: string[];
  validade: string;
};

export default function App() {
  const [lang, setLang] = useState<keyof typeof TRAD>('pt');
  const [actionTick, setActionTick] = useState<number>(0);
  const t = TRAD[lang];

  const [tab, setTab] = useState<'encontrar' | 'contratos' | 'meus'>('encontrar');

  const handleTab = (newTab: 'encontrar' | 'contratos' | 'meus') => {
    setTab(newTab);
    setActionTick(Date.now());
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
  };
  const handleLang = (l: keyof typeof TRAD) => {
    setLang(l);
    setActionTick(Date.now());
  };

  // ENCONTRAR STATE
  const [search, setSearch] = useState('');
  const [paisFiltro, setPaisFiltro] = useState('Mocambique');
  const [provFiltro, setProvFiltro] = useState('Maputo Cidade');
  const [cadTipo, setCadTipo] = useState<'EMPRESA' | 'INDIVIDUAL' | 'COOPERATIVA'>('INDIVIDUAL');
  const [cadPais, setCadPais] = useState('Mocambique');
  const [cadProv, setCadProv] = useState('Maputo Cidade');
  const [cadNome, setCadNome] = useState('');
  const [cadServ, setCadServ] = useState('Pedreiro');
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const provinciasFiltro = useMemo(() => PAISES[paisFiltro] || [], [paisFiltro]);
  const provinciasCad = useMemo(() => PAISES[cadPais] || [], [cadPais]);

  // auto update provincia when pais changes - filtro
  const handlePaisFiltroChange = (novoPais: string) => {
    setPaisFiltro(novoPais);
    const provs = PAISES[novoPais];
    if (provs && provs.length) setProvFiltro(provs[0]);
  };
  const handleCadPaisChange = (novoPais: string) => {
    setCadPais(novoPais);
    const provs = PAISES[novoPais];
    if (provs && provs.length) setCadProv(provs[0]);
  };

  const profissionaisFiltrados = useMemo(() => {
    return PROFISSIONAIS_MOCK.filter(p => {
      const matchSearch = !search || p.cat.toLowerCase().includes(search.toLowerCase()) || p.nome.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
      const matchPais = !paisFiltro || p.pais === paisFiltro;
      const matchProv = !provFiltro || p.prov === provFiltro || provFiltro === 'Todas' || provFiltro === t.todasProvincias;
      return matchSearch && matchPais && matchProv;
    });
  }, [search, paisFiltro, provFiltro, t.todasProvincias]);

  // CONTRATOS STATE
  const [contractPage, setContractPage] = useState(1);
  const [contractData, setContractData] = useState<ContractForm>({
    tipo: "Secretaria Domestica",
    empNome: "",
    empDoc: "",
    empTel: "",
    empEnd: "",
    trabNome: "",
    trabDoc: "",
    trabTel: "",
    trabEnd: "",
    funcao: "",
    local: "",
    dataInicio: "2025-06-01",
    dataFim: "2026-06-01",
    horario: "07:30 - 16:30 Segunda a Sabado",
    salario: "15000 MZN",
    formaPag: "M-Pesa",
    mpesa: "84xxxxxxx",
    obrigacoesEmp: "Pagar salario ate dia 5, fornecer material, respeitar folgas.",
    obrigacoesTrab: "Cumprir horario, cuidar dos bens, avisar faltas com antecedencia.",
    anexos: ["Foto BI frente", "Foto local trabalho", "Comprovativo M-Pesa"],
    validade: "12 meses",
  });
  const [meusContratos, setMeusContratos] = useState<ContractForm[]>([]);

  const updateContract = (k: keyof ContractForm, v: any) => setContractData(prev => ({ ...prev, [k]: v }));

  const gerarPDF = () => {
    const html = `
      <html><head><title>Contrato ESSE</title>
      <style>
        body{font-family:Arial,sans-serif;padding:32px;color:#222;line-height:1.5}
        .header{background:#2a3f5a;color:#eabf6a;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:8px}
        .logo{font-weight:900;letter-spacing:2px}
        .carimbo{border:3px solid #d4a44a;color:#d4a44a;padding:12px 18px;transform:rotate(-12deg);font-weight:900;display:inline-block;margin-top:20px}
        .clausula{margin:18px 0;border-left:4px solid #3a4f6a;padding-left:12px}
        .label{font-size:10px;color:#666;text-transform:uppercase;letter-spacing:1px}
      </style></head><body>
      <div class="header">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:36px;height:36px;background:#d4a44a;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#2a3f5a;font-weight:900">E</div>
          <div class="logo">ESSE</div>
          <div style="font-size:9px;color:#fff;margin-left:8px">Energy solutions and services enterprise</div>
        </div>
        <div style="font-size:10px;color:#fff">${t.lei}</div>
      </div>
      <h2 style="margin-top:24px">CONTRATO DE PRESTACAO DE SERVICOS - ${contractData.tipo.toUpperCase()}</h2>
      <div class="label">Clausula 1 - Partes</div>
      <div class="clausula"><b>Empregador:</b> ${contractData.empNome} - Doc: ${contractData.empDoc} - Tel: ${contractData.empTel} - End: ${contractData.empEnd}</div>
      <div class="label">Clausula 2 - Trabalhador</div>
      <div class="clausula"><b>Trabalhador:</b> ${contractData.trabNome} - Doc: ${contractData.trabDoc} - Tel: ${contractData.trabTel}</div>
      <div class="label">Clausula 3 - Objecto</div>
      <div class="clausula">${contractData.funcao} em ${contractData.local}</div>
      <div class="label">Clausula 4 - Prazo</div>
      <div class="clausula">De ${contractData.dataInicio} a ${contractData.dataFim} - Horario: ${contractData.horario}</div>
      <div class="label">Clausula 5 - Remuneracao</div>
      <div class="clausula">${contractData.salario} via ${contractData.formaPag} - M-Pesa: ${contractData.mpesa}</div>
      <div class="label">Clausula 6 - Obrigacoes empregador</div>
      <div class="clausula">${contractData.obrigacoesEmp}</div>
      <div class="label">Clausula 7 - Obrigacoes trabalhador</div>
      <div class="clausula">${contractData.obrigacoesTrab}</div>
      <div class="label">Clausula 8 - Anexos</div>
      <div class="clausula">${contractData.anexos.join(', ')}</div>
      <div class="label">Clausula 9 - Validade</div>
      <div class="clausula">${contractData.validade} - ${t.lei}</div>
      <div class="label">Clausula 10 - Assinaturas WhatsApp</div>
      <div class="clausula">Assinado via WhatsApp em ${new Date().toLocaleDateString()} - Fotos e M-Pesa comprovado.</div>
      <div class="label">Clausula 11 - Foro</div>
      <div class="clausula">Foro de ${contractData.local} - Lei aplicavel Mocambique.</div>
      <div class="carimbo">ESSE - CARIMBO OFICIAL - VALIDO</div>
      <p style="margin-top:30px;font-size:10px;color:#666">Documento gerado automaticamente por ESSE Energy solutions and services enterprise - ${new Date().toISOString()}</p>
      </body></html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 400);
    }
  };

  const salvarContrato = () => {
    setMeusContratos(prev => [...prev, { ...contractData }]);
    setTab('meus');
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#1a1a1a]" style={{ paddingTop: 'var(--safe-area-inset-top, 0px)' } as any}>
      <style>{`
        :root{--azul:#3a4f6a;--azul-escuro:#2a3f5a;--dourado:#d4a44a;--dourado-claro:#eabf6a;}
        body{font-family:Arial, Helvetica, sans-serif}
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#2a3f5a] border-b-4 border-[#d4a44a]">
        <div className="max-w-[1280px] mx-auto px-3 md:px-6 h-[72px] flex items-center justify-between gap-2" data-action-tick={actionTick}>
          <div className="flex items-center gap-3">
            <LogoESSE compact />
            <div className="hidden lg:block ml-2">
              <div className="text-[10px] text-white/80 tracking-[0.2em] font-semibold">{t.slogan}</div>
            </div>
          </div>

          <nav className="flex items-center gap-1 md:gap-3">
            <button onClick={() => handleTab('encontrar')} className={`px-2 md:px-4 py-2 text-[11px] md:text-[13px] font-black tracking-widest rounded ${tab==='encontrar' ? 'bg-[#d4a44a] text-[#2a3f5a]' : 'text-white hover:bg-white/10'}`}>{t.encontrar}</button>
            <button onClick={() => handleTab('contratos')} className={`px-2 md:px-4 py-2 text-[11px] md:text-[13px] font-black tracking-widest rounded ${tab==='contratos' ? 'bg-[#d4a44a] text-[#2a3f5a]' : 'text-white hover:bg-white/10'}`}>{t.contratos}</button>
            <button onClick={() => handleTab('meus')} className={`px-2 md:px-4 py-2 text-[11px] md:text-[13px] font-black tracking-widest rounded ${tab==='meus' ? 'bg-[#d4a44a] text-[#2a3f5a]' : 'text-white hover:bg-white/10'}`}>{t.meus} {meusContratos.length>0 && `(${meusContratos.length})`}</button>
          </nav>

          <div className="flex items-center gap-1">
            {(['pt','en','fr'] as const).map(l => (
              <button key={l} onClick={()=>handleLang(l)} className={`w-8 h-8 rounded font-bold text-[12px] border ${lang===l ? 'bg-[#eabf6a] text-[#2a3f5a] border-[#eabf6a]' : 'text-white border-white/30 hover:bg-white/10'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="h-[2px] bg-[#d4a44a]/20">
          <div className="h-full bg-[#d4a44a] transition-all duration-300" style={{ width: `${(actionTick % 100)}%`, opacity: actionTick ? 0.6 : 0 }} />
        </div>
      </header>

      {/* HERO - only on encontrar */}
      {tab === 'encontrar' && (
        <div className="bg-[#2a3f5a] text-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="mb-6"><LogoESSE size="large" /></div>
              <h1 className="text-[28px] md:text-[44px] font-black leading-[0.95] tracking-tight">{t.heroTitle}</h1>
              <p className="mt-4 text-[14px] md:text-[16px] text-white/80 max-w-[560px] leading-relaxed">{t.heroSub}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-[11px]">
                <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">âœ“ {t.clausulas11}</span>
                <span className="px-3 py-1.5 bg-white/10 rounded-full border border-white/20">âœ“ {t.anexos}</span>
                <span className="px-3 py-1.5 bg-[#d4a44a] text-[#2a3f5a] font-bold rounded-full">âœ“ {t.lei}</span>
              </div>
            </div>
            <div className="bg-white rounded-[16px] p-5 md:p-6 text-[#1a1a1a] shadow-xl">
              <div className="text-[12px] font-black tracking-widest text-[#3a4f6a] mb-4">{t.cadastroTitulo}</div>
              <div className="flex gap-2 mb-4">
                {[
                  { id:'EMPRESA', label:t.tipoEmpresa },
                  { id:'INDIVIDUAL', label:t.tipoIndividual },
                  { id:'COOPERATIVA', label:t.tipoCooperativa },
                ].map(opt => (
                  <button key={opt.id} onClick={()=>setCadTipo(opt.id as any)} className={`flex-1 py-2 px-2 text-[9px] font-bold rounded border leading-tight ${cadTipo===opt.id ? 'bg-[#3a4f6a] text-white border-[#3a4f6a]' : 'bg-white text-[#3a4f6a] border-[#3a4f6a]/20'}`}>{opt.label}</button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={cadNome} onChange={e=>setCadNome(e.target.value)} placeholder={t.nome} className="col-span-2 border border-black/10 rounded px-3 py-2.5 text-[13px] outline-none focus:border-[#d4a44a]" />
                <select value={cadPais} onChange={e=>handleCadPaisChange(e.target.value)} className="border border-black/10 rounded px-3 py-2.5 text-[13px] bg-white">
                  {Object.keys(PAISES).map(p=> <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={cadProv} onChange={e=>setCadProv(e.target.value)} className="border border-black/10 rounded px-3 py-2.5 text-[13px] bg-white">
                  {provinciasCad.map(pr=> <option key={pr} value={pr}>{pr}</option>)}
                </select>
                <select value={cadServ} onChange={e=>setCadServ(e.target.value)} className="border border-black/10 rounded px-3 py-2.5 text-[13px] bg-white">
                  {CATEGORIAS.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder={t.telefone} className="border border-black/10 rounded px-3 py-2.5 text-[13px]" />
              </div>
              <div
                onDragOver={e=>{e.preventDefault(); setDragOver(true);}}
                onDragLeave={()=>setDragOver(false)}
                onDrop={e=>{e.preventDefault(); setDragOver(false); const names = Array.from(e.dataTransfer.files).map(f=>f.name); setFiles(prev=>[...prev, ...names]);}}
                onClick={()=>fileInputRef.current?.click()}
                className={`mt-4 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${dragOver ? 'border-[#d4a44a] bg-[#d4a44a]/10' : 'border-black/15 bg-[#f9f6f0]'}`}
              >
                <div className="text-[11px] font-bold text-[#3a4f6a]">{t.anexar}</div>
                <div className="text-[10px] text-black/50 mt-1">{t.arraste} - BI, NUIT, Fotos trabalho</div>
                {files.length>0 && <div className="mt-2 text-[10px] text-left bg-white rounded p-2 border">{files.map((f,i)=><div key={i}>â€¢ {f}</div>)}</div>}
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={e=>{ if(e.target.files){ setFiles(prev=>[...prev, ...Array.from(e.target.files!).map(f=>f.name)]); } }} />
              </div>
              <button onClick={()=>{ if(!cadNome){ alert('Preencha nome'); return; } alert('Cadastro enviado! Em analise.'); setCadNome(''); setFiles([]); }} className="mt-4 w-full bg-[#d4a44a] text-[#2a3f5a] font-black py-3 rounded-lg text-[13px] tracking-widest hover:bg-[#eabf6a] transition">{t.enviar}</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1280px] mx-auto px-3 md:px-6 py-6">
        {/* ENCONTRAR TAB */}
        {tab === 'encontrar' && (
          <>
            {/* BUSCA */}
            <div className="bg-white rounded-[16px] border border-black/10 p-4 md:p-5 shadow-sm">
              <div className="grid md:grid-cols-[1.5fr_0.6fr_0.7fr_auto] gap-3 items-end">
                <div>
                  <label className="text-[10px] font-black tracking-widest text-[#3a4f6a]">{t.oQue}</label>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.buscarPlaceholder} className="mt-1 w-full border border-black/10 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-[#d4a44a]" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest text-[#3a4f6a]">{t.pais}</label>
                  <select value={paisFiltro} onChange={e=>handlePaisFiltroChange(e.target.value)} className="mt-1 w-full border border-black/10 rounded-lg px-3 py-3 text-[14px] bg-white outline-none">
                    {Object.keys(PAISES).map(p=> <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest text-[#3a4f6a]">{t.provincia}</label>
                  <select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="mt-1 w-full border border-black/10 rounded-lg px-3 py-3 text-[14px] bg-white outline-none">
                    {provinciasFiltro.map(pr=> <option key={pr} value={pr}>{pr}</option>)}
                  </select>
                </div>
                <button onClick={()=>{}} className="h-[46px] bg-[#3a4f6a] text-white font-black px-6 rounded-lg text-[13px] tracking-widest hover:bg-[#2a3f5a]">{t.pesquisar}</button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-black/50">{t.tags}</span>
                {CATEGORIAS.slice(0,6).map(cat=> (
                  <button key={cat} onClick={()=>setSearch(cat)} className={`px-3 py-1 rounded-full text-[11px] border font-semibold ${search===cat ? 'bg-[#d4a44a] border-[#d4a44a] text-[#2a3f5a]' : 'bg-[#f6f1e8] border-black/10 hover:border-[#d4a44a]'}`}>{cat}</button>
                ))}
              </div>
              <div className="mt-3 text-[10px] text-black/40">Pais -> Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro.</div>
            </div>

            {/* LISTA */}
            <div className="mt-8">
              <h2 className="text-[14px] font-black tracking-widest text-[#3a4f6a]">{t.verificados} ({profissionaisFiltrados.length})</h2>
              <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {profissionaisFiltrados.map(p=> (
                  <div key={p.id} className="bg-white rounded-[14px] border border-black/10 p-4 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#2a3f5a] text-[#eabf6a] flex items-center justify-center font-black text-[13px]">{p.nome.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                        <div>
                          <div className="font-bold text-[14px] leading-tight">{p.nome}</div>
                          <div className="text-[11px] text-black/60">{p.cat} â€¢ {p.pais} / {p.prov}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-black bg-[#d4a44a]/20 text-[#8a5a1a] px-2 py-1 rounded-full border border-[#d4a44a]/30">{t.verificado} â˜… {p.rating}</span>
                    </div>
                    <div className="mt-3 text-[12px] text-black/70 leading-snug">{p.desc}</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>{ setTab('contratos'); setContractData(d=>({...d, trabNome:p.nome, funcao:p.cat, local:p.prov})); }} className="flex-1 bg-[#3a4f6a] text-white text-[11px] font-black py-2.5 rounded-lg tracking-widest hover:bg-[#2a3f5a]">{t.verContrato}</button>
                      <button onClick={()=>alert('WhatsApp: +258 84xxxxxxx - Contactar '+p.nome)} className="px-4 border border-[#d4a44a] text-[#3a4f6a] text-[11px] font-black rounded-lg">{t.contratar}</button>
                    </div>
                    <div className="mt-2 text-[10px] text-black/40">{p.jobs} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK</div>
                  </div>
                ))}
              </div>
              {profissionaisFiltrados.length===0 && (
                <div className="mt-6 bg-white border border-dashed border-black/20 rounded-xl p-8 text-center text-[13px] text-black/50">Nenhum profissional encontrado para este filtro. Tente mudar Pais/Provincia ou busca.</div>
              )}
            </div>
          </>
        )}

        {/* CONTRATOS 11 TAB - NAO MEXER estrutura */}
        {tab === 'contratos' && (
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* BIBLIOTECA */}
            <div className="bg-white rounded-[16px] border border-black/10 p-4 h-fit">
              <div className="flex items-center gap-2">
                <LogoESSE compact />
              </div>
              <div className="mt-4 text-[11px] font-black tracking-widest text-[#3a4f6a]">{t.biblioteca}</div>
              <div className="mt-3 grid gap-2">
                {TIPOS_CONTRATO.map(tipo=> (
                  <button key={tipo} onClick={()=>{ setContractData(d=>({...d, tipo})); setContractPage(1); }} className={`text-left px-3 py-2.5 rounded-lg border text-[12px] font-semibold ${contractData.tipo===tipo ? 'bg-[#2a3f5a] text-[#eabf6a] border-[#2a3f5a]' : 'bg-[#f9f6f0] border-black/10 hover:border-[#d4a44a]'}`}>{tipo}</button>
                ))}
              </div>
              <div className="mt-4 p-3 bg-[#f6f1e8] rounded-lg border border-[#d4a44a]/30">
                <div className="text-[10px] font-bold text-[#3a4f6a]">11 paginas / clausulas</div>
                <div className="mt-2 grid grid-cols-11 gap-1">
                  {Array.from({length:11}).map((_,i)=>(
                    <div key={i} onClick={()=>setContractPage(i+1)} className={`h-7 rounded flex items-center justify-center text-[10px] font-black cursor-pointer ${contractPage===i+1 ? 'bg-[#d4a44a] text-[#2a3f5a]' : 'bg-white border border-black/10 hover:border-[#d4a44a]'}`}>{i+1}</div>
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-black/50">{t.pag} {contractPage} de 11 - {[
                  t.tipoContrato, t.empregador, t.trabalhador, t.funcao, t.prazo, t.remuneracao, t.obrigacoes, t.anexos, t.validade, t.assinaturas, t.final
                ][contractPage-1]}</div>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="bg-white rounded-[16px] border border-black/10 p-5 md:p-7">
              <div className="flex justify-between items-center">
                <h2 className="text-[16px] font-black text-[#2a3f5a] tracking-tight">CONTRATO - {contractData.tipo.toUpperCase()} - PAGINA {contractPage}/11</h2>
                <span className="text-[10px] px-2 py-1 bg-[#d4a44a] text-[#2a3f5a] font-black rounded">{t.lei}</span>
              </div>

              {/* PAGINAS */}
              <div className="mt-6">
                {contractPage===1 && (
                  <div>
                    <label className="text-[11px] font-black tracking-widest">{t.tipoContrato}</label>
                    <select value={contractData.tipo} onChange={e=>updateContract('tipo', e.target.value)} className="mt-2 w-full border rounded-lg px-4 py-3 text-[14px] bg-white">
                      {TIPOS_CONTRATO.map(tp=> <option key={tp} value={tp}>{tp}</option>)}
                    </select>
                    <p className="mt-3 text-[12px] text-black/60">Modelo com 11 clausulas legais conforme Lei 23/2007. Inclui fotos, M-Pesa comprovado e assinatura WhatsApp.</p>
                  </div>
                )}
                {contractPage===2 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-[12px] font-black text-[#3a4f6a]">CLAUSULA 1 - IDENTIFICACAO EMPREGADOR</div>
                    <input placeholder="Nome empregador" value={contractData.empNome} onChange={e=>updateContract('empNome', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="BI / NUIT" value={contractData.empDoc} onChange={e=>updateContract('empDoc', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Telefone" value={contractData.empTel} onChange={e=>updateContract('empTel', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Endereco" value={contractData.empEnd} onChange={e=>updateContract('empEnd', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                  </div>
                )}
                {contractPage===3 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-[12px] font-black text-[#3a4f6a]">CLAUSULA 2 - IDENTIFICACAO TRABALHADOR</div>
                    <input placeholder="Nome trabalhador" value={contractData.trabNome} onChange={e=>updateContract('trabNome', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="BI / NUIT" value={contractData.trabDoc} onChange={e=>updateContract('trabDoc', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Telefone WhatsApp" value={contractData.trabTel} onChange={e=>updateContract('trabTel', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Endereco" value={contractData.trabEnd} onChange={e=>updateContract('trabEnd', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                  </div>
                )}
                {contractPage===4 && (
                  <div className="grid gap-4">
                    <div className="text-[12px] font-black text-[#3a4f6a]">CLAUSULA 3 e 4 - OBJECTO, FUNCAO E LOCAL</div>
                    <input placeholder="Funcao detalhada" value={contractData.funcao} onChange={e=>updateContract('funcao', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Local de trabalho - ex: Maputo Cidade" value={contractData.local} onChange={e=>updateContract('local', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                  </div>
                )}
                {contractPage===5 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-[12px] font-black text-[#3a4f6a]">CLAUSULA 5 - PRAZO E HORARIO</div>
                    <input type="date" value={contractData.dataInicio} onChange={e=>updateContract('dataInicio', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input type="date" value={contractData.dataFim} onChange={e=>updateContract('dataFim', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <input placeholder="Horario ex: 07:30-16:30 Seg-Sab" value={contractData.horario} onChange={e=>updateContract('horario', e.target.value)} className="md:col-span-2 border rounded-lg px-3 py-2.5 text-[13px]" />
                  </div>
                )}
                {contractPage===6 && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-[12px] font-black text-[#3a4f6a]">CLAUSULA 6 - REMUNERACAO E M-PESA</div>
                    <input placeholder="Salario - ex: 15000 MZN" value={contractData.salario} onChange={e=>updateContract('salario', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <select value={contractData.formaPag} onChange={e=>updateContract('formaPag', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px] bg-white"><option>M-Pesa</option><option>e-Mola</option><option>Transferencia</option><option>Numerario</option></select>
                    <input placeholder="Numero M-Pesa comprovativo" value={contractData.mpesa} onChange={e=>updateContract('mpesa', e.target.value)} className="md:col-span-2 border rounded-lg px-3 py-2.5 text-[13px]" />
                  </div>
                )}
                {contractPage===7 && (
                  <div className="grid gap-4">
                    <div className="text-[12px] font-black text-[#3a4f6a]">CLAUSULA 7 e 8 - OBRIGACOES</div>
                    <textarea placeholder="Obrigacoes empregador" value={contractData.obrigacoesEmp} onChange={e=>updateContract('obrigacoesEmp', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px] h-24" />
                    <textarea placeholder="Obrigacoes trabalhador" value={contractData.obrigacoesTrab} onChange={e=>updateContract('obrigacoesTrab', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px] h-24" />
                  </div>
                )}
                {contractPage===8 && (
                  <div>
                    <div className="text-[12px] font-black text-[#3a4f6a]">CLAUSULA 8 - ANEXOS ANTES VALIDADE (fotos)</div>
                    <p className="text-[11px] text-black/60 mt-1">Adicione fotos do local, BI, comprovativo M-Pesa. Obrigatorio antes da validade.</p>
                    <div className="mt-3 space-y-2">
                      {contractData.anexos.map((an, i)=>(
                        <div key={i} className="flex gap-2">
                          <input value={an} onChange={e=>{ const copy=[...contractData.anexos]; copy[i]=e.target.value; updateContract('anexos', copy); }} className="flex-1 border rounded-lg px-3 py-2 text-[12px]" />
                          <button onClick={()=>{ const copy=contractData.anexos.filter((_,idx)=>idx!==i); updateContract('anexos', copy); }} className="px-2 border rounded text-[11px]">X</button>
                        </div>
                      ))}
                      <button onClick={()=>updateContract('anexos', [...contractData.anexos, 'Novo anexo'])} className="text-[11px] font-bold text-[#3a4f6a] border border-dashed border-[#3a4f6a]/30 rounded-lg px-3 py-2 w-full">+ Adicionar anexo</button>
                    </div>
                  </div>
                )}
                {contractPage===9 && (
                  <div className="grid gap-4">
                    <div className="text-[12px] font-black text-[#3a4f6a]">CLAUSULA 9 e 10 - VALIDADE E LEI</div>
                    <input placeholder="Validade ex: 12 meses" value={contractData.validade} onChange={e=>updateContract('validade', e.target.value)} className="border rounded-lg px-3 py-2.5 text-[13px]" />
                    <div className="p-3 bg-[#f6f1e8] rounded border text-[11px]">Valido em todo Mocambique conforme Lei 23/2007. Foro: {contractData.local || 'Maputo'}. Protege ambas partes.</div>
                  </div>
                )}
                {contractPage===10 && (
                  <div className="grid gap-4">
                    <div className="text-[12px] font-black text-[#3a4f6a]">CLAUSULA 10 e 11 - ASSINATURAS WHATSAPP</div>
                    <div className="p-4 bg-[#e7f3e7] rounded-lg border border-green-200 text-[12px]">
                      <div>Assinatura sera feita via WhatsApp com foto do BI e selfie.</div>
                      <div className="mt-2 font-bold">Empregador: {contractData.empNome || '---'} - {contractData.empTel || 'sem telefone'}</div>
                      <div className="font-bold">Trabalhador: {contractData.trabNome || '---'} - {contractData.trabTel || 'sem telefone'}</div>
                    </div>
                  </div>
                )}
                {contractPage===11 && (
                  <div>
                    <div className="text-[12px] font-black text-[#3a4f6a] mb-3">{t.preview} - {t.clausulas11}</div>
                    <div className="border rounded-xl p-4 bg-[#fdfaf3] text-[12px] leading-relaxed">
                      <div className="flex justify-between items-center border-b pb-3 mb-3">
                        <LogoESSE compact />
                        <span className="text-[10px] font-bold">{t.lei}</span>
                      </div>
                      <div className="font-black">CONTRATO {contractData.tipo.toUpperCase()}</div>
                      <div className="mt-2"><b>1.</b> Empregador: {contractData.empNome} ({contractData.empDoc})</div>
                      <div><b>2.</b> Trabalhador: {contractData.trabNome} ({contractData.trabDoc})</div>
                      <div><b>3.</b> Funcao: {contractData.funcao} - Local: {contractData.local}</div>
                      <div><b>4-5.</b> Prazo: {contractData.dataInicio} a {contractData.dataFim} - {contractData.horario}</div>
                      <div><b>6.</b> Salario: {contractData.salario} via {contractData.formaPag} - {contractData.mpesa}</div>
                      <div><b>7.</b> Obrig Emp: {contractData.obrigacoesEmp}</div>
                      <div><b>8.</b> Obrig Trab: {contractData.obrigacoesTrab}</div>
                      <div><b>9.</b> Anexos: {contractData.anexos.join(', ')}</div>
                      <div><b>10.</b> Validade: {contractData.validade}</div>
                      <div><b>11.</b> Foro {contractData.local} - WhatsApp assinatura</div>
                      <div className="mt-4 inline-block border-2 border-[#d4a44a] text-[#d4a44a] px-4 py-1 font-black rotate-[-8deg]">ESSE CARIMBO OFICIAL</div>
                    </div>
                    <div className="mt-5 flex gap-3">
                      <button onClick={gerarPDF} className="flex-1 bg-[#2a3f5a] text-[#eabf6a] font-black py-3 rounded-lg text-[12px] tracking-widest">{t.gerarPdf}</button>
                      <button onClick={salvarContrato} className="flex-1 bg-[#d4a44a] text-[#2a3f5a] font-black py-3 rounded-lg text-[12px] tracking-widest">{t.salvar}</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button disabled={contractPage===1} onClick={()=>setContractPage(p=>Math.max(1,p-1))} className="px-5 py-2.5 border rounded-lg text-[12px] font-bold disabled:opacity-30">VOLTAR</button>
                <button disabled={contractPage===11} onClick={()=>setContractPage(p=>Math.min(11,p+1))} className="px-5 py-2.5 bg-[#3a4f6a] text-white rounded-lg text-[12px] font-bold disabled:opacity-30">AVANCAR</button>
              </div>
            </div>
          </div>
        )}

        {/* MEUS CONTRATOS */}
        {tab === 'meus' && (
          <div className="bg-white rounded-[16px] border border-black/10 p-6">
            <div className="flex items-center gap-3">
              <LogoESSE compact />
              <h2 className="text-[16px] font-black text-[#2a3f5a]">{t.meusTitulo} ({meusContratos.length})</h2>
            </div>
            {meusContratos.length===0 ? (
              <div className="mt-8 text-center py-12 border border-dashed rounded-xl bg-[#f9f6f0]">
                <div className="text-[13px] text-black/60">{t.nenhum}</div>
                <button onClick={()=>setTab('contratos')} className="mt-4 px-5 py-2 bg-[#3a4f6a] text-white rounded-lg text-[12px] font-bold">IR PARA CONTRATOS 11</button>
              </div>
            ) : (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {meusContratos.map((c,i)=>(
                  <div key={i} className="border rounded-xl p-4 bg-[#fdfaf3]">
                    <div className="flex justify-between">
                      <div className="font-bold text-[13px]">{c.tipo}</div>
                      <span className="text-[10px] bg-[#d4a44a] text-[#2a3f5a] px-2 py-1 rounded-full font-black">ESSE</span>
                    </div>
                    <div className="mt-2 text-[11px] text-black/70">{c.empNome} â†’ {c.trabNome}</div>
                    <div className="text-[11px] text-black/50">{c.local} â€¢ {c.salario} â€¢ {c.validade}</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={gerarPDF} className="flex-1 bg-[#2a3f5a] text-[#eabf6a] text-[11px] font-bold py-2 rounded">PDF COM CARIMBO</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-10 bg-[#2a3f5a] text-white/60 py-6">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="flex items-center gap-3">
            <LogoESSE compact />
            <span className="text-[10px] tracking-widest">Â© 2025 ESSE - Energy solutions and services enterprise - Lei 23/2007</span>
          </div>
          <div className="text-[10px]">COR_AZUL #3a4f6a | COR_DOURADO #d4a44a | Logo SVG inline &lt;2KB | PT EN FR | Paisâ†’Provincia auto</div>
        </div>
      </footer>
    </div>
  );
}
