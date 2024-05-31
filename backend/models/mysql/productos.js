import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'estilo_exquisito_db'
}

const connection = await mysql.createConnection(process.env.DATABASE_URL || config)


export class ProductosModelo {
    static async getAll() {
        const [productos, tableInfo] = await connection.query('SELECT * FROM productos')
        
        return productos
    }

    static async getById({id}) {
        const [producto, tableInfo] = await connection.query('SELECT * FROM productos WHERE id_producto = ?', [id])
        
        return producto
    }

    static async create({input}) {
        
        const{
            nombre,
            descripcion,
            precio,
            imagen_url,
        } = input

        const result= await connection.query('INSERT INTO Productos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)'
        , [nombre, descripcion, precio, imagen_url])

        console.log(result)
    }
}