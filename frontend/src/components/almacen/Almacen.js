import React, { useState } from 'react'
import { Buscador } from "./Buscador";
import { Crear } from "./Crear";
import { Listado } from "./Listado";

export const Almacen = () => {

  const [listadoState, setListadoState] = useState([]);

  return (
    <div className="layout">
      <div className='title-almacen'>
        <h3>Almacen</h3>
      </div>

      {/*Contenido Principal*/}

      <section className="content">
        {/*Aqui va el listado de las peliculas*/}
        <Listado listadoState={listadoState} setListadoState={setListadoState} />
      </section>

      {/*Barra Lateral*/}
      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} />
        <Crear setListadoState={setListadoState} />
      </aside>

    </div>
  )
}
