import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PedidoApartado = () => {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({
    id_usuario: '',
    estado: false, // Inicializado como false
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:1234/pedido-apartado');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener pedidos apartados:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'estado' ? e.target.value === 'true' : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value
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
      console.log('Formulario enviado:', form);
      const response = await axios.post('http://localhost:1234/pedido-apartado', {
        id_usuario: form.id_usuario,
        estado: form.estado
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchPedidos();
    } catch (error) {
      console.error('Error al crear pedido apartado:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('Formulario enviado:', form);
      const response = await axios.patch(`http://localhost:1234/pedido-apartado/${editId}/estado`, {
        estado: form.estado
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchPedidos();
    } catch (error) {
      console.error('Error al actualizar pedido apartado:', error);
    }
  };

  const handleEdit = (pedido) => {
    setForm({
      id_usuario: pedido.id_usuario,
      estado: pedido.estado
    });
    setEditing(true);
    setEditId(pedido.id_pedido_apartado);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/pedido-apartado/${id}`);
      fetchPedidos();
    } catch (error) {
      console.error('Error al eliminar pedido apartado:', error);
    }
  };

  const clearForm = () => {
    setForm({
      id_usuario: '',
      estado: false
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Pedidos Apartados</h2>
      <form onSubmit={handleSubmit} className="form-pedido-apartado">
        <div className="inputs-pedido-apartado">
          <input
            type="text"
            placeholder="ID Usuario"
            name="id_usuario"
            value={form.id_usuario}
            onChange={handleChange}
            required
          />
          <select
            name="estado"
            value={form.estado ? 'true' : 'false'} // Convierte el estado a cadena
            onChange={handleChange}
            required
          >
            <option value="false">Inactivo</option>
            <option value="true">Activo</option>
          </select>
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

      <table className="tabla-pedido-apartado">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>Fecha Apartado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_pedido_apartado}>
              <td>{pedido.id_pedido_apartado}</td>
              <td>{pedido.id_usuario}</td>
              <td>{pedido.fecha_apartado}</td>
              <td>{pedido.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(pedido)}>Editar</button>
                <button className="eliminar" onClick={() => handleDelete(pedido.id_pedido_apartado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoApartado;
