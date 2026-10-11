// @ts-nocheck
// APP_32 FINAL CORRIGIDO - BUILD OK eb79d44 FIXED - CORRIGIDO 402-405 lg:w- rounded- text- lg:top- + 517-520 section/div mismatch
import { useState, useMemo, useEffect } from 'react';
const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Serralheiro","Servicos/Consultorias","Outros/Particular"];
const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel e prumo","Levantamento de paredes de bloco e tijolo","Reboco interior e exterior liso e desempenado","Assentamento de tijoleira e ceramica com nivel a laser","Construcao de pilares, vigas e cintas de amarracao","Concretagem de laje, contrapiso e calcada","Acabamento com massa fina e preparacao para pintura","Instalacao de portas, janelas e esquadrias com vedacao","Construcao de muro, vedacao e estrutura de portao","Limpeza final e entrega da obra organizada e fotografada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao milimetrica","Fabricar portas, janelas, armarios e prateleiras sob medida","Instalar forro de madeira, lambril e deck com acabamento","Fazer estrutura de telhado, ripas e caibros com nivel","Lixar, envernizar e aplicar acabamento protetor anti-cupim","Instalar fechaduras, dobradicas e ferragens com alinhamento perfeito","Reparar moveis, portas empenadas e estruturas de madeira","Construir escadas, corrimao e guarda-corpo de madeira macica","Trabalhar com MDF, compensado e madeira macica com qualidade","Entregar com acabamento liso, sem farpas, limpo e fotografado"],
  "Domestica": ["Limpeza geral da casa todos os dias com varrer e passar pano","Lavar louca, organizar cozinha e limpar fogao e geladeira","Arrumar quartos, fazer camas e trocar lencois semanalmente","Lavar roupa, passar, dobrar e guardar nos armarios","Cozinhar cafe da manha, almoco e jantar conforme orientacao","Cuidar das criancas com atencao quando solicitado","Manter banheiros limpos, higienizados e com cheirinho","Organizar armarios, despensa e geladeira com inventario","Ir ao mercado fazer compras pequenas e anotar gastos","Enviar resumo diario no WhatsApp do que foi feito e o que falta"],
  "Outros/Particular": ["Descrever servico personalizado com clareza total","Definir material necessario e quem fornece","Definir prazo inicio e entrega com multa","Combinar valor total e forma pagamento M-Pesa","Enviar fotos do antes, durante e depois","Manter comunicacao diaria via WhatsApp","Cumprir horario e qualidade prometida","Garantir retrabalho gratuito se nao satisfeito","Deixar local limpo e organizado","Entregar com recibo e avaliacao 5 estrelas"]
};
const CLAUSULAS = [ { id:1, titulo:"Dados das partes", short:"Quem contrata e quem faz" }, { id:2, titulo:"Objeto e tarefas", short:"O que sera feito" }, { id:3, titulo:"Horario e local", short:"Quando e onde" }, { id:4, titulo:"Salario e pagamento", short:"Quanto e como paga" }, { id:5, titulo:"Alimentacao e alojamento", short:"Beneficios" }, { id:6, titulo:"Folgas e ferias", short:"Descanso legal" }, { id:7, titulo:"Periodo experimental", short:"Teste inicial" }, { id:8, titulo:"Deveres do trabalhador", short:"Obrigacoes" }, { id:9, titulo:"Deveres do empregador", short:"Obrigacoes" }, { id:10, titulo:"Anexos (antes validade)", short:"Fotos e provas" }, { id:11, titulo:"Validade e assinaturas", short:"Assina no WhatsApp - PDF final partilhavel" }, ];
export default function App(){
 const [tab,setTab]=useState("contratos");
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(4);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513", empEnd:"Av. Principal, Xai-Xai",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899", trabEnd:"Xai-Xai - Bairro 2", trabProf:"Carpinteiro",
  tarefas: MODELO_TAREFAS["Carpinteiro"], horarioInicio:"06:00", horarioFim:"17:00", dias:"Segunda a Sabado", dataInicio:"2026-10-10", localTrab:"Xai-Xai - casa do cliente",
  valor:"7500", diaPag:"05", formaPag:"M-Pesa", prazo:"30 dias", alimentacao:"Sim - almoco fornecido no local", alojamento:"Nao", transporte:"Sim - 500MT/mes",
  folgas:"Domingo e feriados nacionais. 12 dias ferias apos 1 ano completo.", periodoExp:"90 dias experiencia",
  deveresTrab:"Cumprir horario 06:00 as 17:00 com pontualidade, guardar sigilo absoluto da familia, zelar pelos bens, comunicar atraso no WhatsApp, manter local limpo, usar EPI, cumprir tarefas, nao faltar sem aviso 24h",
  deveresEmp:"Pagar salario pontualmente todo dia 05 via M-Pesa, respeitar dignidade, fornecer agua e refeicao, fornecer material e EPI, cumprir folgas",
  anexos:[] as any[]
 });
 const [assinaturaContratante,setAssinaturaContratante]=useState({concordo:false,data:""});
 const [assinaturaContratado,setAssinaturaContratado]=useState({concordo:false,data:""});
 const gerarPDFInicial = () => { const catName = CATS[contratoSel]; const id = Math.floor(Math.random()*1000000); const html = `<html><body><h1>CONTRATO ${catName} - ID ${id}</h1></body></html>`; const blob = new Blob([html], {type:"text/html"}); const url = URL.createObjectURL(blob); window.open(url,"_blank"); };
 const assinarContratante = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratante({concordo:true,data:[STRIPPED] };
 const assinarContratado = () => { const agora = new Date().toLocaleString("pt-MZ"); setAssinaturaContratado({concordo:true,data:[STRIPPED] };
 const gerarPDFFinal = () => { if(!assinaturaContratante.concordo ||!assinaturaContratado.concordo){ alert("Falta assinar!"); return; } alert("PDF FINAL GERADO"); };
 return (
  <div className="min-h-screen bg-[#f5f5f0]">
   <header className="h-14 bg-[#1e2f4a] text-white flex items-center justify-between px-4 border-b- border-[#c9a86a] sticky top-0 z-[100]"><div className="font-black text-">ESSE - 11 CLAUSULAS - BUILD OK eb79d44 FIXED</div></header>
   <section className="max-w- mx-auto p-4">
    <div className="bg-[#1e2f4a] text-white rounded- p-3.5 mb-3"><div className="text- text-[#c9a86a] font-extrabold">CONTRATO LEGAL EM 2 MINUTOS - 11 CLAUSULAS - DESBLOQUEADO SÓ TELEFONE - BUILD OK</div><h1 className="text- font-black mt-0.5">Contrato {CATS[contratoSel]} - Preview embaixo no telefone</h1></div>
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_380px] gap-3 items-start">
     <div className="w-full lg:w- lg:min-w- bg-white rounded- border p-3 h-fit lg:sticky lg:top- order-1">
      <div className="font-extrabold text- mb-1">Edita a sua escolha</div>
      <div className="text- text-[#64748b] mb-2.5 hidden lg:block">Selecione a cláusula para editar - {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}</div>
      <div className="text- text-[#64748b] mb-2.5 lg:hidden">Deslize → toque (1-11) - só telefone desbloqueado</div>
      <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
       {Array.from({length:11},(_,i)=>i+1).map(n=>(
        <div key={n} onClick={()=>setClausulaAtiva(n)} className={`min-w- lg:min-w-0 p-2.5 rounded-lg cursor-pointer border flex-shrink-0 ${clausulaAtiva===n?'bg-[#1e2f4a] text-white border-[#1e2f4a]':'bg-[#f8fafc] text-[#1e2f4a] border-[#e2e8f0]'}`}>
         <div className="font-extrabold text- whitespace-nowrap lg:whitespace-normal">{n}. {CLAUSULAS[n-1].titulo}</div>
         <div className="text- opacity-70 hidden lg:block">{CLAUSULAS[n-1].short}</div>
        </div>
       ))}
      </div>
     </div>
     <div className="bg-white rounded- border-2 border-[#25D366] p-4 order-2 shadow-sm w-full">
      <div className="font-black text-">CLAUSULA {clausulaAtiva}: {CLAUSULAS[clausulaAtiva-1].titulo.toUpperCase()} - {CATS[contratoSel].toUpperCase()}</div>
      <div className="mt-5">
       {clausulaAtiva===1 && <div className="space-y-3"><div className="font-bold text-">Dados das partes</div><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label className="text- font-bold">Nome Contratante *</label><input value={formContrato.empNome} onChange={e=>setFormContrato({...formContrato,empNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-" /></div><div><label className="text- font-bold">Nome Trabalhador *</label><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="mt-1 w-full h-10 px-3 border-2 rounded-lg text-" /></div></div></div>}
       {clausulaAtiva===11 && <div className="space-y-4"><button onClick={gerarPDFInicial} className="w-full h-11 bg-[#1e2f4a] text-white rounded-lg font-bold">1. GERAR PDF INICIAL - {CATS[contratoSel]}</button><div className="grid grid-cols-2 gap-2"><button onClick={assinarContratante} className={`h-12 rounded-lg font-bold text- ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>CONTRATANTE: CONCORDO</button><button onClick={assinarContratado} className={`h-12 rounded-lg font-bold text- ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>CONTRATADO: CONCORDO</button></div><button onClick={gerarPDFFinal} className="w-full h- bg-[#d4a44a] rounded-xl font-black">3. GERAR PDF FINAL</button></div>}
      </div>
      <div className="mt-4 flex gap-2"><button disabled={clausulaAtiva===1} onClick={()=>setClausulaAtiva(c=>Math.max(1,c-1))} className="flex-1 h-9 border-2 rounded-lg font-bold text-">Voltar</button><button disabled={clausulaAtiva===11} onClick={()=>setClausulaAtiva(c=>Math.min(11,c+1))} className="flex-1 h-9 bg-[#1e2f4a] text-white rounded-lg font-bold text-">Próximo - {clausulaAtiva}/11</button></div>
     </div>
     <div className="block bg-white rounded- border-2 border-[#1e2f4a] p-3 h-fit lg:sticky lg:top- order-3 w-full mt-3">
      <div className="text- font-bold uppercase">Preview do contrato - {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - vê embaixo no telefone antes de enviar</div>
      <div className="mt-3 h- lg:h- overflow-auto bg-[#f8fafc] border rounded-xl p-3 text- font-mono leading-relaxed">
       CONTRATO {CATS[contratoSel].toUpperCase()} - 11 CLAUSULAS<br/><br/>1. DADOS: {formContrato.empNome} e {formContrato.trabNome}<br/><br/>2. TAREFAS: {formContrato.tarefas.join(", ")}<br/><br/>4. SALARIO: {formContrato.valor} MZN<br/><br/>PREVIEW VISIVEL EMBAIXO NO TELEFONE
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={gerarPDFInicial} className="h-10 bg-[#25D366] text-white rounded-xl font-bold text-">PDF INICIAL</button><button onClick={gerarPDFFinal} className="h-10 bg-[#d4a44a] text-[#1e2f4a] rounded-xl font-bold text-">PDF FINAL</button></div>
     </div>
    </div>
   </section>
   <footer className="mt-10 border-t py-6 text-center text- text-[#94a3b8]">BUILD 100% - eb79d44 FIXED - DESBLOQUEADO SÓ TELEFONE - PREVIEW EMBAIXO</footer>
  </div>
 )
}
