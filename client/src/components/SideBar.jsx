import React from "react";
// 1. Importar o useState e useEffect
import { useEffect, useState } from "react"; 
import "./SideBar.css";
import logoPillar from "../assets/PillarLogo-removebg.png";
import LivroPrimeiroAno from "../assets/ImgsLivros/LivroPrimeiroAno.png";
import LivroSegundoAno from "../assets/ImgsLivros/LivroSegundoAno.png";
import LivroTerceiroAno from "../assets/ImgsLivros/LivroTerceiroAno.png";

import { Link, NavLink } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { LuBookText } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { DayHour } from "../utils/DayHour";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdEditCalendar } from "react-icons/md";
import { FaUser } from "react-icons/fa6";

const SideBar = () => {
  const [openMaterias, setOpenMaterias] = useState(false);
  
  // --- SEU CÓDIGO DE COLAPSO (Desktop) ---
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  const saudacao = DayHour();
  
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]); 

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // --- NOSSA NOVA LÓGICA (Mobile) ---
  // 1. Novo estado para o menu deslizante mobile
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 2. Nova função para controlar o menu mobile
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  // 3. Função para fechar o menu mobile ao clicar em um link
  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* --- BARRA DO TOPO (Apenas Mobile) --- */}
      <header className="mobile-topbar">
        <img src={logoPillar} alt="logo pillar" className="logo-mobile-topbar" />
        <button onClick={toggleMobileMenu} className="mobile-hamburger-btn">
          {isMobileOpen ? <IoMdClose /> : <FiMenu />}
        </button>
      </header>

      {/* --- SIDEBAR (Desktop) / PAINEL DESLIZANTE (Mobile) --- */}
      {/* Adicionamos a classe 'mobile-open' controlada pelo novo estado */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && (
            <img src={logoPillar} alt="logo pillar" className="logo-sidebar" />
          )}
          
          {/* Este botão agora SÓ aparece no desktop */}
          <button onClick={toggleSidebar} className="toggle-btn desktop-toggle-btn">
            {isCollapsed ? <FiMenu /> : <IoMdClose />}
          </button>
        </div>

        {!isCollapsed && (
            <h2 className="h2-header-sidebar">{saudacao}, aluno!</h2>
        )}
        
        <hr className="line" id="responsiveness" />

        <nav className="main-nav">
          <NavLink to="/home" className="sidebar-link" id="padding-top-icon" onClick={handleMobileLinkClick}>
            <AiOutlineHome className="icon-sidebar" style={{ color: "white" }} />
            <span className="link-text">Página Inicial</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-link sidebar-button"
            aria-expanded={openMaterias}
            aria-controls="submenu-materias"
            onClick={() => setOpenMaterias((v) => !v)}
          >
            <LuBookText className="icon-sidebar" style={{ color: "white" }} />
            <span className="link-text">Matérias</span>
            <IoChevronDown
              className={`chevron ${openMaterias ? "rotate" : ""}`}
              aria-hidden
            />
          </button>

          <div
            id="submenu-materias"
            className={`submenu ${openMaterias ? "open" : ""}`}
            role="region"
            aria-label="Lista de matérias"
          >
            <NavLink to="/primeiroAno" className="submenu-link" onClick={handleMobileLinkClick}>
              <img
                src={LivroPrimeiroAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">1° Ano</span>
            </NavLink>
            <NavLink to="/segundoAno" className="submenu-link" onClick={handleMobileLinkClick}>
              <img
                src={LivroSegundoAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">2° Ano</span>
            </NavLink>
            <NavLink to="/terceiroAno" className="submenu-link" onClick={handleMobileLinkClick}>
              <img
                src={LivroTerceiroAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">3° Ano</span>
            </NavLink>
          </div>
          
          <NavLink to="/atividades" className="sidebar-link" onClick={handleMobileLinkClick}>
            <FaPencil
              className="icon-sidebar"
              style={{ color: "white" }}
              id="pencil-icon"
            />{" "}
            <span className="link-text">Atividades </span>
          </NavLink>

          <NavLink to="/calendario" className="sidebar-link" onClick={handleMobileLinkClick}>
            <MdEditCalendar
              className="icon-sidebar"
              style={{ color: "white" }}
              id="pencil-icon"
            />{" "}
            <span className="link-text">Calendário </span>
          </NavLink>

          <NavLink to="/usuario" className="sidebar-link" onClick={handleMobileLinkClick}>
            <FaUser
              className="icon-sidebar"
              style={{ color: "white", width: "18px" }}
              id="pencil-icon"
            />
            <span className="link-text">Usuário </span>
          </NavLink>
        </nav>
        
        <hr className="line" style={{ marginTop: "auto" }} />
        
        <Link to="/" className="logout-bottom" onClick={handleMobileLinkClick}>
          <BiLogOut />
          <span className="link-text">Sair</span>
        </Link>
      </aside>
      
      {/* --- OVERLAY (Fundo escuro) --- */}
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default SideBar;