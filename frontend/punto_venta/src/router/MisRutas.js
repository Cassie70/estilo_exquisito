//frontend/src/router/MisRutas.js
import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HeaderNav from '../components/layouts/HeaderNav';  // Aquí se importa el componente HeaderNav como default

import { Footer } from '../components/layouts/Footer';
import { Almacen } from '../components/almacen/Almacen';
import { Ventas } from '../components/ventas/Ventas';
import { Inicio } from '../components/inicio/Inicio';
import { Reportes } from '../components/reportes/Reportes';
import { Inventario } from '../components/inventario/Inventario';
import  Trabajadores  from '../components/trabajadores/trabajadores'; // Importa el componente Trabajadores
import  Usuarios  from '../components/usuarios/usuarios'; // Importa el componente Usuarios
import  Detalle_venta  from '../components/detalle_venta/detalle_venta'; // Importa el componente detalle venta
import  Categorias  from '../components/categorias/categorias'; // Importa el componente categoria
import  Tallas  from '../components/tallas/tallas'; // Importa el componente tallas



export const MisRutas = () => {
  return (
    <BrowserRouter>
    {/*Header y Navegacion */}
    <HeaderNav />
    {/*Contenido Centrar */}
    <section className='content-principal'>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} /> 
        <Route path="/productos" element={<Almacen/>} />
        <Route path="/inventario" element={<Inventario/>} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/reportes" element={<Reportes />} />  
        <Route path="/trabajadores" element={<Trabajadores />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/detalle-venta" element={<Detalle_venta />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/tallas" element={<Tallas />} />
      </Routes>
    </section>
    {/*Footer */}
    <Footer />


  </BrowserRouter>
  )
}
