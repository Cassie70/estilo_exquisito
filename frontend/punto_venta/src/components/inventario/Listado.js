import React, { useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({ listadoState, setListadoState }) => {

    const [editar, setEditar] = useState(0);

    const borrarProducto = (id,idproducto,idtalla) => {
        //DELETE
        fetch('http://localhost:1234/inventario/' +idproducto+"/"+idtalla , {
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

        fetch('http://localhost:1234/inventario', {
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

    const obtenerTalla=(id)=>{
        if(id===1){
            return "XS"
        }else if(id===2){
            return "S"
        }else if(id===3){
            return "M"
        }else if(id===4){
            return "L"
        }else{
            return "XL"
        }
    }

    return (
        <>

            {(listadoState != null) ?
                listadoState.map(producto => {

                    let keyProvisional=producto.id_producto+producto.nombre_talla;

                    return (

                        <article key={keyProvisional} className="peli-item shadow-md">
                            <h3 className="title">ID del Producto: {producto.id_producto}</h3>
                            <h2 className='precio'>Talla: {obtenerTalla(producto.id_talla)}</h2>


                            <button className="edit" onClick={() => { setEditar(keyProvisional) }}>Editar</button>
                            <button className="delete" onClick={() => { borrarProducto(keyProvisional, producto.id_producto, producto.id_talla) }}>Borrar</button>

                            {/*Aparece formulario de editar*/}
                            {editar === keyProvisional && (
                                <Editar producto={producto}
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
