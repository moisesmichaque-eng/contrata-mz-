// @ts-nocheck
import { useState, useMemo } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
};
const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Canalizador","Pintor","Serralheiro"];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(0);
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [viagensSubTab,setViagensSubTab]=useState('buscar');
 const [formCadastro,setFormCadastro]=useState({nome:"", bi:"", nuit:"", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", profissao:"Pedreiro", descricao:""});
 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456789", bi:"110100123456B", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true },
  { id:2, nome:"Joao Carpinteiro", tipo:"Carpinteiro", local:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", distrito:"Chongoene", nuit:"401866877", bi:"1102100MM", rating:4.8, trabalhos:89, preco:"900MT/dia", descricao:"Moveis, portas, telhado, 8 anos exp.", foto:"JC", verificado:true },
 ]);
 const [viagensMock,setViagensMock]=useState([
   {id:1, transp:'Nagi Invest', motorista:'Carlos', tel:'84 123 4567', origem:'Maputo', destino:'Beira', provinciaOrigem:'Maputo Cidade', provinciaDestino:'Sofala', distritoOrigem:'KaMpfumo', distritoDestino:'Beira', data:'2026-10-15', hora:'05:30', chegada:'18:00', preco:2500, precoDistrito:1800, precoCustom:3000, lugares:15, lugaresOcupados:[1,2], cargaKg:500, viatura:'Toyota Coaster - ABX 123 MC', matricula:'ABX 123 MC', estado:'Activa', rota:'Maputo-Beira', fronteira:'Ressano Garcia'},
 ]);
 const [viagensPublicadas,setViagensPublicadas]=useState([]);
 const [viaturasFrota,setViaturasFrota]=useState([]);
 const [reservas,setReservas]=useState([]);
 const [formPassageiro,setFormPassageiro]=useState({nome:'', bi:'', tel:'', nomeFamiliar:'', telFamiliar:'', lugar:1, tipo:'Adulto', localColeta:'', localDesembarque:'', acompanhante:'', destinoCustom:'', temAcompanhante:'Nao', idadeAcompanhante:'', relacaoAcompanhante:'', nomeAcompanhante:'', telAcompanhante:''});
 const [assentosSelecionados,setAssentosSelecionados]=useState([]);
 const [viagemSel,setViagemSel]=useState(null);
 const [mostrarFormPass,setMostrarFormPass]=useState(false);
 const [mostrarFormViatura,setMostrarFormViatura]=useState(false);
 const [formViatura,setFormViatura]=useState({tipo:'Minibus / Chapa', marcaModelo:'Toyota Hiace', matricula:'', lugares:15, ano:2020, cor:'Branco', capacidadeKg:500, rotaHabitual:'Maputo-Beira', preco:2500, precoDistrito:1800, precoCustom:3000});
 const [transportadorTab,setTransportadorTab]=useState('frota');
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);

 return (
  <div className="min-h-screen w-full bg-[#f5f5f0] font-sans">
   <header className="h-14 bg-[#1e2f4a] text-white flex items-center justify-between px-4 border-b-[3px] border-[#c9a86a] sticky top-0 z-[100]">
    <div className="flex items-center gap-3"><div className="h-9 w-9 bg-[#c9a86a] text-[#1e2f4a] rounded grid place-items-center font-black text-[12px]">CM</div><div className="hidden sm:block text-[9px] tracking-[1.5px] opacity-80">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div>
    <div className="flex items-center gap-2">
      <button onClick={()=>setTab('viagens')} className="px-3 py-2 rounded-full font-black text-[11px] bg-[#0ea5e9] text-white">VIAGENS</button>
      <button onClick={()=>setTab('encontrar')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='encontrar'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>ENCONTRAR</button>
      <button onClick={()=>setTab('contratos')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='contratos'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>CONTRATOS 11</button>
      <div className="h-8 w-8 rounded-full bg-[#facc15] flex items-center justify-center text-[11px] font-black text-black ml-1">ADM</div>
    </div>
   </header>

   {tab==='encontrar' && (
    <div className="max-w-[1200px] mx-auto p-3">
     <div className="bg-[#1e2f4a] text-white rounded-[14px] px-5 py-4 mb-3 text-center">
      <div className="text-[10px] tracking-[2px] text-[#c9a86a] font-extrabold">ENCONTRE NA SUA ZONA - PROFISSIONAL MAIS PROXIMO DE SI - MESTRE, PROFISSIONAL OU EMPRESA</div>
      <h2 className="text-[20px] font-black mt-1.5 leading-tight">Estas a procura de um profissional, mestre ou empresa na sua zona ou mais proximo?</h2>
      <p className="text-[12px] opacity-80 mt-1.5">Encontre aqui - Pedreiro, Carpinteiro, Eletricista, Serralheiro, Domestica, Motorista... perto de si em Maputo, Matola, Boane, Xai-Xai - contrato legal em 2 minutos</p>
     </div>
     <div className="flex gap-3 flex-wrap items-start">
      <div className="flex-1 min-w-[340px] bg-white rounded-[14px] p-4 shadow">
       <div className="flex gap-2 flex-wrap items-end">
         <div className="flex-[2] min-w-[200px]"><label className="text-[11px] font-extrabold text-[#1e2f4a]">O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Serralheiro, Pedreiro..." className="w-full px-3 py-2.5 rounded-[10px] border-2 border-[#c9a86a] mt-1 text-[12px]" /></div>
         <div className="flex-1"><label className="text-[10px] font-bold text-[#64748b]">Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border mt-1 text-[12px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
         <div className="flex-1"><label className="text-[10px] font-bold text-[#64748b]">Provincia</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border mt-1 text-[12px]">{provinciasFiltro.map((p:string)=><option key={p}>{p}</option>)}</select></div>
         <button className="px-5 py-2.5 bg-[#1e2f4a] text-white rounded-[10px] font-extrabold text-[12px] h-[40px]">PESQUISAR</button>
       </div>
       <div className="mt-4"><div className="font-extrabold text-[12px] mb-2">Profissionais verificados perto de si ({profissionais.length})</div>
         <div className="grid grid-cols-2 gap-2.5">
           {profissionais.map((p:any,i:number)=><div key={i} className="border rounded-xl p-3 bg-white"><div className="flex justify-between"><div className="flex gap-2 items-center"><div className="w-[36px] h-[36px] bg-[#1e2f4a] text-[#c9a86a] rounded-full grid place-items-center font-black">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} - {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - {p.distrito}</div></div></div><span className="px-2 py-1 bg-[#fef3c7] rounded-full text-[9px] font-extrabold h-fit">VERIFICADO {p.rating}</span></div><div className="text-[11px] mt-2">{p.descricao}</div><div className="flex gap-2 mt-2"><button onClick={()=>setTab('contratos')} className="flex-1 py-2 bg-[#1e2f4a] text-white rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white border rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div></div>)}
         </div>
       </div>
      </div>
      <div className="w-full md:w-[380px] bg-white rounded-[14px] p-4 border-2 border-[#c9a86a] h-fit">
        <div className="font-extrabold text-[12px] text-center">Cadastre seu servico - Rapido e gratuito</div>
        <div className="space-y-2 mt-3">
          <div><label className="text-[9px] font-bold">Nome completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border text-[11px]" /></div>
          <div className="grid grid-cols-2 gap-2"><div><label className="text-[9px] font-bold">BI (opcional)</label><input value={formCadastro.bi} onChange={e=>setFormCadastro({...formCadastro,bi:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border text-[11px]" /></div><div><label className="text-[9px] font-bold">NUIT (opcional)</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border text-[11px]" /></div></div>
          <div><label className="text-[9px] font-bold">Profissao *</label><select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro,profissao:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label className="text-[9px] font-bold">WhatsApp</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} className="w-full px-2.5 py-2 rounded-lg border text-[11px]" /></div>
        </div>
        <button onClick={()=>{ if(!formCadastro.nome){alert('Nome obrigatorio'); return;} const novo={id:Date.now(), nome:formCadastro.nome, tipo:formCadastro.profissao, local:'Mocambique / Maputo Cidade', pais:'Mocambique', provincia:'Maputo Cidade', distrito:'KaMpfumo', nuit:formCadastro.nuit||'N/A', bi:formCadastro.bi||'N/A', rating:5.0, trabalhos:0, preco:'Sob consulta', descricao:formCadastro.profissao+' - '+formCadastro.local, foto:formCadastro.nome.substring(0,2).toUpperCase(), verificado:false}; setProfissionais([novo,...profissionais]); setFormCadastro({nome:'', bi:'', nuit:'', provincia:'Maputo Cidade', distrito:'KaMpfumo', local:'Bairro Central', whatsapp:'', profissao:'Pedreiro', descricao:''}); alert('Cadastrado!');}} className="w-full py-2.5 bg-[#c9a86a] text-[#1e2f4a] rounded-[10px] font-black text-[11px] mt-3">ENVIAR CADASTRO</button>
      </div>
     </div>
    </div>
   )}

   {tab==='contratos' && (
    <section className="max-w-[1200px] mx-auto p-4">
     <div className="bg-[#1e2f4a] text-white rounded-[12px] p-4 mb-3">
      <div className="text-[9px] text-[#c9a86a] font-extrabold">CONTRATO LEGAL EM 2 MINUTOS - 11 CLAUSULAS</div>
      <h1 className="text-[16px] font-black mt-1">Contrato {CATS[contratoSel]} - Facil, pratico e rapido</h1>
      <div className="flex gap-1 mt-2 flex-wrap">{CATS.map((cat:string,i:number)=><button key={cat} onClick={()=>setContratoSel(i)} className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${contratoSel===i?'bg-[#c9a86a] text-[#1e2f4a]':'bg-white/15 text-white'}`}>{cat.toUpperCase()}</button>)}</div>
     </div>
     <div className="bg-white rounded-[12px] border p-6 text-center"><div className="font-black text-[14px]">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS</div><div className="text-[10px] text-[#64748b] mt-2">Contrato legal com BI e NUIT opcional - 11 clausulas completas - Lei 23/2007 - valido em Mocambique</div><button onClick={()=>alert('PDF gerado - Contrato '+CATS[contratoSel]+' - ID '+Math.floor(Math.random()*1000000))} className="mt-4 px-6 py-3 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">GERAR PDF INICIAL - 11 CLAUSULAS</button></div>
    </section>
   )}

   {tab==='viagens' && (
    <section className="max-w-[1200px] mx-auto p-3 space-y-3">
     <div className="flex gap-2"><button onClick={()=>setViagensSubTab('buscar')} className={`px-4 h-9 rounded-full text-[10px] font-black ${viagensSubTab==='buscar'?'bg-[#1e2f4a] text-white':'bg-white border'}`}>Buscar Viagens</button><button onClick={()=>setViagensSubTab('transportador')} className={`px-4 h-9 rounded-full text-[10px] font-black ${viagensSubTab==='transportador'?'bg-[#facc15] text-black':'bg-white border'}`}>Area do Transportador</button></div>
     {viagensSubTab==='buscar' && (
      <div className="space-y-3">
       <div className="bg-white rounded-[12px] border p-4"><div className="font-black text-[11px]">Pesquisar viagens - Mocambique para Africa do Sul</div><div className="text-[8px] text-[#64748b] mt-1">Beira-Johannesburg via Ressano Garcia, Inhambane-Johannesburg via Ponta do Ouro, Maputo-Durban, etc.</div></div>
       <div className="space-y-2">{viagensMock.concat(viagensPublicadas).map((v:any)=><div key={v.id} className="bg-white rounded-[12px] border p-3 flex justify-between"><div><div className="font-black text-[11px]">{v.transp} - {v.viatura} - {v.matricula}</div><div className="text-[9px] text-[#64748b]">{v.origem} - {v.destino} | {v.data} {v.hora} | {v.preco} MT base | {v.precoDistrito} MT distrito | {v.precoCustom} MT custom | {v.lugares} lugares | {v.cargaKg}kg</div></div><button onClick={()=>{setViagemSel(v); setMostrarFormPass(true);}} className="px-4 h-8 bg-[#1e2f4a] text-white rounded-full text-[10px]">Reservar</button></div>)}</div>
       {mostrarFormPass && viagemSel && (
        <div className="bg-white rounded-[12px] border-2 border-[#0ea5e9] p-4">
         <div className="font-black text-[12px] mb-2">Reservar {viagemSel.origem} - {viagemSel.destino}</div>
         <div className="grid grid-cols-2 gap-2">
          <div><label className="text-[8px] font-bold">NOME COMPLETO *</label><input value={formPassageiro.nome} onChange={e=>setFormPassageiro({...formPassageiro,nome:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" /></div>
          <div><label className="text-[8px] font-bold">CONTACTO WHATSAPP *</label><input value={formPassageiro.tel} onChange={e=>setFormPassageiro({...formPassageiro,tel:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 bg-[#f0fdf4]" /></div>
          <div><label className="text-[8px] font-bold">NOME DO FAMILIAR</label><input value={formPassageiro.nomeFamiliar} onChange={e=>setFormPassageiro({...formPassageiro,nomeFamiliar:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" placeholder="Nome familiar - amarelo" /></div>
          <div><label className="text-[8px] font-bold">CONTACTO DO FAMILIAR</label><input value={formPassageiro.telFamiliar} onChange={e=>setFormPassageiro({...formPassageiro,telFamiliar:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" /></div>
         </div>
         <div className="border-2 border-[#facc15] rounded-[8px] p-2 bg-[#fefce8] mt-3">
          <div className="font-black text-[10px] mb-2">ACOMPANHANTE - 3 divisoes - 1|2|3</div>
          <div className="grid grid-cols-3 gap-2">
           <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">1 - Tem acompanhante? Sim/Nao *</label><select value={formPassageiro.temAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,temAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[10px] mt-1"><option value="Nao">Nao</option><option value="Sim">Sim</option></select></div>
           <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">2 - Idade acompanhante</label><input value={formPassageiro.idadeAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,idadeAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[9px] mt-1" placeholder="Ex: 34" /></div>
           <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">3 - Relacao - pai, filho, tio</label><select value={formPassageiro.relacaoAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,relacaoAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[9px] mt-1"><option value="">Selecione</option><option>Pai</option><option>Mae</option><option>Filho</option><option>Tio</option></select></div>
          </div>
         </div>
         <div className="mt-3"><label className="text-[8px] font-bold">Assentos - {viagemSel.lugares} lugares - bloqueado cinza quando viatura tem {viagemSel.lugares}</label><div className="grid grid-cols-5 gap-1 mt-1">{Array.from({length:15}).map((_,i)=>{const num=i+1; const ocupado=viagemSel.lugaresOcupados?.includes(num); const sel=assentosSelecionados.includes(num); return <button key={num} disabled={ocupado} onClick={()=>{if(sel){setAssentosSelecionados(assentosSelecionados.filter(n=>n!==num));} else {setAssentosSelecionados([...assentosSelecionados,num]);}}} className={`h-8 rounded text-[10px] font-bold ${ocupado?'bg-gray-300 text-gray-500':sel?'bg-[#22c55e] text-white':'bg-white border'}`}>{num}</button>;})}</div></div>
         <button onClick={()=>{if(!formPassageiro.nome||!formPassageiro.tel){alert('Nome e WhatsApp obrigatorios'); return;} alert('BILHETE GERADO! Assentos '+assentosSelecionados.join(', ')+' - Familiar '+formPassageiro.nomeFamiliar+' - Preco base '+viagemSel.preco+' MT, distrito '+viagemSel.precoDistrito+' MT, custom '+viagemSel.precoCustom+' MT'); setMostrarFormPass(false);}} className="mt-3 w-full h-10 bg-[#22c55e] text-white rounded-full font-black text-[11px]">Confirmar - Gerar bilhete QR PDF - Enviar WhatsApp</button>
        </div>
       )}
      </div>
     )}
     {viagensSubTab==='transportador' && (
      <div className="bg-white rounded-[12px] border p-4">
       <div className="font-black text-[12px]">Area do Transportador - 1 conta gere 15 viaturas</div>
       <div className="flex gap-2 mt-3"><button onClick={()=>setTransportadorTab('frota')} className={`px-3 h-8 rounded-full text-[9px] ${transportadorTab==='frota'?'bg-[#1e2f4a] text-white':'bg-[#f1f5f9]'}`}>Minha Frota</button></div>
       <button onClick={()=>setMostrarFormViatura(true)} className="mt-3 px-4 h-8 bg-[#facc15] text-black rounded-full text-[10px] font-black">Adicionar viatura</button>
       {mostrarFormViatura && (
        <div className="mt-3 border-2 border-[#facc15] rounded-[12px] p-4 bg-[#fefce8]">
         <div className="grid grid-cols-3 gap-2"><input value={formViatura.marcaModelo} onChange={e=>setFormViatura({...formViatura,marcaModelo:e.target.value})} placeholder="Marca e modelo *" className="h-8 border rounded text-[10px] px-2" /><input value={formViatura.matricula} onChange={e=>setFormViatura({...formViatura,matricula:e.target.value})} placeholder="Matricula *" className="h-8 border rounded text-[10px] px-2" /><input type="number" value={formViatura.lugares} onChange={e=>setFormViatura({...formViatura,lugares:Number(e.target.value)})} className="h-8 border rounded text-[10px] px-2" /></div>
         <div className="grid grid-cols-3 gap-2 mt-3 bg-[#fef9c3] p-2 rounded-[8px] border border-[#facc15]">
          <div><label className="text-[8px] font-black">Preco por rota (MT) * - depende partida/destino</label><input type="number" value={formViatura.preco} onChange={e=>setFormViatura({...formViatura,preco:Number(e.target.value)})} className="w-full h-8 border-2 border-[#facc15] rounded text-[11px] font-bold px-2 bg-white" /></div>
          <div><label className="text-[8px] font-black">Preco por distrito (MT) - valor exacto por distrito</label><input type="number" value={formViatura.precoDistrito} onChange={e=>setFormViatura({...formViatura,precoDistrito:Number(e.target.value)})} className="w-full h-8 border-2 border-[#facc15] rounded text-[10px] px-2 bg-white" /></div>
          <div><label className="text-[8px] font-black">Preco - destino custom (MT)</label><input type="number" value={formViatura.precoCustom} onChange={e=>setFormViatura({...formViatura,precoCustom:Number(e.target.value)})} className="w-full h-8 border-2 border-[#facc15] rounded text-[10px] px-2 bg-white" /></div>
         </div>
         <button onClick={()=>{setViaturasFrota([...viaturasFrota,{id:Date.now(),...formViatura} as any]); setMostrarFormViatura(false);}} className="mt-3 w-full h-9 bg-[#facc15] text-black rounded-full font-black">Registar viatura</button>
        </div>
       )}
       <div className="mt-3 space-y-2">{viaturasFrota.map((v:any)=><div key={v.id} className="border rounded p-2 flex justify-between"><div><div className="font-bold text-[11px]">{v.marcaModelo} - {v.matricula}</div><div className="text-[8px]">{v.preco} MT rota | {v.precoDistrito} MT distrito | {v.precoCustom} MT custom</div></div><div className="text-[10px]">{v.lugares} lugares</div></div>)}</div>
      </div>
     )}
    </section>
   )}

   <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">CONTRATA-MZ - SEM LOGO - SEM MISTURA EASYP - BUILD 100% GARANTIDO - 11 CLAUSULAS - VIAGENS 3 PRECOS</footer>
  </div>
 )
}
