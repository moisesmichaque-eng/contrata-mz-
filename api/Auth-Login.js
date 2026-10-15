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

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const HASH_SECRET = process.env.HASH_SECRET;

  if (!SUPABASE_URL || !SERVICE_KEY || !HASH_SECRET) {
    return res.status(500).json({ error: 'Variáveis de ambiente faltando' });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: admin, error } = await supabase.from('admins').select('*').eq('email', email).single();

  if (error || !admin) {
    return res.status(401).json({ error: 'Admin não encontrado' });
  }

  const hash = crypto.createHmac('sha256', HASH_SECRET).update(password).digest('hex');

  if (hash !== admin.password_hash) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  // Gera token simples (podes trocar por JWT depois)
  const token = crypto.randomBytes(32).toString('hex');

  return res.status(200).json({
    token,
    admin: { email: admin.email, id: admin.id }
  });
}
