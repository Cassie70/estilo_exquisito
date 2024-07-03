
export class BestCategoriasController{

    constructor({detalleVentaModelo}) {
        this.detalleVentaModelo = detalleVentaModelo
    }

    bestCategorias = async (req, res) => {
        try {
            const bestCategoria = await this.detalleVentaModelo.bestCategorias();
            res.json(bestCategoria);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle Venta' });
            
        }
    }
}