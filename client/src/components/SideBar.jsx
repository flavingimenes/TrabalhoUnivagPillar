import React from "react";
import { useEffect, useState } from "react"; // 1. Importar o useEffect
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

const SideBar = () => {
  const [openMaterias, setOpenMaterias] = useState(false);
  
  // LER O ESTADO INICIAL DO LOCALSTORAGE
  // O estado inicial agora é o valor salvo em 'sidebarCollapsed' no localStorage.
  // Se não houver nada salvo (primeira visita), o valor padrão será 'false'.
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true"
  );
  
  const saudacao = DayHour();

  // SALVAR O ESTADO NO LOCALSTORAGE QUANDO ELE MUDAR
  // useEffect será executado toda vez que o estado 'isCollapsed' for alterado.
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]); // O array de dependências garante que o efeito só rode quando 'isCollapsed' mudar

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && (
            <img src={logoPillar} alt="logo pillar" className="logo-sidebar" />
          )}
          <button onClick={toggleSidebar} className="toggle-btn">
            {isCollapsed ? <FiMenu /> : <IoMdClose />}
          </button>
        </div>

        {!isCollapsed && (
            <h2 className="h2-header-sidebar">{saudacao}, aluno!</h2>
        )}
        
        <hr className="line" id="responsiveness" />

        <nav className="main-nav">
          {/* O restante do seu código JSX continua exatamente igual */}
          <NavLink to="/home" className="sidebar-link" id="padding-top-icon">
            <AiOutlineHome className="icon-sidebar" style={{ color: "#42bd36" }} />
            <span className="link-text">Página Inicial</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-link sidebar-button"
            aria-expanded={openMaterias}
            aria-controls="submenu-materias"
            onClick={() => setOpenMaterias((v) => !v)}
          >
            <LuBookText className="icon-sidebar" style={{ color: "#0f9cff" }} />
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
            <NavLink to="/primeiroAno" className="submenu-link">
              <img
                src={LivroPrimeiroAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">1° Ano</span>
            </NavLink>
            <NavLink to="/segundoAno" className="submenu-link">
              <img
                src={LivroSegundoAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">2° Ano</span>
            </NavLink>
            <NavLink to="/terceiroAno" className="submenu-link">
              <img
                src={LivroTerceiroAno}
                alt="livroAno"
                className="book-sidebar-year"
              />
              <span className="link-text-year">3° Ano</span>
            </NavLink>
          </div>
          <NavLink to="/atividades" className="sidebar-link">
            <FaPencil
              className="icon-sidebar"
              style={{ color: "#ff2828" }}
              id="pencil-icon"
            />{" "}
            <span className="link-text">Atividades </span>
          </NavLink>
        </nav>
        <hr className="line" />
        <hr className="line" style={{ marginTop: "auto" }} />
        <Link to="/" className="logout-bottom">
          <BiLogOut />
          <span className="link-text">Sair</span>
        </Link>
      </aside>
    </>
  );
};

export default SideBar;