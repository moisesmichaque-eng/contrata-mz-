import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AdminPedidos from './AdminPedidos.tsx'
import './styles.css'

const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'
createRoot(document.getElementById("root")!).render(isAdmin ? <AdminPedidos /> : <App />);
