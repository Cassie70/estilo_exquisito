import React from 'react'

export const Escanear = () => {
  return (
    <div className='escanear'>
        <h2>Escanea o busca el producto</h2>
        <div className='escanear-id'>
            <input type='text' placeholder='ID del producto'></input>
            <button>Buscar</button>
        </div>
    </div>
  )
}
