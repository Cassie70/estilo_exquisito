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
            const venta = await this.ventaModelo.getByUserId({ id_usuario });
            if (venta.length > 0) return res.json(venta);
            res.status(404).json({ error: 'Venta no encontrada' });
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

    updateFecha = async (req, res) => {
        const { id } = req.params;
        const { fecha } = req.body;

        try {
            const result = SchemaVenta.validarUpdateFecha({ fecha });
            if (!result.success) return res.status(400).json(result);

            const updatedVenta = await this.ventaModelo.updateFecha({ id, fecha });
            res.json(updatedVenta);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la fecha de la venta: ' + error.message });
        }
    }

    updateUsuario = async (req, res) => {
        const { id } = req.params;
        const { id_usuario } = req.body;
        
        try {
            const result = SchemaVenta.validarUpdateUsuario({ id_usuario });
            if (!result.success) return res.status(400).json(result);

            await this.ventaModelo.updateUsuario({ id, id_usuario });
            res.json({ success: 'Usuario actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateMonto = async (req, res) => {
        const { id } = req.params;
        const { monto } = req.body;
        
        try {
            const result = SchemaVenta.validarUpdateMonto({ monto });
            if (!result.success) return res.status(400).json(result);

            await this.ventaModelo.updateMonto({ id, monto });
            res.json({ success: 'Monto actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
}
