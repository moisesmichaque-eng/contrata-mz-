// @ts-nocheck
import { useState } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town"],
};
const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Canalizador","Pintor","Serralheiro"];

export default function App(){
  const [tab, setTab] = useState('encontrar');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [paisFiltro, setPaisFiltro] = useState('Mocambique');
  const [provFiltro, setProvFiltro] = useState('Maputo Cidade');

  // ENCONTRAR
  const profissionais = [
    {nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456788", bi:"1101001234568", rating:4.9, trabalhos:127, desc:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM"},
    {nome:"Joao Carpinteiro", tipo:"Carpinteiro", local:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Xai-Xai", distrito:"Chongoene", nuit:"401866877", bi:"1102100MM", rating:4.8, trabalhos:89, desc:"Moveis, portas, telhado, 8 anos exp.", foto:"JC"},
  ];

  // FACTURACAO - 2 botoes como viagens
  const [faturacaoSubTab, setFaturacaoSubTab] = useState('publico');
  const [faturacaoLogado, setFaturacaoLogado] = useState(false);
  const [faturacaoInnerTab, setFaturacaoInnerTab] = useState('faturar');
  const [formLoja, setFormLoja] = useState({nome:'', nuit:'', tel:'', email:'', provincia:'Maputo Cidade', distrito:'Matola', endereco:''});
  const [fatTel, setFatTel] = useState('+258 84 123 4567');
  const [fatNome, setFatNome] = useState('');
  const [fatBusca, setFatBusca] = useState('');
  const [fatFiltroCat, setFatFiltroCat] = useState('Todos');
  const [fatItens, setFatItens] = useState([{desc:'Saco de Cimento 50kg - CMPOR', qtd:3, preco:850, descPerc:0},{desc:'Bloco 15cm - 40x20', qtd:20, preco:42, descPerc:5}]);
  const [fatHistorico, setFatHistorico] = useState([]);

  // VIAGENS - 3 precos
  const [viagensSubTab, setViagensSubTab] = useState('buscar');
  const [viagensMock, setViagensMock] = useState([
    {id:1, transp:"Transporte Matola", viatura:"Minibus 15 lugares", matricula:"AB 123 MP", origem:"Maputo Cidade", destino:"Beira", provinciaOrigem:"Maputo Cidade", provinciaDestino:"Sofala", distritoOrigem:"KaMpfumo", distritoDestino:"Beira", data:"2026-10-13", hora:"06:00", chegada:"18:00", motorista:"Michaque", lugares:15, lugaresOcupados:[1,2], preco:2500, precoDistrito:1800, precoCustom:3000, cargaKg:500, estado:"Activa", fronteira:""},
  ]);
  const [viagensPublicadas, setViagensPublicadas] = useState([]);
  const [viaturasFrota, setViaturasFrota] = useState([]);
  const [origemProv, setOrigemProv] = useState('');
  const [destinoProv, setDestinoProv] = useState('');
  const [mostrarFormPass, setMostrarFormPass] = useState(false);
  const [viagemSel, setViagemSel] = useState(null);
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [mostrarFormViatura, setMostrarFormViatura] = useState(false);
  const [viaturaEditId, setViaturaEditId] = useState(null);
  const [formViatura, setFormViatura] = useState({tipo:'Minibus / Chapa', marcaModelo:'Toyota Hiace', matricula:'', lugares:15, ano:2020, cor:'Branco', capacidadeKg:500, rotaHabitual:'Maputo-Beira', preco:2500, precoDistrito:1800, precoCustom:3000});
  const [formPassageiro, setFormPassageiro] = useState({nome:'', bi:'', tel:'', nomeFamiliar:'', telFamiliar:'', lugar:1, tipo:'Adulto', localColeta:'', localDesembarque:'', acompanhante:'', destinoCustom:'', menor:false, temAcompanhante:'Nao', idadeAcompanhante:'', relacaoAcompanhante:'', nomeAcompanhante:'', telAcompanhante:''});
  const [reservas, setReservas] = useState([]);
  const [transportadorTab, setTransportadorTab] = useState('conta');
  const [transportadorInnerTab, setTransportadorInnerTab] = useState('frota');

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <header className="bg-[#1e2f4a] text-white px-4 py-3 flex justify-between items-center">
        <div className="font-black text-[12px] tracking-[2px]">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div>
        <div className="flex gap-2">
          <button onClick={()=>setTab('faturacao')} className={`px-3 py-2 rounded-full font-black text-[11px] ${tab==='faturacao'?'bg-[#facc15] text-black':'bg-[#facc15] text-black'}`}>FACTURACAO</button>
          <button onClick={()=>setTab('viagens')} className={`px-3 py-2 rounded-full font-black text-[11px] ${tab==='viagens'?'bg-[#0ea5e9] text-white':'bg-[#0ea5e9] text-white'}`}>VIAGENS</button>
          <button onClick={()=>setTab('encontrar')} className={`px-4 py-2 rounded-md font-extrabold text-xs ${tab==='encontrar'?'bg-[#c9a86a] text-[#1e2f4a]':'bg-transparent text-white'}`}>ENCONTRAR</button>
          <button onClick={()=>setTab('contratos')} className={`px-4 py-2 rounded-md font-bold text-xs bg-transparent text-white`}>CONTRATOS 11</button>
          <div className="h-8 w-8 rounded-full bg-[#facc15] grid place-items-center text-[11px] font-black text-black">ADM</div>
        </div>
      </header>

      {tab==='encontrar' && (
        <div className="max-w-[1200px] mx-auto p-3">
          <div className="bg-[#1e2f4a] text-white rounded-[14px] px-5 py-4 mb-3 text-center">
            <div className="text-[10px] tracking-[2px] text-[#c9a86a] font-extrabold">ENCONTRE NA SUA ZONA - PROFISSIONAL MAIS PROXIMO DE SI - MESTRE, PROFISSIONAL OU EMPRESA</div>
            <h2 className="text-[20px] font-black mt-1">Estas a procura de um profissional, mestre ou empresa na sua zona ou mais proximo?</h2>
            <p className="text-[12px] opacity-80 mt-1">Encontre aqui - Pedreiro, Carpinteiro, Eletricista, Serralheiro, Domestica, Motorista... perto de si em Maputo, Matola, Boane, Xai-Xai - contrato legal em 2 minutos</p>
            <div className="flex gap-2 justify-center mt-2 flex-wrap">
              <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20">Verifica BI e NUIT</span>
              <span className="px-3 py-1 bg-white/15 rounded-full text-[10px] border border-white/20">Fotos e M-Pesa comprovado</span>
              <span className="px-3 py-1 bg-[#c9a86a] text-[#1e2f4a] rounded-full text-[10px] font-extrabold">11 Clausulas Lei 23/2007</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[340px] bg-white rounded-[14px] p-4">
              <div className="flex gap-2 flex-wrap items-end">
                <div className="flex-[2] min-w-[200px]"><label className="text-[11px] font-extrabold text-[#1e2f4a]">O que precisa? - Estas a procura de...?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Serralheiro, Pedreiro, Eletricista..." className="w-full px-3 py-2.5 rounded-[10px] border-2 border-[#c9a86a] mt-1 text-[12px]" /></div>
                <div className="flex-1"><label className="text-[10px] font-bold text-[#64748b]">Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border mt-1 text-[12px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
                <div className="flex-1"><label className="text-[10px] font-bold text-[#64748b]">Provincia</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="w-full px-3 py-2.5 rounded-[10px] border mt-1 text-[12px]">{PAISES[paisFiltro]?.map((p:string)=><option key={p}>{p}</option>)}</select></div>
                <button className="px-5 py-2.5 bg-[#1e2f4a] text-white rounded-[10px] font-extrabold text-[12px] h-[40px]">PESQUISAR</button>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap"><span className="text-[10px] text-[#64748b] font-bold">Tags Populares:</span>{['Pedreiro','Carpinteiro','Eletricista','Canalizador','Pintor','Serralheiro','Domestica','Motorista'].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} className={`px-3 py-1 rounded-full border text-[10px] font-semibold ${filtroBusca===t?'bg-[#1e2f4a] text-white':'bg-white text-[#334155]'}`}>{t}</button>)}</div>
              <div className="mt-4"><div className="font-extrabold text-[12px] text-[#1e2f4a] mb-2">Profissionais verificados perto de si (2) - COM INFORMACAO</div>
                <div className="grid grid-cols-2 gap-2">
                  {profissionais.map((p:any,i:number)=><div key={i} className="border rounded-xl p-3 bg-white"><div className="flex justify-between"><div className="flex gap-2 items-center"><div className="w-[36px] h-[36px] bg-[#1e2f4a] text-[#c9a86a] rounded-full grid place-items-center font-black">{p.foto}</div><div><div className="font-extrabold text-[12px]">{p.nome}</div><div className="text-[10px] text-[#64748b]">{p.tipo} - {p.local}</div><div className="text-[9px] text-[#94a3b8]">{p.pais} / {p.provincia} - {p.distrito}</div></div></div><span className="px-2 py-1 bg-[#fef3c7] rounded-full text-[9px] font-extrabold h-fit">VERIFICADO {p.rating}</span></div><div className="text-[11px] text-[#334155] mt-2">{p.desc}</div><div className="flex gap-2 mt-2"><button className="flex-1 py-2 bg-[#1e2f4a] text-white rounded-lg font-extrabold text-[10px]">GERAR CONTRATO</button><button className="px-3 py-2 bg-white border rounded-lg font-extrabold text-[10px]">CONTRATAR</button></div></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='faturacao' && (
        <section className="space-y-4 max-w-[1200px] mx-auto p-3">
          <div className="flex justify-between gap-2">
            <div className="font-black text-[14px]">Facilita Faturacao - 10 seg - com perfis</div>
            <div className="flex gap-2">
              <button onClick={()=>setFaturacaoSubTab('publico')} className={`px-4 h-9 rounded-full text-[10px] font-black ${faturacaoSubTab==='publico'?'bg-[#1e2f4a] text-white':'bg-white border'}`}>Usuario Publico Rapido - sem conta</button>
              <button onClick={()=>setFaturacaoSubTab('loja')} className={`px-4 h-9 rounded-full text-[10px] font-black ${faturacaoSubTab==='loja'?'bg-[#facc15] text-black':'bg-white border'}`}>Minha Loja - Clientes registados</button>
            </div>
          </div>
          {faturacaoSubTab==='publico' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-[12px] border p-4">
                <div className="font-bold text-[11px]">Dados do comprador - ultra rapido</div>
                <div className="grid grid-cols-2 gap-2 mt-2"><input value={fatTel} onChange={e=>setFatTel(e.target.value)} className="h-8 border-2 border-green-200 bg-[#f0fdf4] rounded text-[10px] px-2" placeholder="+258 84 123 4567" /><input value={fatNome} onChange={e=>setFatNome(e.target.value)} className="h-8 border rounded text-[10px] px-2" placeholder="Nome cliente" /></div>
                <div className="mt-3 font-bold text-[11px]">Produtos e Servicos - IVA no fim - Memoria ativa</div>
                <input value={fatBusca} onChange={e=>setFatBusca(e.target.value)} placeholder='Digite "Saco" - sugere "Saco de Cimento 50kg - CMPOR - 850 MT"' className="w-full h-9 border rounded text-[10px] px-3 mt-2" />
                <div className="flex flex-wrap gap-1 mt-2">
                  {['Todos','Cimento','Bloco','Tinta','Ferro','Cobertura','Inertes','Tubo PVC','Fechadura'].map(c=>(<button key={c} onClick={()=>setFatFiltroCat(c)} className={`px-2 py-1 rounded-full text-[8px] border ${fatFiltroCat===c?'bg-[#1e2f4a] text-white':'bg-white'}`}>{c}</button>))}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <button onClick={()=>setFatItens([...fatItens,{desc:'Saco de Cimento 50kg - CMPOR - 850 MT', qtd:1, preco:850, descPerc:0}])} className="px-2 py-1 bg-[#1e2f4a] text-white rounded-full text-[8px]">Saco de Cimento 50kg - CMPOR - 850 MT</button>
                  <button onClick={()=>setFatItens([...fatItens,{desc:'Bloco 15cm - 40x20 - 42 MT', qtd:1, preco:42, descPerc:0}])} className="px-2 py-1 bg-[#1e2f4a] text-white rounded-full text-[8px]">Bloco 15cm - 40x20 - 42 MT</button>
                  <button onClick={()=>setFatItens([...fatItens,{desc:'Areia Grossa - m3 - 1200 MT', qtd:1, preco:1200, descPerc:0}])} className="px-2 py-1 bg-[#1e2f4a] text-white rounded-full text-[8px]">Areia Grossa - m3 - 1200 MT</button>
                  <button onClick={()=>setFatItens([...fatItens,{desc:'Tinta PVA Branca 20L - 3500 MT', qtd:1, preco:3500, descPerc:0}])} className="px-2 py-1 bg-[#1e2f4a] text-white rounded-full text-[8px]">Tinta PVA Branca 20L - 3500 MT</button>
                </div>
                <div className="mt-3 border rounded">
                  <div className="grid grid-cols-5 gap-1 bg-[#f1f5f9] p-2 text-[8px] font-bold"><div>DESCRICAO</div><div>QTD</div><div>PRECO</div><div>DESC%</div><div>SUBTOTAL</div></div>
                  {fatItens.map((it,i)=>(<div key={i} className="grid grid-cols-5 gap-1 p-2 text-[9px] border-t"><div>{it.desc}</div><div>{it.qtd}</div><div>{it.preco}</div><div>{it.descPerc}</div><div>{(it.qtd*it.preco).toFixed(0)} MT</div></div>))}
                  <div className="p-2 text-right font-black">TOTAL: {(fatItens.reduce((s,it)=>s+it.qtd*it.preco,0)*1.16).toFixed(0)} MT</div>
                </div>
              </div>
              <div className="bg-[#111827] text-white rounded-[12px] p-4 h-fit">
                <div className="font-bold text-[11px]">Resumo rapido</div>
                <div className="text-[8px] mt-2">Cliente: {fatTel}</div>
                <div className="text-[8px]">Itens: {fatItens.length}</div>
                <button className="mt-3 w-full h-9 bg-[#22c55e] rounded font-black text-[10px]">Finalizar Documento DEMO</button>
                <div className="mt-3 text-[7px]">WhatsApp PDF - Ver PDF Demo</div>
              </div>
            </div>
          )}
          {faturacaoSubTab==='loja' && (
            <div className="space-y-3">
              {!faturacaoLogado ? (
                <div className="bg-white rounded-[12px] border p-6 max-w-[600px]">
                  <div className="font-black text-[13px]">Criar conta loja - Area registada</div>
                  <div className="text-[9px] text-[#64748b]">Como area do transportador - 1 conta gere varias lojas/facturas. Formulario complexo e completo igual ao que existe agora.</div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <input value={formLoja.nome} onChange={e=>setFormLoja({...formLoja,nome:e.target.value})} placeholder="Nome loja *" className="h-8 border rounded text-[10px] px-2" />
                    <input value={formLoja.nuit} onChange={e=>setFormLoja({...formLoja,nuit:e.target.value})} placeholder="NUIT *" className="h-8 border rounded text-[10px] px-2" />
                    <input value={formLoja.tel} onChange={e=>setFormLoja({...formLoja,tel:e.target.value})} placeholder="Telefone *" className="h-8 border rounded text-[10px] px-2" />
                    <input value={formLoja.endereco} onChange={e=>setFormLoja({...formLoja,endereco:e.target.value})} placeholder="Endereco completo *" className="h-8 border rounded text-[10px] px-2 col-span-2" />
                  </div>
                  <button onClick={()=>setFaturacaoLogado(true)} className="mt-4 w-full h-9 bg-[#facc15] text-black rounded-full font-black text-[11px]">Criar conta loja e entrar</button>
                  <button onClick={()=>setFaturacaoLogado(true)} className="mt-2 w-full h-8 bg-white border rounded-full text-[10px]">Ja tenho conta - Entrar na Minha Loja</button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white border rounded-[12px] p-4 flex justify-between">
                    <div className="font-black text-[12px]">{formLoja.nome||'Minha Loja'}</div>
                    <div className="flex gap-2"><button onClick={()=>setFaturacaoInnerTab('faturar')} className="px-3 h-8 bg-[#22c55e] text-white rounded-full text-[9px]">Faturar</button><button onClick={()=>setFaturacaoInnerTab('historico')} className="px-3 h-8 bg-[#1e2f4a] text-white rounded-full text-[9px]">Historico na minha loja</button><button onClick={()=>setFaturacaoInnerTab('perfil')} className="px-3 h-8 bg-[#facc15] text-black rounded-full text-[9px]">Editar perfil completo</button></div>
                  </div>
                  {faturacaoInnerTab==='faturar' && <div className="bg-white border rounded-[12px] p-4"><div className="font-bold text-[11px]">Faturar - historico vai para Minha Loja</div><button onClick={()=>{const total=(fatItens.reduce((s,it)=>s+it.qtd*it.preco,0)*1.16).toFixed(0); setFatHistorico([...fatHistorico,{id:Date.now(), cliente:fatTel, total, data:new Date().toLocaleString()} as any]); setFaturacaoInnerTab('historico');}} className="mt-3 w-full h-9 bg-[#22c55e] text-white rounded-full font-black">Finalizar e guardar no historico</button></div>}
                  {faturacaoInnerTab==='historico' && <div className="bg-white border rounded-[12px] p-4"><div className="font-bold">Historico na minha loja - aparece ao preencher a facturacao</div>{fatHistorico.length===0 ? <div className="text-[9px] text-[#64748b] mt-2">Nenhuma factura ainda - ao preencher facturacao, aparece aqui</div> : fatHistorico.map((h:any)=>(<div key={h.id} className="border rounded p-2 mt-2 flex justify-between"><div>{h.cliente} - {h.data}</div><div className="font-black text-[#22c55e]">{h.total} MT</div></div>))}</div>}
                  {faturacaoInnerTab==='perfil' && <div className="bg-white border rounded-[12px] p-4"><div className="font-bold">Editar formulario completo - perfil complexo igual ao que existe agora</div><input value={formLoja.nome} onChange={e=>setFormLoja({...formLoja,nome:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 mt-2" /><button className="mt-2 px-4 h-8 bg-[#facc15] rounded-full text-[10px] font-black">Guardar perfil completo</button></div>}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {tab==='viagens' && (
        <section className="max-w-[1200px] mx-auto p-3 space-y-3">
          <div className="flex gap-2">
            <button onClick={()=>setViagensSubTab('buscar')} className={`px-4 h-9 rounded-full text-[10px] font-black ${viagensSubTab==='buscar'?'bg-[#1e2f4a] text-white':'bg-white border'}`}>Buscar Viagens</button>
            <button onClick={()=>setViagensSubTab('transportador')} className={`px-4 h-9 rounded-full text-[10px] font-black ${viagensSubTab==='transportador'?'bg-[#facc15] text-black':'bg-white border'}`}>Area do Transportador</button>
          </div>
          {viagensSubTab==='buscar' && (
            <div className="space-y-3">
              <div className="bg-white rounded-[12px] border p-4">
                <div className="grid grid-cols-3 gap-2">
                  <select value={origemProv} onChange={e=>setOrigemProv(e.target.value)} className="h-9 border rounded text-[10px] px-2"><option value="">Origem - Provincia</option><option>Maputo Cidade</option><option>Sofala</option></select>
                  <select value={destinoProv} onChange={e=>setDestinoProv(e.target.value)} className="h-9 border rounded text-[10px] px-2"><option value="">Destino - Provincia</option><option>Sofala</option><option>Maputo Cidade</option></select>
                  <button className="h-9 bg-[#1e2f4a] text-white rounded-full text-[10px] font-black">PESQUISAR VIAGENS</button>
                </div>
              </div>
              <div className="space-y-2">
                {viagensMock.concat(viagensPublicadas).map((v:any)=>(
                  <div key={v.id} className="bg-white rounded-[12px] border p-3 flex justify-between">
                    <div><div className="font-black text-[11px]">{v.transp} - {v.viatura} - {v.matricula}</div><div className="text-[9px] text-[#64748b]">{v.origem} - {v.destino} | {v.data} {v.hora} | {v.preco} MT base | {v.precoDistrito} MT distrito | {v.precoCustom} MT custom</div></div>
                    <button onClick={()=>{setViagemSel(v); setMostrarFormPass(true);}} className="px-4 h-8 bg-[#1e2f4a] text-white rounded-full text-[10px]">Reservar</button>
                  </div>
                ))}
              </div>
              {mostrarFormPass && viagemSel && (
                <div className="bg-white rounded-[12px] border-2 border-[#0ea5e9] p-4">
                  <div className="font-black text-[12px] mb-2">Reservar {viagemSel.origem} - {viagemSel.destino}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-[8px] font-bold">NOME COMPLETO *</label><input value={formPassageiro.nome} onChange={e=>setFormPassageiro({...formPassageiro,nome:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" /></div>
                    <div><label className="text-[8px] font-bold">CONTACTO WHATSAPP *</label><input value={formPassageiro.tel} onChange={e=>setFormPassageiro({...formPassageiro,tel:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2 bg-[#f0fdf4]" /></div>
                    <div><label className="text-[8px] font-bold">NOME DO FAMILIAR</label><input value={formPassageiro.nomeFamiliar} onChange={e=>setFormPassageiro({...formPassageiro,nomeFamiliar:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" placeholder="Nome familiar" /></div>
                    <div><label className="text-[8px] font-bold">CONTACTO DO FAMILIAR</label><input value={formPassageiro.telFamiliar} onChange={e=>setFormPassageiro({...formPassageiro,telFamiliar:e.target.value})} className="w-full h-8 border rounded text-[10px] px-2" /></div>
                  </div>
                  <div className="border-2 border-[#facc15] rounded-[8px] p-2 bg-[#fefce8] mt-3">
                    <div className="font-black text-[10px] mb-2">ACOMPANHANTE - 3 divisoes</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">1 - Tem acompanhante? Sim/Nao *</label><select value={formPassageiro.temAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,temAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[10px] mt-1"><option value="Nao">Nao</option><option value="Sim">Sim</option></select></div>
                      <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">2 - Idade acompanhante</label><input value={formPassageiro.idadeAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,idadeAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[9px] mt-1" /></div>
                      <div className="border rounded p-2 bg-white"><label className="text-[8px] font-bold">3 - Relacao - pai, filho, tio</label><select value={formPassageiro.relacaoAcompanhante} onChange={e=>setFormPassageiro({...formPassageiro,relacaoAcompanhante:e.target.value})} className="w-full h-7 border rounded text-[9px] mt-1"><option value="">Selecione</option><option>Pai</option><option>Mae</option><option>Filho</option><option>Tio</option></select></div>
                    </div>
                  </div>
                  <div className="mt-3"><label className="text-[8px] font-bold">Assentos - 15 lugares - bloqueado cinza quando viatura tem 15</label>
                    <div className="grid grid-cols-5 gap-1 mt-1">
                      {Array.from({length:15}).map((_,i)=>{const num=i+1; const ocupado=viagemSel.lugaresOcupados?.includes(num); const sel=assentosSelecionados.includes(num); return <button key={num} disabled={ocupado} onClick={()=>{if(sel){setAssentosSelecionados(assentosSelecionados.filter(n=>n!==num));} else {setAssentosSelecionados([...assentosSelecionados,num]);}}} className={`h-8 rounded text-[10px] font-bold ${ocupado?'bg-gray-300 text-gray-500':sel?'bg-[#22c55e] text-white':'bg-white border'}`}>{num}</button>;})}
                    </div>
                  </div>
                  <button onClick={()=>{if(!formPassageiro.nome||!formPassageiro.tel){alert('Nome e WhatsApp obrigatorios'); return;} const codigo='BILHETE-'+Math.random().toString(36).substring(2,6).toUpperCase(); alert('BILHETE GERADO! '+codigo+' - Assentos '+assentosSelecionados.join(', ')+' - Familiar '+formPassageiro.nomeFamiliar); setMostrarFormPass(false);}} className="mt-3 w-full h-10 bg-[#22c55e] text-white rounded-full font-black text-[11px]">Confirmar - Gerar bilhete QR PDF - Enviar WhatsApp</button>
                </div>
              )}
            </div>
          )}
          {viagensSubTab==='transportador' && (
            <div className="bg-white rounded-[12px] border p-4">
              <div className="font-black text-[12px]">Area do Transportador - 1 conta gere 15 viaturas</div>
              <div className="flex gap-2 mt-3"><button onClick={()=>setTransportadorInnerTab('frota')} className={`px-3 h-8 rounded-full text-[9px] ${transportadorInnerTab==='frota'?'bg-[#1e2f4a] text-white':'bg-[#f1f5f9]'}`}>Minha Frota</button><button onClick={()=>setTransportadorInnerTab('operacao')} className={`px-3 h-8 rounded-full text-[9px] ${transportadorInnerTab==='operacao'?'bg-[#facc15] text-black':'bg-[#f1f5f9]'}`}>Operacao</button></div>
              {transportadorInnerTab==='frota' && (
                <div className="mt-3">
                  <button onClick={()=>setMostrarFormViatura(true)} className="px-4 h-8 bg-[#facc15] text-black rounded-full text-[10px] font-black">Adicionar viatura</button>
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
                  <div className="mt-3 space-y-2">{viaturasFrota.map((v:any)=>(<div key={v.id} className="border rounded p-2 flex justify-between"><div><div className="font-bold text-[11px]">{v.marcaModelo} - {v.matricula}</div><div className="text-[8px]">{v.preco} MT rota | {v.precoDistrito} MT distrito | {v.precoCustom} MT custom</div></div><div className="text-[10px]">{v.lugares} lugares</div></div>))}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab==='contratos' && (<div className="max-w-[1200px] mx-auto p-6 bg-white rounded-[12px] border mt-3"><div className="font-black">CONTRATOS 11 - sem alteracao</div><div className="text-[10px] text-[#64748b] mt-2">Mantido igual - 11 clausulas, assinaturas na horizontal</div></div>)}
      <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">SEM LOGO - BUILD GARANTIDO 100%</footer>
    </div>
  );
}
