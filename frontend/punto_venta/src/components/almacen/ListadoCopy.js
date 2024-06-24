//Frontend/punto_venta_src_components/almacen/ListadoCopy.j
import React, { useState } from 'react'
import { EditarCopy } from './EditarCopy';

export const ListadoCopy = ({ listadoState, setListadoState }) => {

    const [editar, setEditar] = useState(0);

    const borrarProducto = (id) => {
        //DELETE
        fetch('http://localhost:1234/productos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Producto Eliminado:', data);
            })
            .catch(error => {
                console.log('Error al eliminar producto:', error);
            });

        fetch('http://localhost:1234/productos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                setListadoState(data)
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    return (
        <>

            {(listadoState != null) ?
                listadoState.map(producto => {

                    return (

                        <article key={producto.id_producto} className="peli-item shadow-md">
                            <img src={`http://localhost:1234/${producto.imagen_url}`} alt={producto.nombre} />
                            <h3 className="title">{producto.nombre}</h3>
                            <h2 className='precio'>${producto.precio}</h2>


                            <button className="edit" onClick={() => { setEditar(producto.id_producto) }}>Editar</button>
                            <button className="delete" onClick={() => { borrarProducto(producto.id_producto) }}>Borrar</button>

                            {/*Aparece formulario de editar*/}
                            {editar === producto.id_producto && (
                                <EditarCopy producto={producto}
                                    setEditar={setEditar}
                                    setListadoState={setListadoState}
                                />
                            )}

                        </article>
                    );

                })
                : <h2>No hay prendas para mostrar</h2>
            }
        </>
    )
}
