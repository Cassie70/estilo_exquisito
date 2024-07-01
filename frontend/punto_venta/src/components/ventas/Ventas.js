import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [form, setForm] = useState({
    id_usuario: '',
    monto: '',
    id_estado: '',
    fecha: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get('http://localhost:1234/ventas');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al obtener ventas:', error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      const newVenta = {
        id_usuario: form.id_usuario,
        monto: parseFloat(form.monto),
        id_estado: parseInt(form.id_estado, 10),
        fecha: formatDateTimeForBackend(form.fecha)
      };
      console.log('Formulario enviado:', newVenta);
      const response = await axios.post('http://localhost:1234/ventas', newVenta);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchVentas();
    } catch (error) {
      console.error('Error al crear venta:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedVenta = {
        id_usuario: form.id_usuario,
        monto: parseFloat(form.monto),
        id_estado: parseInt(form.id_estado, 10),
        fecha: formatDateTimeForBackend(form.fecha)
      };
      console.log('Formulario enviado:', updatedVenta);
      const response = await axios.patch(`http://localhost:1234/ventas/${editId}`, updatedVenta);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchVentas();
    } catch (error) {
      console.error('Error al actualizar venta:', error);
    }
  };

  const handleEdit = (venta) => {
    setForm({
      id_usuario: venta.id_usuario,
      monto: venta.monto.toString(),
      id_estado: venta.id_estado.toString(),
      fecha: formatDateTimeForInput(venta.fecha) // Convertir fecha al formato del input datetime-local
    });
    setEditing(true);
    setEditId(venta.id_venta);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/ventas/${id}`);
      fetchVentas();
    } catch (error) {
      console.error('Error al eliminar venta:', error);
    }
  };

  const clearForm = () => {
    setForm({
      id_usuario: '',
      monto: '',
      id_estado: '',
      fecha: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  // Convierte la fecha al formato YYYY-MM-DDTHH:mm para el input datetime-local
  const formatDateTimeForInput = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Convierte la fecha del input datetime-local al formato YYYY-MM-DD HH:MM:SS para el backend
  const formatDateTimeForBackend = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h2>Ventas</h2>
      <form onSubmit={handleSubmit} className="form-ventas">
        <div className="inputs-ventas">
          <input
            type="text"
            placeholder="ID Usuario"
            name="id_usuario"
            value={form.id_usuario}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Monto"
            name="monto"
            value={form.monto}
            onChange={handleChange}
            required
          />
          <select
            name="id_estado"
            value={form.id_estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un estado</option>
            <option value="1">Completado</option>
            <option value="2">Pendiente</option>
            <option value="3">Cancelado</option>
          </select>
          <input
            type="datetime-local"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons">
          {editing ? (
            <>
              <button type="submit">Actualizar</button>
              <button type="button" onClick={handleCancelar}>Cancelar</button>
            </>
          ) : (
            <>
              <button type="submit">Agregar</button>
              <button type="button" onClick={clearForm}>Limpiar</button>
            </>
          )}
        </div>
      </form>

      <table className="tabla-ventas">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Usuario</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_usuario}</td>
              <td>{venta.monto}</td>
              <td>{venta.id_estado === 1 ? 'Completado' : venta.id_estado === 2 ? 'Pendiente' : 'Cancelado'}</td>
              <td>{venta.fecha}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(venta)}>Editar</button>
                <button className="eliminar" onClick={() => handleDelete(venta.id_venta)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
