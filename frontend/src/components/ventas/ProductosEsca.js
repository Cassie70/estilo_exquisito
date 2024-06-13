import React from 'react'

export const ProductosEsca = () => {
  return (
    <div className='productos-prepago'>
      <div className='productos-info'>
        <h4>Productos</h4>
        <h5>Talla</h5>
        <h5>Cantidad</h5>
        <h5>Precio</h5>
        <h5>Total</h5>
      </div>

      <div className='productos-listado'>
        <h3>Pendiente</h3>
      </div>

      <div className='productos-total'>
        <h3>Total</h3>
        <h4>Total de prendas: #Prendas</h4>
        <h4>Total a pagar: #Cash</h4>
      </div>
    </div>
  )
}
