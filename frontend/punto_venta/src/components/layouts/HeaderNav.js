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
              <li><NavLink to="/productos" className={({ isActive }) => isActive ? "active" : ""}>Productos</NavLink></li>
              <li><NavLink to="/inventario" className={({ isActive }) => isActive ? "active" : ""}>Inventario</NavLink></li>
              <li><NavLink to="/ventas" className={({ isActive }) => isActive ? "active" : ""}>Ventas</NavLink></li>
              <li><NavLink to="/reportes" className={({ isActive }) => isActive ? "active" : ""}>Reportes</NavLink></li>
            </ul>
          </nav>
        </div>
  )
}
