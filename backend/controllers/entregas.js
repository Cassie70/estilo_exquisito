import { SchemaEntrega } from "../schemas/entregas.js";

export class EntregasController {
    constructor({ entregasModelo }) {
        this.entregasModelo = entregasModelo;
    }

    updateEstado3 = async (req, res) => {
        const { id } = req.params;
        const { fecha } = req.body;

        try {
            const result = SchemaEntrega.validarFecha({ fecha });
            if (!result.success) return res.status(400).json(result);

            const venta = await this.entregasModelo.getById({ id });
            if (venta.length === 0) return res.status(404).json({ error: 'Venta no encontrada' });

            if (venta[0].id_estado !== 1) return res.status(400).json({ error: 'La venta no está en estado válido para entrega' });

            const updatedVenta = await this.entregasModelo.update({
                id,
                fecha,
                id_estado: 5
            });

            res.json({ message: 'Estado de la venta actualizado a entregado', updatedVenta });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
