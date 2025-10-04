import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../api';
import { slugify } from '../utils/slugify';

export default function LoginPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await auth.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('pref', JSON.stringify(data.pref));
      const go = loc.state?.from?.pathname || `/${slugify(data.pref.etapa_nome)}`;
      nav(go, { replace: true });
    } catch (e) {
      setErr(e.response?.data?.error || 'Erro ao autenticar');
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 480}}>
      <h3>Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="vstack gap-3">
        <input className="form-control" placeholder="Email" type="email" value={email}
               onChange={e=>setEmail(e.target.value)} required />
        <input className="form-control" placeholder="Senha" type="password" value={password}
               onChange={e=>setPassword(e.target.value)} required />
        <button className="btn btn-primary">Entrar</button>
        <button type="button" className="btn btn-link" onClick={()=>nav('/register')}>Criar conta</button>
      </form>
    </div>
  );
}
