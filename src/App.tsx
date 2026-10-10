// @ts-nocheck
import { useState, useRef } from "react";

const COR_AZUL = "#2a3f5a";
const COR_DOURADO = "#d4a44a";
const COR_DOURADO_CLARO = "#eabf6a";

type Pagina = 1|2|3|4|5|6|7|8|9|10|11;
type Tab = "encontrar"|"contratos"|"meus";
type Lang = "pt"|"en"|"fr";
type TipoCadastro = "empresa"|"singular"|"cooperativa";
type TipoContrato = "Secretario/a Domestico/a" | "Motorista Particular" | "Pedreiro" | "Carpinteiro" | "Serralheiro" | "Eletricista" | "Canalizador" | "Pintor" | "Servicos/Consultoria" | "Outros/Particular";

function LogoESSE({ size = 36, showText = true }: { size?: number, showText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" style={{ background: COR_AZUL }} title="ESSE">
      <svg width={size} height={size} viewBox="0 0 100 100" className="shrink-0">
        <circle cx="50" cy="50" r="48" fill={COR_DOURADO} />
        <path d="M 50 18 C 50 18 22 48 22 68 C 22 84 34 94 50 94 C 66 94 78 84 78 68 C 78 58 70 48 62 38 C 62 38 74 52 74 68 C 74 80 66 88 56 90 C 52 91 48 87 48 83 C 48 79 51 75 55 73 C 62 69 68 60 68 48 C 68 38 60 28 50 18 Z" fill={COR_AZUL} />
        <path d="M 62 38 C 58 52 52 62 48 72" fill="none" stroke={COR_DOURADO} strokeWidth="2" opacity="0.8" />
      </svg>
      <div className="flex items-center gap-1">
        <div className="flex flex-col gap-[5px]">
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
        </div>
        <div className="flex gap-[3px] ml-1">
          <div className="relative w-[26px] h-[28px]">
            <div className="absolute top-0 left-0 h-[6px] w-[26px] rounded-l-[8px] rounded-r-[1px]" style={{ background: COR_DOURADO_CLARO }} />
            <div className="absolute top-[11px] left-[6px] h-[6px] w-[20px] rounded-[3px]" style={{ background: COR_DOURADO_CLARO }} />
            <div className="absolute bottom-0 left-0 h-[6px] w-[26px] rounded-l-[8px] rounded-r-[1px]" style={{ background: COR_DOURADO_CLARO }} />
            <div className="absolute top-[6px] right-[2px] w-[4px] h-[6px]" style={{ background: COR_DOURADO_CLARO }} />
          </div>
          <div className="relative w-[26px] h-[28px] ml-[2px]">
            <div className="absolute top-0 left-0 h-[6px] w-[26px] rounded-l-[8px] rounded-r-[1px]" style={{ background: COR_DOURADO_CLARO }} />
            <div className="absolute top-[11px] left-[6px] h-[6px] w-[20px] rounded-[3px]" style={{ background: COR_DOURADO_CLARO }} />
            <div className="absolute bottom-0 left-0 h-[6px] w-[26px] rounded-l-[8px] rounded-r-[1px]" style={{ background: COR_DOURADO_CLARO }} />
          </div>
        </div>
        <div className="flex flex-col gap-[5px] ml-1">
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
          <div className="h-[6px] w-[28px] rounded-[1px]" style={{ background: COR_DOURADO_CLARO }} />
        </div>
      </div>
      {showText && (
        <div className="ml-2 leading-none hidden md:block">
          <div className="text-[11px] font-bold tracking-[0.2em] text-white">ESSE</div>
          <div className="text-[7px] tracking-wide text-white/70 -mt-[1px]">Energy solutions and services enterprise</div>
        </div>
      )}
    </div>
  );
}

const TRAD = {
  pt: { encontrar: "ENCONTRAR", contratos: "CONTRATOS 11", meus: "MEUS", slogan: "ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS", projeto: "Um projeto da ESSE - DESBLOQUEADO", heroBadge: "AGORA 11 CLAUSULAS DESBLOQUEADAS", heroTitle: "Chega de acordo de boca! Contrato legal em 2 minutos.", heroSub: "Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.", buscar: "Pesquisar", oque: "O que precisa? Ex: Serralheiro, Mecanico, Domestica", onde: "Onde?" },
  en: { encontrar: "FIND", contratos: "CONTRACTS 11", meus: "MY CONTRACTS", slogan: "FIND. NEGOTIATE. FORMALIZE. 11 CLAUSES", projeto: "A project by ESSE - UNLOCKED", heroBadge: "NOW 11 CLAUSES UNLOCKED", heroTitle: "No more handshake deals! Legal contract in 2 minutes.", heroSub: "Protect your money and work. With photos, M-Pesa proof and WhatsApp signature.", buscar: "Search", oque: "What do you need? Ex: Welder, Mechanic", onde: "Where?" },
  fr: { encontrar: "TROUVER", contratos: "CONTRATS 11", meus: "MES CONTRATS", slogan: "TROUVEZ. NEGOCIEZ. FORMALISEZ. 11 CLAUSES", projeto: "Un projet de ESSE - DEBLOQUE", heroBadge: "MAINTENANT 11 CLAUSES DEBLOQUEES", heroTitle: "Fini les accords verbaux! Contrat legal en 2 minutes.", heroSub: "Protegez votre argent et votre travail.", buscar: "Rechercher", oque: "De quoi avez-vous besoin?", onde: "Ou?" }
};

const PAISES: Record<string, string[]> = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Marracuene","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Manica","Tete","Zambezia","Nampula","Cabo Delgado","Niassa"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KwaZulu-Natal - Durban","Eastern Cape","Limpopo","Mpumalanga"],
  "Portugal": ["Lisboa","Porto","Braga","Coimbra","Faro","Aveiro","Setubal"],
  "Brasil": ["Sao Paulo - SP","Rio de Janeiro - RJ","Minas Gerais - MG","Bahia - BA","Parana - PR","Rio Grande do Sul - RS"],
  "Angola": ["Luanda","Benguela","Huila - Lubango","Cabinda","Huambo"],
  "France": ["Ile-de-France - Paris","Provence - Marseille","Auvergne-Rhone-Alpes - Lyon"],
  "USA": ["California","Texas","Florida","New York","Illinois"],
  "India": ["Maharashtra - Mumbai","Delhi","Karnataka - Bangalore"]
};

const MODELOS: any = {
  "Secretario/a Domestico/a": { titulo: "CONTRATO DOMESTICO", checklist: ["Limpeza geral da casa","Lavar louca e organizar cozinha","Arrumar quartos e fazer camas","Lavar, passar, dobrar roupa","Cozinhar cafe, almoco e jantar","Cuidar das criancas quando solicitado","Manter banheiros limpos"], desc: "Domestico" },
  "Motorista Particular": { titulo: "CONTRATO MOTORISTA", checklist: ["Conduzir com seguranca","Levar e buscar criancas na escola","Manutencao basica oleo pneu","Abastecer e controlar consumo","Cumprir horario rigorosamente","Guardar sigilo da familia"], desc: "Motorista" },
  "Pedreiro": { titulo: "CONTRATO PEDREIRO", checklist: ["Alvenaria de blocos","Reboco interior e exterior","Assentar tijoleira com nivel","Fundacoes e pilares","Fazer cinta e laje"], desc: "Pedreiro" },
  "Carpinteiro": { titulo: "CONTRATO CARPINTEIRO", checklist: ["Fabricar moveis madeira/MDF","Instalar portas","Instalar janelas e batentes","Fabricar armarios"], desc: "Carpinteiro" },
  "Serralheiro": { titulo: "CONTRATO SERRALHEIRO", checklist: ["Fabricar portoes de correr","Fabricar grades e janelas","Soldar estruturas metalicas","Instalar portoes"], desc: "Serralheiro" },
  "Eletricista": { titulo: "CONTRATO ELETRICISTA", checklist: ["Instalar quadro eletrico","Instalar tomadas","Instalar iluminacao","Passar cabos em tubo"], desc: "Eletricista" },
  "Canalizador": { titulo: "CONTRATO CANALIZADOR", checklist: ["Instalar canos agua fria e quente","Instalar esgotos","Instalar sanita e lavatorio"], desc: "Canalizador" },
  "Pintor": { titulo: "CONTRATO PINTOR", checklist: ["Preparar parede lixar massa","Pintura interior 2 demaos","Pintura exterior impermeavel"], desc: "Pintor" },
  "Servicos/Consultoria": { titulo: "CONTRATO SERVICOS", checklist: ["Consultoria empresarial","Servicos administrativos","Marketing digital"], desc: "Servicos" },
  "Outros/Particular": { titulo: "CONTRATO OUTROS", checklist: ["Descrever servico","Definir material","Definir prazo"], desc: "Outros" },
};

const CATEGORIAS = ["Carpintaria","Mecanica Auto","Empreiteiro","Eletricista","Serralheiro","Canalizacao","Pintor","Pedreiro","Motorista","Domestica","Baba","Jardineiro","Frio AC","Informatica"];
const PROFISSIONAIS = [
  { ini:"ML", nome:"Maria Langa", func:"Empregada Domestica", cat:"Domestico", local:"Maputo - Polana", provincia:"Maputo Cidade", pais:"Mocambique", tipo:"singular", nota:"4.9", trab:"23", preco:7500, disp:"Disponivel" },
  { ini:"JM", nome:"Joao Carpintaria", func:"Carpinteiro", cat:"Construcao", local:"Matola - Machava", provincia:"Matola", pais:"Mocambique", tipo:"empresa", nota:"4.8", trab:"34", preco:800, disp:"Disponivel" },
  { ini:"EC", nome:"Esperanca Cossa", func:"Eletricista", cat:"Construcao", local:"Maputo", provincia:"Maputo Cidade", pais:"Mocambique", tipo:"singular", nota:"4.9", trab:"41", preco:650, disp:"Disponivel" },
  { ini:"CT", nome:"Carlos Tivane Motorista", func:"Motorista", cat:"Domestico", local:"Matola - Liberdade", provincia:"Matola", pais:"Mocambique", tipo:"singular", nota:"4.8", trab:"29", preco:1200, disp:"Disponivel" },
  { ini:"MB", nome:"Mecanica Boane Lda", func:"Mecanica Auto", cat:"Mecanica", local:"Boane", provincia:"Boane", pais:"Mocambique", tipo:"empresa", nota:"4.9", trab:"96", preco:900, disp:"Disponivel" },
];

export default function App(){
  const [lang,setLang]=useState<Lang>("pt");
  const [tab,setTab]=useState<Tab>("encontrar");
  const [tipo,setTipo]=useState<TipoContrato>("Motorista Particular");
  const [tarefasSel,setTarefasSel]=useState<string[]>(MODELOS["Motorista Particular"].checklist.slice(0,4));
  const [pagina,setPagina]=useState<Pagina>(1);
  const [anexos,setAnexos]=useState<any[]>([]);
  const [busca,setBusca]=useState("");
  const [paisSel,setPaisSel]=useState("Mocambique");
  const [provSel,setProvSel]=useState("");
  const [tipoCadastro,setTipoCadastro]=useState<TipoCadastro>("singular");
  const [formCadastro,setFormCadastro]=useState({ nome:"", bi:"", tel:"", pais:"Mocambique", provincia:"Matola", bairro:"", categoria:"Carpintaria", desc:"", preco:"" });
  const [form,setForm]=useState({ empNome:"artur simao zimba", empBI:"110200011B", trabNome:"anastancio", trabTel:"840532899", valor:"7500", diaPagamento:"05", local:"xai xai" });
  const formRef = useRef<HTMLDivElement>(null);
  const t = (TRAD as any)[lang];
  const provinciasDoPais = (PAISES as any)[paisSel] || PAISES["Mocambique"];
  const filtrados = PROFISSIONAIS.filter((p:any)=>{ const b = !busca || p.func.toLowerCase().includes(busca.toLowerCase()) || p.nome.toLowerCase().includes(busca.toLowerCase()); const pr = !provSel || p.provincia.includes(provSel); const pa = !paisSel || p.pais===paisSel; return b && pr && pa; });

  const handleFiles=(files:FileList|null)=>{ if(!files) return; const n=Array.from(files).slice(0,3).map((f:any)=>({id:Math.random().toString(36).slice(2),nome:f.name,tamanho:(f.size/1024).toFixed(1)+" KB"})); setAnexos(p=>[...p,...n].slice(0,5)); };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-zinc-800">
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-[1600px] px-4 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden"><LogoESSE size={40} showText={false} /></div>
            <div><div className="font-bold text-[14px] leading-none">CONTRATA.MZ</div><div className="text-[10px] text-zinc-500">{t.slogan}</div><div className="text-[9px] text-zinc-400 font-bold">{t.projeto}</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block"><LogoESSE size={44} showText={true} /></div>
            <div className="flex p-1 bg-zinc-100 rounded-lg ml-2">
              <button onClick={()=>setLang("pt")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="pt"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>PT</button>
              <button onClick={()=>setLang("en")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="en"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>EN</button>
              <button onClick={()=>setLang("fr")} className={`px-2 py-1 rounded-md text-[11px] font-bold ${lang==="fr"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>FR</button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 pt-4">
        <div className="bg-gradient-to-r from-[#0033a0] via-[#2a3d55] to-[#3a4f6a] text-white rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 shadow-xl">
          <div><div className="inline-flex bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold">{t.heroBadge}</div><div className="text-[20px] font-extrabold mt-2 max-w-[700px]">{t.heroTitle}</div><div className="text-[13px] text-white/90 mt-2 max-w-[700px]">{t.heroSub}</div></div>
          <div className="bg-white text-[#0f172a] rounded-xl p-4 min-w-[300px]"><div className="text-[11px] font-extrabold text-[#0033a0]">CONTRATO 11 CLAUSULAS</div><div className="mt-2 text-[12px] space-y-1"><div>âœ“ Contrato que vale no tribunal</div><div>âœ“ Recibo M-Pesa automatico</div><div>âœ“ Fotos viram prova legal</div><div className="font-bold">âœ“ WhatsApp na hora</div></div><div className="mt-3 p-2 bg-[#fff8ed] border border-[#d4a44a]/30 rounded-lg text-[10px] text-center font-bold">+ de 1.200 contratos em Gaza</div></div>
        </div>

        <div className="mt-4 flex gap-2 p-1 bg-white border rounded-xl w-fit">
          <button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="encontrar"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>{t.encontrar}</button>
          <button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="contratos"?"bg-[#2a3d55] text-white":"text-zinc-600"}`}>{t.contratos}</button>
          <button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${tab==="meus"?"bg-[#3a4f6a] text-white":"text-zinc-600"}`}>{t.meus}</button>
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] px-4 py-6">
        {tab==="encontrar" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl p-5">
              <div className="font-bold text-[16px]">Encontra o mestre certo na tua zona</div>
              <div className="text-[13px] text-zinc-600 mt-1">Mecanicos, eletricistas, domesticas, motoristas, pedreiros - contacto direto</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_180px_200px_120px] gap-3">
                <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder={t.oque} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]" />
                <select value={paisSel} onChange={e=>{setPaisSel(e.target.value); setProvSel("");}} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]"><option value="">Pais</option>{Object.keys(PAISES).map(p=><option key={p} value={p}>{p}</option>)}</select>
                <select value={provSel} onChange={e=>setProvSel(e.target.value)} className="w-full h-11 px-3 border-2 rounded-xl text-[13px]"><option value="">Provincia / Estado ({provinciasDoPais.length})</option>{provinciasDoPais.map((p:string)=><option key={p} value={p}>{p}</option>)}</select>
                <button className="h-11 bg-[#3a4f6a] text-white rounded-xl font-bold">{t.buscar}</button>
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">Seleciona Pais -&gt; Provincias aparecem automaticamente. Funciona em todo mundo.</div>
            </div>

            <div className="bg-[#0f172a] text-white rounded-xl p-6">
              <div className="font-bold text-[18px]">Cadastra-te como prestador e seja encontrado hoje</div>
              <div className="text-[12px] text-white/70 mt-1">Carpintaria, mecanica, empreiteiro, mecanico viaturas, eletricista, serralheiro, domestica, motorista</div>
              <div className="mt-5 bg-white text-zinc-800 rounded-xl p-5">
                <div className="text-[11px] font-bold uppercase">Tipo de cadastro *</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button onClick={()=>setTipoCadastro("empresa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="empresa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">EMPRESA</div><div className="text-[11px] text-zinc-600">Micro, Pequena - Carpintaria, Mecanica, Empreiteiro</div></button>
                  <button onClick={()=>setTipoCadastro("singular")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="singular"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">PROFISSIONAL INDIVIDUAL / SINGULAR</div><div className="text-[11px] text-zinc-600">Freelancer - Mecanico, Eletricista, Domestica, Motorista</div></button>
                  <button onClick={()=>setTipoCadastro("cooperativa")} className={`p-4 rounded-xl border-2 text-left ${tipoCadastro==="cooperativa"?"border-[#d4a44a] bg-[#fff8ed]":"bg-white"}`}><div className="font-bold text-[13px]">COOPERATIVA / ASSOCIACAO</div><div className="text-[11px] text-zinc-600">Equipa organizada</div></button>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className="text-[11px] font-bold">Nome *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold">BI *</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro,bi:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold">Provincia / Estado * - muda automatico</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{(PAISES as any)[formCadastro.pais]?.map((p:string)=><option key={p}>{p}</option>)}</select></div>
                  <div><label className="text-[11px] font-bold">Telefone *</label><input value={formCadastro.tel} onChange={e=>setFormCadastro({...formCadastro,tel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]" /></div>
                  <div><label className="text-[11px] font-bold">Categoria *</label><select value={formCadastro.categoria} onChange={e=>setFormCadastro({...formCadastro,categoria:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[13px]">{CATEGORIAS.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="mt-4">
                  <label className="text-[11px] font-bold">Anexar documentos - BI, certificado, carta conducao, fotos trabalhos, alvara</label>
                  <label className="mt-2 w-full min-h-[80px] border-2 border-dashed border-[#d4a44a] rounded-xl grid place-items-center p-4 cursor-pointer bg-[#fff8ed]"><input type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e=>{ if(!e.target.files) return; const n=Array.from(e.target.files).map((f:any)=>({id:Math.random().toString(36).slice(2),nome:f.name})); setAnexos(p=>[...p,...n]); }} /><div className="text-center"><div className="font-bold text-[13px]">Clique para anexar documentos</div><div className="text-[11px] text-zinc-500">JPG, PNG, PDF</div></div></label>
                </div>
                <button className="mt-5 w-full h-12 bg-[#3a4f6a] text-white rounded-xl font-bold">Cadastrar e aparecer no ENCONTRAR - {tipoCadastro.toUpperCase()}</button>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <div className="font-bold">Profissionais verificados - {filtrados.length} encontrados</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtrados.map((p:any)=><div key={p.ini+p.nome} className="border-2 rounded-xl p-4"><div className="flex gap-3"><div className="w-12 h-12 rounded-full bg-[#3a4f6a] text-white grid place-items-center font-bold">{p.foto}</div><div><div className="font-bold text-[13px]">{p.nome}</div><div className="text-[11px] text-zinc-600">{p.func} - {p.pais}</div><div className="text-[11px]">â­ {p.nota} - {p.local}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2"><button className="h-8 rounded-lg border font-bold text-[11px]">Ver Perfil</button><button className="h-8 rounded-lg bg-[#25D366] text-white font-bold text-[11px]">WhatsApp</button></div></div>)}
              </div>
            </div>
          </div>
        )}

        {tab==="contratos" && (
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
            <div className="bg-white border rounded-xl p-3 h-fit">
              <div className="font-bold text-[13px]">Biblioteca 10+ tipos</div>
              <div className="mt-3 space-y-2">{Object.keys(MODELOS).map((t:any)=>{const ativo=tipo===t; return <button key={t} onClick={()=>{setTipo(t); setTarefasSel(MODELOS[t].checklist.slice(0,4)); setPagina(1);}} className={`w-full text-left p-3 rounded-xl border ${ativo?"bg-[#fff8ed] border-[#d4a44a]":"bg-white"}`}><div className="font-medium text-[12px]">{t}</div><div className="text-[10px] text-zinc-500">{MODELOS[t].desc}</div></button>})}</div>
            </div>
            <div ref={formRef} className="bg-white border rounded-xl p-5">
              <div className="font-bold">Clausula {pagina} - {tipo} - {MODELOS[tipo].checklist.length} tarefas</div>
              <div className="mt-4 flex flex-wrap gap-2">{MODELOS[tipo].checklist.map((c:string)=>{const ativo=tarefasSel.includes(c); return <button key={c} onClick={()=>setTarefasSel(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c])} className={`px-3 py-2 rounded-full text-[12px] border ${ativo?"bg-[#3a4f6a] text-white":"bg-white"}`}>{c}</button>})}</div>
              <div className="mt-6 grid grid-cols-2 gap-3"><div><label className="text-[11px] font-bold">Nome Contratante</label><input value={form.empNome} onChange={e=>setForm({...form,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div><div><label className="text-[11px] font-bold">Nome Profissional</label><input value={form.trabNome} onChange={e=>setForm({...form,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg" /></div></div>
              <div className="mt-4 flex gap-2"><button onClick={()=>setPagina(Math.max(1,pagina-1) as Pagina)} className="flex-1 h-11 border-2 rounded-xl">Voltar</button><button onClick={()=>setPagina(Math.min(11,pagina+1) as Pagina)} className="flex-1 h-11 bg-[#2a3d55] text-white rounded-xl">Proximo {pagina}/11</button></div>
              <div className="mt-4 p-3 bg-[#f8fafc] border rounded-xl text-[11px] font-mono">CONTRATO {tipo.toUpperCase()} - {form.empNome} / {form.trabNome} - {form.valor} MT - {tarefasSel.length} tarefas</div>
              <div className="mt-4 grid grid-cols-2 gap-3"><button className="h-12 bg-[#3a4f6a] text-white rounded-xl font-bold">FREE PDF + WhatsApp</button><button className="h-12 bg-[#2a3d55] text-white rounded-xl font-bold">PAGO 200MT</button></div>
            </div>
          </div>
        )}

        {tab==="meus" && <div className="bg-white border rounded-xl p-6 text-center py-20"><div className="font-bold">MEUS CONTRATOS</div><div className="text-[12px] text-zinc-500 mt-2">Historico 1.200+ contratos</div></div>}
      </main>

      <footer className="mt-10 bg-[#0f172a] text-white py-6"><div className="mx-auto max-w-[1600px] px-4 flex items-center gap-3"><LogoESSE size={36} showText={true} /><div className="ml-2"><div className="font-bold text-[13px]">ESSE - ENERGY SOLUTIONS & SERVICES - 11 CLAUSULAS DESBLOQUEADAS</div><div className="text-[11px] text-white/60">NUIT 401 866 876 - Xai-Xai</div></div></div></footer>
    </div>
  );
}
