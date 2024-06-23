import bcrypt from 'bcrypt';

export class LoginUsuarioController{

    constructor({usuariosModelo}) {
        this.usuariosModelo = usuariosModelo
    }

    login = async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Usuarios' });
        }
    }
}