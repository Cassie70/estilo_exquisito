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
// Direcciones para Trabajadores
import { createTrabajadorRouter } from './routes/trabajador.js';
import { TrabajadorModelo } from './models/mysql/trabajador.js';
// Direcciones para pedido apartado
import { createPedidoApartadoRouter } from './routes/pedido_apartado.js';
import { PedidoApartadoModelo } from './models/mysql/pedido_apartado.js';
// Direcciones para detalle_pedido_partado
import { createDetallePedidoApartadoRouter } from './routes/detalle_pedido_apartado.js';
import { DetallePedidoApartadoModelo } from './models/mysql/detalle_pedido_apartado.js';
// Importar el enrutador de usuarios 
import { createUsuariosRouter } from './routes/usuarios.js';
import { UsuariosModelo } from './models/mysql/usuarios.js';
// Importar el enrutador de detalle de venta
import { createDetalleVentaRouter } from './routes/detalle_venta.js';
import { DetalleVentaModelo } from './models/mysql/detalle_venta.js';
// Importar el enrutador de ticket
import { createTicketRouter } from './routes/ticket.js';
import { TicketModelo } from './models/mysql/ticket.js';
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
app.use('/trabajadores', createTrabajadorRouter({ trabajadorModelo: TrabajadorModelo }));
app.use('/pedido-apartado', createPedidoApartadoRouter({ pedidoApartadoModelo: PedidoApartadoModelo }));
app.use('/detalle-pedido-apartado', createDetallePedidoApartadoRouter({ detallePedidoApartadoModelo: DetallePedidoApartadoModelo }));
app.use('/usuarios', createUsuariosRouter({ usuariosModelo: UsuariosModelo }));
app.use('/detalle-venta', createDetalleVentaRouter({ detalleVentaModelo: DetalleVentaModelo }));
app.use('/ticket', createTicketRouter({ ticketModelo: TicketModelo}))

//Aqui se define el puerto en el que se va a correr el servidor, si no se define se usara el puerto 1234
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
