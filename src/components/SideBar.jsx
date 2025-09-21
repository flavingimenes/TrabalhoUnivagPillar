import React, { useState } from "react";
import "./SideBar.css";
import logoPillar from "../assets/PillarLogo-removebg.png";
import { Link, NavLink } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { LuBookText } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

const SideBar = () => {
  const [openMaterias, setOpenMaterias] = useState(false);

  return (
    <>
      <aside className="sidebar">
        <img src={logoPillar} alt="logo pillar" className="logo-sidebar" />
        <h2 className="h2-header-sidebar">
          Bom dia, aluno
        </h2>
        <hr className="line" id="responsiveness"/>

        <nav style={{ display: "grid" }}>
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
              onClick={() => setOpenMaterias(false)}
            >
              1º Ano
            </NavLink>
            <NavLink
              to="/segundoAno"
              className="submenu-link"
              onClick={() => setOpenMaterias(false)}
            >
              2º Ano
            </NavLink>
            <NavLink
              to="/terceiroAno"
              className="submenu-link"
              onClick={() => setOpenMaterias(false)}
            >
              3º Ano
            </NavLink>
          </div>
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
