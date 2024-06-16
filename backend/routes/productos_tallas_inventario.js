import { Router } from "express";
import { ProductosTallasInventarioController } from "../controllers/productos_tallas_inventario.js";

export const createProductosTallasInventarioRouter = ({ productosTallasInventarioModelo }) => {
    const productosTallasInventarioRouter = Router();
    const productosTallasInventarioController = new ProductosTallasInventarioController({ productosTallasInventarioModelo });

    productosTallasInventarioRouter.get('/', productosTallasInventarioController.getAll.bind(productosTallasInventarioController));
    productosTallasInventarioRouter.get('/id/:id', productosTallasInventarioController.getById.bind(productosTallasInventarioController));
    productosTallasInventarioRouter.get('/nombre/:nombre', productosTallasInventarioController.getByNombre.bind(productosTallasInventarioController));
    productosTallasInventarioRouter.get('/talla/:nombre_talla', productosTallasInventarioController.getByNombreTalla.bind(productosTallasInventarioController));
    productosTallasInventarioRouter.get('/precio/:precio', productosTallasInventarioController.getByPrecio.bind(productosTallasInventarioController));
    productosTallasInventarioRouter.get('/categoria/:id_categoria', productosTallasInventarioController.getByIdCategoria.bind(productosTallasInventarioController));

    return productosTallasInventarioRouter;
}
