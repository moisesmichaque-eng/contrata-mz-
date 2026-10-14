import React, { useState, useEffect } from 'react';

export default function AdminPanel(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(()=>{
    const t = localStorage.getItem('admin_token');
    if(t) setToken(t);
  },[]);

  const register = async ()=>{
    setMessage('Registering...');
    const res = await fetch('/api/admin-register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    const j = await res.json();
    if(res.ok){ setMessage('Admin created. Please login.'); } else { setMessage(j.error || 'Error'); }
  };

  const login = async ()=>{
    setMessage('Logging in...');
    const res = await fetch('/api/auth-login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    const j = await res.json();
    if(res.ok){ setToken(j.token); localStorage.setItem('admin_token', j.token); setMessage('Logged in'); fetchProdutos(j.token); } else { setMessage(j.error || 'Login failed'); }
  };

  const fetchProdutos = async (tkn?:string)=>{
    const authHeader = (tkn || token) ? `Bearer ${tkn || token}` : '';
    const res = await fetch('/api/produtos', { headers: { Authorization: authHeader } });
    if(!res.ok){ setProdutos([]); return; }
    const j = await res.json(); setProdutos(j);
  };

  const createProduto = async (p:any)=>{
    const res = await fetch('/api/produtos', { method:'POST', headers:{'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }, body: JSON.stringify(p) });
    if(res.ok){ fetchProdutos(); }
  };

  if(!token) return (
    <div className="p-4">
      <h2 className="font-bold text-lg">Admin - Login / Registrar</h2>
      <div className="mt-3 grid grid-cols-1 gap-2 max-w-md">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="border p-2" />
        <input value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="password" className="border p-2" />
        <div className="flex gap-2">
          <button onClick={login} className="px-3 py-2 bg-blue-600 text-white">Login</button>
          <button onClick={register} className="px-3 py-2 bg-green-600 text-white">Create initial admin (only allowed email)</button>
        </div>
        <div className="text-sm text-red-600">{message}</div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg">Admin Dashboard</h2>
      <div className="mt-4">
        <h3 className="font-bold">Faturacao - Produtos</h3>
        <button onClick={()=>fetchProdutos()} className="px-3 py-2 bg-[#0ea5e9] text-white mt-2">Refresh</button>
        <div className="mt-2">
          {produtos.length===0 ? <div className="text-sm text-gray-500">No produtos or cannot fetch (check API)</div> : (
            <table className="w-full text-sm border">
              <thead><tr><th className="border p-1">Nome</th><th className="border p-1">Preco</th><th className="border p-1">Categoria</th></tr></thead>
              <tbody>{produtos.map(p=>(<tr key={p.id}><td className="border p-1">{p.nome}</td><td className="border p-1">{p.preco}</td><td className="border p-1">{p.categoria}</td></tr>))}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
