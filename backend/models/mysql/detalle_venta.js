import connection from "../../database.js"

export class DetalleVentaModelo {
    static async getAll() {
        try {
            const [detalleVentas] = await connection.query('SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta;');
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener todos los detalles de venta: ' + error.message);
        }
    }

    static async getByIdDetalleVenta(id_detalle_venta) {
        try {
            const [detalleVenta] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_detalle_venta = ?',
                [id_detalle_venta]
            );
            return detalleVenta;
        } catch (error) {
            throw new Error('Error al obtener el detalle de venta por ID: ' + error.message);
        }
    }

    static async getByIdVenta({ id_venta }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_venta = UUID_TO_BIN(?)',
                [id_venta]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de venta: ' + error.message);
        }
    }

    static async getByProducto({ id_producto }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_producto = ?',
                [id_producto]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de producto: ' + error.message);
        }
    }

    static async getByIdTalla({ id_talla }) {
        try {
            const [detalleVentas] = await connection.query(
                'SELECT id_detalle_venta,bin_to_uuid(id_venta) id_venta,id_producto,precio_unitario,cantidad,id_talla FROM Detalle_venta WHERE id_talla = ?',
                [id_talla]
            );
            return detalleVentas;
        } catch (error) {
            throw new Error('Error al obtener los detalles de venta por ID de talla: ' + error.message);
        }
    }

    static async create({ id_venta, id_producto, precio_unitario, cantidad, id_talla }) {
        const query = `
            INSERT INTO Detalle_venta (id_venta, id_producto, precio_unitario, cantidad, id_talla) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [id_venta, id_producto, precio_unitario, cantidad, id_talla]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el detalle de venta: ' + error.message);
        }
    }
    

    static async update({ id_detalle_venta, input }) {
        const fields = Object.keys(input);
        const values = Object.values(input);

        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const query = `
            UPDATE Detalle_venta 
            SET ${setClause} 
            WHERE id_detalle_venta = ?
        `;

        try {
            const [result] = await connection.query(query, [...values, id_detalle_venta]);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el detalle de venta: ' + error.message);
        }
    }

    static async delete({ id_detalle_venta }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Detalle_venta WHERE id_detalle_venta = ?',
                [id_detalle_venta]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el detalle de venta: ' + error.message);
        }
    }
}

