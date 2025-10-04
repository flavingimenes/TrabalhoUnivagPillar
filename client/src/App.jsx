import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import EtapaPage from './pages/EtapaPage';
import SeriePage from './pages/SeriePage';
import DisciplinaPage from './pages/DisciplinaPage';
import TopicoPage from './pages/TopicoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './components/RequireAuth';
import ProfilePage from './pages/ProfilePage'; // <- novo

export default function App() {
  const isAuth = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">Pillar BNCC</Link>

          <div className="ms-auto d-flex gap-2">
            {isAuth ? (
              <>
                <Link className="btn btn-sm btn-outline-light" to="/perfil">Perfil</Link>
                <button className="btn btn-sm btn-light" onClick={logout}>Sair</button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light" to="/login">Entrar</Link>
                <Link className="btn btn-sm btn-light" to="/register">Cadastrar</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        {/* públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protegidas */}
        <Route path="/" element={<RequireAuth><Navigate to="/ensino-medio" replace /></RequireAuth>} />
        <Route path="/perfil" element={<RequireAuth><ProfilePage /></RequireAuth>} />
        <Route path="/:etapaSlug" element={<RequireAuth><EtapaPage /></RequireAuth>} />
        <Route path="/serie/:serieSlug" element={<RequireAuth><SeriePage /></RequireAuth>} />
        <Route path="/disciplina/:discSlug" element={<RequireAuth><DisciplinaPage /></RequireAuth>} />
        <Route path="/topico/:topicoSlug" element={<RequireAuth><TopicoPage /></RequireAuth>} />

        <Route path="*" element={<div className="container py-4">404</div>} />
      </Routes>
    </>
  );
}
