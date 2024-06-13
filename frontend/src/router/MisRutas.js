import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { HeaderNav } from '../components/layouts/HeaderNav';
import { Footer } from '../components/layouts/Footer';
import { Almacen } from '../components/almacen/Almacen';
import { Ventas } from '../components/ventas/Ventas';
import { Inicio } from '../components/inicio/Inicio';
import { Reportes } from '../components/reportes/Reportes';


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
        <Route path="/almacen" element={<Almacen/>} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/reportes" element={<Reportes />} />  
      </Routes>
    </section>
    {/*Footer */}
    <Footer />


  </BrowserRouter>
  )
}
