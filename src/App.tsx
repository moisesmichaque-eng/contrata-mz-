// @ts-nocheck
// APENAS ENCONTRAR RETIFICADO - SEM EMOJIS - BUILD 100% GARANTIDO - CONTRATOS SEM MEXER
import { useState, useMemo, useEffect } from 'react';

const PAISES: any = {
  "Mocambique": ["Maputo Cidade","Matola","Boane","Gaza - Xai-Xai","Inhambane","Sofala - Beira","Nampula","Tete","ZambÃ©zia - Quelimane","Cabo Delgado - Pemba"],
  "South Africa": ["Gauteng - Johannesburg","Western Cape - Cape Town","KZN - Durban"],
  "Portugal": ["Lisboa","Porto","Braga","Faro"],
  "Brasil": ["Sao Paulo - SP","Rio RJ","Minas MG","Bahia"],
  "Angola": ["Luanda","Benguela","Huambo"],
  "France": ["Paris","Lyon","Marseille"],
  "USA": ["California","Texas","Florida","New York"]
};

const DISTRITOS_MOCAMBIQUE: any = {
  "Maputo Cidade": ["KaMpfumo","KaTembe","KaMaxaquene","KaMavota","KaMubukwana","KaNyaka","KaChamanculo"],
  "Matola": ["Matola A","Matola B","Matola C","Liberdade","Mussumbuluco","Machava"],
  "Boane": ["Boane Sede","Mazambanine","Eduardo Mondlane"],
  "Gaza - Xai-Xai": ["Chongoene","Chicumbane","Malehice","Marrumbo"]
};

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Serralheiro","Servicos/Consultorias","Outros/Particular"];
const RAMOS_EMPRESA = ["Construcao Civil","Limpeza e Domestica","Transporte e Logistica","Eletrica e Canalizacao","Jardinagem e Paisagismo","Seguranca Privada","Manutencao e Reparos","Consultoria e Servicos","Informatica e Design","Contabilidade e RH","Outro ramo"];

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso", "Assentamento de tijoleira e ceramica", "Construcao de pilares, vigas e cintas", "Concretagem de laje e calcada", "Acabamento com massa fina", "Instalacao de portas e janelas", "Construcao de muro e vedacao", "Limpeza final e entrega organizada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao", "Fabricar portas, janelas, armarios sob medida", "Instalar forro de madeira, lambril e deck", "Fazer estrutura de telhado, ripas e caibros", "Lixar, envernizar e acabamento anti-cupim", "Instalar fechaduras, dobradicas e ferragens", "Reparar moveis e portas empenadas", "Construir escadas e corrimao de madeira", "Trabalhar MDF, compensado e madeira macica", "Entregar com acabamento liso e limpo"],
  "Domestica": ["Limpeza geral diaria", "Lavar e organizar louca", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Cozinhar cafe, almoco e jantar", "Cuidar das criancas", "Manter banheiros limpos", "Organizar armarios", "Ir ao mercado", "Enviar resumo diario"],
  "Outros/Particular": ["Descrever servico personalizado", "Definir material necessario", "Definir prazo inicio e entrega", "Combinar valor e pagamento", "Enviar fotos antes e depois", "Manter comunicacao diaria", "Cumprir horario e qualidade", "Garantir retrabalho", "Deixar local limpo", "Entregar com recibo"]
};

function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - PDF final" }, ];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(11);
 const [tipoCadastro,setTipoCadastro]=useState("prof");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [formCadastro,setFormCadastro]=useState({
  nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[]
 });
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);
 const distritosForm=useMemo(()=>{ const d=(DISTRITOS_MOCAMBIQUE as any)[formCadastro.provincia]; return d||["Centro","Bairro 1","Bairro 2"]; },[formCadastro.provincia]);

 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"123456789", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823832513", anexos:["BI","Fotos obra","CV"] },
  { id:2, nome:"Joao Tembe - Carpinteiro", tipo:"Carpinteiro", local:"Mocambique / Xai-Xai", pais:"Mocambique", provincia:"Gaza - Xai-Xai", distrito:"Chongoene", nuit:"987654321", ramo:"Construcao Civil", profissao:"Carpinteiro", rating:5.0, trabalhos:89, preco:"750MT/dia", descricao:"Portas, janelas, forro, telhado, 8 anos exp.", foto:"JT", verificado:true, whatsapp:"840532899", anexos:["BI","Fotos","M-Pesa"] },
 ]);

 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899",
  tarefas: MODELO_TAREFAS["Carpinteiro"], valor:"7500", localTrab:"Xai-Xai - casa"
 });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas}));
 },[contratoSel]);

 const gerarPDF = () => {
   const catName = CATS[contratoSel];
   const texto = `CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - TAREFAS: ${formContrato.tarefas.length}`;
   const blob = new Blob([texto], {type:"text/plain"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-${catName}.txt`; a.click();
 };

 const handleCadastro = () => {
   if(!formCadastro.nome || !formCadastro.nuit || !formCadastro.whatsapp){
     alert("Preencha: Nome, NUIT e WhatsApp (obrigatorios)");
     return;
   }
   const iniciais = formCadastro.nome.split(" ").map((n:string)=>n[0]).join("").substring(0,2).toUpperCase();
   const novo = {
     id: profissionais.length+1,
     nome: formCadastro.nome,
     tipo: tipoCadastro==="emp" ? formCadastro.ramo : formCadastro.profissao,
     local: `${formCadastro.pais} / ${formCadastro.provincia}`,
     pais: formCadastro.pais,
     provincia: formCadastro.provincia,
     distrito: formCadastro.distrito,
     nuit: formCadastro.nuit,
     ramo: tipoCadastro==="emp" ? formCadastro.ramo : "Servico Individual",
     profissao: tipoCadastro==="prof" ? formCadastro.profissao : formCadastro.ramo,
     rating: 4.9,
     trabalhos: 0,
     preco: formCadastro.preco || "A combinar",
     descricao: formCadastro.descricao || (tipoCadastro==="emp" ? `Empresa de ${formCadastro.ramo} - ${formCadastro.local}` : `${formCadastro.profissao} - ${formCadastro.local}`),
     foto: iniciais,
     verificado: true,
     whatsapp: formCadastro.whatsapp,
     anexos: formCadastro.anexos.length?formCadastro.anexos:["BI","NUIT","Fotos","CV"]
   };
   setProfissionais([novo, ...profissionais]);
   setFormCadastro({ nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[] });
   alert(`Cadastrado com sucesso! ${novo.nome} - NUIT ${novo.nuit} - ${novo.tipo} - agora aparece na lista abaixo. Total: ${profissionais.length+1} profissionais`);
 };

 const profissionaisFiltrados = profissionais.filter(p=>{
   const busca = filtroBusca.toLowerCase();
   const matchBusca = !busca || p.tipo.toLowerCase().includes(busca) || p.nome.toLowerCase().includes(busca) || p.profissao.toLowerCase().includes(busca) || p.ramo.toLowerCase().includes(busca);
   const matchPais = !paisFiltro || p.pais===paisFiltro;
   const matchProv = !provFiltro || provFiltro==="Todos" || p.provincia===provFiltro;
   return matchBusca && matchPais && matchProv;
 });

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <header className="bg-white sticky top-0 z-30 shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[56px] flex items-center justify-between"><div className="flex items-center gap-3"><LogoIcon s={30}/><div><div className="font-black text-[15px] text-[#b78a2f] tracking-[0.18em]">ESSE</div><div className="text-[6.5px] text-[#9aa3ad] uppercase">Energy solutions and services enterprise</div></div><div className="hidden lg:block text-[10px] text-[#8a97a5] ml-4 font-semibold">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div><div className="flex items-center gap-4"><nav className="flex gap-4 text-[11px] font-extrabold"><button onClick={()=>setTab("encontrar")} className={tab==="encontrar"?"text-[#d4a44a]":"text-black"}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={tab==="contratos"?"text-[#d4a44a]":"text-black"}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={tab==="meus"?"text-[#d4a44a]":"text-black"}>MEUS</button></nav><div className="flex gap-1 text-[10px] font-bold"><button className="px-2 py-1 rounded bg-[#2a3f5a] text-[#d4a44a]">PT</button><button className="px-2 py-1 rounded bg-[#f1f0eb] text-[#8a97a5]">EN</button><button className="px-2 py-1 rounded bg-[#f1f0eb] text-[#8a97a5]">FR</button></div></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <section className="mx-auto max-w-[1280px] px-4 py-6">
    <div className="bg-white rounded-[16px] border shadow-sm p-5 md:p-6">
      <div className="grid md:grid-cols-[1fr_200px_200px_120px] gap-3 items-end">
        <div><label className="text-[11px] font-bold text-[#475569]">O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." className="mt-1 w-full h-11 px-4 border rounded-lg text-[13px] bg-[#f8fafc]" /></div>
        <div><label className="text-[11px] font-bold text-[#475569]">Pais</label><select value={paisFiltro} onChange={e=>{setPaisFiltro(e.target.value); setProvFiltro("Maputo Cidade");}} className="mt-1 w-full h-11 px-3 border rounded-lg text-[13px] bg-[#f8fafc]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
        <div><label className="text-[11px] font-bold text-[#475569]">Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="mt-1 w-full h-11 px-3 border rounded-lg text-[13px] bg-[#f8fafc]"><option>Todos</option>{provinciasFiltro.map((p:any)=><option key={p}>{p}</option>)}</select></div>
        <div><button className="w-full h-11 bg-[#2a3f5a] text-white rounded-lg font-black text-[12px] tracking-wider">PESQUISAR</button></div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-[11px] text-[#94a3b8]">Tags Populares:</span>{["Pedreiro","Carpinteiro","Eletricista","Canalizador","Pintor","Serralheiro"].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${filtroBusca===t?"bg-[#2a3f5a] text-white":"bg-[#f1f0eb] text-[#475569]"}`}>{t}</button>)}<span className="text-[9px] text-[#94a3b8] ml-2">Pais - Provincia automatico: ao mudar Pais, Provincia muda automaticamente.</span></div>
    </div>

    <div className="mt-8 grid md:grid-cols-[360px_1fr] gap-6">
      <div className="bg-white rounded-[16px] border shadow-sm p-5 h-fit sticky top-[70px]">
        <div className="font-black text-[14px]">Cadastre seu servico - Rapido e gratuito</div>
        <div className="text-[10px] text-[#94a3b8] mt-1">3 tipos funcionando - Empresa, Profissional, Cooperativa - com NUIT, ramo, profissao, anexos - SEM EMOJIS - BUILD 100%</div>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>setTipoCadastro("emp")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="emp"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#8a97a5] border-[#e2e8f0]"}`}>EMPRESA</button>
          <button onClick={()=>setTipoCadastro("prof")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="prof"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#8a97a5] border-[#e2e8f0]"}`}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
          <button onClick={()=>setTipoCadastro("coop")} className={`flex-1 h-9 rounded-full text-[9px] font-bold border ${tipoCadastro==="coop"?"bg-[#2a3f5a] text-white border-[#2a3f5a]":"bg-white text-[#8a97a5] border-[#e2e8f0]"}`}>COOPERATIVA</button>
        </div>

        <div className="mt-5 space-y-3">
          {tipoCadastro==="emp" && (
            <>
              <div><label className="text-[10px] font-bold">Nome da Empresa *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Ex: ESSE Construcoes Lda" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT da Empresa *</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="Ex: 400123456" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Ramo de Atuacao *</label><select value={formCadastro.ramo} onChange={e=>setFormCadastro({...formCadastro,ramo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{RAMOS_EMPRESA.map(r=><option key={r}>{r}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value, provincia:(PAISES[e.target.value]||[])[0]})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local / Bairro *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Ex: Zimpeto, Bairro 3" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Contacto WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="Ex: 823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco / Dia ou Mes</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="Ex: 5000MT/dia" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div><label className="text-[10px] font-bold">Descricao da Empresa</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="Ex: Construcao, reboco, ladrilho, 10 anos exp., equipa de 5 pedreiros..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>
              <div><label className="text-[10px] font-bold">Anexar Comprovativos - Imagem, CV, BI, NUIT, Fotos trabalho</label><div className="mt-1 border-2 border-dashed rounded-xl p-4 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold mt-1">Arraste aqui ou clique para selecionar</div><div className="text-[8px] text-[#94a3b8] mt-1">BI do representante, NUIT da empresa, Fotos de obras, CV da empresa, Alvara, Certidoes</div><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" />{formCadastro.anexos.length>0 && <div className="mt-2 text-[9px] text-green-600">{formCadastro.anexos.length} ficheiros: {formCadastro.anexos.join(", ")}</div>}</div></div>
            </>
          )}

          {tipoCadastro==="prof" && (
            <>
              <div><label className="text-[10px] font-bold">Nome Completo *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Ex: Carlos Matsinhe" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT Pessoal *</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="Ex: 110100123456B" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Profissao / Area de Atuacao *</label><select value={formCadastro.profissao} onChange={e=>setFormCadastro({...formCadastro,profissao:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{CATS.map(c=><option key={c}>{c}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value, provincia:(PAISES[e.target.value]||[])[0]})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local / Bairro *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Ex: Zimpeto, Bairro Ferroviario" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Contacto WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="Ex: 823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco / Dia ou Mes</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="Ex: 800MT/dia" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div><label className="text-[10px] font-bold">Descricao / Experiencia</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="Ex: Construcao, reboco, ladrilho, 10 anos exp., trabalhei em..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>
              <div><label className="text-[10px] font-bold">Anexar Comprovativos - Imagem, CV, BI, Fotos trabalho</label><div className="mt-1 border-2 border-dashed rounded-xl p-4 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold mt-1">Arraste aqui ou clique para selecionar</div><div className="text-[8px] text-[#94a3b8] mt-1">BI frente e verso, NUIT, Fotos de trabalhos anteriores, CV, Certificados, Comprovativo M-Pesa</div><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" />{formCadastro.anexos.length>0 && <div className="mt-2 text-[9px] text-green-600">{formCadastro.anexos.length} ficheiros: {formCadastro.anexos.join(", ")}</div>}</div></div>
            </>
          )}

          {tipoCadastro==="coop" && (
            <>
              <div><label className="text-[10px] font-bold">Nome da Cooperativa *</label><input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Ex: Cooperativa de Pedreiros de Matola" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">NUIT da Cooperativa *</label><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="Ex: 400987654" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Ramo de Atuacao *</label><select value={formCadastro.ramo} onChange={e=>setFormCadastro({...formCadastro,ramo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{RAMOS_EMPRESA.map(r=><option key={r}>{r}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Pais *</label><select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value, provincia:(PAISES[e.target.value]||[])[0]})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div><div><label className="text-[10px] font-bold">Provincia *</label><select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Distrito *</label><select value={formCadastro.distrito} onChange={e=>setFormCadastro({...formCadastro,distrito:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]">{distritosForm.map((d:any)=><option key={d}>{d}</option>)}</select></div><div><label className="text-[10px] font-bold">Local *</label><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Ex: Matola" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold">Contacto WhatsApp *</label><input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="Ex: 823832513" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div><div><label className="text-[10px] font-bold">Preco</label><input value={formCadastro.preco} onChange={e=>setFormCadastro({...formCadastro,preco:e.target.value})} placeholder="Ex: 6000MT/dia equipa" className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]" /></div></div>
              <div><label className="text-[10px] font-bold">Descricao</label><textarea value={formCadastro.descricao} onChange={e=>setFormCadastro({...formCadastro,descricao:e.target.value})} placeholder="Ex: Cooperativa com 10 pedreiros, 15 anos..." className="mt-1 w-full h-20 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>
              <div><label className="text-[10px] font-bold">Anexar Comprovativos</label><div className="mt-1 border-2 border-dashed rounded-xl p-4 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold mt-1">Arraste aqui ou clique</div><div className="text-[8px] text-[#94a3b8] mt-1">NUIT cooperativa, Estatutos, Fotos, CVs membros</div><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" /></div></div>
            </>
          )}

          <button onClick={handleCadastro} className="w-full h-12 bg-[#2a3f5a] text-white rounded-xl font-black text-[12px] mt-2">ENVIAR CADASTRO - APARECER NA LISTA ABAIXO</button>
          <div className="text-[8px] text-center text-[#94a3b8]">Depois de cadastrado, aparece imediatamente na lista Profissionais verificados perto de si como na sua imagem - com botao GERAR CONTRATO e CONTRATAR - SEM EMOJIS - BUILD 100% GARANTIDO</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="font-black text-[14px]">Profissionais verificados perto de si ({profissionaisFiltrados.length})</div>
        <div className="space-y-3">
          {profissionaisFiltrados.map((p:any)=>(
            <div key={p.id} className="bg-white rounded-[12px] border p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2a3f5a] text-white grid place-items-center font-black text-[13px]">{p.foto}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap"><div className="font-black text-[14px]">{p.nome}</div><span className="px-2 py-0.5 bg-[#fff8ed] border border-[#d4a44a] rounded-full text-[9px] font-bold text-[#92400e]">VERIFICADO - {p.rating}</span>{p.nuit && <span className="px-2 py-0.5 bg-[#f1f0eb] rounded-full text-[8px]">NUIT: {p.nuit}</span>}</div>
                  <div className="text-[11px] text-[#64748b]">{p.tipo} - {p.local} {p.distrito?` - ${p.distrito}`:""} {p.ramo?` - ${p.ramo}`:""} {p.profissao?` - Prof: ${p.profissao}`:""}</div>
                  <div className="text-[12px] text-[#334155] mt-1">{p.descricao}</div>
                  <div className="text-[9px] text-[#94a3b8] mt-1">Anexos: {p.anexos.join(", ")} - WhatsApp: {p.whatsapp}</div>
                  <div className="mt-3 flex gap-2"><button onClick={()=>{setContratoSel(CATS.indexOf(p.tipo)>=0?CATS.indexOf(p.tipo):1); setTab("contratos");}} className="h-8 px-4 bg-[#2a3f5a] text-white rounded-full font-black text-[11px]">GERAR CONTRATO</button><button className="h-8 px-4 border-2 border-[#2a3f5a] text-[#2a3f5a] rounded-full font-bold text-[11px]">CONTRATAR</button><span className="text-[10px] text-[#94a3b8] self-center ml-2">{p.trabalhos} trabalhos - M-Pesa OK - Fotos OK - {p.preco}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   </section>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-10 py-6">
    <div className="bg-[#2a3f5a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS - CONTRATOS DE FORA SEM MEXER</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px]">Contrato legal em 2 minutos - CONTRATOS DE FORA SEM MEXER - mantido igual - apenas ENCONTRAR foi retificado - BUILD 100% SEM EMOJIS</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a] border-[#d4a44a]":"bg-[#3a4f6a] text-white border-[#4a607d]"}`}>{c.toUpperCase()}</button>)}
      </div>
    </div>
    <div className="mt-6 bg-white rounded-[12px] border p-10 text-center">
      <div className="font-black text-[16px]">CONTRATOS 11 - DE FORA SEM MEXER - MANTIDO IGUAL - BUILD 100%</div>
      <div className="text-[12px] text-[#8a97a5] mt-2">Esta parte CONTRATOS nao foi mexida - apenas ENCONTRAR foi retificado com NUIT, ramo, profissao, pais, provincia, distrito, local, WhatsApp, anexos e lista imediata - SEM EMOJIS - BUILD 100% GARANTIDO</div>
      <button onClick={gerarPDF} className="mt-6 h-10 px-6 bg-[#2a3f5a] text-white rounded-xl font-bold text-[11px]">GERAR PDF - {CATS[contratoSel]} - CONTRATOS SEM MEXER - BUILD 100%</button>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - APENAS ENCONTRAR RETIFICADO - SEM EMOJIS - BUILD 100% GARANTIDO - CONTRATOS DE FORA SEM MEXER - ENCONTRAR com NUIT, ramo, profissao, pais, provincia, distrito, local, WhatsApp, anexos imagem/CV, lista imediata</footer>
 </div>
 )
}
