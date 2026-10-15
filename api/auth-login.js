const fetch = global.fetch || require('node-fetch');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return res.status(500).json({ error: 'Supabase credentials not configured' });

  const HASH_SECRET = process.env.HASH_SECRET || 'dev_secret_change_me';
  const password_hash = crypto.createHmac('sha256', HASH_SECRET).update(password).digest('hex');

  try {
    const q = `email=eq.${encodeURIComponent(email)}`;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/admins?${q}&select=*`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: 'application/json'
      }
    });
    const arr = await r.json();
    const admin = Array.isArray(arr) && arr[0];
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    if (admin.password_hash !== password_hash) return res.status(401).json({ error: 'Invalid credentials' });

    // Create a simple token (scaffold). Replace with JWT in production.
    const tokenPayload = { email: admin.email, id: admin.id, iat: Date.now() };
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString('base64') + '.' + crypto.createHmac('sha256', HASH_SECRET).update(admin.id + admin.email).digest('hex');

    return res.status(200).json({ token, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
};
