import React, { useState, useEffect } from 'react'
import { GuardarEnStorage } from '../../helpers/GuardarEnStorage';

export const CrearCopy = ({ setListadoState }) => {

    const tituloComponente = "Añadir Prenda";

    // useEffect(() => {
    //     obtenerProductos();
    // }, []);

    // const obtenerProductos = () => {
    //     fetch('http://localhost:1234/productos')
    //         .then(response => response.json())
    //         .then(data => {
    //             setListadoState(data); // Actualiza el estado con los productos obtenidos
    //         })
    //         .catch(error => console.error('Error al obtener productos:', error));
    // };

    // fetch("http://localhost:1234/productos", {
    //     method: "POST",
    //     headers: {
    //         'content-Type': 'aplication/json'
    //     },
    //     body: {
    //         //Objeto que se va a mandar
    //     }
    // })

    //PATCH editar datos
    //Get obtener datos
    //Delete borrar
    //Por el momento no agregar imagen
    //Parte inventario solamente ID, TALLA Y STOCK
    //API Para reportes

    const [peliState, setPeliState] = useState({
        imagen: null,
        titulo: "",
        precio: 0,
        descripcion: ""
    });

    const { titulo, descripcion } = peliState;

     const pruebaBBDDGet=(e)=>{
        // SI CONSIGUe EL GET
        fetch('http://localhost:1234/productos', {
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
            })
            .catch(error => {
              console.log('Error al obtener datos:', error);
            });

        //POST
        fetch('http://localhost:1234/productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: 'Producto Prueba',
                descripcion: "Hola",
                precio: 50,
                id_categoria: 1,
                imagen_url: ""
            })
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
     }

    const conseguirDatosForm = (e) => {
        e.preventDefault();

        //conseguir datos del forumario
        let target = e.target;
        let imagen = target.imagen.value;
        let titulo = target.titulo.value;
        let precio = target.precio.value;
        let descripcion = target.descripcion.value;

        //Crear objeto de la pelicula a guardar 
        let peli = {
            imagen: imagen,
            titulo: titulo,
            precio: precio,
            descripcion: descripcion
        };

        //Guardar estado
        setPeliState(peli);

        //Actualizar el estado del listado principal
        setListadoState(elementos => {
            return [...elementos, peli];
        })

        //Guardar en el almacenamiento local:
        GuardarEnStorage("pelis", peli);

        // Limpiar el formulario
        setPeliState({
            imagen: null,
            titulo: "",
            precio: 0,
            descripcion: ""
        });

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Convertir a número si el campo es `stock` o `precio`
        const newValue = (name === 'stock' && name === 'precio') ? Number(value) : value;

        setPeliState({
            ...peliState,
            [name]: newValue
        });
    };



    return (
        <div className="add">
            <h3 className="title">{tituloComponente}</h3>

            <strong>
                {(titulo && descripcion) && "Has agregado la prenda: " + peliState.titulo}
            </strong>


            <form onSubmit={conseguirDatosForm}>

                <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                />

                <input type="text"
                    id='titulo'
                    name='titulo'
                    placeholder="Nombre de la Prenda"
                    value={titulo}
                    onChange={handleInputChange}
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
