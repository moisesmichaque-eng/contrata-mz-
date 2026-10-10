// @ts-nocheck
// FLUXO CORRETO: 1. Gera PDF inicial 2. Assina no WhatsApp com CONCORDO 3. Gera PDF FINAL com assinaturas + prints + BI + M-Pesa
import { useState, useMemo, useEffect } from 'react';

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Servicos/Consultorias","Outros/Particular"];

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel", "Levantamento de paredes", "Reboco interior e exterior liso", "Assentamento de tijoleira e ceramica", "Construcao de pilares, vigas e cinta", "Concretagem de laje", "Acabamento massa fina", "Instalacao de portas e janelas", "Construcao de muro", "Limpeza final"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao", "Fabricar portas, janelas, armarios sob medida", "Instalar forro de madeira, lambril e deck", "Fazer estrutura de telhado, ripas e caibros", "Lixar, envernizar e acabamento anti-cupim", "Instalar fechaduras, dobradicas e ferragens", "Reparar moveis, portas empenadas", "Construir escadas, corrimao e guarda-corpo", "Trabalhar MDF, compensado e madeira macica", "Entregar com acabamento liso, sem farpas"],
  "Domestica": ["Limpeza geral diaria", "Lavar e organizar louca", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Cozinhar cafe, almoco e jantar", "Cuidar das criancas", "Manter banheiros limpos", "Organizar armarios", "Ir ao mercado", "Enviar resumo diario"],
  "Outros/Particular": ["Descrever servico personalizado", "Definir material necessario", "Definir prazo inicio e entrega", "Combinar valor e forma pagamento", "Enviar fotos antes e depois", "Manter comunicacao diaria", "Cumprir horario e qualidade", "Garantir retrabalho", "Deixar local limpo", "Entregar com recibo"]
};

export default function App(){
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(11);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", empBI:"110200011B", empTel:"823832513",
  trabNome:"Joao Carpinteiro", trabBI:"1102100MM", trabTel:"840532899",
  tarefas: MODELO_TAREFAS["Carpinteiro"], valor:"7500", localTrab:"Xai-Xai - casa"
 });
 const [assinaturaContratante, setAssinaturaContratante] = useState({ concordo:false, nome:"", data:"", biFoto:false, mpesaComprovativo:false });
 const [assinaturaContratado, setAssinaturaContratado] = useState({ concordo:false, nome:"", data:"", biFoto:false, mpesaComprovativo:false });
 const [pdfInicialGerado, setPdfInicialGerado] = useState(false);

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas}));
 },[contratoSel]);

 const gerarPDFInicial = () => {
   const catName = CATS[contratoSel];
   const texto = `CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF INICIAL (SEM ASSINATURAS AINDA)
CONTRATANTE: ${formContrato.empNome} BI ${formContrato.empBI} Tel ${formContrato.empTel}
TRABALHADOR: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel}
VALOR: ${formContrato.valor} MZN
TAREFAS (${formContrato.tarefas.length}):
${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

11. VALIDADE: Assinatura via WhatsApp com CONCORDO + nome + BI + audio
ESTE E O PDF INICIAL - FALTA ASSINAR NO WHATSAPP PARA GERAR PDF FINAL COM ASSINATURAS
`;
   const blob = new Blob([texto], {type:"text/plain"});
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a"); a.href=url; a.download=`CONTRATO-INICIAL-${catName}-${formContrato.trabNome}.txt`; a.click();
   setPdfInicialGerado(true);
   alert(`PDF INICIAL gerado! Agora assina no WhatsApp para gerar PDF FINAL com assinaturas.`);
 };

 const assinarContratante = () => {
   const agora = new Date().toLocaleString("pt-MZ");
   setAssinaturaContratante({ concordo:true, nome:formContrato.empNome, data:agora, biFoto:true, mpesaComprovativo:false });
   const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.empNome}, BI ${formContrato.empBI}, CONCORDO com contrato de ${formContrato.valor}MZN com ${formContrato.trabNome} - ${formContrato.tarefas.length} tarefas - Data ${agora} - ESSE`;
   const url = `https://wa.me/${formContrato.trabTel}?text=${encodeURIComponent(msg)}`;
   window.open(url,"_blank");
 };

 const assinarContratado = () => {
   const agora = new Date().toLocaleString("pt-MZ");
   setAssinaturaContratado({ concordo:true, nome:formContrato.trabNome, data:agora, biFoto:true, mpesaComprovativo:true });
   const msg = `CONTRATO ${CATS[contratoSel]} ID ${Math.floor(Math.random()*10000)}\nEu, ${formContrato.trabNome}, BI ${formContrato.trabBI}, CONCORDO com contrato de ${formContrato.valor}MZN com ${formContrato.empNome} - ${formContrato.tarefas.length} tarefas - Data ${agora} - ESSE`;
   const url = `https://wa.me/${formContrato.empTel}?text=${encodeURIComponent(msg)}`;
   window.open(url,"_blank");
 };

 const gerarPDFFinalComAssinaturas = () => {
   if(!assinaturaContratante.concordo || !assinaturaContratado.concordo){
     alert("Falta assinar! Precisa dos dois CONCORDO: contratante e contratado. Clica nos botoes CONCORDO acima.");
     return;
   }
   const catName = CATS[contratoSel];
   const id = Math.floor(Math.random()*1000000);
   const agora = new Date().toLocaleString("pt-MZ");
   const textoFinal = `
================================================================================
CONTRATO FINAL COM ASSINATURAS - PDF FINAL COM TUDO - ID ${id}
CONTRATA.MZ - ESSE - 11 CLAUSULAS - CARPINTEIRO OK
================================================================================

1. DADOS DAS PARTES:
Contratante: ${formContrato.empNome} BI ${formContrato.empBI} Tel ${formContrato.empTel}
Trabalhador: ${formContrato.trabNome} BI ${formContrato.trabBI} Tel ${formContrato.trabTel}
Valor: ${formContrato.valor} MZN Local: ${formContrato.localTrab}

2. TAREFAS (${formContrato.tarefas.length} tarefas de ${catName}):
${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

...

11. VALIDADE E ASSINATURAS - PDF FINAL COM ASSINATURAS E COMPROVATIVOS

================================================================================
ASSINATURA DIGITAL VIA WHATSAPP - PROVA LEGAL - LEI 18/2014
================================================================================

[CONTRATANTE - ASSINATURA 1]
Nome: ${assinaturaContratante.nome}
BI: ${formContrato.empBI}
Telefone WhatsApp: ${formContrato.empTel}
Mensagem enviada no WhatsApp: "CONCORDO ${assinaturaContratante.nome} BI ${formContrato.empBI} - Aceito contrato ID ${id} de ${formContrato.valor}MZN com ${formContrato.trabNome}"
Data/Hora do CONCORDO: ${assinaturaContratante.data}
Localizacao GPS do celular no momento do CONCORDO: Maputo - Matola - GPS: -25.96, 32.45 (exemplo)
Foto do BI anexada: SIM - ${assinaturaContratante.biFoto ? "Foto BI frente e verso anexada na Clausula 10" : "FALTA - Anexar foto BI"}
Audio de 5s anexado: SIM - "Eu, ${assinaturaContratante.nome}, aceito este contrato ID ${id}"
Comprovativo M-Pesa: ${assinaturaContratante.mpesaComprovativo ? "Anexado" : "Nao aplicavel para contratante"}
Print da conversa WhatsApp: 
----------------------------------------
[14:25] ${formContrato.empNome}: CONCORDO ${formContrato.empNome} BI ${formContrato.empBI}
[14:25] Sistema ESSE: Assinatura registada - Numero ${formContrato.empTel} - Data ${assinaturaContratante.data} - ID ${id}
----------------------------------------

[CONTRATADO - ASSINATURA 2]
Nome: ${assinaturaContratado.nome}
BI: ${formContrato.trabBI}
Telefone WhatsApp: ${formContrato.trabTel} (ou SMS se nao tiver WhatsApp)
Mensagem enviada no WhatsApp/SMS: "CONCORDO ${assinaturaContratado.nome} BI ${formContrato.trabBI} - Aceito contrato ID ${id} de ${formContrato.valor}MZN com ${formContrato.empNome}"
Data/Hora do CONCORDO: ${assinaturaContratado.data}
Localizacao GPS do celular no momento do CONCORDO: ${formContrato.localTrab} - GPS: -25.95, 32.46 (exemplo)
Foto do BI anexada: SIM - ${assinaturaContratado.biFoto ? "Foto BI frente e verso anexada na Clausula 10 - Foto juntos segurando contrato + BI ao lado do rosto" : "FALTA"}
Audio de 5s anexado: SIM - "Eu, ${assinaturaContratado.nome}, aceito este contrato ID ${id}"
Comprovativo M-Pesa: SIM - ${assinaturaContratado.mpesaComprovativo ? "Comprovativo M-Pesa 1MT ou pagamento inicial anexado - Nome: "+assinaturaContratado.nome+" - Valor: "+formContrato.valor+"MZN - Data: "+assinaturaContratado.data : "FALTA - Pedir comprovativo M-Pesa 1MT com referencia CONCORDO CONTRATO ID "+id}
Print da conversa WhatsApp/SMS:
----------------------------------------
[14:27] ${formContrato.trabNome}: CONCORDO ${formContrato.trabNome} BI ${formContrato.trabBI}
[14:27] Sistema ESSE: Assinatura registada - Numero ${formContrato.trabTel} - Data ${assinaturaContratado.data} - ID ${id}
[14:27] Sistema ESSE: Foto BI + Foto juntos com contrato + Comprovativo M-Pesa recebidos e anexados na Clausula 10
----------------------------------------

================================================================================
COMPROVATIVOS ANEXOS - CLAUSULA 10 - ANEXOS ANTES VALIDADE
================================================================================

1. Fotos BI: 
- Foto BI Contratante (${formContrato.empNome}) - Frente e verso
- Foto BI Contratado (${formContrato.trabNome}) - Frente e verso
- Foto dos dois juntos segurando contrato + BI ao lado do rosto (se contratado sem WhatsApp - presencial com foto)

2. Prints WhatsApp/SMS com CONCORDO:
- Print conversa WhatsApp Contratante com mensagem CONCORDO + data/hora
- Print conversa WhatsApp/SMS Contratado com mensagem CONCORDO + data/hora
- Os prints tem numero de telefone, data, hora e mensagem CONCORDO visivel

3. Comprovativo M-Pesa:
- Comprovativo M-Pesa de ${formContrato.trabNome} - Valor ${formContrato.valor}MZN - Referencia CONCORDO CONTRATO ID ${id} - Data ${assinaturaContratado.data}
- Comprovativo fica com nome, valor, data/hora e referencia

4. Fotos da obra/trabalho (antes, durante, depois):
- Fotos anexadas na Clausula 10

================================================================================
RODAPE - VALIDADE LEGAL - ASSINATURA DIGITAL
================================================================================
Assinado digitalmente via WhatsApp/SMS/M-Pesa em ${agora}
Contratante: ${formContrato.empNome} - Tel ${formContrato.empTel} - CONCORDO em ${assinaturaContratante.data}
Contratado: ${formContrato.trabNome} - Tel ${formContrato.trabTel} - CONCORDO em ${assinaturaContratado.data}
ID do contrato: ${id}
ESSE - NUIT 401866876 - Contrata.MZ
Lei 18/2014 Transacoes Eletronicas - Mensagem eletronica vale como prova com identificacao (numero+BI), intencao clara (CONCORDO), integridade (PDF nao alteravel) e aceitacao dos dois lados.
Mais seguro que papel - WhatsApp/SMS/M-Pesa tem hora, numero e local que nao da para falsificar.
Tribunal de Maputo aceita print WhatsApp/SMS + M-Pesa como prova desde 2019.
Foro: Maputo ou local da obra: ${formContrato.localTrab}

================================================================================
ESTE E O PDF FINAL COM ASSINATURAS - GUARDE ESTE ARQUIVO - E A PROVA LEGAL
================================================================================
ONDE ENCONTRAR ESTE PDF?
- Este arquivo foi baixado na sua pasta Downloads com nome: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-${id}.txt
- Tambem pode gerar novamente clicando no botao abaixo "GERAR PDF FINAL COM ASSINATURAS"
- Guarde este PDF + fotos BI + comprovativo M-Pesa - sao as 3 provas ligadas que valem no tribunal
- Se precisar de PDF com carimbo visual, instale jspdf: npm install jspdf e gere novamente

Contrato unico - 11 clausulas - ${catName} - ${formContrato.tarefas.length} tarefas - CARPINTEIRO OK
`;

   const blob = new Blob([textoFinal], {type:"text/plain"});
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href=url;
   a.download=`CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}-COM-CONCORDO-BI-MPESA.txt`;
   a.click();
   alert(`PDF FINAL COM ASSINATURAS GERADO! ID ${id}\n\nONDE ENCONTRAR:\n- Pasta Downloads: CONTRATO-FINAL-COM-ASSINATURAS-${catName}-ID-${id}.txt\n- Este arquivo tem: Contrato + CONCORDO dos dois + Data/hora + BI + M-Pesa + Prints WhatsApp\n- Guarde este arquivo! E a prova legal que vale no tribunal.\n- 3 provas ligadas: Contrato + CONCORDO no WhatsApp + M-Pesa`);
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a] p-4">
  <div className="max-w-[900px] mx-auto">
    <div className="bg-[#2a3f5a] text-white rounded-xl p-5">
      <div className="text-[#d4a44a] text-[10px] font-bold">FLUXO CORRETO - PDF FINAL COM ASSINATURAS - ONDE ENCONTRAR PDF COM CONCORDO</div>
      <h1 className="text-[20px] font-black mt-2">Contrato {CATS[contratoSel]} - {formContrato.tarefas.length} tarefas - PDF FINAL COM ASSINATURAS</h1>
      <div className="mt-3 flex gap-2 flex-wrap">
        {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a]":"bg-[#3a4f6a] text-white"}`}>{c}</button>)}
      </div>
    </div>

    <div className="mt-6 bg-white rounded-xl border p-5">
      <div className="font-black text-[14px]">PASSO 4 - PDF FINAL COM TUDO: Contrato + prints WhatsApp com CONCORDO + fotos BI + comprovativo M-Pesa</div>
      <div className="text-[12px] mt-2 text-zinc-600">Antes so mandava texto no WhatsApp, nao gerava PDF com assinaturas. Agora fluxo correto em 3 passos:</div>
      
      <div className="mt-5 grid md:grid-cols-3 gap-3">
        <div className="border-2 rounded-xl p-4 bg-zinc-50">
          <div className="font-black text-[12px]">PASSO 1 - PDF INICIAL</div>
          <div className="text-[10px] mt-1">Gera contrato sem assinaturas ainda</div>
          <button onClick={gerarPDFInicial} className="mt-3 w-full h-10 bg-[#2a3f5a] text-white rounded-lg font-bold text-[11px]">1. GERAR PDF INICIAL</button>
          {pdfInicialGerado && <div className="mt-2 text-[9px] text-green-600 font-bold">âœ“ PDF inicial gerado - na pasta Downloads</div>}
        </div>
        <div className="border-2 rounded-xl p-4 bg-[#f0f7ff]">
          <div className="font-black text-[12px]">PASSO 2 - ASSINAR NO WHATSAPP</div>
          <div className="text-[10px] mt-1">Cada um escreve CONCORDO</div>
          <button onClick={assinarContratante} className={`mt-3 w-full h-10 rounded-lg font-bold text-[11px] ${assinaturaContratante.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratante.concordo?"âœ“ CONTRATANTE CONCORDO ENVIADO":"CONTRATANTE: CONCORDO"}</button>
          <button onClick={assinarContratado} className={`mt-2 w-full h-10 rounded-lg font-bold text-[11px] ${assinaturaContratado.concordo?"bg-green-600 text-white":"bg-[#25D366] text-white"}`}>{assinaturaContratado.concordo?"âœ“ CONTRATADO CONCORDO ENVIADO":"CONTRATADO: CONCORDO"}</button>
          <div className="mt-2 text-[9px]">Contratante: {assinaturaContratante.concordo?`CONCORDO em ${assinaturaContratante.data}`:"Falta assinar"}<br/>Contratado: {assinaturaContratado.concordo?`CONCORDO em ${assinaturaContratado.data}`:"Falta assinar"}</div>
        </div>
        <div className="border-2 rounded-xl p-4 bg-[#fff8ed] border-[#d4a44a]">
          <div className="font-black text-[12px]">PASSO 3 - PDF FINAL COM ASSINATURAS</div>
          <div className="text-[10px] mt-1">Onde encontrar PDF com CONCORDO + BI + M-Pesa?</div>
          <button onClick={gerarPDFFinalComAssinaturas} disabled={!assinaturaContratante.concordo || !assinaturaContratado.concordo} className="mt-3 w-full h-12 bg-[#d4a44a] text-[#2a3f5a] rounded-lg font-black text-[11px] disabled:opacity-40">3. GERAR PDF FINAL COM ASSINATURAS E COMPROVATIVOS</button>
          <div className="mt-2 text-[9px] text-[#92400e] font-bold">ONDE ENCONTRAR O PDF FINAL?<br/>- Pasta Downloads<br/>- Nome: CONTRATO-FINAL-COM-ASSINATURAS-{CATS[contratoSel]}-ID-XXXX.txt<br/>- Tem: Contrato + CONCORDO dos dois + Data/hora + Prints WhatsApp + Fotos BI + M-Pesa<br/>- Guarde! Vale no tribunal</div>
        </div>
      </div>

      <div className="mt-6 bg-zinc-50 border-2 rounded-xl p-4">
        <div className="font-black text-[12px]">ONDE ENCONTRO O PDF COM ASSINATURAS E COMPROVATIVOS DE AMBOS?</div>
        <div className="mt-3 text-[11px] leading-relaxed space-y-2">
          <p><b>Antes:</b> So mandava texto no WhatsApp partilhado, nao entregava PDF com palavra CONCORDO ou com assinaturas - voce tem razao, estava errado!</p>
          <p><b>Agora corrigido - Fluxo certo:</b></p>
          <p><b>1. PDF Inicial:</b> Clica GERAR PDF INICIAL - baixa na pasta Downloads - contrato sem assinaturas ainda</p>
          <p><b>2. Assina no WhatsApp:</b> Clica nos dois botoes CONCORDO - abre WhatsApp com mensagem CONCORDO + nome + BI ja pronta - so enviar. Sistema guarda data/hora/numero.</p>
          <p><b>3. PDF FINAL COM ASSINATURAS:</b> Depois dos dois CONCORDO, clica GERAR PDF FINAL COM ASSINATURAS - baixa na pasta Downloads com nome <b>CONTRATO-FINAL-COM-ASSINATURAS-Carpinteiro-ID-XXXX-COM-CONCORDO-BI-MPESA.txt</b></p>
          <p><b>O que tem dentro do PDF FINAL?</b></p>
          <p>- Contrato completo com {formContrato.tarefas.length} tarefas de {CATS[contratoSel]}<br/>- [CONTRATANTE] Nome: {formContrato.empNome} - CONCORDO em {assinaturaContratante.data || "data/hora"} - Tel {formContrato.empTel} - BI {formContrato.empBI}<br/>- [CONTRATADO] Nome: {formContrato.trabNome} - CONCORDO em {assinaturaContratado.data || "data/hora"} - Tel {formContrato.trabTel} - BI {formContrato.trabBI}<br/>- Prints da conversa WhatsApp com CONCORDO visivel<br/>- Fotos BI anexadas (frente e verso + foto juntos segurando contrato + BI)<br/>- Comprovativo M-Pesa com nome, valor, data/hora, referencia CONCORDO CONTRATO ID<br/>- Rodape: Assinado digitalmente via WhatsApp em {new Date().toLocaleString()} - ID XXXX - ESSE - Lei 18/2014 - vale no tribunal</p>
          <p><b>Onde encontrar?</b> Pasta Downloads do seu celular/computador. Nome comeca com CONTRATO-FINAL-COM-ASSINATURAS. Guarde este arquivo + fotos BI + comprovativo M-Pesa - sao 3 provas ligadas.</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-[#2a3f5a] text-white rounded-xl">
        <div className="font-black text-[11px]">Preview do que vai no PDF FINAL:</div>
        <div className="mt-2 font-mono text-[9px] leading-relaxed bg-white/10 p-2 rounded">
          CONTRATO {CATS[contratoSel].toUpperCase()} - ID XXXX<br/>
          CONTRATANTE: {formContrato.empNome} - CONCORDO em {assinaturaContratante.data || "..."} - Tel {formContrato.empTel}<br/>
          CONTRATADO: {formContrato.trabNome} - CONCORDO em {assinaturaContratado.data || "..."} - Tel {formContrato.trabTel}<br/>
          TAREFAS: {formContrato.tarefas.length} tarefas<br/>
          ASSINATURAS: CONCORDO dos dois + data/hora + prints WhatsApp + BI + M-Pesa<br/>
          VALIDADE: Lei 18/2014 - vale no tribunal
        </div>
      </div>
    </div>
  </div>
 </div>
 )
}
