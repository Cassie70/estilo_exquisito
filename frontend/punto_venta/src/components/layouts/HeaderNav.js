import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Función para cerrar el dropdown cuando se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Efecto para agregar el manejador de eventos cuando se monta el componente
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header-principal">
      <header className="header">
        <h1>Estilo Exquisito</h1>
      </header>

      {/* Barra de navegación */}
      <nav className="nav">
        <ul>
          <li><NavLink to="/inicio" activeClassName="active">Inicio</NavLink></li>
          {/* Elemento CRUD con menú desplegable */}
          <li ref={dropdownRef} className="dropdown">
            <a href="#" onClick={toggleDropdown} className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded={showDropdown ? "true" : "false"}>
              Gerente <span className="caret"></span>
            </a>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li><NavLink to="/trabajadores" activeClassName="active">Trabajadores</NavLink></li>
                <li><NavLink to="/usuarios" activeClassName="active">Usuarios</NavLink></li>
                <li><NavLink to="/detalle-venta" activeClassName="active">Detalles de Ventas</NavLink></li>
                <li><NavLink to="/categorias" activeClassName="active">Categorias</NavLink></li>
                <li><NavLink to="/tallas" activeClassName="active">Tallas</NavLink></li>
                <li><NavLink to="/ventas" activeClassName="active">Ventas</NavLink></li>
                <li><NavLink to="/pedido-apartado" activeClassName="active">Pedidos Apartados</NavLink></li>
                <li><NavLink to="/detalle-pedido-apartado" activeClassName="active">Detalle pedidos Apartados</NavLink></li>
              </ul>
            )}
          </li>
          <li><NavLink to="/productos" activeClassName="active">Productos</NavLink></li>
          <li><NavLink to="/inventario" activeClassName="active">Inventario</NavLink></li>
          <li><NavLink to="/venta" activeClassName="active">Venta</NavLink></li>
          <li><NavLink to="/verificador" activeClassName="active">Verificador de precios</NavLink></li>
          <li><NavLink to="/entregas" activeClassName="active">Entregas</NavLink></li>
          <li><NavLink to="/reportes" activeClassName="active">Reportes</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderNav;