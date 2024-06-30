import React, { useState } from 'react';

export const Escanear = ({ setProductoEsca }) => {
  const [productId, setProductId] = useState('');

  const obtenerProducto = () => {
    fetch(`http://localhost:1234/productos/${productId}`, {
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
        setProductoEsca(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  const handleInputChange = event => {
    let datosIntroducidos = event.target.value
    let letras = datosIntroducidos.match(/[XL|X|M|S|XS]+/g);
    let numeros = datosIntroducidos.match(/\d+/g);
  
    console.log('Letras:', letras);
    console.log('Números:', numeros);
    setProductId(event.target.value);
  };

  return (
    <div className='escanear'>
      <h2>Escanea o busca el producto</h2>
      <div className='escanear-id'>
        <input
          type='text'
          placeholder='ID del producto'
          value={productId}
          onChange={handleInputChange}
        />
        <button onClick={obtenerProducto}>Buscar</button>
      </div>
    </div>
  );
};
