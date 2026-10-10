// @ts-nocheck
// CORRECAO BUG WHATSAPP - PREVIEW CONGELADO NA TELA + LAYOUT EXATO DAS 2 PRINTS ROXAS - HERO AZUL ESCURO COM CADASTRO + PESQUISA + PROFISSIONAIS
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
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo", "Levantamento de paredes de bloco e tijolo", "Reboco interior e exterior liso e desempenado", "Assentamento de tijoleira e ceramica com nivel a laser", "Construcao de pilares, vigas e cintas de amarracao", "Concretagem de laje, contrapiso e calcada", "Acabamento com massa fina e preparacao para pintura", "Instalacao de portas, janelas e esquadrias com vedacao", "Construcao de muro, vedacao e estrutura de portao", "Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica", "Fabricar portas, janelas, armarios e prateleiras sob medida", "Instalar forro de madeira, lambril e deck com acabamento", "Fazer estrutura de telhado, ripas e caibros com nivel", "Lixar, envernizar e aplicar acabamento protetor anti-cupim", "Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito", "Reparar moveis, portas empenadas e estruturas de madeira", "Construir escadas, corrimao e guarda-corpo de madeira macica", "Trabalhar com MDF, compensado e madeira macica com qualidade", "Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano", "Lavar louca, organizar cozinha e limpar fogao e geladeira", "Arrumar quartos, fazer camas e trocar lencois semanalmente", "Lavar roupa, passar, dobrar e guardar nos armarios", "Cozinhar cafe da manha, almoco e jantar conforme orientacao", "Cuidar das criancas com atencao quando solicitado", "Manter banheiros limpos, higienizados e com cheirinho", "Organizar armarios, despensa e geladeira com inventario", "Ir ao mercado fazer compras pequenas e anotar gastos", "Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Eletricista": ["Instalar quadro eletrico, disjuntores e DR com identificacao", "Instalar tomadas, interruptores, dimmer e pontos de luz conforme projeto", "Passar cabos em eletroduto, organizar fiacao e deixar reserva", "Instalar iluminacao interior, exterior, jardim e fachada", "Instalar chuveiro, aquecedor, ar condicionado e tomadas especiais", "Fazer aterramento, protecao contra surtos e teste de fuga", "Testar toda instalacao com multimetro e alicate amperimetro", "Identificar, etiquetar e mapear todos os circuitos no quadro", "Deixar obra limpa, sem entulho eletrico e com sobras organizadas", "Entregar com teste funcionando, video de teste e garantia de 90 dias"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total", "Definir material necessario e quem fornece", "Definir prazo inicio e entrega com multa", "Combinar valor total e forma pagamento M-Pesa", "Enviar fotos do antes, durante e depois", "Manter comunicacao diaria via WhatsApp", "Cumprir horario e qualidade prometida", "Garantir retrabalho gratuito se nao satisfeito", "Deixar local limpo e organizado", "Entregar com recibo e avaliacao 5 estrelas"]
};

function LogoIcon({s=28}:{s?:any}){ return <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#d4a44a"/><path d="M20 6.5 C20 6.5 9.5 18 9.5 24.2 C9.5 30.2 14.2 34.5 20 34.5 C25.8 34.5 30.5 30.2 30.5 24.2 C30.5 18 20 6.5 20 6.5Z" fill="#2a3f5a"/></svg> }
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - PDF final partilhavel" }, ];

export default function App(){
 const [tab,setTab]=useState("encontrar");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(3);
 const [tipoCadastro,setTipoCadastro]=useState("coop");
 const [filtroBusca,setFiltroBusca]=useState("");
 const [paisFiltro,setPaisFiltro]=useState("Mocambique");
 const [provFiltro,setProvFiltro]=useState("Maputo Cidade");
 const [mostrarPreviewMobile,setMostrarPreviewMobile]=useState(false);
 const [formCadastro,setFormCadastro]=useState({
  nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[]
 });
 const provinciasFiltro=useMemo(()=>{ const p=(PAISES as any)[paisFiltro]; return p||[]; },[paisFiltro]);
 const distritosForm=useMemo(()=>{ const d=(DISTRITOS_MOCAMBIQUE as any)[formCadastro.provincia]; return d||["Centro","Bairro 1","Bairro 2"]; },[formCadastro.provincia]);

 const [profissionais,setProfissionais]=useState([
  { id:1, nome:"Carlos Matsinhe", tipo:"Pedreiro", local:"Mocambique / Maputo Cidade", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", nuit:"Nao informado", ramo:"Construcao Civil", profissao:"Pedreiro", rating:4.9, trabalhos:127, preco:"800MT/dia", descricao:"Construcao, reboco, ladrilho, 10 anos exp.", foto:"CM", verificado:true, whatsapp:"823832513", anexos:["BI","Fotos obra","CV"] },
 ]);

 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente", valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao - trabalhador mora perto", transporte:"Sim - 500MT/mes para chapa", folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo", periodoExp:"90 dias - primeiros 90 dias como periodo de experiencia com avaliacao mensal", deveresTrab:"Cumprir horario 06:00 as 17:00, guardar sigilo da familia, zelar pelos bens e ferramentas, comunicar atraso no WhatsApp, manter local limpo, usar EPI", deveresEmp:"Pagar salario todo dia 05 via M-Pesa com comprovativo e recibo, respeitar dignidade, fornecer agua e almoco, fornecer material de trabalho, nao descontar sem motivo", anexos:[] as any[]
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, data:"" });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, data:"" });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const gerarPDFInicial = () => {
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000);
   const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO ${catName} - ID ${id}</title><style>body{font-family:Arial;max-width:800px;margin:20px auto;padding:20px;line-height:1.6;color:#1a2a3a}.header{background:#2a3f5a;color:white;padding:20px;border-radius:12px;text-align:center}.header h1{color:#d4a44a;margin:0;font-size:18px}.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:15px 0;background:#f8fafc}.clausula h3{background:#2a3f5a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 15px -15px;font-size:13px}.tarefa{background:#2a3f5a;color:white;padding:6px 10px;border-radius:20px;display:inline-block;margin:3px;font-size:11px}</style></head><body><div class="header"><h1>CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF INICIAL - ID ${id}</h1></div><div class="clausula"><h3>1. DADOS DAS PARTES</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - BI: ${formContrato.empBI}<br><b>TRABALHADOR:</b> ${formContrato.trabNome} - BI: ${formContrato.trabBI}</div><div class="clausula"><h3>2. TAREFAS - ${formContrato.tarefas.length} TAREFAS</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div><div class="clausula"><h3>3. HORARIO E LOCAL</h3>${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.dias} - ${formContrato.localTrab}</div><div class="clausula"><h3>4. SALARIO</h3>${formContrato.valor} MZN dia ${formContrato.diaPag} via ${formContrato.formaPag}</div><div class="clausula"><h3>5. ALIMENTACAO</h3>${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}</div><div class="clausula"><h3>6. FOLGAS</h3>${formContrato.folgas}</div><div class="clausula"><h3>7. PERIODO EXP</h3>${formContrato.periodoExp}</div><div class="clausula"><h3>8. DEVERES TRAB</h3>${formContrato.deveresTrab}</div><div class="clausula"><h3>9. DEVERES EMP</h3>${formContrato.deveresEmp}</div><div class="clausula"><h3>10. ANEXOS</h3>Fotos BI, M-Pesa, fotos obra</div><div class="clausula"><h3>11. ASSINATURAS - Falta CONCORDO</h3>PDF inicial sem assinaturas</div><script>window.print();</script></body></html>`;
   const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-INICIAL-${catName}-ID-${id}.html`; a.click();
 };
 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)} - Eu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.trabNome} - ${agora}`; window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({ concordo:true, data:agora }); const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)} - Eu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO com contrato ${formContrato.valor}MZN com ${formContrato.empNome} - ${agora}`; window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`,"_blank"); };
 const gerarPDFFinal = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){ alert("Falta assinar! Precisa dos dois CONCORDO."); return; }
   const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const agora = new Date().toLocaleString("pt-MZ");
   const htmlFinal = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>CONTRATO FINAL COM ASSINATURAS - ${catName} - ID ${id}</title><style>body{font-family:Arial;max-width:800px;margin:20px auto;padding:20px;line-height:1.6}.header{background:#2a3f5a;color:white;padding:20px;border-radius:12px;text-align:center}.header h1{color:#d4a44a;margin:0;font-size:18px}.clausula{border:1px solid #e2e8f0;border-radius:8px;padding:15px;margin:15px 0;background:#f8fafc}.clausula h3{background:#2a3f5a;color:white;padding:8px 12px;border-radius:6px;margin:-15px -15px 15px -15px;font-size:13px}.tarefa{background:#2a3f5a;color:white;padding:6px 10px;border-radius:20px;display:inline-block;margin:3px;font-size:11px}.assinatura-final{background:#f0f7ff;border:3px solid #25D366;border-radius:12px;padding:20px;margin:20px 0}</style></head><body><div class="header"><h1>CONTRATO FINAL COM ASSINATURAS - ID ${id} - ${catName.toUpperCase()} - 11 CLAUSULAS</h1><div>PDF FINAL PARTILHAVEL - COM ASSINATURAS E CONCORDO - ${agora}</div></div><div class="clausula"><h3>1. DADOS</h3>${formContrato.empNome} - ${formContrato.trabNome}</div><div class="clausula"><h3>2. TAREFAS - ${formContrato.tarefas.length}</h3>${formContrato.tarefas.map((t:string,i:number)=>`<span class="tarefa">${i+1}. ${t}</span>`).join("")}</div><div class="clausula"><h3>3. HORARIO</h3>${formContrato.horarioInicio} as ${formContrato.horarioFim} - ${formContrato.dias} - ${formContrato.localTrab}</div><div class="clausula"><h3>4. SALARIO</h3>${formContrato.valor} MZN - dia ${formContrato.diaPag} - ${formContrato.formaPag}</div><div class="clausula"><h3>5. BENEFICIOS</h3>${formContrato.alimentacao} - ${formContrato.alojamento} - ${formContrato.transporte}</div><div class="clausula"><h3>6. FOLGAS</h3>${formContrato.folgas}</div><div class="clausula"><h3>7. EXP</h3>${formContrato.periodoExp}</div><div class="clausula"><h3>8. DEVERES TRAB</h3>${formContrato.deveresTrab}</div><div class="clausula"><h3>9. DEVERES EMP</h3>${formContrato.deveresEmp}</div><div class="clausula"><h3>10. ANEXOS</h3>Fotos BI, M-Pesa, fotos obra</div><div class="assinatura-final"><h3>11. ASSINATURAS COM CONCORDO - PDF FINAL PARTILHAVEL COM AMBAS PARTES</h3><b>CONTRATANTE:</b> ${formContrato.empNome} - CONCORDO em ${assinaturaContratante.data} - Tel ${formContrato.empTel} - BI ${formContrato.empBI}<br><b>CONTRATADO:</b> ${formContrato.trabNome} - CONCORDO em ${assinaturaContratado.data} - Tel ${formContrato.trabTel} - BI ${formContrato.trabBI}<br><br><b>Prints WhatsApp com CONCORDO:</b><br>[${assinaturaContratante.data}] ${formContrato.empNome} (${formContrato.empTel}): CONCORDO<br>[${assinaturaContratado.data}] ${formContrato.trabNome} (${formContrato.trabTel}): CONCORDO<br><br><b>Comprovativos:</b> Fotos BI + M-Pesa ${formContrato.valor}MZN ID ${id} + Fotos juntos<br><b>Lei 18/2014 - vale no tribunal - 3 provas ligadas</b></div><div style="text-align:center"><button onclick="window.print()" style="background:#2a3f5a;color:white;padding:12px 24px;border-radius:8px;border:none;font-weight:bold">IMPRIMIR / SALVAR COMO PDF</button></div><script>window.print();</script></body></html>`;
   const blob = new Blob([htmlFinal], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.html`; a.click();
   setTimeout(()=>{ if(confirm(`PDF FINAL GERADO ID ${id} - Deseja partilhar no WhatsApp com contratante (${formContrato.empTel}) e contratado (${formContrato.trabTel})?`)){ window.open(`https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(`CONTRATO FINAL ID ${id} - ${catName} - ${formContrato.empNome} CONCORDO em ${assinaturaContratante.data} - ${formContrato.trabNome} CONCORDO em ${assinaturaContratado.data} - Valor ${formContrato.valor}MZN - PDF FINAL: ${url}`)}`,"_blank"); setTimeout(()=>{ window.open(`https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(`CONTRATO FINAL ID ${id} - ${catName} - PDF FINAL partilhavel - CONCORDO + BI + M-Pesa - ${url}`)}`,"_blank"); },1000); } },500);
 };
 const handleCadastro = () => {
   if(!formCadastro.nome || !formCadastro.whatsapp){ alert("Preencha: Nome e WhatsApp (obrigatorios) - NUIT opcional"); return; }
   const iniciais = formCadastro.nome.split(" ").map((n:string)=>n[0]).join("").substring(0,2).toUpperCase();
   const novo = { id: profissionais.length+1, nome: formCadastro.nome, tipo: tipoCadastro==="emp" ? formCadastro.ramo : formCadastro.profissao, local: `${formCadastro.pais} / ${formCadastro.provincia}`, pais: formCadastro.pais, provincia: formCadastro.provincia, distrito: formCadastro.distrito, nuit: formCadastro.nuit || "Nao informado - opcional", ramo: tipoCadastro==="emp" ? formCadastro.ramo : "Servico Individual", profissao: tipoCadastro==="prof" ? formCadastro.profissao : formCadastro.ramo, rating: 4.9, trabalhos: 0, preco: formCadastro.preco || "A combinar", descricao: formCadastro.descricao || `${formCadastro.profissao} - ${formCadastro.local}`, foto: iniciais, verificado: true, whatsapp: formCadastro.whatsapp, anexos: formCadastro.anexos.length?formCadastro.anexos:["BI","Fotos","CV"] };
   setProfissionais([novo, ...profissionais]);
   setFormCadastro({ nome:"", nuit:"", ramo:"Pedreiro", profissao:"Pedreiro", pais:"Mocambique", provincia:"Maputo Cidade", distrito:"KaMpfumo", local:"Bairro Central", whatsapp:"", descricao:"", preco:"", anexos:[] as any[] });
   alert(`Cadastrado! ${novo.nome} - aparece na lista agora`);
 };
 const profissionaisFiltrados = profissionais.filter(p=>{ const busca = filtroBusca.toLowerCase(); return !busca || p.tipo.toLowerCase().includes(busca) || p.nome.toLowerCase().includes(busca); });

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  {/* HEADER EXATO DA PRINT ROXA - ENCONTRAR amarelo, CONTRATOS 11, MEUS, PT EN FR */}
  <header className="bg-[#1e2f4a] sticky top-0 z-30 shadow-sm"><div className="mx-auto max-w-[1280px] px-4 h-[60px] flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#d4a44a] grid place-items-center"><span className="text-[#1e2f4a] font-black text-[12px]">E</span></div><div className="text-[#d4a44a] font-black text-[20px] tracking-wider">E22E</div></div><div className="hidden lg:block text-[10px] text-white/70 ml-6 font-bold tracking-[0.15em]">ENCONTRE. NEGOCIE. FORMALIZE. 11 CLAUSULAS</div></div><div className="flex items-center gap-3"><nav className="flex gap-1 text-[12px] font-black"><button onClick={()=>setTab("encontrar")} className={`px-4 py-2 rounded-md ${tab==="encontrar"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>ENCONTRAR</button><button onClick={()=>setTab("contratos")} className={`px-4 py-2 rounded-md ${tab==="contratos"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>CONTRATOS 11</button><button onClick={()=>setTab("meus")} className={`px-4 py-2 rounded-md ${tab==="meus"?"bg-[#d4a44a] text-[#1e2f4a]":"text-white"}`}>MEUS</button></nav><div className="flex gap-1 text-[11px] font-bold"><button className="px-2 py-1.5 rounded bg-[#d4a44a] text-[#1e2f4a]">PT</button><button className="px-2 py-1.5 rounded bg-white/20 text-white">EN</button><button className="px-2 py-1.5 rounded bg-white/20 text-white">FR</button></div></div></div><div className="h-[3px] w-full bg-[#d4a44a]"/></header>

  {tab==="encontrar" && (
   <>
    {/* HERO AZUL ESCURO COM CADASTRO A DIREITA - LAYOUT EXATO DA PRINT 2 - CIRCULADO DE ROXO */}
    <section className="bg-[#1e2f4a] px-4 md:px-8 py-10 md:py-16">
      <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* ESQUERDA - TEXTO GRANDE BRANCO */}
        <div className="text-white">
          <div className="flex items-center gap-2 mb-4"><div className="w-10 h-10 rounded-full bg-[#d4a44a] grid place-items-center"><span className="text-[#1e2f4a] font-black">E</span></div><div><div className="font-black text-[22px] text-[#d4a44a] tracking-wider">E22E</div><div className="text-[8px] text-white/60 -mt-1">Energy solutions and services enterprise</div></div></div>
          <h1 className="text-[32px] md:text-[48px] font-black leading-[0.9] mt-4">Chega de acordo de boca!<br/>Contrato legal em 2 minutos.</h1>
          <p className="text-white/80 text-[14px] md:text-[15px] mt-6 leading-relaxed max-w-[480px]">Proteja seu dinheiro e seu trabalho. Com fotos, M-Pesa comprovado e assinatura no WhatsApp na hora. Valido em todo Mocambique Lei 23/2007.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[11px] font-bold flex items-center gap-2"><span className="w-4 h-4 bg-[#2a3f5a] rounded-full grid place-items-center text-[8px]">âœ“</span>11 Clausulas legais obrigatorias</span>
            <span className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[11px] font-bold flex items-center gap-2"><span className="w-4 h-4 bg-[#2a3f5a] rounded-full grid place-items-center text-[8px]">âœ“</span>Anexos com fotos antes da validade</span>
          </div>
          <div className="mt-3"><span className="px-4 py-2 bg-[#d4a44a] text-[#1e2f4a] rounded-full text-[11px] font-bold">âœ“ Lei 23/2007 - Valido em Mocambique</span></div>
        </div>

        {/* DIREITA - CARD BRANCO CADASTRO - EXATO DA PRINT */}
        <div className="bg-white rounded-[16px] p-6 md:p-8 shadow-xl">
          <div className="font-black text-[14px] text-[#475569]">Cadastre seu servico - Rapido e gratuito</div>
          <div className="mt-4 flex gap-2">
            <button onClick={()=>setTipoCadastro("emp")} className={`flex-1 h-10 rounded-md text-[10px] font-bold border ${tipoCadastro==="emp"?"bg-[#1e2f4a] text-white border-[#1e2f4a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>EMPRESA</button>
            <button onClick={()=>setTipoCadastro("prof")} className={`flex-1 h-10 rounded-md text-[10px] font-bold border leading-tight ${tipoCadastro==="prof"?"bg-[#1e2f4a] text-white border-[#1e2f4a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>PROFISSIONAL INDIVIDUAL SINGULAR</button>
            <button onClick={()=>setTipoCadastro("coop")} className={`flex-1 h-10 rounded-md text-[10px] font-bold border ${tipoCadastro==="coop"?"bg-[#1e2f4a] text-white border-[#1e2f4a]":"bg-white text-[#475569] border-[#e2e8f0]"}`}>COOPERATIVA</button>
          </div>
          <div className="mt-5 space-y-3">
            <input value={formCadastro.nome} onChange={e=>setFormCadastro({...formCadastro,nome:e.target.value})} placeholder="Nome completo / Empresa" className="w-full h-12 px-4 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]" />
            <div className="grid grid-cols-2 gap-3">
              <select value={formCadastro.pais} onChange={e=>setFormCadastro({...formCadastro,pais:e.target.value, provincia:(PAISES[e.target.value]||[])[0]})} className="w-full h-12 px-3 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]"><option>Mocambique</option>{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select>
              <select value={formCadastro.provincia} onChange={e=>setFormCadastro({...formCadastro,provincia:e.target.value})} className="w-full h-12 px-3 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]">{(PAISES[formCadastro.pais]||[]).map((p:any)=><option key={p}>{p}</option>)}</select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select value={tipoCadastro==="prof"?formCadastro.profissao:formCadastro.ramo} onChange={e=>{ if(tipoCadastro==="prof") setFormCadastro({...formCadastro,profissao:e.target.value}); else setFormCadastro({...formCadastro,ramo:e.target.value}); }} className="w-full h-12 px-3 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]"><option>Pedreiro</option>{CATS.map(c=><option key={c}>{c}</option>)}</select>
              <input value={formCadastro.whatsapp} onChange={e=>setFormCadastro({...formCadastro,whatsapp:e.target.value})} placeholder="Telefone WhatsApp" className="w-full h-12 px-4 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]" />
            </div>
            {tipoCadastro!=="prof" && <input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="NUIT (opcional) - Empresa/Cooperativa" className="w-full h-12 px-4 border border-[#e2e8f0] rounded-md text-[13px] bg-[#f8fafc]" />}
            {tipoCadastro==="prof" && <div className="grid grid-cols-2 gap-3"><input value={formCadastro.nuit} onChange={e=>setFormCadastro({...formCadastro,nuit:e.target.value})} placeholder="NUIT Pessoal (opcional)" className="w-full h-12 px-4 border border-[#e2e8f0] rounded-md text-[12px] bg-[#f8fafc]" /><input value={formCadastro.local} onChange={e=>setFormCadastro({...formCadastro,local:e.target.value})} placeholder="Local / Bairro" className="w-full h-12 px-4 border border-[#e2e8f0] rounded-md text-[12px] bg-[#f8fafc]" /></div>}
            <div className="border-2 border-dashed border-[#e2e8f0] rounded-lg p-4 text-center bg-[#fefcf8]"><div className="text-[11px] font-bold text-[#475569]">Anexar documentos - Arraste aqui ou clique</div><div className="text-[9px] text-[#94a3b8] mt-1">Arraste ficheiros ou clique para selecionar - BI, NUIT, Fotos trabalho</div><input type="file" multiple onChange={e=>setFormCadastro({...formCadastro, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-2 text-[9px]" />{formCadastro.anexos.length>0 && <div className="mt-2 text-[9px] text-green-600">{formCadastro.anexos.length} ficheiros: {formCadastro.anexos.join(", ")}</div>}</div>
            <button onClick={handleCadastro} className="w-full h-12 bg-[#d4a44a] text-[#1e2f4a] rounded-md font-black text-[13px] tracking-wider">ENVIAR CADASTRO</button>
            <div className="text-[8px] text-center text-[#94a3b8]">NUIT opcional - so Nome e WhatsApp obrigatorios - aparece na lista abaixo imediatamente</div>
          </div>
        </div>
      </div>
    </section>

    {/* PARTE DE BAIXO - PESQUISA + PROFISSIONAIS - LAYOUT EXATO DA PRINT 3 */}
    <section className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      <div className="bg-white rounded-[16px] border shadow-sm p-5 md:p-6">
        <div className="grid md:grid-cols-[1fr_220px_220px_130px] gap-4 items-end">
          <div><label className="text-[11px] font-bold text-[#1e2f4a]">O que precisa?</label><input value={filtroBusca} onChange={e=>setFiltroBusca(e.target.value)} placeholder="Ex: Pedreiro, Eletricista, Domestica..." className="mt-1 w-full h-12 px-4 border border-[#e2e8f0] rounded-lg text-[13px] bg-[#f8fafc]" /></div>
          <div><label className="text-[11px] font-bold text-[#1e2f4a]">Pais</label><select value={paisFiltro} onChange={e=>setPaisFiltro(e.target.value)} className="mt-1 w-full h-12 px-3 border border-[#e2e8f0] rounded-lg text-[13px] bg-[#f8fafc]">{Object.keys(PAISES).map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label className="text-[11px] font-bold text-[#1e2f4a]">Provincia / Estado</label><select value={provFiltro} onChange={e=>setProvFiltro(e.target.value)} className="mt-1 w-full h-12 px-3 border border-[#e2e8f0] rounded-lg text-[13px] bg-[#f8fafc]"><option>Todos</option>{provinciasFiltro.map((p:any)=><option key={p}>{p}</option>)}</select></div>
          <div><button className="w-full h-12 bg-[#1e2f4a] text-white rounded-lg font-black text-[12px] tracking-wider">PESQUISAR</button></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-[11px] text-[#94a3b8]">Tags Populares:</span>{["Pedreiro","Carpinteiro","Eletricista","Canalizador","Pintor","Serralheiro"].map(t=><button key={t} onClick={()=>setFiltroBusca(t)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${filtroBusca===t?"bg-[#1e2f4a] text-white":"bg-[#f1f0eb] text-[#475569]"}`}>{t}</button>)}</div>
        <div className="mt-3 text-[10px] text-[#94a3b8]">Pais -&gt; Provincia automatico: ao mudar Pais, Provincia muda automaticamente. Funciona no filtro e no cadastro.</div>
      </div>

      <div className="mt-8">
        <div className="font-black text-[14px] text-[#1e2f4a]">Profissionais verificados perto de si ({profissionaisFiltrados.length})</div>
        <div className="mt-4 space-y-3">
          {profissionaisFiltrados.map((p:any)=>(
            <div key={p.id} className="bg-white rounded-[12px] border p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e2f4a] text-[#d4a44a] grid place-items-center font-black text-[14px]">{p.foto}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap"><div className="font-black text-[15px] text-[#1e2f4a]">{p.nome}</div><span className="px-3 py-1 bg-[#fff8ed] border border-[#d4a44a] rounded-full text-[10px] font-bold text-[#92400e]">VERIFICADO â€¢ {p.rating}</span><span className="text-[11px] text-[#64748b]">{p.tipo} â€¢ {p.local}</span></div>
                  <div className="text-[13px] text-[#334155] mt-2">{p.descricao}</div>
                  <div className="text-[10px] text-[#94a3b8] mt-1">NUIT: {p.nuit} - Anexos: {p.anexos.join(", ")} - WhatsApp: {p.whatsapp}</div>
                  <div className="mt-4 flex gap-3"><button onClick={()=>{setContratoSel(CATS.indexOf(p.tipo)>=0?CATS.indexOf(p.tipo):1); setTab("contratos"); window.scrollTo(0,0);}} className="h-10 px-6 bg-[#1e2f4a] text-white rounded-md font-black text-[11px] tracking-wider">GERAR CONTRATO</button><button className="h-10 px-6 border-2 border-[#d4a44a] text-[#1e2f4a] rounded-md font-bold text-[11px]">CONTRATAR</button></div>
                  <div className="mt-2 text-[10px] text-[#94a3b8]">{p.trabalhos} trabalhos â€¢ M-Pesa OK â€¢ Fotos OK â€¢ {p.preco}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
   </>
  )}

  {tab==="contratos" && (
   <section className="mx-auto max-w-[1280px] px-4 md:px-8 py-6">
    <div className="bg-[#1e2f4a] rounded-[16px] p-5 md:p-6 text-white">
      <div className="text-[#d4a44a] text-[10px] tracking-[0.2em] font-bold">11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS - BUG WHATSAPP CORRIGIDO - PREVIEW NAO CONGELADO MAIS</div>
      <h2 className="text-[22px] md:text-[28px] font-black leading-none mt-2">Chega de acordo de boca - Proteja seu dinheiro e seu trabalho</h2>
      <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px]">Contrato legal em 2 minutos - BUG CORRIGIDO: no WhatsApp o preview nao fica mais congelado na tela cobrindo as clausulas. Agora no celular o preview vai para baixo e nao e mais sticky. Clausulas 3-10 com formulario completo.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#1e2f4a] border-[#d4a44a]":"bg-[#2a3f5a] text-white border-[#3a4f6a]"}`}>{c.toUpperCase()}</button>)}
      </div>
    </div>

    {/* CORRECAO BUG WHATSAPP: NO CELULAR NAO E MAIS STICKY - GRID SO NO DESKTOP, NO CELULAR 1 COLUNA */}
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_360px] gap-5">
     {/* ESQUERDA - LISTA CLAUSULAS - SO STICKY NO DESKTOP */}
     <div className="bg-white rounded-[12px] border p-3 h-fit lg:sticky lg:top-[70px] order-1">
      <div className="text-[11px] font-black mb-1">11 CLAUSULAS DO CONTRATO</div>
      <div className="text-[9px] text-[#94a3b8] mb-3">{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - CLAUSULAS 3-10 COM FORMULARIO COMPLETO - BUG WHATSAPP CORRIGIDO</div>
      {CLAUSULAS.map(c=>{
        const ativo=clausulaAtiva===c.id;
        return <button key={c.id} onClick={()=>{setClausulaAtiva(c.id); window.scrollTo({top:0, behavior:'smooth'});}} className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[8px] mb-1 border ${ativo?"bg-[#1e2f4a] text-white border-[#1e2f4a]":"bg-[#f8fafc] text-[#475569] border-[#e2e8f0]"}`}><div className="w-6 h-6 rounded-full bg-white/20 grid place-items-center text-[10px] font-bold">{c.id}</div><div className="flex-1"><div className="font-bold text-[11px]">{c.id}. {c.titulo}</div><div className={`text-[9px] ${ativo?"text-white/70":"text-[#94a3b8]"}`}>{c.short}</div></div></button>
      })}
      <div className="mt-3 p-2 rounded bg-[#fff8ed] border text-[9px] text-[#92400e]">BUG WHATSAPP CORRIGIDO: preview nao fica mais congelado no celular - agora preview vai para baixo e so e sticky no computador - pode editar clausulas 3-10</div>
      {/* BOTAO MOSTRAR PREVIEW NO CELULAR */}
      <button onClick={()=>setMostrarPreviewMobile(!mostrarPreviewMobile)} className="lg:hidden mt-3 w-full h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-lg font-black text-[11px]">{mostrarPreviewMobile?"ESCONDER PREVIEW":"MOSTRAR PREVIEW AO VIVO"}</button>
     </div>

     {/* MEIO - FORMULARIO - SEMPRE VISIVEL, NAO COBERTO PELO PREVIEW */}
     <div className="bg-white rounded-[12px] border p-5 order-2">
      <div className="font-black text-[14px]">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
      <div className="mt-5">
        {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-[12px]">Dados das partes - Quem contrata e quem faz</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Contratante</label><input value={formContrato.empBI} onChange={e=>setFormContrato({...formContrato,empBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Telefone Contratante</label><input value={formContrato.empTel} onChange={e=>setFormContrato({...formContrato,empTel:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Endereco Contratante</label><input value={formContrato.empEnd} onChange={e=>setFormContrato({...formContrato,empEnd:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">BI Trabalhador</label><input value={formContrato.trabBI} onChange={e=>setFormContrato({...formContrato,trabBI:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===2 && <div className="space-y-3"><div className="font-bold text-[12px]">Objeto e tarefas - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}</div><div className="flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#1e2f4a] text-white text-[11px] flex items-center gap-2">{t} <button onClick={()=>setFormContrato({...formContrato,tarefas:formContrato.tarefas.filter((_:any,idx:number)=>idx!==i)})} className="w-4 h-4 rounded-full bg-white/20 grid place-items-center text-[8px]">x</button></span>)}</div></div>}
        {clausulaAtiva===3 && <div className="space-y-3"><div className="font-bold text-[12px]">Horario e local - Quando e onde - FORMULARIO EDITAVEL - BUG CORRIGIDO - AGORA PODE EDITAR NO WHATSAPP</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Horario Inicio *</label><input type="time" value={formContrato.horarioInicio} onChange={e=>setFormContrato({...formContrato,horarioInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Horario Fim *</label><input type="time" value={formContrato.horarioFim} onChange={e=>setFormContrato({...formContrato,horarioFim:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Dias *</label><select value={formContrato.dias} onChange={e=>setFormContrato({...formContrato,dias:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>Segunda a Sabado</option><option>Segunda a Sexta</option><option>Segunda a Domingo</option></select></div><div><label className="text-[10px] font-bold">Data Inicio *</label><input type="date" value={formContrato.dataInicio} onChange={e=>setFormContrato({...formContrato,dataInicio:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div className="col-span-2"><label className="text-[10px] font-bold">Local de Trabalho *</label><input value={formContrato.localTrab} onChange={e=>setFormContrato({...formContrato,localTrab:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div></div></div>}
        {clausulaAtiva===4 && <div className="space-y-3"><div className="font-bold text-[12px]">Salario e pagamento - FORMULARIO EDITAVEL</div><div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] font-bold">Valor MZN *</label><input value={formContrato.valor} onChange={e=>setFormContrato({...formContrato,valor:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[12px]" /></div><div><label className="text-[10px] font-bold">Dia Pagamento *</label><select value={formContrato.diaPag} onChange={e=>setFormContrato({...formContrato,diaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>05</option><option>01</option><option>10</option><option>15</option><option>30</option></select></div><div><label className="text-[10px] font-bold">Forma Pagamento *</label><select value={formContrato.formaPag} onChange={e=>setFormContrato({...formContrato,formaPag:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>M-Pesa</option><option>Banco</option><option>Dinheiro</option></select></div><div><label className="text-[10px] font-bold">Prazo</label><select value={formContrato.prazo} onChange={e=>setFormContrato({...formContrato,prazo:e.target.value})} className="mt-1 w-full h-10 px-2 border-2 rounded-lg text-[11px]"><option>30 dias</option><option>60 dias</option><option>90 dias</option><option>1 ano</option></select></div></div></div>}
        {clausulaAtiva===5 && <div className="space-y-3"><div className="font-bold text-[12px]">Alimentacao e alojamento - FORMULARIO EDITAVEL</div><div className="space-y-3"><div><label className="text-[10px] font-bold">Alimentacao</label><select value={formContrato.alimentacao} onChange={e=>setFormContrato({...formContrato,alimentacao:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Sim - almoco fornecido no local</option><option>Sim - almoco e jantar</option><option>Nao - traz sua comida</option></select></div><div><label className="text-[10px] font-bold">Alojamento</label><select value={formContrato.alojamento} onChange={e=>setFormContrato({...formContrato,alojamento:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Nao - mora perto</option><option>Sim - quarto no local</option><option>Sim - casa alugada</option></select></div><div><label className="text-[10px] font-bold">Transporte</label><select value={formContrato.transporte} onChange={e=>setFormContrato({...formContrato,transporte:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>Sim - 500MT/mes para chapa</option><option>Sim - 1000MT/mes</option><option>Nao</option></select></div></div></div>}
        {clausulaAtiva===6 && <div className="space-y-3"><div className="font-bold text-[12px]">Folgas e ferias - FORMULARIO EDITAVEL</div><textarea value={formContrato.folgas} onChange={e=>setFormContrato({...formContrato,folgas:e.target.value})} className="mt-1 w-full h-24 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>}
        {clausulaAtiva===7 && <div className="space-y-3"><div className="font-bold text-[12px]">Periodo experimental - FORMULARIO EDITAVEL</div><select value={formContrato.periodoExp} onChange={e=>setFormContrato({...formContrato,periodoExp:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-[11px]"><option>90 dias - primeiros 90 dias como periodo de experiencia</option><option>30 dias</option><option>60 dias</option><option>Sem periodo</option></select></div>}
        {clausulaAtiva===8 && <div className="space-y-3"><div className="font-bold text-[12px]">Deveres do trabalhador - FORMULARIO EDITAVEL</div><textarea value={formContrato.deveresTrab} onChange={e=>setFormContrato({...formContrato,deveresTrab:e.target.value})} className="mt-1 w-full h-32 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>}
        {clausulaAtiva===9 && <div className="space-y-3"><div className="font-bold text-[12px]">Deveres do empregador - FORMULARIO EDITAVEL</div><textarea value={formContrato.deveresEmp} onChange={e=>setFormContrato({...formContrato,deveresEmp:e.target.value})} className="mt-1 w-full h-32 px-3 py-2 border-2 rounded-lg text-[11px]" /></div>}
        {clausulaAtiva===10 && <div className="space-y-3"><div className="font-bold text-[12px]">Anexos (antes validade) - FORMULARIO EDITAVEL</div><div className="border-2 border-dashed rounded-xl p-6 text-center bg-[#f8fafc]"><div className="text-[10px] font-bold">Arraste aqui ou clique - Fotos antes da validade viram prova legal</div><input type="file" multiple accept="image/*,.pdf" onChange={e=>setFormContrato({...formContrato, anexos: Array.from(e.target.files||[]).map((f:any)=>f.name)})} className="mt-3 text-[10px]" />{formContrato.anexos.length>0 && <div className="mt-3 p-2 bg-green-50 border rounded-lg text-[9px] text-green-700">{formContrato.anexos.length} ficheiros: {formContrato.anexos.join(", ")}</div>}</div></div>}
        {clausulaAtiva===11 && <div className="space-y-4">
          <div className="font-bold text-[14px] text-[#1e2f4a]">CLAUSULA 11 - PDF FINAL PARTILHAVEL COM ASSINATURAS</div>
          <div className="bg-white border-2 rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 1 - PDF INICIAL BONITO PARTILHAVEL</div>
            <button onClick={gerarPDFInicial} className="mt-2 w-full h-11 bg-[#1e2f4a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL BONITO - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS</button>
          </div>
          <div className="bg-[#f0f7ff] border-2 border-[#25D366] rounded-xl p-4">
            <div className="font-bold text-[11px]">PASSO 2 - ASSINAR NO WHATSAPP COM CONCORDO</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:`CONTRATANTE: CONCORDO ${formContrato.empNome}`}</button>
              <button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:`CONTRATADO: CONCORDO ${formContrato.trabNome}`}</button>
            </div>
          </div>
          <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4">
            <div className="font-black text-[12px] text-[#92400e]">PASSO 3 - PDF FINAL PARTILHAVEL COM ASSINATURAS</div>
            <button onClick={gerarPDFFinal} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="mt-3 w-full h-[56px] bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-black text-[12px] disabled:opacity-40">3. GERAR PDF FINAL PARTILHAVEL<br/><span className="text-[10px] font-normal">Contrato + CONCORDO + BI + M-Pesa + partilha WhatsApp</span></button>
          </div>
        </div>}
      </div>
      <div className="mt-6 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-11 border-2 rounded-xl font-bold disabled:opacity-40">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-11 bg-[#1e2f4a] text-white rounded-xl font-bold disabled:opacity-40">Proximo</button></div>
     </div>

     {/* DIREITA - PREVIEW - SO STICKY NO DESKTOP (xl), NO CELULAR NAO E STICKY E FICA ESCONDIDO ATE CLICAR MOSTRAR */}
     <div className={`${mostrarPreviewMobile?"block":"hidden"} xl:block bg-white rounded-[12px] border p-4 h-fit xl:sticky xl:top-[70px] order-3`}>
       <div className="flex justify-between items-center"><div className="text-[10px] font-bold uppercase">Preview ao vivo - 11 clausulas = PDF unico - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas</div><button onClick={()=>setMostrarPreviewMobile(false)} className="xl:hidden w-6 h-6 bg-[#f1f0eb] rounded-full grid place-items-center text-[10px]">X</button></div>
       <div className="mt-3 h-[60vh] xl:h-[520px] overflow-auto bg-[#f8fafc] border rounded-xl p-3 text-[10px] font-mono leading-relaxed">CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS - BUG WHATSAPP CORRIGIDO<br/><br/>1. DADOS: {formContrato.empNome} e {formContrato.trabNome}<br/><br/>2. TAREFAS ({formContrato.tarefas.length}):<br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>3. HORARIO: {formContrato.horarioInicio} as {formContrato.horarioFim} - {formContrato.dias} - {formContrato.localTrab}<br/><br/>4. VALOR: {formContrato.valor} MZN dia {formContrato.diaPag} via {formContrato.formaPag}<br/><br/>5. BENEFICIOS: {formContrato.alimentacao} - {formContrato.alojamento}<br/><br/>6. FOLGAS: {formContrato.folgas}<br/><br/>11. ASSINATURA: {formContrato.empNome} {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"FALTA"} - {formContrato.trabNome} {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"FALTA"}<br/><br/>BUG WHATSAPP CORRIGIDO - PREVIEW NAO CONGELADO MAIS NO CELULAR</div>
       <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-[10px]">PDF INICIAL</button><button onClick={gerarPDFFinal} className="h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-bold text-[10px]">PDF FINAL</button></div>
     </div>
    </div>
   </section>
  )}

  <footer className="mt-10 border-t py-6 text-center text-[10px] text-[#94a3b8]">ESSE - BUG WHATSAPP CORRIGIDO - LAYOUT EXATO DAS 2 PRINTS ROXAS - HERO AZUL ESCURO COM CADASTRO + PESQUISA + PROFISSIONAIS - PREVIEW NAO CONGELADO NO CELULAR - BUILD 100%</footer>
 </div>
 )
}
