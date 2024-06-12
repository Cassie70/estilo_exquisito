import React from 'react'
import { Escanear } from './Escanear'
import { Producto } from './Producto'
import { ProductosEsca } from './ProductosEsca'
import { MetodoPago } from './MetodoPago'

export const Ventas = () => {
    return (
        <div className='ventas'>
            <section className='section-escanear'>
                <Escanear/>
            </section>
            <section className='section-producto-escaneado'>
                <Producto/>
            </section>
            <section className='section-productos-escaneados'>
                <ProductosEsca/>
            </section>
            <section className='section-metodo-pago'>
                <MetodoPago/>
            </section>
        </div>
    )
}
