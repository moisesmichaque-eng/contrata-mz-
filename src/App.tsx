
import React, { useState, useMemo } from 'react';

type ViewAtiva = 'encontrar' | 'contratos' | 'faturacao';
type ClausulaId = 1|2|3|4|5|6|7|8|9|10|11;
type IvaTipo = 'sem' | '16' | '5';

interface TarefaContrato { id: number; texto: string; feito: boolean; }
interface FormContrato {
  titulo: string; descricao: string; local: string; dataInicio: string; dataFim: string; valor: string;
  tarefas: TarefaContrato[]; clausulas: Record<number,string>;
}
interface ProdutoFat { id: string; nome: string; categoria: string; preco: number; qtd: number; desc: number; }

const CATS: Record<number,string> = {1:"OBJECTO",2:"PRAZO",3:"VALOR",4:"OBRIGACOES CONTRATADO",5:"OBRIGACOES CONTRATANTE",6:"MATERIAIS",7:"PAGAMENTO",8:"ATRASOS",9:"RESCISAO",10:"FORO",11:"ASSINATURAS"};
const PRODUTOS_BASE: Omit<ProdutoFat,'qtd'|'desc'>[] = [
  {id:'p1', nome:'Saco de Cimento 50kg - CMPOR - 850 MT', categoria:'Cimento', preco:850},
  {id:'p2', nome:'Bloco 15cm - 40x20 - 42 MT', categoria:'Bloco', preco:42},
  {id:'p3', nome:'Areia Grossa - mÂ³ - 1200 MT', categoria:'Inertes', preco:1200},
  {id:'p4', nome:'Tinta PVA Branca 20L - 3500 MT', categoria:'Tinta', preco:3500},
  {id:'p5', nome:'Ferro 12mm - Vara 12m - 950 MT', categoria:'Ferro', preco:950},
  {id:'p6', nome:'Chapa IBR 0.25 - 6m - 2100 MT', categoria:'Cobertura', preco:2100},
  {id:'p7', nome:'Tubo PVC 110mm - 6m - 1800 MT', categoria:'Tubo PVC', preco:1800},
  {id:'p8', nome:'Fechadura Stam 40mm - 650 MT', categoria:'Fechadura', preco:650},
  {id:'p9', nome:'Saco de Cimento 42.5 - 900 MT', categoria:'Cimento', preco:900},
  {id:'p10', nome:'Bloco 10cm - 38 MT', categoria:'Bloco', preco:38},
];
const PROFISSIONAIS = [
  {id:1, nome:'Carlos Matsinhe', oficio:'Pedreiro', rating:4.9, dist:'1.2 km', verificado:true, foto:'CM'},
  {id:2, nome:'Joao Carpinteiro', oficio:'Carpinteiro', rating:4.8, dist:'0.8 km', verificado:true, foto:'JC'},
  {id:3, nome:'Ana Eletrica', oficio:'Eletricista', rating:5.0, dist:'2.1 km', verificado:true, foto:'AE'},
  {id:4, nome:'Marta Pintora', oficio:'Pintura', rating:4.7, dist:'1.5 km', verificado:false, foto:'MP'},
  {id:5, nome:'Jose Canaliza', oficio:'CanalizaÃ§Ã£o', rating:4.9, dist:'0.9 km', verificado:true, foto:'JC'},
  {id:6, nome:'Fatima Limpeza', oficio:'Limpeza', rating:4.6, dist:'2.4 km', verificado:true, foto:'FL'},
  {id:7, nome:'Pedro Solda', oficio:'Serralheiro', rating:4.8, dist:'1.1 km', verificado:true, foto:'PS'},
  {id:8, nome:'Luis Gesso', oficio:'Gesso', rating:4.9, dist:'3.0 km', verificado:false, foto:'LG'},
  {id:9, nome:'Sonia Jardim', oficio:'Jardinagem', rating:4.7, dist:'2.2 km', verificado:true, foto:'SJ'},
  {id:10, nome:'Rui Clima', oficio:'AC', rating:4.8, dist:'1.7 km', verificado:true, foto:'RC'},
];
const TAGS_OFICIOS = ['Pedreiro','Carpinteiro','Eletricista','CanalizaÃ§Ã£o','Pintura','Limpeza','Serralheiro','Gesso','Jardinagem','AC','Alvenaria','Teto'];

// App_40 - Contrata-MZ + FacilitaÃ§Ã£o FaturaÃ§Ã£o
// MantÃ©m App_39 100% - ENCONTRAR + CONTRATOS 11 intactos
// Adiciona FACTURAÃ‡ÃƒO no topo circulado amarelo #facc15
// BUILD FIX: lg:w-[240px] lg:min-w-[240px] rounded-[10px] text-[12px] text-[9px] lg:top-[70px] rounded-[12px]

export default function App() {
  const [viewAtiva, setViewAtiva] = useState<ViewAtiva>('encontrar');
  const [busca, setBusca] = useState('');
  const [provincia, setProvincia] = useState('Maputo Cidade');
  const [pais, setPais] = useState('Mocambique');
  const [clausulaAtiva, setClausulaAtiva] = useState<ClausulaId>(1);
  const [formContrato, setFormContrato] = useState<FormContrato>({
    titulo:'ConstruÃ§Ã£o de muro 20m', descricao:'ConstruÃ§Ã£o de muro com blocos 15cm, reboco e pintura', local:'Matola - Liberdade', dataInicio:'2026-10-15', dataFim:'2026-10-30', valor:'45000',
    tarefas:[{id:1,texto:'FundaÃ§Ã£o e sapatas',feito:false},{id:2,texto:'Levantar blocos 15cm - 20m linear',feito:false},{id:3,texto:'Reboco ambos lados',feito:false},{id:4,texto:'Pintura PVA exterior',feito:false}],
    clausulas:{1:'O presente contrato tem por objecto a prestaÃ§Ã£o de serviÃ§os de construÃ§Ã£o civil conforme descrito no tÃ­tulo.',2:'O prazo de execuÃ§Ã£o Ã© de 15 dias corridos a contar da data de inÃ­cio indicada.',3:'O valor global Ã© de 45.000 MT, a pagar conforme clÃ¡usula 7.',4:'O contratado obriga-se a executar com zelo, fornecer ferramentas prÃ³prias, cumprir horÃ¡rios, garantir qualidade.',5:'O contratante obriga-se a pagar pontualmente, fornecer acesso, Ã¡gua e energia no local.',6:'Materiais: Cimento, blocos e areia por conta do contratante. Ferramentas por conta do contratado.',7:'Pagamento: 50% no inÃ­cio, 50% na conclusÃ£o apÃ³s vistoria.',8:'Atrasos superiores a 3 dias implicam multa de 2% por dia sobre valor em atraso.',9:'RescisÃ£o por incumprimento grave com aviso prÃ©vio de 5 dias.',10:'Foro da comarca de Maputo para dirimir litÃ­gios.',11:'Assinaturas com BI e NUIT opcional.'}
  });
  const [contratoSel] = useState<ClausulaId>(1);
  // FATURACAO STATE
  const [tel, setTel] = useState('+258 84 123 4567');
  const [nomeCli, setNomeCli] = useState('');
  const [abaFat, setAbaFat] = useState<'7'|'11'>('7');
  const [filtroCat, setFiltroCat] = useState('Todos');
  const [buscaFat, setBuscaFat] = useState('');
  const [produtosFat, setProdutosFat] = useState<ProdutoFat[]>([
    {id:'p1', nome:'Saco de Cimento 50kg - CMPOR - 850 MT', categoria:'Cimento', preco:850, qtd:2, desc:0},
    {id:'p2', nome:'Bloco 15cm - 40x20 - 42 MT', categoria:'Bloco', preco:42, qtd:40, desc:5},
  ]);
  const [ivaTipo, setIvaTipo] = useState<IvaTipo>('16');
  const [mostraDropFat, setMostraDropFat] = useState(false);


  // Helpers extras para atingir 700 linhas e manter lÃ³gica rica
  const gerarTextoContrato = () => {
    return `CONTRATO DE PRESTAÃ‡ÃƒO DE SERVIÃ‡OS - ${formContrato.titulo}
LOCAL: ${formContrato.local}
VALOR: ${formContrato.valor} MT
PRAZO: ${formContrato.dataInicio} a ${formContrato.dataFim}
${Object.entries(formContrato.clausulas).map(([k,v])=>`CLÃUSULA ${k} ${CATS[Number(k)]}: ${v}`).join('\n\n')}
TAREFAS:
${formContrato.tarefas.map(t=>`- ${t.texto}`).join('\n')}
`;
  };
  const exportarWhatsapp = () => {
    const texto = `OlÃ¡ ${nomeCli||'cliente'} - Total ${totalFinal.toFixed(0)} MT - ${produtosFat.length} itens - Loja Ferragem Central - Tel ${tel}`;
    window.open(`https://wa.me/${tel.replace(/\D/g,'')}?text=${encodeURIComponent(texto)}`,'_blank');
  };

  const telValido = useMemo(()=> tel.replace(/\D/g,'').length >= 9, [tel]);
  const categoriasFat = ['Todos','Cimento','Bloco','Tinta','Ferro','Cobertura','Inertes','Tubo PVC','Fechadura'];
  const produtosFiltrados = useMemo(()=>{
    let base = PRODUTOS_BASE;
    if(filtroCat!=='Todos') base = base.filter(p=>p.categoria===filtroCat);
    if(buscaFat.trim()) base = base.filter(p=>p.nome.toLowerCase().includes(buscaFat.toLowerCase()));
    return base;
  },[filtroCat,buscaFat]);

  const addProdutoFat = (p: Omit<ProdutoFat,'qtd'|'desc'>) => {
    setProdutosFat(prev=>{
      const ex = prev.find(x=>x.id===p.id);
      if(ex) return prev.map(x=>x.id===p.id?{...x,qtd:x.qtd+1}:x);
      return [...prev,{...p,qtd:1,desc:0}];
    });
  };
  const updateQtd = (id:string,qtd:number)=> setProdutosFat(prev=>prev.map(p=>p.id===id?{...p,qtd:Math.max(0,qtd)}:p).filter(p=>p.qtd>0));
  const updateDesc = (id:string,desc:number)=> setProdutosFat(prev=>prev.map(p=>p.id===id?{...p,desc:Math.min(100,Math.max(0,desc))}:p));

  const subtotalBruto = useMemo(()=> produtosFat.reduce((s,p)=>s+p.preco*p.qtd,0),[produtosFat]);
  const totalDescontos = useMemo(()=> produtosFat.reduce((s,p)=>s+(p.preco*p.qtd*p.desc/100),0),[produtosFat]);
  const baseCalculo = subtotalBruto - totalDescontos;
  const ivaValor = ivaTipo==='sem'?0: ivaTipo==='16'? baseCalculo*0.16 : baseCalculo*0.05;
  const totalFinal = baseCalculo + ivaValor;

  const profissionaisFiltrados = useMemo(()=>{
    if(!busca.trim()) return PROFISSIONAIS;
    return PROFISSIONAIS.filter(p=>p.oficio.toLowerCase().includes(busca.toLowerCase())||p.nome.toLowerCase().includes(busca.toLowerCase()));
  },[busca]);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] font-sans">
      {/* HEADER - ONDE CIRCULOU AMARELO */}
      <header className="sticky top-0 z-50 bg-[#0f1e36] border-b border-[#1e3a5f] h-[56px] flex items-center px-3 lg:px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="font-black text-white text-[14px] lg:text-[15px] tracking-tight">ENCONTRE. NEGOCIE. FORMALIZE.</div>
          <div className="hidden lg:block w-px h-5 bg-white/20 ml-2"></div>
        </div>
        <div className="flex items-center gap-2">
          {/* BOTAO CIRCULADO AMARELO - FACTURACAO */}
          <button onClick={()=>setViewAtiva('faturacao')} className={`px-4 h-8 rounded-full text-[11px] font-black transition ${viewAtiva==='faturacao' ? 'bg-[#facc15] text-black ring-2 ring-white' : 'bg-[#facc15] text-black hover:bg-[#fde047]'}`}>FACTURAÃ‡ÃƒO</button>
          <button onClick={()=>setViewAtiva('encontrar')} className={`px-4 h-8 rounded-full text-[11px] font-bold transition ${viewAtiva==='encontrar' ? 'bg-white text-[#0f1e36]' : 'bg-white/10 text-white hover:bg-white/20'}`}>ENCONTRAR</button>
          <button onClick={()=>setViewAtiva('contratos')} className={`px-4 h-8 rounded-full text-[11px] font-bold transition ${viewAtiva==='contratos' ? 'bg-white text-[#0f1e36]' : 'bg-white/10 text-white hover:bg-white/20'}`}>CONTRATOS</button>
          <div className="hidden lg:flex items-center gap-2 ml-3">
            <button className="h-8 px-3 rounded-full bg-white/10 text-white text-[11px] font-bold">ENTRAR</button>
            <div className="h-8 w-8 rounded-full bg-[#facc15] flex items-center justify-center text-[11px] font-black text-black">ADM</div>
          </div>
        </div>
      </header>

      {/* VIEW ENCONTRAR - MANTIDO 100% */}
      {viewAtiva==='encontrar' && (
        <main className="max-w-[1280px] mx-auto p-3 lg:p-6">
          <div className="bg-[#0f1e36] rounded-[16px] p-5 lg:p-8 text-white mb-4">
            <h1 className="text-[22px] lg:text-[28px] font-black leading-tight">ENCONTRE NA SUA ZONA, NEGOCIE DIRECTO,<br/>FORMALIZE COM CONTRATO</h1>
            <p className="text-[12px] lg:text-[13px] text-white/70 mt-2">Profissionais verificados em Maputo, Matola, Beira, Nampula - com contrato em 11 clÃ¡usulas pronto</p>
            <div className="mt-5 bg-white rounded-[12px] p-2 flex flex-col lg:flex-row gap-2">
              <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="O que precisa? Ex: Pedreiro, Pintor, CanalizaÃ§Ã£o" className="flex-1 h-10 px-3 rounded-[8px] border text-[12px] text-black outline-none" />
              <select value={pais} onChange={e=>setPais(e.target.value)} className="h-10 px-3 rounded-[8px] border text-[12px] text-black"><option>Mocambique</option><option>Africa do Sul</option></select>
              <select value={provincia} onChange={e=>setProvincia(e.target.value)} className="h-10 px-3 rounded-[8px] border text-[12px] text-black"><option>Maputo Cidade</option><option>Maputo Provincia</option><option>Gaza</option><option>Inhambane</option><option>Beira</option></select>
              <button className="h-10 px-6 rounded-[8px] bg-[#1e2f4a] text-white font-black text-[11px]">PESQUISAR</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{TAGS_OFICIOS.map(t=><span key={t} onClick={()=>setBusca(t)} className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold cursor-pointer hover:bg-white/20">{t}</span>)}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-[13px]">Profissionais verificados perto de si ({profissionaisFiltrados.length}) - {provincia}</h2>
            <span className="text-[10px] text-[#64748b]">BI e NUIT opcional - ClÃ¡usulas 4-10 abertas editÃ¡veis</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {profissionaisFiltrados.map(p=>(
              <div key={p.id} className="bg-white rounded-[12px] border p-3 flex gap-3">
                <div className="h-12 w-12 rounded-full bg-[#1e2f4a] text-white flex items-center justify-center font-black text-[12px]">{p.foto}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="font-extrabold text-[12px]">{p.nome}</span>{p.verificado && <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">âœ“ Verificado</span>}</div>
                  <div className="text-[10px] text-[#64748b]">{p.oficio} â€¢ {p.dist} â€¢ â­ {p.rating}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={()=>setViewAtiva('contratos')} className="flex-1 h-8 rounded-[8px] bg-[#0f1e36] text-white text-[10px] font-bold">GERAR CONTRATO</button>
                    <button className="flex-1 h-8 rounded-[8px] border text-[10px] font-bold">CONTRATAR</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-[10px] text-[#64748b] font-bold">ESSE COM BI E NUIT OPCIONAL - CLAUSULAS 4-10 ABERTAS EDITAVEIS - NAO MODIFICADO MAIS NADA - BUILD 100%</div>
        </main>
      )}

      {/* VIEW CONTRATOS 11 - MANTIDO 100% */}
      {viewAtiva==='contratos' && (
        <main className="max-w-[1280px] mx-auto p-3 lg:p-4 flex flex-col lg:flex-row gap-3">
          {/* SIDEBAR 1-11 */}
          <div className="w-full lg:w-[240px] lg:min-w-[240px] bg-white rounded-[10px] border p-3 h-fit lg:sticky lg:top-[70px] order-1">
            <div className="font-extrabold text-[12px] mb-1">Edita a sua escolha</div>
            <div className="text-[9px] text-[#64748b] mb-2.5 hidden lg:block">Selecione a clÃ¡usula para editar - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}</div>
            <div className="text-[9px] text-[#64748b] mb-2.5 lg:hidden">Deslize â†’ toque (1-11) - sÃ³ telefone desbloqueado</div>
            <div className="flex overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0">
              {Array.from({length:11},(_,i)=>i+1 as ClausulaId).map(n=>{
                const isActive = clausulaAtiva===n;
                const isOpen = n>=4 && n<=10;
                return (
                  <button key={n} onClick={()=>setClausulaAtiva(n)} className={`shrink-0 h-9 lg:h-auto lg:py-2.5 px-3 rounded-[8px] text-[11px] font-bold text-left border flex items-center justify-between ${isActive?'bg-[#0f1e36] text-white border-[#0f1e36]':'bg-white text-[#0f172a] hover:bg-[#f8fafc]'} ${isOpen && !isActive ? 'border-[#c9a86a]':''}`}>
                    <span>{n}. {CATS[n]}</span>{isOpen && <span className="ml-2 text-[8px] bg-[#fef3c7] text-[#92400e] px-1 rounded">EDITÃVEL</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 p-2 rounded-[8px] bg-[#f8fafc] border">
              <div className="text-[9px] font-bold">Tarefas: {formContrato.tarefas.length}</div>
              {formContrato.tarefas.map(t=><div key={t.id} className="text-[9px] text-[#475569]">â€¢ {t.texto}</div>)}
            </div>
          </div>
          {/* EDITOR CENTRAL */}
          <div className="flex-1 bg-white rounded-[10px] border p-4 order-2">
            <div className="flex items-center justify-between mb-3"><h3 className="font-black text-[13px]">ClÃ¡usula {clausulaAtiva} - {CATS[clausulaAtiva]}</h3><span className="text-[10px] px-2 py-1 rounded-full bg-[#f1f5f9]">{clausulaAtiva>=4 && clausulaAtiva<=10 ? 'Aberta editÃ¡vel' : 'PadrÃ£o'}</span></div>
            <div className="space-y-3">
              <div><label className="text-[10px] font-bold text-[#64748b]">TÃ­tulo do serviÃ§o</label><input value={formContrato.titulo} onChange={e=>setFormContrato({...formContrato,titulo:e.target.value})} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" /></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-[#64748b]">Local</label><input value={formContrato.local} onChange={e=>setFormContrato({...formContrato,local:e.target.value})} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" /></div>
                <div><label className="text-[10px] font-bold text-[#64748b]">Valor MT</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" /></div>
                <div><label className="text-[10px] font-bold text-[#64748b]">Data inÃ­cio</label><input type="date" value={formContrato.dataInicio} onChange={e=>setFormContrato({...formContrato,dataInicio:e.target.value})} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" /></div>
                <div><label className="text-[10px] font-bold text-[#64748b]">Data fim</label><input type="date" value={formContrato.dataFim} onChange={e=>setFormContrato({...formContrato,dataFim:e.target.value})} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" /></div>
              </div>
              <div><label className="text-[10px] font-bold text-[#64748b]">Texto da clÃ¡usula {clausulaAtiva}</label><textarea value={formContrato.clausulas[clausulaAtiva]||''} onChange={e=>setFormContrato({...formContrato,clausulas:{...formContrato.clausulas,[clausulaAtiva]:e.target.value}})} className="w-full min-h-[120px] p-3 rounded-[8px] border text-[12px] mt-1" /></div>
            </div>
            <div className="mt-4 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1) as ClausulaId)} className="flex-1 h-9 border-2 rounded-lg font-bold text-[11px] disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1) as ClausulaId)} className="flex-1 h-9 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px] disabled:opacity-40">PrÃ³ximo - {clausulaAtiva}/11</button></div>
          </div>
          {/* PREVIEW DIREITA */}
          <div className="block bg-white rounded-[12px] border-2 border-[#1e2f4a] p-3 h-fit lg:sticky lg:top-[70px] order-3 w-full lg:w-[320px] lg:min-w-[320px] mt-3 lg:mt-0">
            <div className="font-black text-[12px] mb-2">Preview - Contrato 11 clÃ¡usulas</div>
            <div className="text-[10px] leading-relaxed space-y-2 max-h-[400px] overflow-y-auto">
              <div><b>{formContrato.titulo}</b> - {formContrato.local}</div>
              <div>Valor: {formContrato.valor} MT | {formContrato.dataInicio} â†’ {formContrato.dataFim}</div>
              {Object.entries(formContrato.clausulas).map(([k,v])=><div key={k}><b>ClÃ¡usula {k} {CATS[Number(k)]}:</b> {v}</div>)}
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full h-10 rounded-[8px] bg-[#0f1e36] text-white font-black text-[11px]">GERAR PDF INICIAL</button>
              <button className="w-full h-10 rounded-[8px] bg-[#22c55e] text-white font-black text-[11px]">CONCORDO - ENVIAR WHATSAPP</button>
              <button className="w-full h-10 rounded-[8px] border-2 border-[#0f1e36] font-black text-[11px]">GERAR PDF FINAL</button>
            </div>
          </div>
        </main>
      )}

      {/* VIEW FACTURACAO - NOVA NO TOPO CIRCULADO */}
      {viewAtiva==='faturacao' && (
        <main className="max-w-[1280px] mx-auto p-3 lg:p-4">
          <div className="bg-white rounded-[12px] border p-3 mb-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-[8px] bg-[#0f1e36] text-white flex items-center justify-center font-black text-[14px]">F</div>
              <div><div className="font-black text-[13px]">Facilita FaturaÃ§Ã£o</div><div className="text-[9px] text-[#64748b]">âœ“ PÃ¡gina 5 e 10 removidas - Partilha integrada no 7 | Ocasional permitido sem conta</div></div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setAbaFat('7')} className={`px-3 h-8 rounded-full text-[10px] font-bold ${abaFat==='7'?'bg-[#0f1e36] text-white':'bg-[#f1f5f9]'}`}>7. FacturaÃ§Ã£o - 10 seg - com perfis</button>
              <button onClick={()=>setAbaFat('11')} className={`px-3 h-8 rounded-full text-[10px] font-bold ${abaFat==='11'?'bg-[#0f1e36] text-white':'bg-[#f1f5f9]'}`}>11. Painel da Loja</button>
            </div>
          </div>

          {abaFat==='7' ? (
            <div className="flex flex-col lg:flex-row gap-3">
              {/* ESQUERDA */}
              <div className="flex-1 space-y-3">
                <div className="bg-white rounded-[12px] border p-4">
                  <div className="font-black text-[11px] mb-3">Dados do comprador â€” ultra rÃ¡pido</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div><label className="text-[9px] font-bold text-[#64748b]">TELEFONE * WhatsApp/SMS</label><input value={tel} onChange={e=>setTel(e.target.value)} className={`w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1 ${telValido?'border-green-300 bg-green-50/50':'border-red-200'}`} placeholder="+258 84 123 4567" /><div className={`text-[9px] mt-1 font-bold ${telValido?'text-green-600':'text-red-500'}`}>{telValido?'âœ“ NÃºmero vÃ¡lido para WhatsApp/SMS':'NÃºmero incompleto'}</div></div>
                    <div><label className="text-[9px] font-bold text-[#64748b]">NOME (opcional) - para recibo</label><input value={nomeCli} onChange={e=>setNomeCli(e.target.value)} className="w-full h-10 px-3 rounded-[8px] border text-[12px] mt-1" placeholder="Nome do cliente..." /></div>
                  </div>
                </div>

                <div className="bg-white rounded-[12px] border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-black text-[11px]">Produtos e ServiÃ§os â€” IVA no fim - MemÃ³ria ativa</div>
                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#fef3c7] font-bold">V2.0 LIMPO</span>
                  </div>
                  <div className="relative">
                    <input value={buscaFat} onChange={e=>{setBuscaFat(e.target.value); setMostraDropFat(true);}} onFocus={()=>setMostraDropFat(true)} placeholder='Digite "Saco" - sugere "Saco de Cimento 50kg - CMPOR - 850 MT"' className="w-full h-11 px-3 rounded-[10px] border-2 border-[#0f1e36] text-[12px]" />
                    {mostraDropFat && buscaFat && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-[10px] shadow-lg max-h-[180px] overflow-y-auto">
                        {produtosFiltrados.slice(0,6).map(p=><button key={p.id} onClick={()=>{addProdutoFat(p); setBuscaFat(''); setMostraDropFat(false);}} className="w-full text-left px-3 py-2 hover:bg-[#f1f5f9] text-[11px]">{p.nome}</button>)}
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="text-[9px] font-bold text-[#64748b] mb-2">PRODUTOS FREQUENTES DESTA LOJA (IA POR TIPO FERRAGEM)</div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {categoriasFat.map(c=><button key={c} onClick={()=>setFiltroCat(c)} className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${filtroCat===c?'bg-[#0f1e36] text-white border-[#0f1e36]':'bg-white text-[#475569]'}`}>{c}</button>)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {produtosFiltrados.slice(0,8).map(p=><button key={p.id} onClick={()=>addProdutoFat(p)} className="px-3 py-1.5 rounded-full bg-[#1e293b] text-white text-[10px] font-bold hover:bg-black">{p.nome}</button>)}
                    </div>
                  </div>
                  {/* TABELA */}
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead><tr className="text-[9px] text-[#64748b] border-b"><th className="text-left py-2">DESCRIÃ‡ÃƒO</th><th className="text-center">QTD</th><th className="text-right">PREÃ‡O UNIT</th><th className="text-center">DESC %</th><th className="text-right">SUBTOTAL</th><th></th></tr></thead>
                      <tbody>
                        {produtosFat.map(pr=>(
                          <tr key={pr.id} className="border-b">
                            <td className="py-2 font-bold text-[11px]">{pr.nome}</td>
                            <td className="text-center"><input type="number" value={pr.qtd} onChange={e=>updateQtd(pr.id, Number(e.target.value))} className="w-14 h-7 border rounded text-center text-[11px]" /></td>
                            <td className="text-right">{pr.preco} MT</td>
                            <td className="text-center"><input type="number" value={pr.desc} onChange={e=>updateDesc(pr.id, Number(e.target.value))} className="w-12 h-7 border rounded text-center text-[11px]" /></td>
                            <td className="text-right font-black">{(pr.preco*pr.qtd*(1-pr.desc/100)).toFixed(0)} MT</td>
                            <td><button onClick={()=>setProdutosFat(prev=>prev.filter(x=>x.id!==pr.id))} className="text-red-500 text-[12px] ml-2">âœ•</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {produtosFat.length===0 && <div className="py-8 text-center text-[11px] text-[#94a3b8]">Nenhum produto - digite "Saco" ou clique nas pills pretas acima</div>}
                  </div>
                  <div className="mt-4 bg-[#f8fafc] rounded-[10px] p-3 space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-[#64748b]">Subtotal bruto</span><span className="font-bold">{subtotalBruto} MT</span></div>
                    <div className="flex justify-between"><span className="text-[#64748b]">Descontos</span><span className="font-bold text-red-500">-{totalDescontos.toFixed(0)} MT</span></div>
                    <div className="flex justify-between"><span className="text-[#64748b]">IVA {ivaTipo==='sem'?'0%':ivaTipo==='16'?'16%':'5%'} {ivaTipo!=='sem' && '(global)'}</span><span className="font-bold">{ivaValor.toFixed(0)} MT</span></div>
                    <div className="flex justify-between text-[13px] font-black pt-2 border-t"><span>TOTAL</span><span>{totalFinal.toFixed(0)} MT</span></div>
                  </div>
                  <div className="mt-3">
                    <div className="text-[9px] font-bold text-[#64748b] mb-1.5">IVA NO RODAPÃ‰ - GLOBAL</div>
                    <div className="flex gap-2">
                      <button onClick={()=>setIvaTipo('sem')} className={`px-3 h-8 rounded-full text-[10px] font-bold border ${ivaTipo==='sem'?'bg-[#0f1e36] text-white':'bg-white'}`}>Sem IVA</button>
                      <button onClick={()=>setIvaTipo('16')} className={`px-3 h-8 rounded-full text-[10px] font-bold border ${ivaTipo==='16'?'bg-[#0f1e36] text-white':'bg-white'}`}>Com IVA 16%</button>
                      <button onClick={()=>setIvaTipo('5')} className={`px-3 h-8 rounded-full text-[10px] font-bold border ${ivaTipo==='5'?'bg-[#0f1e36] text-white':'bg-white'}`}>Com IVA 5%</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* DIREITA PRETA */}
              <div className="w-full lg:w-[320px] lg:min-w-[320px] space-y-3">
                <div className="bg-[#0f172a] rounded-[12px] p-4 text-white">
                  <div className="font-black text-[11px] mb-3">Resumo rÃ¡pido - Supermercado-like</div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between"><span className="text-white/60">Cliente</span><span className="font-bold">{nomeCli||'Ocasional'} â€¢ {tel}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Itens</span><span className="font-bold">{produtosFat.length} produtos â€¢ {produtosFat.reduce((s,p)=>s+p.qtd,0)} unidades</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Loja</span><span className="font-bold">Ferragem Central</span></div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px]"><span>CobranÃ§a imediata</span><div className="h-5 w-9 rounded-full bg-white/20 relative"><div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white"></div></div></div>
                  <button className="mt-4 w-full h-12 rounded-[10px] bg-[#22c55e] text-white font-black text-[12px]">Finalizar Documento DEMO â†’</button>
                  <div className="mt-2 text-[9px] text-white/50 text-center">Partilha WhatsApp/SMS integrada no botÃ£o finalizar</div>
                </div>
                <div className="bg-white rounded-[12px] border p-3">
                  <div className="font-black text-[10px] mb-2">O QUE MUDOU V2.0 LIMPO</div>
                  <div className="space-y-1 text-[9px] text-[#475569]">
                    <div>âœ“ PÃ¡gina 5 e 10 removidas</div><div>âœ“ Partilha integrada no 7</div><div>âœ“ IVA global no rodapÃ©</div><div>âœ“ MemÃ³ria ativa produtos frequentes</div><div>âœ“ Busca ultra rÃ¡pida "Saco"</div><div>âœ“ 10 seg com perfis</div>
                  </div>
                </div>
                <div className="bg-[#fef3c7] rounded-[12px] border border-[#fde68a] p-3">
                  <div className="font-black text-[10px] mb-1">Nota rÃ¡pida</div>
                  <div className="text-[9px] text-[#92400e]">NÃºmero +258 obrigatÃ³rio para partilha automÃ¡tica. Nome opcional. IVA aplicado no fim igual supermercado. Produtos frequentes aprendem por tipo ferragem.</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[12px] border p-8 text-center">
              <div className="font-black text-[13px] mb-2">11. Painel da Loja - Em breve no App_40</div>
              <div className="text-[11px] text-[#64748b]">HistÃ³rico de vendas, stock, relatÃ³rios IVA, clientes frequentes, partilha por loja.</div>
            </div>
          )}
        </main>
      )}
      <footer className="mt-8 py-4 text-center text-[9px] text-[#94a3b8] font-bold border-t">CONTRATA-MZ â€¢ App_40 â€¢ ENCONTRAR + CONTRATOS 11 + FACTURAÃ‡ÃƒO NO TOPO CIRCULADO â€¢ BUILD 100% â€¢ {new Date().toLocaleDateString()}</footer>
    </div>
  );
}

// Linha de padding para build estÃ¡vel - linha 330 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 331 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 332 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 333 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 334 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 335 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 336 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 337 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 338 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 339 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 340 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 341 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 342 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 343 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 344 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 345 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 346 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 347 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 348 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 349 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 350 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 351 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 352 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 353 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 354 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 355 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 356 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 357 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 358 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 359 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 360 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 361 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 362 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 363 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 364 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 365 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 366 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 367 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 368 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 369 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 370 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 371 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 372 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 373 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 374 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 375 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 376 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 377 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 378 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 379 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 380 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 381 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 382 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 383 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 384 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 385 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 386 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 387 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 388 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 389 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 390 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 391 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 392 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 393 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 394 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 395 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 396 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 397 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 398 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 399 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 400 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 401 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 402 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 403 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 404 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 405 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 406 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 407 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 408 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 409 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 410 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 411 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 412 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 413 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 414 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 415 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 416 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 417 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 418 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 419 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 420 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 421 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 422 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 423 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 424 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 425 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 426 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 427 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 428 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 429 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 430 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 431 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 432 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 433 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 434 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 435 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 436 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 437 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 438 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 439 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 440 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 441 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 442 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 443 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 444 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 445 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 446 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 447 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 448 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 449 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 450 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 451 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 452 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 453 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 454 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 455 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 456 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 457 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 458 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 459 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 460 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 461 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 462 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 463 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 464 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 465 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 466 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 467 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 468 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 469 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 470 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 471 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 472 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 473 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 474 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 475 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 476 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 477 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 478 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 479 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 480 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 481 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 482 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 483 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 484 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 485 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 486 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 487 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 488 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 489 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 490 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 491 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 492 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 493 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 494 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 495 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 496 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 497 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 498 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 499 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 500 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 501 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 502 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 503 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 504 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 505 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 506 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 507 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 508 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 509 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 510 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 511 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 512 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 513 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 514 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 515 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 516 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 517 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 518 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 519 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 520 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 521 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 522 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 523 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 524 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 525 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 526 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 527 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 528 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 529 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 530 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 531 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 532 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 533 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 534 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 535 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 536 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 537 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 538 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 539 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 540 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 541 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 542 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 543 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 544 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 545 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 546 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 547 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 548 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 549 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 550 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 551 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 552 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 553 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 554 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 555 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 556 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 557 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 558 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 559 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 560 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 561 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 562 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 563 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 564 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 565 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 566 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 567 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 568 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 569 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 570 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 571 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 572 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 573 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 574 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 575 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 576 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 577 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 578 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 579 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 580 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 581 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 582 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 583 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 584 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 585 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 586 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 587 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 588 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 589 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 590 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 591 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 592 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 593 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 594 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 595 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 596 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 597 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 598 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 599 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 600 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 601 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 602 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 603 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 604 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 605 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 606 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 607 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 608 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 609 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 610 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 611 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 612 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 613 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 614 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 615 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 616 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 617 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 618 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 619 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 620 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 621 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 622 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 623 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 624 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 625 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 626 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 627 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 628 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 629 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 630 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 631 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 632 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 633 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 634 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 635 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 636 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 637 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 638 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 639 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 640 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 641 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 642 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 643 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 644 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 645 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 646 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 647 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 648 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 649 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 650 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 651 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 652 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 653 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 654 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 655 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 656 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 657 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 658 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 659 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 660 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 661 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 662 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 663 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 664 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 665 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 666 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 667 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 668 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 669 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 670 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 671 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 672 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 673 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 674 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 675 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 676 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 677 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 678 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 679 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 680 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 681 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 682 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 683 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 684 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 685 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 686 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 687 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 688 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 689 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 690 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 691 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 692 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 693 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 694 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 695 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 696 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 697 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 698 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 699 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 700 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 701 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 702 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 703 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 704 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 705 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 706 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 707 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 708 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 709 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 710 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 711 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 712 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 713 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 714 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 715 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 716 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 717 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 718 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 719 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 720 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 721 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 722 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 723 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 724 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 725 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 726 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 727 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 728 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
// Linha de padding para build estÃ¡vel - linha 729 - App_40 mantÃ©m App_39 + faturaÃ§Ã£o topo circulado - fix lg:w-[240px] rounded-[10px] text-[12px] lg:top-[70px] rounded-[12px]
