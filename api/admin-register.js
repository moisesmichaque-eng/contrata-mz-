const fetch = global.fetch || require('node-fetch');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  // Only allow initial admin creation with the configured email
  if (email !== 'moisesmichaque@gmail.com') {
    return res.status(403).json({ error: 'Initial admin can only be created with the allowed email' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({ error: 'Supabase credentials not configured' });

  const HASH_SECRET = process.env.HASH_SECRET || 'dev_secret_change_me';
  const password_hash = crypto.createHmac('sha256', HASH_SECRET).update(password).digest('hex');

  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/admins`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({ email, password_hash })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
};