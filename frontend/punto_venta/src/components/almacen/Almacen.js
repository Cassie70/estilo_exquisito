import React, { useState } from 'react'
import { Buscador } from "./Buscador";
import { Crear } from "./Crear";
import { Listado } from "./Listado";
import { CrearCopy } from './Crear-copy';
import { ListadoCopy } from './ListadoCopy';

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
        <ListadoCopy listadoState={listadoState} setListadoState={setListadoState} />
      </section>

      {/*Barra Lateral*/}
      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} />
        <CrearCopy setListadoState={setListadoState} />
      </aside>

    </div>
  )
}
