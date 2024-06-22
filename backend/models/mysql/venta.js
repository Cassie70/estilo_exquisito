import connection from "../../database.js";

/*
Este contiene al modelo de ventas, el cual se encarga de interactuar con la base de datos
se instancia una conexion a la base de datos y se exporta la clase VentaModelo que contiene los metodos
estaticos (pueden ser llamados sin instanciar la clase) cada metodo realiza una consulta a la base de datos y retorna el resultado
*/

export class VentaModelo {
    static async getAll() {
        try {
            const [venta, tableInfo] = await connection.query('SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, estado, fecha FROM Ventas');
            return venta;
        } catch (error) {
            throw new Error('Error al obtener todas las ventas: ' + error.message);
        }
    }

    static async getById({ id }) {
        try {
            const [venta, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, estado, fecha FROM Ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return venta;
        } catch (error) {
            throw new Error('Error al obtener la venta por ID: ' + error.message);
        }
    }

    static async getByUserId({ id_usuario }) {
        try {
            const [venta, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, estado, fecha FROM Ventas WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
            return venta;
        } catch (error) {
            throw new Error('Error al obtener ventas por ID de usuario: ' + error.message);
        }
    }

    static async getByEstado({ estado }) {
        try {
            const [ventas, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, estado, fecha FROM Ventas WHERE estado = ?',
                [estado]
            );
            return ventas;
        } catch (error) {
            throw new Error('Error al obtener ventas por estado: ' + error.message);
        }
    }

    static async create({ id_usuario, monto }) {
        const query = `
            INSERT INTO Ventas (id_venta, id_usuario, monto, estado) 
            VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?, true)
        `;

        try {
            const [result] = await connection.query(query, [id_usuario, monto]);
            return result;
        } catch (error) {
            throw new Error('Error al crear la venta: ' + error.message);
        }
    }

    static async update({ id, id_usuario, monto, fecha, estado }) {
        const fields = [];
        const values = [];

        if (id_usuario) {
            fields.push('id_usuario = UUID_TO_BIN(?)');
            values.push(id_usuario);
        }

        if (monto) {
            fields.push('monto = ?');
            values.push(monto);
        }

        if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
        }

        if (estado !== undefined) {
            fields.push('estado = ?');
            values.push(estado);
        }

        values.push(id);

        const query = `UPDATE Ventas SET ${fields.join(', ')} WHERE id_venta = UUID_TO_BIN(?)`;

        try {
            const [result] = await connection.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la venta: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }
}
