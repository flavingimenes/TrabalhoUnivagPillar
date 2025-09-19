import React, { useState } from "react";
import "./SideBar.css";
import logoPillar from "../assets/PillarLogo-removebg.png";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBook } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const SideBar = () => {
  const [openMaterias, setOpenMaterias] = useState(false);

  return (
    <>
      <div className="sidebar">
        <img src={logoPillar} alt="logo pillar" className="logo-sidebar" />
        <h2 style={{ fontSize: "20px", marginTop: 20, marginBottom: 20 }}>
          Bom dia, aluno
        </h2>
        <hr className="line" />

        <nav style={{ display: "grid" }}>
          <NavLink to="/home" className="sidebar-link">
            <FaHome className="icon-sidebar" />
            Página Inicial
          </NavLink>

          {/* Botão que abre/fecha o submenu */}
          <button
            type="button"
            className="sidebar-link sidebar-button"
            aria-expanded={openMaterias}
            aria-controls="submenu-materias"
            onClick={() => setOpenMaterias((v) => !v)}
          >
            <FaBook className="icon-sidebar" style={{color: '#0f9cff'}} />
            Matérias
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
              to=""
              className="submenu-link"
              onClick={() => setOpenMaterias(false)}
            >
              1º Ano
            </NavLink>
            <NavLink
              to=""
              className="submenu-link"
              onClick={() => setOpenMaterias(false)}
            >
              2º Ano
            </NavLink>
            <NavLink
              to=""
              className="submenu-link"
              onClick={() => setOpenMaterias(false)}
            >
              3º Ano
            </NavLink>
          </div>
        </nav>

        <hr className="line" style={{ marginTop: "auto" }} />
        <Link to="/" className="logout-bottom">
          Sair
        </Link>
      </div>
    </>
  );
};

export default SideBar;
