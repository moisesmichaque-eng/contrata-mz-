import { useEffect } from 'react';

export default function DonoDashboard() {
  useEffect(() => {
    // Redireciona para o protótipo final que é o painel do dono
    window.location.href = '/Contrata-Mz-Prototipo-Final.html';
  }, []);
  
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Carregando Painel do DONO...</h1>
      <p>Se não carregar, clica aqui: <a href="/Contrata-Mz-Prototipo-Final.html">Abrir Dashboard Dono</a></p>
    </div>
  );
}
