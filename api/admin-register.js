export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body || {};
  if (email !== 'moisesmichaque@gmail.com') {
    return res.status(403).json({ error: 'Only moisesmichaque@gmail.com allowed' });
  }
  return res.status(201).json({ message: 'Admin created - local mode', email });
}
