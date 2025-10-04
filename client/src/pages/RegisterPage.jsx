import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../api';
import { slugify } from '../utils/slugify';

export default function RegisterPage() {
  const nav = useNavigate();
  const [etapas, setEtapas] = useState([]);
  const [series, setSeries] = useState([]);
  const [form, setForm] = useState({ nome:'', email:'', password:'', etapa_ensino_id:'', serie_id:'' });
  const [err, setErr] = useState('');

  useEffect(() => {
    auth.get('/etapas').then(({data}) => setEtapas(data));
  }, []);

  useEffect(() => {
    if (!form.etapa_ensino_id) return setSeries([]);
    auth.get(`/etapas/${form.etapa_ensino_id}/series`).then(({data}) => setSeries(data));
  }, [form.etapa_ensino_id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const { data } = await auth.post('/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('pref', JSON.stringify(data.pref));
      nav(`/${slugify(data.pref.etapa_nome)}`, { replace: true });
    } catch (e) {
      setErr(e.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <div className="container py-4" style={{maxWidth: 560}}>
      <h3>Cadastro</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit} className="vstack gap-3">
        <input className="form-control" placeholder="Nome" value={form.nome}
               onChange={e=>setForm({...form, nome:e.target.value})} required />
        <input className="form-control" placeholder="Email" type="email" value={form.email}
               onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="form-control" placeholder="Senha" type="password" value={form.password}
               onChange={e=>setForm({...form, password:e.target.value})} required />

        <select className="form-select" value={form.etapa_ensino_id}
                onChange={e=>setForm({...form, etapa_ensino_id:e.target.value, serie_id:''})} required>
          <option value="">Selecione a etapa</option>
          {etapas.map(e=> <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>

        <select className="form-select" value={form.serie_id}
                onChange={e=>setForm({...form, serie_id:e.target.value})} required disabled={!series.length}>
          <option value="">Selecione a série</option>
          {series.map(s=> <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>

        <button className="btn btn-primary">Cadastrar</button>
        <button type="button" className="btn btn-link" onClick={()=>nav('/login')}>Já tenho conta</button>
      </form>
    </div>
  );
}
