import React, { useEffect, useState } from 'react';
import { auth } from '../api';

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    auth.get('/me')
      .then(({ data }) => { if (mounted) setData(data); })
      .catch((e) => setErr(e.response?.data?.error || 'Erro ao carregar perfil'));
    return () => { mounted = false; };
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  if (err) return <div className="container py-4"><div className="alert alert-danger">{err}</div></div>;
  if (!data) return <div className="container py-4">Carregando...</div>;

  const { user, pref } = data;

  return (
    <div className="container py-4" style={{ maxWidth: 720 }}>
      <h3 className="mb-3">Meu perfil</h3>
      <div className="card">
        <div className="card-body">
          <dl className="row mb-0">
            <dt className="col-sm-3">Nome</dt>
            <dd className="col-sm-9">{user?.nome}</dd>

            <dt className="col-sm-3">E-mail</dt>
            <dd className="col-sm-9">{user?.email}</dd>

            <dt className="col-sm-3">Etapa de ensino</dt>
            <dd className="col-sm-9">{pref?.etapa_nome} ({pref?.etapa_sigla})</dd>

            <dt className="col-sm-3">Série</dt>
            <dd className="col-sm-9">{pref?.serie_nome}</dd>
          </dl>
        </div>
        <div className="card-footer d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
            Voltar
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
