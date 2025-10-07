import React, { useState } from "react";
import "./SideBar.css";
import logoPillar from "../assets/PillarLogo-removebg.png";
import LivroPrimeiroAno from "../assets/ImgsLivros/LivroPrimeiroAno.png"
import LivroSegundoAno from "../assets/ImgsLivros/LivroSegundoAno.png"
import LivroTerceiroAno from "../assets/ImgsLivros/LivroTerceiroAno.png"

import { Link, NavLink } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { LuBookText } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { DayHour } from "../utils/DayHour";

const SideBar = () => {
  const [openMaterias, setOpenMaterias] = useState(false);
  const saudacao = DayHour();

  return (
    <>
      <aside className="sidebar">
        <img src={logoPillar} alt="logo pillar" className="logo-sidebar" />
        <h2 className="h2-header-sidebar">
          {saudacao}, aluno!
        </h2>
        <hr className="line" id="responsiveness"/>

        <nav className="main-nav">
          <NavLink to="/home" className="sidebar-link"
          id="padding-top-icon">
            <AiOutlineHome  className="icon-sidebar" style={{color: '#42bd36'}}/>
            <span className="link-text">Página Inicial</span>
          </NavLink>
          
          {/* Botão que abre/fecha o submenu */}
          <button
            type="button"
            className="sidebar-link sidebar-button"
            aria-expanded={openMaterias}
            aria-controls="submenu-materias"
            onClick={() => setOpenMaterias((v) => !v)}
          >
            <LuBookText className="icon-sidebar" style={{color: '#0f9cff'}} />
            <span className="link-text">Matérias</span>
            <IoChevronDown
              className={`chevron ${openMaterias ? "rotate" : ""}`}
              aria-hidden
            />
          </button>

          {/* Submenu colapsável */}
          <div
            id="submenu-materias"
            className={`submenu ${openMaterias ? "open" : ""}`}
            role="region"
            aria-label="Lista de matérias"
          >
            <NavLink
              to="/primeiroAno"
              className="submenu-link"
            >
              <img src={LivroPrimeiroAno} alt="livroAno" className="book-sidebar-year" />
              <span className="link-text-year">1° Ano</span>
            </NavLink>
            <NavLink
              to="/segundoAno"
              className="submenu-link"
            >
              <img src={LivroSegundoAno} alt="livroAno" className="book-sidebar-year" />
              <span className="link-text-year">2° Ano</span>
            </NavLink>
            <NavLink
              to="/terceiroAno"
              className="submenu-link"
            >
              <img src={LivroTerceiroAno} alt="livroAno" className="book-sidebar-year" />
              <span className="link-text-year">3° Ano</span>
            </NavLink>
          </div>
          <NavLink to="/atividades"
          className="sidebar-link">
            <FaPencil className="icon-sidebar" style={{color: '#ff2828'}}
            id="pencil-icon"/> <span className="link-text"
            >Atividades </span>
          </NavLink>
        </nav>
        <hr className="line" />
        <hr className="line" style={{ marginTop: "auto" }} />
        <Link to="/" className="logout-bottom">
          <BiLogOut /><span className="link-text">Sair</span>
        </Link>
      </aside>
    </>
  );
};

export default SideBar;
