
export class BestSellersController{

    constructor({detalleVentaModelo}) {
        this.detalleVentaModelo = detalleVentaModelo
    }

    bestSellers = async (req, res) => {
        try {
            
            const usuario = await this.detalleVentaModelo.bestSellers();
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle Venta' });
            
        }
    }
}