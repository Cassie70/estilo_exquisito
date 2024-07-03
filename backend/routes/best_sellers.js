import { Router } from "express";
import { BestSellersController } from "../controllers/best_sellers.js";

export const createBestSellersRouter = ({detalleVentaModelo}) => {
    const bestSellersRouter = Router();

    const bestSellersController = new BestSellersController({detalleVentaModelo})

    bestSellersRouter.get('/', bestSellersController.bestSellers)

    return bestSellersRouter;
}
    
    
    