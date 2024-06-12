import React, { useState } from 'react'

export const Buscador = ({listadoState,setListadoState}) => {

    const [busqueda,setBusqueda]=useState("");
    const [noEncontrado,setNoEncontrado]=useState("");

    const buscarPeli=(e)=>{
        //Crear estado y actualizarlo
        setBusqueda(e.target.value)

        //Filtrar para buscar coincidencias
        let pelis_encontradas = listadoState.filter(peli=>{
            return peli.titulo.toLowerCase().includes(busqueda.toLowerCase());
        });

        if(busqueda.length <= 1 || pelis_encontradas <= 0){
            pelis_encontradas = JSON.parse(localStorage.getItem("pelis"));
            setNoEncontrado(true);
        }else{
            setNoEncontrado(false);
        }


        //Actualizar estado del listado principal con lo que he logadro filtrar
        setListadoState(pelis_encontradas)
    }

    return (
        <div className="search">
            <h3 className="title">Buscador</h3>
            {(noEncontrado && busqueda.length > 2) && (
                <span className='no-encontrado'>No se ha encontrado ninguna coincidencia</span>
            )}

            <form>

                <input type="text" 
                       id="search_field"
                       name="busqueda"
                       autoComplete='off'
                       value={busqueda}
                       onChange={buscarPeli}
                />

                <button>Buscar</button>

            </form>
        </div>
    )
}
