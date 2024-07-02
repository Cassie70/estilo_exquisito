import React, { useState } from 'react';
import axios from 'axios';

const Entregas = () => {
  const [ventaId, setVentaId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const verificarEntrega = async () => {
    try {
      const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Obtener fecha actual en formato YYYY-MM-DD HH:mm:ss

      const patchResponse = await axios.patch(`http://localhost:1234/entregas/${ventaId}`, {
        fecha: fechaActual,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (patchResponse.data.message === 'Estado de la venta actualizado a entregado') {
        setMensaje('Estado de la venta actualizado a entregado. ¡Gracias por su compra!');
      } else {
        setMensaje('La venta no está en estado válido para entrega.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMensaje('Venta no encontrada.');
        } else if (error.response.status === 400 && error.response.data.error === 'La venta no está en estado válido para entrega') {
          setMensaje('La venta no está en estado válido para entrega.');
        } else if (error.response.status === 400 && error.response.data.error === 'El formato de fecha no es válido') {
          setMensaje('El formato de fecha no es válido. Use el formato YYYY-MM-DD HH:mm:ss.');
        } else {
          setMensaje('Error al procesar la solicitud. Intente nuevamente.');
        }
      } else {
        setMensaje('Error al procesar la solicitud. Intente nuevamente.');
      }
      console.error('Error al verificar o actualizar el estado de la venta:', error);
    }
  };

  return (
    <div className='entregas'>
      <h2>Verificar y Completar Entrega</h2>
      <div className='entregas-id'>
        <input
          type='text'
          id='ventaId' // Añadir un id único al input
          className='input-entrega'
          placeholder='ID de la venta'
          value={ventaId}
          onChange={(e) => setVentaId(e.target.value)}
        />
        <button className='boton-entrega' onClick={verificarEntrega}>Verificar</button>
      </div>
      {mensaje && <p className='mensaje-entrega'>{mensaje}</p>}
    </div>
  );
};

export default Entregas;
