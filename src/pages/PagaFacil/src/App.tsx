
import { useState } from "react";
import { supabase } from "./lib/supabase";

const LOGO_MPESA = "data:image/webp;base64,UklGRmACAABXRUJQVlA4IFQCAACQDQCdASqAAEAAPu1wslGppqSiqhTZGTAdiWIA0AwpfAYF7Iz1KZwDzw9MY3kr/CMFgaCgZ94zNVBzAeWWIzc2+v6QqkZ8dGW6MizXxZVR3Texf71JJUbZHnQWydvXkfMC3pQZRcohqwroI7GDTxQDwXcXwwAA/uy9j+vNYoNf/56Z+tvuX6iMOo6YSIAi+dt2Q/VR++BbjfYhIA6Pz2nfHn8zfCCwre22Cn5ptcxRpoi0JSfThKMqgByWQuuKGnvXyAI1kvjM/VptgFxZISJo/FP8Tmrd+v1sk+zJD2Ez+s2KYblkiG8xnJvRRHdw/FYAbYQsLRfk6oKAu1TOddpVKR6k7QAT272sa3N7rdvifPlOsueI11u7XmbkhYGZcdp4pn5OstlzADgZJEWPn3f8NAKc+Su+ekiA/iOqZeX4QtxVQe8eBoaMlXNRa1Pr5c56upSy1jYdYm0Gn7kPN9E2VSLOJ4wonPdjUithS4AtHVGKWzrjZVwr1WzW7CEL4HiAmfKMeWXmfvh94vbocAWf4XGgxB2c+5tiF+gxIeJ45S6yD4Njsi8f+/TB4BqAZcuJWOSWFsq0+PCQDC3b8PG1JX9BJf691rQ4oIlBFBzXpyVH9O/TVPUVkkQkaakRW7HVyoIUeJR7qO8iavg1c9LfIdFnZpdqxmAqh3myYdfU11Pqpm9Bdx6folx4aQkzXALATskbN2xAFOtBQ44EwX7ktPV7c8AtgGNsgcA7dMeHkWtDsz7xSkkaTK7WukNxJxxekJHB75DviTHgn8AHnbKLAAAAAA==";
const LOGO_EMOLA = "data:image/webp;base64,UklGRrgEAABXRUJQVlA4IKwEAAAwGwCdASqAAIAAPu1ysVEppySiqhc5GTAdiWoAlQNVWMn7Q8nfyYA9l7/Geo39O7wzzAebF6W/8Zvsm9K/4Z/INYmTg76csrChbWDRKvZwiNU68KJIw1bla0zV5ZVZAWYroQ99KHFlQpPUOXQ5yX1Y3XnOjxAqMQQ/dJOnBRIVOjR4nfpYhehDhHzhx1GH+mM8jBGkyF0zfeE75l6+5ItIr/EyJHetF8o49EDQ7OAbjjfS7gIvYn1xyjVtTLdZI4O+md9Yqrz3FAVdKj1C9yttaddP2lNVCLXSlhpmduNKqplgAP7WMf/yfv+Gv9tvN7//N7/+WX+5vngAQ8bPsh9fc+lX6n9Srvzph8elsS+S4OXHsqy2tFmpo4oo5v7Mulpn3MXQ6v+mF2XVox76UPe0RgRs4XpvBRgouTKwee2gXbZYwClevwm7M87z2S14soJ8LfXBwUqTSa3OBgH7yc23U50hQq/jGCUtgzdBs5QPopi2PvAKBYMiOKctBbAJwav2vwuifs77wVfYeOkc6GLHQLB9BBRCNlUGlUTr7jjJjo0JuD87VMB6iLC92T2W9pYzPoNsDpYC3/fGOGBAfq5akHFTRFYJBlCGpOvDcJTDbKDJSaGs0ngzDKRTRI4WIVDr9VyeJA26Q9LCQUYC6dnteMxDoEoBAlTlLGnvtVdm8w4OC+WNAZB6miafXEfO767OBLqsjh+xCLKsp/BzdjHJ+5tULGUoyeLgYLqn5xue5RMVqYtA5iTjnb7251a1+h945HCR19naJvfRicG5ngeE2tG97xTxuB48FbVGOylK8fgGLGodtRXY9X5da/1o/gylgGl6R2H93jGJ0OvSQP0oJJq6dloKbXhaNZJuws4nnyBhGZbcLRpFNtiFrMpmt/MRp/ERurM6wcUd3YPatt9XGAAzyys7ygUGmbcXJFc/VUvuUAlIke9V/rtgBVEHXmaIKMZ1nRfQu6uMqk0vifIrBobirhGjbt1zEymsR8fmv/KI8PEmkdbDLMz4gdW3teQ3wVXR/e/Asd2sapAArC4JeJOdQvEr8Waap/kWT2oYL66+7kiJpnFHrj4UD3Cvu94V9eitELqCK9afWXZg8E/Rqv3e4KA1JjFjf4qqDwNWEhxvd/9wZ9LX0zFXvuZZk0mHSGbvVW1i0G6hXhtNbLKASuU7HDL76JU2zAo0RRqtAj1+iHb8+2GPQuD8yTN/oerKNI7z25BCcQkn7rfrDIFaY6MvPU4hPKL/vF489dfP81X7dQNMQa6PVGNt5lgFySazH3VF99nSznHhVnxLhS/4P6gVp0vWsRx3kr0l0B5t/IYGBQQBSmwbipsIWXHpBkRvpKQCxEWFDU/YOO8QtUgaqSHAlMWRZ+12Z3SbbhfsbCCT9NUNdzQhqMJZ+dbH6uGgimu7KHYJLLq1aDOCe7yil337XukmQXAqT+oDEIHwQiHXF4EJpKPC4MqGZq74IguPwnZcUoPuwbDeIs35vFqocMMBAdKu8Tls7qR74aUzmRO5Ph14ne038ek9MVxsaBgD0z0gJWrYoyhINYWop2TVQJqbeqUFLASctrLMzG9kRfDqvezNJvAAAAAAAA==";
const LOGO_MKESH = "data:image/webp;base64,UklGRvIBAABXRUJQVlA4IOYBAACwDgCdASqAAEMAPu10tFGppyWipbkqaTAdiWIA1W+9FfzYmgA8zHm99Fv1IG8nf6rJm7U/JxXjWLuKgBFzhgHnV0dGz7Mna00NsLzqYCEv966VUoJdo3wcgp+hNlUW4DYPikZbn0mmztlHIZRZdmc2vQwqngMaLm/8eWPz8OAA/vGwheOXvQn99JUuXodGH92iirxAXCqkQ8acI86QMR9j8zIP+fEMEhmEMp4pvwW9v0tDAIJpfk+5n7/fSYINYIn5vOBLjkE2F7wyGqswUjK15AE2FH4fvn+GkzkOC9WEp91x+qZCZrRNtOZ4H2K2tahjo/lW2Ayns7d6E1n+3OXr6gZKhGXsKiim0lpM1TM2/JyX+fMMIf2LPPeDjUB5N2Jq2POHe0LOuZb8ObOHs7N0tmJQU3yK4S7VQ2i7VwJtg7e1uA6jg9h5h4n7ip7/a7OjHPutc3n0qckFTcnlR2azvdgBx4ZKlTwkoJUwWV3n9im2tnMFDOVJgSjtU+AYhfc3p8K499/67LQ6GnWJq+7jBoSmuTFXvgjDYJibdzImkE2+O3cB7U5HPwhh+PHODKfLvp/BXyepfVe7sY2/BS48Ewro57TGG1zaT28TANDDnIzN/4b9JmyWpCMiOgXTsfBKw24AAAA=";
const LOGO_WA = "data:image/webp;base64,UklGRtYDAABXRUJQVlA4IMoDAABwGQCdASqAAIAAPu1iqk4ppSQjLhJOqTAdiWQAy2ZW3rqZwiQLdlj0yFtoOu3UiwoMPU23Fa2ep0wRap8hKqQsekH9x+0x4gwX8J2I+vRgcwqi42FGohH4hKstVXipED7bVtpiRD2oNBnAUoJN05+1ES8OCWnlpRwOQPUKROGPNyMLCnB1XETq6V7RdcudpOgsU2B758tP1YwUU9QlLb2GNTLiQuPRsvC9v1nBwN87vwOVbh2AbQuLH/D486ROAJLCpawQaS2gpTmw8Hu3twMZ4hywAAD+9lCHG6nfnIKL3dJdPAptxr9LAZFhvBYE9NJ2q6xOJrPS1gkjtH5Amuavtj0T3RXU5b/EQuwF0NLAfFuQWblz3RiGt5YYK3iRuVQdvypo4jBGxWiTNkyKfrytqhwOBpEeTyDdwQgd43zRxqcciC5ByDAH+pkCyB/EA7le1VH9EgR6DxXLqbO8S3qiUMga0F9PrfEcLnII3eugOgytWkztteRNocj2swgZ5kMcnnyMMoB0YRiZ5o0qL3Fr00qekqG/b430BHyPkLySO303Wqx1LYBLjY2ol9RuKMOr3VxVmQ55pylejhtiIxy/EQmAdWb1CSDPlqnBd1DSscLq4ioOPZ/3QoEwPQUfvfDcy8jBwHD2JoNQrnFuIEZTvVcWw7TucFpb8EQABZiLsgsNJ38GbVV5n+9SF2Epi6zlWtejsoGgDaLgqy4oFHVemzKJCOHymdFoxB789GiYvO0PE7N2TYX6qE6wJHDxnm5ItawVTH1icLQMHX0K2bOlJ8WbCCITE1lwXNLI+ZwPf4NgR2mpgpEklBeb+U3EGfjGgTcc1BRHCz7pTMDABAe9G9iIyCbiUkVkpq6Pi0dK6nJgC/szDZKIlAyuktjZbGKfjpIKzzU2hvTZjus8+EYoJOA86mN69O3bjvsT9k+d9dPMnE1BROrexhRsmOSJ4Y9GwLCQ02fBvB2/2z7qtuT24wF9jKEWZWY4DZoghIkktSWpyesothaBo6XbkL0210eTPDGTMR/7CkAs9VKs/gD8TMU5u9lIX/P5yEHaGgcgtvwhXyi95xColerkkSACKeLtumo+LR6Ks+l4ObmXb+t/D6I4A6ndPaLTW8uP+llQ+j6EiR6JFQ0TQcEyzv7MmCKRr/5qNMa9Ev8flidhJiDJaSm0cHhjhHB6/Bhe4BXMMLwxMVwL1WoQayZhl6x6lVgvVp9fQplxpXtCuzWFXcnDIciELY8iCrZ7AtIi1Ezka0Mw/QRjegwuQVQgA33Fy0Jl8faoOhgiGCAA";

const INFRACOES = ["Excesso de velocidade","Inspecao vencida / Falta de inspecao","Taxa de radio","Falta de manifesto","Alcool / Conducao sob efeito","Falta de cinto","Uso de telemovel","Estacionamento irregular","Falta de documentos","Semaforo vermelho","Outros"];
const EDU = ["Matricula","Renovacao de matricula","Inscricao","Propinas / Mensalidades","Certificado","Declaracao","Transferencia","2a via","Equivalencia","Outros"];

const CATEGORIES = [
  { id: "multas", title: "Multas e Infracoes", desc: "Local + data + lista", fields: [
    { name: "matricula", label: "Matricula", placeholder: "AAB 123 MP" },
    { name: "local_atuacao", label: "Local de atuacao da multa", placeholder: "Ex: Av. 25 Setembro - Maputo" },
    { name: "data_autuacao", label: "Data de autuacao", type: "date" },
    { name: "infracao", label: "Infracao / Razao da multa", type: "select", options: INFRACOES },
    { name: "num_auto", label: "No Auto (opcional)", placeholder: "2025/12345" },
  ]},
  { id: "iva", title: "Impostos (IVA, IRPS, IRPC)", desc: "Impostos e taxas", fields: [
    { name: "nuit", label: "NUIT", placeholder: "100123456" },
    { name: "tipo_imposto", label: "Tipo de imposto", type: "select", options: ["IVA","IRPS","IRPC","Outros"] },
    { name: "periodo", label: "Periodo", placeholder: "Janeiro / T1" },
  ]},
  { id: "inatro", title: "INATRO (ex-INATTER)", desc: "Cartas, licencas", fields: [
    { name: "tipo_servico", label: "Servico INATRO", type: "select", options: ["Renovacao carta","2a via carta","Averbamento","Licenca"] },
    { name: "num_carta", label: "No Carta / BI", placeholder: "123456" },
  ]},
  { id: "municipal", title: "Taxas Municipais / Comerciantes", desc: "Com provincia/cidade/municipio", fields: [
    { name: "tipo_taxa", label: "Tipo de taxa", type: "select", options: ["Taxa atividade economica","Licenca funcionamento","Imposto predial","Taxa publicidade","Taxa mercado","Outros"] },
    { name: "provincia_municipal", label: "Provincia / Cidade / Municipio onde vai pagar", placeholder: "Ex: Matola - Municipio da Matola" },
    { name: "bairro", label: "Bairro / Local", placeholder: "Ex: Liberdade" },
  ]},
  { id: "inspeccao", title: "Inspeccao Veicular", desc: "Agendamento", fields: [
    { name: "matricula", label: "Matricula", placeholder: "AAB 123 MP" },
    { name: "centro", label: "Centro / Provincia onde vai inspeccionar", placeholder: "Ex: Matola" },
  ]},
  { id: "educacao", title: "Educacao e Escola", desc: "Com lista", fields: [
    { name: "tipo_servico_edu", label: "Servico escolar", type: "select", options: EDU },
    { name: "nome_aluno", label: "Nome do aluno", placeholder: "Ex: Maria Joao" },
    { name: "escola", label: "Escola / Instituicao", placeholder: "Ex: Josina Machel" },
    { name: "classe", label: "Classe / Curso", placeholder: "Ex: 10a Classe" },
  ]},
  { id: "certidoes", title: "Certidoes e Documentos", desc: "NUIT, criminal", fields: [
    { name: "tipo_certidao", label: "Tipo", type: "select", options: ["NUIT","Registo criminal","Nascimento","Outros"] },
    { name: "nome", label: "Nome completo", placeholder: "Joao Silva" },
  ]},
  { id: "outros", title: "Outros Servicos", desc: "INSS, Migracao", fields: [
    { name: "servico", label: "Qual servico?", placeholder: "INSS, DIRE..." },
  ]},
];

const PAGAMENTOS = [
  { id: "mpesa", nome: "M-Pesa", logo: LOGO_MPESA, numero: "840532899" },
  { id: "emola", nome: "e-Mola", logo: LOGO_EMOLA, numero: "864341779" },
  { id: "mkesh", nome: "mKesh", logo: LOGO_MKESH, numero: "823832513" },
];

export default function App() {
  const [selected, setSelected] = useState<any>(CATEGORIES[0]);
  const [form, setForm] = useState<any>({});
  const [personal, setPersonal] = useState({ nome: "", telefone: "", email: "", provincia: "", valorDoc: "" });
  const [numeroPagamento, setNumeroPagamento] = useState("");
  const [ficheiros, setFicheiros] = useState<FileList | null>(null);
  const [pagamento, setPagamento] = useState("mpesa");
  const [confirmado, setConfirmado] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [salvoMsg, setSalvoMsg] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [lang, setLang] = useState<"PT"|"EN">("PT");
  
  const valorNum = parseFloat(personal.valorDoc) || 0;
  const taxa = valorNum * 0.10;
  const total = valorNum + taxa;

  const handleConfirm = () => {
    if(!numeroPagamento) { alert("Digite o numero que vai pagar (84/82...)"); return; }
    setConfirmado(true);
  };

  const handleSubmit = async () => {
    if(!confirmado) { alert("Primeiro clique em Confirmar para receber o pop-up e colocar o PIN!"); return; }
    if(!personal.nome || !personal.telefone) { alert("Preencha nome e telefone"); return; }
    setEnviando(true);
    const pag = PAGAMENTOS.find(p=>p.id===pagamento)!;
    
    // 1. SOBE FICHEIROS PARA PASTA documents (que ja existe)
    let urlsFicheiros: string[] = [];
    if (ficheiros && ficheiros.length > 0) {
      for (const file of Array.from(ficheiros)) {
        const nomeUnico = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error } = await supabase.storage.from('documents').upload(nomeUnico, file);
        if (!error) {
          const { data } = supabase.storage.from('documents').getPublicUrl(nomeUnico);
          urlsFicheiros.push(data.publicUrl);
        } else {
          console.error("Erro upload:", error.message);
        }
      }
    }

    const textoFicheiros = urlsFicheiros.length > 0 
      ? `Ficheiros: ${urlsFicheiros.join(' | ')}` 
      : "Sem ficheiros anexados";

    // 2. SALVA NO ADMIN com links dos ficheiros no tipo_servico
    const tipoComFicheiros = `${selected.title} | ${textoFicheiros} | Detalhes: ${JSON.stringify(form)}`;

    supabase
      .rpc("criar_pedido", {
        p_nome: personal.nome,
        p_telefone: personal.telefone,
        p_email: personal.email,
        p_provincia: personal.provincia,
        p_tipo_servico: tipoComFicheiros,
        p_nome_escola: String(form["escola"] ?? form["provincia_municipal"] ?? form["matricula"] ?? ""),
        p_nome_aluno: String(form["nome_aluno"] ?? ""),
        p_forma_pagamento: pag.nome,
        p_numero_pagamento: numeroPagamento,
        p_valor: valorNum,
      })
      .then(({ error }) => {
        if (error) { 
          console.error("criar_pedido:", error.message); 
          setSalvoMsg("Erro ao salvar: " + error.message);
          setEnviando(false);
          return; 
        }
        setSalvoMsg(`Pedido salvo no admin! ${urlsFicheiros.length} ficheiro(s) salvo(s)`);
        setEnviando(false);
      });

    // 3. ABRE WHATSAPP com links dos ficheiros
    const msg = `*NOVO PEDIDO - ${selected.title}*
Nome: ${personal.nome}
Tel: ${personal.telefone}
Email: ${personal.email || "nao informado"}
Provincia: ${personal.provincia}
Valor oficial: ${valorNum} MT | Taxa 10%: ${taxa.toFixed(0)} MT | Total: ${total.toFixed(0)} MT
Pagamento: ${pag.nome} - Numero: ${numeroPagamento}
Detalhes: ${JSON.stringify(form)}
${textoFicheiros}`;

    window.open(`https://wa.me/258${pag.numero}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: "80px" }}>
      <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "38px", height: "38px", background: "#10b981", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900 }}>FM</div>
            <div><div style={{ fontWeight: 800, fontSize: "14px" }}>FACILITA MOCAMBIQUE</div><div style={{ fontSize: "10px", color: "#64748b" }}>Voce envia. Nos facilitamos.</div></div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={()=>setLang("PT")} style={{ padding: "6px 12px", borderRadius: "20px", border: "1px solid #10b981", background: lang==="PT"?"#10b981":"white", color: lang==="PT"?"white":"#10b981", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>PT</button>
            <button onClick={()=>setLang("EN")} style={{ padding: "6px 12px", borderRadius: "20px", border: "1px solid #10b981", background: lang==="EN"?"#10b981":"white", color: lang==="EN"?"white":"#10b981", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>EN</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <div style={{ background: "#f0fdfa", borderRadius: "20px", padding: "24px", border: "1px solid #ccfbf1", marginBottom: "16px" }}>
          <h1 style={{ fontSize: "32px", margin: 0, fontWeight: 900 }}>Voce envia. Nos <span style={{ color: "#10b981" }}>facilitamos.</span></h1>
          <p style={{ fontSize: "14px", color: "#475569", marginTop: "8px" }}>Chega de filas longas! Evite horas de espera. Nos tratamos de tudo por si.</p>
        </div>

        <h2 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "10px" }}>Escolha a categoria</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "8px", marginBottom: "16px" }}>
          {CATEGORIES.map(c=>(
            <button key={c.id} onClick={()=>setSelected(c)} style={{ background: selected?.id===c.id?"#10b981":"white", color: selected?.id===c.id?"white":"#0f172a", border: selected?.id===c.id?"2px solid #10b981":"1px solid #e2e8f0", borderRadius: "12px", padding: "12px", textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontWeight: 700, fontSize: "13px" }}>{c.title}</div><div style={{ fontSize: "11px", opacity: 0.8 }}>{c.desc}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", fontWeight: 700, fontSize: "14px" }}>{selected.title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "16px", padding: "16px" }}>
              <div>
                {selected.fields.map((f:any)=>(
                  <div key={f.name} style={{ marginBottom: "10px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "4px" }}>{f.label}</label>
                    {f.type==="select" ? (
                      <select value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}>
                        <option value="">Selecione...</option>
                        {f.options.map((opt:string)=>(<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    ) : (
                      <input type={f.type||"text"} value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})} placeholder={f.placeholder||""} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }} />
                    )}
                  </div>
                ))}
                <div style={{ marginTop: "14px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, display: "block", marginBottom: "6px" }}>Anexar documentos (em todos os formularios)</label>
                  <div style={{ border: "2px dashed #10b981", borderRadius: "10px", padding: "12px", background: "#f0fdfa" }}>
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e=>setFicheiros(e.target.files)} style={{ width: "100%", fontSize: "12px" }} />
                    <div style={{ fontSize: "10px", color: "#64748b", marginTop: "6px" }}>PDF, JPG, PNG, DOC - Max 10MB cada. Agora vai para pasta documents e aparece no admin e no WhatsApp!</div>
                    {ficheiros && <div style={{ fontSize: "11px", color: "#10b981", fontWeight: 700, marginTop: "6px" }}>{ficheiros.length} ficheiro(s) selecionado(s): {Array.from(ficheiros).map(f=>f.name).join(', ')}</div>}
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: "1px solid #f1f5f9", paddingLeft: "16px" }}>
                <input placeholder="Nome completo *" value={personal.nome} onChange={e=>setPersonal({...personal,nome:e.target.value})} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "8px", fontSize: "13px" }} />
                <input placeholder="Telefone *" value={personal.telefone} onChange={e=>setPersonal({...personal,telefone:e.target.value})} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "8px", fontSize: "13px" }} />
                <input placeholder="Email (opcional)" value={personal.email} onChange={e=>setPersonal({...personal,email:e.target.value})} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px", background: "#f8fafc", marginBottom: "8px" }} />
                <input placeholder="Provincia / Cidade / Municipio onde vai pagar" value={personal.provincia} onChange={e=>setPersonal({...personal,provincia:e.target.value})} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "10px", fontSize: "13px" }} />

                <div style={{ background: "#f0fdfa", border: "1px solid #ccfbf1", borderRadius: "10px", padding: "10px", marginBottom: "10px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700 }}>Valor do documento (MT)</label>
                  <input type="number" value={personal.valorDoc} onChange={e=>setPersonal({...personal,valorDoc:e.target.value})} placeholder="Ex: 1500" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", margin: "6px 0", fontSize: "13px" }} />
                  <div style={{ fontSize: "11px", display: "flex", justifyContent: "space-between" }}><span>Valor oficial:</span><span>{valorNum} MT</span></div>
                  <div style={{ fontSize: "11px", display: "flex", justifyContent: "space-between" }}><span>Taxa 10% fixa:</span><span>{taxa.toFixed(0)} MT</span></div>
                  <div style={{ background: "#10b981", color: "white", borderRadius: "20px", padding: "6px 10px", display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 800, marginTop: "6px" }}><span>Valor incluindo taxa:</span><span>{total.toFixed(0)} MT</span></div>
                </div>

                <div style={{ fontWeight: 700, fontSize: "12px", marginBottom: "8px" }}>Forma de pagamento</div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  {PAGAMENTOS.map(p=>(
                    <button key={p.id} onClick={()=>{setPagamento(p.id); setConfirmado(false);}} style={{ flex: 1, background: pagamento===p.id?"#f0fdfa":"white", border: pagamento===p.id?"2px solid #10b981":"1px solid #e2e8f0", borderRadius: "10px", padding: "6px", cursor: "pointer" }}>
                      <img src={p.logo} alt={p.nome} style={{ width: "100%", height: "36px", objectFit: "contain" }} />
                      <div style={{ fontSize: "10px", fontWeight: 700, textAlign: "center", marginTop: "4px" }}>{p.nome}</div>
                    </button>
                  ))}
                </div>

                <input placeholder="Numero que vai pagar (84/82...)" value={numeroPagamento} onChange={e=>setNumeroPagamento(e.target.value)} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "6px", fontSize: "13px" }} />
                <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "12px" }}>O comprovativo sera enviado via WhatsApp com link dos ficheiros</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <button onClick={handleConfirm} style={{ background: confirmado ? "#dcfce7" : "white", color: confirmado ? "#15803d" : "#0f172a", border: confirmado ? "2px solid #22c55e" : "2px solid #0f172a", padding: "12px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "13px" }}>
                    {confirmado ? "Confirmado" : "Confirmar"}
                  </button>
                  <button onClick={handleSubmit} disabled={enviando} style={{ background: "#10b981", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px", opacity: enviando ? 0.6 : 1 }}>
                    <img src={LOGO_WA} alt="WA" style={{ width: "16px", height: "16px" }} /> {enviando ? "Enviando..." : "Enviar via WhatsApp"}
                  </button>
                </div>
                {confirmado && <div style={{ fontSize: "11px", color: "#15803d", background: "#dcfce7", padding: "8px", borderRadius: "8px", marginTop: "8px", textAlign: "center" }}>Pop-up enviado para {numeroPagamento}! Introduza o PIN no seu telefone.</div>}
                {salvoMsg && <div style={{ fontSize: "11px", color: "#15803d", background: "#dcfce7", padding: "8px", borderRadius: "8px", marginTop: "8px", textAlign: "center" }}>âœ“ {salvoMsg}</div>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
