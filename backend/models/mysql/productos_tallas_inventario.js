import mysql from 'mysql2/promise';

/*
Este contiene al modelo de productos_tallas_inventario, el cual se encarga de interactuar con la base de datos
se instancia una conexión a la base de datos y se exporta la clase ProductosTallasInventarioModelo que contiene los métodos
estáticos (pueden ser llamados sin instanciar la clase). Cada método realiza una consulta a la base de datos y retorna el resultado.
*/
const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'estilo_exquisito_db'
}

const connection = await mysql.createConnection(process.env.DATABASE_URL || config);

export class ProductosTallasInventarioModelo {
    static async getAll() {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE i.stock > 0;

            `);
            return productos;
        } catch (error) {
            throw new Error('Error al obtener todos los productos: ' + error.message);
        }
    }

    static async getById({ id }) {
        try {
            const [producto, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.id_producto = ? AND i.stock > 0;

            `, [id]);
            return producto;
        } catch (error) {
            throw new Error('Error al obtener el producto por ID: ' + error.message);
        }
    }

    static async getByNombre({ nombre }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.nombre LIKE ? AND i.stock > 0;

            `, [`%${nombre}%`]);
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por nombre: ' + error.message);
        }
    }

    static async getByNombreTalla({ nombre_talla }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE t.nombre_talla = ? AND i.stock > 0
            `, [nombre_talla]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por nombre de talla: ' + error.message);
        }
    }

    static async getByPrecio({ precio }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.precio <= ? AND i.stock > 0
            `, [precio]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por precio: ' + error.message);
        }
    }

    static async getByIdCategoria({ id_categoria }) {
        try {
            const [productos, tableInfo] = await connection.query(`
                SELECT p.*, t.nombre_talla AS talla, i.stock
                FROM productos p
                JOIN inventario i ON p.id_producto = i.id_producto
                JOIN tallas t ON i.id_talla = t.id_talla
                WHERE p.id_categoria = ? AND i.stock > 0
            `, [id_categoria]);            
            return productos;
        } catch (error) {
            throw new Error('Error al obtener productos por ID de categoría: ' + error.message);
        }
    }
}
