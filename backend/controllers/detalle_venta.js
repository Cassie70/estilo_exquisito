import { SchemaDetalleVenta } from "../schemas/detalle_venta.js";

export class DetalleVentaController {
    constructor({ detalleVentaModelo }) {
        this.detalleVentaModelo = detalleVentaModelo;
    }

    getAll = async (req, res) => {
        try {
            const detalleVentas = await this.detalleVentaModelo.getAll();
            res.json(detalleVentas);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle de Venta' });
        }
    }

    getByIdDetalleVenta = async (req, res) => {
        const { id_detalle_venta } = req.params;
        try {
            const detalleVenta = await this.detalleVentaModelo.getByIdDetalleVenta(id_detalle_venta);
            
            if (detalleVenta.length > 0) return res.json(detalleVenta);
            res.status(404).json({ error: 'Detalle de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdVenta = async (req, res) => {
        const { id_venta } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByIdVenta({ id_venta });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByProducto = async (req, res) => {
        const { id_producto } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByProducto({ id_producto });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByIdTalla = async (req, res) => {
        const { id_talla } = req.params;
        try {
            const detalleVentas = await this.detalleVentaModelo.getByIdTalla({ id_talla });
            if (detalleVentas.length > 0) return res.json(detalleVentas);
            res.status(404).json({ error: 'Detalles de venta no encontrados' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaDetalleVenta.validarCrearDetalleVenta(req.body);
        if (!result.success) return res.status(400).json(result);

        const { id_venta, id_producto, precio_unitario, cantidad, id_talla } = req.body;

        try {
            const nuevoDetalleVenta = await this.detalleVentaModelo.create({ id_venta, id_producto, precio_unitario, cantidad, id_talla });
            res.status(201).json(nuevoDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updatePrecioUnitario = async (req, res) => {
        const { id_detalle_venta } = req.params;
        const { precio_unitario } = req.body;
        const result = SchemaDetalleVenta.validarPrecioUnitario({precio_unitario});
        if (!result.success) return res.status(400).json(result);
        
        try {
            const updatedDetalleVenta = await this.detalleVentaModelo.updatePrecioUnitario({id_detalle_venta, precio_unitario} );
            res.json(updatedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateCantidad = async (req, res) => {
        const { id_detalle_venta } = req.params;
        const { cantidad } = req.body;
        console.log(id_detalle_venta);
        const result = SchemaDetalleVenta.validarCantidad( {cantidad} );
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedDetalleVenta = await this.detalleVentaModelo.updateCantidad({id_detalle_venta, cantidad} );
            res.json(updatedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        const { id_detalle_venta } = req.params;
        console.log(id_detalle_venta);
        try {
            const deletedDetalleVenta = await this.detalleVentaModelo.delete({id_detalle_venta });
            res.json(deletedDetalleVenta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
