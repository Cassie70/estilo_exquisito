import { Router } from "express"
import { ProductosController } from "../controllers/productos.js"

export const createProdutosRouter = ({productosModelo}) => {
    const productosRouter = Router()

    const productosController = new ProductosController({productosModelo})
    
    productosRouter.get('/', productosController.getAll)
    productosRouter.get('/:id', productosController.getById)
    productosRouter.post('/', productosController.create)
    productosRouter.patch('/:id', productosController.update)
    productosRouter.delete('/:id', productosController.delete)

    return productosRouter;
}
