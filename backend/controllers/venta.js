/*
Este controlador se encarga de manejar las peticiones de ventas. Por tanto aqui se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactue con la base de datos para
finalmente retornar una respuesta al cliente.
*/
import { SchemaVenta } from "../schemas/venta.js";

export class VentaController {
    constructor({ ventaModelo }) {
        this.ventaModelo = ventaModelo;
    }

    getAll = async (req, res) => {
        try {
            const ventas = await this.ventaModelo.getAll();
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Ventas' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const venta = await this.ventaModelo.getById({ id });
            if (venta.length > 0) return res.json(venta);
            res.status(404).json({ error: 'Venta no encontrada' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByUserId = async (req, res) => {
        const { id_usuario } = req.params;

        try {
            const pedidosApartados = await this.ventaModelo.getByUserId({ id_usuario });

            if (pedidosApartados.length > 0) {
                return res.json(pedidosApartados);
            }

            res.status(404).json({ error: 'Pedidos apartados no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    getByEstado = async (req, res) => {
        const { estado } = req.params;
        try {
            const ventas = await this.ventaModelo.getByEstado({ estado });
            if (ventas.length > 0) return res.json(ventas);
            res.status(404).json({ error: 'No se encontraron ventas con el estado especificado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaVenta.validarCreateVenta(req.body);
        if (!result.success) return res.status(400).json(result);

        const { id_usuario, monto } = req.body;

        try {
            const nuevaVenta = await this.ventaModelo.create({ id_usuario, monto });
            res.status(201).json(nuevaVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        const { id } = req.params;
        const { id_usuario, monto, fecha, estado } = req.body;

        const result = SchemaVenta.validarUpdateVenta(req.body);
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedVenta = await this.ventaModelo.update({ id, id_usuario, monto, fecha, estado });
            res.json(updatedVenta);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la venta: ' + error.message });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedVenta = await this.ventaModelo.delete({ id });
            res.json(deletedVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createVentaEcommerce = async (req, res) => {
        const { id_usuario, total, productos, es_apartado } = req.body;

        try {
            const result = await this.ventaModelo.createVentaConDetallesEcommerce({ id_usuario, total, productos, es_apartado });
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

