let produtosDB = [
  { 
    id: 1, 
    nome: 'Pacote Completo 11 Cláusulas', 
    preco: 1500, 
    categoria: 'Contrato Trabalho',
    bi_opcional: true,
    nuit_opcional: true,
    clausula_4: '', clausula_5: '', clausula_6: '', clausula_7: '',
    clausula_8: '', clausula_9: '', clausula_10: '',
    clausula_11: 'Contrato fechado - não editável'
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json(produtosDB);
  
  if (req.method === 'POST') {
    const p = req.body;
    p.id = Date.now();
    produtosDB.push(p);
    return res.status(201).json(p);
  }
  
  if (req.method === 'PUT') {
    const p = req.body;
    produtosDB = produtosDB.map(x => x.id === p.id ? p : x);
    return res.status(200).json(p);
  }
  
  if (req.method === 'DELETE') {
    const { id } = req.query;
    produtosDB = produtosDB.filter(x => x.id != id);
    return res.status(200).json({ ok: true });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
