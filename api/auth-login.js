export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  if (email !== 'moisesmichaque@gmail.com' || !password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  return res.status(200).json({ message: 'Login successful', token: 'token_' + Date.now(), email });
}
