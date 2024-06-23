import React from 'react'
import { NavLink } from 'react-router-dom';

export const HeaderNav = () => {
  return (
          <div className="header-principal">
          <header className="header">
            <h1>Estilo Exquisito</h1>
          </header>
  
          {/*Barra de navegacion*/}
          <nav className="nav">
            <ul>
              <li><NavLink to="/inicio" className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink></li>
              <li><NavLink to="/almacen" className={({ isActive }) => isActive ? "active" : ""}>Almacen</NavLink></li>
              <li><NavLink to="/ventas" className={({ isActive }) => isActive ? "active" : ""}>Ventas</NavLink></li>
              <li><NavLink to="/reportes" className={({ isActive }) => isActive ? "active" : ""}>Reportes</NavLink></li>
            </ul>
          </nav>
        </div>
  )
}
