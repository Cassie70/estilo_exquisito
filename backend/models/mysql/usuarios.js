import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'estilo_exquisito_db'
};

const connection = await mysql.createConnection(process.env.DATABASE_URL || config);

export class UsuariosModelo {
    static async getAll() {
        try {
            const [usuarios] = await connection.query('SELECT * FROM Usuarios');
            return usuarios;
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios: ' + error.message);
        }
    }

    static async getById({ id_usuario }) {
        try {
            const [usuario] = await connection.query(
                'SELECT * FROM Usuarios WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
            return usuario;
        } catch (error) {
            throw new Error('Error al obtener el usuario por ID: ' + error.message);
        }
    }

    static async getByEmail({ correo_electronico }) {
        try {
            const [usuario] = await connection.query(
                'SELECT * FROM Usuarios WHERE correo_electronico = ?',
                [correo_electronico]
            );
            return usuario;
        } catch (error) {
            throw new Error('Error al obtener el usuario por correo electrónico: ' + error.message);
        }
    }

    static async create({ nombre, apellido, correo_electronico, telefono }) {
        const query = `
            INSERT INTO Usuarios (nombre, apellido, correo_electronico, telefono) 
            VALUES (?, ?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [nombre, apellido, correo_electronico, telefono]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    static async updateNombre({ id_usuario, nombre }) {
        try {
            const [result] = await connection.query(
                'UPDATE Usuarios SET nombre = ? WHERE id_usuario = UUID_TO_BIN(?)',
                [nombre, id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el nombre: ' + error.message);
        }
    }

    static async updateApellido({ id_usuario, apellido }) {
        try {
            const [result] = await connection.query(
                'UPDATE Usuarios SET apellido = ? WHERE id_usuario = UUID_TO_BIN(?)',
                [apellido, id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el apellido: ' + error.message);
        }
    }

    static async updateEmail({ id_usuario, correo_electronico }) {
        try {
            const [result] = await connection.query(
                'UPDATE Usuarios SET correo_electronico = ? WHERE id_usuario = UUID_TO_BIN(?)',
                [correo_electronico, id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el correo electrónico: ' + error.message);
        }
    }

    static async updateTelefono({ id_usuario, telefono }) {
        try {
            const [result] = await connection.query(
                'UPDATE Usuarios SET telefono = ? WHERE id_usuario = UUID_TO_BIN(?)',
                [telefono, id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el teléfono: ' + error.message);
        }
    }
    /*
    static async delete({ id_usuario }) {
        try {
            const [result] = await connection.query(
                'DELETE FROM Usuarios WHERE id_usuario = UUID_TO_BIN(?)',
                [id_usuario]
            );
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }*/
}
