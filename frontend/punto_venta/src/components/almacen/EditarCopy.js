import React, { useState } from 'react';

export const EditarCopy = ({ producto, setEditar, setListadoState }) => {
  const titulo_componente = "Editar Película";

  const [productoState, setProductoState] = useState({
    nombre: producto.nombre,
    precio: producto.precio,
    descripcion: producto.descripcion,
    id_categoria: producto.id_categoria,
    imagen: null,
  });

  const { nombre, precio, descripcion, id_categoria, imagen } = productoState;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setProductoState({ ...productoState, imagen: files[0] });
    } else {
      setProductoState({ ...productoState, [name]: value });
    }
  };

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    // Validación de campos
    if (!nombre || !descripcion || !precio || !id_categoria) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio)); // Convertir precio a float
    formData.append('id_categoria', parseInt(id_categoria)); // Convertir id_categoria a int
    if (imagen) {
      formData.append('imagen', imagen); // Adjuntar nueva imagen si existe
    }

    try {
        const response = await fetch(`http://localhost:1234/productos/${id}`, {
            method: 'PATCH',
            body: formData,
        });

      if (!response.ok) {
        throw new Error('Error al modificar el producto.');
      }

      const data = await response.json();
      console.log('Producto Modificado:', data);

      // Actualizar el listado de productos en Almacen.js
      setListadoState(prevState =>
        prevState.map(item => (item.id_producto === id ? data : item))
      );

      // Cerrar formulario de edición
      setEditar(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='edit_form'>
      <h3 className='title'>{titulo_componente}</h3>
      <form onSubmit={e => guardarEdicion(e, producto.id_producto)}>

        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleInputChange}
        />

        <input type='text'
          name='nombre'
          className='titulo_editado'
          defaultValue={nombre}
          onChange={handleInputChange}
        />

        <input type="number"
          name='categoria'
          className='categoria_editado'
          min='1'
          max='3'
          defaultValue={id_categoria}
          onChange={handleInputChange}
        />

        <input type="number"
          name='precio'
          className='precio_editado'
          min='1'
          max='1000'
          defaultValue={precio}
          onChange={handleInputChange}
        />

        <textarea
          name='descripcion'
          defaultValue={descripcion}
          className='descripcion_editada'
          onChange={handleInputChange}
        />

        <input type='submit' className='editar' value="Actualizar" />
      </form>
    </div>
  );
};
