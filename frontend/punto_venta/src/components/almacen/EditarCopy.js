import React from 'react'

export const EditarCopy = ({ producto, setEditar, setListadoState }) => {
    const titulo_componente = "Editar Pelicula"


    const guardarEdicion = (e, id) => {
        e.preventDefault();

        //Conseguir el target del evento
        let target = e.target;

        //Crear objeto con ese indice, titulo y descripcion del formulario
        let producto_actualizado = {
            nombre: target.nombre.value,
            precio: parseInt(target.precio.value),
            descripcion: target.descripcion.value,
            id_categoria: target.categoria.value,
            imagen_url: "uploads/chucho.png"
        }

        //PATCH
        fetch('http://localhost:1234/productos/'+id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto_actualizado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Producto Modificado:', data);
            })
            .catch(error => {
                console.log('Error al modificar producto:', error);
            });

        setEditar(0);


    }

    return (
        <div className='edit_form'>
            <h3 className='title'>{titulo_componente}</h3>
            <form onSubmit={e => guardarEdicion(e, producto.id_producto)}>

                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                />

                <input type='text'
                    name='nombre'
                    className='titulo_editado'
                    defaultValue={producto.nombre}
                />

                <input type="number"
                    name='categoria'
                    className='categoria_editado'
                    min='1'
                    max='3'
                    defaultValue={producto.id_categoria}
                />

                <input type="number"
                    name='precio'
                    className='precio_editado'
                    min='1'
                    max='1000'
                    defaultValue={producto.precio}
                />

                <textarea
                    name='descripcion'
                    defaultValue={producto.descripcion}
                    className='descripcion_editada'
                />
                <input type='submit' className='editar' value="Actualizar" />
            </form>
        </div>
    )
}
