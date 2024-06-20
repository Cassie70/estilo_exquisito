import connection from "../../database.js"

export class ProductosTallasInventarioModelo {
    static async getAll() {
        try {
            const [results, tableInfo] = await connection.query(`
                SELECT 
                    Productos.id_producto, 
                    Productos.nombre, 
                    Productos.descripcion, 
                    Categorias.nombre_categoria, 
                    Productos.imagen_url, 
                    Productos.fecha_agregada,
                    Tallas.nombre_talla, 
                    Inventario.stock 
                FROM Productos
                JOIN Categorias ON Productos.id_categoria = Categorias.id_Categoria
                JOIN Inventario ON Productos.id_producto = Inventario.id_producto
                JOIN Tallas ON Inventario.id_talla = Tallas.id_talla;
            `);

            if(results.length == 0) return [];
    
            const productosMap = results.reduce((acc, row) => {
                const { id_producto, nombre, descripcion, nombre_categoria, imagen_url, fecha_agregada, nombre_talla, stock } = row;
    
                if (!acc[id_producto]) {
                    acc[id_producto] = {
                        id_producto,
                        nombre,
                        descripcion,
                        nombre_categoria,
                        imagen_url,
                        fecha_agregada,
                        tallas: []
                    };
                }
    
                acc[id_producto].tallas.push({
                    nombre_talla,
                    stock
                });
    
                return acc;
            }, {});
    
            const productosConTallas = Object.values(productosMap);
    
            return productosConTallas;
    
        } catch (error) {
            throw new Error('Error al obtener todos los productos: ' + error.message);
        }
    }

    static async getById({id}) {
        try {
            const [results, tableInfo] = await connection.query(`
                SELECT 
                    Productos.id_producto, 
                    Productos.nombre, 
                    Productos.descripcion, 
                    Categorias.nombre_categoria, 
                    Productos.imagen_url, 
                    Productos.fecha_agregada,
                    Tallas.nombre_talla, 
                    Inventario.stock 
                FROM Productos
                JOIN Categorias ON Productos.id_categoria = Categorias.id_Categoria
                JOIN Inventario ON Productos.id_producto = Inventario.id_producto
                JOIN Tallas ON Inventario.id_talla = Tallas.id_talla
                WHERE Productos.id_producto = ?;
            `, [id]);
    
            if (results.length === 0) {
                return null; // Retornar null si no se encuentra el producto
            }
    
            const producto = {
                id_producto: results[0].id_producto,
                nombre: results[0].nombre,
                descripcion: results[0].descripcion,
                nombre_categoria: results[0].nombre_categoria,
                imagen_url: results[0].imagen_url,
                fecha_agregada: results[0].fecha_agregada,
                tallas: results.map(row => ({
                    nombre_talla: row.nombre_talla,
                    stock: row.stock
                }))
            };
    
            return producto;
    
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
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
