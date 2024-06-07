import mysql from 'mysql2/promise'

/*
Este contiene al modelo de ventas, el cual se encarga de interactuar con la base de datos
se instancia una conexion a la base de datos y se exporta la clase VentaModelo que contiene los metodos
estaticos (pueden ser llamados sin instanciar la clase) cada metodo realiza una consulta a la base de datos y retorna el resultado
*/ 
const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'estilo_exquisito_db'
}

const connection = await mysql.createConnection(process.env.DATABASE_URL || config)


export class VentaModelo {
    static async getAll() {
        try {
            const [venta, tableInfo] = await connection.query('SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, fecha FROM ventas');
            return venta;
        } catch (error) {
            throw new Error('Error al obtener todas las ventas: ' + error.message);
        }
    }
    
    static async getById({id}) {
        try {
            const [venta, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, fecha FROM ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            console.log(venta)
            return venta
        } catch (error) {
            throw new Error('Error al obtener la venta por ID: ' + error.message);
        }
    }
    
    static async getByUserId({ id_usuario }) {
        try {
            const [venta, tableInfo] = await connection.query(
                'SELECT BIN_TO_UUID(id_venta) AS id_venta, BIN_TO_UUID(id_usuario) AS id_usuario, monto, fecha FROM ventas WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
            return venta;
        } catch (error) {
            throw new Error('Error al obtener ventas por ID de usuario: ' + error.message);
        }
    }  

    static async create({ id_usuario, monto }) {
        const query = `
            INSERT INTO Ventas (id_venta, id_usuario, monto) 
            VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(?), ?)
        `;

        try {
            const [result] = await connection.query(query, [id_usuario, monto]);
            return result;
        } catch (error) {
            throw new Error('Error al crear la venta: ' + error.message);
        }
    }
    
    static async updateFecha({ id, fecha }) {
        try {
            const [result] = await connection.query(
                'UPDATE ventas SET fecha = ? WHERE id_venta = UUID_TO_BIN(?)',
                [fecha, id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar la fecha de la venta: ' + error.message);
        }
    }

    static async updateUsuario({ id, id_usuario }) {
        try {
            const [result] = await connection.query(
                'UPDATE ventas SET id_usuario = UUID_TO_BIN(?) WHERE id_venta = UUID_TO_BIN(?)',
                [id_usuario, id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el usuario de la venta: ' + error.message);
        }
    }

    static async updateMonto({ id, monto }) {
        try {
            const [result] = await connection.query(
                'UPDATE ventas SET monto = ? WHERE id_venta = UUID_TO_BIN(?)',
                [monto, id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el monto de la venta: ' + error.message);
        }
    }

    static async delete({ id }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM ventas WHERE id_venta = UUID_TO_BIN(?)',
                [id]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }
    
}