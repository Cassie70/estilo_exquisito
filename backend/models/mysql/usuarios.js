import connection from "../../database.js";

export class UsuariosModelo {
    static async getAll() {
        try {
            const [usuarios] = await connection.query('SELECT bin_to_uuid(id_usuario) id_usuario,nombre,apellido,correo_electronico,telefono FROM Usuarios');
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

    static async create({ nombre, apellido, correo_electronico, pass, telefono }) {
        const query = `
            INSERT INTO Usuarios (nombre, apellido, correo_electronico, pass, telefono) 
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            const [result] = await connection.query(query, [nombre, apellido, correo_electronico, pass, telefono]);
            return result;
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    static async update({ id_usuario, nombre, apellido, correo_electronico, pass, telefono }) {
        const updateFields = [];
        const updateParams = [];

        if (nombre) {
            updateFields.push('nombre = ?');
            updateParams.push(nombre);
        }
        if (apellido) {
            updateFields.push('apellido = ?');
            updateParams.push(apellido);
        }
        if (correo_electronico) {
            updateFields.push('correo_electronico = ?');
            updateParams.push(correo_electronico);
        }
        if (pass) {
            updateFields.push('pass = ?');
            updateParams.push(pass);
        }
        if (telefono) {
            updateFields.push('telefono = ?');
            updateParams.push(telefono);
        }

        updateParams.push(id_usuario); // Pushing id_usuario as the last parameter

        const updateQuery = `
            UPDATE Usuarios 
            SET ${updateFields.join(', ')} 
            WHERE id_usuario = UUID_TO_BIN(?)
        `;

        try {
            const [result] = await connection.query(updateQuery, updateParams);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
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
    }
    */
}

