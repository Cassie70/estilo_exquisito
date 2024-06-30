import React, { useState, useEffect } from 'react';

export const ProductosEsca = ({ productos, setProductos }) => {
  const [productosUnicos, setProductosUnicos] = useState([]);

  useEffect(() => {
    const filtrarProductosUnicos = () => {
      const uniqueProducts = [];
      const idsVistos = new Set();
      productos.forEach(producto => {
        if (!idsVistos.has(producto.id_producto)) {
          uniqueProducts.push(producto);
          idsVistos.add(producto.id_producto);
        }
      });
      return uniqueProducts;
    };

    setProductosUnicos(filtrarProductosUnicos());
  }, [productos]);

  const eliminarProducto = (idProducto) => {
    const nuevosProductos = productos.filter(producto => producto.id_producto !== idProducto);
    setProductos(nuevosProductos);
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + Number(producto.precio);
    }, 0).toFixed(2);
  };

  return (
    <>
    <div className='productos-prepago'>
      <table className="tabla-tallas">
        <thead>
          <tr>
            <th>Productos</th>
            <th>Talla</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productosUnicos && productosUnicos.length > 0 ? (
            productosUnicos.map((producto, index) => (
              <tr key={producto.id_producto}>
                <td>{producto.nombre}</td>
                <td>XL</td>
                <td>{productos.filter(p => p.id_producto === producto.id_producto).length}</td>
                <td>${producto.precio}</td>
                <td>${(producto.precio * productos.filter(p => p.id_producto === producto.id_producto).length).toFixed(2)}</td>
                <td className="accion-buttons">
                  <button className="eliminar" onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay prendas para mostrar</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='productos-total'>
        <h3>Total</h3>
        <h4>Total de prendas: {productos.length}</h4>
        <h4>Total a pagar: ${calcularTotal()}</h4>
      </div>
    </div>

    <section className='section-metodo-pago'>

    <div className='metodos-pago'>
            <div className='pago-card'>
                <div className='card-datos'>
                    <h3>PAGO CON TARJETA</h3>
                    <h4>${calcularTotal()}</h4>
                    <h5>- Insertar numero de tarjeta</h5>
                    <h5>- Insertar codigo de seguridad</h5>
                    <button>Pagar</button>
                </div>
            </div>

            <div className='pago-cash'>
                <div className='cash-datos'>
                    <h3>PAGO CON TARJETA</h3>
                    <h4>${calcularTotal()}</h4>
                    <button>Pagar</button>
                </div>
            </div>
        </div>

    </section>

    </>
  );
};
