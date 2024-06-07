import connection from "../../database.js"
/*
Este contiene al modelo de productos, el cual se encarga de interactuar con la base de datos
se instancia una conexion a la base de datos y se exporta la clase ProductosModelo que contiene los metodos
estaticos (pueden ser llamados sin instanciar la clase) cada metodo realiza una consulta a la base de datos y retorna el resultado
*/ 

export class ProductosModelo {
    static async getAll() {
        const [productos, tableInfo] = await connection.query('SELECT * FROM Productos')
        
        return productos
    }

    static async getById({id}) {
        const [producto, tableInfo] = await connection.query('SELECT * FROM Productos WHERE id_producto = ?', [id])
        console.log(producto)
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

        return result;
    }

    static async update({id, input}) {
        
        //input es un objeto con los campos a actualizar
        //hacer que los campos tengan el formato correcto para la base de datos
        //ejemplo: Update Productos SET nombre = 'nombre',descripcion = 'fasfasf' WHERE id_producto = 1
        
        const result = await connection.query('UPDATE Productos SET ? WHERE id_producto = ?', [campos, id])
    }

    static async delete({id}) {
        const result = await connection.query('DELETE FROM Productos WHERE id_producto = ?', [id])

        return result;
    }
}
