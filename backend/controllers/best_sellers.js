
export class BestSellersController{

    constructor({detalleVentaModelo}) {
        this.detalleVentaModelo = detalleVentaModelo
    }

    bestSellers = async (req, res) => {
        try {
            const bestSellers = await this.detalleVentaModelo.bestSellers();
            res.json(bestSellers);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle Venta' });
            
        }
    }
}