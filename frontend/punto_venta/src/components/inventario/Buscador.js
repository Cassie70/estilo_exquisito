import React, { useState } from 'react';

export const Buscador = ({ listadoState, setListadoState, setAccion }) => {
    const [busqueda, setBusqueda] = useState("");
    const [noEncontrado, setNoEncontrado] = useState(false);

    const buscarProducto = (e) => {
        const valorBusqueda = e.target.value.trim();

        // Actualizar el estado de la búsqueda
        setBusqueda(valorBusqueda);

        // Filtrar productos por id_producto
        let productos_encontrados = listadoState.filter(producto => {
            // Convertir busqueda a número y verificar si coincide con id_producto
            return valorBusqueda.length === 0 || producto.id_producto === parseInt(valorBusqueda);
        });

        // Verificar si se encontraron productos
        if (valorBusqueda.length === 0 && productos_encontrados.length === 0) {
            setAccion(0)
            setNoEncontrado(true);
        }else{
            // Si se encontraron productos o la búsqueda está vacía, mostrar la lista filtrada o original
            setNoEncontrado(false);
            setListadoState(productos_encontrados);;
        }
        fetch('http://localhost:1234/inventario', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error en la red');
              }
              return response.json();
            })
            .then(data => {
              console.log('Datos obtenidos:', data);
              setListadoState(data);
            })
            .catch(error => {
              console.log('Error al obtener datos:', error);
            });
    };

    return (
        <div className="search">
            <h3 className="title">Buscador</h3>
            {(noEncontrado && busqueda.length > 0) && (
                <span className='no-encontrado'>No se ha encontrado ninguna coincidencia</span>
            )}

            <form>
                <input 
                    type="text" 
                    id="search_field"
                    name="busqueda"
                    autoComplete='off'
                    value={busqueda}
                    onChange={buscarProducto}
                />
                <button type="button" onClick={buscarProducto}>Buscar</button>
            </form>
        </div>
    );
};
