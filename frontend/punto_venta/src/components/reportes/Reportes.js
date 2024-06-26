// frontend/src/components/reportes/Reportes.js
import React, { useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reportes = () => {
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [ecommerceVentas, setEcommerceVentas] = useState(0);
  const [posVentas, setPosVentas] = useState(0);
  const [ventasSemanales, setVentasSemanales] = useState({
    pos: [0, 0, 0, 0],
    ecommerce: [0, 0, 0, 0],
  });

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
        setEcommerceVentas(0);
        setPosVentas(0);
        setVentasSemanales({ pos: [0, 0, 0, 0], ecommerce: [0, 0, 0, 0] });
      } else {
        setVentas(ventasData);
        const total = ventasData.reduce((acc, venta) => acc + parseFloat(venta.monto), 0);
        setTotalVentas(total);
        setMensaje('');

        const posId = "56663a9b-3761-11ef-89fb-a2aad19a47c0";
        const ventasPorSemana = {
          pos: [0, 0, 0, 0],
          ecommerce: [0, 0, 0, 0],
        };

        ventasData.forEach(venta => {
          const semana = Math.floor(new Date(venta.fecha).getDate() / 7);
          if (venta.id_usuario === posId) {
            ventasPorSemana.pos[semana] += parseFloat(venta.monto);
          } else {
            ventasPorSemana.ecommerce[semana] += parseFloat(venta.monto);
          }
        });

        const posVentasTotal = ventasPorSemana.pos.reduce((acc, val) => acc + val, 0);
        const ecommerceVentasTotal = total - posVentasTotal;

        setEcommerceVentas(ecommerceVentasTotal);
        setPosVentas(posVentasTotal);
        setVentasSemanales(ventasPorSemana);
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      setMensaje('Error al generar el reporte. Intente nuevamente.');
    }
  };

  const pieData = {
    labels: ['E-commerce', 'Punto de Venta'],
    datasets: [
      {
        data: [ecommerceVentas, posVentas],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const barData = {
    labels: ['Semana 1 PV', 'Semana 1 E-commerce', 'Semana 2 PV', 'Semana 2 E-commerce', 'Semana 3 PV', 'Semana 3 E-commerce', 'Semana 4 PV', 'Semana 4 E-commerce'],
    datasets: [
      {
        label: 'Ventas',
        data: [...ventasSemanales.pos, ...ventasSemanales.ecommerce],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
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
        <div className="charts-wrapper">
          <div className="chart-container">
            <div className="chart-title">Ventas totales del mes</div>
            <Pie data={pieData} />
          </div>
          <div className="chart-container2">
            <div className="chart-title">Ventas totales del mes por semana</div>
            <Bar data={barData} />
          </div>
        </div>
      )}

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
