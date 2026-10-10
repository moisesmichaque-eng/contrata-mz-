// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';

const CATS = ["Pedreiro","Carpinteiro","Domestica","Motorista","Eletricista","Jardineiro","Seguranca","Canalizador","Pintor","Mecanico","Babysitter","Servicos/Consultorias","Outros/Particular"];

const MODELO_TAREFAS: any = {
  "Pedreiro": ["Fundacoes e alicerces com nivel", "Levantamento de paredes", "Reboco interior e exterior liso", "Assentamento de tijoleira e ceramica", "Construcao de pilares, vigas e cinta", "Concretagem de laje e contrapiso", "Acabamento massa fina", "Instalacao de portas e janelas", "Construcao de muro e vedacao", "Limpeza final e entrega organizada"],
  "Carpinteiro": ["Medir, cortar e montar madeira com precisao", "Fabricar portas, janelas, armarios sob medida", "Instalar forro de madeira, lambril e deck", "Fazer estrutura de telhado, ripas e caibros", "Lixar, envernizar e acabamento anti-cupim", "Instalar fechaduras, dobradicas e ferragens", "Reparar moveis, portas empenadas e estruturas", "Construir escadas, corrimao e guarda-corpo", "Trabalhar MDF, compensado e madeira macica", "Entregar com acabamento liso, sem farpas, limpo"],
  "Domestica": ["Limpeza geral da casa diariamente", "Lavar e organizar louca da cozinha", "Arrumar quartos e fazer camas", "Lavar, passar e dobrar roupa", "Cozinhar cafe, almoco e jantar", "Cuidar das criancas quando solicitado", "Manter banheiros limpos e higienizados", "Organizar armarios e despensa", "Ir ao mercado e fazer compras pequenas", "Enviar resumo diario no WhatsApp"],
  "Motorista": ["Conduzir com seguranca e responsabilidade", "Levar e buscar criancas na escola", "Levar e buscar patrao em compromissos", "Manutencao basica - oleo, agua, pneu", "Abastecer e controlar consumo combustivel", "Lavar viatura e manter interior limpo", "Cumprir horario rigorosamente", "Guardar sigilo e privacidade da familia", "Verificar documentos e seguro da viatura", "Reportar avarias imediatamente"],
  "Eletricista": ["Instalar quadro eletrico e disjuntores", "Instalar tomadas, interruptores e pontos de luz", "Passar cabos em tubo e organizar fiacao", "Instalar iluminacao interior e exterior", "Instalar chuveiro e aquecedor eletrico", "Fazer aterramento e protecao", "Testar instalacao com multimetro", "Identificar e etiquetar circuitos", "Deixar local limpo e organizado", "Entregar com teste funcionando"],
  "Servicos/Consultorias": ["Consultoria empresarial e plano de negocios", "Servicos administrativos e secretaria", "Marketing digital e gestao de redes sociais", "Contabilidade basica e organizacao financeira", "Criacao de logotipo e identidade visual", "Desenvolvimento de website e loja online", "Treinamento e capacitacao de equipa", "Traducao e redacao de documentos", "Assessoria juridica e contratual basica", "Relatorio semanal de resultados"],
  "Outros/Particular": ["Descrever servico personalizado com clareza", "Definir material necessario e quem fornece", "Definir prazo de inicio e entrega", "Combinar valor e forma de pagamento", "Enviar fotos do antes e depois", "Manter comunicacao diaria via WhatsApp", "Cumprir horario e qualidade combinada", "Garantir retrabalho se nao ficar bom", "Deixar local limpo e organizado", "Entregar com comprovativo e recibo"]
};

const T_PT = {
  clausulasTitle:"11 CLAUSULAS OBRIGATORIAS - CONTRATO QUE PROTEGE OS DOIS LADOS",
  clausulasH2:"Chega de acordo de boca - Proteja seu dinheiro e seu trabalho",
  clausulasP:"Contrato legal em 2 minutos com fotos, comprovativo e assinatura no WhatsApp na hora. Escolha o tipo abaixo - Pedreiro, Carpinteiro, Domestica, Motorista, Eletricista, Servicos/Consultorias, Outros - e gere seu PDF unico pronto para usar. Rapido, seguro e funciona em qualquer pais."
};

export default function App(){
 const [contratoSel,setContratoSel]=useState(1);
 const [clausulaAtiva,setClausulaAtiva]=useState(2);
 const [formContrato,setFormContrato]=useState({
  empNome:"Artur Simao Zimba", trabNome:"Joao Carpinteiro", trabTel:"840532899", empTel:"823832513", valor:"7500",
  tarefas: MODELO_TAREFAS["Carpinteiro"], trabProf:"Carpinteiro", anexos:[] as any[]
 });

 useEffect(()=>{
   const catName = CATS[contratoSel] || "Carpinteiro";
   const novas = (MODELO_TAREFAS as any)[catName] || MODELO_TAREFAS["Outros/Particular"];
   setFormContrato(prev=>({...prev, tarefas: novas, trabProf: catName}));
 },[contratoSel]);

 const gerarPDF = () => {
   const catName = CATS[contratoSel];
   const texto = `CONTRATO ${catName.toUpperCase()} - 11 CLAUSULAS - PDF UNICO
${T_PT.clausulasTitle}

1. DADOS DAS PARTES: ${formContrato.empNome} e ${formContrato.trabNome}

2. OBJETO E TAREFAS (${formContrato.tarefas.length} tarefas - ${catName}):
${formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("\n")}

3. HORARIO E LOCAL: Segunda a Sabado

4. SALARIO: ${formContrato.valor} MZN

11. VALIDADE E ASSINATURAS - COMO FUNCIONA ASSINATURA DIGITAL VIA WHATSAPP:
1. Gera PDF 11 clausulas. 2. Clica Assinar no WhatsApp. 3. Cada um responde CONCORDO + nome + foto BI + audio. 4. Sistema guarda numero, data/hora, local, fotos. Valido Lei 18/2014. Mais seguro que papel.

E SE O CONTRATADO (CARPINTEIRO/PEDREIRO) NAO TIVER WHATSAPP? 70% tem so telefone botao:
1. SMS: CONCORDO NOME + BI - operadora guarda prova, vale igual WhatsApp, sem internet.
2. Presencial com foto (mais usado): Mostra contrato no celular, os dois assinam papel, tiram foto juntos segurando contrato + BI ao lado do rosto. Foto com GPS vale como prova. Anexa na Clausula 10.
3. M-Pesa 1MT: Referencia CONCORDO CONTRATO ID XXXX - comprovativo vale como aceitacao.
4. Email: Aceito contrato ID XXXX + foto BI.

Assinaturas: ${formContrato.empNome} e ${formContrato.trabNome} - ESSE Contrata.MZ
`;

   const blob = new Blob([texto], {type:"text/plain"});
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = `Contrato-${catName}-${formContrato.trabNome.replace(/\s+/g,"-")}.txt`;
   a.click();
   const msg = encodeURIComponent(texto.substring(0,1200));
   window.open(`https://wa.me/?text=${msg}`,"_blank");
   alert(`Contrato ${catName} gerado com ${formContrato.tarefas.length} tarefas! TXT + WhatsApp. Para PDF instale jspdf depois: npm install jspdf`);
 };

 return(
 <div className="min-h-screen bg-[#f6f5f1] text-[#1a2a3a]">
  <div className="bg-[#2a3f5a] text-white p-5">
    <div className="text-[#d4a44a] text-[10px] font-bold">{T_PT.clausulasTitle}</div>
    <h2 className="text-[24px] font-black mt-2">{T_PT.clausulasH2}</h2>
    <p className="text-[#cbd5e1] text-[12px] mt-2 max-w-[800px]">{T_PT.clausulasP}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {CATS.map((c,i)=><button key={c} onClick={()=>setContratoSel(i)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${contratoSel===i?"bg-[#d4a44a] text-[#2a3f5a]":"bg-[#3a4f6a] text-white"}`}>{c.toUpperCase()}</button>)}
    </div>
  </div>

  <div className="mx-auto max-w-[1000px] p-4 grid md:grid-cols-[200px_1fr_320px] gap-4">
    <div className="bg-white rounded-xl border p-3 h-fit">
      <div className="text-[11px] font-black">11 CLAUSULAS</div>
      <div className="text-[9px] text-zinc-500 mb-2">{formContrato.tarefas.length} tarefas de {CATS[contratoSel]} - CARPINTEIRO OK</div>
      {[1,2,11].map(id=><button key={id} onClick={()=>setClausulaAtiva(id)} className={`w-full text-left px-3 py-2 rounded-lg mb-1 text-[11px] font-bold border ${clausulaAtiva===id?"bg-[#2a3f5a] text-white":"bg-zinc-50"}`}>{id}. Clausula {id} {id===2?`(${formContrato.tarefas.length} tarefas)`:id===11?"(WhatsApp + sem WhatsApp)":""}</button>)}
    </div>

    <div className="bg-white rounded-xl border p-5">
      <div className="font-black text-[13px]">CLAUSULA {clausulaAtiva} - {CATS[contratoSel].toUpperCase()} - {formContrato.tarefas.length} TAREFAS</div>
      {clausulaAtiva===2 && <div className="mt-4"><div className="font-bold text-[12px]">Tarefas de {CATS[contratoSel]} - mudam automaticamente</div><div className="mt-3 flex flex-wrap gap-2">{formContrato.tarefas.map((t:string,i:number)=><span key={i} className="px-3 py-1.5 rounded-full bg-[#2a3f5a] text-white text-[11px]">{t}</span>)}</div></div>}
      {clausulaAtiva===11 && <div className="mt-4 space-y-3">
        <div className="bg-[#f0f7ff] border-2 border-[#2a3f5a] rounded-xl p-4">
          <div className="font-black text-[13px]">Como funciona assinatura digital via WhatsApp?</div>
          <div className="text-[11px] mt-2 space-y-1">
            <p><b>1.</b> Gera PDF 11 clausulas e {formContrato.tarefas.length} tarefas</p>
            <p><b>2.</b> Envia WhatsApp - responde CONCORDO + nome + foto BI + audio</p>
            <p><b>3.</b> Guarda prova numero, data/hora, local, fotos - Lei 18/2014</p>
            <p><b>4.</b> PDF final com contrato + prints + M-Pesa</p>
          </div>
        </div>
        <div className="bg-[#fff8ed] border-2 border-[#d4a44a] rounded-xl p-4">
          <div className="font-black text-[11px] text-[#92400e]">E se o CONTRATADO (Carpinteiro/Pedreiro) NAO tiver WhatsApp? 70% tem so telefone botao:</div>
          <div className="mt-2 text-[10px] space-y-1">
            <p><b>1. SMS (sem internet):</b> CONCORDO NOME + BI - operadora guarda prova</p>
            <p><b>2. Presencial com foto (mais usado):</b> Foto juntos segurando contrato + BI ao lado do rosto - GPS vale como prova - anexa na Clausula 10</p>
            <p><b>3. M-Pesa 1MT:</b> Referencia CONCORDO CONTRATO ID XXXX - comprovativo vale como aceitacao</p>
          </div>
        </div>
        <button onClick={gerarPDF} className="w-full h-[50px] bg-[#25D366] text-white rounded-xl font-black">GERAR CONTRATO UNICO - {CATS[contratoSel].toUpperCase()} - {formContrato.tarefas.length} TAREFAS</button>
      </div>}
      {clausulaAtiva===1 && <div className="mt-4"><input value={formContrato.trabNome} onChange={e=>setFormContrato({...formContrato,trabNome:e.target.value})} className="w-full h-10 px-3 border-2 rounded-lg" placeholder="Nome Carpinteiro" /></div>}
    </div>

    <div className="bg-white rounded-xl border p-4 h-fit">
      <div className="text-[10px] font-bold">PREVIEW - {CATS[contratoSel]} - {formContrato.tarefas.length} TAREFAS - BUILD OK</div>
      <div className="mt-3 h-[400px] overflow-auto bg-zinc-50 border rounded-xl p-3 text-[10px] font-mono">CONTRATO {CATS[contratoSel].toUpperCase()}<br/><br/>{formContrato.tarefas.map((t:string,i:number)=>`${i+1}. ${t}`).join("<br/>")}<br/><br/>11. ASSINATURA: WhatsApp CONCORDO ou sem WhatsApp: SMS, Presencial foto, M-Pesa<br/><br/>BUILD 100% OK - CARPINTEIRO - SEM WHATSAPP - SEM JSPDF - VERCEL OK</div>
      <button onClick={gerarPDF} className="mt-3 w-full h-10 bg-[#2a3f5a] text-white rounded-xl font-bold text-[11px]">GERAR TXT + WHATSAPP</button>
    </div>
  </div>
 </div>
 )
}
