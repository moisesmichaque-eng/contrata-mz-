import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' });
  }

  // SEGURANÇA: só permite criar o teu email
  if (email !== 'moisesmichaque@gmail.com') {
    return res.status(403).json({ error: 'Email não autorizado' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const HASH_SECRET = process.env.HASH_SECRET;

  if (!SUPABASE_URL || !SERVICE_KEY || !HASH_SECRET) {
    return res.status(500).json({ error: 'Variáveis de ambiente faltando no Vercel' });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Verifica se já existe
  const { data: existing } = await supabase.from('admins').select('email').eq('email', email).single();
  if (existing) {
    return res.status(409).json({ error: 'Admin já existe' });
  }

  // Gera hash com HASH_SECRET
  const password_hash = crypto.createHmac('sha256', HASH_SECRET).update(password).digest('hex');

  const { error } = await supabase.from('admins').insert([{ email, password_hash }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true, message: 'Admin criado com sucesso' });
}
