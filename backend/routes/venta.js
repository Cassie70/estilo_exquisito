import { Router } from "express";
import { VentaController } from "../controllers/venta.js";

export const createVentaRouter = ({ ventaModelo }) => {
    const ventaRouter = Router();

    const ventaController = new VentaController({ ventaModelo });

    ventaRouter.get('/', ventaController.getAll);
    ventaRouter.get('/:id', ventaController.getById);
    ventaRouter.get('/usuario/:id_usuario', ventaController.getByUserId);
    ventaRouter.post('/', ventaController.create);
    ventaRouter.patch('/:id/fecha', ventaController.updateFecha);
    ventaRouter.patch('/:id/usuario', ventaController.updateUsuario);
    ventaRouter.patch('/:id/monto', ventaController.updateMonto);
    ventaRouter.delete('/:id', ventaController.delete);

    return ventaRouter;
};
