import express,{json} from 'express'
import {corsMiddleware} from './middlewares/cors.js'
//Direcciones para Productos
import {createProdutosRouter} from './routes/productos.js'
import { ProductosModelo } from './models/mysql/productos.js'
//Direcciones para Ventas
import {createVentaRouter} from './routes/venta.js'
import { VentaModelo } from './models/mysql/venta.js'
//Direcciones para Tallas
import {createTallasRouter} from './routes/tallas.js'
import {TallasModelo} from './models/mysql/tallas.js'
// Direcciones para Inventario
import { createInventarioRouter } from './routes/inventario.js';
import { InventarioModelo } from './models/mysql/inventario.js';


import 'dotenv/config'


//este es el punto de entrada de la aplicacion, aqui se configura el servidor y se definen las rutas usando express

//se crea una instancia de express para iniciar el servidor y se le pasan los middlewares que se van a usar
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

//al crear la ruta de productos se le pasa como parametro el modelo de productos que se va a usar
app.use('/productos', createProdutosRouter({productosModelo:ProductosModelo}))
app.use('/ventas', createVentaRouter({ventaModelo:VentaModelo}))
app.use('/tallas', createTallasRouter({tallasModelo:TallasModelo}))
app.use('/inventario', createInventarioRouter({inventarioModelo:InventarioModelo}))


//Aqui se define el puerto en el que se va a correr el servidor, si no se define se usara el puerto 1234
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
