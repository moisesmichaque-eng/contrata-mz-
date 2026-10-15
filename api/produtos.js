export default async function handler(req, res) {
  // Retorna lista vazia por enquanto - depois ligamos no Supabase
  return res.status(200).json([
    { id: 1, nome: 'Exemplo - Pacote 11 Cláusulas', preco: 1500, status: 'ativo' }
  ]);
}
