import React from 'react'

export const Producto = ({ productoEsca , setProductos }) => {

  let producto = productoEsca.length > 0 ? productoEsca[0] : null;
  // let lista=[]

  // const anadiraProductos = () => {
  //   lista.push(...productoEsca);
  //   setProductos(lista)
  // }
  
  const anadiraProductos = () => {
    if (producto) {
        setProductos(prevProductos => [...prevProductos, producto]);
    }
};

  return (
    <div className='producto'>
      {producto ? (
        <img src={`http://localhost:1234/${producto.imagen_url}`} />
      ) : (
        <p>No hay producto disponible</p>
      )}
      <div className='producto-datos'>
        {producto ? (
          <>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>{producto.precio}</p>
            <button onClick={anadiraProductos}>Añadir</button>
          </>
        ) : (
          <p>No hay producto disponible</p>
        )}
      </div>
    </div>
  )
}
