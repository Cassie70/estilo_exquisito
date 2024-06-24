import React, { useState } from 'react';

export const CrearCopy = ({ setListadoState }) => {
  const tituloComponente = "Añadir Prenda";

  const [prendaState, setPrendaState] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    id_categoria: '',
    imagen: null,
  });

  const { nombre, descripcion, precio, id_categoria, imagen } = prendaState;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setPrendaState({ ...prendaState, imagen: files[0] });
    } else {
      setPrendaState({ ...prendaState, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
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
      formData.append('imagen', imagen); // Adjuntar imagen si existe
    }

    try {
      const response = await fetch('http://localhost:1234/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen y guardar el producto.');
      }

      const data = await response.json();
      console.log('Producto Agregado:', data);

      // Limpiar el formulario después de éxito
      setPrendaState({
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        imagen: null,
      });

      // Actualizar el listado de productos en Almacen.js
      setListadoState(prevState => [...prevState, data]);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add">
      <h3 className="title">{tituloComponente}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/*"
          onChange={handleInputChange}
        />

        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre de la Prenda"
          value={nombre}
          onChange={handleInputChange}
        />

        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={handleInputChange}
        ></textarea>

        <input
          type="number"
          id="precio"
          name="precio"
          min="1"
          max="1000"
          placeholder="Precio"
          value={precio}
          onChange={handleInputChange}
        />

        <input
          type="number"
          id="id_categoria"
          name="id_categoria"
          min="1"
          max="3"
          placeholder="Categoría"
          value={id_categoria}
          onChange={handleInputChange}
        />

        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
};
