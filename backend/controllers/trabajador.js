import { SchemaTrabajador } from "../schemas/trabajador.js";

export class TrabajadorController {
    constructor({ trabajadorModelo }) {
        this.trabajadorModelo = trabajadorModelo;
    }

    getAll = async (req, res) => {
        try {
            const trabajador = await this.trabajadorModelo.getAll();
            res.json(trabajador);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Trabajador' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getById({ id });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByUser = async (req, res) => {
        const { usuario } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByUser({ usuario });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEmail = async (req, res) => {
        const { email } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByEmail({ email });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByRol = async (req, res) => {
        const { rol } = req.params;
        try {
            const trabajador = await this.trabajadorModelo.getByRol({ rol });
            if (trabajador.length > 0) return res.json(trabajador);
            res.status(404).json({ error: 'Trabajador no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaTrabajador.validarCreateTrabajador(req.body);
        if (!result.success) return res.status(400).json(result);

        const { usuario, rol, password, nombre_completo, correo_electronico } = req.body;

        try {
            const nuevoTrabajador = await this.trabajadorModelo.create({ usuario, rol, password, nombre_completo, correo_electronico });
            res.status(201).json(nuevoTrabajador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateUser = async (req, res) => {
        const { id } = req.params;
        const { usuario } = req.body;
    
        const result = SchemaTrabajador.validarUpdateUsuario({ usuario });
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedTrabajador = await this.trabajadorModelo.updateUser({ id, usuario });
            res.json(updatedTrabajador);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el usuario: ' + error.message });
        }
    }
    
    updateRol = async (req, res) => {
        const { id } = req.params;
        const { rol } = req.body;
    
        const result = SchemaTrabajador.validarUpdateRol({ rol });
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedTrabajador = await this.trabajadorModelo.updateRol({ id, rol });
            res.json(updatedTrabajador);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el rol: ' + error.message });
        }
    }
    
    updatePassword = async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
    
        const result = SchemaTrabajador.validarUpdatePassword({ password });
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedTrabajador = await this.trabajadorModelo.updatePassword({ id, password });
            res.json(updatedTrabajador);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la contraseña: ' + error.message });
        }
    }
    
    updateNombreCompleto = async (req, res) => {
        const { id } = req.params;
        const { nombre_completo } = req.body;
    
        const result = SchemaTrabajador.validarUpdateNombreCompleto({ nombre_completo });
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedTrabajador = await this.trabajadorModelo.updateNombreCompleto({ id, nombre_completo });
            res.json(updatedTrabajador);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el nombre completo: ' + error.message });
        }
    }
    
    updateEmail = async (req, res) => {
        const { id } = req.params;
        const { correo_electronico } = req.body;
    
        const result = SchemaTrabajador.validarUpdateEmail({ correo_electronico });
        if (!result.success) return res.status(400).json(result);
    
        try {
            const updatedTrabajador = await this.trabajadorModelo.updateEmail({ id, correo_electronico });
            res.json(updatedTrabajador);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el correo electrónico: ' + error.message });
        }
    }

    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedTrabajador = await this.trabajadorModelo.delete({ id });
            res.json(deletedTrabajador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
