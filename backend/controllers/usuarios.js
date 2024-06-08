import { SchemaUsuarios } from "../schemas/usuarios.js";

export class UsuariosController {
    constructor({ usuariosModelo }) {
        this.usuariosModelo = usuariosModelo;
    }

    getAll = async (req, res) => {
        try {
            const usuarios = await this.usuariosModelo.getAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Usuarios' });
        }
    }

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const usuario = await this.usuariosModelo.getById({ id_usuario: id });
            if (usuario.length > 0) return res.json(usuario);
            res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getByEmail = async (req, res) => {
        const { correo_electronico } = req.params;
        try {
            const usuario = await this.usuariosModelo.getByEmail({ correo_electronico });
            if (usuario.length > 0) return res.json(usuario);
            res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    create = async (req, res) => {
        const result = SchemaUsuarios.validarCrearUsuario(req.body);
        if (!result.success) return res.status(400).json(result);

        const { nombre, apellido, correo_electronico, telefono } = req.body;

        try {
            const nuevoUsuario = await this.usuariosModelo.create({ nombre, apellido, correo_electronico, telefono });
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateNombre = async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        const result = SchemaUsuarios.validarNombre({ nombre });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedUsuario = await this.usuariosModelo.updateNombre({ id_usuario: id, nombre });
            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateApellido = async (req, res) => {
        const { id } = req.params;
        const { apellido } = req.body;
        const result = SchemaUsuarios.validarApellido({ apellido });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedUsuario = await this.usuariosModelo.updateApellido({ id_usuario: id, apellido });
            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateEmail = async (req, res) => {
        const { id } = req.params;
        const { correo_electronico } = req.body;
        const result = SchemaUsuarios.validarCorreo({ correo_electronico });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedUsuario = await this.usuariosModelo.updateEmail({ id_usuario: id, correo_electronico });
            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    updateTelefono = async (req, res) => {
        const { id } = req.params;
        const { telefono } = req.body;
        const result = SchemaUsuarios.validarTelefono({ telefono });
        if (!result.success) return res.status(400).json(result);

        try {
            const updatedUsuario = await this.usuariosModelo.updateTelefono({ id_usuario: id, telefono });
            res.json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    /*
    delete = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUsuario = await this.usuariosModelo.delete({ id_usuario: id });
            res.json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }*/
}
