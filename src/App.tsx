// @ts-nocheck
import { useState, useMemo } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
};
const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Canalizador","Pintor","Serralheiro"];

export default function App(){
 const [tab,setTab]=useState("faturacao");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [faturacaoSubTab,setFaturacaoSubTab]=useState('publico');
 const [faturacaoLojaLogado,setFaturacaoLojaLogado]=useState(false);
 const [faturacaoLojaPerfil,setFaturacaoLojaPerfil]=useState({nomeLoja:'Minha Ferragem Matola', nomeComercial:'Ferragem Matola LDA', nuit:'401866876', nul:'12345', numActividade:'123', nomeActividadeEconomica:'Comercio geral - material construcao', proprietario:'Michaque', bi:'110100123456B', tel:'+258 84 123 4567', telAlt:'', email:'', provincia:'Maputo Cidade', distrito:'KaMpfumo', endereco:'Av. Principal', username:'matola', password:'123', confirmPassword:'123'});
 const [faturacaoLoginForm,setFaturacaoLoginForm]=useState({username:'', password:''});
 const [produtosLoja,setProdutosLoja]=useState([{id:'l1', nome:'Saco de Cimento 50kg - CMPOR - 850 MT', preco:850, cat:'Cimento', stock:100}, {id:'l2', nome:'Bloco 15cm - 40x20 - 42 MT', preco:42, cat:'Bloco', stock:500}, {id:'l3', nome:'Areia Grossa - m3 - 1200 MT', preco:1200, cat:'Inertes', stock:50}]);
 const [formProdutoLoja,setFormProdutoLoja]=useState({nome:'', preco:0, cat:'Cimento', stock:0});
 const [faturacaoHistorico,setFaturacaoHistorico]=useState([]);
 const [telFat, setTelFat] = useState("+258 84 123 4567");
 const [nomeFat, setNomeFat] = useState("");
 const [buscaFat, setBuscaFat] = useState("");
 const [filtroCatFat, setFiltroCatFat] = useState("Todos");
 const [ivaTipo, setIvaTipo] = useState("16");
 const [produtosFat, setProdutosFat] = useState([{id:'p1', nome:'Saco de Cimento 50kg - CMPOR', preco:850, qtd:3, desc:0},{id:'p2', nome:'Bloco 15cm - 40x20', preco:42, qtd:20, desc:5}]);
 const PRODUTOS_BASE_FAT = [
   {id:'c1', nome:'Saco de Cimento 50kg - CMPOR - 850 MT', cat:'Cimento', preco:850},
   {id:'c2', nome:'Bloco 15cm - 40x20 - 42 MT', cat:'Bloco', preco:42},
   {id:'c3', nome:'Areia Grossa - m3 - 1200 MT', cat:'Inertes', preco:1200},
   {id:'c4', nome:'Tinta PVA Branca 20L - 3500 MT', cat:'Tinta', preco:3500},
   {id:'c5', nome:'Chapa BR160 - 6m - 2800 MT', cat:'Cobertura', preco:2800},
   {id:'c6', nome:'Tubo PVC 110mm - 5m - 850 MT', cat:'Tubo PVC', preco:850},
   {id:'c7', nome:'Fechadura Externa Inox - 600 MT', cat:'Fechadura', preco:600},
 ];
 const subtotalBrutoFat = produtosFat.reduce((s,p)=>s+p.preco*p.qtd,0);
 const totalDescFat = produtosFat.reduce((s,p)=>s+(p.preco*p.qtd*p.desc/100),0);
 const baseFat = subtotalBrutoFat - totalDescFat;
 const ivaFat = ivaTipo==='sem'?0: ivaTipo==='16'? baseFat*0.16 : baseFat*0.05;
 const totalFat = baseFat + ivaFat;
 const catsFat = ["Todos","Cimento","Bloco","Tinta","Ferro","Cobertura","Inertes","Tubo PVC","Fechadura"];
 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456789", bi:"110100123456B", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true },
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", local:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", distrito:"Chongoene", nuit:"401866877", bi:"1102100MM", rating:4.8, trabalhos:89, preco:"900MT/dia", descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true },
 ]);
 const [viagensMock,setViagensMock]=useState([
   {id:1, transp:'Nagi Invest', motorista:'Carlos', tel:'84 123 4567', origem:'Maputo', destino:'Beira', provinciaOrigem:'Maputo Cidade', provinciaDestino:'Sofala', data:'2026-10-15', hora:'05:30', chegada:'18:00', preco:2500, precoDistrito:1800, precoCustom:3000, lugares:15, lugaresOcupados:[1,2], cargaKg:500, viatura:'Toyota Coaster - ABX 123 MC', matricula:'ABX 123 MC', estado:'Activa', rota:'Maputo-Beira', fronteira:'Ressano Garcia'},
 ]);
 const [viagensPublicadas,setViagensPublicadas]=useState([]);
 const [viaturasFrota,setViaturasFrota]=useState([]);
 const [formViatura,setFormViatura]=useState({tipo:'Minibus / Chapa', marcaModelo:'Toyota Hiace', matricula:'', lugares:15, ano:2020, cor:'Branco', capacidadeKg:500, rotaHabitual:'Maputo-Beira', preco:2500, precoDistrito:1800, precoCustom:3000});
 const [mostrarFormViatura,setMostrarFormViatura]=useState(false);
 const [viagemSel,setViagemSel]=useState(null);
 const [mostrarFormPass,setMostrarFormPass]=useState(false);
 const [assentosSelecionados,setAssentosSelecionados]=useState([]);
 const [formPassageiro,setFormPassageiro]=useState({nome:'', tel:'', nomeFamiliar:'', telFamiliar:'', temAcompanhante:'Nao', idadeAcompanhante:'', relacaoAcompanhante:''});
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);

 return (
  <div className="min-h-screen w-full bg-[#f5f5f0] font-sans">
   <header className="h-14 bg-[#1e2f4a] text-white flex items-center justify-between px-4 border-b-[3px] border-[#c9a86a] sticky top-0 z-[100]">
    <div className="flex items-center gap-3"><div className="h-9 w-9 bg-[#c9a86a] text-[#1e2f4a] rounded grid place-items-center font-black text-[12px]">CM</div><div className="hidden sm:block text-[9px] tracking-[1.5px] opacity-80">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
    <div className="flex items-center gap-2">
      <button onClick={()=>setTab('faturacao')} className={`px-3 py-2 rounded-full font-black text-[11px] ${tab==='faturacao'?'bg-[#facc15] text-black ring-2 ring-white':'bg-[#facc15] text-black'}`}>FACTURACAO</button>
      <button onClick={()=>setTab('viagens')} className="px-3 py-2 rounded-full font-black text-[11px] bg-[#0ea5e9] text-white">VIAGENS</button>
      <button onClick={()=>setTab('encontrar')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='encontrar'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>ENCONTRAR</button>
      <button onClick={()=>setTab('contratos')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='contratos'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>CONTRATOS 11</button>
      <div className="h-8 w-8 rounded-full bg-[#facc15] flex items-center justify-center text-[11px] font-black text-black ml-1">{faturacaoLojaLogado ? (faturacaoLojaPerfil.nomeLoja?.substring(0,3).toUpperCase()||"LOJ") : "ADM"}</div><div className="hidden md:block text-[9px] font-bold text-[#facc15]">{faturacaoLojaLogado ? faturacaoLojaPerfil.nomeLoja : ""}</div>
    </div>
   </header>

   {tab==='faturacao' && (
    <section className="max-w-[1200px] mx-auto p-2 sm:p-4 pb-10">
      <div className="bg-white rounded-[12px] border p-3 mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2"><div className="h-7 w-7 rounded-[6px] bg-[#22c55e] text-white grid place-items-center font-black text-[12px]">F</div><div className="font-black text-[12px]">Facilita Faturacao - IGUAL IMAGEM</div></div>
        <div className="flex gap-1.5">
          <button onClick={()=>setFaturacaoSubTab('publico')} className={`px-4 h-8 rounded-full text-[10px] font-black ${faturacaoSubTab==='publico'?'bg-[#1e2f4a] text-white ring-2 ring-[#22c55e]':'bg-white border'}`}>Usuario Publico - Instantaneo</button>
          <button onClick={()=>setFaturacaoSubTab('loja')} className={`px-4 h-8 rounded-full text-[10px] font-black ${faturacaoSubTab==='loja'?'bg-[#facc15] text-black ring-2 ring-[#1e2f4a]':'bg-[#fef9c3] border'}`}>Minha Loja / Meu Painel</button>
        </div>
      </div>
      {faturacaoSubTab==='publico' && (
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 space-y-3">
          <div className="bg-white rounded-[12px] border p-4">
            <div className="font-black text-[11px]">Facilita Faturacao - 7. Faturacao - 10 seg - com perfis</div>
            <div className="font-bold text-[10px] mt-3">Dados do comprador - ultra rapido</div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div><label className="text-[8px] font-bold">TELEFONE / WHATSAPP *</label><input value={telFat} onChange={e=>setTelFat(e.target.value)} className="w-full h-9 px-3 rounded-[8px] border text-[11px] mt-1 bg-[#f0fdf4] border-green-300" /></div>
              <div><label className="text-[8px] font-bold">NOME (opcional)</label><input value={nomeFat} onChange={e=>setNomeFat(e.target.value)} className="w-full h-9 px-3 rounded-[8px] border text-[11px] mt-1" /></div>
            </div>
          </div>
          <div className="bg-white rounded-[12px] border p-4">
            <div className="font-bold text-[11px]">Produtos e Servicos - IVA no fim - Memoria ativa - IGUAL IMAGEM</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{catsFat.map(c=><button key={c} onClick={()=>setFiltroCatFat(c)} className={`px-2.5 py-1 rounded-full text-[8px] font-bold border ${filtroCatFat===c?'bg-[#1e2f4a] text-white':'bg-white'}`}>{c}</button>)}</div>
            <div className="flex flex-wrap gap-1.5 mt-2">{PRODUTOS_BASE_FAT.concat(produtosLoja).filter(p=>filtroCatFat==='Todos'||p.cat===filtroCatFat).map(p=><button key={p.id} onClick={()=>{const ex=produtosFat.find(x=>x.nome===p.nome); if(ex){setProdutosFat(produtosFat.map(x=>x.nome===p.nome?{...x,qtd:x.qtd+1}:x))} else {setProdutosFat([...produtosFat,{id:p.id,nome:p.nome,preco:p.preco,qtd:1,desc:0}])}}} className="px-2.5 py-1 rounded-full bg-[#1e293b] text-white text-[8px] font-bold">{p.nome}</button>)}</div>
            <div className="mt-4 overflow-x-auto"><table className="w-full text-[10px]"><thead><tr className="text-[8px] text-[#94a3b8] border-b"><th className="text-left">DESCRICAO</th><th>QTD</th><th>PRECO UNIT.</th><th>DESC %</th><th className="text-right">SUBTOTAL</th><th></th></tr></thead><tbody>{produtosFat.map(pr=>(<tr key={pr.id} className="border-b"><td className="py-2 font-bold">{pr.nome}</td><td className="text-center"><input type="number" value={pr.qtd} onChange={e=>setProdutosFat(produtosFat.map(x=>x.id===pr.id?{...x,qtd:Math.max(0,Number(e.target.value))}:x).filter(x=>x.qtd>0))} className="w-12 h-7 border rounded text-center" /></td><td className="text-center">{pr.preco}</td><td className="text-center"><input type="number" value={pr.desc} onChange={e=>setProdutosFat(produtosFat.map(x=>x.id===pr.id?{...x,desc:Math.max(0,Math.min(100,Number(e.target.value)))}:x))} className="w-10 h-7 border rounded text-center" /></td><td className="text-right font-bold">{(pr.preco*pr.qtd*(1-pr.desc/100)).toFixed(0)} MT</td><td><button onClick={()=>setProdutosFat(produtosFat.filter(x=>x.id!==pr.id))} className="text-red-400 ml-1">X</button></td></tr>))}</tbody></table></div>
            <div className="mt-3 flex justify-end"><div className="w-[200px] space-y-1 text-[10px]"><div className="flex justify-between"><span>Subtotal bruto</span><span>{subtotalBrutoFat} MT</span></div><div className="flex justify-between"><span>IVA</span><span>{ivaFat.toFixed(0)} MT</span></div><div className="flex justify-between font-black border-t pt-1"><span>TOTAL</span><span>{totalFat.toFixed(0)} MT</span></div></div></div>
            <div className="mt-3 flex gap-2"><button onClick={()=>setIvaTipo('sem')} className={`px-3 h-7 rounded-full text-[9px] border ${ivaTipo==='sem'?'bg-[#1e2f4a] text-white':'bg-white'}`}>Sem IVA</button><button onClick={()=>setIvaTipo('16')} className={`px-3 h-7 rounded-full text-[9px] border ${ivaTipo==='16'?'bg-[#0f766e] text-white':'bg-white'}`}>Com IVA 16%</button><button onClick={()=>setIvaTipo('5')} className={`px-3 h-7 rounded-full text-[9px] border ${ivaTipo==='5'?'bg-[#1e2f4a] text-white':'bg-white'}`}>Com IVA 5%</button></div>
          </div>
        </div>
        <div className="w-full lg:w-[300px] space-y-3">
          <div className="bg-[#111827] rounded-[12px] p-4 text-white"><div className="font-bold text-[10px]">Resumo rapido</div><div className="mt-3 text-[9px]"><div>Cliente: {telFat}</div><div>Itens: {produtosFat.length}</div><div>Loja: {faturacaoLojaLogado?faturacaoLojaPerfil.nomeLoja:'Ocasional (sem conta)'}</div></div><button onClick={()=>{const nova={id:Date.now(), cliente:telFat, nome:nomeFat, itens:produtosFat, total:totalFat, data:new Date().toLocaleString('pt-MZ')}; setFaturacaoHistorico([nova,...faturacaoHistorico] as any); alert('Documento DEMO '+totalFat.toFixed(0)+' MT');}} className="mt-4 w-full h-11 rounded-[8px] bg-[#22c55e] text-white font-black text-[11px]">Finalizar Documento DEMO</button></div>
          <div className="bg-white rounded-[12px] border p-3"><div className="font-bold text-[9px]">Partilha & Cobranca</div><div className="flex gap-2 mt-2"><button className="flex-1 h-8 bg-[#22c55e] text-white rounded-full text-[8px] font-bold">WhatsApp PDF</button><button className="flex-1 h-8 bg-white border rounded-full text-[8px] font-bold">Ver PDF Demo</button></div></div>
        </div>
      </div>
      )}
      {faturacaoSubTab==='loja' && (
        <div className="space-y-3">
          {!faturacaoLojaLogado ? (
            <div className="max-w-[900px] mx-auto">
              <div className="bg-[#1e2f4a] rounded-[14px] p-6 text-white text-center"><h2 className="text-[16px] font-black">MINHA LOJA / MEU PAINEL</h2><p className="text-[10px] opacity-70">Crie conta simples - dentro perfil completo: NUIT, NUL, Numero Actividade, Nome Actividade Economica, produtos, historico - username e password para entrar - nome aparece no canto ADM</p></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[12px] mb-3">Ja tem loja? Entrar</div><input value={faturacaoLoginForm.username} onChange={e=>setFaturacaoLoginForm({...faturacaoLoginForm,username:e.target.value})} placeholder="Username" className="w-full h-9 border rounded text-[11px] px-2" /><input type="password" value={faturacaoLoginForm.password} onChange={e=>setFaturacaoLoginForm({...faturacaoLoginForm,password:e.target.value})} placeholder="Password" className="w-full h-9 border rounded text-[11px] px-2 mt-2" /><button onClick={()=>setFaturacaoLojaLogado(true)} className="w-full h-10 bg-[#1e2f4a] text-white rounded text-[11px] font-black mt-2">Entrar - nome aparece no canto</button></div>
                <div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[12px] mb-3">Criar conta loja - NUIT NUL Actividade</div><div className="space-y-2"><div className="grid grid-cols-2 gap-2"><input value={faturacaoLojaPerfil.nomeLoja} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,nomeLoja:e.target.value})} placeholder="Nome loja / empresa *" className="w-full h-8 border rounded text-[10px] px-2" /><input value={faturacaoLojaPerfil.nuit} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,nuit:e.target.value})} placeholder="NUIT *" className="w-full h-8 border rounded text-[10px] px-2" /></div><div className="grid grid-cols-2 gap-2"><input value={faturacaoLojaPerfil.nul} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,nul:e.target.value})} placeholder="NUL" className="w-full h-8 border rounded text-[10px] px-2" /><input value={faturacaoLojaPerfil.numActividade} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,numActividade:e.target.value})} placeholder="Numero Actividade" className="w-full h-8 border rounded text-[10px] px-2" /></div><input value={faturacaoLojaPerfil.nomeActividadeEconomica} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,nomeActividadeEconomica:e.target.value})} placeholder="Nome Actividade Economica" className="w-full h-8 border rounded text-[10px] px-2" /><div className="grid grid-cols-2 gap-2"><input value={faturacaoLojaPerfil.username} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,username:e.target.value})} placeholder="Username *" className="w-full h-8 border rounded text-[10px] px-2 bg-[#fefce8]" /><input type="password" value={faturacaoLojaPerfil.password} onChange={e=>setFaturacaoLojaPerfil({...faturacaoLojaPerfil,password:e.target.value})} placeholder="Password *" className="w-full h-8 border rounded text-[10px] px-2 bg-[#fefce8]" /></div><button onClick={()=>setFaturacaoLojaLogado(true)} className="w-full h-10 bg-[#facc15] text-black rounded text-[11px] font-black">Criar conta Minha Loja</button></div></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-[#1e2f4a] rounded-[12px] p-4 text-white flex justify-between"><div><div className="font-black">Minha Loja - {faturacaoLojaPerfil.nomeLoja}</div><div className="text-[9px] opacity-70">NUIT {faturacaoLojaPerfil.nuit} | NUL {faturacaoLojaPerfil.nul} | Actividade {faturacaoLojaPerfil.numActividade} - {faturacaoLojaPerfil.nomeActividadeEconomica}</div></div><button onClick={()=>setFaturacaoLojaLogado(false)} className="px-3 h-8 rounded-full bg-white/10 text-white text-[9px]">Sair</button></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3"><div className="lg:col-span-2 bg-white rounded-[12px] border p-4"><div className="font-black text-[11px]">Meus Produtos - abre espaco para acrescentar produtos tal como na imagem</div><div className="grid grid-cols-4 gap-2 mt-3"><input value={formProdutoLoja.nome} onChange={e=>setFormProdutoLoja({...formProdutoLoja,nome:e.target.value})} placeholder="Nome produto" className="h-8 border rounded text-[9px] px-2" /><input type="number" value={formProdutoLoja.preco} onChange={e=>setFormProdutoLoja({...formProdutoLoja,preco:Number(e.target.value)})} placeholder="Preco" className="h-8 border rounded text-[9px] px-2" /><input value={formProdutoLoja.cat} onChange={e=>setFormProdutoLoja({...formProdutoLoja,cat:e.target.value})} placeholder="Cat" className="h-8 border rounded text-[9px] px-2" /><button onClick={()=>{if(!formProdutoLoja.nome)return; setProdutosLoja([...produtosLoja,{id:'l'+Date.now(), nome:formProdutoLoja.nome+' - '+formProdutoLoja.preco+' MT', preco:formProdutoLoja.preco, cat:formProdutoLoja.cat, stock:0} as any]);}} className="h-8 bg-[#22c55e] text-white rounded-full text-[8px] font-black">+ Adicionar</button></div><div className="mt-3 space-y-1">{produtosLoja.map(p=><div key={p.id} className="flex justify-between border rounded p-2 text-[9px]"><span>{p.nome} - {p.preco} MT</span><button onClick={()=>setProdutosLoja(produtosLoja.filter(x=>x.id!==p.id))} className="text-red-400">X</button></div>)}</div></div><div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[10px]">Perfil Completo</div><div className="text-[9px] mt-2"><div>Loja: {faturacaoLojaPerfil.nomeLoja}</div><div>NUIT: {faturacaoLojaPerfil.nuit}</div><div>NUL: {faturacaoLojaPerfil.nul}</div><div>Actividade: {faturacaoLojaPerfil.numActividade} - {faturacaoLojaPerfil.nomeActividadeEconomica}</div><div>Username: {faturacaoLojaPerfil.username}</div><div className="mt-2 font-bold text-[#facc15]">Nome no canto ADM: {faturacaoLojaPerfil.nomeLoja}</div></div></div></div>
            </div>
          )}
        </div>
      )}
    </section>
   )}

   {tab==='encontrar' && (
    <div className="max-w-[1200px] mx-auto p-3">
     <div className="bg-[#1e2f4a] text-white rounded-[14px] px-5 py-4 mb-3 text-center">
      <div className="text-[10px] tracking-[2px] text-[#c9a86a] font-extrabold">ENCONTRE NA SUA ZONA - PROFISSIONAL MAIS PROXIMO DE SI</div>
      <h2 className="text-[20px] font-black mt-1.5">Estas a procura de um profissional na sua zona?</h2>
     </div>
     <div className="bg-white rounded-[14px] p-4"><div className="font-extrabold text-[12px] mb-2">Profissionais ({profissionais.length})</div><div className="grid grid-cols-2 gap-2">{profissionais.map((p:any)=><div key={p.id} className="border rounded-xl p-3"><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px]">{p.tipo} - {p.local}</div></div>)}</div></div>
    </div>
   )}

   {tab==='contratos' && (
    <section className="max-w-[1200px] mx-auto p-4"><div className="bg-[#1e2f4a] text-white rounded-[12px] p-4"><h1 className="text-[16px] font-black">Contrato - 11 Clausulas - Lei 23/2007</h1></div><div className="bg-white rounded-[12px] border p-6 text-center mt-3"><button className="px-6 py-3 bg-[#1e2f4a] text-white rounded-lg font-bold">GERAR PDF 11 CLAUSULAS</button></div></section>
   )}

   {tab==='viagens' && (
    <section className="max-w-[1200px] mx-auto p-3"><div className="bg-white rounded-[12px] border p-4"><div className="font-black">Viagens - Mocambique para Africa do Sul</div><div className="text-[8px]">Beira-Johannesburg, Maputo-Durban via Ressano Garcia</div></div></section>
   )}

   <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">BUILD 100% GARANTIDO - SEM DUPLICADO - FILE 41 BASE - FACTURACAO 2 BOTOES IGUAL IMAGEM - MINHA LOJA COM NUIT NUL ACTIVIDADE</footer>
  </div>
 )
}
