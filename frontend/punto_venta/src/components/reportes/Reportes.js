// frontend/src/components/reportes/Reportes.js
import React, { useState } from 'react';
import axios from 'axios';

const Reportes = () => {
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [mensaje, setMensaje] = useState('');

  const handleMesChange = (e) => {
    setMes(e.target.value);
  };

  const handleAnioChange = (e) => {
    setAnio(e.target.value);
  };

  const handleGenerarReporte = async () => {
    if (!mes || !anio) {
      setMensaje('Por favor, seleccione mes y año.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1234/ventas/date/${mes}/${anio}`);
      const ventasData = response.data;

      if (ventasData.length === 0) {
        setMensaje('No existen registros para la fecha introducida.');
        setVentas([]);
        setTotalVentas(0);
      } else {
        setVentas(ventasData);
        const total = ventasData.reduce((acc, venta) => acc + parseFloat(venta.monto), 0);
        setTotalVentas(total);
        setMensaje('');
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      setMensaje('Error al generar el reporte. Intente nuevamente.');
    }
  };

  return (
    <div>
      <h2>Reportes de Ventas</h2>
      <form className="form-reportes">
        <div className="inputs-reportes">
          <select value={mes} onChange={handleMesChange}>
            <option value="">Seleccione Mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
          <select value={anio} onChange={handleAnioChange}>
            <option value="">Seleccione Año</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleGenerarReporte}>Generar Reporte</button>
        </div>
      </form>

      {mensaje && <p>{mensaje}</p>}

      {ventas.length > 0 && (
        <table className="tabla-reportes">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>ID Usuario</th>
              <th>Monto</th>
              <th>ID Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{venta.id_usuario}</td>
                <td>{venta.monto}</td>
                <td>{venta.id_estado}</td>
                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {ventas.length > 0 && (
        <div className="total-ventas">
          <strong>Total Ventas: </strong> ${totalVentas.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default Reportes;
