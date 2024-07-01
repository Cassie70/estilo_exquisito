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

  const eliminarProducto = (idProducto, tallaProducto) => {
    const nuevosProductos = productos.filter(producto => (
      !(producto.id_producto === idProducto && producto.talla === tallaProducto)
    ));
    setProductos(nuevosProductos);
  };


  const calcularTotal = () => {
    let aux = 0
    productos.map((producto) => (
      aux += producto.cantidad * producto.precio
    ))

    return aux;
  };

  const calcularCantidad = () => {
    let aux = 0
    productos.map((producto) => (
      aux += producto.cantidad
    ))

    return aux;
  }

  const generarJSONEfec = () => {
    let efectivo = prompt("Por favor, ingresa el efectivo:");
  
    if (efectivo !== null) {
      let efectivoInt = parseInt(efectivo);
      let total = calcularTotal();
  
      if (isNaN(efectivoInt) || efectivoInt < total) {
        alert("Efectivo insuficiente o entrada inválida. Por favor, inténtelo de nuevo.");
        return;
      }
  
      let cambio = efectivoInt - total;
      alert("Cambio: " + cambio);
  
      const json = {
        id_usuario: "af8ce9c7-337c-11ef-8690-00e04c368ecb",  // Este debería ser dinámico en una aplicación real
        total: total,
        es_apartado: false,  // O 1 si es un apartado, esto también debería ser dinámico
        productos: productos.map(producto => {
          let tallas;
          if (producto.tallas === "XL") {
            tallas = 5;
          } else if (producto.tallas === "L") {
            tallas = 4;
          } else if (producto.tallas === "M") {
            tallas = 3;
          } else if (producto.tallas === "S") {
            tallas = 2;
          } else {
            tallas = 1;
          }
  
          return {
            id_producto: producto.id_producto,
            id_talla: tallas, 
            cantidad: producto.cantidad
          };
        })
      };
  
      console.log(JSON.stringify(json, null, 2));
    } else {
      alert("Pago no autorizado");
    }
  };

  const generarJSONTarj = () => {

    let tarjeta = prompt("Por favor, ingresa tu número de tarjeta (16 dígitos):");
    let nip = prompt("Por favor, ingresa tu NIP (4 dígitos):");
    
    function validarTarjeta(tarjeta) {
        // Verifica que el número de tarjeta tenga 16 dígitos
        let regex = /^\d{16}$/;
        return regex.test(tarjeta);
    }
    
    function validarNip(nip) {
        // Verifica que el NIP tenga 4 dígitos
        let regex = /^\d{4}$/;
        return regex.test(nip);
    }
    
    if (tarjeta !== null && nip !== null) {
        if (validarTarjeta(tarjeta) && validarNip(nip)) {
            alert("Pago autorizado desde la tarjeta: " + tarjeta + ". ¡Ya puede retirar su tarjeta!");
            let tallas

            if (productos.tallas === "XL") {
              tallas = 5;
            } else if (productos.tallas === "L") {
              tallas = 4;
            } else if (productos.tallas === "M") {
              tallas = 3;
            } else if (productos.tallas === "S") {
              tallas = 2;
            } else {
              tallas = 1;
            }
        
            const json = {
              id_usuario: "af8ce9c7-337c-11ef-8690-00e04c368ecb",  // Este debería ser dinámico en una aplicación real
              total: calcularTotal(),
              es_apartado: false,  // O 1 si es un apartado, esto también debería ser dinámico
              productos: productos.map(producto => ({
                id_producto: producto.id_producto,
                id_talla: tallas,  // Usamos talla directamente ya que idDeTalla no se usa en el código proporcionado
                cantidad: producto.cantidad
              }))
            };
            console.log(json);
        } else {
            alert("Número de tarjeta o NIP inválido. Por favor, inténtelo de nuevo.");
        }
    } else {
        alert("Pago no autorizado");
    }

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
              productos.map((producto, index) => (
                <tr key={`${producto.id_producto}-${producto.talla}`}>
                  <td>{producto.nombre}</td>
                  <td>{producto.talla}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio}</td>
                  <td>${producto.precio * producto.cantidad}</td>
                  <td className="accion-buttons">
                    <button className="eliminar" onClick={() => eliminarProducto(producto.id_producto, producto.talla)}>Eliminar</button>
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
          <h4>Total de prendas: {calcularCantidad()}</h4>
          <h4>Total a pagar: ${calcularTotal()}</h4>
        </div>
      </div>

      <section className='section-metodo-pago'>
        <div className='metodos-pago'>
          <div className='pago-card'>
            <div className='card-datos'>
              <h3>PAGO CON TARJETA</h3>
              <h4>${calcularTotal()}</h4>
              <h5>- Insertar número de tarjeta</h5>
              <h5>- Insertar código de seguridad</h5>
              <button onClick={generarJSONTarj}>Pagar</button>
            </div>
          </div>

          <div className='pago-cash'>
            <div className='cash-datos'>
              <h3>PAGO EN EFECTIVO</h3>
              <h4>${calcularTotal()}</h4>
              <button onClick={generarJSONEfec}>Pagar</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
