//frontend/src/router/MisRutas.js
import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HeaderNav from '../components/layouts/HeaderNav';  // Aquí se importa el componente HeaderNav como default

import { Footer } from '../components/layouts/Footer';
import { Almacen } from '../components/almacen/Almacen';
import { Venta } from '../components/venta/Venta';
import { Inicio } from '../components/inicio/Inicio';
import { Inventario } from '../components/inventario/Inventario';
import  Trabajadores  from '../components/trabajadores/trabajadores'; // Importa el componente Trabajadores
import  Usuarios  from '../components/usuarios/usuarios'; // Importa el componente Usuarios
import  DetalleVenta  from '../components/detalle_venta/detalle_venta'; // Importa el componente detalle venta
import  Categorias  from '../components/categorias/categorias'; // Importa el componente categoria
import  Tallas  from '../components/tallas/tallas'; // Importa el componente tallas
import  Ventas  from '../components/ventas/VentasD'; // Importa el componente ventas
import  PedidoApartado  from '../components/pedido_apartado/pedido_apartado'; // Importa el componente pedido_apartado
import  DetallePedidoApartado  from '../components/detalle_pedido_apartado/detalle_pedido_apartado'; // Importa el componente pedido_apartado
import  Reportes  from '../components/reportes/Reportes';
import  Verificador  from '../components/verificador/verificador';
import  Entregas  from '../components/entregas/entregas';


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
        <Route path="/venta" element={<Venta />} /> 
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/trabajadores" element={<Trabajadores />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/detalle-venta" element={<DetalleVenta />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/tallas" element={<Tallas />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/pedido-apartado" element={<PedidoApartado />} />
        <Route path="/detalle-pedido-apartado" element={<DetallePedidoApartado />} />
        <Route path="/verificador" element={<Verificador />} />
        <Route path="/entregas" element={<Entregas />} />
      </Routes>
    </section>
    {/*Footer */}
    <Footer />


  </BrowserRouter>
  )
}
