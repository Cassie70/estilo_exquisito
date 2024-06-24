import React, {useState} from 'react'

export const CrearCopy = (setListadoState) => {

  const tituloComponente = "Añadir Prenda";

  //Parte inventario solamente ID, TALLA Y STOCK
  //API Para reportes

  const [prendaState, setprendaState] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    id_categoria: 1,
    imagen_url: null,
  });

  const { nombre, descripcion } = prendaState;

  const pruebaBBDDGet = (e) => {
    // //GET
    // fetch('http://localhost:1234/productos/1', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error en la red');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Datos obtenidos:', data);
    //   })
    //   .catch(error => {
    //     console.log('Error al obtener datos:', error);
    //   });

    // //POST
    // fetch('http://localhost:1234/productos', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nombre: 'Producto Prueba',
    //     descripcion: "Hola",
    //     precio: 50,
    //     id_categoria: 1,
    //     imagen_url: "uploads/chucho.png"
    //   })
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error en la red');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Producto Agregado:', data);
    //   })
    //   .catch(error => {
    //     console.log('Error al agregar producto:', error);
    //   });

    //DELETE
    // fetch('http://localhost:1234/productos/11', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error en la red');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Producto Eliminado:', data);
    //   })
    //   .catch(error => {
    //     console.log('Error al eliminar producto:', error);
    //   });

    //PATCH
    // fetch('http://localhost:1234/productos/10', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nombre: 'Producto Modificado',
    //     descripcion: 'Nueva descripción',
    //     precio: 75,
    //     id_categoria: 2,
    //     imagen_url: 'uploads/chucho.png'
    //   })
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Error en la red');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Producto Modificado:', data);
    //   })
    //   .catch(error => {
    //     console.log('Error al modificar producto:', error);
    //   });
  }

  const conseguirDatosForm = (e) => {
    e.preventDefault();

    //conseguir datos del forumario
    let target = e.target;
    // let imagen = target.imagen.value;
    let nombre = target.nombre.value;
    let categoria = target.categoria.value;
    let precio = parseInt(target.precio.value);
    let descripcion = target.descripcion.value;

    //Crear objeto de la pelicula a guardar 
    let producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      id_categoria: categoria,
      imagen_url: "uploads/chucho.png"
    };

    //Guardar en la BD
    //POST
    fetch('http://localhost:1234/productos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        return response.json();
      })
      .then(data => {
        console.log('Producto Agregado:', data);
      })
      .catch(error => {
        console.log('Error al agregar producto:', error);
      });

    // Limpiar el formulario
    setprendaState({
      nombre: "",
      descripcion: "",
      precio: 0,
      id_categoria: 1,
      imagen_url: null,
    });

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir a número si el campo es `stock` o `precio`
    const newValue = (name === 'stock' && name === 'precio') ? Number(value) : value;

    setprendaState({
      ...prendaState,
      [name]: newValue
    });
  };



  return (
    <div className="add">
      <h3 className="title">{tituloComponente}</h3>

      <strong>
        {(nombre && descripcion) && "Agregarás la prenda: " + prendaState.nombre}
      </strong>


      <form onSubmit={conseguirDatosForm}>

        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/*"
        />

        <input type="text"
          id='nombre'
          name='nombre'
          placeholder="Nombre de la Prenda"
          value={nombre}
          onChange={handleInputChange}
        />

        <input type="number"
          id='categoria'
          name='categoria'
          min='1'
          max='3'
          placeholder="Categoria"
        />

        <input type="number"
          id='precio'
          name='precio'
          min='1'
          max='1000'
          placeholder="Precio"
        />

        <textarea
          id='descripcion'
          name='descripcion'
          placeholder="Descripción"
          value={descripcion}
          onChange={handleInputChange}
        ></textarea>


        <input type="submit"
          value="Guardar"
        />

      </form>

      <button onClick={pruebaBBDDGet}>Pruebas</button>

    </div>
  )
}
