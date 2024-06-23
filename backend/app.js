import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import * as routes from './routes/index.js';
import * as models from './models/mysql/index.js';
import 'dotenv/config';

// Este es el punto de entrada de la aplicación, aquí se configura el servidor y se definen las rutas usando express
// Direcciones para Productos Tallas Inventario

// Se crea una instancia de express para iniciar el servidor y se le pasan los middlewares que se van a usar
const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// Al crear la ruta de productos se le pasa como parámetro el modelo de productos que se va a usar
app.use('/productos', routes.createProdutosRouter({ productosModelo: models.ProductosModelo }));
app.use('/ventas', routes.createVentaRouter({ ventaModelo: models.VentaModelo }));
app.use('/tallas', routes.createTallasRouter({ tallasModelo: models.TallasModelo }));
app.use('/inventario', routes.createInventarioRouter({ inventarioModelo: models.InventarioModelo }));
app.use('/trabajadores', routes.createTrabajadorRouter({ trabajadorModelo: models.TrabajadorModelo }));
app.use('/pedido-apartado', routes.createPedidoApartadoRouter({ pedidoApartadoModelo: models.PedidoApartadoModelo }));
app.use('/detalle-pedido-apartado', routes.createDetallePedidoApartadoRouter({ detallePedidoApartadoModelo: models.DetallePedidoApartadoModelo }));
app.use('/usuarios', routes.createUsuariosRouter({ usuariosModelo: models.UsuariosModelo }));
app.use('/detalle-venta', routes.createDetalleVentaRouter({ detalleVentaModelo: models.DetalleVentaModelo }));
app.use('/ticket', routes.createTicketRouter({ ticketModelo: models.TicketModelo }));
app.use('/productos-stock', routes.createProductosTallasInventarioRouter({ productosTallasInventarioModelo: models.ProductosTallasInventarioModelo }));
app.use('/categorias', routes.createCategoriasRouter({ categoriasModelo: models.CategoriasModelo }));

// Aquí se define el puerto en el que se va a correr el servidor, si no se define se usará el puerto 1234
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
