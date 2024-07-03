import { Router } from "express";
import { BestCategoriasController } from "../controllers/best_categoria.js";

export const createBestCategoriasRouter = ({detalleVentaModelo}) => {
    const bestCategoriasRouter = Router();

    const bestCategoriasController = new BestCategoriasController({detalleVentaModelo})

    bestCategoriasRouter.get('/', bestCategoriasController.bestCategorias)

    return bestCategoriasRouter;
}
   